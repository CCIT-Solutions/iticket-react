"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import MainBreadcrumb from "@/components/shared/MainBreadcrumb";
import { useLang } from "@/hooks/useLang";
import Translate from "@/components/shared/Translate";
import Animate from "@/components/shared/Animate";
import { fade, fadeDu1 } from "@/lib/animation";
import Image from "next/image";
import Ticket from "@/components/icons/Ticket";

// My Tickets Component
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
      <h1 className="text-3xl font-bold mb-8">My Tickets</h1>

      {/* Upcoming Events */}

      <div className="flex flex-col items-center lg:items-start mb-10 w-full">
        <h2 className="text-lg tracking-wider uppercase text-neutral-200 mb-6">
          UPCOMING EVENTS
        </h2>
        <div className="flex items-center justify-center lg:justify-start gap-4 w-full">
          <div className="flex items-center justify-center flex-wrap gap-4">
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl py-8 px-6 text-center w-[80vw] sm:w-94">
              <p className=" mb-2 text-[19px]">
                You don't have any upcoming events
              </p>
              <p className="text-neutral-400 text-sm mb-4 mx-10">
                When you purchase tickets to events, they appear here.
              </p>
              <button className="bg-white hover:bg-neutral-100 text-black font-semibold px-8 py-3 rounded-xl transition-colors w-full">
                Get Tickets
              </button>
            </div>
            {pastEvents?.length > 1 && (
              <div className="w-[80vw] sm:w-94">
              
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Past Events */}
      <div className="flex flex-col items-center lg:items-start">
        <h2 className="text-lg tracking-wider uppercase text-neutral-200 mb-6">
          PAST EVENTS
        </h2>
        <div className="flex flex-wrap gap-[5vw] sm:gap-4 items-center justify-center">
          {pastEvents.map((event, index) => (
            <Animate
              key={event.id}
              variants={fadeDu1}
              className=" rounded-2xl p-[5vw] sm:p-6 flex items-start justify-between relative h-[42.3vw] sm:h-50 w-[80vw] sm:w-94"
            >
              <div className="absolute inset-0 h-[42.3vw] sm:h-50 w-[80vw] sm:w-94 -z-1">
                <Image
                  src="/media/images/my-tickets-bg.png"
                  alt="My Ticket BG"
                  fill
                  className="object-fill"
                />
              </div>

              <div className="flex-1">
                <div className="flex w-full justify-between">
                  <div>
                    <h3 className="text-[3.8vw] sm:text-lg font-semibold mb-2 tracking-wider">
                      {event.name}
                    </h3>
                    <div className="text-[3.5vw] sm:text-sm text-primary mb-2">{event.date}</div>
                  </div>
                  <button className="size-[12vw] sm:size-14 bg-primary hover:bg-primary/90 rounded-2xl flex items-center justify-center transition-colors flex-shrink-0 ml-4">
                    <Ticket className="w-5 h-5 text-black" />
                  </button>
                </div>
                <div className="flex w-full py-[8vw] sm:py-11 justify-between">
                  <div className="flex items-center gap-10">
                    <div>
                      <div className="text-neutral-400 mb-1 text-xs">Time</div>
                      <div className="text-white text-sm">{event.time}</div>
                    </div>
                    <div>
                      <div className="text-neutral-400 mb-1 text-xs">Seat</div>
                      <div className="text-white text-sm">{event.duration}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="text-neutral-500">Ticket: </span>
                    <span className="text-primary">{event.ticketType}</span>
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
