import { Triangle, Check, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { currencyList } from "../utils/currencyList";
import type { Currency } from "../utils/currencyList";

interface CurrencyButtonProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

function CurrencyButton({ currency, setCurrency }: CurrencyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    if (isOpen) {
      setSearch("");
    }
    setIsOpen((prev) => !prev);
  };

  const filterCurrencies = (list: typeof currencyList.popular) =>
    list.filter((curr) => {
      const query = search.toLowerCase();

      return (
        curr.code.toLowerCase().includes(query) ||
        curr.name.toLowerCase().includes(query)
      );
    });

  const filteredPopular = useMemo(
    () => filterCurrencies(currencyList.popular),
    [search],
  );

  const filteredOther = useMemo(
    () => filterCurrencies(currencyList.other),
    [search],
  );

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        className=" shrink-0 flex items-center justify-between gap-2 rounded-lg bg-neutral-500 p-2.5 outline border-neutral-400 hover:bg-neutral-400 cursor-pointer"
        onClick={toggleDropdown}
      >
        <img
          src={currency.flag}
          alt={currency.code}
          className="h-5 w-5 rounded-full object-cover"
        />

        <p className="text-4 text-neutral-50">{currency.code}</p>

        <Triangle
          size={12}
          strokeWidth={0}
          className=" shrink-0 rotate-180 fill-neutral-50"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-2 w-94 rounded-lg outline outline-neutral-400 bg-neutral-600 p-2">
          <div className="sticky top-0 mb-2.5 ">
            <div className="flex items-center gap-2 rounded-md bg-neutral-600 px-3 outline outline-neutral-200">
              <Search
                size={16}
                className="text-neutral-50 "
                aria-hidden="true"
              />
              <label htmlFor="currency-search" className="sr-only">
                Search currencies
              </label>

              <input
                id="currency-search"
                ref={searchRef}
                type="text"
                placeholder="Search currencies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-200"
              />
            </div>
          </div>

          <div className="max-h-80 overflow-scroll scrollbar-none">
            {filteredPopular.length > 0 && (
              <>
                <div className="flex gap-2.5 items-center justify-between p-2 border-b border-neutral-300 mb-0.5">
                  <p className=" text-5  uppercase tracking-wide text-neutral-200">
                    Popular
                  </p>
                  <p className="text-5 text-neutral-200">
                    {filteredPopular.length}
                  </p>
                </div>

                {filteredPopular.map((curr) => (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => {
                      setCurrency(curr);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className="flex w-full items-center justify-between px-3 py-2  cursor-pointer rounded-sm hover:border hover:border-neutral-200 focus:outline-none focus:border focus:border-neutral-200"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={curr.flag}
                        alt={curr.code}
                        className="h-5 w-5 rounded-full"
                      />

                      <div className="text-left">
                        <p className="text-4 text-neutral-50">{curr.code}</p>
                        <p className="text-5 text-neutral-200">{curr.name}</p>
                      </div>
                    </div>

                    {currency.code === curr.code && (
                      <Check size={16} className="text-neutral-50 shrink-0" />
                    )}
                  </button>
                ))}
              </>
            )}

            {filteredOther.length > 0 && (
              <>
                <div className="flex gap-2.5 items-center justify-between p-2 border-b border-neutral-300 mb-0.5">
                  <p className=" text-5  uppercase tracking-wide text-neutral-200">
                    OTher currencies
                  </p>
                  <p className="text-5 text-neutral-200">
                    {filteredOther.length}
                  </p>
                </div>

                {filteredOther.map((curr) => (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => {
                      setCurrency(curr);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className="flex w-full items-center justify-between px-3 py-2  cursor-pointer rounded-sm hover:border hover:border-neutral-200 focus:outline-none focus:border focus:border-neutral-200"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={curr.flag}
                        alt={curr.code}
                        className="h-5 w-5 rounded-full"
                      />

                      <div className="text-left">
                        <p className="text-4 text-neutral-50">{curr.code}</p>
                        <p className="text-5 text-neutral-200">{curr.name}</p>
                      </div>
                    </div>

                    {currency.code === curr.code && (
                      <Check size={16} className="text-neutral-50 shrink-0" />
                    )}
                  </button>
                ))}
              </>
            )}

            {filteredPopular.length === 0 && filteredOther.length === 0 && (
              <div className="py-8 text-center text-sm text-neutral-300">
                No currencies found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrencyButton;
