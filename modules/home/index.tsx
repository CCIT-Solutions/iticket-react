"use client"
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./hero"), { ssr: false });
const CTA = dynamic(() => import("./CTA"), { ssr: false });
const Events = dynamic(() => import("./Events"), { ssr: false });

function Home() {
  return (
    <>
      <Hero />
      <Events />
      <CTA />
    </>
  );
}
export default Home;
