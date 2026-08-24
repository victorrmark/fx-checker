import { useFavorites } from "../context/Favorites/useFavorites";
import EmptyState from "../components/EmptyState";
import Favorite from "../components/favoritesComponents/Favorite";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No pinned pairs yet"
        message={
          "Pin a pair to track its rate here. Tap the star \n icon on the conversion or comparison row."
        }
      />
    );
  }

  return (
    <div className="relative w-full flex flex-col bg-neutral-700 outline-neutral-600 px-4 py-5 sm:p-5 gap-5 rounded-2xl">
      <div className="flex flex-row justify-between items-center gap-2.5">
          <p className="uppercase text-3 font-medium text-neutral-50">
            pinned pairs
          </p>
        <p className="uppercase text-5 text-neutral-200">{favorites.length} pairs</p>
      </div>

      {/* {isLoading ? (
        <CompareSkeleton />
      ) : isError ? (
        <div className="text-red-500">
          Error occurred while fetching currency rates.
        </div>
      ) : ( */}
        <Favorite />
      {/* )} */}
    </div>
  );
}
