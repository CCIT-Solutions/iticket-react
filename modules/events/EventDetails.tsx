"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Container from "@/components/shared/Container";
import Image from "next/image";
import { useParams } from "next/navigation";
import { events } from "@/data/events";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";
import { heroEvents } from "@/data/heroEvents";
import Calendar from "@/components/icons/Calendar";
import Location from "@/components/icons/Location";
import Clock from "@/components/icons/Clock";
import { Separator } from "@/components/ui/separator";
import Message from "@/components/icons/Message";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import RelatedEvents from "@/components/events/RelatedEvents";
import GetTicketCard from "@/components/events/GetTicketCard";
import MainBreadcrumb from "@/components/shared/MainBreadcrumb";
import Animate from "@/components/shared/Animate";
import { fade, fadeDu1 } from "@/lib/animation";

export default function EventDetailsPage() {
  const params = useParams();
  const { lang, isRTL, t } = useLang();
  const event = events.find((ev) => ev.id === Number(params?.id));

  const hero = heroEvents[0];
  const artist = hero.artist[lang];
  const eventTitle = hero.event[lang];
  const eventType = hero.type[lang];
  const eventLocation = hero.location[lang];
  const eventDate = hero.date[lang];
  const openGate = hero.openGate[lang];

  return (
    <div className="min-h-screen text-white pt-24">
      <div className="relative pt-6 sm:pt-10">
        <Animate variants={fadeDu1}>
          {/* Background images */}
          <div
            className={cn(
              "absolute top-0 -z-10 w-[38%] h-[500px]",
              isRTL ? "start-0" : "end-0"
            )}
          >
            <Image
              src="/media/images/event-details/bg-1.png"
              alt="Event Hero right"
              fill
              priority
              className={cn("object-cover", isRTL ? "scale-x-[-1]" : "")}
            />
          </div>
          <div
            className={cn(
              "absolute top-0 -z-10 w-[38%] h-[400px]",
              isRTL ? "end-0" : "start-0"
            )}
          >
            <Image
              src="/media/images/event-details/bg-2.png"
              alt="Event Hero left"
              fill
              priority
              className={cn("object-cover", isRTL ? "scale-x-[-1]" : "")}
            />
          </div>
        </Animate>
        <Container>
          {/* Breadcrumb */}
          <MainBreadcrumb page={event?.title[lang]} />

          <main className="pt-6 sm:py-8">
            {/* Hero */}
            <Animate variants={fade}>
              <div className="relative rounded-2xl overflow-hidden mb-2 sm:mb-8 h-96">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <div className="relative h-92 overflow-hidden rounded-xl">
                  <Image
                    src={`/media/images/event-details/hero.jpg`}
                    alt={`${event?.title[lang]}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 z-20 w-full h-full">
                  <div
                    className={cn(
                      "flex items-start justify-end sm:justify-between mb-8 h-full"
                    )}
                  >
                    <div
                      className={cn(
                        "py-5 basis-auto flex flex-col justify-center h-full absolute inset-0 z-10 sm:static",
                        isRTL
                          ? "text-right pr-6 sm:pr-16"
                          : "text-left pl-6 sm:pl-16"
                      )}
                    >
                      <h1
                        className={cn(
                          "text-white font-black tracking-wide mb-2 max-w-sm",
                          eventTitle?.length > 12
                            ? "text-[8vw] sm:text-2xl lg:text-5xl"
                            : eventTitle?.length > 8
                            ? "text-[10vw] sm:text-4xl lg:text-6xl"
                            : "text-[15vw] sm:text-6xl lg:md:text-8xl"
                        )}
                      >
                        {eventTitle}
                      </h1>
                      <p className="text-primary text-[10vw] sm:text-2xl lg:text-4xl font-medium tracking-wide mt-3">
                        {eventType}
                      </p>
                      <p className="text-[6vw] sm:text-[23px] mt-1">
                        {t("eventDetails.onTour")}
                      </p>

                      <div className="flex-col items-start pt-6 hidden md:flex lg:hidden">
                        <div className="uppercase">
                          <p className="mb-1">{t("eventDetails.openGate")}</p>
                          <p className="text-primary text-2xl">{openGate}</p>
                        </div>
                        <div>
                          <p className="text-2xl mt-2 uppercase">
                            {eventLocation.toUpperCase()}
                          </p>
                          <p className="text-primary text-xl mt-2">
                            {eventDate}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "flex-col items-end p-8 basis-[40%] hidden lg:flex h-full justify-center",
                        isRTL ? "text-left" : "text-right"
                      )}
                    >
                      <div className="uppercase">
                        <p className="mb-1">{t("eventDetails.openGate")}</p>
                        <p className="text-primary text-2xl">{openGate}</p>
                      </div>
                      <div>
                        <p className="text-2xl mt-10 uppercase">
                          {eventLocation.toUpperCase()}
                        </p>
                        <p className="text-primary text-xl mt-2">{eventDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Animate>
            {/* Event Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Animate variants={fade} className="space-y-8">
                {/* Title and Meta */}
                <div>
                  <h2 className="text-3xl font-bold mb-2 leading-12">
                    Unstable Live Night with Ghostly Kisses
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-primary text-lg">
                    <div className="flex items-center gap-2">
                      <Calendar />
                      <span>Dec 24 - Dec 28</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock />
                      <span>9:30 PM - 3:00 AM</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-neutral-500">
                    {t("eventDetails.lastEntry")}
                  </span>
                  <span>09:00 PM</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400 mt-4">
                  <Location />
                  <span>Riyadh</span>
                </div>

                <Separator className="bg-neutral-800 max-w-md my-4" />

                {/* About */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("eventDetails.about")}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim aliquip ex ea commodo consequat. Duis aute
                    deserunt mollit anim id est laborum.
                  </p>
                </div>

                {/* Music Info */}
                <div className="mt-6 space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("eventDetails.musicInfo")}
                  </h3>
                  <div className="space-y-2 text-gray-400 px-2 text-sm">
                    <p>
                      <span className="me-1">•</span>We're celebrating our
                      edition of the California.
                    </p>
                    <p>
                      <span className="me-1">•</span>We're celebrating our
                      edition of the California.
                    </p>
                    <p>
                      <span className="me-1">•</span>We're celebrating our
                      edition of the California.
                    </p>
                    <p>
                      <span className="me-1">•</span>We're celebrating our
                      edition of the California.
                    </p>
                  </div>
                </div>

                {/* Dress Code */}
                <div className="mt-6 space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("eventDetails.dressCode")}
                  </h3>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim aliquip ex ea commodo consequat. Duis aute
                    deserunt mollit anim id est laborum.
                  </p>
                </div>

                {/* Rules */}
                <div className="mt-6 space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("eventDetails.rules")}
                  </h3>
                  <div className="space-y-2 text-gray-400">
                    <p>
                      <span className="me-1">•</span> We're celebrating our
                      edition of the California.
                    </p>
                    <p>
                      <span className="me-1">•</span> We're celebrating our
                      edition of the California.
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="mt-6 space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("eventDetails.location")}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400 mt-4">
                    <Location />
                    <span>Al Dariyah Al Jadidah, Riyadh, 13732, KSA</span>
                  </div>
                </div>

                {/* Direction */}
                <div className="mt-2">
                  <a
                    href="https://www.google.com/maps/"
                    target="_blank"
                    className="underline"
                  >
                    {t("eventDetails.getDirections")}
                  </a>
                </div>

                {/* Contact */}

                <div className="mt-8 bg-neutral-800 p-4 rounded-2xl flex justify-between text-neutral-200 cursor-pointer">
                  <div className="flex gap-4">
                    <Message />
                    <span>{t("eventDetails.contactUs")}</span>
                  </div>
                  {isRTL ? (
                    <IoIosArrowBack className="size-5 me-2" />
                  ) : (
                    <IoIosArrowForward className="size-5 me-2" />
                  )}
                </div>
              </Animate>

              {/* Sidebar */}
              <GetTicketCard />
            </div>

            <RelatedEvents />
          </main>
        </Container>
      </div>
    </div>
  );
}
