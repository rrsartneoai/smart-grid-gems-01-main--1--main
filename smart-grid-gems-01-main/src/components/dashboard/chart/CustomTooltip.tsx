import { FC } from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

export const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-background/95 border rounded-lg p-3 shadow-lg">
      <p className="font-medium mb-2">{`Time: ${label}`}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium">
            {entry.value} {entry.name === "Efficiency" ? "%" : "MW"}
          </span>
        </div>
      ))}
    </div>
  );
};