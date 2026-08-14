import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyProvider } from "./context/Currency/CurrencyProvider.tsx";
import { FavoritesProvider } from "./context/Favorites/FavoritesProvider.tsx";
import { LogsProvider } from "./context/LogContext/LogsProvider.tsx";

import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";

import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <FavoritesProvider>
          <LogsProvider>
            <App />
          </LogsProvider>
        </FavoritesProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  </StrictMode>,
);
