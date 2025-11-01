import HttpHelpers from "@/services/helpers";
import { AxiosRequestConfig } from "axios";

const EventsApi = {
  getAll: () => {
    return HttpHelpers.unAuthenticatedAxios
      .get("events")
      .then((response) => response.data);
  },
};

export default EventsApi;
