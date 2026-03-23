// ============================================================
// components/ui/ListingCard.jsx — PROPERTY CARD COMPONENT
// This component displays one property as a card.
// It shows the image, name, city, rating, price, and a heart button.
// It is reused on both the Home page and the Favorites page.
// ============================================================

// Link: navigates to the listing details page without reloading
import { Link } from "react-router-dom";

// Icons:
// FaHeart: filled red heart (listing is saved as favorite)
// FaRegHeart: empty heart outline (listing is not saved)
// FaStar: gold star for the rating
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

// useAppContext gives us access to favorites functions from global state
import { useAppContext } from "../../context/AppContext";

// -------------------------------------------------------
// ListingCard receives one "listing" object as a prop
// The listing object contains: id, name, images, price, rating, city
// -------------------------------------------------------
const ListingCard = ({ listing }) => {

  // Get the toggleFavorite and isFavorite functions from global context
  // toggleFavorite: adds or removes this listing from favorites
  // isFavorite: checks if this listing is already saved (returns true/false)
  const { toggleFavorite, isFavorite } = useAppContext();

  // Destructure the listing object to get individual values
  const { id, name, images, price, rating, city } = listing;

  return (
    <div className="listing-card">

      {/* Top section: property image + favorite heart button */}
      <div className="card-image">

        {/* Show the first image from the images array
            If no image exists, show a placeholder image instead */}
        <img src={images?.[0] || "https://via.placeholder.com/300x200"} alt={name} />

        {/* Heart button — toggles this listing in/out of favorites
            isFavorite(id) checks if this listing is already saved:
            - true  → show filled red heart (FaHeart)
            - false → show empty heart outline (FaRegHeart) */}
        <button className="fav-btn" onClick={() => toggleFavorite(listing)}>
          {isFavorite(id) ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>

      </div>

      {/* Bottom section: property details */}
      <div className="card-body">

        {/* Property name */}
        <h4>{name}</h4>

        {/* City where the property is located */}
        <p>{city}</p>

        {/* Rating and price on the same row */}
        <div className="card-footer">
          {/* Star icon + rating number. If no rating, show "N/A" */}
          <span><FaStar color="gold" /> {rating ?? "N/A"}</span>

          {/* Price per night */}
          <span><strong>${price}</strong> / night</span>
        </div>

        {/* Button that navigates to the full details page for this listing
            The URL becomes /listing/1, /listing/2, etc. based on the id */}
        <Link to={`/listing/${id}`} className="details-btn">View Details</Link>

      </div>
    </div>
  );
};

export default ListingCard;
