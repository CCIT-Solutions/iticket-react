import CurrencyDisplay from "@/components/shared/CurrencyDisplay";
import Translate from "@/components/shared/Translate";
import { useLang } from "@/hooks/useLang";
import type { Plan } from "@/types/plan";
import Link from "next/link";

export type SubscriptionSummaryProps = {
  plan: Plan;
};

const SubscriptionSummaryCard: React.FC<SubscriptionSummaryProps> = ({
  plan,
}) => {
  const { lang } = useLang();

  const VAT_RATE = 0.15;
  const subtotal = plan.price;
  const vatAmount = subtotal * VAT_RATE;
  const total = subtotal + vatAmount;

  return (
    <div className="max-w-md w-full rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 order-1 sm:order-2">
      {/* Title */}
      <h1 className="text-neutral-900 font-semibold text-lg mb-6">
        <Translate text="subscription.summary.title" />
      </h1>

      {/* Plan pill */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between rounded-xl bg-neutral-100 px-4 py-4 mb-6 gap:10 sm:gap-20">
        <div>
          <p className="text-lg font-bold tracking-wide text-primary uppercase mb-1 text-center sm:text-start">
            {plan.name[lang]}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-neutral-900 text-xl font-bold">
              <CurrencyDisplay
                amount={Math.round(plan.price)}
                className="text-4xl font-bold"
              />
            </span>
            <span className="text-xs text-neutral-600">
              /{" "}
              <Translate
                text={`subscription.period.${plan.period[
                  lang
                ].toLocaleLowerCase()}`}
              />
            </span>
          </div>
        </div>
        <Link
          href="/pricing"
          className="text-xs font-semibold underline underline-offset-2 text-neutral-700 hover:text-neutral-900 mt-6 sm:mt-0"
        >
          <Translate text="subscription.changePlan" />
        </Link>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold">
            <Translate text="subscription.breakdown.subtotal" />
          </span>

          <CurrencyDisplay
            amount={vatAmount}
            className="text-xl font-bold text-neutral-900"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold">
            <Translate
              text="subscription.breakdown.vat"
              values={{ percentage: Math.round(VAT_RATE * 100) }}
            />
          </span>
          <CurrencyDisplay
            amount={vatAmount}
            className="text-xl font-bold text-neutral-900"
          />
        </div>

        <div className="my-4 border-t border-neutral-200" />

        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold">
            <Translate text="subscription.breakdown.total" />
          </span>
          <CurrencyDisplay
            amount={total}
            className="text-xl font-bold text-neutral-900"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSummaryCard;
