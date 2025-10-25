"use client";
import { useMemo } from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomField } from "@/components/custom/CustomFormField";
import LoginSchema, {
  createTranslatedSchema,
} from "@/lib/validation/LoginFormSchema";
import { useLang } from "@/hooks/useLang";
import { FcGoogle } from "react-icons/fc";
import Email from "@/components/icons/Email";
import Lock from "@/components/icons/Lock";
import Translate from "@/components/shared/Translate";
import { cn } from "@/lib/utils";
import { CustomFormPassword } from "@/components/custom/CustomFormPassword";
import { fade } from "@/lib/animation";
import Animate from "../shared/Animate";

type LoginFormType = z.infer<typeof LoginSchema>;

function LoginForm({
  onSuccess,
  onSwitchToRegister,
}: {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}) {
  const { t, lang, isRTL } = useLang();

  const schema = useMemo(() => createTranslatedSchema(t), [t, lang]);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    // const res = await login({ payload: data, acceptLanguage: lang });
    // notify({ res, t });
    // if (res.success) form.reset();
    onSuccess && onSuccess();
  };

  return (
    <Animate variants={fade} className="flex items-center justify-center lg:bg-transparent">
      <div className="bg-black/80 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-white text-2xl font-semibold">
          <Translate text="auth.welcomeBack" />
        </h2>
        <p className="text-neutral-500 text-sm font-semibold mb-6">
          <Translate text="auth.signInToAccount" />
        </p>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <CustomField name="email" label={t("auth.email")} icon={<Email />}>
              {(field) => (
                <Input placeholder={t("auth.emailPlaceholder")} {...field} />
              )}
            </CustomField>

            {/* Password */}
            <CustomFormPassword
              name="password"
              label="Password"
              icon={<Lock />}
              placeholder={t("auth.passwordPlaceholder")}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full py-6 text-base font-semibold bg-white text-neutral-800 rounded-2xl mt-4 cursor-pointer"
            >
              {form.formState.isSubmitting ? (
                <Translate text="auth.signingUp" />
              ) : (
                <Translate text="auth.signUp" />
              )}
            </Button>

            {/* OR */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  "h-px  from-transparent to-neutral-800 flex-1",
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
              <Translate text="auth.dontHaveAccount" />{" "}
              {onSwitchToRegister ? (
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-white font-medium hover:underline"
                >
                  <Translate text="auth.register" />
                </button>
              ) : (
                <Link
                  href="/register"
                  className="text-white font-medium hover:underline"
                >
                  <Translate text="auth.register" />
                </Link>
              )}
            </p>
          </form>
        </FormProvider>
      </div>
    </Animate>
  );
}

export default LoginForm;
