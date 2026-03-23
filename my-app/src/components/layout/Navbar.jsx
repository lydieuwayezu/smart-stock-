// ============================================================
// components/layout/Navbar.jsx — TOP NAVIGATION BAR
// This component appears at the top of every page.
// It contains: the app logo, a search bar, and navigation links.
// ============================================================

// Link: renders an <a> tag that navigates without reloading the page
// useNavigate: a hook that lets us navigate to a URL programmatically (in code)
import { Link, useNavigate } from "react-router-dom";

// useState: manages the search input value as local state
import { useState } from "react";

// Icons from react-icons library
// FaSearch: magnifying glass icon for the search button
// FaUserCircle: person/profile icon shown when user is logged in
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  // "query" holds whatever the user types in the search box
  // setQuery updates it every time the user types a character
  const [query, setQuery] = useState("");

  // useNavigate gives us a function to redirect the user to a different URL
  const navigate = useNavigate();

  // -------------------------------------------------------
  // handleSearch — runs when the user submits the search form
  // It updates the URL to "/?search=Paris" (for example)
  // The Home page reads this URL parameter and filters listings
  // -------------------------------------------------------
  const handleSearch = (e) => {
    // Prevent the default browser behavior of reloading the page on form submit
    e.preventDefault();

    // Only navigate if the search box is not empty (trim removes spaces)
    if (query.trim()) navigate(`/?search=${query.trim()}`);
  };

  // -------------------------------------------------------
  // Check if the user is logged in by looking in localStorage
  // !! converts the value to true/false (boolean)
  // If "user" exists in localStorage → isLoggedIn = true
  // If not → isLoggedIn = false
  // -------------------------------------------------------
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <nav className="navbar">

      {/* Logo — clicking it takes the user back to the home page */}
      <Link to="/" className="logo">SmartStay</Link>

      {/* Search form — controlled input that updates "query" state on every keystroke */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search destinations..."
          value={query}                              // controlled by state
          onChange={(e) => setQuery(e.target.value)} // update state on every keystroke
        />
        {/* Submit button with a search icon */}
        <button type="submit"><FaSearch /></button>
      </form>

      {/* Navigation links */}
      <div className="nav-links">
        <Link to="/favorites">Favorites</Link>
        <Link to="/bookings">Bookings</Link>

        {/* Conditional rendering:
            If logged in → show profile icon linking to /profile
            If not logged in → show "Login" link */}
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
