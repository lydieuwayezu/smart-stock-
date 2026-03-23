// ============================================================
// components/ui/BookingForm.jsx — BOOKING FORM
// This form appears on the ListingDetails page.
// It lets the user enter check-in date, check-out date, and guests.
// Uses react-hook-form for validation and Zustand to save the booking.
// ============================================================

// useForm is the main hook from react-hook-form
// It manages form state, validation, and submission for us
import { useForm } from "react-hook-form";

// useBookingStore gives us access to the Zustand booking store
import useBookingStore from "../../store/bookingStore";

// toast shows popup notification messages (success/error)
import { toast } from "react-toastify";

// -------------------------------------------------------
// BookingForm receives the "listing" object as a prop
// so it knows which property is being booked
// -------------------------------------------------------
const BookingForm = ({ listing }) => {

  // Destructure tools from useForm:
  // register    — connects each input to the form (tracks its value + validation)
  // handleSubmit — wraps our submit function and runs validation first
  // formState   — contains "errors" object with any validation error messages
  // reset       — clears all form fields after successful submission
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Get the addBooking function from Zustand store
  // We use (s) => s.addBooking to only subscribe to this one function (performance optimization)
  const addBooking = useBookingStore((s) => s.addBooking);

  // -------------------------------------------------------
  // onSubmit — runs when the form is submitted AND all fields are valid
  // "data" contains all the form field values: { checkin, checkout, guests }
  // -------------------------------------------------------
  const onSubmit = (data) => {
    // Save the booking to Zustand store (and localStorage)
    // We spread "data" (form values) and add listing info so we know what was booked
    addBooking({
      ...data,                        // checkin, checkout, guests
      listingId: listing.id,          // which property was booked
      listingName: listing.name,      // property name (to display in Bookings page)
      price: listing.price,           // price per night
    });

    // Show a green success popup notification
    toast.success("Booking confirmed!");

    // Clear all form fields so the user can make another booking
    reset();
  };

  return (
    // handleSubmit(onSubmit) — react-hook-form validates all fields first,
    // then calls onSubmit only if everything is valid
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Book this property</h3>

      {/* Check-in date field */}
      <label>Check-in</label>
      <input
        type="date"
        // register connects this input to react-hook-form
        // "checkin" is the field name, and we set it as required
        {...register("checkin", { required: "Check-in is required" })}
      />
      {/* Show error message below the input if validation fails */}
      {errors.checkin && <span className="error">{errors.checkin.message}</span>}

      {/* Check-out date field */}
      <label>Check-out</label>
      <input
        type="date"
        {...register("checkout", { required: "Check-out is required" })}
      />
      {errors.checkout && <span className="error">{errors.checkout.message}</span>}

      {/* Number of guests field */}
      <label>Guests</label>
      <input
        type="number"
        min="1"   // HTML attribute — prevents typing 0 or negative numbers
        {...register("guests", {
          required: "Number of guests required",
          min: { value: 1, message: "At least 1 guest required" }
        })}
      />
      {errors.guests && <span className="error">{errors.guests.message}</span>}

      {/* Submit button — triggers handleSubmit which validates then calls onSubmit */}
      <button type="submit">Confirm Booking</button>

    </form>
  );
};

export default BookingForm;
