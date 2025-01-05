import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface EnergyMapProps {
  center: [number, number];
  zoom: number;
}

export const EnergyMap = ({ center, zoom }: EnergyMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !mapRef.current) {
      mapRef.current = L.map(containerRef.current).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      // Add a polygon for Poland's borders with proper LatLngExpression type
      const polandCoordinates: L.LatLngExpression[] = [
        [54.8, 18.0], // Northwest
        [54.3, 19.6], // Northeast
        [51.2, 24.1], // East
        [49.0, 22.5], // Southeast
        [49.0, 19.0], // South
        [51.1, 15.0], // Southwest
        [54.0, 16.2], // West
        [54.8, 18.0]  // Back to start
      ];

      L.polygon(polandCoordinates, {
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.3,
        weight: 2
      }).addTo(mapRef.current);

      // Add marker for center of Poland
      L.marker(center).addTo(mapRef.current)
        .bindPopup('Centrum Polski')
        .openPopup();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom]);

  return (
    <div className="h-[400px] relative bg-muted rounded-lg overflow-hidden border">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
};