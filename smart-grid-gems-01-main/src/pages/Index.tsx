import { motion, useScroll, useTransform } from "framer-motion";
import { CompanySidebar } from "@/components/CompanySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { useHotkeys } from "react-hotkeys-hook";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import { TabsNavigation } from "@/components/navigation/TabsNavigation";
import { PageHeader } from "@/components/header/PageHeader";
import '../i18n/config';

const Index = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const headerTranslateY = useTransform(scrollY, [0, 100], [0, -100]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useHotkeys("?", () => {
    toast({
      title: t("availableShortcuts", "Available keyboard shortcuts"),
      description: "Ctrl+K: Search\nCtrl+/: Help\nCtrl+B: Side menu",
    });
  });

  useHotkeys("ctrl+k", (e) => {
    e.preventDefault();
    toast({
      title: t("search", "Search"),
      description: t("searchComingSoon", "Search functionality coming soon"),
    });
  });

  return (
    <div className="min-h-screen bg-background">
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        style={{
          opacity: headerOpacity,
          y: headerTranslateY
        }}
      >
        <PageHeader />
      </motion.div>
      
      <div className="pt-28">
        <SidebarProvider>
          <div className="min-h-screen flex w-full flex-col lg:flex-row">
            <CompanySidebar />
            <main className="flex-1 p-4 lg:pl-[320px] transition-all duration-300">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-6"
              >
                <TabsNavigation />
              </motion.div>
            </main>
          </div>
        </SidebarProvider>
        <FloatingChatbot />
      </div>
    </div>
  );
};

export default Index;