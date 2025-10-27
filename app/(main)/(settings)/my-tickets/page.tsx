import { Metadata } from "next";
import dynamic from "next/dynamic";
const MyTickets = dynamic(() => import("@/modules/settings/MyTickets"));

export const metadata: Metadata = {
  title: "Iticket - My Tickets",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return (
      <MyTickets />
  );
}
export default page;
