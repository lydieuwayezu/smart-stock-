import { useAppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { filters, setFilters } = useAppContext();

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <aside className="sidebar">
      <h3>Filters</h3>

      <label>Min Price</label>
      <input type="number" name="minPrice" value={filters.minPrice} onChange={handleChange} placeholder="$0" />

      <label>Max Price</label>
      <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleChange} placeholder="$1000" />

      <label>Location</label>
      <input type="text" name="location" value={filters.location} onChange={handleChange} placeholder="City..." />

      <label>Min Rating</label>
      <input type="number" name="rating" value={filters.rating} onChange={handleChange} placeholder="0-5" min="0" max="5" step="0.1" />
    </aside>
  );
};

export default Sidebar;
