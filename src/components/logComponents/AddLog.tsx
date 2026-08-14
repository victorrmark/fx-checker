import { useLogs } from "../../context/LogContext/useLogs";

export default function AddLog() {
  const { addLog } = useLogs();

  const handleAddLog = () => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      base: "USD",
      quote: "EUR",
      amount: 100,
      convertedAmount: 85.5,
      createdAt: new Date().toISOString(),
    };
    addLog(newLog);
  };

  return (
    <button
      className="px-3 py-2 rounded-lg outline-1 outline-lime-500 cursor-pointer text-neutral-50 gap-2 uppercase text-5 font-medium hover:bg-lime-800"
      onClick={handleAddLog}
    >
      Log Conversion
    </button>
  );
}
