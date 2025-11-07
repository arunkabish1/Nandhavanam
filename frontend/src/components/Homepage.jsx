import { useEffect, useState } from "react";
import bg from "../assets/2.mp4";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";

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
          console.log(res)
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
        .catch((err) => {
          
          console.error("Error fetching notifications:", err);
          setError("Unable to load events at the moment.");
        })
        
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
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-100 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={logo}
          alt="Loading..."
          className="h-28 w-28 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        <motion.p
          className="mt-6 text-gray-700 font-semibold text-lg tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          {/* Loading Nandhavanam... */}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="min-h-screen text-gray-900 flex flex-col bg-gradient-to-b from-white to-blue-50">
        {/* 🌅 Hero Section */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden rounded-b-3xl">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover scale-125"
          >
            <source src={bg} type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

          {/* Content */}
          <div className="relative z-10 text-white text-center px-4 max-w-3xl">
            <img
              src={logo}
              className="rounded-full h-28 mx-auto p-2 animate-pulse"
              alt="Logo"
            />
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-1 leading-tight drop-shadow-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {isTamil ? "நந்தவனம்" : "Nandhavanam"}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl font-semibold mb-3 drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isTamil ? "தமிழ் குடும்ப சங்கம்" : "Tamil Family Association"}
            </motion.p>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isTamil
                ? "இணக்கம், பண்பு, ஒற்றுமை ஆகியவற்றின் மீது கட்டப்பட்ட சமூகமாம் நந்தவனம். எங்களின் நிகழ்வுகள் மற்றும் கொண்டாடல்களுடன் இணைந்திருங்கள்."
                : "A community built on culture, unity, and togetherness. Stay connected with our latest events and celebrations."}
            </motion.p>

            <motion.button
              onClick={() => navigate("/about")}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full shadow-lg transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isTamil ? "மேலும் அறிய" : "To Know More"}
            </motion.button>
          </div>

          {/* ⬇️ Scroll Down Icon */}
          <motion.div
            className="absolute bottom-8 z-10 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            onClick={scrollToEvents}
          >
            <ChevronDown
              size={40}
              className="text-white opacity-80 hover:opacity-100 transition"
            />
          </motion.div>
        </section>

        {/* 🎉 Events Section */}
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

        {/* 🪩 Event Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-3xl font-bold"
              >
                &times;
              </button>
              <div className="p-5 mt-6 sm:p-6">
                {selectedEvent.image && (
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.event}
                    className="w-full  object-cover shadow-xl rounded-2xl mb-4"
                  />
                )}
                <h2 className="text-xl sm:text-2xl font-bold mb-3 p-2 text-center text-gray-900">
                  {selectedEvent.event}
                </h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {selectedEvent.post}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
