// ============================================================
// pages/Bookings.jsx — BOOKINGS DASHBOARD (route: "/bookings")
// This page shows all the bookings the user has made.
// It is a PROTECTED route — only logged-in users can access it.
// Users can also cancel any booking from this page.
// ============================================================

// useBookingStore gives us access to the Zustand booking store
import useBookingStore from "../store/bookingStore";

// toast shows popup notification messages
import { toast } from "react-toastify";

const Bookings = () => {
  // Read "bookings" (the list of all bookings) and "cancelBooking" (function to remove one)
  // from the Zustand store
  const { bookings, cancelBooking } = useBookingStore();

  // -------------------------------------------------------
  // handleCancel — runs when the user clicks the Cancel button
  // "id" is the unique ID of the booking to cancel
  // -------------------------------------------------------
  const handleCancel = (id) => {
    // Remove the booking from Zustand store (and localStorage)
    cancelBooking(id);

    // Show a blue info notification to confirm the cancellation
    toast.info("Booking cancelled.");
  };

  return (
    <div className="page">
      <h2>My Bookings</h2>

      {/* If no bookings exist yet, show a message */}
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        // Otherwise render a grid of booking cards
        <div className="bookings-list">
          {bookings.map((b) => (
            // Each booking card shows the details of one booking
            // key={b.id} helps React track each card efficiently
            <div key={b.id} className="booking-card">

              {/* Property name */}
              <h4>{b.listingName}</h4>

              {/* Booking dates and guest count */}
              <p>Check-in: {b.checkin}</p>
              <p>Check-out: {b.checkout}</p>
              <p>Guests: {b.guests}</p>
              <p>Price: ${b.price}/night</p>

              {/* Cancel button — passes this booking's ID to handleCancel */}
              <button onClick={() => handleCancel(b.id)} className="cancel-btn">Cancel</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
