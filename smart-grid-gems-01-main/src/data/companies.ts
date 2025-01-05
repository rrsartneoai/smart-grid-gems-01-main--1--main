import { Company } from "@/types/company";
import { Battery, Cpu, Zap, Power, DollarSign, Flame, Activity, Gauge, Wifi, Timer } from "lucide-react";

export const companiesData: Company[] = [
  {
    id: "1", // Zmieniono na string
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
        icon: Wifi,
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
        icon: Timer,
        description: "Szybka komunikacja z urządzeniami",
        details: [
          { label: "Min", value: "8 ms" },
          { label: "Max", value: "25 ms" },
          { label: "Średnia", value: "15 ms" },
        ],
      },
    ],
    energyData: [
      { name: "00:00", consumption: 450, production: 400, efficiency: 89 },
      { name: "04:00", consumption: 380, production: 350, efficiency: 92 },
      { name: "08:00", consumption: 650, production: 600, efficiency: 92 },
      { name: "12:00", consumption: 850, production: 800, efficiency: 94 },
      { name: "16:00", consumption: 750, production: 700, efficiency: 93 },
      { name: "20:00", consumption: 550, production: 500, efficiency: 91 },
      { name: "23:59", consumption: 450, production: 400, efficiency: 89 },
    ],
  },
  {
    id: "2", // Zmieniono na string
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
        title: "Cena",
        value: "28.75",
        unit: "/MWh",
        icon: DollarSign,
        description: "↗️ +0.5% od ostatniego odczytu",
        details: [
          { label: "Maksymalna", value: "30.00 /MWh" },
          { label: "Minimalna", value: "27.00 /MWh" },
          { label: "Średnia dzienna", value: "28.50 /MWh" },
        ],
      },
      {
        title: "Główne źródło",
        value: "Energia odnawialna",
        icon: Flame,
        description: "75% udziału w miksie",
        details: [
          { label: "Wydajność", value: "90%" },
          { label: "Emisja CO2", value: "200 g/kWh" },
          { label: "Moc nominalna", value: "15,000 MW" },
        ],
      },
    ],
    energyData: [
      { name: "00:00", consumption: 350, production: 320, efficiency: 91 },
      { name: "04:00", consumption: 280, production: 260, efficiency: 93 },
      { name: "08:00", consumption: 550, production: 520, efficiency: 95 },
      { name: "12:00", consumption: 750, production: 700, efficiency: 93 },
      { name: "16:00", consumption: 650, production: 600, efficiency: 92 },
      { name: "20:00", consumption: 450, production: 420, efficiency: 93 },
      { name: "23:59", consumption: 350, production: 320, efficiency: 91 },
    ],
  },
  {
    id: "3", // Zmieniono na string
    name: "EkoEnergia Plus",
    stats: [
      {
        title: "Ladunek",
        value: "18,923",
        unit: "MW",
        icon: Power,
        description: "↗️ +4.5% od ostatniego dnia",
        details: [
          { label: "Szczyt dzienny", value: "19,234 MW" },
          { label: "Minimum", value: "17,567 MW" },
          { label: "Średnia", value: "18,456 MW" },
        ],
      },
      {
        title: "Obciążenie netto",
        value: "17,456",
        unit: "MW",
        icon: Zap,
        description: "↘️ -1.0% od ostatniej godziny",
        details: [
          { label: "Szczyt", value: "18,000 MW" },
          { label: "Minimum dzienne", value: "16,500 MW" },
          { label: "Prognoza", value: "17,000 MW" },
        ],
      },
      {
        title: "Cena",
        value: "29.00",
        unit: "/MWh",
        icon: DollarSign,
        description: "↗️ +1.0% od ostatniego odczytu",
        details: [
          { label: "Maksymalna", value: "31.00 /MWh" },
          { label: "Minimalna", value: "28.00 /MWh" },
          { label: "Średnia dzienna", value: "29.50 /MWh" },
        ],
      },
      {
        title: "Główne źródło",
        value: "Energia wiatrowa",
        icon: Flame,
        description: "80% udziału w miksie",
        details: [
          { label: "Wydajność", value: "95%" },
          { label: "Emisja CO2", value: "150 g/kWh" },
          { label: "Moc nominalna", value: "18,000 MW" },
        ],
      },
    ],
    energyData: [
      { name: "00:00", consumption: 550, production: 500, efficiency: 91 },
      { name: "04:00", consumption: 480, production: 450, efficiency: 94 },
      { name: "08:00", consumption: 750, production: 700, efficiency: 93 },
      { name: "12:00", consumption: 950, production: 900, efficiency: 95 },
      { name: "16:00", consumption: 850, production: 800, efficiency: 94 },
      { name: "20:00", consumption: 650, production: 600, efficiency: 92 },
      { name: "23:59", consumption: 550, production: 500, efficiency: 91 },
    ],
  },
  {
    id: "4", // Zmieniono na string
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
    ],
    energyData: [
      { name: "00:00", consumption: 250, production: 230, efficiency: 92 },
      { name: "04:00", consumption: 180, production: 170, efficiency: 94 },
      { name: "08:00", consumption: 450, production: 420, efficiency: 93 },
      { name: "12:00", consumption: 650, production: 600, efficiency: 92 },
      { name: "16:00", consumption: 550, production: 500, efficiency: 91 },
      { name: "20:00", consumption: 350, production: 320, efficiency: 91 },
      { name: "23:59", consumption: 250, production: 230, efficiency: 92 },
    ],
  },
  {
    id: "5", // Zmieniono na string
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
        value: "Odnawialne źródła energii",
        icon: Flame,
        description: "85% udziału w miksie",
        details: [
          { label: "Wydajność", value: "92%" },
          { label: "Emisja CO2", value: "100 g/kWh" },
          { label: "Moc nominalna", value: "10,000 MW" },
        ],
      },
    ],
    energyData: [
      { name: "00:00", consumption: 450, production: 420, efficiency: 93 },
      { name: "04:00", consumption: 380, production: 360, efficiency: 95 },
      { name: "08:00", consumption: 650, production: 620, efficiency: 95 },
      { name: "12:00", consumption: 850, production: 800, efficiency: 94 },
      { name: "16:00", consumption: 750, production: 700, efficiency: 93 },
      { name: "20:00", consumption: 550, production: 520, efficiency: 95 },
      { name: "23:59", consumption: 450, production: 420, efficiency: 93 },
    ],
  }
];
