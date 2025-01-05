import { Company } from "@/types/company";
import { Battery, Cpu, Zap, Power, DollarSign, Flame, Activity, Gauge, Wifi, Timer, Cloud, Sun } from "lucide-react";

export const greenTech: Company = {
  id: "2",
  name: "GreenTech Industries",
  stats: [
    {
      title: "Ladunek",
      value: "12,567",
      unit: "MW",
      icon: Power,
      description: "↘️ -2.1% od ostatniego dnia",
      details: [
        { label: "Szczyt dzienny", value: "13,234 MW" },
        { label: "Minimum", value: "11,567 MW" },
        { label: "Średnia", value: "12,456 MW" },
      ],
    },
    {
      title: "Obciążenie netto",
      value: "11,789",
      unit: "MW",
      icon: Zap,
      description: "↘️ -0.5% od ostatniej godziny",
      details: [
        { label: "Szczyt", value: "12,500 MW" },
        { label: "Minimum dzienne", value: "10,800 MW" },
        { label: "Prognoza", value: "11,200 MW" },
      ],
    },
    {
      title: "Efektywność",
      value: "94.5",
      unit: "%",
      icon: Gauge,
      description: "↗️ +1.2% od ostatniego odczytu",
      details: [
        { label: "Maksymalna", value: "96.5%" },
        { label: "Minimalna", value: "92.0%" },
        { label: "Średnia", value: "94.0%" },
      ],
    },
    {
      title: "Temperatura",
      value: "42",
      unit: "°C",
      icon: Sun,
      description: "Stabilna temperatura operacyjna",
      details: [
        { label: "Max", value: "45°C" },
        { label: "Min", value: "38°C" },
        { label: "Optymalna", value: "40°C" },
      ],
    },
    {
      title: "Zużycie energii",
      value: "856",
      unit: "kWh",
      icon: Battery,
      description: "↘️ -3.2% od wczoraj",
      details: [
        { label: "Szczyt", value: "920 kWh" },
        { label: "Minimum", value: "780 kWh" },
        { label: "Średnia", value: "850 kWh" },
      ],
    },
    {
      title: "Wydajność systemu",
      value: "98.2",
      unit: "%",
      icon: Cpu,
      description: "Optymalna wydajność",
      details: [
        { label: "Uptime", value: "99.9%" },
        { label: "Błędy", value: "0.1%" },
        { label: "Wykorzystanie", value: "85%" },
      ],
    },
    {
      title: "Jakość sygnału",
      value: "95",
      unit: "%",
      icon: Wifi,
      description: "Stabilne połączenie",
      details: [
        { label: "Siła", value: "95%" },
        { label: "Zakłócenia", value: "2%" },
        { label: "Opóźnienie", value: "5ms" },
      ],
    },
    {
      title: "Emisja CO2",
      value: "125",
      unit: "kg",
      icon: Cloud,
      description: "↘️ -5% od ostatniego miesiąca",
      details: [
        { label: "Dzienna", value: "125 kg" },
        { label: "Miesięczna", value: "3750 kg" },
        { label: "Roczna", value: "45000 kg" },
      ],
    },
  ],
  energyData: [
    { name: "00:00", consumption: 350, production: 320, efficiency: 91, timestamp: "2024-01-01T00:00:00" },
    { name: "04:00", consumption: 280, production: 260, efficiency: 93, timestamp: "2024-01-01T04:00:00" },
    { name: "08:00", consumption: 550, production: 520, efficiency: 95, timestamp: "2024-01-01T08:00:00" },
    { name: "12:00", consumption: 750, production: 700, efficiency: 93, timestamp: "2024-01-01T12:00:00" },
    { name: "16:00", consumption: 650, production: 600, efficiency: 92, timestamp: "2024-01-01T16:00:00" },
    { name: "20:00", consumption: 450, production: 420, efficiency: 93, timestamp: "2024-01-01T20:00:00" },
    { name: "23:59", consumption: 350, production: 320, efficiency: 91, timestamp: "2024-01-01T23:59:00" },
  ],
};
