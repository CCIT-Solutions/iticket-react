import { useQuery } from "@tanstack/react-query";
import EventsApi from "./api";


export const useGetEvents = (language?: string) => {
  return useQuery({
    queryKey: ["events", language],
    queryFn: () => EventsApi.getAll(language),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30, // 30 s cache
  });
};

export const useGetPaginatedEvents = (
  params?: Record<string, any>,
  language?: string
) => {
  return useQuery({
    queryKey: ["events-paginated", language, params],
    queryFn: () => EventsApi.getPaginated(params, language),
     placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
};
