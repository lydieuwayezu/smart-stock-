// ============================================================
// App.jsx — THE ROUTER / MAP OF THE APP
// This file decides which PAGE to show based on the URL.
// For example: if the URL is "/login", show the Login page.
// Think of this as the table of contents of the app.
// ============================================================

// BrowserRouter: wraps the app and enables URL-based navigation
// Routes: a container that holds all the route definitions
// Route: defines one URL path and which component to show for it
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ToastContainer is the popup notification system (success/error messages)
// It needs to be placed once here so it works on every page
import { ToastContainer } from "react-toastify";

// Import the CSS that styles the toast notifications
import "react-toastify/dist/ReactToastify.css";

// Navbar is the top navigation bar — shown on every page
import Navbar from "./components/layout/Navbar";

// ProtectedRoute is a guard — it blocks pages from users who are not logged in
import ProtectedRoute from "./components/ui/ProtectedRoute";

// Import all the pages
import Home from "./pages/Home";               // "/" — main listings feed
import ListingDetails from "./pages/ListingDetails"; // "/listing/:id" — single property
import Bookings from "./pages/Bookings";       // "/bookings" — user's bookings (protected)
import Favorites from "./pages/Favorites";     // "/favorites" — saved listings
import Login from "./pages/Login";             // "/login" — login form

const App = () => {
  return (
    // BrowserRouter enables the whole routing system
    <BrowserRouter>

      {/* Navbar appears at the top of every single page */}
      <Navbar />

      {/* Routes looks at the current URL and renders the matching Route */}
      <Routes>

        {/* "/" → Show the Home page (listings feed) */}
        <Route path="/" element={<Home />} />

        {/* "/listing/:id" → Show details for one property
            :id is a dynamic value — it changes based on which listing you click */}
        <Route path="/listing/:id" element={<ListingDetails />} />

        {/* "/favorites" → Show the user's saved listings */}
        <Route path="/favorites" element={<Favorites />} />

        {/* "/login" → Show the login form */}
        <Route path="/login" element={<Login />} />

        {/* "/bookings" → PROTECTED: only logged-in users can see this page
            If not logged in, ProtectedRoute redirects to "/login" automatically */}
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* ToastContainer renders popup notifications (e.g. "Booking confirmed!")
          position: bottom-right corner of the screen
          autoClose: disappears after 3 seconds automatically */}
      <ToastContainer position="bottom-right" autoClose={3000} />

    </BrowserRouter>
  );
};

export default App;
