import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Bot, User } from "lucide-react";
import { ChatEnergyData } from "./ChatEnergyData";

interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  data?: {
    type: "consumption" | "production" | "efficiency" | "device-status" | "failure-analysis";
    title: string;
  };
}

export function ChatMessage({ role, content, timestamp, data }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${role === "assistant" ? "flex-row" : "flex-row-reverse"}`}>
      <Avatar className={`w-8 h-8 ${role === "assistant" ? "bg-primary" : "bg-muted"}`}>
        {role === "assistant" ? (
          <Bot className="w-4 h-4 text-primary-foreground" />
        ) : (
          <User className="w-4 h-4 text-muted-foreground" />
        )}
      </Avatar>
      
      <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${role === "user" ? "items-end" : "items-start"}`}>
        <Card className={`px-4 py-3 ${role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
          <div className="whitespace-pre-wrap break-words">{content}</div>
          {data && <ChatEnergyData type={data.type} title={data.title} />}
        </Card>
        <span className="text-xs text-muted-foreground mt-1">
          {format(timestamp, "HH:mm")}
        </span>
      </div>
    </div>
  );
}