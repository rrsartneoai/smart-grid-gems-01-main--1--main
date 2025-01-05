import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronLeft, ChevronRight, Plus, Bot, Search, MessageSquare } from "lucide-react";
import { companiesData } from "@/data/companies";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { CompanyStoreState } from "@/types/company";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";

export const useCompanyStore = create<CompanyStoreState>((set) => ({
  selectedCompanyId: "1",
  setSelectedCompanyId: (id: string) => set({ selectedCompanyId: id }),
}));

export function CompanySidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedCompanyId, setSelectedCompanyId } = useCompanyStore();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const currentHash = location.hash.slice(1);
  const isAIAssistantVisible = ['insights', 'status', 'sensors'].includes(currentHash);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleAddCompany = () => {
    toast({
      title: "Funkcja w przygotowaniu",
      description: "Możliwość dodawania nowych firm będzie dostępna wkrótce.",
    });
  };

  const handleOpenAssistant = () => {
    console.log('Current hash:', currentHash);
    console.log('Is AI Assistant visible:', isAIAssistantVisible);
    
    if (!isAIAssistantVisible) {
      toast({
        title: "Asystent AI",
        description: "Asystent AI jest dostępny tylko w sekcjach Analiza, Status i Czujniki.",
        variant: "destructive"
      });
      return;
    }
    const event = new CustomEvent('openAssistant');
    window.dispatchEvent(event);
  };

  const filteredCompanies = companiesData.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SidebarContent 
          handleAddCompany={handleAddCompany} 
          handleOpenAssistant={handleOpenAssistant}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredCompanies={filteredCompanies}
          isAIAssistantVisible={isAIAssistantVisible}
          navigate={navigate}
        />
      </SheetContent>
      <aside className={`fixed left-0 top-0 z-30 h-screen transition-all duration-300 bg-background border-r ${collapsed ? "w-[60px]" : "w-[300px]"} hidden lg:block`}>
        <Button
          variant="ghost"
          onClick={toggleCollapse}
          className="absolute -right-4 top-4 z-50 flex items-center gap-2"
        >
          {collapsed ? (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sm">Rozwiń</span>
            </>
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm">Zwiń</span>
            </>
          )}
        </Button>
        <SidebarContent 
          collapsed={collapsed} 
          handleAddCompany={handleAddCompany} 
          handleOpenAssistant={handleOpenAssistant}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredCompanies={filteredCompanies}
          isAIAssistantVisible={isAIAssistantVisible}
          navigate={navigate}
        />
      </aside>
    </Sheet>
  );
}

interface SidebarContentProps {
  collapsed?: boolean;
  handleAddCompany: () => void;
  handleOpenAssistant: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCompanies: typeof companiesData;
  isAIAssistantVisible: boolean;
  navigate: (path: string) => void;
}

function SidebarContent({ 
  collapsed = false, 
  handleAddCompany,
  handleOpenAssistant,
  searchQuery,
  setSearchQuery,
  filteredCompanies,
  isAIAssistantVisible,
  navigate
}: SidebarContentProps) {
  const { selectedCompanyId, setSelectedCompanyId } = useCompanyStore();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className={`${collapsed ? 'p-2' : 'p-6'} relative`}>
        {!collapsed && (
          <>
            <h2 className="text-lg font-semibold">Firmy</h2>
            <p className="text-sm text-muted-foreground">
              Wybierz firmę do monitorowania
            </p>
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Szukaj firm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="space-y-4">
              <Button
                variant="outline"
                className={`w-full flex items-center justify-between ${
                  collapsed ? 'p-2' : ''
                }`}
                onClick={() => setSelectedCompanyId(company.id)}
              >
                {collapsed ? (
                  <span className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                    {company.name.charAt(0)}
                  </span>
                ) : (
                  <span>{company.name}</span>
                )}
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className={`${collapsed ? "w-10 p-2" : "w-full"} mt-2`}
            onClick={handleAddCompany}
          >
            <Plus className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Dodaj firmę</span>}
          </Button>
          <Button
            variant="outline"
            className={`mt-2 ${
              collapsed ? "w-10 p-2" : "w-full"
            } bg-[#00A36C] text-white`}
            onClick={() => navigate('/assistant')}
          >
            <MessageSquare className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Asystent AI</span>}
          </Button>
        </div>
      </ScrollArea>
      {!collapsed && (
        <>
          <Separator />
          <div className="p-4">
            <p className="text-xs text-muted-foreground">
              Ostatnia aktualizacja: {new Date().toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
