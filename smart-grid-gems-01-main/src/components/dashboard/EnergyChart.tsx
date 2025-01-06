import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceArea,
  Label,
  BarChart,
  Bar,
  ComposedChart,
  Scatter,
} from "recharts";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ZoomIn, BarChart2, LineChart as LineChartIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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

export function EnergyChart() {
  const { toast } = useToast();
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );
  const [zoomLeft, setZoomLeft] = useState<string | null>(null);
  const [zoomRight, setZoomRight] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'bar' | 'composed'>('line');
  const chartRef = useRef<HTMLDivElement>(null);

  const handleZoom = (area: { left?: string; right?: string }) => {
    if (!area.left || !area.right || area.left === area.right) {
      setZoomLeft(null);
      setZoomRight(null);
      setIsZoomed(false);
      return;
    }

    setZoomLeft(area.left);
    setZoomRight(area.right);
    setIsZoomed(true);
  };

  const handleResetZoom = () => {
    setZoomLeft(null);
    setZoomRight(null);
    setIsZoomed(false);
  };

  const handleExport = async (format: 'pdf' | 'jpg') => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current);
      
      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('chart-export.pdf');
        
        toast({
          title: "Wykres wyeksportowany",
          description: "Plik PDF został pobrany",
        });
      } else {
        const link = document.createElement('a');
        link.download = 'chart-export.jpg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
        
        toast({
          title: "Wykres wyeksportowany",
          description: "Plik JPG został pobrany",
        });
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować wykresu",
        variant: "destructive",
      });
    }
  };

  const renderChart = () => {
    const commonProps = {
      data: selectedCompany?.energyData,
      margin: { top: 20, right: 30, left: 20, bottom: 80 },
      onMouseDown: (e: any) => e?.activeLabel && setZoomLeft(e.activeLabel),
      onMouseMove: (e: any) => isZoomed && e?.activeLabel && setZoomRight(e.activeLabel),
      onMouseUp: () => handleZoom({ left: zoomLeft || '', right: zoomRight || '' })
    };

    const commonAxes = (
      <>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="name" 
          height={80}
          tick={{ fontSize: 12 }} 
          tickMargin={30}
          angle={-45}
          textAnchor="end"
          domain={isZoomed && zoomLeft && zoomRight ? [zoomLeft, zoomRight] : ['auto', 'auto']}
        >
          <Label value="Czas" position="bottom" offset={50} className="text-sm fill-muted-foreground" />
        </XAxis>
        <YAxis 
          tick={{ fontSize: 12 }} 
          tickMargin={10}
          width={80}
        >
          <Label 
            value="Wartość (MW / %)" 
            angle={-90} 
            position="left" 
            offset={0}
            className="text-sm fill-muted-foreground"
          />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          wrapperStyle={{
            paddingTop: "20px",
            borderTop: "1px solid var(--border)",
          }}
        />
      </>
    );

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {commonAxes}
            <Bar dataKey="consumption" name="Zużycie" fill="#ef4444" />
            <Bar dataKey="production" name="Produkcja" fill="#34d399" />
            <Bar dataKey="efficiency" name="Wydajność" fill="#60a5fa" />
          </BarChart>
        );
      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            {commonAxes}
            <Bar dataKey="consumption" name="Zużycie" fill="#ef4444" />
            <Line type="monotone" dataKey="production" name="Produkcja" stroke="#34d399" />
            <Scatter dataKey="efficiency" name="Wydajność" fill="#60a5fa" />
          </ComposedChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            {commonAxes}
            <Line
              type="monotone"
              dataKey="consumption"
              name="Zużycie"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="production"
              name="Produkcja"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="efficiency"
              name="Wydajność"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            {zoomLeft && zoomRight && (
              <ReferenceArea
                x1={zoomLeft}
                x2={zoomRight}
                strokeOpacity={0.3}
                fill="rgba(96, 165, 250, 0.1)"
              />
            )}
          </LineChart>
        );
    }
  };

  return (
    <Card className="col-span-4 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Zużycie energii - {selectedCompany?.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            Monitorowanie zużycia, produkcji i wydajności w czasie rzeczywistym
          </p>
        </div>
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
                  <LineChartIcon className="h-4 w-4" />
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
            <Button variant="outline" onClick={handleResetZoom} size="sm">
              <ZoomIn className="h-4 w-4 mr-2" />
              Reset zoom
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
            className="gap-2"
          >
            Eksportuj PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('jpg')}
            className="gap-2"
          >
            Eksportuj JPG
          </Button>
        </div>
      </div>
      
      <div ref={chartRef} className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}