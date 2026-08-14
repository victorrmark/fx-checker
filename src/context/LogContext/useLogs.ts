import { useContext } from "react";
import { LogsContext } from "./LogsContext";

export function useLogs() {
  const context = useContext(LogsContext);

  if (!context) {
    throw new Error(
      "useLogs must be used inside LogsProvider"
    );
  }

  return context;
}