# SmartStay Booking Platform

A production-grade accommodation booking platform built with React + Vite, inspired by Airbnb.

## Project Structure

```
src/
├── services/
│   └── api.js              # Centralized Axios instance + API functions
├── context/
│   └── AppContext.jsx       # Global state: favorites + filters (Context API)
├── store/
│   └── bookingStore.js      # Booking state (Zustand)
├── hooks/
│   └── useListings.js       # TanStack Query hook for fetching listings
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       # Top navigation with search
│   │   └── Sidebar.jsx      # Filter panel
│   └── ui/
│       ├── ListingCard.jsx  # Property card component
│       ├── BookingForm.jsx  # Booking form (react-hook-form)
│       ├── UserProfileCard.jsx
│       ├── Loader.jsx
│       ├── ErrorState.jsx
│       └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx             # Listings feed
│   ├── ListingDetails.jsx   # Single property view
│   ├── Bookings.jsx         # User bookings dashboard
│   ├── Favorites.jsx        # Saved listings
│   └── Login.jsx            # Authentication
├── App.jsx                  # Routes
├── main.jsx                 # Providers (QueryClient + AppProvider)
└── index.css                # Global styles
```

## API Integration

Uses the Airbnb API via RapidAPI:
- Base URL: `https://airbnb19.p.rapidapi.com/api/v2`
- Endpoint: `/searchPropertyByPlaceId`
- All requests go through `src/services/api.js`
- API key is stored in `.env` and never hardcoded

## Setup Instructions

1. Clone the repo
2. Navigate into the project:
   ```bash
   cd my-app
   ```
3. Install dependencies:
   ```bash
   npm install react-router-dom axios @tanstack/react-query zustand react-hook-form react-toastify react-icons
   ```
4. Create a `.env` file in the `my-app/` root:
   ```
   VITE_RAPID_API_KEY=your_api_key_here
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```

## State Management

| Type | Tool | Used For |
|------|------|----------|
| Local | useState | Forms, UI interactions |
| Global | Context API | Favorites, Filters |
| Advanced | Zustand | Bookings |
| Server | TanStack Query | API data, caching |

## Routes

| Path | Page | Protected |
|------|------|-----------|
| `/` | Home (listings feed) | No |
| `/listing/:id` | Listing Details | No |
| `/bookings` | Bookings Dashboard | Yes |
| `/favorites` | Saved Listings | No |
| `/login` | Login | No |
