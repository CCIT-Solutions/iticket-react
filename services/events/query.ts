import { useQuery } from "@tanstack/react-query";
import EventsApi from "./api";

export const useGetEvents = (language?: string) => {
  return useQuery({
    queryKey: ["events", language],
    queryFn: () =>
      EventsApi.getAll({
        params: { lang: language },
      }),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
};
