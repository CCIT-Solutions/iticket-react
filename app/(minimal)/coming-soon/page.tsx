import { Metadata } from "next";
import dynamic from "next/dynamic";
const ComingSoon = dynamic(() => import("@/modules/comingSoon"));

export const metadata: Metadata = {
  title: "Iticket -  Coming Soon",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return <ComingSoon />;
}
export default page;