
import { fetchJsonData } from "@/lib/api/fetchers";

const LandingCategoriesApi = {
  getAll: (acceptLanguage?: string) =>
    fetchJsonData<any[]>({
      endpoint: "landing/categories",
      method: "GET",
      acceptLanguage,
    }),
};

export default LandingCategoriesApi;