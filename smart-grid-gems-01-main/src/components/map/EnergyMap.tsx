import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCompanyStore } from '@/components/CompanySidebar';
import { companiesData } from '@/data/companies';

const EnergyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on Tricity (Gdańsk, Sopot, Gdynia)
    map.current = L.map(mapContainer.current).setView([54.372158, 18.638306], 11);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Add markers for Tricity cities
    const cities = [
      { name: 'Gdańsk', coords: [54.372158, 18.638306] },
      { name: 'Sopot', coords: [54.441581, 18.560096] },
      { name: 'Gdynia', coords: [54.518889, 18.531883] }
    ];

    cities.forEach(city => {
      if (!map.current) return;
      L.marker(city.coords as L.LatLngExpression)
        .bindPopup(city.name)
        .addTo(map.current);
    });

    // Add markers for energy consumption points
    selectedCompany?.energyData.forEach((data) => {
      if (!map.current) return;
      
      // Generate random positions around Tricity area
      const lat = 54.372158 + (Math.random() - 0.5) * 0.2;
      const lng = 18.638306 + (Math.random() - 0.5) * 0.2;

      const markerIcon = L.divIcon({
        className: 'bg-transparent',
        html: `<div class="w-4 h-4 rounded-full ${getMarkerColorClass(data.efficiency)}" />`,
      });

      L.marker([lat, lng], { icon: markerIcon })
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${data.name}</h3>
            <p>Zużycie: ${data.consumption} kWh</p>
            <p>Produkcja: ${data.production} kWh</p>
            <p>Efektywność: ${data.efficiency}%</p>
          </div>
        `)
        .addTo(map.current);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [selectedCompanyId]);

  const getMarkerColorClass = (efficiency: number) => {
    if (efficiency >= 80) return 'bg-green-500';
    if (efficiency >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Panel mapy energii</h2>
        <p className="text-muted-foreground">Wizualizacja rozmieszczenia punktów energetycznych</p>
      </div>
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
        <div className="absolute bottom-4 left-4 bg-background/80 p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Legenda</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500" />
              <span>Wysoka efektywność (≥80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500" />
              <span>Średnia efektywność (60-79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <span>Niska efektywność (&lt;60%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyMap;