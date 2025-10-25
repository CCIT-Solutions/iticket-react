"use client";

import Android from "@/components/icons/Android";
import Apple from "@/components/icons/Apple";
import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import Translate from "@/components/shared/Translate";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";
import Animate from "@/components/shared/Animate";
import { fade, fadeD1, fadeDu1 } from "@/lib/animation";

export default function CTASection() {
  const { isRTL } = useLang();
  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(to_bottom,_#C8FFA7_5%,_#8EF251_50%,_#50D400_100%)] grid grid-cols-1 md:grid-cols-2 gap-1 h-auto md:h-[220px] lg:h-[280px]">
          {/* Text Content */}
          <div
            className={cn(
              "flex flex-col gap-4 lg:gap-10 text-center md:text-start px-4 md:px-6  py-10",
              isRTL ? "lg:pr-20 md:pl-0" : "lg:pl-20 md:pr-0"
            )}
          >
            <Animate
              element="h2"
              variants={fade}
              className="text-2xl lg:text-4xl font-medium text-black"
            >
              <span className="font-black">
                <Translate text="cta.title.appName" />
              </span>{" "}
              <span>
                <Translate text="cta.title.availableFor" />
              </span>
              <br />
              <span className="block mt-3">
                <Translate text="cta.title.platforms" />
              </span>
            </Animate>

            <Animate
              variants={fadeD1}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4"
            >
              {/* App Store Button */}
              <Link
                href="#"
                className="flex items-center gap-3 bg-black text-white px-5 lg:px-6 py-3 rounded-xl hover:opacity-90 transition-opacity min-w-36"
                aria-label="Download on App Store"
              >
                <Apple className="text-2xl" />
                <div
                  className={cn(
                    "flex flex-col leading-tight",
                    isRTL ? "" : "font-poppins"
                  )}
                >
                  <span className="text-[10px] font-light">
                    <Translate text="cta.availableOn" />
                  </span>
                  <span className="text-sm md:text-base font-semibold">
                    <Translate text="cta.appStore" />
                  </span>
                </div>
              </Link>

              {/* Play Store Button */}
              <Link
                href="#"
                className="flex items-center gap-3 bg-black text-white px-5 lg:px-6 py-3 rounded-xl hover:opacity-90 transition-opacity min-w-36"
                aria-label="Download on Play Store"
              >
                <Android />
                <div
                  className={cn(
                    "flex flex-col leading-tight  ",
                    isRTL ? "" : "font-poppins"
                  )}
                >
                  <span className="text-[10px] font-light">
                    <Translate text="cta.availableOn" />
                  </span>
                  <span className="text-sm md:text-base font-semibold">
                    <Translate text="cta.playStore" />
                  </span>
                </div>
              </Link>
            </Animate>
          </div>

          {/* Phone Group Image */}
          <Animate
            variants={fade}
            className="relative w-full h-[220px] lg:h-[280px]"
          >
            <Image
              src="/media/images/cta-phones.png"
              alt="ITicket App Mockups"
              fill
              className="w-full h-auto object-cover object-left"
              priority
            />
            <div className="absolute top-0 left-0 right-0 h-1/2 md:hidden bg-gradient-to-b from-[#8EF251] to-transparent pointer-events-none" />
          </Animate>
        </div>
      </Container>
    </section>
  );
}
