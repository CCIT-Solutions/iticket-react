import HttpHelpers from "@/services/helpers";
import { AxiosRequestConfig } from "axios";

const CategoriesApi = {
  getAll: async (config?: AxiosRequestConfig) => {
    const response = await HttpHelpers.unAuthenticatedAxios.get("landing-categories", config);
    return response.data;
  },
};

export default CategoriesApi;