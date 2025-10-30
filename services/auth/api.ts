import { fetchJsonData } from "@/lib/api/fetchers";
import { GoogleLoginPayload, LoginPayload, RegisterPayload } from "@/types/Auth";

const AuthApi = {
  register: (body: RegisterPayload, acceptLanguage?: string) =>
    fetchJsonData<{ token: string }>({
      endpoint: "register",
      method: "POST",
      body,
      acceptLanguage,
    }),

  login: (body: LoginPayload, acceptLanguage?: string) =>
    fetchJsonData<{ token: string }>({
      endpoint: "login",
      method: "POST",
      body,
      acceptLanguage,
    }),

  loginWithGoogle: (body: GoogleLoginPayload, acceptLanguage?: string) =>
    fetchJsonData<{ token: string }>({
      endpoint: "google",
      method: "POST",
      body,
      acceptLanguage,
    }),
};

export default AuthApi;
