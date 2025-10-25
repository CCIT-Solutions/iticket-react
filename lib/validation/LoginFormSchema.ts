import { TFunction } from "i18next";
import z from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email("auth.validation.emailValid")
    .min(5, "auth.validation.emailMin"),

  password: z
    .string()
    .min(6, "auth.validation.passwordMin")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "auth.validation.passwordStrong"
    ),

  termsAccepted: z.literal(true, {
    message: "auth.validation.termsRequired",
  }),
});

export const createTranslatedSchema = (
  t: TFunction<"translation", undefined>
) => {
  return z.object({
    email: z
      .string()
      .email(
        t("auth.validation.emailValid") || "Please enter a valid email address"
      )
      .min(5, t("auth.validation.emailMin") || "Email is too short"),

    password: z
      .string()
      .min(
        6,
        t("auth.validation.passwordMin") ||
          "Password must be at least 6 characters"
      )
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,}$/,
        t("auth.validation.passwordStrong") ||
          "Password must contain letters and numbers"
      ),

    termsAccepted: z.literal(true, {
      message:
        t("auth.validation.termsRequired") ||
        "You must accept the terms and privacy policy",
    }),
  });
};

export default LoginFormSchema;
