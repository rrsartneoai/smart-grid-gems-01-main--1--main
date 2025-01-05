import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { CloseButton } from "@/components/ui/close-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface SensorCardProps {
  icon: ReactNode;
  name: string;
  value: string;
  unit: string;
  status: "Good" | "Warning";
  description: string;
  tooltip: string;
  onHide: () => void;
}

export const SensorCard = ({
  icon,
  name,
  value,
  unit,
  status,
  description,
  tooltip,
  onHide
}: SensorCardProps) => {
  return (
    <TooltipProvider>
      <Card className="p-4 transition-all duration-200 hover:shadow-md relative group">
        <CloseButton onClick={onHide} />
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">{icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{name}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Badge
                variant="outline"
                className={`${
                  status === "Good"
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                }`}
              >
                {status}
              </Badge>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-semibold">{value}</span>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground pt-2 border-t mt-2">
          {description}
        </div>
      </Card>
    </TooltipProvider>
  );
};