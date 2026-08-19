
import { createContext } from "react";

export interface LogsType {
    id: string;
    base: string;
    quote: string;
    amount: number;
    convertedAmount: number;
    createdAt: string;
}

type LogsContextType = {
    logs: LogsType[];
    addLog: (log: LogsType) => void;
    deleteLog: (id: string) => void;
    eraseLogs: () => void;
}

export const LogsContext = createContext<LogsContextType | null>(null);



