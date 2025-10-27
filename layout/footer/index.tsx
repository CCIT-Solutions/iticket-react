"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/shared/Container";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "@/components/shared/Logo";
import Phone from "@/components/icons/Phone";
import Email from "@/components/icons/Email";
import Translate from "@/components/shared/Translate";
import { useLang } from "@/hooks/useLang";
import Animate from "@/components/shared/Animate";
import { fadeDu2 } from "@/lib/animation";
import dynamic from "next/dynamic";
const SparklesCore = dynamic(
  () => import("@/components/ui/sparkles").then((mod) => mod.SparklesCore),
  { ssr: false }
);
export default function Footer({ minimal }: { minimal?: boolean }) {
  const { t } = useLang();
  return (
    <footer className="relative w-full text-neutral-300">
      {/* Background Image */}
      {!minimal && (
        <div
          className="absolute start-0 -z-2  w-full overflow-hidden
          xl:-top-[200px] xl:h-[calc(100%+200px)]
          lg:-top-[150px] lg:h-[calc(100%+150px)]
          md:-top-[100px] md:h-[calc(100%+100px)]
          -bottom-0 h-[calc(500px)]"
        >
          <Image
            src="/media/images/footer-bg.png"
            alt="Footer background"
            fill
             fetchPriority="high"
            className="opacity-20 object-cover object-top"
            priority
          />
        </div>
      )}
      <div
        className="w-full absolute left-0  xl:-top-[200px] 
        xl:h-[calc(100%+200px)]
          lg:-top-[150px] lg:h-[calc(100%+150px)]
          md:-top-[100px] md:h-[calc(100%+100px)] 
          -bottom-0 h-[calc(700px)] 
          -z-2"
      >
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={10}
          className="w-full h-full"
          particleColor="#8ef25150"
        />
      </div>
      <Animate element="footer" variants={fadeDu2} viewOnce>
        <Container>
          {!minimal && (
            <div className="w-full py-10 flex flex-col md:flex-row justify-between gap-10 lg:gap-20">
              {/* Left Section */}
              <div className="flex flex-col max-w-md">
                <Logo className="w-36 h-15" />

                <p className="text-[13px] text-neutral-400 leading-relaxed mt-2">
                  <Translate text="footer.description" />
                </p>

                <div className="space-y-4 text-sm mt-5">
                  <div className="flex items-center gap-3">
                    <div className="size-9 bg-white/5 rounded-full flex justify-center items-center">
                      <Phone />
                    </div>
                    <span className="text-sm" dir="ltr">
                      <Translate text="footer.phoneNumber" />
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="size-9 bg-white/5 rounded-full flex justify-center items-center">
                      <Email />
                    </div>
                    <span className="text-sm" dir="ltr">
                      <Translate text="footer.email" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col max-w-md w-full">
                <h3 className="text-white text-lg tracking-wider">
                  <Translate text="footer.newsletter.title" />{" "}
                  <span className="text-primary">
                    <Translate text="footer.newsletter.highlight" />
                  </span>
                </h3>

                <p className="text-sm text-neutral-400 mt-6">
                  <Translate text="footer.newsletter.text" />
                </p>

                <form className="flex w-full items-center mt-12 gap-3">
                  <input
                    type="email"
                    placeholder={t("footer.newsletter.email")}
                    className="flex-1 bg-white/5 rounded-md text-white text-sm px-4 py-2 outline-none placeholder:text-neutral-500"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-lg mr-1"
                  >
                    <Translate text="footer.newsletter.button" />
                  </button>
                </form>

                <div className="flex items-center gap-4 pt-5">
                  <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-colors cursor-pointer">
                    <FaFacebookF className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-colors cursor-pointer">
                    <FaXTwitter className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-colors cursor-pointer">
                    <FaInstagram className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white py-5 text-center border-t border-white/8">
            <span>
              <Translate text="footer.copyright" />
            </span>
            <div className="flex gap-5 sm:gap-20 text-white">
              <Link href="/contact" className="hover:text-white">
                <Translate text="footer.links.contact" />
              </Link>
              <Link href="/privacy" className="hover:text-white">
                <Translate text="footer.links.privacy" />
              </Link>
              <Link href="/terms" className="hover:text-white">
                <Translate text="footer.links.terms" />
              </Link>
            </div>
          </div>
        </Container>
      </Animate>
    </footer>
  );
}
