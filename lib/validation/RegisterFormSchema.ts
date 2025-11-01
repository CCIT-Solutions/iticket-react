import { TFunction } from "i18next";
import z from "zod";

// Base schema
export const RegisterFormSchema = z
  .object({
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
    password_confirmation: z.string().min(1, "auth.validation.passwordConfirmRequired"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "auth.validation.passwordsMustMatch",
  });

// Translated version
export const createTranslatedSchema = (t: TFunction<"translation", undefined>) =>
  z
    .object({
      name: z.string().min(
        2,
        t("auth.validation.nameMin") || "Name must be at least 2 characters"
      ),
      email: z
        .string()
        .email(t("auth.validation.emailValid") || "Please enter a valid email address")
        .min(5, t("auth.validation.emailMin") || "Email is too short"),
      phone_number: z
        .string()
        .min(
          10,
          t("auth.validation.phoneNumberMin") || "Phone number must be at least 10 digits"
        )
        .regex(
          /^[\+]?[0-9\-\(\)\s]+$/,
          t("auth.validation.phoneNumberValid") || "Please enter a valid phone number"
        ),
      password: z
        .string()
        .min(
          6,
          t("auth.validation.passwordMin") || "Password must be at least 6 characters"
        )
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,}$/,
          t("auth.validation.passwordStrong") || "Password must contain letters and numbers"
        ),
      password_confirmation: z
        .string()
        .min(
          1,
          t("auth.validation.passwordConfirmRequired") || "Please confirm your password"
        ),
    })
    .refine((data) => data.password === data.password_confirmation, {
      path: ["password_confirmation"],
      message: t("auth.validation.passwordsMustMatch") || "Passwords must match",
    });

export default RegisterFormSchema;
