// ============================================================
// services/api.js — THE ONLY FILE THAT TALKS TO THE API
// All API requests go through here. No other file is allowed
// to make direct API calls. This keeps things organized and
// makes it easy to change the API in one place if needed.
// ============================================================

// axios is a library that makes HTTP requests (like fetching data from a server)
import axios from "axios";

// -------------------------------------------------------
// Create a reusable Axios instance with shared settings
// -------------------------------------------------------
const api = axios.create({
  // baseURL: the starting part of every API URL
  // Every request will start with this, so we only write the rest of the path
  baseURL: "https://airbnb19.p.rapidapi.com/api/v2",

  // headers: extra information sent with every request
  // The API requires these headers to identify who is making the request
  headers: {
    // The API key is stored in the .env file — NEVER hardcode it here
    // import.meta.env reads from the .env file securely
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,

    // Tells the API which host (server) we are targeting
    "x-rapidapi-host": "airbnb19.p.rapidapi.com",

    // Tells the server we are sending JSON data
    "Content-Type": "application/json",
  },
});

// -------------------------------------------------------
// Mock data — used as a fallback when the API rate limit is hit
// The API has a free tier limit. When exceeded, it returns a 429 error.
// Instead of crashing, we show these fake listings so the app still works.
// -------------------------------------------------------
const mockListings = [
  {
    id: "1",
    name: "Cozy Paris Apartment",
    pictures: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"],
    price: { rate: 120 },   // price per night
    avgRating: 4.8,
    city: "Paris",
    description: "A beautiful cozy apartment in the heart of Paris with stunning views.",
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: "2",
    name: "Modern Loft in Montmartre",
    pictures: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600"],
    price: { rate: 95 },
    avgRating: 4.6,
    city: "Paris",
    description: "Stylish loft located in the artistic Montmartre neighborhood.",
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: "3",
    name: "Luxury Suite near Eiffel Tower",
    pictures: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600"],
    price: { rate: 250 },
    avgRating: 4.9,
    city: "Paris",
    description: "Stunning luxury suite with direct views of the Eiffel Tower.",
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: "4",
    name: "Charming Studio in Le Marais",
    pictures: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600"],
    price: { rate: 75 },
    avgRating: 4.5,
    city: "Paris",
    description: "Charming studio in the historic Le Marais district.",
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: "5",
    name: "Spacious Family Home",
    pictures: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600"],
    price: { rate: 180 },
    avgRating: 4.7,
    city: "Paris",
    description: "Perfect for families, spacious home with a private garden.",
    bedrooms: 4,
    bathrooms: 2,
  },
  {
    id: "6",
    name: "Boutique Room in Saint-Germain",
    pictures: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"],
    price: { rate: 110 },
    avgRating: 4.4,
    city: "Paris",
    description: "Elegant boutique room in the famous Saint-Germain-des-Prés area.",
    bedrooms: 1,
    bathrooms: 1,
  },
];

// -------------------------------------------------------
// fetchListings — the main function to get property listings
// Parameters:
//   placeId  — the Google Place ID of the city to search (default: Paris)
//   checkin  — optional check-in date string
//   checkout — optional check-out date string
// -------------------------------------------------------
export const fetchListings = async (placeId = "ChIJD7fiBh9u5kcRYJSMaMOCCwQ", checkin = "", checkout = "") => {
  try {
    // Build the query parameters object
    const params = { placeId };

    // Only add checkin/checkout to the request if they were provided
    if (checkin) params.checkin = checkin;
    if (checkout) params.checkout = checkout;

    // Make the GET request to the API endpoint
    // The full URL becomes: baseURL + "/searchPropertyByPlaceId" + ?placeId=...
    const { data } = await api.get("/searchPropertyByPlaceId", { params });

    // Return the raw API response data
    return data;

  } catch (error) {
    // Check if the error is a 429 (Too Many Requests / Rate Limit)
    if (error.response?.status === 429) {
      // Instead of crashing the app, return the mock listings
      // The app will display these as if they came from the real API
      return { results: mockListings };
    }

    // For any other error (network issue, server error, etc.), throw it
    // so TanStack Query can catch it and show the error state
    throw error;
  }
};

// Export the axios instance in case other files need to make custom requests
export default api;
