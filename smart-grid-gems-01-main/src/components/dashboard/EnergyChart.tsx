import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface EnergyChartProps {
  chartType: "consumption" | "production" | "efficiency";
  title: string;
}

export function EnergyChart({ chartType, title }: EnergyChartProps) {
  // Sample data - replace with actual data in production
  const data = [
    { name: "00:00", value: 400 },
    { name: "04:00", value: 300 },
    { name: "08:00", value: 600 },
    { name: "12:00", value: 800 },
    { name: "16:00", value: 700 },
    { name: "20:00", value: 500 },
  ];

  const getChartColor = () => {
    switch (chartType) {
      case "consumption":
        return "#ef4444";
      case "production":
        return "#22c55e";
      case "efficiency":
        return "#3b82f6";
      default:
        return "#64748b";
    }
  };

  return (
    <Card className="p-4">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={getChartColor()}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}