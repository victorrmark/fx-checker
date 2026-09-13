import { Star } from "lucide-react";
import { useFavorites } from "../../context/Favorites/useFavorites";
import { useCurrency } from "../../context/Currency/useCurrency";
import { useState } from "react";

export default function AddFavorites() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { baseCurrency, quoteCurrency, amount } = useCurrency();
  const [toast, setToast] = useState("");
  
  const isFavorited = isFavorite(baseCurrency.code, quoteCurrency.code);

  const showToast = () => {
    setToast(isFavorited ? "Removed from favorites" : "Added to favorites");

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  return (
    <>
      <button
        className={`${isFavorited ? "bg-lime-500" : "bg-neutral-600 outline outline-neutral-300"} px-3 py-2 rounded-lg  cursor-pointer  flex justify-between items-center gap-2 focus:outline-lime-500 focus:outline-2 focus:outline-offset-2`}
        onClick={() => {
          toggleFavorite(baseCurrency.code, quoteCurrency.code);
          showToast();
        }}
        disabled={!amount}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Star
          className={`${isFavorited ? "fill-neutral-900" : "fill-neutral-200"}`}
          size={12}
          strokeWidth={0}
          aria-hidden="true"
        />
        <p
          className={`uppercase  text-5 font-medium ${isFavorited ? "text-neutral-900" : "text-neutral-200"}`}
        >
          {isFavorited ? "Favorited" : "Favorite"}
        </p>
      </button>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-50 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </>
  );
}
