import { useSearchParams } from "react-router-dom";
import { useListings } from "../hooks/useListings";
import { useAppContext } from "../context/AppContext";
import ListingCard from "../components/ui/ListingCard";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import Sidebar from "../components/layout/Sidebar";

// Normalize raw API response into a flat listing object
const normalizeListing = (item) => ({
  id: item.id || item.listing?.id || Math.random().toString(36).slice(2),
  name: item.name || item.listing?.name || "Unknown Property",
  images: item.pictures || item.listing?.pictures || [],
  price: item.price?.rate || item.listing?.price?.rate || 0,
  rating: item.avgRating || item.listing?.avgRating || null,
  city: item.city || item.listing?.city || "",
  description: item.description || item.listing?.description || "",
  bedrooms: item.bedrooms || item.listing?.bedrooms || 0,
  bathrooms: item.bathrooms || item.listing?.bathrooms || 0,
});

const Home = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const { filters } = useAppContext();

  const placeId = "ChIJD7fiBh9u5kcRYJSMaMOCCwQ"; // Default: Paris
  const { data, isLoading, isError, error } = useListings(placeId);

  if (isLoading) return <div className="page-layout"><Loader /></div>;
  if (isError) return <div className="page-layout"><ErrorState message={error?.message} /></div>;

  const raw = data?.results || data?.data || [];
  let listings = raw.map(normalizeListing);

  // Apply search filter
  if (search) {
    listings = listings.filter((l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Apply sidebar filters
  if (filters.minPrice) listings = listings.filter((l) => l.price >= Number(filters.minPrice));
  if (filters.maxPrice) listings = listings.filter((l) => l.price <= Number(filters.maxPrice));
  if (filters.location) listings = listings.filter((l) => l.city.toLowerCase().includes(filters.location.toLowerCase()));
  if (filters.rating) listings = listings.filter((l) => l.rating >= Number(filters.rating));

  return (
    <div className="page-layout">
      <Sidebar />
      <main className="listings-grid">
        <h2>Available Properties {search && `— "${search}"`}</h2>
        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <div className="grid">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
