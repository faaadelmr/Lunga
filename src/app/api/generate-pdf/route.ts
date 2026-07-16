import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

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

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // Set viewport to match preview size (840x1188 pixels)
    await page.setViewport({
      width: 840, // Same as preview width
      height: 1188, // Same as preview height
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
