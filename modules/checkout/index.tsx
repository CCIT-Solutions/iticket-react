"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { FaApplePay } from "react-icons/fa";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { checkoutSchema, createCheckoutSchema } from "@/lib/validation/checkoutSchema";
import Translate from "@/components/shared/Translate";
import SubscriptionSummaryCard from "../subscription/SubscriptionSummaryCard";
import usePlan from "@/hooks/usePlan";
import { CustomField } from "@/components/custom/CustomFormField";
import { Check } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useLang } from "@/hooks/useLang";
const SuccessModal = dynamic(() => import("./Success"));

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface PaymentMethod {
  id: "credit-cards" | "apple-pay";
  label: string;
  badges?: React.ReactNode;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "credit-cards",
    label: "Credit Cards",
    badges: (
      <div className="flex space-x-1">
        <Image
          src={"/media/icons/credit-payment.webp"}
          alt="Credit Payment"
          width={100}
          height={13}
        />
      </div>
    ),
  },
  {
    id: "apple-pay",
    label: "Apple Pay",
    badges: <FaApplePay size={35} />,
  },
];

const Checkout: React.FC = () => {
  const { plan } = usePlan();
  const { t } = useLang();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(createCheckoutSchema(t)),
    defaultValues: {
      paymentMethod: undefined,
      termsAccepted: undefined,
    },
  });

  const onSubmit = async (data: CheckoutFormData): Promise<void> => {
    console.log("Processing payment with:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success modal instead of alert
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    form.reset();
    redirect("/");
  };

  return (
    <>
      <Container className="pb-10 sm:pb-24 px-5">
        <div className="flex flex-col gap-3 sm:mb-6">
          <p className="text-xl font-semibold text-neutral-600">
            <Translate text="checkout.joinUs" />
          </p>
          <h1 className="text-4xl font-semibold text-neutral-800 mb-2">
            <Translate text="checkout.title" />
          </h1>
        </div>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row justify-between gap-8 space-y-6 lg:space-y-0"
          >
            {/* Left Side - Checkout Form */}
            <div className="space-y-8 max-w-[450px] flex-1 order-2 sm:order-1">
              {/* Payment Method Selection using CustomField */}
              <CustomField
                name="paymentMethod"
                label={
                  <span className="text-base font-semibold uppercase tracking-wide pb-6">
                    <Translate text="checkout.selectPaymentMethod" />
                  </span>
                }
              >
                {({ value, onChange }) => (
                  <div className="space-y-3">
                    {paymentMethods.map((method) => {
                      const isSelected = value === method.id;

                      return (
                        <div
                          key={method.id}
                          className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 bg-neutral-100 h-16 ${
                            isSelected
                              ? "border-primary bg-blue-50 shadow-sm"
                              : "border-neutral-200 hover:border-neutral-300"
                          }`}
                          onClick={() => onChange(method.id)}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 rounded-full border me-3 flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "border-primary bg-white"
                                  : "border-neutral-300 hover:border-neutral-400"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-3 h-3 bg-primary rounded-full" />
                              )}
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-neutral-800 font-medium">
                                <Translate
                                  text={`checkout.paymentMethods.${method.id}`}
                                />
                              </span>
                            </div>
                          </div>
                          {method.badges}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CustomField>

              {/* Terms and Conditions using CustomField */}
              <CustomField name="termsAccepted" label="">
                {({ value, onChange }) => (
                  <div className="flex items-start">
                    <div
                      className={`w-6 h-6 rounded-md shrink-0  border-2 me-3 mt-0.5 flex items-center justify-center cursor-pointer transition-all ${
                        value
                          ? "bg-primary border-prbg-primary"
                          : "border-neutral-300 hover:border-neutral-400"
                      }`}
                      onClick={() => onChange(!value)}
                    >
                      {value && <Check className="text-white size-3" />}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      <Translate text="checkout.termsAcceptance" />
                      <Link href={"/terms"} target="_blank" className="font-semibold">
                        <Translate text="checkout.Terms" />
                      </Link>
                      <Translate text="checkout.haveRead" />
                      <Link href={"/privacy"} target="_blank" className="font-semibold">
                        <Translate text="checkout.privacy" />
                      </Link>
                    </p>
                  </div>
                )}
              </CustomField>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <Button
                  disabled={form.formState.isSubmitting}
                  className="flex-1 cursor-pointer"
                >
                  {form.formState.isSubmitting ? (
                    <Translate text="common.sending" />
                  ) : (
                    <Translate text="checkout.payNow" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border border-primary cursor-pointer"
                  onClick={() => form.reset()}
                >
                  <Translate text="checkout.cancel" />
                </Button>
              </div>
            </div>

            {/* Right Side - Summary Card */}
            <SubscriptionSummaryCard plan={plan} />
          </form>
        </FormProvider>
      </Container>

      {/* Success Modal */}
      <SuccessModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Checkout;
