// ============================================================
// store/bookingStore.js — BOOKING STATE (Zustand)
// Zustand is a simple state management library.
// It's like Context API but simpler and better for complex state.
// This file manages all booking data: adding and cancelling bookings.
// Data is also saved to localStorage so it survives page refresh.
// ============================================================

// "create" is the main function from Zustand to create a store
import { create } from "zustand";

// -------------------------------------------------------
// useBookingStore — the Zustand store for bookings
// "create" takes a function that receives "set"
// "set" is how you update the state inside Zustand
// -------------------------------------------------------
const useBookingStore = create((set) => ({

  // -------------------------------------------------------
  // bookings — the list of all bookings the user has made
  // On first load, we read from localStorage so bookings persist
  // If nothing is saved yet, we default to an empty array []
  // -------------------------------------------------------
  bookings: JSON.parse(localStorage.getItem("bookings") || "[]"),

  // -------------------------------------------------------
  // addBooking — adds a new booking to the list
  // "booking" is the data from the BookingForm (checkin, checkout, guests, etc.)
  // -------------------------------------------------------
  addBooking: (booking) =>
    set((state) => {
      // Create a new array with all existing bookings PLUS the new one
      // Date.now() gives a unique number based on current time — used as the booking ID
      const updated = [...state.bookings, { ...booking, id: Date.now() }];

      // Save the updated list to localStorage so it persists after refresh
      localStorage.setItem("bookings", JSON.stringify(updated));

      // Return the new state — Zustand will update the store with this
      return { bookings: updated };
    }),

  // -------------------------------------------------------
  // cancelBooking — removes a booking by its ID
  // "id" is the unique ID of the booking to remove
  // -------------------------------------------------------
  cancelBooking: (id) =>
    set((state) => {
      // Filter out the booking that matches the given ID
      // All other bookings remain in the list
      const updated = state.bookings.filter((b) => b.id !== id);

      // Save the updated list to localStorage
      localStorage.setItem("bookings", JSON.stringify(updated));

      // Return the new state without the cancelled booking
      return { bookings: updated };
    }),
}));

export default useBookingStore;
