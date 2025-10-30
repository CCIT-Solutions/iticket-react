
import { fetchJsonData } from "@/lib/api/fetchers";

const EventCategoriesApi = {
  getAll: (acceptLanguage?: string) =>
    fetchJsonData<any[]>({
      endpoint: "categories",
      method: "GET",
      acceptLanguage,
    }),
};

export default EventCategoriesApi;