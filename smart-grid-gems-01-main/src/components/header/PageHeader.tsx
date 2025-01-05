import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { NotificationCenter } from "@/components/ui/notifications/NotificationCenter";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const PageHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
        <ApiKeySettings />
        <div className="flex flex-col items-center sm:items-start gap-1">
          <h1 className="text-xl font-semibold text-center sm:text-left flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t('monitoringPanel')}
          </h1>
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            {t('smartgridDescription')}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <LanguageSelector />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('changeLanguage', 'Change language')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <NotificationCenter />
        <DarkModeToggle />
      </div>
    </div>
  );
};