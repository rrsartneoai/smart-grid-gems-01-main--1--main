import { mockDevices } from "@/components/network/DeviceStatus";
import { mockFailures } from "@/components/network/FailureAnalysis";
import { companiesData } from "@/data/companies";
import { ChatResponse } from "./types";

const getDeviceStatus = (): ChatResponse => {
  const operationalCount = mockDevices.filter(d => d.status === "operational").length;
  const warningCount = mockDevices.filter(d => d.status === "warning").length;
  const errorCount = mockDevices.filter(d => d.status === "error").length;

  return {
    text: `Aktualny stan urządzeń:\n` +
      `- Urządzenia sprawne: ${operationalCount}\n` +
      `- Urządzenia z ostrzeżeniami: ${warningCount}\n` +
      `- Urządzenia z błędami: ${errorCount}\n\n` +
      `Szczegółowy status:\n` +
      mockDevices.map(device =>
        `${device.name}: ${device.status === "operational" ? "sprawny" :
          device.status === "warning" ? "ostrzeżenie" : "błąd"}`
      ).join("\n"),
    visualizations: [{ type: "device-status", title: "Stan urządzeń" }]
  };
};

const getFailureAnalysis = (deviceId?: string): ChatResponse => {
  const failures = deviceId
    ? mockFailures.filter(f => f.deviceId === deviceId)
    : mockFailures;

  if (failures.length === 0) {
    return {
      text: "Nie znaleziono informacji o awariach dla tego urządzenia."
    };
  }

  return {
    text: failures.map(failure =>
      `Analiza awarii - ${failure.deviceName}:\n` +
      `Status: ${failure.severity === "critical" ? "Krytyczny" : "Ostrzeżenie"}\n` +
      `Opis: ${failure.description}\n` +
      `Możliwe przyczyny:\n${failure.possibleCauses.map(cause => `- ${cause}`).join("\n")}\n` +
      `Zalecane działania:\n${failure.recommendedActions.map(action => `- ${action}`).join("\n")}`
    ).join("\n\n"),
    visualizations: [{ type: "failure-analysis", title: "Analiza awarii" }]
  };
};

export const isEnergyRelated = (query: string): boolean => {
  const lowercaseQuery = query.toLowerCase();
  return (
    lowercaseQuery.includes("stan urządzeń") ||
    lowercaseQuery.includes("status urządzeń") ||
    lowercaseQuery.includes("awari") ||
    lowercaseQuery.includes("zużycie") ||
    lowercaseQuery.includes("zuzycie") ||
    lowercaseQuery.includes("produkcja") ||
    lowercaseQuery.includes("wydajność") ||
    lowercaseQuery.includes("wydajnosc") ||
    companiesData[0]?.stats.some((stat) =>
      lowercaseQuery.includes(stat.title.toLowerCase())
    )
  );
};

export const getDashboardValue = (query: string): ChatResponse => {
  const lowercaseQuery = query.toLowerCase();

  if (query.includes("stan urządzeń") || query.includes("status urządzeń")) {
    return getDeviceStatus();
  }

  if (query.includes("awari")) {
    const deviceMatch = query.match(/transformator[a]?\s+(\w+)/i);
    const deviceId = deviceMatch ? `tr-${deviceMatch[1].toLowerCase()}` : undefined;
    return getFailureAnalysis(deviceId);
  }

  if (query.includes("zużycie") || query.includes("zuzycie")) {
    return {
      text: "Oto wykres zużycia energii w czasie:",
      visualizations: [{ type: "consumption", title: "Zużycie energii" }]
    };
  }

  if (query.includes("produkcja")) {
    return {
      text: "Oto wykres produkcji energii w czasie:",
      visualizations: [{ type: "production", title: "Produkcja energii" }]
    };
  }

  if (query.includes("wydajność") || query.includes("wydajnosc")) {
    return {
      text: "Oto wykres wydajności w czasie:",
      visualizations: [{ type: "efficiency", title: "Wydajność" }]
    };
  }

  const matchingStat = companiesData[0]?.stats.find(stat => 
    lowercaseQuery.includes(stat.title.toLowerCase())
  );

  if (matchingStat) {
    return {
      text: `${matchingStat.title}: ${matchingStat.value}${matchingStat.unit ? ' ' + matchingStat.unit : ''} (${matchingStat.description})`
    };
  }

  return {
    text: "Przepraszam, nie znalazłem odpowiednich informacji. Możesz zapytać o:\n- stan urządzeń\n- analizę awarii\n- zużycie energii\n- produkcję energii\n- wydajność systemu"
  };
};