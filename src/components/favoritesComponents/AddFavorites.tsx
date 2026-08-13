import { Star } from "lucide-react";
import { useFavorites } from "../../context/Favorites/useFavorites";
import { useCurrency } from "../../context/Currency/useCurrency";

export default function AddFavorites() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { baseCurrency, quoteCurrency } = useCurrency();
  const isFavorited = isFavorite(baseCurrency.code, quoteCurrency.code);
  console.log(isFavorited)

  return (
    <button
      className={`${isFavorited ? "bg-lime-500" : "bg-neutral-600 outline outline-neutral-300"} px-3 py-2 rounded-lg  cursor-pointer  flex justify-between items-center gap-2`}
      onClick={() => toggleFavorite(baseCurrency.code, quoteCurrency.code)}
    >
      <Star className={`${isFavorited ? "fill-neutral-900": "fill-neutral-200"}`} size={12} strokeWidth={0} />
      <p
        className={`uppercase  text-5 font-medium ${isFavorited ? "text-neutral-900" : "text-neutral-200"}`}
      >
        {isFavorited ? "Favorited" : "Favorite"}
      </p>
    </button>
  );
}
