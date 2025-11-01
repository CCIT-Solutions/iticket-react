import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import "@/i18n/i18n";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
const basisGrotesque = localFont({
  src: [
    {
      path: "./fonts/BasisGrotesqueArabicPro-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-basis-grotesque",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "iTicket – Modern Event Ticket Booking Platform",
  description:
    "ITicket is a modern platform for seamless event ticket bookings. Discover concerts, sports, theater, wrestling and more — book your spot instantly with an elegant, secure experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} className="scroll-smooth">
      <head>
        <script src="/scripts/lang-init.js" async />
      </head>
      <body
        className={`${basisGrotesque.variable} ${basisGrotesque.className} ${poppins.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
