import pdfParse from 'pdf-parse';
import { pdf } from 'pdf-to-img';
import { parseImageToText } from './ocr-parser';

/**
 * Smart Hybrid PDF Text Extractor:
 * 1. FIRST ALWAYS tries fast native text parsing via `pdf-parse` (v1.1.1).
 * 2. If extracted native text length >= 100 characters (Digital PDF), returns native text immediately.
 * 3. If extracted native text length < 100 characters (Scanned image PDF), 
 *    it automatically renders PDF pages to images and runs Sharp + Tesseract OCR!
 */
export async function parsePdfToText(base64Data: string): Promise<string> {
  if (!base64Data) return '';

  const base64Content = base64Data.includes('base64,')
    ? base64Data.split('base64,')[1]
    : base64Data;

  const buffer = Buffer.from(base64Content, 'base64');

  // STEP 1: ALWAYS TRY NATIVE pdf-parse (v1.1.1) FIRST
  let nativeText = '';
  try {
    const data = await pdfParse(buffer);
    nativeText = data?.text ? data.text.trim() : '';
  } catch (err) {
    console.warn('Native pdf-parse failed, falling back to OCR:', err);
  }

  // STEP 2: CHECK THRESHOLD (>= 100 CHARS -> DIGITAL PDF)
  if (nativeText && nativeText.length >= 100) {
    console.log(`📄 Digital PDF detected! Native pdf-parse extracted ${nativeText.length} characters.`);
    return nativeText;
  }

  // STEP 3: FALLBACK FOR SCANNED/IMAGE PDF (< 100 CHARS) -> Sharp + Tesseract OCR
  console.log(`📸 Scanned/Image PDF detected! Native text length is only ${nativeText.length} chars (< 100). Auto-routing to Sharp + Tesseract OCR...`);
  
  try {
    let combinedOcrText = '';
    let pageNum = 1;
    const document = await pdf(buffer, { scale: 2 });

    for await (const pageBuffer of document) {
      const pageDataUri = `data:image/png;base64,${pageBuffer.toString('base64')}`;
      const pageOcrText = await parseImageToText(pageDataUri);
      combinedOcrText += `\n--- Halaman ${pageNum} ---\n` + pageOcrText;
      pageNum++;
    }

    await document.destroy();

    if (!combinedOcrText || combinedOcrText.trim().length < 20) {
      throw new Error('Gagal mengompresi dan mengekstraksi teks OCR dari berkas PDF scan.');
    }

    return combinedOcrText.trim();
  } catch (ocrErr: any) {
    console.error('PDF to Image -> OCR fallback error:', ocrErr);
    throw new Error(`Gagal mengonversi PDF scan ke OCR: ${ocrErr?.message || ocrErr}`);
  }
}
