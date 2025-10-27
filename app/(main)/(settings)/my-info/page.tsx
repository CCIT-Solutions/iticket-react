
import { Metadata } from "next";
import dynamic from "next/dynamic";
const MyInfo = dynamic(() => import("@/modules/settings/MyInfo"));

export const metadata: Metadata = {
  title: "Iticket - My Info",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return (
      <MyInfo />
  );
}
export default page;
