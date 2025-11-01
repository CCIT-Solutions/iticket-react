import HttpHelpers from "@/services/helpers";
import { AxiosRequestConfig } from "axios";

const CategoriesApi = {
  getAll: () => {
    return HttpHelpers.unAuthenticatedAxios
      .get("landing/categories")
      .then((response) => response.data);
  },
};

export default CategoriesApi;
