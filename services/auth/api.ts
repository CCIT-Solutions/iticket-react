import HttpHelpers from "../helpers";

const AuthApiEndpoints = {
  register: (data: unknown) => {
    return HttpHelpers.unAuthenticatedAxios
      .post("register", data)
      .then((response) => response.data);
  },

  login: (data: unknown) => {
    return HttpHelpers.unAuthenticatedAxios
      .post("login", data)
      .then((response) => response.data);
  },

  logout: (data: unknown) => {
    return HttpHelpers.authenticatedAxios
      .post("logout", data)
      .then((response) => response.data);
  },
};

export default AuthApiEndpoints;
