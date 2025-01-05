import { FC } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, BarChart2, ZoomIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ChartControlsProps {
  chartType: 'line' | 'bar' | 'composed';
  setChartType: (type: 'line' | 'bar' | 'composed') => void;
  isZoomed: boolean;
  onResetZoom: () => void;
  onExport: (format: 'pdf' | 'jpg') => void;
}

export const ChartControls: FC<ChartControlsProps> = ({
  chartType,
  setChartType,
  isZoomed,
  onResetZoom,
  onExport
}) => {
  return (
    <div className="flex gap-2">
      <Select
        value={chartType}
        onValueChange={(value: 'line' | 'bar' | 'composed') => setChartType(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Wybierz typ wykresu" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="line">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Wykres liniowy</span>
            </div>
          </SelectItem>
          <SelectItem value="bar">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Wykres słupkowy</span>
            </div>
          </SelectItem>
          <SelectItem value="composed">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Wykres złożony</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      {isZoomed && (
        <Button variant="outline" onClick={onResetZoom} size="sm">
          <ZoomIn className="h-4 w-4 mr-2" />
          Reset zoom
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onExport('pdf')}
        className="gap-2"
      >
        Eksportuj PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onExport('jpg')}
        className="gap-2"
      >
        Eksportuj JPG
      </Button>
    </div>
  );
};