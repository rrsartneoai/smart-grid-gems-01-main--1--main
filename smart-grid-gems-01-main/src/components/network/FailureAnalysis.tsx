import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  ArrowRight,
  CircuitBoard,
  Clock,
  Gauge,
  Signal,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

interface Failure {
  id: string;
  deviceId: string;
  deviceName: string;
  deviceType: "transformer" | "meter" | "sensor";
  severity: "critical" | "warning";
  timestamp: string;
  description: string;
  possibleCauses: string[];
  recommendedActions: string[];
}

export const mockFailures: Failure[] = [
  {
    id: "f-001",
    deviceId: "tr-001",
    deviceName: "Transformator T1",
    deviceType: "transformer",
    severity: "critical",
    timestamp: "2024-01-28T12:00:00",
    description: "Wykryto wysoką temperaturę transformatora",
    possibleCauses: [
      "Przeciążenie transformatora",
      "Awaria systemu chłodzenia",
      "Zwarcie w uzwojeniu",
    ],
    recommendedActions: [
      "Zmniejszyć obciążenie transformatora",
      "Sprawdzić system chłodzenia",
      "Przeprowadzić inspekcję uzwojeń",
    ],
  },
  {
    id: "f-002",
    deviceId: "mt-001",
    deviceName: "Licznik L1",
    deviceType: "meter",
    severity: "warning",
    timestamp: "2024-01-28T11:30:00",
    description: "Niestabilne odczyty zużycia energii",
    possibleCauses: [
      "Zakłócenia w sieci",
      "Awaria modułu pomiarowego",
      "Problemy z kalibracją",
    ],
    recommendedActions: [
      "Sprawdzić jakość zasilania",
      "Zweryfikować moduł pomiarowy",
      "Przeprowadzić kalibrację",
    ],
  },
];

const getDeviceIcon = (type: Failure["deviceType"]) => {
  switch (type) {
    case "transformer":
      return <CircuitBoard className="w-5 h-5" />;
    case "meter":
      return <Gauge className="w-5 h-5" />;
    case "sensor":
      return <Signal className="w-5 h-5" />;
  }
};

const getSeverityColor = (severity: Failure["severity"]) => {
  switch (severity) {
    case "critical":
      return "bg-red-500/10 text-red-500";
    case "warning":
      return "bg-yellow-500/10 text-yellow-500";
  }
};

const getSeverityIcon = (severity: Failure["severity"]) => {
  switch (severity) {
    case "critical":
      return <XCircle className="w-4 h-4" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4" />;
  }
};

export function FailureAnalysis() {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analiza awarii</h2>
          <p className="text-muted-foreground">
            Identyfikacja i analiza potencjalnych problemów
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {mockFailures.map((failure) => (
          <motion.div
            key={failure.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  {getDeviceIcon(failure.deviceType)}
                  <div>
                    <h3 className="font-semibold">{failure.deviceName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(failure.timestamp).toLocaleString("pl-PL")}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`${getSeverityColor(failure.severity)} gap-1`}
                >
                  {getSeverityIcon(failure.severity)}
                  <span className="capitalize">{failure.severity}</span>
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Opis problemu</div>
                  <p className="text-muted-foreground">{failure.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-2">
                      Możliwe przyczyny
                    </div>
                    <ul className="space-y-2">
                      {failure.possibleCauses.map((cause, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <ArrowRight className="w-4 h-4 text-primary" />
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">
                      Zalecane działania
                    </div>
                    <ul className="space-y-2">
                      {failure.recommendedActions.map((action, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <ArrowRight className="w-4 h-4 text-primary" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}