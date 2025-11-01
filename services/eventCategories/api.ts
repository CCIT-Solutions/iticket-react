import HttpHelpers from "@/services/helpers";
import { AxiosRequestConfig } from "axios";

const EventCategoriesApi = {
  getAll: () => {
    return HttpHelpers.unAuthenticatedAxios
      .get("categories")
      .then((response) => response.data);
  },
};

export default EventCategoriesApi;
