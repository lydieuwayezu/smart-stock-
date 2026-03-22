import axios from "axios";

const api = axios.create({
  baseURL: "https://airbnb19.p.rapidapi.com/api/v2",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "airbnb19.p.rapidapi.com",
    "Content-Type": "application/json",
  },
});

const mockListings = [
  {
    id: "1",
    name: "Cozy Paris Apartment",
    pictures: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"],
    price: { rate: 120 },
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

export const fetchListings = async (placeId = "ChIJD7fiBh9u5kcRYJSMaMOCCwQ", checkin = "", checkout = "") => {
  try {
    const params = { placeId };
    if (checkin) params.checkin = checkin;
    if (checkout) params.checkout = checkout;
    const { data } = await api.get("/searchPropertyByPlaceId", { params });
    return data;
  } catch (error) {
    if (error.response?.status === 429) {
      // Rate limit hit — return mock data so the app keeps working
      return { results: mockListings };
    }
    throw error;
  }
};

export default api;
