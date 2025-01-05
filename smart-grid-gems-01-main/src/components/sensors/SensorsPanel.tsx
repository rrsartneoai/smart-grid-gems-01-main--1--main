import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SensorCard } from "./SensorCard";
import { Button } from "@/components/ui/button";
import { useHiddenItems } from "@/hooks/useHiddenItems";

const initialSensors = [
  {
    id: 1,
    name: "Czujnik temperatury",
    value: "22",
    unit: "°C",
    status: "Good",
    description: "Temperatura w normie.",
    icon: <span>🌡️</span>,
    tooltip: "Mierzy aktualną temperaturę w pomieszczeniu. Wartość 22°C oznacza optymalną temperaturę dla komfortu.",
  },
  {
    id: 2,
    name: "Czujnik wilgotności",
    value: "45",
    unit: "%",
    status: "Good",
    description: "Wilgotność w normie.",
    icon: <span>💧</span>,
    tooltip: "Monitoruje poziom wilgotności w powietrzu. 45% to komfortowy poziom wilgotności.",
  },
  {
    id: 3,
    name: "Czujnik jakości powietrza",
    value: "35",
    unit: "AQI",
    status: "Warning",
    description: "Jakość powietrza poniżej normy.",
    icon: <span>🌫️</span>,
    tooltip: "Mierzy jakość powietrza w skali AQI. Wartość 35 oznacza umiarkowaną jakość powietrza.",
  },
  {
    id: 4,
    name: "Czujnik napięcia",
    value: "230",
    unit: "V",
    status: "Good",
    description: "Napięcie w sieci stabilne.",
    icon: <span>⚡</span>,
    tooltip: "Monitoruje napięcie w sieci elektrycznej. 230V to standardowe napięcie w sieci.",
  },
  {
    id: 5,
    name: "Czujnik prądu",
    value: "10",
    unit: "A",
    status: "Good",
    description: "Natężenie prądu w normie.",
    icon: <span>🔌</span>,
    tooltip: "Mierzy natężenie prądu w obwodzie. 10A wskazuje na normalne zużycie energii.",
  },
  {
    id: 6,
    name: "Czujnik mocy",
    value: "2.3",
    unit: "kW",
    status: "Good",
    description: "Moc w normie.",
    icon: <span>⚡</span>,
    tooltip: "Pokazuje aktualną moc pobieraną przez urządzenia. 2.3kW to typowe zużycie.",
  },
  {
    id: 7,
    name: "Czujnik częstotliwości",
    value: "50",
    unit: "Hz",
    status: "Good",
    description: "Częstotliwość sieci stabilna.",
    icon: <span>📊</span>,
    tooltip: "Monitoruje częstotliwość prądu w sieci. 50Hz to standardowa częstotliwość w Europie.",
  },
  {
    id: 8,
    name: "Czujnik harmonicznych",
    value: "2.5",
    unit: "%",
    status: "Good",
    description: "Poziom harmonicznych w normie.",
    icon: <span>📈</span>,
    tooltip: "Mierzy zniekształcenia harmoniczne w sieci. 2.5% to bezpieczny poziom zakłóceń.",
  },
  {
    id: 9,
    name: "Czujnik współczynnika mocy",
    value: "0.95",
    unit: "PF",
    status: "Good",
    description: "Współczynnik mocy optymalny.",
    icon: <span>📉</span>,
    tooltip: "Pokazuje stosunek mocy czynnej do pozornej. 0.95 to bardzo dobra wartość.",
  },
  {
    id: 10,
    name: "Czujnik obciążenia",
    value: "75",
    unit: "%",
    status: "Warning",
    description: "Wysokie obciążenie sieci.",
    icon: <span>⚖️</span>,
    tooltip: "Monitoruje poziom obciążenia sieci. 75% oznacza wysokie, ale jeszcze bezpieczne obciążenie.",
  }
];

const SensorsPanel = () => {
  const { t } = useTranslation();
  const { hiddenItems, hideItem, restoreItems } = useHiddenItems('hidden-sensors');
  const [sensors] = useState(initialSensors);

  const visibleSensors = sensors.filter(sensor => !hiddenItems.includes(sensor.id.toString()));

  return (
    <div>
      {hiddenItems.length > 0 && (
        <div className="mb-4">
          <Button variant="outline" onClick={restoreItems}>
            Przywróć ukryte czujniki ({hiddenItems.length})
          </Button>
        </div>
      )}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleSensors.map(sensor => (
          <SensorCard
            key={sensor.id}
            icon={sensor.icon}
            name={sensor.name}
            value={sensor.value}
            unit={sensor.unit}
            status={sensor.status as "Good" | "Warning"}
            description={sensor.description}
            tooltip={sensor.tooltip}
            onHide={() => hideItem(sensor.id.toString())}
          />
        ))}
      </div>
    </div>
  );
};

export default SensorsPanel;