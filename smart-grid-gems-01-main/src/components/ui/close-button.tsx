import { X } from "lucide-react";
import { Button } from "./button";

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <Button
    variant="ghost"
    size="icon"
    className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-70 hover:opacity-100"
    onClick={onClick}
  >
    <X className="h-4 w-4" />
  </Button>
);