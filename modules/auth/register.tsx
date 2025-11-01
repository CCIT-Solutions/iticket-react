"use client";

import Image from "next/image";
import Logo from "@/components/shared/Logo";
import Translate from "@/components/shared/Translate";
import Container from "@/components/shared/Container";
import RegisterForm from "@/components/auth/RegisterForm";
import Animate from "@/components/shared/Animate";
import { fade } from "@/lib/animation";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterPage: React.FC = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    if (mounted && !isLoading && user?.id) {
      router.replace("/");
    }
  }, [mounted, user, isLoading, router]);


  if (!mounted || isLoading) {
    return null;
  }


  if (user?.id) {
    return null;
  }

  return (
    <div className="relative py-10 min-h-[81vh]">
      <Animate variants={fade} className="h-full w-full absolute inset-0 -z-1">
        <Image
          src="/media/images/auth/auth-bg.jpg"
          alt="Concert Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </Animate>
      <Container className="flex items-center justify-center">
        <Animate
          variants={fade}
          className="relative hidden lg:flex w-1/2 items-center overflow-hidden"
        >
          <div className=" text-white max-w-md">
            <Logo className="w-60 h-30" />
            <h1 className="text-6xl font-bold my-6 leading-[65px]">
              <Translate text="auth.joinUs" />
            </h1>
          </div>
        </Animate>

        <div className="w-full lg:w-1/2">
          <RegisterForm />
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
