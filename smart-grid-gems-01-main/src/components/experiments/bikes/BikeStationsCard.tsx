import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BikeStationsMap } from "./BikeStationsMap";
import { Bike, AlertTriangle, Search, X, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Station {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
  num_bikes_available: number;
  num_docks_available: number;
  last_reported: number;
}

const ITEMS_PER_PAGE = 15;
const HIDDEN_STATIONS_KEY = 'hiddenStations';

export const BikeStationsCard = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hiddenStations, setHiddenStations] = useState<string[]>(() => {
    const saved = localStorage.getItem(HIDDEN_STATIONS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const infoResponse = await fetch('https://gbfs.urbansharing.com/rowermevo.pl/station_information.json');
        const statusResponse = await fetch('https://gbfs.urbansharing.com/rowermevo.pl/station_status.json');
        
        const infoData = await infoResponse.json();
        const statusData = await statusResponse.json();

        const combinedStations = infoData.data.stations.map((station: any) => {
          const status = statusData.data.stations.find(
            (s: any) => s.station_id === station.station_id
          );
          return {
            ...station,
            ...status,
          };
        });

        setStations(combinedStations);
        console.log("Fetched MEVO stations:", combinedStations);
      } catch (error) {
        console.error("Error fetching MEVO stations:", error);
        toast({
          title: "Błąd",
          description: "Nie udało się pobrać danych o stacjach MEVO",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
    const interval = setInterval(fetchStations, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [toast]);

  // Save hidden stations to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(HIDDEN_STATIONS_KEY, JSON.stringify(hiddenStations));
  }, [hiddenStations]);

  // Filter stations based on search query and hidden status
  const filteredStations = stations.filter(station => {
    if (hiddenStations.includes(station.station_id)) return false;
    if (searchQuery.length < 3) return true;
    return station.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredStations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStations = filteredStations.slice(startIndex, endIndex);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleHideStation = (stationId: string) => {
    setHiddenStations(prev => [...prev, stationId]);
    toast({
      title: "Stacja ukryta",
      description: "Możesz ją przywrócić klikając przycisk 'Przywróć ukryte stacje'",
    });
  };

  const handleRestoreStations = () => {
    setHiddenStations([]);
    toast({
      title: "Stacje przywrócone",
      description: "Wszystkie ukryte stacje zostały przywrócone",
    });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bike className="h-6 w-6 text-primary" />
            <CardTitle>Stacje MEVO w Gdańsku</CardTitle>
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span>Ładowanie danych...</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Wyszukaj stację (min. 3 znaki)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {hiddenStations.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRestoreStations}
                className="whitespace-nowrap"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Przywróć ukryte stacje ({hiddenStations.length})
              </Button>
            )}
          </div>
          
          <BikeStationsMap stations={filteredStations} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentStations.map((station) => (
              <Card key={station.station_id} className="p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={() => handleHideStation(station.station_id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <h3 className="font-semibold mb-2 pr-8">{station.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{station.address}</p>
                <div className="flex justify-between text-sm">
                  <span>Dostępne rowery: {station.num_bikes_available}</span>
                  <span>Wolne miejsca: {station.num_docks_available}</span>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {getPageNumbers().map((pageNum, index) => (
                  <PaginationItem key={index}>
                    {pageNum === '...' ? (
                      <span className="px-4 py-2">...</span>
                    ) : (
                      <PaginationLink
                        onClick={() => setCurrentPage(Number(pageNum))}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </CardContent>
    </Card>
  );
};