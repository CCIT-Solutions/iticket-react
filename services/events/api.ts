import HttpHelpers from "@/services/helpers";
import { AxiosRequestConfig } from "axios";

const EventsApi = {
  getAll: async (config?: AxiosRequestConfig) => {
    const response = await HttpHelpers.unAuthenticatedAxios.get("events", config);
    return response.data;
  },
};

export default EventsApi;
