import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./hero"));
const CTA = dynamic(() => import("./CTA"));
const Events = dynamic(() => import("./Events"));

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
