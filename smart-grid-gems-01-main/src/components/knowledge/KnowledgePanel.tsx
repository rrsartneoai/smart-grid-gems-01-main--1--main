import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export const KnowledgePanel = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Kompendium wiedzy</h2>
        </div>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-2">Podstawy energetyki</h3>
            <p className="text-muted-foreground">
              Energia elektryczna jest mierzona w kilowatogodzinach (kWh). 
              1 kWh to ilość energii, jaką zużywa urządzenie o mocy 1000 watów pracujące przez godzinę.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Nomenklatura</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Skrót</th>
                    <th className="text-left py-2 px-4">Rozwinięcie</th>
                    <th className="text-left py-2 px-4">Wyjaśnienie</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { skrot: "AI", rozw: "Sztuczna inteligencja", wyjasnienie: "Dziedzina informatyki zajmująca się tworzeniem inteligentnych systemów." },
                    { skrot: "ACO", rozw: "Optymalizacja kolonii mrówek", wyjasnienie: "Algorytm optymalizacji inspirowany zachowaniem mrówek w poszukiwaniu pożywienia." },
                    { skrot: "ABC", rozw: "Algorytm sztucznej pszczoły", wyjasnienie: "Algorytm optymalizacji inspirowany poszukiwaniem miodu przez pszczoły." },
                    { skrot: "AEP", rozw: "Roczna produkcja energii", wyjasnienie: "Całkowita ilość energii wyprodukowanej w ciągu roku." },
                    { skrot: "BES", rozw: "Bateryjny magazyn energii", wyjasnienie: "System magazynowania energii elektrycznej za pomocą baterii." },
                    { skrot: "DR", rozw: "Reagowanie na zapotrzebowanie", wyjasnienie: "Strategia zarządzania popytem na energię w celu stabilizacji sieci." },
                    { skrot: "EMS", rozw: "System zarządzania energią", wyjasnienie: "System monitorujący i kontrolujący przepływ energii w systemie." },
                    { skrot: "ESS", rozw: "System magazynowania energii", wyjasnienie: "Urządzenie lub system przechowujący energię elektryczną." },
                    { skrot: "EV", rozw: "Pojazd elektryczny", wyjasnienie: "Pojazd napędzany silnikiem elektrycznym." },
                    { skrot: "GA", rozw: "Algorytm genetyczny", wyjasnienie: "Algorytm optymalizacji inspirowany ewolucją biologiczną." },
                    { skrot: "HEMS", rozw: "Domowy system zarządzania energią", wyjasnienie: "System zarządzający zużyciem energii w domu." },
                    { skrot: "HVAC", rozw: "Ogrzewanie, wentylacja i klimatyzacja", wyjasnienie: "System zapewniający komfort termiczny w budynkach." },
                    { skrot: "GA–PSO", rozw: "Optymalizacja rojem cząstek algorytmu genetycznego", wyjasnienie: "Połączenie dwóch algorytmów optymalizacyjnych." },
                    { skrot: "LCoE", rozw: "Uśredniony koszt energii", wyjasnienie: "Całkowity koszt wytworzenia jednostki energii, uwzględniający nakłady inwestycyjne i koszty operacyjne." },
                    { skrot: "LOT", rozw: "Technika optymalizacji Lapunowa", wyjasnienie: "Metoda analizy stabilności systemów nieliniowych, wykorzystana w optymalizacji dynamicznej." },
                    { skrot: "MINLP", rozw: "Programowanie nieliniowe z mieszanymi liczbami całkowitymi", wyjasnienie: "Metoda optymalizacji matematycznej z zmiennymi ciągłymi i dyskretnymi." },
                    { skrot: "MILP", rozw: "Programowanie liniowe z mieszanymi liczbami całkowitymi", wyjasnienie: "Metoda optymalizacji matematycznej z liniowymi ograniczeniami i zmiennymi ciągłymi i dyskretnymi." },
                    { skrot: "NRFNA", rozw: "Znormalizowana neuronowa adaptacyjna oparta na rozumowaniu rozmytym", wyjasnienie: "Hybrydowa technika modelowania łącząca sieci neuronowe i logikę rozmytą." },
                    { skrot: "NMPC", rozw: "Nieliniowy regulator predykcyjny modelu", wyjasnienie: "Metoda sterowania uwzględniająca prognozę przyszłego zachowania systemu." },
                    { skrot: "PAR", rozw: "Stosunek wartości szczytowej do średniej", wyjasnienie: "Miara zmienności obciążenia energetycznego." },
                    { skrot: "PV", rozw: "Fotowoltaiczne", wyjasnienie: "Technologia konwersji energii słonecznej na elektryczną za pomocą paneli słonecznych." },
                    { skrot: "PSO", rozw: "Optymalizacja rojem cząstek", wyjasnienie: "Algorytm optymalizacji inspirowany zachowaniem roju ptaków." },
                    { skrot: "PCC", rozw: "Punkt wspólnego przyłączenia", wyjasnienie: "Miejsce przyłączenia instalacji odbiorcy do sieci energetycznej." },
                    { skrot: "PHEVs", rozw: "Hybrydowe pojazdy elektryczne typu plug-in", wyjasnienie: "Pojazdy elektryczne z możliwością ładowania z zewnętrznego źródła." },
                    { skrot: "PG", rozw: "Szczytowy generator energii", wyjasnienie: "Generator uruchamiany w okresach szczytowego zapotrzebowania na energię." },
                    { skrot: "RES", rozw: "Odnawialne źródła energii", wyjasnienie: "Źródła energii, których zasoby są naturalnie uzupełniane (np. słońce, wiatr)." },
                    { skrot: "RT", rozw: "Czas rzeczywisty", wyjasnienie: "Działanie lub proces zachodzący na bieżąco, bez opóźnienia." },
                    { skrot: "TCLs", rozw: "Obciążenia sterowane termostatycznie", wyjasnienie: "Urządzenia elektryczne z wbudowanymi termostatami, które włączają i wyłączają się, aby utrzymać zadaną temperaturę." }
                  ].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{item.skrot}</td>
                      <td className="py-2 px-4">{item.rozw}</td>
                      <td className="py-2 px-4">{item.wyjasnienie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Stałe i zmienne</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Symbol</th>
                    <th className="text-left py-2 px-4">Wyjaśnienie</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { symbol: "A", wyjasnienie: "Przewodność cieplna w ogólności (kW/°F)" },
                    { symbol: "Cpv", wyjasnienie: "Całkowita powierzchnia naświetlenia paneli PV (m²)" },
                    { symbol: "Dmax", wyjasnienie: "Maksymalne opóźnienie kolejkowania Qt (godz.)" },
                    { symbol: "emax", wyjasnienie: "Maksymalna moc systemu HVAC (kW)" },
                    { symbol: "ε", wyjasnienie: "Współczynnik bezwładności" },
                    { symbol: "N", wyjasnienie: "Całkowita liczba dostępnych przedziałów czasowych" },
                    { symbol: "η", wyjasnienie: "Sprawność konwersji termicznej (ogrzewania)" },
                    { symbol: "R", wyjasnienie: "Tolerowane opóźnienie ładowania pojazdu elektrycznego (godz.)" },
                    { symbol: "Tmin", wyjasnienie: "Dolna granica zakresu komfortu (°C)" },
                    { symbol: "Tmax", wyjasnienie: "Górna granica zakresu komfortu (°C)" },
                    { symbol: "Toutmin", wyjasnienie: "Minimalna temperatura zewnętrzna (°C)" },
                    { symbol: "Toutmax", wyjasnienie: "Maksymalna temperatura zewnętrzna (°C)" },
                    { symbol: "τ", wyjasnienie: "Czas trwania przedziału czasowego (godz.)" },
                    { symbol: "ucmax", wyjasnienie: "Maksymalna moc ładowania ESS (kW)" },
                    { symbol: "udmax", wyjasnienie: "Maksymalna moc rozładowania ESS (kW)" },
                    { symbol: "vmax", wyjasnienie: "Maksymalna moc ładowania EV (kW)" },
                    { symbol: "ω", wyjasnienie: "Stała czasowa systemu (godz.)" },
                    { symbol: "θpv", wyjasnienie: "Efektywność generacji PV" },
                    { symbol: "γ", wyjasnienie: "Współczynnik kosztów cieplnych (RMB/(°F)²)" }
                  ].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{item.symbol}</td>
                      <td className="py-2 px-4">{item.wyjasnienie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Zmienne</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Zmienna</th>
                    <th className="text-left py-2 px-4">Wyjaśnienie</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { zmienna: "at", wyjasnienie: "Wskaźnik przybycia do kolejki Qt (kW)" },
                    { zmienna: "Bt", wyjasnienie: "Koszt zakupu energii elektrycznej (RMB/kWh)" },
                    { zmienna: "et", wyjasnienie: "Moc wejściowa HVAC w przedziale czasowym t (kW)" },
                    { zmienna: "Gt", wyjasnienie: "Poziom zmagazynowanej energii w ESS (kWh)" },
                    { zmienna: "gt", wyjasnienie: "Kupno/sprzedaż energii w inteligentnym domu (kW)" },
                    { zmienna: "Ht", wyjasnienie: "Wirtualna kolejka temperatury wewnętrznej (°F)" },
                    { zmienna: "Kt", wyjasnienie: "Wirtualna kolejka kontroli ESS (kWh)" },
                    { zmienna: "Lt", wyjasnienie: "Funkcja Lapunowa" },
                    { zmienna: "pwtt", wyjasnienie: "Moc wyjściowa generacji wiatrowej (MW)" },
                    { zmienna: "ρt", wyjasnienie: "Natężenie promieniowania słonecznego (W/m²)" },
                    { zmienna: "Qt", wyjasnienie: "Kolejka energii dla EV (kW)" },
                    { zmienna: "rt", wyjasnienie: "Moc wyjściowa generacji paneli PV (kW)" },
                    { zmienna: "St", wyjasnienie: "Koszt sprzedaży energii elektrycznej (RMB/kWh)" },
                    { zmienna: "Tt", wyjasnienie: "Temperatura w pomieszczeniu (°C)" },
                    { zmienna: "Toutt", wyjasnienie: "Temperatura zewnętrzna (°C)" },
                    { zmienna: "Treft+1", wyjasnienie: "Preferowana temperatura komfortu (°C)" },
                    { zmienna: "xt", wyjasnienie: "Wskaźnik obsługi kolejki Qt (kW)" },
                    { zmienna: "yt", wyjasnienie: "Moc ładowania/rozładowania ESS (kW)" },
                    { zmienna: "Zt", wyjasnienie: "Wirtualna kolejka opóźnienia ładowania EV (sloty)" },
                    { zmienna: "Πt+1", wyjasnienie: "Stan zajętości domu w przedziale czasowym t+1" },
                    { zmienna: "Φ1,t", wyjasnienie: "Koszt energii (RMB)" },
                    { zmienna: "Φ2,t", wyjasnienie: "Koszt dyskomfortu termicznego w przedziale czasowym t+1 (RMB)" }
                  ].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{item.zmienna}</td>
                      <td className="py-2 px-4">{item.wyjasnienie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};