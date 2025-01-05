import { useState, useEffect } from 'react';
import { Chatbot } from './Chatbot';
import { Button } from './ui/button';
import { Bot, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useLocation } from 'react-router-dom';

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentHash = location.hash.slice(1);
  const isAllowedSection = ['insights', 'status', 'sensors'].includes(currentHash);

  useEffect(() => {
    const handleOpenAssistant = () => setIsOpen(true);
    window.addEventListener('openAssistant', handleOpenAssistant);
    return () => window.removeEventListener('openAssistant', handleOpenAssistant);
  }, []);

  if (!isAllowedSection) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-[90vw] md:w-auto"
          >
            <Chatbot />
          </motion.div>
        )}
      </AnimatePresence>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              className="rounded-full p-4 shadow-lg flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Bot className="h-6 w-6" />
              )}
              <span className="text-sm font-medium hidden md:inline">
                {isOpen ? "Zamknij" : "Asystent AI"}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Asystent AI - pomoc i analiza danych</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}