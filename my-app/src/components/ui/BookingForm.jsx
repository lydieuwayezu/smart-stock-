import { useForm } from "react-hook-form";
import useBookingStore from "../../store/bookingStore";
import { toast } from "react-toastify";

const BookingForm = ({ listing }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const addBooking = useBookingStore((s) => s.addBooking);

  const onSubmit = (data) => {
    addBooking({ ...data, listingId: listing.id, listingName: listing.name, price: listing.price });
    toast.success("Booking confirmed!");
    reset();
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Book this property</h3>

      <label>Check-in</label>
      <input type="date" {...register("checkin", { required: "Check-in is required" })} />
      {errors.checkin && <span className="error">{errors.checkin.message}</span>}

      <label>Check-out</label>
      <input type="date" {...register("checkout", { required: "Check-out is required" })} />
      {errors.checkout && <span className="error">{errors.checkout.message}</span>}

      <label>Guests</label>
      <input type="number" min="1" {...register("guests", { required: "Number of guests required", min: 1 })} />
      {errors.guests && <span className="error">{errors.guests.message}</span>}

      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default BookingForm;
