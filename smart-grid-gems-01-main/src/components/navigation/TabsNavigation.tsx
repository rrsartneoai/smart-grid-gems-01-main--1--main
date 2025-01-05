import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeatherPanel } from "@/components/weather/WeatherPanel";
import { CompanyAnalysis } from "@/components/analysis/CompanyAnalysis";
import { IoTStatus } from "@/components/status/IoTStatus";
import SensorsPanel from "@/components/sensors/SensorsPanel";
import { IntegrationsPanel } from "@/components/integrations/IntegrationsPanel";
import { ExperimentsPanel } from "@/components/experiments/ExperimentsPanel";
import { KnowledgePanel } from "@/components/knowledge/KnowledgePanel";
import { EnergyMaps } from "@/components/energy/EnergyMaps";
import { SpacesPanel } from "@/components/spaces/SpacesPanel";
import { useTranslation } from 'react-i18next';

export const TabsNavigation = () => {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="spaces" className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto flex-wrap">
        <TabsTrigger value="spaces">{t('spaces')}</TabsTrigger>
        <TabsTrigger value="insights">{t('analysis')}</TabsTrigger>
        <TabsTrigger value="status">{t('status')}</TabsTrigger>
        <TabsTrigger value="sensors">{t('sensors')}</TabsTrigger>
        <TabsTrigger value="integrations">Integracje</TabsTrigger>
        <TabsTrigger value="experiments">Eksperymenty</TabsTrigger>
        <TabsTrigger value="knowledge">Kompendium</TabsTrigger>
        <TabsTrigger value="energymaps">Mapa Energetyczna</TabsTrigger>
      </TabsList>

      <TabsContent value="spaces">
        <SpacesPanel />
      </TabsContent>

      <TabsContent value="insights">
        <CompanyAnalysis />
      </TabsContent>

      <TabsContent value="status">
        <IoTStatus />
      </TabsContent>

      <TabsContent value="sensors">
        <SensorsPanel />
      </TabsContent>

      <TabsContent value="integrations">
        <IntegrationsPanel />
      </TabsContent>

      <TabsContent value="experiments">
        <ExperimentsPanel />
      </TabsContent>

      <TabsContent value="knowledge">
        <KnowledgePanel />
      </TabsContent>

      <TabsContent value="energymaps">
        <EnergyMaps />
      </TabsContent>
    </Tabs>
  );
};