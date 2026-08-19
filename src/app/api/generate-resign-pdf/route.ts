import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { htmlContent, fileName } = body;

    if (!htmlContent) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    const isDev = process.env.NODE_ENV === 'development';
    let executablePath: string;

    if (isDev) {
      executablePath =
        process.platform === 'win32'
          ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
          : process.platform === 'darwin'
          ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          : '/usr/bin/google-chrome';
    } else {
      const CHROMIUM_URL = 'https://github.com/sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar';
      executablePath = await chromium.executablePath(CHROMIUM_URL);
    }

    const chromiumAny = chromium as any;

    const browser = await puppeteer.launch({
      args: isDev ? ['--no-sandbox', '--disable-setuid-sandbox'] : chromium.args,
      defaultViewport: isDev ? undefined : (chromiumAny.defaultViewport || undefined),
      executablePath,
      headless: isDev ? true : (chromiumAny.headless === 'shell' ? 'shell' : Boolean(chromiumAny.headless)),
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '25mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm',
      },
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName || 'Surat-Resign.pdf'}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating Resign PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
