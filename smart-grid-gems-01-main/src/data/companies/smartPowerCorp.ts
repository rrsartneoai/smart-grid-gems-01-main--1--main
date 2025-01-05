import { Company } from "@/types/company";
import { Activity, Battery, Cpu, DollarSign, Flame, Gauge, Power, Zap } from "lucide-react";

export const smartPowerCorp: Company = {
  id: "4",
  name: "SmartPower Corp",
  stats: [
    {
      title: "Ladunek",
      value: "9,456",
      unit: "MW",
      icon: Power,
      description: "↘️ -1.8% od ostatniego dnia",
      details: [
        { label: "Szczyt dzienny", value: "10,234 MW" },
        { label: "Minimum", value: "8,567 MW" },
        { label: "Średnia", value: "9,456 MW" },
      ],
    },
    {
      title: "Obciążenie netto",
      value: "8,789",
      unit: "MW",
      icon: Zap,
      description: "↘️ -0.3% od ostatniej godziny",
      details: [
        { label: "Szczyt", value: "9,500 MW" },
        { label: "Minimum dzienne", value: "7,800 MW" },
        { label: "Prognoza", value: "8,200 MW" },
      ],
    },
    {
      title: "Cena",
      value: "27.50",
      unit: "/MWh",
      icon: DollarSign,
      description: "↗️ +0.5% od ostatniego odczytu",
      details: [
        { label: "Maksymalna", value: "28.50 /MWh" },
        { label: "Minimalna", value: "26.00 /MWh" },
        { label: "Średnia dzienna", value: "27.00 /MWh" },
      ],
    },
    {
      title: "Główne źródło",
      value: "Gaz ziemny",
      icon: Flame,
      description: "70% udziału w miksie",
      details: [
        { label: "Wydajność", value: "88%" },
        { label: "Emisja CO2", value: "400 g/kWh" },
        { label: "Moc nominalna", value: "12,000 MW" },
      ],
    },
    {
      title: "Częstotliwość sieci",
      value: "50.00",
      unit: "Hz",
      icon: Activity,
      description: "Stabilna częstotliwość",
      details: [
        { label: "Min", value: "49.98 Hz" },
        { label: "Max", value: "50.02 Hz" },
        { label: "Średnia", value: "50.00 Hz" },
      ],
    },
    {
      title: "Wydajność systemu",
      value: "92.5",
      unit: "%",
      icon: Gauge,
      description: "Wysoka wydajność",
      details: [
        { label: "Dzienna", value: "92.3%" },
        { label: "Tygodniowa", value: "92.7%" },
        { label: "Miesięczna", value: "92.4%" },
      ],
    },
    {
      title: "Status baterii",
      value: "75",
      unit: "%",
      icon: Battery,
      description: "Dobry poziom",
      details: [
        { label: "Czas ładowania", value: "3.2h" },
        { label: "Pojemność", value: "400 kWh" },
        { label: "Żywotność", value: "92%" },
      ],
    },
    {
      title: "Wydajność CPU",
      value: "82",
      unit: "%",
      icon: Cpu,
      description: "Wysokie obciążenie",
      details: [
        { label: "Temperatura", value: "48°C" },
        { label: "Wykorzystanie RAM", value: "7.1 GB" },
        { label: "Procesy", value: "156" },
      ],
    }
  ],
  energyData: [
    { name: "00:00", consumption: 250, production: 230, efficiency: 92, timestamp: "2024-01-01T00:00:00" },
    { name: "04:00", consumption: 180, production: 170, efficiency: 94, timestamp: "2024-01-01T04:00:00" },
    { name: "08:00", consumption: 450, production: 420, efficiency: 93, timestamp: "2024-01-01T08:00:00" },
    { name: "12:00", consumption: 650, production: 600, efficiency: 92, timestamp: "2024-01-01T12:00:00" },
    { name: "16:00", consumption: 550, production: 500, efficiency: 91, timestamp: "2024-01-01T16:00:00" },
    { name: "20:00", consumption: 350, production: 320, efficiency: 91, timestamp: "2024-01-01T20:00:00" },
    { name: "23:59", consumption: 250, production: 230, efficiency: 92, timestamp: "2024-01-01T23:59:00" },
  ],
};
