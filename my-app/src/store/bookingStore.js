import { create } from "zustand";

const useBookingStore = create((set) => ({
  bookings: JSON.parse(localStorage.getItem("bookings") || "[]"),

  addBooking: (booking) =>
    set((state) => {
      const updated = [...state.bookings, { ...booking, id: Date.now() }];
      localStorage.setItem("bookings", JSON.stringify(updated));
      return { bookings: updated };
    }),

  cancelBooking: (id) =>
    set((state) => {
      const updated = state.bookings.filter((b) => b.id !== id);
      localStorage.setItem("bookings", JSON.stringify(updated));
      return { bookings: updated };
    }),
}));

export default useBookingStore;
