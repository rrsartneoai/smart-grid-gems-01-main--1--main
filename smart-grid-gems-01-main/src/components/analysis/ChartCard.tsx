import { Card } from "@/components/ui/card";
import { CloseButton } from "@/components/ui/close-button";
import { ResponsiveContainer } from "recharts";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  onHide: () => void;
}

export const ChartCard = ({ title, children, onHide }: ChartCardProps) => {
  return (
    <Card className="p-6 relative">
      <CloseButton onClick={onHide} />
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};