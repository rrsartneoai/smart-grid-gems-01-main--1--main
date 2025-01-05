import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const tutorialSteps = [
   {
    title: "Witaj w Panelu Monitorowania",
    description: "Poznaj podstawowe funkcje Asystenta Sieci Energetycznej. Kliknij w przycisk Asysten AI w menu firmy i zadaj pytanie lub wgraj plik",
  },
  {
    title: "Witaj w Panelu Monitorowania",
    description: "Poznaj podstawowe funkcje systemu monitorowania sieci energetycznej. Użyj ciemnego motywu dla lepszej czytelności w nocy.",
  },
  {
    title: "Personalizacja i Nawigacja",
    description: "Możesz rozwiać kafelki, aby dostosować układ do swoich potrzeb. Użyj zakładek na górze, aby przełączać się między różnymi widokami.",
  },
  {
    title: "Szczegółowe Informacje",
    description: "Kliknij na kafelek, aby zobaczyć więcej szczegółów. Mini-wykresy pokazują trendy w czasie rzeczywistym.",
  },
];

export function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      localStorage.setItem("hasSeenTutorial", "true");
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{tutorialSteps[currentStep].title}</DialogTitle>
          <DialogDescription className="mt-4 text-base leading-relaxed">
            {tutorialSteps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between mt-8">
          <Button variant="ghost" onClick={handleSkip} className="hover:bg-secondary">
            Pomiń
          </Button>
          <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
            {currentStep === tutorialSteps.length - 1 ? "Zakończ" : "Dalej"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
