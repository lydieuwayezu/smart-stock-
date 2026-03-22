import { useParams } from "react-router-dom";
import { useListings } from "../hooks/useListings";
import BookingForm from "../components/ui/BookingForm";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import { FaStar } from "react-icons/fa";

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
  const { id } = useParams();
  const placeId = "ChIJD7fiBh9u5kcRYJSMaMOCCwQ";
  const { data, isLoading, isError, error } = useListings(placeId);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorState message={error?.message} />;

  const raw = data?.results || data?.data || [];
  const found = raw.find((item) => {
    const itemId = String(item.id || item.listing?.id);
    return itemId === String(id);
  });

  if (!found) return <ErrorState message="Listing not found." />;

  const listing = normalizeListing(found);

  return (
    <div className="details-page">
      <div className="details-images">
        {listing.images.slice(0, 3).map((img, i) => (
          <img key={i} src={img} alt={listing.name} />
        ))}
      </div>
      <div className="details-content">
        <div className="details-info">
          <h2>{listing.name}</h2>
          <p className="city">{listing.city}</p>
          <p><FaStar color="gold" /> {listing.rating ?? "N/A"}</p>
          <p>{listing.bedrooms} bedrooms · {listing.bathrooms} bathrooms</p>
          <p className="price"><strong>${listing.price}</strong> / night</p>
          <p className="description">{listing.description}</p>
        </div>
        <BookingForm listing={listing} />
      </div>
    </div>
  );
};

export default ListingDetails;
