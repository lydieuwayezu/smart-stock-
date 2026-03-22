import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/?search=${query.trim()}`);
  };

  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <nav className="navbar">
      <Link to="/" className="logo">SmartStay</Link>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search destinations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit"><FaSearch /></button>
      </form>

      <div className="nav-links">
        <Link to="/favorites">Favorites</Link>
        <Link to="/bookings">Bookings</Link>
        {isLoggedIn ? (
          <Link to="/profile"><FaUserCircle size={24} /></Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
