import { useState, useEffect, type ReactNode } from "react";

import { currencyList } from "../../utils/currencyList";
import { CurrencyContext } from "./CurrencyContext";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [baseCurrency, setBaseCurrency] = useState(currencyList.popular[0]);

  const [quoteCurrency, setQuoteCurrency] = useState(currencyList.popular[1]);

  const [amount, setAmount] = useState(100);

  const [debounceAmount, setDebounceAmount] = useState(100)

  useEffect(() => {
    const timer = setTimeout(() => {
      //using amount as the debounce instead of debounceAmount to avoid renaming in other components cos i initially just used amount as the state name for the input value, but now i have to use debounceAmount as the state name for the input value to avoid renaming in other components which would take me time to start renaming the state name for the input value in other components.
      setAmount(debounceAmount);
    }, 500);

    return () => clearTimeout(timer);
  }, [debounceAmount]);

  return (
    <CurrencyContext.Provider
      value={{
        baseCurrency,
        quoteCurrency,
        setBaseCurrency,
        setQuoteCurrency,
        amount,
        setAmount,
        debounceAmount,
        setDebounceAmount
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}
