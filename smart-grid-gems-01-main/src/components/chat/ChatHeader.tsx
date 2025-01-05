import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Save, StopCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatHeaderProps {
  isSpeaking: boolean;
  isTyping: boolean;
  onStopSpeaking: () => void;
  onSaveHistory: () => void;
}

export function ChatHeader({ isSpeaking, isTyping, onStopSpeaking, onSaveHistory }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b flex items-center justify-between bg-card">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 shadow-sm">
          <AvatarImage src="/lovable-uploads/045f69f0-5424-4c58-a887-6e9e984d428b.png" />
          <AvatarFallback><Bot className="h-6 w-6" /></AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Asystent Sieci Energetycznej</h3>
          <p className="text-sm text-muted-foreground">
            {isTyping ? "Pisze..." : "Zawsze online"}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        {isSpeaking && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onStopSpeaking}
                  className="text-red-500 shadow-sm"
                >
                  <StopCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zatrzymaj odtwarzanie</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onSaveHistory}
                className="shadow-sm"
              >
                <Save className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zapisz historię rozmowy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}