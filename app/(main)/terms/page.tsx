import { Metadata } from "next";
import dynamic from "next/dynamic";
const Terms = dynamic(() => import("@/modules/terms"));

export const metadata: Metadata = {
  title: "Iticket - Terms & Conditions",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return <Terms />;
}
export default page;