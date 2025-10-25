import { Metadata } from "next";
import dynamic from "next/dynamic";
const Contact = dynamic(() => import("@/modules/contact"));

export const metadata: Metadata = {
  title: "Iticket - Contact Us",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return <Contact />;
}
export default page;