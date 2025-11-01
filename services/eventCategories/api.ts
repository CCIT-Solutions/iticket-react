import HttpHelpers from "@/services/helpers";
import { AxiosRequestConfig } from "axios";

const EventCategoriesApi = {
  getAll: async (config?: AxiosRequestConfig) => {
    const response = await HttpHelpers.unAuthenticatedAxios.get("categories", config);
    return response.data;
  },
};

export default EventCategoriesApi;
