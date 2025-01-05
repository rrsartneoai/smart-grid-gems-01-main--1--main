import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const processImageFile = async (file: File): Promise<string> => {
  try {
    console.log('Rozpoczynam przetwarzanie obrazu:', file.name);
    const result = await Tesseract.recognize(file, 'pol');
    console.log('Zakończono przetwarzanie obrazu, wyodrębniony tekst:', result.data.text.substring(0, 100) + '...');
    return result.data.text;
  } catch (error) {
    console.error('Błąd podczas przetwarzania obrazu:', error);
    throw error;
  }
};

export const processPdfFile = async (file: File): Promise<string> => {
  try {
    console.log('Rozpoczynam przetwarzanie PDF:', file.name);
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    console.log(`PDF ma ${pdf.numPages} stron`);
    
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`Przetwarzam stronę ${i}/${pdf.numPages}`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    console.log('Zakończono przetwarzanie PDF, wyodrębniony tekst:', fullText.substring(0, 100) + '...');
    return fullText;
  } catch (error) {
    console.error('Błąd podczas przetwarzania PDF:', error);
    throw error;
  }
};

export const processDocxFile = async (file: File): Promise<string> => {
  try {
    console.log('Rozpoczynam przetwarzanie DOCX:', file.name);
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    console.log('Zakończono przetwarzanie DOCX, wyodrębniony tekst:', result.value.substring(0, 100) + '...');
    return result.value;
  } catch (error) {
    console.error('Błąd podczas przetwarzania DOCX:', error);
    throw error;
  }
};

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB