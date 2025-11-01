import HttpHelpers from "../helpers";

const AuthApiEndpoints = {
  register: async (data: unknown) => {
    const response = await HttpHelpers.unAuthenticatedAxios.post("register", data);
    return response.data;
  },

  login: async (data: unknown) => {
    const response = await HttpHelpers.unAuthenticatedAxios.post("login", data);
    return response.data;
  },

  logout: async () => {
    const response = await HttpHelpers.authenticatedAxios.post("logout");
    return response.data;
  },

  forgetPassword: async (data: unknown) => {
    const response = await HttpHelpers.unAuthenticatedAxios.post("forget-password", data);
    return response.data;
  },

  confirmOtp: async (data: unknown) => {
    const response = await HttpHelpers.unAuthenticatedAxios.post("verify-otp", data);
    return response.data;
  },

  resetPassword: async (data: unknown) => {
    const response = await HttpHelpers.unAuthenticatedAxios.post("reset-password", data);
    return response.data;
  },
};

export default AuthApiEndpoints;
