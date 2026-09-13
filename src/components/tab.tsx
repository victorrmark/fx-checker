import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "../context/Favorites/useFavorites";
import { useLogs } from "../context/LogContext/useLogs";

type Tab = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
};

function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useFavorites();
  const { logs } = useLogs();

  return (
    <>
      <div className="hidden border-b border-neutral-500 sm:block">
        <nav className="flex gap-2" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className="relative flex items-center gap-2 py-4 px-4 text-3 font-medium uppercase text-neutral-50 cursor-pointer hover:text-neutral-100 focus:outline-lime-500 focus:outline-2  focus:text-neutral-100 rounded-lg"
              >
                {tab.label}

                {["favorites", "log"].includes(tab.id) && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-800 px-1 text-xs text-lime-500">
                    {tab.id === "favorites" ? favorites.length : logs.length}
                  </span>
                )}

                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-lime-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* for Mobile view */}
      <div className="sm:hidden relative">
        <button
          className="relative w-full text-3 uppercase rounded-lg border border-neutral-400 bg-neutral-700 px-3 py-2 text-neutral-50 flex items-center justify-between gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {activeTab}
          <ChevronDown
            size={16}
            className={`transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-neutral-700 border border-neutral-600 rounded-lg mt-1 z-10 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onChange(tab.id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-2 py-2.5 text-neutral-50 hover:text-neutral-100 focus:outline-none focus:text-neutral-100 uppercase text-3 flex items-center justify-between gap-2 cursor-pointer"
              >
                {tab.label}
                {["favorites", "log"].includes(tab.id) && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-800 px-1 text-xs text-lime-500">
                    {tab.id === "favorites" ? favorites.length : logs.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Tabs;
