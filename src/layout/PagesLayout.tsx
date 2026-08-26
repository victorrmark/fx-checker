import { useState } from "react";
import History from "../pages/History";
import Compare from "../pages/Compare";
import FavoritesPage from "../pages/FavoritesPage";
import Log from "../pages/Log";
import Tabs from "../components/tab";

const tabs: { id: string; label: string }[] = [
  { id: "history", label: "History" },
  { id: "compare", label: "Compare" },
  { id: "favorites", label: "Favorites" },
  { id: "log", label: "Log" },
];

const tabComponents: { [key: string]: React.ComponentType } = {
  history: History,
  compare: Compare,
  favorites: FavoritesPage,
  log: Log,
};

export default function PagesLayout() {
  const [activeTab, setActiveTab] = useState("favorites");

  const ActiveTab = tabComponents[activeTab];
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <ActiveTab />
    </div>
  );
}
