import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export const useHiddenItems = (storageKey: string) => {
  const { toast } = useToast();
  const [hiddenItems, setHiddenItems] = useState<string[]>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(hiddenItems));
  }, [hiddenItems, storageKey]);

  const hideItem = (itemId: string) => {
    setHiddenItems(prev => [...prev, itemId]);
    toast({
      title: "Element ukryty",
      description: "Możesz go przywrócić używając przycisku 'Przywróć ukryte'",
    });
  };

  const restoreItems = () => {
    const count = hiddenItems.length;
    if (count > 0) {
      setHiddenItems([]);
      toast({
        title: "Elementy przywrócone",
        description: `Przywrócono ${count} elementów`,
      });
    }
  };

  const isHidden = (itemId: string) => hiddenItems.includes(itemId);

  return { hiddenItems, hideItem, restoreItems, isHidden };
};