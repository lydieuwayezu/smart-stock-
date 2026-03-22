import useBookingStore from "../store/bookingStore";
import { toast } from "react-toastify";

const Bookings = () => {
  const { bookings, cancelBooking } = useBookingStore();

  const handleCancel = (id) => {
    cancelBooking(id);
    toast.info("Booking cancelled.");
  };

  return (
    <div className="page">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <h4>{b.listingName}</h4>
              <p>Check-in: {b.checkin}</p>
              <p>Check-out: {b.checkout}</p>
              <p>Guests: {b.guests}</p>
              <p>Price: ${b.price}/night</p>
              <button onClick={() => handleCancel(b.id)} className="cancel-btn">Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
