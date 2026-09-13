import { useLogs } from "../context/LogContext/useLogs";
import Logs from "../components/log/Logs";
import { useState } from "react";
import EmptyState from "../components/EmptyState";

export default function Log() {
  const { logs, eraseLogs } = useLogs();
  const [toast, setToast] = useState("");

  const showToast = () => {
    setToast("Logs Cleared!");

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  if (!logs || logs.length === 0) {
    return (
      <EmptyState
        title="No conversation logged yet"
        message={`Every conversion is recorded here automatically when you tap LOG CONVERSION. \nYour log is private to this session and this browser.`}
      />
    );
  }

  return (
    <div className="relative w-full flex flex-col bg-neutral-700 outline-neutral-600 px-4 py-5 sm:p-5 gap-5 rounded-2xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2.5">
        <p className="uppercase text-neutral-50">Conversation log</p>
        <div className="flex items-center gap-4 justify-between">
          <p className="text-5 text-neutral-50">{logs.length} logged</p>

          <button
            type="button"
            aria-label="clear all logs"
            className="uppercase bg-neutral-600 border border-neutral-400 text-5 text-neutral-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-neutral-400 focus:outline-lime-500 focus:outline-2 focus:outline-offset-2"
            onClick={() => {
              eraseLogs();
              showToast();
            }}
          >
            clear all
          </button>
        </div>
      </div>
      <Logs />

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-50 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
