import { Metadata } from "next";
import dynamic from "next/dynamic";
const Success = dynamic(() => import("@/modules/events/Success"));

export const metadata: Metadata = {
  title: "Iticket - Events",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return <Success />;
}
export default page;