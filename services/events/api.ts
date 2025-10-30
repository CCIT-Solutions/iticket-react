import { fetchJsonData } from "@/lib/api/fetchers";

const EventsApi = {
  getAll: (acceptLanguage?: string) =>
    fetchJsonData<any[]>({
      endpoint: "events",
      method: "GET",
      acceptLanguage,
    }),


  getPaginated: (params?: Record<string, any>, acceptLanguage?: string) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return fetchJsonData<{
      data: any[];
      pagination: { page: number; totalPages: number };
    }>({
      endpoint: `events/paginated${queryString}`,
      method: "GET",
      acceptLanguage,
    });
  },
};

export default EventsApi;
