"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { useLang } from "@/hooks/useLang";
import AuthDialog from "@/components/auth/AuthDialog";
import Animate from "../shared/Animate";
import { fade } from "@/lib/animation";

function GetTicketCard() {
  const { t, isRTL } = useLang();

  return (
    <Animate variants={fade}>
      <Card className="bg-neutral-900 h-fit rounded-3xl border-none">
        <CardContent className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div
            className={cn(
              "flex flex-col gap-2 items-center",
              isRTL ? "sm:mr-6" : "sm:ml-6"
            )}
          >
            <div className="text-neutral-400 text-xs">
              {t("eventDetails.priceFrom")}
            </div>
            <div className="text-2xl font-bold mb-2 text-primary">
              450 {t("eventDetails.currency")}
            </div>
          </div>

          <AuthDialog triggerText={t("eventDetails.getTicket")} />
        </CardContent>
      </Card>
    </Animate>
  );
}

export default GetTicketCard;
