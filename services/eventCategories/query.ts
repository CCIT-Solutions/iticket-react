import { useQuery } from "@tanstack/react-query";
import EventCategoriesApi from "./api";

export const useGetEventCategories = (language?: string) => {
  return useQuery({
    queryKey: ["event-categories", language],
    queryFn: () =>
      EventCategoriesApi.getAll({
        params: { lang: language },
      }),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};
