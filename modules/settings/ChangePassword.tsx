"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Animate from "@/components/shared/Animate";
import { fade } from "@/lib/animation";
import { Button } from "@/components/ui/button";
import { CustomFormPassword } from "@/components/custom/CustomFormPassword";
import Translate from "@/components/shared/Translate";
import { useLang } from "@/hooks/useLang";

// ✅ Validation Schema
const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(8, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

function ChangePassword() {
  const { t } = useLang();

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordType) => {
    console.log("Password change submitted:", data);
  };

  return (
    <Animate variants={fade}>
      <div className="max-w-2xl">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">
          <Translate text="settings.changePassword" />
        </h1>
        <p className="text-neutral-400 mb-8">
          <Translate
            text="settings.updatePasswordSubtitle"
          />
        </p>

        {/* Form */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Current Password */}
            <CustomFormPassword
              name="currentPassword"
              label={t("settings.currentPassword")}
              placeholder="••••••••"
            />

            {/* New Password */}
            <div>
              <CustomFormPassword
                name="newPassword"
                label={t("settings.newPassword")}
                placeholder="••••••••"
              />
              <p className="text-xs text-neutral-500 mt-2">
                <Translate text="settings.passwordRequirements" />
              </p>
            </div>

            {/* Confirm Password */}
            <CustomFormPassword
              name="confirmPassword"
              label={t("settings.confirmPassword")}
              placeholder="••••••••"
            />

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-primary hover:bg-primary/90 text-black font-semibold px-10 py-3.5 rounded-xl transition-colors"
              >
                {form.formState.isSubmitting ? (
                  <Translate text="settings.updating" />
                ) : (
                  <Translate
                    text="settings.updatePassword"
                  />
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Animate>
  );
}

export default ChangePassword;
