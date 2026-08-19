import { useState, useEffect, type ReactNode } from "react";
import { LogsContext } from "./LogsContext";
import type { LogsType } from "./LogsContext";

const LOGS_KEY = "currency-logs";

export function LogsProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<LogsType[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(LOGS_KEY);

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  }, [logs]);

  const addLog = (log: LogsType) => {
    setLogs((current) => [...current, log]);
  };

  const deleteLog = (id: string) => {
    setLogs((current) => current.filter((log) => log.id !== id));
  };

  const eraseLogs = () => {
    setLogs([]);
  }

  return (
    <LogsContext.Provider
      value={{
        logs,
        addLog,
        deleteLog,
        eraseLogs,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
}

