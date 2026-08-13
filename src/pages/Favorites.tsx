import { useFavorites } from "../context/Favorites/useFavorites";
import EmptyState from "../components/EmptyState";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No pinned pairs yet"
        message={"Pin a pair to track its rate here. Tap the star \n icon on the conversion or comparison row."}
      />
    );
  }

  return <div>Favorites</div>;
}
