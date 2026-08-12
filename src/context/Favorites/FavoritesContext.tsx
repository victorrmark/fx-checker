"use client";

import { createContext } from "react";

type FavoritesContextType = {
    favorites: string[];
    isFavorite: (base:string, quote: string)=>boolean;
    toggleFavorite: (base: string, quote:string)=>void;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null);



