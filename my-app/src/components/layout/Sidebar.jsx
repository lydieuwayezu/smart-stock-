// ============================================================
// components/layout/Sidebar.jsx — FILTER PANEL
// This is the left panel on the Home page.
// It lets users filter listings by price, location, and rating.
// When the user types in any filter, the listings update instantly
// because the filter values are stored in global state (Context API).
// ============================================================

// useAppContext gives us access to the global filters state
import { useAppContext } from "../../context/AppContext";

const Sidebar = () => {
  // Pull "filters" (current filter values) and "setFilters" (function to update them)
  // from the global AppContext — these are shared with the Home page
  const { filters, setFilters } = useAppContext();

  // -------------------------------------------------------
  // handleChange — runs every time the user types in any filter input
  // It updates only the specific filter that changed, keeping the others the same
  // e.target.name → the "name" attribute of the input (e.g. "minPrice")
  // e.target.value → what the user typed
  // -------------------------------------------------------
  const handleChange = (e) => {
    // Spread "...prev" keeps all existing filter values
    // Then override only the one that changed using [e.target.name]
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <aside className="sidebar">
      <h3>Filters</h3>

      {/* Min Price filter — filters out listings cheaper than this value */}
      <label>Min Price</label>
      <input
        type="number"
        name="minPrice"                  // matches the key in filters state
        value={filters.minPrice}         // controlled by global state
        onChange={handleChange}          // updates global state on change
        placeholder="$0"
      />

      {/* Max Price filter — filters out listings more expensive than this value */}
      <label>Max Price</label>
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleChange}
        placeholder="$1000"
      />

      {/* Location filter — filters listings by city name */}
      <label>Location</label>
      <input
        type="text"
        name="location"
        value={filters.location}
        onChange={handleChange}
        placeholder="City..."
      />

      {/* Rating filter — filters out listings with a rating below this value */}
      <label>Min Rating</label>
      <input
        type="number"
        name="rating"
        value={filters.rating}
        onChange={handleChange}
        placeholder="0-5"
        min="0"
        max="5"
        step="0.1"   // allows decimal values like 4.5
      />
    </aside>
  );
};

export default Sidebar;
