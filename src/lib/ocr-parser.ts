import { createWorker } from 'tesseract.js';
import sharp from 'sharp';

/**
 * High-Precision OCR Engine Optimized for Complex Multi-Column Resumes & Scanned PDF Images.
 */
export async function parseImageToText(dataUri: string): Promise<string> {
  let worker: any = null;
  try {
    const base64Data = dataUri.includes('base64,') ? dataUri.split('base64,')[1] : dataUri;
    const rawBuffer = Buffer.from(base64Data, 'base64');

    // Pass 1: Advanced Pre-processing for Complex Resumes
    // Resizing to high DPI (2400px), deskewing/normalizing contrast to preserve thin font edges
    let processedBuffer: Buffer;
    try {
      processedBuffer = await sharp(rawBuffer)
        .resize({ width: 2400, fit: 'inside', withoutEnlargement: false })
        .grayscale()
        .normalize() // Adaptive contrast adjustment without destruction of faint text
        .sharpen({ sigma: 1.2 })
        .toBuffer();
    } catch (sharpError) {
      console.warn('Sharp pre-processing warning, falling back to raw buffer:', sharpError);
      processedBuffer = rawBuffer;
    }

    // Initialize Tesseract Worker with English + Indonesian support
    worker = await createWorker(['eng', 'ind'], 1, {
      workerBlobURL: false,
    });

    // PSM 11 (Sparse Text) & PSM 3 (Fully Automatic Page Segmentation) are superior for multi-column layouts
    await worker.setParameters({
      tessedit_pageseg_mode: '3' as any, // PSM 3: Fully automatic page segmentation (best for 2-column CV layouts)
      preserve_interword_spaces: '1',
      tessedit_char_whitelist: '', // Allow all characters
    });

    const ret = await worker.recognize(processedBuffer);
    let extractedText = ret.data.text || '';

    // Pass 2 Fallback: If Pass 1 yield low text or missed content, try Adaptive Thresholding (Pass 2)
    if (!extractedText || extractedText.trim().length < 150) {
      console.log('🔄 Pass 1 OCR yield low text count. Running Pass 2 (Binarization & PSM 11)...');
      try {
        const pass2Buffer = await sharp(rawBuffer)
          .resize({ width: 2800, fit: 'inside', withoutEnlargement: false })
          .grayscale()
          .linear(1.3, -10)
          .threshold(150)
          .sharpen()
          .toBuffer();

        await worker.setParameters({
          tessedit_pageseg_mode: '11' as any, // PSM 11: Sparse text / find as much text as possible in all directions
          preserve_interword_spaces: '1',
        });

        const pass2Ret = await worker.recognize(pass2Buffer);
        if (pass2Ret.data.text && pass2Ret.data.text.trim().length > extractedText.trim().length) {
          extractedText = pass2Ret.data.text;
        }
      } catch (pass2Error) {
        console.warn('Pass 2 OCR execution skipped:', pass2Error);
      }
    }

    await worker.terminate();
    return extractedText;
  } catch (error) {
    console.warn('Tesseract OCR error:', error);
    if (worker && typeof worker.terminate === 'function') {
      await worker.terminate().catch(() => {});
    }
    return '';
  }
}
