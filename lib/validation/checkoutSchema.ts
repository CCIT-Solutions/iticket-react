import { TFunction } from "i18next";
import z from "zod";

export const checkoutSchema = z.object({
  paymentMethod: z.enum(["credit-cards", "apple-pay"] as const, {
    message: "Please select a payment method",
  }),
  termsAccepted: z.literal(true, {
    message: "You must accept the terms and privacy policy",
  }),
});

export const createCheckoutSchema = (
  t: TFunction<"translation", undefined>
) => {
  return z.object({
    paymentMethod: z.enum(["credit-cards", "apple-pay"] as const, {
      message:
        t("checkout.validation.paymentMethodRequired") 
    }),
    termsAccepted: z.literal(true, {
      message:
        t("checkout.validation.termsRequired")
    }),
  });
};
