// ============================================================
// pages/ListingDetails.jsx — SINGLE PROPERTY PAGE (route: "/listing/:id")
// This page shows the full details of one property.
// It reuses the SAME cached data from TanStack Query (no new API call!)
// and finds the specific listing by matching the ID from the URL.
// ============================================================

// useParams reads dynamic URL parameters
// e.g. from "/listing/3" it extracts { id: "3" }
import { useParams } from "react-router-dom";

// Our custom hook — reuses cached data from the Home page fetch
import { useListings } from "../hooks/useListings";

// Components used on this page
import BookingForm from "../components/ui/BookingForm";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";

// Star icon for the rating display
import { FaStar } from "react-icons/fa";

// -------------------------------------------------------
// normalizeListing — same transformation as in Home.jsx
// Converts raw API data into a clean flat object
// -------------------------------------------------------
const normalizeListing = (item) => ({
  id: item.id || item.listing?.id,
  name: item.name || item.listing?.name || "Unknown Property",
  images: item.pictures || item.listing?.pictures || [],
  price: item.price?.rate || item.listing?.price?.rate || 0,
  rating: item.avgRating || item.listing?.avgRating || null,
  city: item.city || item.listing?.city || "",
  description: item.description || item.listing?.description || "No description available.",
  bedrooms: item.bedrooms || item.listing?.bedrooms || 0,
  bathrooms: item.bathrooms || item.listing?.bathrooms || 0,
});

const ListingDetails = () => {
  // Get the "id" from the URL — e.g. from "/listing/3", id = "3"
  const { id } = useParams();

  // Same placeId as Home page — this is the KEY to reusing cached data
  // TanStack Query sees the same queryKey and returns cached data instantly
  const placeId = "ChIJD7fiBh9u5kcRYJSMaMOCCwQ";

  // Fetch listings — if already cached from Home page, this returns instantly
  const { data, isLoading, isError, error } = useListings(placeId);

  // Show spinner while loading
  if (isLoading) return <Loader />;

  // Show error message if fetch failed
  if (isError) return <ErrorState message={error?.message} />;

  // Extract the raw listings array from the API response
  const raw = data?.results || data?.data || [];

  // Find the specific listing that matches the ID from the URL
  // String() converts both to strings to ensure the comparison works
  // (API might return a number, URL always gives a string)
  const found = raw.find((item) => {
    const itemId = String(item.id || item.listing?.id);
    return itemId === String(id);
  });

  // If no listing was found with that ID, show an error
  if (!found) return <ErrorState message="Listing not found." />;

  // Normalize the found listing into a clean object
  const listing = normalizeListing(found);

  return (
    <div className="details-page">

      {/* Show up to 3 images of the property in a grid */}
      <div className="details-images">
        {listing.images.slice(0, 3).map((img, i) => (
          // "i" is the index — used as key since images don't have unique IDs
          <img key={i} src={img} alt={listing.name} />
        ))}
      </div>

      {/* Main content: property info on the left, booking form on the right */}
      <div className="details-content">

        {/* Left side: all property details */}
        <div className="details-info">
          <h2>{listing.name}</h2>
          <p className="city">{listing.city}</p>

          {/* Star icon + rating. ?? "N/A" shows "N/A" if rating is null */}
          <p><FaStar color="gold" /> {listing.rating ?? "N/A"}</p>

          {/* Bedrooms and bathrooms on one line separated by a dot */}
          <p>{listing.bedrooms} bedrooms · {listing.bathrooms} bathrooms</p>

          {/* Price per night highlighted in red */}
          <p className="price"><strong>${listing.price}</strong> / night</p>

          {/* Full property description */}
          <p className="description">{listing.description}</p>
        </div>

        {/* Right side: booking form — passes the listing so it knows what's being booked */}
        <BookingForm listing={listing} />

      </div>
    </div>
  );
};

export default ListingDetails;
