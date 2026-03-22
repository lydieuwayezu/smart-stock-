import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";

const ListingCard = ({ listing }) => {
  const { toggleFavorite, isFavorite } = useAppContext();

  const {
    id,
    name,
    images,
    price,
    rating,
    city,
  } = listing;

  return (
    <div className="listing-card">
      <div className="card-image">
        <img src={images?.[0] || "https://via.placeholder.com/300x200"} alt={name} />
        <button className="fav-btn" onClick={() => toggleFavorite(listing)}>
          {isFavorite(id) ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
      </div>
      <div className="card-body">
        <h4>{name}</h4>
        <p>{city}</p>
        <div className="card-footer">
          <span><FaStar color="gold" /> {rating ?? "N/A"}</span>
          <span><strong>${price}</strong> / night</span>
        </div>
        <Link to={`/listing/${id}`} className="details-btn">View Details</Link>
      </div>
    </div>
  );
};

export default ListingCard;
