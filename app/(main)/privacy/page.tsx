import { Metadata } from "next";
import dynamic from "next/dynamic";
const Privacy = dynamic(() => import("@/modules/privacy"));

export const metadata: Metadata = {
  title: "Iticket - Privacy Policy",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return <Privacy />;
}
export default page;