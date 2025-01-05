import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card } from '@/components/ui/card';
import { Wind, Sun, Droplet, Factory, Atom } from 'lucide-react';

interface EnergyStatsProps {
  productionData: Record<string, number>;
  carbonIntensity: number;
  renewablePercentage: number;
}

export const EnergyStats = ({ productionData, carbonIntensity, renewablePercentage }: EnergyStatsProps) => {
  const chartData = Object.entries(productionData).map(([source, value]) => ({
    name: source,
    value: value
  }));

  const sourceIcons: Record<string, any> = {
    wind: Wind,
    solar: Sun,
    hydro: Droplet,
    nuclear: Atom,
    coal: Factory,
    gas: Factory,
    biomass: Factory,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Intensywność węglowa</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{ value: carbonIntensity }]}>
                <defs>
                  <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorIntensity)"
                />
                <YAxis domain={[0, 'dataMax + 100']} />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-2xl font-bold">
            {carbonIntensity} gCO₂eq/kWh
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Udział OZE</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{ value: renewablePercentage }]}>
                <defs>
                  <linearGradient id="colorRenewable" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorRenewable)"
                />
                <YAxis domain={[0, 100]} />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-2xl font-bold text-green-500">
            {renewablePercentage}%
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-4">Produkcja energii według źródła</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {Object.entries(productionData).map(([source, value]) => {
            const Icon = sourceIcons[source.toLowerCase()] || Factory;
            return (
              <div key={source} className="flex items-center gap-2 p-2 rounded-lg border">
                <Icon className="h-5 w-5" />
                <div>
                  <div className="text-sm font-medium capitalize">{source}</div>
                  <div className="text-xs text-muted-foreground">
                    {value.toLocaleString()} MW
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};