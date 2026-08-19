import { Trash, ArrowRight } from "lucide-react";
import { logTime } from "../../utils/displayTime";
import type { LogsType } from "../../context/LogContext/LogsContext";

export default function Logs({ logs }: { logs: LogsType[] }) {
  return (
    <>
      {logs.map((log: LogsType) => (
        <div
          className="p-3 sm:p-4 rounded-[10px] bg-neutral-600 outline outline-neutral-500 gap-3.5 flex items-center"
          key={log.id}
        >
          <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-5">
            <p className="text-4 text-neutral-200">{logTime(log.createdAt)}</p>
            <p className="text-4 text-neutral-50 flex items-center gap-2">
              <span>{log.base}</span>
              <ArrowRight className="text-neutral-200" size={12} />
              <span>{log.quote}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-5">
            <p className="text-3 text-neutral-100">{log.amount}</p>
            <p className="text-3 text-lime-500">{log.convertedAmount}</p>
          </div>
          <button className="p-2 outline outline-neutral-500 rounded-lg cursor-pointer">
            <Trash className="text-neutral-50 " size={15} />
          </button>
        </div>
      ))}
    </>
  );
}
