import { Star, ArrowRight } from "lucide-react";
import { formatNumber } from "../../utils/formatNumbers";
import { useFavorites } from "../../context/Favorites/useFavorites";

export default function Favorite() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  console.log(favorites);

  return (
    <>
      {favorites.map((favorite, idx) => {
        const pairs = favorite.split("_");
        console.log(pairs);
        return (
          <div
            className="p-3 sm:p-4 rounded-[10px] bg-neutral-600 outline outline-neutral-500 gap-3.5 flex items-center"
            key={idx}
          >
            <div className="flex flex-1 flex-row items-center gap-2">
              <p className="text-4 text-neutral-50">{pairs[0]}</p>
              <ArrowRight className="text-neutral-200" size={15} />
              <p className="text-4 text-neutral-50">{pairs[1]}</p>
            </div>

            {/* <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-5">
            <p className="text-3 text-neutral-100">
              {formatNumber(log.amount)}
            </p>
            <p className="text-3 text-lime-500">{log.convertedAmount}</p>
          </div> */}

            <button
              className={`p-2 outline rounded-lg cursor-pointer ${favorite ? "outline-lime-500" : "outline-neutral-500"}`}
              // onClick={() =>  deleteLog(log.id)}
            >
              <Star
                className={
                  favorite ? "fill-lime-500 text-lime-500" : "text-neutral-50"
                }
                size={12}
              />
            </button>
          </div>
        );
      })}
    </>
  );
}
