import { LucideIcon } from "lucide-react";

export interface EnergyData {
  name: string;
  consumption: number;
  production: number;
  efficiency: number;
  timestamp?: string;
}

export interface CompanyStats {
  title: string;
  value: number | string;
  unit?: string;
  icon: LucideIcon;
  description: string;
  details: Array<{
    label: string;
    value: string;
  }>;
}

export interface Company {
  id: string;
  name: string;
  stats: CompanyStats[];
  energyData: EnergyData[];
  description?: string;
}

export interface CompanyStoreState {
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string) => void;
}