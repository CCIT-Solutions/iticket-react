import dynamic from "next/dynamic";;
const EventSlider = dynamic(() => import("./EventSlider"), { ssr: false });
const QuickFilters = dynamic(() => import("./QuickFilters"), { ssr: false });


export default function Hero() {
  return (
    <section className="pt-28">
      <EventSlider />
      <QuickFilters />
    </section>
  );
}
