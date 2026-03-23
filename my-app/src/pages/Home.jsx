// ============================================================
// pages/Home.jsx — MAIN LISTINGS FEED (route: "/")
// This is the first page users see.
// It fetches property listings from the API, applies search
// and filter logic, then displays them as a grid of cards.
// ============================================================

// useSearchParams reads query parameters from the URL
// e.g. from "/?search=Paris" it extracts "Paris"
import { useSearchParams } from "react-router-dom";

// Our custom TanStack Query hook that fetches and caches listings
import { useListings } from "../hooks/useListings";

// Global context for reading the current filter values
import { useAppContext } from "../context/AppContext";

// Components used on this page
import ListingCard from "../components/ui/ListingCard";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import Sidebar from "../components/layout/Sidebar";

// -------------------------------------------------------
// normalizeListing — transforms raw API data into a clean flat object
// The API returns deeply nested JSON, so we extract only what we need.
// The || (OR) operators provide fallback values if a field is missing.
// item.listing?.id uses optional chaining (?.) to safely access nested values
// -------------------------------------------------------
const normalizeListing = (item) => ({
  // Try to get id from top level, then from nested listing object, then generate a random one
  id: item.id || item.listing?.id || Math.random().toString(36).slice(2),

  name: item.name || item.listing?.name || "Unknown Property",

  // "pictures" is the API field name for images
  images: item.pictures || item.listing?.pictures || [],

  // price is nested inside a "rate" field in the API response
  price: item.price?.rate || item.listing?.price?.rate || 0,

  // avgRating is the average star rating
  rating: item.avgRating || item.listing?.avgRating || null,

  city: item.city || item.listing?.city || "",
  description: item.description || item.listing?.description || "",
  bedrooms: item.bedrooms || item.listing?.bedrooms || 0,
  bathrooms: item.bathrooms || item.listing?.bathrooms || 0,
});

const Home = () => {
  // Read the "search" query parameter from the URL
  // e.g. if URL is "/?search=Paris", search = "Paris"
  // If no search param exists, default to empty string ""
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  // Get the current filter values from global context (set by Sidebar)
  const { filters } = useAppContext();

  // The Google Place ID for Paris — used as the default search location
  const placeId = "ChIJD7fiBh9u5kcRYJSMaMOCCwQ";

  // Fetch listings using TanStack Query
  // data      — the API response object
  // isLoading — true while the request is in progress
  // isError   — true if the request failed
  // error     — the error object if it failed
  const { data, isLoading, isError, error } = useListings(placeId);

  // While data is loading, show the spinner component
  if (isLoading) return <div className="page-layout"><Loader /></div>;

  // If the request failed, show the error message component
  if (isError) return <div className="page-layout"><ErrorState message={error?.message} /></div>;

  // Extract the listings array from the API response
  // Try "results" first, then "data", then fall back to empty array
  const raw = data?.results || data?.data || [];

  // Transform every raw API item into a clean normalized object
  let listings = raw.map(normalizeListing);

  // -------------------------------------------------------
  // Apply search filter (from the URL search parameter)
  // Filter listings where the name OR city contains the search text
  // toLowerCase() makes the comparison case-insensitive
  // -------------------------------------------------------
  if (search) {
    listings = listings.filter((l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase())
    );
  }

  // -------------------------------------------------------
  // Apply sidebar filters (from global context)
  // Each filter only applies if the user has entered a value
  // -------------------------------------------------------

  // Keep only listings with price >= minPrice
  if (filters.minPrice) listings = listings.filter((l) => l.price >= Number(filters.minPrice));

  // Keep only listings with price <= maxPrice
  if (filters.maxPrice) listings = listings.filter((l) => l.price <= Number(filters.maxPrice));

  // Keep only listings where city contains the location text
  if (filters.location) listings = listings.filter((l) => l.city.toLowerCase().includes(filters.location.toLowerCase()));

  // Keep only listings with rating >= the minimum rating
  if (filters.rating) listings = listings.filter((l) => l.rating >= Number(filters.rating));

  return (
    <div className="page-layout">

      {/* Sidebar on the left — contains the filter inputs */}
      <Sidebar />

      <main className="listings-grid">
        {/* Show the search term in the heading if one was entered */}
        <h2>Available Properties {search && `— "${search}"`}</h2>

        {/* If no listings match the filters, show a message */}
        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          // Render a grid of ListingCard components
          // key={listing.id} helps React track each card efficiently
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
