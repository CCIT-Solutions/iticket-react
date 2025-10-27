"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tickets } from "@/data/tickets";
import Image from "next/image";
import Container from "@/components/shared/Container";
import Animate from "@/components/shared/Animate";
import { fade, fadeDu1 } from "@/lib/animation";
import Translate from "@/components/shared/Translate";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";

export default function TicketSuccess() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, isRTL } = useLang();

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === tickets.length - 1 ? prev : prev + 1));
  };

  const getVisibleTickets = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = currentIndex + i;
      if (index < tickets.length) {
        visible.push(tickets[index]);
      }
    }
    return visible;
  };

  return (
    <div className="min-h-screen py-16">
      <Container>
        {/* ✅ Success Icon and Title */}
        <Animate variants={fade} viewOnce className="flex flex-col items-center mb-16">
          <div className="size-20 bg-[#22C55E] rounded-full flex items-center justify-center mb-6 relative">
            <Image
              src="/media/icons/success.png"
              alt={t("ticketSuccess.successIconAlt")}
              fill
              priority
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            <Translate text="ticketSuccess.bookingComplete" />
          </h1>
        </Animate>

        {/* ✅ Tickets Section */}
        <div className="mb-12">
          <Animate variants={fade} className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-neutral-300">
              <Translate text="ticketSuccess.yourTickets" />
            </h2>
            <div className="flex items-center gap-5">
              <button
                onClick={handlePrevious}
                className="w-9 h-9 bg-neutral-900 hover:bg-neutral-800 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className= {cn("w-5 h-5", isRTL ? "rotate-y-180" : "")} />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 bg-primary/80 hover:bg-primary text-black rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className= {cn("w-5 h-5", isRTL ? "rotate-y-180" : "")} />
              </button>
            </div>
          </Animate>

          {/* ✅ Tickets Grid */}
          <Animate variants={fadeDu1} className="flex gap-6 flex-wrap justify-center">
            {getVisibleTickets().map((ticket) => (
              <div
                key={ticket.id}
                className="relative overflow-hidden rounded-4xl bg-neutral-900 w-[266px]"
              >
                {/* Background Image */}
                <div className="absolute inset-5 z-0 h-110 w-[calc(100%-40px)] ">
                  <Image
                    src="/media/images/success-ticket-bg.png"
                    alt={t("ticketSuccess.ticketBackgroundAlt")}
                    fill
                    className="object-fill rounded-3xl"
                    priority
                  />
                </div>

                {/* Ticket Content */}
                <div className="relative z-10 p-10 pb-9 text-white">
                  {/* VIP Badge */}
                  <div className="inline-block bg-neutral-800/70 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    {ticket.type}
                  </div>

                  {/* Event Name */}
                  <h3 className="text-sm font-bold mb-1 leading-tight">
                    {ticket.eventName}
                  </h3>
                  <p className="text-sm mb-4">{ticket.eventSubtitle}</p>

                  {/* Event Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">
                          <Translate text="ticketSuccess.date" />
                        </div>
                        <div className="text-sm font-medium">{ticket.date}</div>
                      </div>

                      <div>
                        <div className="text-xs text-neutral-400 mb-1">
                          <Translate text="ticketSuccess.time" />
                        </div>
                        <div className="text-sm font-medium">{ticket.time}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">
                          <Translate text="ticketSuccess.deadline" />
                        </div>
                        <div className="text-sm font-medium">
                          {ticket.deadlineTime}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-neutral-400 mb-1">
                          <Translate text="ticketSuccess.seat" />
                        </div>
                        <div className="text-sm font-medium">{ticket.seat}</div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="rounded-xl px-4 flex items-center justify-center">
                    <div className="relative size-46">
                      <Image
                        src={ticket.qrCode}
                        alt={t("ticketSuccess.qrCodeAlt")}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="px-5 pb-5">
                  <button className="w-full bg-white hover:bg-neutral-100 text-black font-semibold py-3 rounded-xl transition-colors cursor-pointer">
                    <Translate text="ticketSuccess.downloadTicket" />
                  </button>
                </div>
              </div>
            ))}
          </Animate>
        </div>

        {/* ✅ Discover More Events Button */}
        <Animate variants={fadeDu1} className="flex justify-center">
          <button className="bg-transparent hover:bg-neutral-900 border-2 border-white text-white font-semibold px-12 py-4 rounded-xl transition-colors cursor-pointer">
            <Translate text="ticketSuccess.discoverMore" />
          </button>
        </Animate>
      </Container>
    </div>
  );
}
