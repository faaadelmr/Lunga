import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeData, template, color, bgColor, textColor, font, language, fileName } = body;

    // Validate required fields
    if (!resumeData) {
      return NextResponse.json(
        { error: 'Resume data is required' },
        { status: 400 }
      );
    }

    // Determine executable path for local vs Vercel serverless environment
    const isDev = process.env.NODE_ENV === 'development';
    let executablePath: string;

    if (isDev) {
      // Common default installation paths for Chrome/Chromium locally
      executablePath =
        process.platform === 'win32'
          ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
          : process.platform === 'darwin'
          ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          : '/usr/bin/google-chrome';
    } else {
      // Use remote GitHub release binary for Vercel Serverless environment
      const CHROMIUM_URL = 'https://github.com/sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar';
      executablePath = await chromium.executablePath(CHROMIUM_URL);
    }

    const chromiumAny = chromium as any;

    // Launch browser
    const browser = await puppeteer.launch({
      args: isDev ? ['--no-sandbox', '--disable-setuid-sandbox'] : chromium.args,
      defaultViewport: isDev ? { width: 840, height: 1188 } : (chromiumAny.defaultViewport || undefined),
      executablePath,
      headless: isDev ? true : (chromiumAny.headless === 'shell' ? 'shell' : Boolean(chromiumAny.headless)),
    });

    const page = await browser.newPage();

    // Set viewport to match preview size (840x1188 pixels)
    await page.setViewport({
      width: 840,
      height: 1188,
      deviceScaleFactor: 2,
    });

    // Build URL for the render page
    const baseUrl = request.nextUrl.origin;
    const params = new URLSearchParams({
      data: encodeURIComponent(JSON.stringify(resumeData)),
      template: template || 'modern',
      color: color || '#1f2937',
      bgColor: bgColor || '#ffffff',
      textColor: textColor || '#000000',
      font: font || 'Inter',
      language: language || 'en',
    });

    const renderUrl = `${baseUrl}/render-pdf?${params.toString()}`;

    // Navigate to the render page
    await page.goto(renderUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for fonts and content to load
    await page.evaluate(() => {
      return document.fonts.ready;
    });

    // Additional wait to ensure all content is rendered
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate PDF
    const pdfBuffer = await page.pdf({
      width: '840px',
      height: '1188px',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
      preferCSSPageSize: true,
    });

    await browser.close();

    // Return PDF as response
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName || 'resume.pdf'}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
