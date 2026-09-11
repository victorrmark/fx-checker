import { useState, useEffect, type ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";

const FAVORITES_KEY = "currency-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) return [];

    try {
      const parsed: unknown = JSON.parse(stored);
      
      if (
        Array.isArray(parsed) &&
        parsed.every((item) => typeof item === "string")
      ) {
        return parsed;
      }

      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const getPairKey = (base: string, quote: string) => {
    return `${base}_${quote}`;
  };

  const isFavorite = (base: string, quote: string): boolean => {
    return favorites.includes(getPairKey(base, quote));
  };

  const toggleFavorite = (base: string, quote: string) => {
    const pair = getPairKey(base, quote);

    setFavorites((current) => {
      if (current.includes(pair)) {
        return current.filter((item) => item !== pair);
      }

      return [...current, pair];
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
