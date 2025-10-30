import { TFunction } from "i18next";
import z from "zod";

export const RegisterFormSchema = z.object({
  name: z.string().min(2, "auth.validation.nameMin"),
  email: z
    .string()
    .email("auth.validation.emailValid")
    .min(5, "auth.validation.emailMin"),

  phone_number: z
    .string()
    .min(10, "auth.validation.phoneNumberMin")
    .regex(/^[\+]?[0-9\-\(\)\s]+$/, "auth.validation.phoneNumberValid"),

  password: z
    .string()
    .min(6, "auth.validation.passwordMin")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "auth.validation.passwordStrong"
    ),

  // termsAccepted: z.literal(true, {
  //   message: "auth.validation.termsRequired",
  // }),
});

export const createTranslatedSchema = (
  t: TFunction<"translation", undefined>
) => {
  return z.object({
    name: z
      .string()
      .min(
        2,
        t("auth.validation.nameMin") ||
          "Name must be at least 2 characters"
      ),

    email: z
      .string()
      .email(
        t("auth.validation.emailValid") ||
          "Please enter a valid email address"
      )
      .min(5, t("auth.validation.emailMin") || "Email is too short"),

    phone_number: z
      .string()
      .min(
        10,
        t("auth.validation.phoneNumberMin") ||
          "Phone number must be at least 10 digits"
      )
      .regex(
        /^[\+]?[0-9\-\(\)\s]+$/,
        t("auth.validation.phoneNumberValid") ||
          "Please enter a valid phone number"
      ),

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

    // termsAccepted: z.literal(true, {
    //   message:
    //     t("auth.validation.termsRequired") ||
    //     "You must accept the terms and privacy policy",
    // }),
  });
};

export default RegisterFormSchema;
