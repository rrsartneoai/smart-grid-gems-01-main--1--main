import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function WeatherMap() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(containerRef.current).setView([52.237049, 21.017532], 6);

    // Add OpenStreetMap base layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Add OpenWeatherMap precipitation layer
    L.tileLayer(
      `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
      {
        attribution: '© OpenWeatherMap',
        opacity: 0.5
      }
    ).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <Card className="relative w-full h-[400px] overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
    </Card>
  );
}