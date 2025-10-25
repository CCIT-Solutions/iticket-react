"use client";

import Image from "next/image";
import { heroEvents } from "@/data/heroEvents";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/shared/Container";
import { useLang } from "@/hooks/useLang";
import Animate from "@/components/shared/Animate";
import { fadeD1, fadeDu1, fadeDu3 } from "@/lib/animation";

const EventSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { isRTL, lang } = useLang();

  return (
    <Animate
      variants={fadeD1} viewOnce className="my-8 relative">
      <Container>
        <Swiper
          key={isRTL ? "rtl" : "ltr"}
          modules={[Autoplay, Pagination, A11y, Keyboard]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          keyboard={{ enabled: true }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass: "custom-bullet-active",
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 12 },
            768: { slidesPerView: 1, spaceBetween: 16 },
            1024: { slidesPerView: 1, spaceBetween: 20 },
          }}
          className="event-swiper rounded-xl overflow-hidden"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {heroEvents.map((event, index) => {
            const artist = event.artist[lang];
            const eventTitle = event.event[lang];
            const eventType = event.type[lang];
            const eventLocation = event.location[lang];
            const eventDate = event.date[lang];
            const openGate = event.openGate[lang];

            return (
              <SwiperSlide key={index}>
                <div className="relative rounded-3xl overflow-hidden transition-all duration-500 h-96">
                  {/* Background Image */}
                  <div className="absolute inset-0 -z-10 w-full h-full">
                    <Image
                      src="/media/images/hero/hero-event-bg.png"
                      alt="Hero Event Background"
                      fill
                      className="opacity-80 object-cover object-top"
                      priority
                    />
                  </div>

                  {/* Bottom pattern */}
                  <div
                    className={cn(
                      "absolute bottom-[2px] -z-10 w-11 h-50 hidden sm:block",
                      isRTL ? "right-0" : "left-0"
                    )}
                  >
                    <Image
                      src="/media/images/hero/hero-event-bottom.png"
                      alt="Hero Event bottom"
                      fill
                      priority
                      className={cn(isRTL ? "rotate-y-180" : "")}
                    />
                  </div>

                  {/* Top pattern */}
                  <div
                    className={cn(
                      "absolute top-0 -z-10 w-10 h-45",
                      isRTL ? "left-0" : "right-0"
                    )}
                  >
                    <Image
                      src="/media/images/hero/hero-event-top.png"
                      alt="Hero Event top"
                      fill
                      priority
                      className={cn(isRTL ? "rotate-y-180" : "")}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full">
                    <div
                      className={cn(
                        "flex items-start justify-end sm:justify-between mb-8 h-full"
                      )}
                    >
                      <div
                        className={cn(
                          "py-5 basis-auto min-w-fit sm:min-w-auto lg:basis-[40%] uppercase flex flex-col justify-end sm:justify-center h-full absolute inset-0 z-10 sm:static",
                          isRTL
                            ? "text-right pr-6 sm:pr-16 xl:pr-30 xl:pl-0"
                            : "text-left pl-6 sm:pl-16 xl:pl-30 xl:pr-0"
                        )}
                      >
                        <h3 className="text-primary text-[6vw] sm:text-3xl tracking-wider mb-2">
                          {artist}
                        </h3>
                        <h1
                          className={cn(
                            "text-white font-black tracking-wide mb-2 max-w-sm",
                            eventTitle?.length > 12
                              ? "text-[5vw] sm:text-2xl lg:text-5xl"
                              : eventTitle?.length > 8
                              ? "text-[6vw] sm:text-4xl lg:text-6xl"
                              : "text-[8vw] sm:text-6xl lg:md:text-8xl"
                          )}
                        >
                          {eventTitle}
                        </h1>
                        <p className="text-primary text-[5vw] sm:text-2xl lg:text-4xl font-medium tracking-wide mt-3">
                          {eventType}
                        </p>
                        <p className="text-[4vw] lg:text-[23px] mt-1">
                          {lang === "ar" ? "جولة عالمية" : "ON WORLD TOUR"}
                        </p>

                        {/* Small screen info */}
                        <div
                          className={cn(
                            "flex-col items-start pt-6 hidden md:flex lg:hidden"
                          )}
                        >
                          <div
                            className={cn(
                              "uppercase",
                              isRTL ? "text-right" : "text-left"
                            )}
                          >
                            <p className="mb-1">
                              {lang === "ar" ? "فتح الأبواب" : "OPEN GATE"}
                            </p>
                            <p className="text-primary text-2xl">{openGate}</p>
                          </div>
                          <div
                            className={cn(isRTL ? "text-right" : "text-left")}
                          >
                            <p className="text-2xl mt-2 uppercase">
                              {eventLocation.toUpperCase()}
                            </p>
                            <p className="text-primary text-xl mt-2">
                              {eventDate}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Artist image */}
                      <div className="lg:basis-[20%] h-full flex items-end shrink sm:shrink-0 sm:flex-1 justify-center">
                        <div className="relative self-end w-[300px] h-[370px]">
                          <Image
                            src={`/media/images/hero/${event.image}.png`}
                            alt="Hero Event Star"
                            fill
                            priority
                            className={cn(isRTL ? "scale-x-[-1]" : "")}
                          />
                        </div>
                      </div>

                      {/* Large screen info */}
                      <div
                        className={cn(
                          "flex-col items-end p-8 md:py-16 basis-[40%] hidden lg:flex",
                          isRTL ? "text-left pr-0 pl-30" : "text-right pr-30 pl-0"
                        )}
                      >
                        <div className="uppercase">
                          <p className="mb-1">
                            {lang === "ar" ? "فتح الأبواب" : "OPEN GATE"}
                          </p>
                          <p className="text-primary text-2xl">{openGate}</p>
                        </div>
                        <div>
                          <p className="text-2xl mt-10 uppercase">
                            {eventLocation.toUpperCase()}
                          </p>
                          <p className="text-primary text-xl mt-2">
                            {eventDate}
                          </p>
                        </div>
                        <div className="mt-8">
                          <div className="px-4 py-2 rounded-2xl bg-white/5">
                            <div className="relative w-[260px] h-[50px] self-end">
                              <Image
                                src={`/media/images/hero/${event.barcode}.png`}
                                alt="Hero Event barcode"
                                fill
                                priority
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>

      {/* Decorative side images */}
      <Animate
      viewOnce
      variants={fadeDu3}>

      
      <div
        className={cn(
          "absolute top-[12.5%] -z-10 w-[300px] h-[75%] hidden md:block",
          isRTL ? "start-0" : "end-0"
        )}
      >
        <Image
          src="/media/images/hero/hero-right.png"
          alt="Hero Event right"
          fill
          priority
          className={cn("object-cover", isRTL ? "scale-x-[-1]" : "")}
        />
      </div>
      <div
        className={cn(
          "absolute top-[20%] -z-10 w-[300px] h-[60%] hidden md:block",
          isRTL ? "end-0" : "start-0"
        )}
      >
        <Image
          src="/media/images/hero/hero-left.png"
          alt="Hero Event left"
          fill
          priority
          className={cn("object-cover", isRTL ? "scale-x-[-1]" : "")}
        />
      </div>
      </Animate>
    </Animate>
  );
};

export default EventSlider;
