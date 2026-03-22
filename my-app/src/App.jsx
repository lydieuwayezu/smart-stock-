import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/ui/ProtectedRoute";

import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Bookings from "./pages/Bookings";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
