import { useAppContext } from "../context/AppContext";
import ListingCard from "../components/ui/ListingCard";

const Favorites = () => {
  const { favorites } = useAppContext();

  return (
    <div className="page">
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No saved listings yet.</p>
      ) : (
        <div className="grid">
          {favorites.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
