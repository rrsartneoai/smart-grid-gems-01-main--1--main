import { Progress } from "@/components/ui/progress";

interface ProgressItemProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  onClick: () => void;
}

export const ProgressItem = ({ label, value, icon: Icon, description, onClick }: ProgressItemProps) => {
  return (
    <div 
      className="p-4 rounded-lg bg-card/50 border cursor-pointer hover:bg-card/70 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="font-medium">{label}</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold">{value}%</span>
        </div>
        <Progress value={value} className="h-2" />
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};