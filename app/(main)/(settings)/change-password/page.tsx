import SettingsLayout from "@/layout/SettingsLayout";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const ChangePassword = dynamic(
  () => import("@/modules/settings/ChangePassword")
);

export const metadata: Metadata = {
  title: "Iticket - Change Password",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

function page() {
  return (
      <ChangePassword />
  );
}
export default page;
