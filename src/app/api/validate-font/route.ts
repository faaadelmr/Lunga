import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const font = searchParams.get('font');
  if (!font) {
    return NextResponse.json({ isValid: false }, { status: 400 });
  }

  try {
    // Check if the font family exists on Google Fonts
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}`;
    const response = await fetch(url, { method: 'HEAD' });
    
    return NextResponse.json({ isValid: response.ok });
  } catch (error) {
    // Fallback to true on network/rate-limiting errors to avoid false negatives
    return NextResponse.json({ isValid: true });
  }
}
