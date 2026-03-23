// ============================================================
// context/AppContext.jsx — GLOBAL STATE (Context API)
// This file manages state that needs to be shared across
// MANY components without passing props manually every time.
// It handles two things: FAVORITES and FILTERS.
// ============================================================

// createContext: creates a "container" that holds shared data
// useContext: lets any component read from that container
// useState: manages local state inside a component
// useEffect: runs code when something changes (like saving to localStorage)
import { createContext, useContext, useState, useEffect } from "react";

// Create the context — think of it as an empty box we will fill with data
const AppContext = createContext();

// -------------------------------------------------------
// AppProvider — wraps the whole app and provides the shared data
// "children" means everything inside <AppProvider>...</AppProvider>
// -------------------------------------------------------
export const AppProvider = ({ children }) => {

  // -------------------------------------------------------
  // FAVORITES STATE
  // We use a function inside useState (called "lazy initialization")
  // so it reads from localStorage ONCE when the app first loads.
  // This means favorites survive page refresh.
  // -------------------------------------------------------
  const [favorites, setFavorites] = useState(() => {
    // Try to get saved favorites from the browser's localStorage
    const stored = localStorage.getItem("favorites");

    // If favorites exist in localStorage, parse and use them
    // Otherwise start with an empty array []
    return stored ? JSON.parse(stored) : [];
  });

  // -------------------------------------------------------
  // FILTERS STATE
  // These are the filter values from the Sidebar (price, location, rating)
  // They start empty — meaning no filters are applied by default
  // -------------------------------------------------------
  const [filters, setFilters] = useState({
    minPrice: "",   // minimum price per night
    maxPrice: "",   // maximum price per night
    location: "",   // city name to filter by
    rating: "",     // minimum star rating
  });

  // -------------------------------------------------------
  // Save favorites to localStorage every time the favorites array changes
  // useEffect watches the [favorites] dependency — runs whenever it updates
  // -------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]); // <-- only runs when "favorites" changes

  // -------------------------------------------------------
  // toggleFavorite — adds or removes a listing from favorites
  // If the listing is already in favorites → remove it
  // If it's not in favorites → add it
  // -------------------------------------------------------
  const toggleFavorite = (listing) => {
    setFavorites((prev) =>
      // Check if this listing already exists in favorites by comparing IDs
      prev.find((f) => f.id === listing.id)
        ? prev.filter((f) => f.id !== listing.id)  // already saved → remove it
        : [...prev, listing]                         // not saved → add it
    );
  };

  // -------------------------------------------------------
  // isFavorite — checks if a specific listing is saved
  // Returns true or false — used to show red/empty heart icon
  // -------------------------------------------------------
  const isFavorite = (id) => favorites.some((f) => f.id === id);

  // -------------------------------------------------------
  // Provide all the data and functions to every child component
  // Any component that calls useAppContext() gets access to all of these
  // -------------------------------------------------------
  return (
    <AppContext.Provider value={{ favorites, toggleFavorite, isFavorite, filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
};

// -------------------------------------------------------
// useAppContext — a custom hook to easily read from this context
// Instead of writing useContext(AppContext) every time,
// components just call useAppContext()
// -------------------------------------------------------
export const useAppContext = () => useContext(AppContext);
