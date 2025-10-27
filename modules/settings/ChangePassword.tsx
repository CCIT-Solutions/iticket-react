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
import Lock from "@/components/icons/Lock";

// ✅ Validation Schema
const ChangePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters"),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

function ChangePassword() {
  const { t } = useLang();

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordType) => {
    console.log("Password change submitted:", data);
  };

  return (
    <Animate variants={fade}>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">
        <Translate text="settings.changePassword" />
      </h1>
      <p className="text-neutral-400 mb-8">
        <Translate text="settings.updatePasswordSubtitle" />
      </p>

      {/* Form */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Current Password */}
            <CustomFormPassword
              icon={<Lock />}
              name="currentPassword"
              label={t("settings.currentPassword")}
              placeholder={t("settings.currentPasswordPlaceholder")}
              inputClassName="py-4 bg-neutral-900/80 border border-neutral-800"
            />

            {/* New Password */}
            <CustomFormPassword
              icon={<Lock />}
              name="newPassword"
              label={t("settings.newPassword")}
              placeholder={t("settings.newPasswordPlaceholder")}
              inputClassName="py-4 bg-neutral-900/80 border border-neutral-800"
            />
          </div>

          {/* Submit */}
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

export default ChangePassword;
