import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function WeatherForecastMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState(localStorage.getItem('MAPBOX_TOKEN') || '');
  const { toast } = useToast();

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [19.145136, 51.919438], // Center of Poland
      zoom: 5,
      antialias: true
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // Add weather layers here when you have the Tomorrow.io API key
      toast({
        title: "Mapa pogodowa załadowana",
        description: "Możesz teraz przeglądać prognozę pogody",
      });
    });
  };

  const handleTokenSubmit = () => {
    localStorage.setItem('MAPBOX_TOKEN', mapboxToken);
    if (map.current) {
      map.current.remove();
    }
    initializeMap();
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (!mapboxToken) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Konfiguracja mapy pogodowej</h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Aby wyświetlić mapę pogodową, wprowadź token Mapbox. Możesz go uzyskać na stronie{' '}
            <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary">
              Mapbox
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Wprowadź token Mapbox"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button onClick={handleTokenSubmit}>Zapisz</Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Prognoza pogody</h3>
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>
    </Card>
  );
}