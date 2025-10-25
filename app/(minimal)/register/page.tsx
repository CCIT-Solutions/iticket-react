import { Metadata } from "next";
import dynamic from "next/dynamic";
const Register = dynamic(() => import("@/modules/auth/register"));

export const metadata: Metadata = {
  title: "Iticket - Register",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return <Register />;
}
export default page;