// ============================================================
// pages/Favorites.jsx — SAVED LISTINGS PAGE (route: "/favorites")
// This page shows all the listings the user has saved (hearted).
// It reads from the global Context API (AppContext),
// which loads favorites from localStorage on startup.
// So favorites persist even after the page is refreshed.
// ============================================================

// useAppContext gives us access to the global favorites state
import { useAppContext } from "../context/AppContext";

// ListingCard is reused here — same card component as the Home page
import ListingCard from "../components/ui/ListingCard";

const Favorites = () => {
  // Read the "favorites" array from global context
  // This is the list of all listings the user has saved by clicking the heart
  const { favorites } = useAppContext();

  return (
    <div className="page">
      <h2>My Favorites</h2>

      {/* If the user hasn't saved any listings yet, show a message */}
      {favorites.length === 0 ? (
        <p>No saved listings yet.</p>
      ) : (
        // Otherwise render the saved listings in the same grid layout as Home
        <div className="grid">
          {favorites.map((listing) => (
            // Reuse the same ListingCard component — it already has the heart toggle
            // so the user can also UN-save a listing from this page
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
