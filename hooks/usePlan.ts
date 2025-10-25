import { pricingPlans } from "@/data/pricingPlans";
import type { Plan } from "@/types/plan";
import { notFound, useSearchParams } from "next/navigation";

function usePlan(): { plan: Plan } {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");

  const plan = pricingPlans.find((plan) => plan.slug === planId);

  if (!plan) {
    return notFound();
  }

  return { plan };
}

export default usePlan;