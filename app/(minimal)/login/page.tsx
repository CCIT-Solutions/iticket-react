import { Metadata } from "next";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("@/modules/auth/login"));

export const metadata: Metadata = {
  title: "Iticket -  Login",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return <Login />;
}
export default page;