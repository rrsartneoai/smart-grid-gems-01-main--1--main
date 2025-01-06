import { useState } from "react";
import { SensorCard } from "./SensorCard";
import { CityTabs } from "./CityTabs";
import { sensorsData } from "./SensorsData";
import { Input } from "@/components/ui/input";
import { AlertsConfig } from "./AlertsConfig";
import { DataComparison } from "./DataComparison";
import { ExportData } from "./ExportData";
import { Search } from "lucide-react";

const SensorsPanel = () => {
  const [selectedCity, setSelectedCity] = useState<string>("gdansk");
  const [searchQuery, setSearchQuery] = useState("");
  
  const cities = Object.keys(sensorsData).map(key => 
    key.charAt(0).toUpperCase() + key.slice(1)
  );
  
  const currentCityData = sensorsData[selectedCity];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city.toLowerCase());
  };

  const filteredSensors = currentCityData.sensors.filter(sensor =>
    sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sensor.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Czujniki</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <span>Last synced in an hour</span>
          <span className="hidden sm:inline">•</span>
          <span>100% est. battery</span>
          <span className="hidden sm:inline">•</span>
          <span>-71 dBm</span>
        </div>
      </div>

      <div className="mb-6">
        <CityTabs
          cities={cities}
          selectedCity={selectedCity}
          onCitySelect={handleCitySelect}
        />
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Szukaj czujników..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mb-6">
        <ExportData />
      </div>

      {currentCityData && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSensors.map((sensor, index) => (
              <SensorCard 
                key={index}
                icon={sensor.icon}
                name={sensor.name}
                value={sensor.value}
                unit={sensor.unit}
                status={sensor.status}
                description={sensor.description}
              />
            ))}
          </div>

          <div className="mt-8 space-y-8">
            <AlertsConfig />
            <DataComparison />
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Dane dla miasta {currentCityData.name}</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                  Poniżej znajdują się szczegółowe informacje o jakości powietrza i warunkach środowiskowych w mieście {currentCityData.name}. 
                  Wszystkie pomiary są aktualizowane w czasie rzeczywistym, zapewniając dokładny obraz stanu środowiska.
                </p>
                <div className="mt-4 grid gap-2">
                  {currentCityData.sensors.map((sensor, index) => (
                    <div key={index} className="p-4 rounded-lg bg-background/50 border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary">{sensor.icon}</span>
                        <span className="font-medium">{sensor.name}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-semibold">{sensor.value}</span>
                          <span className="text-sm text-muted-foreground">{sensor.unit}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{sensor.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SensorsPanel;