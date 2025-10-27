"use client";
import React, { useState } from "react";
import { Info, Clock } from "lucide-react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import PromoCode from "@/components/icons/PromoCode";
import DangerTriangle from "@/components/icons/DangerTriangle";
import { LiaTimesSolid } from "react-icons/lia";
import { Checkbox } from "@/components/ui/checkbox";
import Container from "@/components/shared/Container";
import Location from "@/components/icons/Location";
import Ticket from "@/components/icons/Ticket";
import MainBreadcrumb from "@/components/shared/MainBreadcrumb";
import { useParams } from "next/navigation";
import { useLang } from "@/hooks/useLang";
import { events } from "@/data/events";
import Translate from "@/components/shared/Translate";
import Animate from "@/components/shared/Animate";
import { fade, fadeDu1 } from "@/lib/animation";

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("apple-pay");
  const [promoCode, setPromoCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showError, setShowError] = useState(true);

  const params = useParams();
  const eventId = params.id;
  const { t, lang, isRTL } = useLang();

  const event = events.find((e) => e.id === Number(eventId));

  const subtotal = 450;
  const fees = 50;
  const total = subtotal + fees;

  return (
    <div className="min-h-screen bg-black text-white">
      <Container>
        <div className="flex items-center gap-2 text-sm text-neutral-400 my-6">
          <MainBreadcrumb
            page={t("nav.checkout")}
            between={[
              { title: `${event?.title[lang]}`, link: `/events/${event?.id}` },
              {
                title: t("nav.selectTicket"),
                link: `/events/${event?.id}/tickets`,
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-5">
          {/* Left Column */}
          <div className="order-2 lg:order-1 flex h-fit justify-center lg:justify-start w-full">
            <div className="max-w-lg">
              {showError && (
                <Animate
                  variants={fade}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-red-400 rounded-full p-1.5">
                      <DangerTriangle />
                    </div>
                    <span className="text-red-400 font-medium">
                      <Translate text="checkout.paymentFailed" />
                    </span>
                  </div>
                  <button
                    onClick={() => setShowError(false)}
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    <LiaTimesSolid />
                  </button>
                </Animate>
              )}
              <Animate variants={fade}>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold">
                    <Translate text="checkout.title" />
                  </h1>
                  <div className="flex items-center gap-2 bg-neutral-900 rounded-lg py-2 px-4">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">12:12</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">
                    <Translate text="checkout.promoCode" />
                  </h2>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <PromoCode className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        placeholder={t("checkout.promoPlaceholder")}
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-900 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700"
                      />
                    </div>
                    <button className="px-8 py-3.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded-xl font-medium transition-colors">
                      <Translate text="checkout.apply" />
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">
                    <Translate text="checkout.selectPayment" />
                  </h2>

                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={setSelectedPayment}
                    className="space-y-3"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <Label
                      htmlFor="credit-card"
                      className={`border rounded-xl p-5 flex items-center justify-between cursor-pointer transition-all h-16 ${
                        selectedPayment === "credit-card"
                          ? "border-primary bg-neutral-900/50"
                          : "border-neutral-900 hover:border-neutral-800 bg-neutral-900/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem id="credit-card" value="credit-card" />
                        <span className="font-medium">
                          <Translate text="checkout.creditCards" />
                        </span>
                      </div>
                      <div className="flex items-center gap-2 relative h-4 w-20">
                        <Image
                          src={"/media/icons/credit-payment.png"}
                          alt="Credit Cards"
                          fill
                        />
                      </div>
                    </Label>

                    <Label
                      htmlFor="apple-pay"
                      className={`border rounded-xl p-5 flex items-center justify-between cursor-pointer transition-all h-16 ${
                        selectedPayment === "apple-pay"
                          ? "border-primary bg-neutral-950"
                          : "border-neutral-900 hover:border-neutral-800 bg-neutral-950"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem id="apple-pay" value="apple-pay" />
                        <span className="font-medium">
                          <Translate text="checkout.applePay" />
                        </span>
                      </div>
                      <div className="flex items-center gap-2 relative h-5 w-10">
                        <Image
                          src={"/media/icons/apple-pay.png"}
                          alt="Apple Pay"
                          fill
                        />
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                {/* Terms */}
                <div className="mb-8">
                  <label className="flex items-start gap-3 cursor-pointer bg-neutral-950 rounded-lg p-3">
                    <Checkbox
                      checked={agreedToTerms}
                      onCheckedChange={(checked) =>
                        setAgreedToTerms(checked === true)
                      }
                      className="mt-0.5 border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-black data-[state=checked]:border-primary size-6 rounded-sm"
                    />

                    <span className="text-sm text-neutral-400 leading-relaxed">
                      <Translate
                        text="checkout.termsNotice"
                        components={{
                          payNow: (
                            <span className="">"{t("checkout.payNow")}"</span>
                          ),
                          terms: (
                            <a
                              href="/terms"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-white hover:underline"
                            >
                              {t("checkout.terms")}
                            </a>
                          ),
                          privacy: (
                            <a
                              href="/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-white hover:underline"
                            >
                              {t("checkout.privacy")}
                            </a>
                          ),
                          shareInfo: (
                            <a
                              href="/data-sharing"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-white hover:underline"
                            >
                              {t("checkout.infoShare")}
                            </a>
                          ),
                        }}
                      />
                    </span>
                  </label>
                </div>

                <button className="w-full bg-white hover:bg-neutral-100 text-black font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Translate text="checkout.payNow" />
                </button>
              </Animate>
            </div>
          </div>

          {/* Right Column */}
          <Animate
            variants={fadeDu1}
            className="order-1 lg:order-2 flex h-fit justify-center lg:justify-end w-full"
          >
            <div className="bg-neutral-900 rounded-2xl overflow-hidden lg:sticky lg:top-6 w-full max-w-lg">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 lg:items-center">
                <div className="relative w-full sm:w-fit">
                  <div className="relative w-full sm:w-48 h-48 sm:h-40 overflow-hidden rounded-xl">
                    <Image
                      src={`/media/images/event-details/hero.jpg`}
                      alt="Hero"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 leading-tight">
                    Unstable Live Night with Ghostly Kisses
                  </h3>
                  <div className="text-primary font-medium mb-2">
                    Mar 29, 2022 • 10:00 PM
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Location className="size-5" />
                    <span>Riyadh</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-4">
                <div className="relative w-full h-[1px] overflow-hidden rounded-xl">
                  <Image
                    src={`/media/images/event-details/separator.png`}
                    alt="Separator"
                    fill
                    priority
                  />
                </div>
                <h4 className="font-semibold mb-3 mt-5">
                  <Translate text="checkout.tickets" />
                </h4>
                <div className="bg-black/10 rounded-2xl py-4 px-6 flex items-center justify-between border border-neutral-700">
                  <div className="flex items-center gap-3">
                    <Ticket className="text-primary" />
                    <span className="text-neutral-300">
                      Ladies Standard (Ground)
                    </span>
                  </div>
                  <span className="text-neutral-400 text-sm">
                    2 <Translate text="checkout.ticketsCount" />
                  </span>
                </div>
              </div>

              <div className="px-6 pb-6">
                <h4 className="font-semibold mb-4">
                  <Translate text="checkout.summary" />
                </h4>
                <div className="space-y-3 bg-black/10 rounded-2xl py-4 px-6 border border-neutral-700">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>
                      <Translate text="checkout.subtotal" />
                    </span>
                    <span className="text-primary">{subtotal} SAR</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <div className="flex items-center gap-1.5">
                      <span>
                        <Translate text="checkout.fees" />
                      </span>
                      <Info className="w-4 h-4 text-neutral-500" />
                    </div>
                    <span className="text-primary">{fees} SAR</span>
                  </div>

                  <div className="relative w-full h-[1px] rounded-xl mb-3 mt-4">
                    <Image
                      src={`/media/images/event-details/separator.png`}
                      alt="Separator"
                      fill
                      priority
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      <Translate text="checkout.total" />
                    </span>
                    <span className="text-2xl text-primary">{total} SAR</span>
                  </div>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </Container>
    </div>
  );
}
