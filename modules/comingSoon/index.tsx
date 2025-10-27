import Image from "next/image";
import Logo from "@/components/shared/Logo";
import Translate from "@/components/shared/Translate";
import Container from "@/components/shared/Container";
import LoginForm from "@/components/auth/LoginForm";
import { fade } from "@/lib/animation";
import Animate from "@/components/shared/Animate";

function LoginPage() {
  return (
    <div className="relative py-10 min-h-[81vh] h-[81vh]">
      {/* Background section */}
      <Animate variants={fade} className="h-full w-full absolute inset-0 -z-1">
        <Image
          src="/media/images/auth/auth-bg.jpg"
          alt="Concert Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </Animate>
      <Container className="flex h-full">
        <Animate
          variants={fade}
          className="relative flex justify-center overflow-hidden w-full"
        >
          <div className="flex flex-col w-full items-center text-white max-w-md">
            <Logo className="w-80 h-40" />
            <h1 className="text-3xl my-5 leading-[40px] text-center">
              🚀 <Translate text="home.bookingJourney" />
            </h1>
          </div>
        </Animate>
      </Container>
    </div>
  );
}

export default LoginPage;
