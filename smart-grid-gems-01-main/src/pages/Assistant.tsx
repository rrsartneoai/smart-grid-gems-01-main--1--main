import { Chatbot } from "@/components/Chatbot";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Assistant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialQuery = location.state?.initialQuery;

  useEffect(() => {
    if (initialQuery) {
      // Dispatch a custom event to set the initial query in the chat
      const event = new CustomEvent('setInitialQuery', { detail: initialQuery });
      window.dispatchEvent(event);
    }
  }, [initialQuery]);

  return (
    <div className="container mx-auto p-8">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">Asystent AI</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Chatbot />
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Wgraj pliki</h2>
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default Assistant;