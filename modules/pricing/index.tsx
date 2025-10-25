"use client"
import React from "react";
import { Check } from "lucide-react";
import Container from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { pricingPlans } from "@/data/pricingPlans";
import Translate from "@/components/shared/Translate";
import CurrencyDisplay from "@/components/shared/CurrencyDisplay";
import Animate from "@/components/shared/Animate";
import { fade, fadeD1NoTransition } from "@/lib/animation";
import { useLang } from "@/hooks/useLang";

function Pricing() {
  const {lang} = useLang()
  return (
    <section className="py-16 bg-neutral-100  flex justify-center pt-40">
      <Container>
        <div className="mb-16">
          <h2 className="text-4xl font-semibold text-neutral-800 mb-4 text-center md:text-start">
            <Translate text="pricing.title" />
          </h2>
        </div>

        <div className="flex flex-wrap justify-center mx-auto gap-8">
          {pricingPlans.map((plan, index) => (
            <Animate variants={fade} key={index}
              className={`rounded-2xl shadow-lg overflow-hidden md:min-w-[350px] max-w-[350px] max-h-fit py-8 min-h-[700px] ${
                plan.isPopular ? "bg-primary text-white" : " bg-white"
              }`}>

            
            
              {/* Plan Header */}
              <div
                className={`px-6 py-8 ${
                  plan.isPopular ? "text-white" : "text-neutral-900"
                }`}
              >
                <h3 className="text-xl font-semibold tracking-wide uppercase mb-4">
                  {plan.name[lang]}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.isPopular ? "text-neutral-300" : "text-neutral-500"
                  }`}
                >
                  {plan.description[lang]}
                </p>

                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">
                    {" "}
                    <CurrencyDisplay
                      amount={plan.price}
                      className="text-4xl font-bold"
                      invertIcon={plan.isPopular}
                    />
                  </span>
                  <span
                    className={`ml-2 capitalize ${
                      plan.isPopular ? "text-neutral-300" : "text-neutral-500"
                    }`}
                  >
                    /{plan.period[lang]}
                  </span>
                </div>

                <Link
                  href={`/subscription?plan=${plan.slug}`}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-colors cursor-pointer flex justify-center ${
                    plan.isPopular
                      ? "bg-white text-primary hover:bg-neutral-100"
                      : "bg-primary text-white hover:bg-primary/95"
                  }`}
                >
                  {plan.buttonText[lang]}
                </Link>
              </div>

              {/* Features */}
              <div
                className={`px-6 pb-8 ${
                  plan.isPopular ? "text-white" : "text-neutral-900"
                }`}
              >
                <div className="space-y-4">
                  {plan.features.map((feature, i) => {
                    const isBasicPlanFeature =
                      typeof feature === "object" && feature.includesBasicPlan;
                    const featureText =
                      typeof feature === "string" ? feature[lang] : feature[lang];

                    return (
                      <Animate
                        key={i}
                        viewOnce={true}
                        transition={{
                          duration: 0.8,
                          delay: 0.08 * (i + 2),
                        }}
                        variants={fadeD1NoTransition}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={cn(
                            "flex  gap-3",
                            isBasicPlanFeature ? "items-center" : "items-start"
                          )}
                        >
                          {isBasicPlanFeature ? (
                            <div
                              className={`px-4 py-2 rounded-lg font-medium text-sm min-w-32 ${
                                plan.isPopular
                                  ? "bg-white/20"
                                  : "bg-neutral-200"
                              }`}
                            >
                              {pricingPlans[0].name[lang]}
                            </div>
                          ) : (
                            <div
                              className={`w-5 h-5 rounded-full flex justify-center items-center flex-shrink-0 ${
                                plan.isPopular ? "bg-white" : "bg-primary"
                              }`}
                            >
                              <Check
                                className={`w-3 h-3 ${
                                  plan.isPopular ? "text-primary" : "text-white"
                                }`}
                              />
                            </div>
                          )}
                          <span
                            className={`font-medium leading-relaxed text-sm ${
                              plan.isPopular
                                ? "text-neutral-200"
                                : "text-neutral-700"
                            }`}
                          >
                            {featureText}
                          </span>
                        </div>
                      </Animate>
                    );
                  })}
                </div>
              </div>
            
            </Animate>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Pricing;
