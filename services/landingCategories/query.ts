import { useQuery } from "@tanstack/react-query";
import CategoriesApi from "./api";

export const useGetLandingCategories = (language?: string) => {
  return useQuery({
    queryKey: ["landing-categories", language],
    queryFn: () => CategoriesApi.getAll(language),
     placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60, 
  });
};