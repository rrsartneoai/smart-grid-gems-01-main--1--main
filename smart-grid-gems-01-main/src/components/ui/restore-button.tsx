import { RefreshCw } from "lucide-react";
import { Button } from "./button";

interface RestoreButtonProps {
  onClick: () => void;
  hiddenCount: number;
}

export const RestoreButton = ({ onClick, hiddenCount }: RestoreButtonProps) => {
  if (hiddenCount === 0) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={onClick}
    >
      <RefreshCw className="h-4 w-4" />
      Przywróć ukryte ({hiddenCount})
    </Button>
  );
};