
import { createContext } from "react";

export interface logsType {
    id: string;
    base: string;
    quote: string;
    amount: number;
    convertedAmount: number;
    createdAt: string;
}

type LogsContextType = {
    logs: logsType[];
    addLog: (log: logsType) => void;
    deleteLog: (id: string) => void;
}

export const LogsContext = createContext<LogsContextType | null>(null);



