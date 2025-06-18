import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../services/eventService";

const Events = () => {
  const prev_page = localStorage.getItem("page");
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(prev_page == null ? 1 : Number(prev_page));
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('desc');

  const fetchEvents = async () => {
  setLoading(true);
  try {
    const params = {
      page,
      limit: 9,
      search,
      eventType,
      location,
      sort,  // added sort here
    };
    const res = await getAllEvents(params);
    setEvents(res.events);
    setTotalPages(res.totalPages);
  } catch (err) {
    console.error("Error fetching events", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEvents();
    window.scrollTo(0, 0);
    localStorage.setItem("page", page);
  }, [page, sort]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (e) => {
    setEventType(e.target.value);
    setPage(1);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#2a2a2a] text-white px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
        Explore Events
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-center my-10">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={handleSearchChange}
          className="px-4 py-2 rounded-lg w-full md:w-64 border border-yellow-400 placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="text"
          placeholder="Event type (e.g. Music)"
          value={eventType}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded-lg w-full md:w-64 border border-yellow-400 placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={location}
          onChange={handleLocationChange}
          className="px-4 py-2 rounded-lg w-full md:w-64 border border-yellow-400 placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded-lg w-full md:w-64 border border-yellow-400 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400
                    truncate"
        >
          <option value="desc" className="truncate" title="Sort by Newest">Sort by Newest</option>
          <option value="asc" className="truncate" title="Sort by Oldest">Sort by Oldest</option>
        </select>
        <button
          type="submit"
          onClick={fetchEvents}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 font-semibold"
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-400 placeholder-white"></div>
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-300">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link
              key={event._id}
              to={`/events/${event._id}`}
              className="rounded-xl bg-[#1e1e1e] shadow-lg hover:shadow-yellow-400/20 transition duration-300 p-5"
            >
              <img
                src={event.image || "https://placehold.co/400x200"}
                alt={event.title}
                className="rounded-lg mb-4 h-40 w-full object-cover border border-gray-800"
              />
              <h2 className="text-xl font-bold text-yellow-400 mb-1">{event.title}</h2>
              <p className="text-sm text-gray-300 mb-1">
                {new Date(event.startDate).toLocaleDateString()} | {event.startTime}
              </p>
              <p className="text-sm text-gray-200 line-clamp-2 mb-1">
                {event.description}
              </p>
              <p className="text-sm text-blue-300 mb-1">{event.location}</p>
              <p
                className={`text-sm font-semibold ${
                  event.status?.toLowerCase() === 'completed'
                    ? 'text-red-400'
                    : 'text-green-400'
                }`}
              >
                {event.status}
              </p>
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-yellow-400 text-black rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-lg font-semibold">
          {totalPages === 0 ? 0 : page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-yellow-400 text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Events;
