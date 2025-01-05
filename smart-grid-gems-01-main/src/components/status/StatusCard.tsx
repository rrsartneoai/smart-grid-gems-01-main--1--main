import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { CloseButton } from "@/components/ui/close-button";
import { ProgressItem } from "./ProgressItem";

interface StatusCardProps {
  title: string;
  items: Array<{
    label: string;
    value: number;
    icon: any;
    description: string;
  }>;
  onItemClick: (label: string) => void;
  onHide: () => void;
}

export const StatusCard = ({ title, items, onItemClick, onHide }: StatusCardProps) => {
  return (
    <Card className="p-6 bg-[#0A0F1C] border-[#1F2937] hover:shadow-lg transition-shadow relative">
      <CloseButton onClick={onHide} />
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-6">
        {items.map((item) => (
          <ProgressItem
            key={item.label}
            {...item}
            onClick={() => onItemClick(item.label)}
          />
        ))}
      </div>
    </Card>
  );
};