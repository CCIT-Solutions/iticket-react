
// import EventCard from "./EventCard";

function RelatedEvents() {
  return (
    <section className="sm:mt-12">
      <h2 className="text-4xl font-bold mb-10">Events You Might Like</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {events.slice(3, 6).map((event) => (
          <EventCard event={event} key={event.id} />
        ))} */}
      </div>
    </section>
  );
}
export default RelatedEvents;
