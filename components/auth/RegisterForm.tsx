"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomField } from "@/components/custom/CustomFormField";
import RegisterFormSchema, {
  createTranslatedSchema,
} from "@/lib/validation/RegisterFormSchema";
import { useLang } from "@/hooks/useLang";
import { FcGoogle } from "react-icons/fc";
import User from "@/components/icons/User";
import Email from "@/components/icons/Email";
import Phone from "@/components/icons/Phone";
import Lock from "@/components/icons/Lock";
import Translate from "@/components/shared/Translate";
import { cn } from "@/lib/utils";
import { CustomFormPassword } from "@/components/custom/CustomFormPassword";
import Animate from "../shared/Animate";
import { fade } from "@/lib/animation";
import { apiRequest } from "@/lib/api/api";
import { toast } from "sonner";
import AuthApiEndpoints from "@/services/auth/api";
import { UserData } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

type RegisterFormType = z.infer<typeof RegisterFormSchema>;

function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}) {
  const { t, isRTL } = useLang();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createTranslatedSchema(t), [t]);
  const router = useRouter();

  const { setUser } = useUser();

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    const response = await apiRequest<
      UserData,
      { token: string },
      RegisterFormType
    >(AuthApiEndpoints.register(data), {
      t,
      setError: form.setError,
      setLoading: setIsSubmitting,
      showErrorToast: true,
      onSuccess: (res) => {
        console.log("✅ Registration successful:", res);

        const userData = res?.data;
        const token = res?.meta?.token;

        if (userData && token) {
          setUser(userData, token);

          const successMessage = res?.message || t("auth.registerSuccess");
          toast.success(successMessage);

          form.reset();

          if (typeof onSuccess === "function") {
            onSuccess();
          } else {
            router.push("/");
          }
        } else {
          console.error("⚠️ Missing user or token in response:", res);
          toast.error(t("auth.registerFailed"));
        }
      },
    });

    if (!response.success && !response.data) {
      console.log("❌ Registration failed:", response.message);
    }
  };

  return (
    <Animate
      variants={fade}
      className="flex items-center justify-center lg:bg-transparent"
    >
      <div className="bg-black/80 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-white text-2xl font-semibold">
          <Translate text="auth.title" />
        </h2>
        <p className="text-neutral-500 text-sm font-semibold mb-6">
          <Translate text="auth.createNewAccount" />
        </p>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <CustomField name="name" label={t("auth.name")} icon={<User />}>
              {(field) => (
                <Input placeholder={t("auth.namePlaceholder")} {...field} />
              )}
            </CustomField>

            {/* Email */}
            <CustomField name="email" label={t("auth.email")} icon={<Email />}>
              {(field) => (
                <Input placeholder={t("auth.emailPlaceholder")} {...field} />
              )}
            </CustomField>

            {/* Phone */}
            <CustomField
              name="phone_number"
              label={t("auth.phone")}
              icon={<Phone />}
            >
              {(field) => (
                <Input placeholder={t("auth.phonePlaceholder")} {...field} />
              )}
            </CustomField>

            {/* Password */}
            <CustomFormPassword
              name="password"
              label={t("auth.password")}
              icon={<Lock />}
              placeholder={t("auth.passwordPlaceholder")}
            />

            {/* Password Confirmation */}
            <CustomFormPassword
              name="password_confirmation"
              label={t("auth.passwordConfirm")}
              icon={<Lock />}
              placeholder={t("auth.passwordConfirmPlaceholder")}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 text-base font-semibold bg-white text-neutral-800 rounded-2xl mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Translate text="auth.signingUp" />
              ) : (
                <Translate text="auth.signUp" />
              )}
            </Button>

            {/* OR Divider */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  "h-px from-transparent to-neutral-800 flex-1",
                  isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r"
                )}
              />
              <span className="text-neutral-400 text-sm">
                <Translate text="auth.or" />
              </span>
              <div
                className={cn(
                  "h-px from-transparent to-neutral-800 flex-1",
                  isRTL ? "bg-gradient-to-r" : "bg-gradient-to-l"
                )}
              />
            </div>

            {/* Google Sign Up */}
            <Button
              type="button"
              variant="outline"
              className="w-fit bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800 hover:text-neutral-200 py-6 rounded-2xl mx-auto flex gap-5 pe-7 cursor-pointer"
            >
              <FcGoogle />
              <span className="text-xs">
                <Translate text="auth.google" />
              </span>
            </Button>

            {/* Already have account */}
            <p className="text-neutral-400 text-sm text-center mt-6">
              <Translate text="auth.haveAccount" />{" "}
              {onSwitchToLogin ? (
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-white font-medium hover:underline"
                >
                  <Translate text="auth.signIn" />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-white font-medium hover:underline"
                >
                  <Translate text="auth.signIn" />
                </Link>
              )}
            </p>
          </form>
        </FormProvider>
      </div>
    </Animate>
  );
}

export default RegisterForm;
