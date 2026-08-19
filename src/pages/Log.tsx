import { useLogs } from "../context/LogContext/useLogs";
import Logs from "../components/logComponents/logs";

export default function Log() {
  const { logs } = useLogs();
  console.log(logs);
  return (
    <div className="w-full flex flex-col bg-neutral-700 outline-neutral-600 px-4 py-5 sm:p-5 gap-5 rounded-2xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2.5">
        <p className="uppercase text-neutral-50">Conversation log</p>
        <div className="flex items-center gap-4 justify-between">
          <p className="text-5 text-neutral-50">{logs.length} logged</p>
          <button className="uppercase bg-neutral-600 outline-1 outline-neutral-400 text-5 text-neutral-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-neutral-400">
            clear all
          </button>
        </div>
      </div>
      <Logs logs={logs}/>
    </div>
  );
}
