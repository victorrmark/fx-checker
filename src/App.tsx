import "./App.css";
import Nav from "./components/nav";
import MarketTicker from "./components/carousel/MarketTicker";
import CurrencyCard from "./components/CurrencyCard";
import PagesLayout from "./layout/PagesLayout";
import { useMarketRates } from "./hooks/useMarketRates";

function App() {
  const {data} = useMarketRates()
  console.log(data)

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden gap-8 md:gap-12">
      <div className="flex flex-col w-full">
        <Nav />
        <MarketTicker />
      </div>

      <main className="w-full lg:w-275 lg:m-auto px-4 pb-8 md:px-6 md:pb-12 lg:px-8 flex-1 flex flex-col gap-8 overflow-scroll scrollbar-none">
        <CurrencyCard />
        <PagesLayout />
      </main>
    </div>
  );
}

export default App;
