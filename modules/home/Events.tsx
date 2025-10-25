"use client";

import Location from "@/components/icons/Location";
import Container from "@/components/shared/Container";
import { eventCategories } from "@/data/eventCategories";
import { events } from "@/data/events";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Translate from "@/components/shared/Translate";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";
import EventCard from "@/components/events/EventCard";

function Events() {
  const [activeCategory, setActiveCategory] = useState("Music");
  const [visibleCount, setVisibleCount] = useState(9);
  const {lang} = useLang()

  // Filter events based on active category
  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((event) => event.category.en === activeCategory);

  // Handle load more
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <section className="min-h-screen">
      <Container>
        <div>
          <h2 className="text-3xl font-bold mb-6">
            <Translate text="events.title" />
          </h2>

          {/* Category Filters */}
          <div className="flex scrollbar-hide flex-wrap gap-3">
            {eventCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCategory(category.label);
                  setVisibleCount(9); // reset on category change
                }}
                className={cn(
                  "flex items-stretch justify-center space-x-2 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer",
                  activeCategory === category.label
                    ? "bg-white text-black"
                    : "bg-neutral-900 text-neutral-200 hover:bg-neutral-800",
                  category.label === "All" ? "w-20" : "w-28"
                )}
              >
                <category.icon />
                <span>
                  <Translate
                    text={`events.categories.${category.label.toLowerCase()}`}
                  />
                </span>
              </button>
            ))}
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {filteredEvents.slice(0, visibleCount).map((event) => (
             <EventCard event={event} key={event.id}/>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredEvents.length && (
            <div className="flex justify-center mt-16 mb-16">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                className="text-white border-3 border-neutral-300 hover:border-primary hover:bg-primary hover:text-black rounded-2xl w-56 tracking-widest py-6 transition-colors cursor-pointer duration-700"
              >
                <Translate text="events.loadMore" />
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default Events;
