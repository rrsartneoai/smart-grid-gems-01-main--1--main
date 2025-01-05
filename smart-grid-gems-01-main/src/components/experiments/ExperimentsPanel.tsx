import { WeatherPanel } from "@/components/weather/WeatherPanel";
import { EnergyCard } from "./EnergyCard";
import { ChargingStationsCard } from "./charging/ChargingStationsCard";
import { BikeStationsCard } from "./bikes/BikeStationsCard";
import { WeatherMap } from "@/components/weather/WeatherMap";
import { WeatherForecastMap } from "@/components/weather/WeatherForecastMap";
import { Card } from "@/components/ui/card";
import { Cloud, MapPin } from "lucide-react";

export const ExperimentsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherPanel />
        <WeatherForecastMap />
      </div>
      
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Mapa opadów</h2>
        </div>
        <WeatherMap />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnergyCard />
        <ChargingStationsCard />
      </div>

      <BikeStationsCard />
    </div>
  );
};
