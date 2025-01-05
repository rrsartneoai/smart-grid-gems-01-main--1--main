import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useToast } from "@/hooks/use-toast";

const languages = [
  { code: "pl", name: "Polski" },
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "uk", name: "Українська" },
  { code: "ru", name: "Русский" },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const { toast } = useToast();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    
    const langNames = {
      pl: "Polski",
      en: "English",
      de: "Deutsch",
      uk: "Українська",
      ru: "Русский"
    };
    
    toast({
      title: i18n.t("languageChanged", "Language changed"),
      description: i18n.t("languageChangedTo", "Language has been changed to") + " " + langNames[langCode as keyof typeof langNames],
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5 text-primary animate-spin" style={{ animationDuration: '3s' }} />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent">
          <Languages className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={i18n.language === lang.code ? "bg-accent" : ""}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}