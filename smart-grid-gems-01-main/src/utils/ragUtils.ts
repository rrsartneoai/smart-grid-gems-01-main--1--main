import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { getGeminiResponse } from '@/lib/gemini';
import { calculateTFIDF } from './searchUtils';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY || "");

let documentChunks: { text: string; metadata?: Record<string, any> }[] = [];

export const generateRAGResponse = async (query: string): Promise<string> => {
  console.log('Generuję odpowiedź dla zapytania:', query);

  if (documentChunks.length === 0) {
    console.log('Brak dokumentów w pamięci');
    return "Nie wgrano jeszcze żadnego dokumentu. Proszę najpierw wgrać dokument, aby móc zadawać pytania.";
  }

  const relevantChunks = searchRelevantChunks(query);
  
  if (relevantChunks.length === 0) {
    console.log('Nie znaleziono pasujących fragmentów');
    return "Nie znalazłem odpowiednich informacji w wgranym dokumencie, które pomogłyby odpowiedzieć na to pytanie.";
  }

  const context = relevantChunks.join('\n\n');
  const prompt = `Na podstawie poniższego kontekstu, ${query === 'podsumuj' ? 'przedstaw krótkie podsumowanie głównych punktów dokumentu' : 'odpowiedz na pytanie'}. Jeśli odpowiedź nie znajduje się w kontekście, powiedz o tym.

Kontekst:
${context}

${query === 'podsumuj' ? 'Podsumuj najważniejsze informacje z dokumentu.' : `Pytanie: ${query}`}`;

  console.log('Wysyłam zapytanie do Gemini z kontekstem długości:', context.length);
  return getGeminiResponse(prompt);
};

export const searchRelevantChunks = (query: string): string[] => {
  console.log('Szukam fragmentów dla zapytania:', query);
  
  if (documentChunks.length === 0) {
    console.log("Brak przetworzonych dokumentów w pamięci");
    return [];
  }

  if (query.toLowerCase() === 'podsumuj') {
    console.log('Zapytanie o podsumowanie - zwracam wszystkie fragmenty');
    return documentChunks.map(chunk => chunk.text);
  }

  const results = calculateTFIDF(
    query,
    documentChunks.map(chunk => chunk.text)
  );

  // Return top 3 most relevant chunks
  return results.slice(0, 3).map(result => result.text);
};

async function extractMainTopics(text: string): Promise<string[]> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        Przeanalizuj poniższy tekst i wypisz 5 najważniejszych zagadnień lub tematów z tego dokumentu:
        ${text}
        
        Odpowiedź sformatuj jako prostą listę 5 najważniejszych zagadnień, po jednym w linii.
        Zwróć TYLKO te 5 zagadnień, nic więcej.
        
        Przykładowy format odpowiedzi:
        1. Pierwsze zagadnienie
        2. Drugie zagadnienie
        3. Trzecie zagadnienie
        4. Czwarte zagadnienie
        5. Piąte zagadnienie
      `;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const topicsString = response.text();
      // Podziel string na linie i przefiltruj puste linie
      return topicsString.split('\n').filter(line => line.trim() !== '').map(line => line.replace(/^\d+\.\s*/, '').trim());;
    } catch (error) {
      console.error('Error extracting topics:', error);
      return [
        "Nie udało się przetworzyć dokumentu",
        "Spróbuj ponownie później",
        "Sprawdź czy dokument zawiera tekst",
        "Upewnij się, że dokument jest czytelny",
        "Skontaktuj się z administratorem systemu"
      ];
    }
  }


export const processDocumentForRAG = async (text: string) => {
    try {
        console.log('Rozpoczynam przetwarzanie dokumentu dla RAG, długość tekstu:', text.length);
        console.log('Przykład tekstu:', text.substring(0, 200) + '...');

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const chunks = await splitter.createDocuments([text]);
        documentChunks = chunks.map(chunk => ({
            text: chunk.pageContent,
            metadata: chunk.metadata,
        }));

        console.log(`Dokument przetworzony na ${documentChunks.length} fragmentów`);
        console.log('Przykładowy fragment:', documentChunks[0]?.text.substring(0, 100) + '...');

        // Wywołaj funkcję do ekstrakcji tematów
        const mainTopics = await extractMainTopics(text);

        return {
          message: `Dokument został przetworzony na ${documentChunks.length} fragmentów`,
           chunks: documentChunks,
           topics: mainTopics
        }
    } catch (error) {
        console.error("Błąd podczas przetwarzania dokumentu:", error);
        throw new Error("Wystąpił błąd podczas przetwarzania dokumentu");
    }
};
