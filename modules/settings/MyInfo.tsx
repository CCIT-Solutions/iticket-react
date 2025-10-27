"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomField } from "@/components/custom/CustomFormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/CustomSelect";
import Animate from "@/components/shared/Animate";
import { fade } from "@/lib/animation";
import { useLang } from "@/hooks/useLang";
import Translate from "@/components/shared/Translate";
import User from "@/components/icons/User";
import Email from "@/components/icons/Email";
import Phone from "@/components/icons/Phone";
import { Label } from "@/components/ui/label";

// Component
function MyInfo() {
  const { t, isRTL } = useLang();

  // Schema Validation (with translated messages)
  const MyInfoSchema = z.object({
    firstName: z.string().min(2, t("settings.firstNameShort")),
    lastName: z.string().min(2, t("settings.lastNameShort")),
    email: z.string().email(t("settings.invalidEmail")),
    phone: z.string().min(8, t("settings.invalidPhone")),
    birthdayDay: z.string().optional(),
    birthdayMonth: z.string().optional(),
    birthdayYear: z.string().optional(),
  });

  type MyInfoType = z.infer<typeof MyInfoSchema>;

  // Initialize form
  const form = useForm<MyInfoType>({
    resolver: zodResolver(MyInfoSchema),
    defaultValues: {
      firstName: "Mohamed",
      lastName: "Ali",
      email: "mohamed.ali@example.com",
      phone: "+966 50 123 4567",
      birthdayDay: "",
      birthdayMonth: "",
      birthdayYear: "",
    },
  });

  // Handle Submit
  const onSubmit = (data: MyInfoType) => {
    console.log("Form submitted:", data);
  };

  return (
    <Animate variants={fade}>
      <h1 className="text-3xl font-bold mb-2">
        <Translate text="settings.myInfo" />
      </h1>
      <p className="text-neutral-400 mb-8">
        <Translate text="settings.updatePersonalInfo" />
      </p>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomField
              name="firstName"
              label={t("settings.firstName")}
              icon={<User className="text-neutral-400" />}
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder={t("settings.firstNamePlaceholder")}
                  className="py-7 bg-neutral-900/80 border border-neutral-800"
                />
              )}
            </CustomField>

            <CustomField
              name="lastName"
              label={t("settings.lastName")}
              icon={<User className="text-neutral-400" />}
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder={t("settings.lastNamePlaceholder")}
                  className="py-7 bg-neutral-900/80 border border-neutral-800"
                />
              )}
            </CustomField>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomField
              name="email"
              label={t("settings.email")}
              icon={<Email className="text-neutral-400" />}
            >
              {(field) => (
                <Input
                  type="email"
                  {...field}
                  placeholder={t("settings.emailPlaceholder")}
                  className="py-7 bg-neutral-900/80 border border-neutral-800"
                />
              )}
            </CustomField>

            <CustomField
              name="phone"
              label={t("settings.phoneNumber")}
              icon={<Phone className="text-neutral-400" />}
            >
              {(field) => (
                <Input
                  type="text"
                  {...field}
                  placeholder={t("settings.phonePlaceholder")}
                  className="py-7 bg-neutral-900/80 border border-neutral-800"
                />
              )}
            </CustomField>
          </div>

          {/* Birthday */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-neutral-400 font-medium mb-3">
                <Translate text="settings.birthday" />
              </Label>
              <div className="grid grid-cols-3 gap-4">
                <Select
                  value={form.watch("birthdayDay")}
                  onValueChange={(value) => form.setValue("birthdayDay", value)}
                        dir={isRTL ? "rtl" : "ltr"}
                >
                  <SelectTrigger
                    className="bg-neutral-900/80 border-neutral-800 py-7 px-4 w-full"
              
                  >
                    <SelectValue placeholder={t("settings.day")} />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800 max-h-[350px]">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <SelectItem
                        key={day}
                        value={String(day).padStart(2, "0")}
                      >
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={form.watch("birthdayMonth")}
                  onValueChange={(value) =>
                    form.setValue("birthdayMonth", value)
                  }
                   dir={isRTL ? "rtl" : "ltr"}
                >
                  <SelectTrigger className="bg-neutral-900/80 border-neutral-800 py-7 px-4 w-full">
                    <SelectValue placeholder={t("settings.month")} />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800 max-h-[350px]">
                    {[
                      t("settings.january"),
                      t("settings.february"),
                      t("settings.march"),
                      t("settings.april"),
                      t("settings.may"),
                      t("settings.june"),
                      t("settings.july"),
                      t("settings.august"),
                      t("settings.september"),
                      t("settings.october"),
                      t("settings.november"),
                      t("settings.december"),
                    ].map((month, index) => (
                      <SelectItem
                        key={month}
                        value={String(index + 1).padStart(2, "0")}
                      >
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={form.watch("birthdayYear")}
                  onValueChange={(value) =>
                    form.setValue("birthdayYear", value)
                  }
                   dir={isRTL ? "rtl" : "ltr"}
                >
                  <SelectTrigger className="bg-neutral-900/80 border-neutral-800 py-7 px-4 w-full">
                    <SelectValue placeholder={t("settings.year")} />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800 max-h-[350px]">
                    {Array.from(
                      { length: 100 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-neutral-200 hover:bg-white hover:text-black text-black transition-all py-6 rounded-2xl min-w-48 cursor-pointer font-semibold tracking-widest w-full sm:w-auto"
            >
              {form.formState.isSubmitting ? (
                <Translate text="settings.saving" />
              ) : (
                <Translate text="settings.saveChanges" />
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Animate>
  );
}

export default MyInfo;
