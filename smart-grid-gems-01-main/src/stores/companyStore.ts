import { create } from 'zustand';

interface CompanyStore {
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  selectedCompanyId: "1", // Default to first company
  setSelectedCompanyId: (id: string) => set({ selectedCompanyId: id }),
}));