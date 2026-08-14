import { useLogs } from "../../context/LogContext/useLogs";
import { useCurrency } from "../../context/Currency/useCurrency";
import { removeSign } from "../../utils/removeSign";
 

export default function AddLog({converted}: {converted: string | undefined}) {
  const { addLog } = useLogs();
  const {baseCurrency, quoteCurrency, amount} = useCurrency();

  const handleAddLog = () => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      base: baseCurrency.code,
      quote: quoteCurrency.code,
      amount: amount,
      convertedAmount: removeSign(converted),
      createdAt: new Date().toISOString(),
    };
    addLog(newLog);
  };

  return (
    <button
      className="px-3 py-2 rounded-lg outline-1 outline-lime-500 cursor-pointer text-neutral-50 gap-2 uppercase text-5 font-medium hover:bg-lime-800 disabled:bg-transparent disabled:text-neutral-200 disabled:outline-neutral-300"
      onClick={handleAddLog}
      disabled={!amount}
    >
      Log Conversion
    </button>
  );
}
