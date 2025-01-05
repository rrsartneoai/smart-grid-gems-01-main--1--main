import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { motion } from "framer-motion";
import { useState } from "react";
import { DeviceStatusDetail } from "./DeviceStatusDetail";
import { SystemPerformanceDetail } from "./SystemPerformanceDetail";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { getCompanyStatusData } from "./IoTStatusData";
import { StatusCard } from "./StatusCard";
import { useHiddenItems } from "@/hooks/useHiddenItems";
import { RestoreButton } from "@/components/ui/restore-button";
import { Activity, Clock, Battery, Signal, AlertTriangle, CheckCircle, XCircle, Cpu, Network, Database } from "lucide-react";

export function IoTStatus() {
  const { t } = useTranslation();
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );
  const [activeView, setActiveView] = useState<'overview' | 'devices' | 'system'>('overview');

  const statusData = getCompanyStatusData(selectedCompanyId || "1");
  const { deviceStatus, systemStatus } = statusData;

  const { hiddenItems, hideItem, restoreItems, isHidden } = useHiddenItems('hidden-iot-status');

  const cards = [
    {
      id: 'device-status',
      title: t('deviceStatus'),
      items: [
        {
          label: t('activeDevices'),
          value: deviceStatus.activeDevices,
          icon: Cpu,
          description: t('devicesOnline')
        },
        {
          label: t('networkConnection'),
          value: deviceStatus.networkConnection,
          icon: Network,
          description: t('networkStability')
        },
        {
          label: t('signalQuality'),
          value: deviceStatus.signalQuality,
          icon: Signal,
          description: t('signalStrength')
        }
      ]
    },
    {
      id: 'system-status',
      title: t('systemPerformance'),
      items: [
        {
          label: t('cpuUsage'),
          value: systemStatus.cpuUsage,
          icon: Cpu,
          description: t('processorLoad')
        },
        {
          label: t('memoryUsage'),
          value: systemStatus.memoryUsage,
          icon: Database,
          description: t('ramUsage')
        },
        {
          label: t('networkLatency'),
          value: systemStatus.networkLatency,
          icon: Network,
          description: t('connectionLatency')
        }
      ]
    }
  ];

  const visibleCards = cards.filter(card => !isHidden(card.id));

  const getOverallStatus = (values: number[]) => {
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    if (average >= 80) return t("optimal");
    if (average >= 50) return t("requiresAttention");
    return t("critical");
  };

  const overallStatus = getOverallStatus([
    ...Object.values(deviceStatus),
    ...Object.values(systemStatus)
  ]);

  if (activeView !== 'overview') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setActiveView('overview')}
            className="mb-4"
          >
            ← {t('back')}
          </Button>
        </div>
        {activeView === 'devices' ? <DeviceStatusDetail /> : <SystemPerformanceDetail />}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1">
            {t('iotStatus')} - {selectedCompany?.name}
          </h2>
          <div className="flex items-center gap-2">
            <StatusIndicator value={deviceStatus.activeDevices} />
            <span className="text-sm text-muted-foreground">
              {t('overallStatus')}: {overallStatus}
            </span>
          </div>
        </div>
        <div className="text-right flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>
            {t('lastUpdate')}: 5 {t('minutesAgo')}
          </span>
        </div>
        <RestoreButton
          onClick={restoreItems}
          hiddenCount={cards.length - visibleCards.length}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visibleCards.map(card => (
          <StatusCard
            key={card.id}
            title={card.title}
            items={card.items}
            onItemClick={(label) => {
              if (card.id === 'device-status') setActiveView('devices');
              else setActiveView('system');
            }}
            onHide={() => hideItem(card.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}

const StatusIndicator = ({ value }: { value: number }) => {
  const getColor = (value: number) => {
    if (value >= 80) return "text-success";
    if (value >= 50) return "text-warning";
    return "text-danger";
  };

  const getIcon = (value: number) => {
    if (value >= 80) return <CheckCircle className={`w-5 h-5 ${getColor(value)}`} />;
    if (value >= 50) return <AlertTriangle className={`w-5 h-5 ${getColor(value)}`} />;
    return <XCircle className={`w-5 h-5 ${getColor(value)}`} />;
  };

  return getIcon(value);
};
