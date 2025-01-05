import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { DeviceStatus } from "@/components/network/DeviceStatus";
import { FailureAnalysis } from "@/components/network/FailureAnalysis";

export type ChatEnergyDataType = "consumption" | "production" | "efficiency" | "device-status" | "failure-analysis";

interface ChatEnergyDataProps {
  type: ChatEnergyDataType;
  title: string;
}

export function ChatEnergyData({ type, title }: ChatEnergyDataProps) {
  const renderContent = () => {
    switch (type) {
      case "consumption":
      case "production":
      case "efficiency":
        return <EnergyChart chartType={type} title={title} />;
      case "device-status":
        return <DeviceStatus />;
      case "failure-analysis":
        return <FailureAnalysis />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {renderContent()}
    </div>
  );
}