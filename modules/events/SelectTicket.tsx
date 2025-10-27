"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import MainBreadcrumb from "@/components/shared/MainBreadcrumb";
import Container from "@/components/shared/Container";
import { useParams } from "next/navigation";
import { events } from "@/data/events";
import { useLang } from "@/hooks/useLang";
import Translate from "@/components/shared/Translate";
import TimePause from "@/components/icons/TimePause";
import Image from "next/image";
import Location from "@/components/icons/Location";
import Animate from "@/components/shared/Animate";
import { fade, fadeDu1 } from "@/lib/animation";
import Link from "next/link";

export default function SelectTicket() {
  const params = useParams();
  const eventId = params.id;
  const { t, lang } = useLang();

  const event = events.find((e) => e.id === Number(eventId));

  const [tickets, setTickets] = useState([
    {
      id: 1,
      date: "Mar 29 - GA",
      name: "Ladies Standard (Ground)",
      price: 450,
      count: 0,
      soldOut: false,
    },
    {
      id: 2,
      date: "Mar 29 - GA",
      name: "Ladies Standard (Ground)",
      price: 450,
      count: 0,
      soldOut: false,
    },
    {
      id: 3,
      date: "Mar 30 - GA",
      name: "Ladies Standard (Ground)",
      price: 450,
      count: 0,
      soldOut: false,
    },
    {
      id: 4,
      date: "Mar 30 - GA",
      name: "Ladies Standard (Ground)",
      price: 450,
      count: 0,
      soldOut: true,
    },
  ]);

  const maxTickets = 10;
  const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.count, 0);
  const totalPrice = tickets.reduce(
    (sum, ticket) => sum + ticket.price * ticket.count,
    0
  );

  const handleIncrement = (id: number) => {
    if (totalTickets < maxTickets) {
      setTickets(
        tickets.map((ticket) =>
          ticket.id === id ? { ...ticket, count: ticket.count + 1 } : ticket
        )
      );
    }
  };

  const handleDecrement = (id: number) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id && ticket.count > 0
          ? { ...ticket, count: ticket.count - 1 }
          : ticket
      )
    );
  };

  return (
    <Container className="min-h-screen text-white pt-10">
      {/* Header with breadcrumb */}
      <MainBreadcrumb
        page={t("selectTicket.title")}
        between={[
          { title: `${event?.title[lang]}`, link: `/events/${event?.id}` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Left Column - Ticket Selection */}
        <div className="lg:order-1 order-2 flex justify-center lg:justify-start w-full">
          <div className="max-w-lg w-full">
            <Animate variants={fade}>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-2">
                  <Translate text="selectTicket.header" />
                </h1>
                <div className="flex items-center gap-1 bg-neutral-900 rounded-lg py-2 px-4">
                  <TimePause className="size-5" />
                  <span>12:12</span>
                </div>
              </div>
              <p className="text-neutral-400 text-sm">
                (<Translate text="selectTicket.maxTickets" /> {maxTickets})
              </p>
            </Animate>

            <Animate variants={fade}>
              {tickets.map((ticket, index) => (
                <div key={ticket.id}>
                  {(index === 0 || tickets[index - 1].date !== ticket.date) && (
                    <div className="text-lg font-semibold mt-8 mb-4">
                      {ticket.date}
                    </div>
                  )}

                  <div className="border border-neutral-800 rounded-xl p-5 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-base mb-1">{ticket.name}</div>
                        <div className="text-xl font-bold text-primary">
                          {ticket.price} {t("eventDetails.currency")}
                        </div>
                      </div>

                      {ticket.soldOut ? (
                        <div className="bg-neutral-900 text-neutral-200 px-6 py-2 rounded-lg text-sm font-medium">
                          <Translate text="selectTicket.soldOut" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-0 rounded-lg sm:px-2 py-1.5">
                          <button
                            onClick={() => handleDecrement(ticket.id)}
                            className="p-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {ticket.count}
                          </span>
                          <button
                            onClick={() => handleIncrement(ticket.id)}
                            className="p-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Animate>
          </div>
        </div>

        {/* Right Column - Event Card */}
        <Animate
          variants={fadeDu1}
          className="flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="bg-neutral-900 rounded-2xl overflow-hidden max-w-lg h-fit">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 p-6 items-center w-full">
              <div className="relative w-full sm:w-fit">
                <div className="relative w-full sm:w-48 h-48 sm:h-40 overflow-hidden rounded-xl">
                  <Image
                    src={`/media/images/event-details/hero.jpg`}
                    alt={`${event?.title[lang]}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl mb-1">
                  {t("selectTicket.eventTitle")}
                </h2>
                <div className="space-y-2">
                  <div className="text-primary font-medium">
                    {t("selectTicket.eventDate")}
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Location className="size-5" />
                    <span>{t("selectTicket.eventLocation")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8">
              <div className="relative w-full h-[1px] overflow-hidden rounded-xl">
                <Image
                  src={`/media/images/event-details/separator.png`}
                  alt={`Separator`}
                  fill
                  priority
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between py-6 sm:py-5 pt-3">
                <div className={"flex flex-col gap-1 items-center"}>
                  <div className="text-neutral-400">
                    <Translate text="eventDetails.priceFrom" />
                  </div>
                  <div className="text-2xl font-bold mb-2 text-primary">
                    {totalPrice || 450} {t("eventDetails.currency")}
                  </div>
                </div>
                <Link
                  href={`/events/${event?.id}/checkout`}
                  className="flex bg-neutral-200 hover:bg-white hover:text-black text-black transition-all py-3 justify-center rounded-2xl min-w-48 cursor-pointer font-semibold tracking-widest w-full sm:w-auto"
                >
                  <Translate text="selectTicket.checkout" />
                </Link>
              </div>
            </div>
          </div>
        </Animate>
      </div>
    </Container>
  );
}
