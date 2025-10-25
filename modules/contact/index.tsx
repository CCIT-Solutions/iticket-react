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
    value: "info@iticket.com",
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
    console.log(data);
    notify({ res: { success: true, message: t("contact.successMessage") }, t });
    form.reset();
  };

  return (
    <section className="pt-40 pb-32 relative  text-neutral-100">
      <Container className="px-5">
        <div className="md:grid md:grid-cols-2 md:gap-10">
          {/* Contact Info */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-3 mb-8">
              <p className="text-lg font-semibold text-neutral-400">
                <Translate text="contact.contactUs" />
              </p>
              <h1 className="text-4xl font-bold text-white mb-3">
                <Translate text="contact.getInTouch" />
              </h1>
              <p className="text-neutral-400 text-sm leading-relaxed">
                <Translate text="contact.welcomeMessage" />
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                <Translate text="contact.feelFree" />
              </p>
            </div>

            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  target="_blank"
                  className="relative group flex items-center justify-between gap-4 p-4 rounded-2xl border border-neutral-900 bg-neutral-950/60 hover:bg-neutral-950/70 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="font-medium text-white">
                        <Translate text={item.title} />
                      </h3>
                      {item.title === "contact.ourLocation" ? (
                        <p className="text-neutral-400 text-sm">
                          <Translate text={item.value} />
                        </p>
                      ) : (
                        <span
                          className="text-neutral-400 hover:text-primary transition text-sm"
                          dir="ltr"
                        >
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-primary/60 hover:text-primary transition-colors duration-500 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/15 ">
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
          <div className="space-y-6 mt-10 md:mt-0">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-8 rounded-3xl border border-neutral-900 bg-neutral-950/60 hover:bg-neutral-950/70 shadow-lg backdrop-blur-[3px]"
              >
                {/* Name */}
                <CustomField name="name" label={t("contact.name")} required>
                  {(field) => (
                    <Input
                      className="px-4 py-6 text-sm bg-neutral-900/50 border border-neutral-800/60 rounded-xl text-neutral-100 placeholder:text-neutral-500 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      placeholder={t("contact.namePlaceholder")}
                      {...field}
                    />
                  )}
                </CustomField>

                {/* Email */}
                <CustomField name="email" label={t("contact.email")} required>
                  {(field) => (
                    <div className="relative p-0">
                      <Mail className="absolute start-3 top-3.5 w-5 h-5 text-neutral-500" />
                      <Input
                        className="px-4 py-6 ps-10 text-sm bg-neutral-900/50 border border-neutral-800/60 rounded-xl text-neutral-100 placeholder:text-neutral-500 focus:ring-0 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        type="email"
                        placeholder={t("contact.emailPlaceholder")}
                        {...field}
                      />
                    </div>
                  )}
                </CustomField>

                {/* Message */}
                <CustomField
                  name="message"
                  label={t("contact.message")}
                  required
                >
                  {(field) => (
                    <Textarea
                      rows={6}
                      placeholder={t("contact.messagePlaceholder")}
                      className="resize-none text-sm min-h-32 bg-neutral-900/50 border border-neutral-800/60 rounded-xl text-neutral-100 placeholder:text-neutral-500 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      {...field}
                    />
                  )}
                </CustomField>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full md:w-auto bg-primary/80 text-neutral-950 hover:bg-primary hover:text-black cursor-pointer"
                >
                  {form.formState.isSubmitting
                    ? t("common.sending")
                    : t("contact.sendMessage")}
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactPage;
