import { useState, type ReactNode } from "react";

import { currencyList } from "../../utils/currencyList";
import { CurrencyContext } from "./CurrencyContext";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [baseCurrency, setBaseCurrency] = useState(currencyList.popular[0]);

  const [quoteCurrency, setQuoteCurrency] = useState(currencyList.popular[1]);

  const [amount, setAmount] = useState(0);

  return (
    <CurrencyContext.Provider
      value={{
        baseCurrency,
        quoteCurrency,
        setBaseCurrency,
        setQuoteCurrency,
        amount,
        setAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}
