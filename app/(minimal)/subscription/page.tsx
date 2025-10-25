import { Metadata } from "next";
import dynamic from "next/dynamic";
const Subscription = dynamic(() => import("@/modules/subscription"));

export const metadata: Metadata = {
  title: "Iticket - Subscription",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return <Subscription />;
}
export default page;