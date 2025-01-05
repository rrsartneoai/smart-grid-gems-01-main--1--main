export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  dataVisualizations?: Array<{
    type: "consumption" | "production" | "efficiency" | "device-status" | "failure-analysis";
    title: string;
  }>;
}

export interface ChatResponse {
  text: string;
  visualizations?: Message["dataVisualizations"];
}