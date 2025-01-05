import { Company } from "@/types/company";
import { Battery, Cpu, Zap, Power, DollarSign, Flame, Activity, Gauge, Timer as Clock } from "lucide-react";

export const energiaPro: Company = {
  id: "1",
  name: "EnergiaPro S.A.",
  stats: [
    {
      title: "Ladunek",
      value: "15,234",
      unit: "MW",
      icon: Power,
      description: "↗️ +7.2% od ostatniego dnia",
      details: [
        { label: "Szczyt dzienny", value: "16,234 MW" },
        { label: "Minimum", value: "13,567 MW" },
        { label: "Średnia", value: "14,456 MW" },
      ],
    },
    {
      title: "Obciążenie netto",
      value: "14,123",
      unit: "MW",
      icon: Zap,
      description: "↘️ -1.5% od ostatniej godziny",
      details: [
        { label: "Szczyt", value: "15,000 MW" },
        { label: "Minimum dzienne", value: "13,000 MW" },
        { label: "Prognoza", value: "14,500 MW" },
      ],
    },
    {
      title: "Cena",
      value: "30.50",
      unit: "/MWh",
      icon: DollarSign,
      description: "↗️ +1.2% od ostatniego odczytu",
      details: [
        { label: "Maksymalna", value: "32.00 /MWh" },
        { label: "Minimalna", value: "29.00 /MWh" },
        { label: "Średnia dzienna", value: "30.00 /MWh" },
      ],
    },
    {
      title: "Główne źródło",
      value: "Węgiel",
      icon: Flame,
      description: "60% udziału w miksie",
      details: [
        { label: "Wydajność", value: "85%" },
        { label: "Emisja CO2", value: "500 g/kWh" },
        { label: "Moc nominalna", value: "20,000 MW" },
      ],
    },
    {
      title: "Częstotliwość sieci",
      value: "50.02",
      unit: "Hz",
      icon: Activity,
      description: "Stabilna częstotliwość w normie",
      details: [
        { label: "Min", value: "49.98 Hz" },
        { label: "Max", value: "50.05 Hz" },
        { label: "Średnia", value: "50.01 Hz" },
      ],
    },
    {
      title: "Napięcie fazowe",
      value: "230.5",
      unit: "V",
      icon: Gauge,
      description: "Optymalne napięcie w sieci",
      details: [
        { label: "Min", value: "228.0 V" },
        { label: "Max", value: "232.0 V" },
        { label: "Średnia", value: "230.2 V" },
      ],
    },
    {
      title: "Jakość sygnału",
      value: "98.5",
      unit: "%",
      icon: Battery,
      description: "Wysoka jakość transmisji danych",
      details: [
        { label: "Utracone pakiety", value: "0.02%" },
        { label: "Opóźnienie", value: "15ms" },
        { label: "Stabilność", value: "99.9%" },
      ],
    },
    {
      title: "Czas odpowiedzi",
      value: "12",
      unit: "ms",
      icon: Clock,
      description: "Szybka komunikacja z urządzeniami",
      details: [
        { label: "Min", value: "8 ms" },
        { label: "Max", value: "25 ms" },
        { label: "Średnia", value: "15 ms" },
      ],
    },
  ],
  energyData: [
    { name: "00:00", consumption: 450, production: 400, efficiency: 89, timestamp: "2024-01-01T00:00:00" },
    { name: "04:00", consumption: 380, production: 350, efficiency: 92, timestamp: "2024-01-01T04:00:00" },
    { name: "08:00", consumption: 650, production: 600, efficiency: 92, timestamp: "2024-01-01T08:00:00" },
    { name: "12:00", consumption: 850, production: 800, efficiency: 94, timestamp: "2024-01-01T12:00:00" },
    { name: "16:00", consumption: 750, production: 700, efficiency: 93, timestamp: "2024-01-01T16:00:00" },
    { name: "20:00", consumption: 550, production: 500, efficiency: 91, timestamp: "2024-01-01T20:00:00" },
    { name: "23:59", consumption: 450, production: 400, efficiency: 89, timestamp: "2024-01-01T23:59:00" },
  ],
};
