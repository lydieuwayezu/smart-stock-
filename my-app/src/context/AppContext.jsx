import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    location: "",
    rating: "",
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (listing) => {
    setFavorites((prev) =>
      prev.find((f) => f.id === listing.id)
        ? prev.filter((f) => f.id !== listing.id)
        : [...prev, listing]
    );
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite, isFavorite, filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
