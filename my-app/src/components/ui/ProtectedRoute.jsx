// ============================================================
// components/ui/ProtectedRoute.jsx — ROUTE GUARD
// This component protects certain pages from unauthenticated users.
// If the user is NOT logged in and tries to visit /bookings,
// they get automatically redirected to the /login page.
// ============================================================

// Navigate is used to redirect the user to a different page
import { Navigate } from "react-router-dom";

// -------------------------------------------------------
// ProtectedRoute wraps a page component (passed as "children")
// It checks if a user is logged in before allowing access
// -------------------------------------------------------
const ProtectedRoute = ({ children }) => {
  // Check localStorage for a saved "user" object
  // If it exists → user is logged in
  // If it doesn't exist → user is not logged in
  const user = localStorage.getItem("user");

  // If user is logged in → render the protected page (children)
  // If not logged in → redirect to /login
  // "replace" means the /bookings URL is replaced in history (so back button works correctly)
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
