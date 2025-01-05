import { FC } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  Label,
  BarChart,
  Bar,
  ComposedChart,
  Scatter
} from "recharts";
import { CustomTooltip } from './CustomTooltip';

interface ChartRendererProps {
  chartType: 'line' | 'bar' | 'composed';
  data: any[];
  zoomLeft: string | null;
  zoomRight: string | null;
  isZoomed: boolean;
  onMouseDown: (e: any) => void;
  onMouseMove: (e: any) => void;
  onMouseUp: () => void;
}

export const ChartRenderer: FC<ChartRendererProps> = ({
  chartType,
  data,
  zoomLeft,
  zoomRight,
  isZoomed,
  onMouseDown,
  onMouseMove,
  onMouseUp
}) => {
  const commonProps = {
    data,
    margin: { top: 20, right: 30, left: 20, bottom: 80 },
    onMouseDown,
    onMouseMove,
    onMouseUp
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
        allowDataOverflow={true}
        scale="band"
        xAxisId={0}
      >
        <Label value="Czas" position="bottom" offset={50} className="text-sm fill-muted-foreground" />
      </XAxis>
      <YAxis 
        tick={{ fontSize: 12 }} 
        tickMargin={10}
        width={80}
        allowDataOverflow={true}
        scale="auto"
        yAxisId={0}
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