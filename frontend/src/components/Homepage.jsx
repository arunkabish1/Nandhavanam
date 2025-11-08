import { useEffect, useState } from "react";
import bg from "../assets/2.mp4";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import { HoverImageLinks } from "./HoverImageLinks";

export default function Homepage() {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isTamil, setIsTamil] = useState(false);
  const navigate = useNavigate();

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`${import.meta.env.VITE_API_URL}/notifications`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch notifications");
          return res.json();
        })
        .then((data) => {
          const today = new Date();
          const upcoming = [];
          const past = [];

          data.forEach((event) => {
            const eventDate = new Date(event.date);
            if (eventDate >= today) upcoming.push(event);
            else past.push(event);
          });

          upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
          past.sort((a, b) => new Date(b.date) - new Date(a.date));

          setUpcomingEvents(upcoming);
          setPastEvents(past);
          setNotification(data);
        })
        .catch(() => setError("Unable to load events at the moment."))
        .finally(() => setLoading(false));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToEvents = () => {
    const eventsSection = document.getElementById("events");
    if (eventsSection) eventsSection.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <motion.div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-100 z-50">
        <motion.img
          src={logo}
          alt="Loading..."
          className="h-28 w-28 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </motion.div>
    );
  }

  return (
    <>
      <div className="min-h-screen text-gray-900 flex flex-col bg-gradient-to-b from-white to-blue-50">

        {/* ✅ Hero Section */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden rounded-b-3xl">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-125">
            <source src={bg} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

          <div className="relative z-10 text-white max-w-3xl mx-auto">
            <img src={logo} className="rounded-full h-28 mx-auto p-2 animate-pulse" />
            <h1 className="text-4xl sm:text-6xl font-extrabold">{isTamil ? "நந்தவனம்" : "Nandhavanam"}</h1>
            <p className="text-lg sm:text-xl font-semibold">{isTamil ? "தமிழ் குடும்ப சங்கம்" : "Tamil Family Association"}</p>
            <button
              onClick={() => navigate("/about")}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full shadow-lg mt-4">
              {isTamil ? "மேலும் அறிய" : "To Know More"}
            </button>
          </div>

          <motion.div
            className="absolute bottom-8 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            onClick={scrollToEvents}>
            <ChevronDown size={40} className="text-white opacity-80" />
          </motion.div>
        </section>

        {/* ✅ Auto-Scrolling Carousel */}
        <section id="events" className="px-4  md:px-10 py-16 w-full  mx-auto">
  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Our Events</h2>

  <div className="relative overflow-hidden carousel  w-full">
    <div className="flex gap-6 w-max scroll-content animate-[scroll-left_10s_linear_infinite]">
      {[...upcomingEvents, ...upcomingEvents].map((n, idx) => (
        <motion.div
          key={idx}
          onClick={() => setSelectedEvent(n)}
          whileHover={{ scale: 1.05 }}
          className="w-[320px]  flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden flex flex-col h-[650px]"
        >
          {n.image && (
            <img
              src={n.image}
              alt={n.event}
              className="w-full h-full object-fit"
            />
          )}

          <div className="flex flex-col justify-between p-3 h-full">
            <div>
              <span className="inline-block bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
                {new Date(n.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </span>

              <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-1">
                {n.event}
              </h3>

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {n.post}
              </p>
            </div>

            <p className="text-yellow-600 text-sm font-semibold mt-2">
              Read More →
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>  

        <section
          id="events"
          className="px-4 sm:px-6 md:px-10 py-16 w-full max-w-7xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Upcoming Events
          </h2>

          {error && <p className="text-center text-red-500">{error}</p>}

          {!error && upcomingEvents.length === 0 && (
            <p className="text-center text-gray-500">
              No upcoming events available.
            </p>
          )}

          {!error && upcomingEvents.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {upcomingEvents.map((n, idx) => (
                <motion.div
                  key={n._id || idx}
                  className="relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedEvent(n)}
                  whileHover={{ scale: 1.02 }}
                >
                  {n.image && (
                    <img
                      src={n.image}
                      alt={n.event}
                      className="w-full object-scale-down transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {n.date && (
                    <span className="absolute top-3 left-3 bg-yellow-400 text-black font-semibold text-xs px-3 py-1 rounded-full shadow-md">
                      {new Date(n.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  )}
                  <div className="p-5 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {n.event}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                      {n.post}
                    </p>
                    <button className="text-sm font-semibold text-yellow-600 hover:text-yellow-800">
                      Read More →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Past Events */}
          {!error && pastEvents.length > 0 && (
            <>
              <h2 className="text-3xl sm:text-4xl font-bold text-center mt-20 mb-12 text-gray-900">
                Past Events
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pastEvents.map((n, idx) => (
                  <motion.div
                    key={n._id || idx}
                    className="relative group bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedEvent(n)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {n.image && (
                      <img
                        src={n.image}
                        alt={n.event}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                      />
                    )}
                    {n.date && (
                      <span className="absolute top-3 left-3 bg-gray-500 text-white font-semibold text-xs px-3 py-1 rounded-full shadow-md">
                        {new Date(n.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "2-digit",
                        })}
                      </span>
                    )}
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                        {n.event}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                        {n.post}
                      </p>
                      <button className="text-sm font-semibold text-gray-700 hover:text-gray-900">
                        Read More →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>

        
{/* our sponsers */}
          <HoverImageLinks/>



          

{/* ////////////////// */}
        {/* ✅ Event Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5 ">
            <motion.div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
              <button onClick={() => setSelectedEvent(null)} className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-3xl">
                &times;
              </button>
              {selectedEvent.image && <img src={selectedEvent.image} className="w-full rounded-xl mb-4" />}
              <h2 className="text-2xl font-bold text-center mb-2">{selectedEvent.event}</h2>
              <p className="text-gray-700 whitespace-pre-line">{selectedEvent.post}</p>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
