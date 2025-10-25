import Container from "@/components/shared/Container";
import EventSlider from "./EventSlider";
import QuickFilters from "./QuickFilters";

export default function Hero() {
  return (
    <section className="pt-28">
      <EventSlider />
      <QuickFilters />
    </section>
  );
}
