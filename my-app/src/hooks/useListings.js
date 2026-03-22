import { useQuery } from "@tanstack/react-query";
import { fetchListings } from "../services/api";

export const useListings = (placeId, checkin, checkout) => {
  return useQuery({
    queryKey: ["listings", placeId, checkin, checkout],
    queryFn: () => fetchListings(placeId, checkin, checkout),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
  });
};
