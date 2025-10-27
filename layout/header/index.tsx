"use client";
import { memo, useEffect, useState } from "react";
import Logo from "@/components/shared/Logo";
import LangSwitcher from "@/components/shared/LangSwitcher";
import Container from "@/components/shared/Container";
import Animate from "@/components/shared/Animate";
import { fade } from "@/lib/animation";
import { cn } from "@/lib/utils";
import Profile from "@/components/icons/User";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function Header({ className }: { className?: string }) {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.9;
      const shouldStick = window.scrollY >= heroHeight;

      if (shouldStick !== sticky) {
        setSticky(shouldStick);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);

  return (
    <header
      className={cn(
        `z-[100] w-full transition-all duration-300 min-h-20 border-b border-neutral-900
        ${
          sticky
            ? "fixed top-0 left-0 right-0 shadow-sm bg-black/40 backdrop-blur-lg h-20"
            : "absolute top-0 bg-transparent h-24"
        }
      `,
        className
      )}
      style={{
       
        marginBottom: sticky ? "0" : "0",
      }}
    >
      <Container className="h-full">
        <Animate
          variants={fade}
          className="flex justify-between items-center h-full"
        >
          <Logo />
          <div className="flex gap-3 items-center">
            <div className="border rounded-full border-neutral-800 p-[10px] aspect-square">
              <LangSwitcher />
            </div>
            <Separator orientation="vertical" className="!h-6 bg-neutral-900 mx-2"/>
            <Link href={"/login"} className="border rounded-full border-neutral-800 p-[10px] aspect-square" aria-label="Login">
              <Profile className="size-5 cursor-pointer" />
            </Link>
          </div>
        </Animate>
      </Container>

      {sticky && (
        <div
          className="w-full h-24 pointer-events-none"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: -1,
          }}
        />
      )}
    </header>
  );
}

export default memo(Header);
