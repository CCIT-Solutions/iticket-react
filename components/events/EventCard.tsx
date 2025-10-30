import { useLang } from "@/hooks/useLang";
import Image from "next/image";
import Link from "next/link";
import Location from "../icons/Location";
import Animate from "../shared/Animate";
import { fade } from "@/lib/animation";

function EventCard({ event }: { event: any }) {
  const { lang } = useLang();

  // Derived fallback-safe fields from API
  const image = event.cover || "/media/images/fallback-event.jpg";
  const category = event.categories?.[0]?.name || "General";
  const date = event.start_date
    ? new Date(event.start_date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
        month: "short",
        day: "numeric",
      })
    : "TBA";
  const time = event.start_time ? event.start_time.slice(0, 5) : "00:00";
  const venue = event.address || "No address provided";

  return (
    <Link
      href={`/events/${event.id}`}
      key={event.id}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-neutral-900 hover:bg-neutral-800/70 transition-all duration-300 p-4"
    >
      {/* Event Image */}
      <Animate variants={fade} viewOnce className="relative h-56 overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
      </Animate>

      {/* Event Details */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center text-primary text-sm font-medium">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{time}</span>
        </div>
        <span className="px-3 py-1 bg-neutral-800 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {category}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-neutral-200 text-2xl font-bold group-hover:text-white transition-colors">
        {event.name}
      </h3>

      {/* Venue */}
      <div className="flex items-center text-neutral-400 text-sm mt-4">
        <Location className="me-1" />
        <span>{venue}</span>
      </div>
    </Link>
  );
}
export default EventCard;
