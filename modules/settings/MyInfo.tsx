"use client";

import { useMemo } from "react";
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

// Schema Validation
const MyInfoSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Invalid phone number"),
  birthdayDay: z.string().optional(),
  birthdayMonth: z.string().optional(),
  birthdayYear: z.string().optional(),
});

type MyInfoType = z.infer<typeof MyInfoSchema>;

function MyInfo() {
  const { t } = useLang();

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
              label="First Name"
              icon={<User className="text-neutral-400" />}
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="First name"
                  className="py-7 bg-neutral-900/80 border border-neutral-800"
                />
              )}
            </CustomField>

            <CustomField
              name="lastName"
              label="Last Name"
              icon={<User className="text-neutral-400" />}
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="Last name"
                  className="py-7 bg-neutral-900/80 border border-neutral-800"
                />
              )}
            </CustomField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <CustomField
              name="email"
              label="Email"
              icon={<Email className="text-neutral-400" />}
            >
              {(field) => (
                <Input
                  type="email"
                  {...field}
                  placeholder="Email"
                  className="py-7 bg-neutral-900/80 border border-neutral-800"
                />
              )}
            </CustomField>

            {/* Phone */}
            <CustomField
              name="phone"
              label="Phone Number"
              icon={<Phone className="text-neutral-400" />}
            >
              {(field) => (
                <Input
                  type="tel"
                  {...field}
                  placeholder="+966..."
                  className="py-7 bg-neutral-900/80 border border-neutral-800"
                />
              )}
            </CustomField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Birthday  */}
            <div className="space-y-2">
              <Label className="text-neutral-400 font-medium mb-3">
                <Translate text="settings.birthday" />
              </Label>
              <div className="grid grid-cols-3 gap-4">
                <Select
                  value={form.watch("birthdayDay")}
                  onValueChange={(value) => form.setValue("birthdayDay", value)}
                >
                  <SelectTrigger className="bg-neutral-900/80 border-neutral-800 py-7 px-4 w-full">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
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
                >
                  <SelectTrigger className="bg-neutral-900/80 border-neutral-800 py-7 px-4 w-full">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
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
                >
                  <SelectTrigger className="bg-neutral-900/80 border-neutral-800 py-7 px-4 w-full">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
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
