"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";
import Translate from "@/components/shared/Translate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CustomField } from "@/components/custom/CustomFormField";
import { useLang } from "@/hooks/useLang";
import { notify } from "@/lib/notify";
import Container from "@/components/shared/Container";
import Link from "next/link";

import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdNorthEast,
  MdNorthWest,
} from "react-icons/md";

const contactItems = [
  {
    icon: <MdEmail className="w-5 h-5 text-primary" />,
    title: "contact.emailUs",
    value: "info@iticket.com",k
    href: "mailto:info@elie.com",
  },
  {
    icon: <MdPhone className="w-5 h-5 text-primary" />,
    title: "contact.callUs",
    value: "+966 123 456 789",
    href: "tel:+9665555555",
  },
  {
    icon: <MdLocationOn className="w-5 h-5 text-primary" />,
    title: "contact.ourLocation",
    value: "contact.address",
    href: "https://maps.google.com/?q=Your+Company+Location",
  },
];

// Define your schema
const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ContactForm = z.infer<typeof contactSchema>;

const ContactPage: React.FC = () => {
  const { t, lang, isRTL } = useLang();
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm): Promise<void> => {
    // Replace with your actual API call
    console.log(data);
    notify({ res: { success: true, message: t("contact.successMessage") }, t });
    form.reset();
  };

  return (
    <section className="pt-40 pb-32 relative">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/media/images/contact.webp')] bg-cover bg-center bg-no-repeat  -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-neutral-100 to-transparent -z-10" />

      <Container className="px-5">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Contact Info */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-3 mb-6">
              <p className="text-xl font-semibold text-neutral-600">
                <Translate text="contact.contactUs" />
              </p>
              <h1 className="text-4xl font-semibold text-neutral-800 mb-2">
                <Translate text="contact.getInTouch" />
              </h1>
              <p className="text-neutral-600 max-w-2xl text-sm">
                <Translate text="contact.welcomeMessage" />
              </p>
               <p className="text-neutral-600 max-w-2xl text-sm">
                <Translate text="contact.feelFree" />
              </p>
            </div>
            <div className="space-y-4">
            {contactItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                target="_blank"
                className="relative group flex items-center justify-between gap-4 p-4 rounded-2xl border border-white/40 bg-white/20 backdrop-blur-[3px] shadow-sm hover:bg-white/10 transition-all duration-300"
              >
                {/* Left side */}
                <div className="flex items-start gap-4">
                  {/* Icon circle */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="font-medium text-neutral-800">
                      <Translate text={item.title} />
                    </h3>
                    {item.title === "contact.ourLocation" ? (
                      <p className="text-neutral-600">
                        <Translate text={item.value} />
                      </p>
                    ) : (
                      <span className="text-neutral-600 hover:text-primary transition" dir="ltr">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow (changes direction based on locale) */}
                <div
                  className={`text-primary/60 group-hover:text-primary transition w-10 h-10 flex items-center justify-center rounded-full bg-primary/10`}
                >
                  {isRTL ? (
                    <MdNorthWest size={20} />
                  ) : (
                    <MdNorthEast size={20} />
                  )}
                </div>
              </Link>
            ))}
          </div>
          </div>
          

          {/* Contact Form */}
          <div className="space-y-6 mt-8 md:mt-0">
            <div className="space-y-6">
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 p-8 rounded-3xl bg-white/10 backdrop-blur-[3px] shadow-lg border border-white/30"
                >
                  {/* Name Field */}
                  <CustomField name="name" label={t("contact.name")} required>
                    {(field) => (
                      <Input
                        className="px-4 py-6 text-xs bg-white/10 backdrop-blur-[3px] border border-white/40 rounded-xl placeholder:text-neutral-500 focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder={t("contact.namePlaceholder")}
                        {...field}
                      />
                    )}
                  </CustomField>

                  {/* Email Field */}
                  <CustomField name="email" label={t("contact.email")} required>
                    {(field) => (
                      <div className="relative">
                        <Mail className="absolute start-3 top-3.5 w-5 h-5 text-neutral-500" />
                        <Input
                          className="px-4 py-6 text-xs ps-10 bg-white/10 backdrop-blur-[3px] border border-white/40 rounded-xl placeholder:text-neutral-500 focus:ring-2 focus:ring-primary/50 transition-all"
                          type="email"
                          placeholder={t("contact.emailPlaceholder")}
                          {...field}
                        />
                      </div>
                    )}
                  </CustomField>

                  {/* Message Field */}
                  <CustomField
                    name="message"
                    label={t("contact.message")}
                    required
                  >
                    {(field) => (
                      <Textarea
                        rows={6}
                        placeholder={t("contact.messagePlaceholder")}
                        className="resize-none text-xs min-h-32 bg-white/10 backdrop-blur-[3px] border border-white/40 rounded-xl placeholder:text-neutral-500 focus:ring-2 focus:ring-primary/50 transition-all"
                        {...field}
                      />
                    )}
                  </CustomField>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full md:w-auto"
                  >
                    {form.formState.isSubmitting ? (
                      t("common.sending")
                    ) : (
                      <Translate text="contact.sendMessage" />
                    )}
                  </Button>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactPage;
