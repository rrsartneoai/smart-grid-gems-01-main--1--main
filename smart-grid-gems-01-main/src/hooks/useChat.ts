import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { generateGeminiResponse } from "@/lib/gemini";
import { isEnergyRelated, getDashboardValue } from "./chat/useEnergyQueries";
import { Message } from "./chat/types";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Witaj! Jestem asystentem AI specjalizującym się w analizie danych energetycznych i zarządzaniu siecią. Mogę pomóc Ci w:

- Monitorowaniu zużycia i produkcji energii
- Analizie wydajności systemu
- Sprawdzaniu statusu urządzeń
- Analizie awarii i problemów
- Interpretacji danych z czujników

Możesz też zadawać mi ogólne pytania - postaram się pomóc wykorzystując możliwości sztucznej inteligencji.

W czym mogę Ci pomóc?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const clearConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: `Witaj! Jestem asystentem AI specjalizującym się w analizie danych energetycznych i zarządzaniu siecią. Mogę pomóc Ci w:

- Monitorowaniu zużycia i produkcji energii
- Analizie wydajności systemu
- Sprawdzaniu statusu urządzeń
- Analizie awarii i problemów
- Interpretacji danych z czujników

Możesz też zadawać mi ogólne pytania - postaram się pomóc wykorzystując możliwości sztucznej inteligencji.

W czym mogę Ci pomóc?`,
        timestamp: new Date(),
      },
    ]);
    toast({
      title: "Konwersacja wyczyszczona",
      description: "Historia czatu została zresetowana.",
    });
  };

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (input: string) => {
      // Check if the query is energy-related
      if (isEnergyRelated(input)) {
        return getDashboardValue(input);
      }

      // For general queries, use Gemini API
      try {
        const response = await generateGeminiResponse(`Jesteś asystentem AI w aplikacji do zarządzania energią. Odpowiedz na pytanie użytkownika, pamiętając o kontekście aplikacji: ${input}`);
        return { text: response };
      } catch (error) {
        console.error("Error from Gemini API:", error);
        return {
          text: "Przepraszam, wystąpił problem z uzyskaniem odpowiedzi. Spróbuj ponownie później."
        };
      }
    },
    onSuccess: (response) => {
      const newMessage = {
        role: "assistant" as const,
        content: response.text,
        timestamp: new Date(),
        dataVisualizations: response.visualizations,
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Nie udało się uzyskać odpowiedzi. Spróbuj ponownie.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    sendMessage(input);
    setInput("");
  };

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    isPending,
    clearConversation
  };
};