"use client";
import React from "react";
import { useLang } from "@/hooks/useLang";
import Translate from "@/components/shared/Translate";
import Animate from "@/components/shared/Animate";
import { fadeDu1 } from "@/lib/animation";
import Image from "next/image";
import Ticket from "@/components/icons/Ticket";

function MyTickets() {
  const { t } = useLang();

  const pastEvents = [
    {
      id: 1,
      name: "2000s Hip Hop Night",
      date: "Mar 29, 2022",
      time: "09:00 PM",
      duration: "34 H",
      ticketType: "VIP ticket x1",
    },
    {
      id: 2,
      name: "2000s Hip Hop Night",
      date: "Mar 29, 2022",
      time: "09:00 PM",
      duration: "34 H",
      ticketType: "VIP ticket x1",
    },
  ];

  return (
    <div className="flex flex-col items-center lg:items-start">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        <Translate text="settings.myTickets" />
      </h1>

      {/* Upcoming Events */}
      <div className="flex flex-col items-center lg:items-start mb-10 w-full">
        <h2 className="text-lg tracking-wider uppercase text-neutral-200 mb-6">
          <Translate text="settings.upcomingEvents" />
        </h2>

        <div className="flex items-center justify-center lg:justify-start gap-4 w-full">
          <div className="flex items-center justify-center flex-wrap gap-4">
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl py-8 px-6 text-center w-[80vw] sm:w-94">
              <p className="mb-2 text-[19px]">
                <Translate text="settings.noUpcomingEvents" />
              </p>
              <p className="text-neutral-400 text-sm mb-4 mx-10">
                <Translate text="settings.noUpcomingDescription" />
              </p>
              <button className="bg-white hover:bg-neutral-100 text-black font-semibold px-8 py-3 rounded-xl transition-colors w-full">
                <Translate text="settings.getTickets" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Past Events */}
      <div className="flex flex-col items-center lg:items-start">
        <h2 className="text-lg tracking-wider uppercase text-neutral-200 mb-6">
          <Translate text="settings.pastEvents" />
        </h2>

        <div className="flex flex-wrap gap-[5vw] sm:gap-4 items-center justify-center">
          {pastEvents.map((event) => (
            <Animate
              key={event.id}
              variants={fadeDu1}
              className="rounded-2xl p-[5vw] sm:p-6 flex items-start justify-between relative h-[42.3vw] sm:h-50 w-[80vw] sm:w-94"
            >
              {/* Background */}
              <div className="absolute inset-0 h-[42.3vw] sm:h-50 w-[80vw] sm:w-94 -z-1">
                <Image
                  src="/media/images/my-tickets-bg.png"
                  alt={t("settings.ticketBgAlt")}
                  fill
                  className="object-fill"
                />
              </div>

              {/* Ticket Info */}
              <div className="flex-1">
                <div className="flex w-full justify-between">
                  <div>
                    <h3 className="text-[3.8vw] sm:text-lg font-semibold mb-2 tracking-wider">
                      {event.name}
                    </h3>
                    <div className="text-[3.5vw] sm:text-sm text-primary mb-2">
                      {event.date}
                    </div>
                  </div>
                  <button className="size-[12vw] sm:size-14 bg-primary hover:bg-primary/90 rounded-2xl flex items-center justify-center transition-colors flex-shrink-0 ml-4">
                    <Ticket className="w-5 h-5 text-black" />
                  </button>
                </div>

                <div className="flex w-full py-[8vw] sm:py-11 justify-between">
                  <div className="flex items-center gap-10">
                    <div>
                      <div className="text-neutral-400 mb-1 text-xs">
                        <Translate text="settings.time" />
                      </div>
                      <div className="text-white text-sm">{event.time}</div>
                    </div>
                    <div>
                      <div className="text-neutral-400 mb-1 text-xs">
                        <Translate text="settings.seat" />
                      </div>
                      <div className="text-white text-sm">{event.duration}</div>
                    </div>
                  </div>
                  <div className="mt-[1vw] sm:mt-3 text-sm">
                    <span className="bg-neutral-700 rounded-lg block px-[5vw] sm:px-5 py-[2vw] sm:py-2">{event.ticketType}</span>
                  </div>
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTickets;
