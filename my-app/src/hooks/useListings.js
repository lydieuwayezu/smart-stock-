// ============================================================
// hooks/useListings.js — TANSTACK QUERY HOOK FOR FETCHING LISTINGS
// This is a custom React hook that fetches property listings
// from the API and caches the result automatically.
// TanStack Query handles loading, error, and success states for us.
// ============================================================

// useQuery is the main TanStack Query hook for fetching data
import { useQuery } from "@tanstack/react-query";

// fetchListings is our API function from services/api.js
import { fetchListings } from "../services/api";

// -------------------------------------------------------
// useListings — custom hook that wraps useQuery
// Parameters:
//   placeId  — the city/place to search for listings
//   checkin  — optional check-in date
//   checkout — optional check-out date
//
// Returns: { data, isLoading, isError, error }
//   data      — the API response (listings array)
//   isLoading — true while the request is in progress
//   isError   — true if the request failed
//   error     — the actual error object if it failed
// -------------------------------------------------------
export const useListings = (placeId, checkin, checkout) => {
  return useQuery({

    // queryKey — a unique identifier for this specific query
    // TanStack Query uses this as the cache key.
    // If the same key is requested again, it returns cached data instead of calling the API.
    // If placeId, checkin, or checkout changes → a new request is made automatically.
    queryKey: ["listings", placeId, checkin, checkout],

    // queryFn — the function that actually fetches the data
    // TanStack Query calls this function and manages the result
    queryFn: () => fetchListings(placeId, checkin, checkout),

    // staleTime — how long the cached data is considered "fresh" (in milliseconds)
    // 1000 * 60 * 5 = 5 minutes
    // During this time, navigating away and back will NOT trigger a new API call
    staleTime: 1000 * 60 * 5,

    // cacheTime — how long the data stays in memory after the component unmounts
    // 1000 * 60 * 10 = 10 minutes
    // Even if you leave the page, the data stays cached for 10 minutes
    cacheTime: 1000 * 60 * 10,

    // retry — if the request fails, try again this many times before showing an error
    // 1 means: try once, if it fails try one more time, then give up
    retry: 1,
  });
};
