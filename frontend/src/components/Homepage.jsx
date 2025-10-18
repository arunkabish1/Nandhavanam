import { useEffect, useState } from "react";
import bg from "../assets/kuwait.mp4";
import { useNavigate } from "react-router-dom";
import diwaliimage from "../assets/diwali.png";
import { motion, AnimatePresence } from "framer-motion";
// import AudioPlayer from "./AudioPlayer";

export default function Homepage() {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [diwali, setDiwali] = useState(true);
  const [isTamil, setIsTamil] = useState(false);
  const navigate = useNavigate();

  // Hide Diwali banner after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setDiwali(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch events
  useEffect(() => {
    fetch("https://nandhavanam-backend.onrender.com/notifications")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notifications");
        return res.json();
      })
      .then((data) => {
        setNotification(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        setError("Unable to load events at the moment.");
        setLoading(false);
      });
  }, []);

  // Prevent scrolling when Diwali banner is visible
  useEffect(() => {
    document.body.style.overflow = diwali ? "hidden" : "auto";
  }, [diwali]);

  return (
    <>
      {/* ✨ Diwali Banner (Animated + Full Screen) */}
      <AnimatePresence>
        {diwali && (
          <motion.div
            key="diwali"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-100 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Floating Diyas */}
            <div className="absolute  ">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="px-16 text-3xl"
                  initial={{
                    y: "100%",
                    x: Math.random() * window.innerWidth,
                    opacity: 0,
                  }}
                  animate={{
                    y: ["100%", "-10%"],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8,
                  }}
                >
                  🪔
                </motion.div>
              ))}
            </div>

            {/* Banner Content */}
            <motion.div
              className="flex flex-col items-center text-center z-10 p-6 max-w-xl rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm mx-4"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.img
                src={diwaliimage}
                alt="Diwali"
                className="w-56 sm:w-72 md:w-96 mb-6 rounded-lg shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-700 drop-shadow-lg"
                animate={{
                  textShadow: [
                    "0 0 10px #ffcc00",
                    "0 0 20px #ffcc00",
                    "0 0 10px #ffcc00",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                🎆 Happy Diwali 🎆
              </motion.h1>

              <p className="mt-4 text-lg sm:text-xl text-gray-700 font-medium">
                Wishing you a festival filled with light, laughter, and prosperity.
              </p>
            </motion.div>

            {/* Sparkling Lights */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(35)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-yellow-400 rounded-full opacity-60"
                  style={{
                    width: Math.random() * 4 + 2,
                    height: Math.random() * 4 + 2,
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                  }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    y: ["0%", "-10%"],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌇 Homepage (after Diwali banner) */}
      {!diwali && (
        <div className="h-screen text-gray-900 flex flex-col">
           {/* <AudioPlayer /> */}
          {/* Hero Section */}
          <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden rounded-b-3xl">
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={bg} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>

            {/* Text Content */}
            <div className="relative z-10 text-white text-center px-4 max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-1 leading-tight drop-shadow-lg">
                {isTamil ? "நந்தவனம்" : "Nandhavanam"}
              </h1>
              <p className="text-lg sm:text-xl font-semibold mb-3 drop-shadow-md">
                {isTamil ? "தமிழ் குடும்ப சங்கம்" : "Tamil Family Association"}
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
                {isTamil
                  ? "இணக்கம், பண்பு, ஒற்றுமை ஆகியவற்றின் மீது கட்டப்பட்ட சமூகமாம் நந்தவனம். எங்களின் நிகழ்வுகள் மற்றும் கொண்டாடல்களுடன் இணைந்திருங்கள்."
                  : "A community built on culture, unity, and togetherness. Stay connected with our latest events and celebrations."}
              </p>

              <button
                onClick={() => navigate("/about")}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                {isTamil ? "மேலும் அறிய" : "To Know More"}
              </button>
            </div>
          </section>

          {/* Events Section */}
          <section
            id="events"
            className="px-4 sm:px-6 md:px-10 py-16 w-full max-w-7xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
              Upcoming Events
            </h2>

            {loading && (
              <p className="text-center text-gray-500 animate-pulse">
                Loading events...
              </p>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && notification.length === 0 && (
              <p className="text-center text-gray-500">
                No upcoming events available.
              </p>
            )}

            {!loading && !error && notification.length > 0 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {notification.map((n, idx) => (
                  <div
                    key={n._id || idx}
                    className="relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedEvent(n)}
                  >
                    {/* Event Image */}
                    {n.image && (
                      <div className="overflow-y-hidden">
                        <img
                          src={n.image}
                          alt={n.event}
                          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Date Badge */}
                    {n.date && (
                      <span className="absolute top-3 left-3 bg-yellow-400 text-black font-semibold text-xs px-3 py-1 rounded-full shadow-md">
                        {new Date(n.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    )}

                    {/* Content */}
                    <div className="p-5 flex flex-col justify-between h-full">
                      <h3 className="text-xl font-bold text-center text-gray-900 mb-2 line-clamp-1">
                        {n.event}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                        {n.post}
                      </p>
                      <button className="text-sm font-semibold text-yellow-600 hover:text-yellow-800 mt-auto">
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View All Button */}
            {!loading && notification.length > 0 && (
              <div className="text-center mt-10">
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl shadow-md transition-transform hover:scale-105">
                  View All Events
                </button>
              </div>
            )}
          </section>

          {/* Event Modal */}
          {selectedEvent && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
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
                      className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-2xl"
                    />
                  )}
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 p-2 text-center text-gray-900">
                    {selectedEvent.event}
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {selectedEvent.post}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
