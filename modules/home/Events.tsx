"use client";

import dynamic from "next/dynamic";
import Container from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import Translate from "@/components/shared/Translate";
import Animate from "@/components/shared/Animate";
import { fade } from "@/lib/animation";
import { useGetEventCategories } from "@/services/eventCategories/query";
import { useGetEvents } from "@/services/events/query";
import Image from "next/image";
import { EventCategory } from "@/types/eventCategory";
import Loading from "@/components/shared/Loading";
import { useLang } from "@/hooks/useLang";

const EventCard = dynamic(() => import("@/components/events/EventCard"));

function Events() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);

  // Fetch from APIs
  const { data: categoriesRes, isLoading: categoriesLoading } =
    useGetEventCategories(lang);
  const { data: eventsRes, isLoading: eventsLoading } = useGetEvents(lang);

  const categories = categoriesRes?.data || []
  const events = eventsRes?.data || []

const filteredEvents = useMemo(() => {
  const eventList = events || [];
  if (activeCategory === "All") return eventList;
  return eventList.filter((event) =>
    event.categories?.some(
      (cat: EventCategory) => cat.name === activeCategory
    )
  );
}, [events, activeCategory]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 9);

  if (categoriesLoading || eventsLoading) {
    return <Loading />;
  }

  return (
    <section>
      <Container>
        <Animate
          element="h2"
          variants={fade}
          viewOnce
          className="text-3xl font-bold mb-6"
        >
          <Translate text="events.title" />
        </Animate>

        {/* Category Filters */}
        <Animate
          variants={fade}
          viewOnce
          className="flex scrollbar-hide flex-wrap gap-3"
        >
          <Button
            variant={"noStyle"}
            key={"all"}
            onClick={() => {
              setActiveCategory("All");
              setVisibleCount(9);
            }}
            className={cn(
              "flex items-stretch justify-center space-x-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer",
              activeCategory === "All"
                ? "bg-white text-black"
                : "bg-neutral-900 text-neutral-200 hover:bg-neutral-800"
            )}
          >
            <span>
              <Translate text="events.categories.all" />
            </span>
          </Button>
          {categories?.map((category, index) => (
            <Button
              variant={"noStyle"}
              key={category.id}
              onClick={() => {
                setActiveCategory(category.name || "All");
                setVisibleCount(9);
              }}
              className={cn(
                "flex  justify-center py-2.5 px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer",
                activeCategory === category.name
                  ? "bg-white text-black"
                  : "bg-neutral-900 text-neutral-200 hover:bg-neutral-800"
              )}
            >
              <Image
                src={category.icon}
                alt="Event Icon"
                width={16}
                height={16}
                className={activeCategory === category.name ? "" : "invert"}
              />
              <span>{category.name?.toLowerCase()}</span>
            </Button>
          ))}
        </Animate>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {filteredEvents.slice(0, visibleCount).map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>

        {/* Load More */}
        {filteredEvents.length > 8 && (
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
      </Container>
    </section>
  );
}

export default Events;
