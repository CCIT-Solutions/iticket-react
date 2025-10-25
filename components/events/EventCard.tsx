import { useLang } from "@/hooks/useLang";
import Image from "next/image";
import Link from "next/link";
import Location from "../icons/Location";
import { EventType } from "@/types/event";
import Animate from "../shared/Animate";
import { fade } from "@/lib/animation";

function EventCard({ event }: { event: EventType }) {
  const { lang } = useLang();
  return (
    <Link
      href={`/events/${event.id}`}
      key={event.id}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-neutral-900 hover:bg-neutral-800/70 transition-all duration-300 p-4"
    >
      {/* Event Image */}
      <Animate variants={fade} viewOnce className="relative h-56 overflow-hidden rounded-xl">
        <Image
          src={`/media/images/events/${event.image}.jpg`}
          alt={event.title[lang]}
          fill
          className="object-cover"
          priority
        />
      </Animate>

      {/* Event Details */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center text-primary text-sm font-medium">
          <span>{event.date[lang]}</span>
          <span className="mx-2">•</span>
          <span>{event.time[lang]}</span>
        </div>
        <span className="px-3 py-1 bg-neutral-800 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {event.category[lang]}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-white text-2xl font-bold group-hover:text-emerald-400 transition-colors">
        {event.title[lang]}
      </h3>

      {/* Venue */}
      <div className="flex items-center text-neutral-400 text-sm mt-4">
        <Location className="me-1" />
        <span>{event.venue[lang]}</span>
      </div>
    </Link>
  );
}
export default EventCard;
