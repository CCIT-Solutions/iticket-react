"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Translate from "@/components/shared/Translate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CustomField } from "@/components/custom/CustomFormField";
import RegistrationSchema, {
  createTranslatedSchema,
} from "@/lib/validation/RegisterFormSchema";
import { useLang } from "@/hooks/useLang";
import Container from "@/components/shared/Container";
import SubscriptionSummaryCard from "./SubscriptionSummaryCard";
import usePlan from "@/hooks/usePlan";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MultiSpecialitySelect = dynamic(
  () => import("@/modules/auth/MultiSpecialitySelect")
);
const MultiImageUpload = dynamic(
  () => import("@/modules/auth/MultiImageUpload")
);

type RegistrationForm = z.infer<typeof RegistrationSchema>;

const Subscription: React.FC = () => {
  const { t } = useLang();

  const router = useRouter();

  const { plan } = usePlan();

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(createTranslatedSchema(t)),
    defaultValues: {
      name: "",
      licenseNumber: "",
      google_map_location_url: "",
      phone: "",
      whatsapp_number: "",
      specialities: [],
      purpose_note: "",
      images: [],
      termsAccepted: undefined
    },
  });

  const onSubmit = async (data: RegistrationForm): Promise<void> => {
    const payload = {
      name: data.name,
      licenseNumber: data.licenseNumber,
      google_map_location_url: data.google_map_location_url,
      phone: data.phone,
      whatsapp_number: data.whatsapp_number,
      specialities: data.specialities,
      purpose_note: data.purpose_note,
      images: data.images,
      termsAccepted: data.termsAccepted
    };

    console.log("clicked");

    router.push(`/checkout?plan=${plan?.slug || ""}`);

    // const res = await register({ payload, acceptLanguage: lang });

    // if (res.success) {
    //   form.reset();
    // }

    // notify({ res, t });
  };

  return (
    <Container className="pb-10 px-5 ">
      <div className="flex flex-col gap-3 mb-6">
        <p className="text-xl font-semibold text-neutral-600">
          <Translate text="register.joinUs" />
        </p>
        <h1 className="text-4xl font-semibold text-neutral-800 mb-2">
          <Translate text="register.getStartedNow" />
        </h1>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-8 space-y-6 lg:space-y-0 lg:justify-between"
        >
          <div className="space-y-10 max-w-[450px] order-2 sm:order-1">
            <div className="grid grid-cols-1 gap-4">
              {/* Name */}
              <CustomField
                name="name"
                label={t("register.name")}
                required
              >
                {(field) => (
                  <Input
                    className="px-4 py-6 text-xs"
                    placeholder={t("register.name")}
                    {...field}
                  />
                )}
              </CustomField>

              {/* License Number */}
              <CustomField
                name="licenseNumber"
                label={t("register.licenseNumber")}
                required
              >
                {(field) => (
                  <Input
                    className="px-4 py-6 text-xs"
                    placeholder={t("register.licenseNumber")}
                    {...field}
                  />
                )}
              </CustomField>

              {/* Location */}
              <CustomField
                name="google_map_location_url"
                label={t("register.location")}
                required
              >
                {(field) => (
                  <div className="relative">
                    <MapPin className="absolute start-3 top-3.5 w-5 h-5 text-neutral-500" />
                    <Input
                      className="px-4 py-6 text-xs ps-10"
                      type="url"
                      placeholder={t("register.googleMapsLink")}
                      {...field}
                    />
                  </div>
                )}
              </CustomField>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Phone Number */}
              <CustomField
                name="phone"
                label={t("register.phoneNumber")}
                required
              >
                {(field) => (
                  <div className="relative">
                    <Phone className="absolute start-3 top-3.5 w-5 h-5 text-neutral-500" />
                    <Input
                      className="px-4 py-6 text-xs ps-10 [direction:inherit]"
                      type="tel"
                      placeholder={t("register.phoneNumber")}
                      {...field}
                    />
                  </div>
                )}
              </CustomField>

              {/* WhatsApp Number */}
              <CustomField
                name="whatsapp_number"
                label={t("register.whatsappNumber")}
              >
                {(field) => (
                  <div className="relative">
                    <FaWhatsapp className="absolute start-3 top-3.5 w-5 h-5 text-neutral-500" />
                    <Input
                      className="px-4 py-6 text-xs ps-10 [direction:inherit]"
                      type="tel"
                      placeholder={t("register.whatsappNumber")}
                      {...field}
                    />
                  </div>
                )}
              </CustomField>
            </div>
            {/* Specialties */}
            <CustomField
              name="specialities"
              label={t("register.specialties")}
              required
            >
              {(field) => <MultiSpecialitySelect field={field} />}
            </CustomField>

            {/* Image Upload Section */}
            <CustomField name="images" label={t("register.uploadImage")}>
              {(field) => (
                <MultiImageUpload
                  field={field}
                  maxImages={5}
                  maxSize={5 * 1024 * 1024}
                />
              )}
            </CustomField>

            {/* Special Offer */}
            <CustomField name="purpose_note" label={t("register.specialOffer")}>
              {(field) => (
                <Textarea
                  rows={4}
                  placeholder={t("register.specialOfferPlaceholder")}
                  className="resize-none text-xs min-h-28"
                  {...field}
                />
              )}
            </CustomField>

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
                    <Translate text="register.termsAcceptance" />
                    <Link href={"/terms"} target="_blank" className="font-semibold">
                      <Translate text="register.Terms" />
                    </Link>
                    <Translate text="register.haveRead" />
                    <Link href={"/privacy"} target="_blank" className="font-semibold">
                      <Translate text="register.privacy" />
                    </Link>
                  </p>
                </div>
              )}
            </CustomField>

            {/* Submit Buttons */}
            <div className="grid-cols-2">
              <div className="col-span-2 flex gap-4 mt-6 sm:mb-10">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="flex-1 cursor-pointer"
                >
                  {form.formState.isSubmitting ? (
                    t("common.sending")
                  ) : (
                    <Translate text="register.register" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 hover:bg-primary/60 hover:text-white cursor-pointer"
                >
                  <Translate text="register.cancel" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <SubscriptionSummaryCard plan={plan} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default Subscription;
