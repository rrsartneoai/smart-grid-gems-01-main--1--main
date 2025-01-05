import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Info } from "lucide-react";
import { fetchEnergyData } from "@/utils/electricityApi";
import { EnergyMap } from "./EnergyMap";
import { EnergyStats } from "./EnergyStats";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LoadingSpinner = () => (
  <div className="h-[400px] w-full bg-muted rounded-lg flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

const timeRanges = [
  { id: '24h', label: '24 godziny' },
  { id: '72h', label: '72 godziny' },
  { id: '30d', label: '30 dni' },
  { id: '12mo', label: '12 miesięcy' },
];

export function EnergyMaps() {
  const [selectedRange, setSelectedRange] = useState('24h');
  const { toast } = useToast();
  const mapCenter = [52.0689, 19.4803] as [number, number];

  const { data: energyData, isLoading } = useQuery({
    queryKey: ['energy-data', selectedRange],
    queryFn: async () => {
      try {
        const data = await fetchEnergyData(localStorage.getItem('ELECTRICITY_MAPS_API_KEY') || '');
        return {
          production: data.production,
          carbonIntensity: data.carbonIntensity,
          renewablePercentage: data.renewablePercentage
        };
      } catch (error) {
        toast({
          title: "Błąd API",
          description: error instanceof Error ? error.message : "Nie udało się pobrać danych",
          variant: "destructive",
        });
        throw error;
      }
    },
    refetchInterval: 300000, // 5 minutes
    enabled: !!localStorage.getItem('ELECTRICITY_MAPS_API_KEY')
  });

  const handleApiKeySet = () => {
    const apiKey = prompt("Wprowadź klucz API Electricity Maps:");
    if (apiKey) {
      localStorage.setItem('ELECTRICITY_MAPS_API_KEY', apiKey);
      window.location.reload();
    }
  };

  if (!localStorage.getItem('ELECTRICITY_MAPS_API_KEY')) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Wymagany klucz API</h3>
            <p className="text-sm text-muted-foreground">
              Aby korzystać z mapy energetycznej, potrzebujesz klucza API z Electricity Maps.
            </p>
            <Button onClick={handleApiKeySet}>
              Ustaw klucz API
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Mapa Energetyczna Polski</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-sm">
                  Dane o produkcji i zużyciu energii w Polsce
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={selectedRange}
              onValueChange={setSelectedRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Wybierz zakres" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.id} value={range.id}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleApiKeySet}>
              Zmień klucz API
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            <EnergyMap center={mapCenter} zoom={6} />
            <EnergyStats 
              productionData={energyData?.production || {}}
              carbonIntensity={energyData?.carbonIntensity || 0}
              renewablePercentage={energyData?.renewablePercentage || 0}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}