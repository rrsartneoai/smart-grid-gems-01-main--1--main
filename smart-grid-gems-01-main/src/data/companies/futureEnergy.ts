import { Company } from "@/types/company";
import { Activity, Battery, Cpu, DollarSign, Flame, Gauge, Power, Zap } from "lucide-react";

export const futureEnergy: Company = {
  id: "5",
  name: "FutureEnergy Sp. z o.o.",
  stats: [
    {
      title: "Ladunek",
      value: "14,789",
      unit: "MW",
      icon: Power,
      description: "↗️ +3.4% od ostatniego dnia",
      details: [
        { label: "Szczyt dzienny", value: "15,234 MW" },
        { label: "Minimum", value: "13,567 MW" },
        { label: "Średnia", value: "14,456 MW" },
      ],
    },
    {
      title: "Obciążenie netto",
      value: "13,456",
      unit: "MW",
      icon: Zap,
      description: "↘️ -0.7% od ostatniej godziny",
      details: [
        { label: "Szczyt", value: "14,000 MW" },
        { label: "Minimum dzienne", value: "12,500 MW" },
        { label: "Prognoza", value: "13,000 MW" },
      ],
    },
    {
      title: "Cena",
      value: "31.00",
      unit: "/MWh",
      icon: DollarSign,
      description: "↗️ +1.5% od ostatniego odczytu",
      details: [
        { label: "Maksymalna", value: "32.50 /MWh" },
        { label: "Minimalna", value: "30.00 /MWh" },
        { label: "Średnia dzienna", value: "31.50 /MWh" },
      ],
    },
    {
      title: "Główne źródło",
      value: "Odnawialne źródła",
      icon: Flame,
      description: "85% udziału w miksie",
      details: [
        { label: "Wydajność", value: "92%" },
        { label: "Emisja CO2", value: "100 g/kWh" },
        { label: "Moc nominalna", value: "10,000 MW" },
      ],
    },
    {
      title: "Częstotliwość sieci",
      value: "50.03",
      unit: "Hz",
      icon: Activity,
      description: "Stabilna częstotliwość",
      details: [
        { label: "Min", value: "49.99 Hz" },
        { label: "Max", value: "50.05 Hz" },
        { label: "Średnia", value: "50.02 Hz" },
      ],
    },
    {
      title: "Wydajność systemu",
      value: "96.5",
      unit: "%",
      icon: Gauge,
      description: "Wysoka wydajność",
      details: [
        { label: "Dzienna", value: "96.3%" },
        { label: "Tygodniowa", value: "96.7%" },
        { label: "Miesięczna", value: "96.4%" },
      ],
    },
    {
      title: "Status baterii",
      value: "90",
      unit: "%",
      icon: Battery,
      description: "Optymalny poziom",
      details: [
        { label: "Czas ładowania", value: "2.0h" },
        { label: "Pojemność", value: "600 kWh" },
        { label: "Żywotność", value: "97%" },
      ],
    },
    {
      title: "Wydajność CPU",
      value: "65",
      unit: "%",
      icon: Cpu,
      description: "Normalne obciążenie",
      details: [
        { label: "Temperatura", value: "42°C" },
        { label: "Wykorzystanie RAM", value: "5.8 GB" },
        { label: "Procesy", value: "98" },
      ],
    }
  ],
  energyData: [
    { name: "00:00", consumption: 450, production: 420, efficiency: 93, timestamp: "2024-01-01T00:00:00" },
    { name: "04:00", consumption: 380, production: 360, efficiency: 95, timestamp: "2024-01-01T04:00:00" },
    { name: "08:00", consumption: 650, production: 620, efficiency: 95, timestamp: "2024-01-01T08:00:00" },
    { name: "12:00", consumption: 850, production: 800, efficiency: 94, timestamp: "2024-01-01T12:00:00" },
    { name: "16:00", consumption: 750, production: 700, efficiency: 93, timestamp: "2024-01-01T16:00:00" },
    { name: "20:00", consumption: 550, production: 520, efficiency: 95, timestamp: "2024-01-01T20:00:00" },
    { name: "23:59", consumption: 450, production: 420, efficiency: 93, timestamp: "2024-01-01T23:59:00" },
  ],
};
