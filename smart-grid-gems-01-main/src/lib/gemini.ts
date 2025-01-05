import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("Missing VITE_GOOGLE_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

export const generateGeminiResponse = async (prompt: string) => {
  if (!API_KEY) {
    return "Przepraszam, ale brak skonfigurowanego klucza API dla Gemini. Proszę skontaktować się z administratorem.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Changed from gemini-1.5-flash to gemini-pro
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Błąd podczas komunikacji z Gemini:", error);
    if (error instanceof Error) {
      return `Przepraszam, wystąpił błąd: ${error.message}. Spróbuj ponownie później.`;
    }
    return "Przepraszam, wystąpił nieznany błąd. Spróbuj ponownie później.";
  }
};

export const getGeminiResponse = generateGeminiResponse;