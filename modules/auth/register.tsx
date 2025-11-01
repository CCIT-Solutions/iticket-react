"use client";
import Image from "next/image";
import Logo from "@/components/shared/Logo";
import Translate from "@/components/shared/Translate";
import Container from "@/components/shared/Container";
import RegisterForm from "@/components/auth/RegisterForm";
import Animate from "@/components/shared/Animate";
import { fade } from "@/lib/animation";
import { AuthGuard } from "@/components/shared/AuthGaurd";


const RegisterPage: React.FC = () => {
  return (
    <AuthGuard requireGuest redirectTo="/">
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
            <div className="text-white max-w-md">
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
    </AuthGuard>
  );
};

export default RegisterPage;