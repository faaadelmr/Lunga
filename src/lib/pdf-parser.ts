// Polyfill for Node.js server environment required by pdf-parse
if (typeof global !== 'undefined') {
  if (!(global as any).DOMMatrix) {
    (global as any).DOMMatrix = class DOMMatrix {};
  }
}

// Suppress optional dependency warnings from pdf-parse library
const originalWarn = console.warn;
console.warn = () => {};
// @ts-ignore
const pdfParse = require('pdf-parse');
console.warn = originalWarn;

/**
 * Extracts raw text from a base64 encoded PDF data URI
 */
export async function parsePdfToText(base64Data: string): Promise<string> {
  if (!base64Data) return '';
  
  // Extract base64 content from data URI
  const base64Content = base64Data.includes('base64,') 
    ? base64Data.split('base64,')[1] 
    : base64Data;
  
  const buffer = Buffer.from(base64Content, 'base64');
  const data = await pdfParse(buffer);
  
  return data.text || '';
}
