import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

import bg from "../assets/2.mp4";
import logo from "../assets/logo.png";

export default function Homepage() {
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isTamil, setIsTamil] = useState(false);

  const navigate = useNavigate();
  const marqueeRef = useRef(null);

  // Fetch Events
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/notifications`)
      .then((res) => res.json())
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
      })
      .finally(() => setLoading(false));
  }, []);

  // Mobile Drag Support for Carousel
  useEffect(() => {
    const slider = marqueeRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }, []);

  const scrollToEvents = () => {
    const section = document.getElementById("events-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center">
        <motion.img
          src={logo}
          className="h-24 w-24 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        />
        <p className="mt-4 text-white text-xl font-semibold">Loading…</p>
      </div>
    );
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden text-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
        >
          <source src={bg} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

        <div className="relative z-10 text-center max-w-2xl">
          <motion.img
            src={logo}
            className="h-32 w-32 rounded-full shadow-xl mx-auto border border-white/20"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />

          <h1 className="mt-8 text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            {isTamil ? "நந்தவனம்" : "Nandhavanam"}
          </h1>

          <p className="mt-2 text-lg md:text-xl opacity-90">
            {isTamil ? "தமிழ் குடும்ப சங்கம்" : "Kuwait Family Association"}
          </p>

          <motion.button
            onClick={() => navigate("/about")}
            whileHover={{ scale: 1.1 }}
            className="mt-6 px-8 py-3 rounded-full bg-yellow-400 text-black font-bold shadow-xl hover:bg-yellow-500"
          >
            {isTamil ? "மேலும் அறிய" : "Learn More"}
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-8 cursor-pointer"
          onClick={scrollToEvents}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        >
          <ChevronDown size={45} className="text-white opacity-80" />
        </motion.div>
      </section>

      {/* ================= EVENTS SECTION ================= */}
      <section
        id="events-section"
        className="py-24 px-6 bg-gradient-to-b from-white via-blue-50 to-slate-100"
      >
        <h2 className="text-center text-4xl font-extrabold text-slate-900 mb-14">
          Events & Announcements
        </h2>

        {/* ⭐ PREMIUM AUTO SCROLL CAROUSEL ⭐ */}
        <div
          ref={marqueeRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing group"
        >
          <div
            className="flex marquee-inner w-max gap-6 animate-marquee"
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = "running";
            }}
          >
            {[...upcomingEvents, ...upcomingEvents].map((event, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.06 }}
                onClick={() => setSelectedEvent(event)}
                className="w-80 bg-white/90 rounded-2xl border border-slate-200 shadow-lg cursor-pointer overflow-hidden hover:shadow-xl transition"
              >
                {event.image && (
                  <img
                    src={event.image}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-4">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {new Date(event.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>

                  <h3 className="mt-3 text-lg font-bold line-clamp-1">
                    {event.event}
                  </h3>

                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {event.post}
                  </p>

                  <p className="mt-2 text-blue-700 font-semibold">
                    Read More →
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* UPCOMING EVENTS GRID */}
        <h3 className="text-3xl font-bold text-center mb-10 text-slate-900 mt-20">
          Upcoming Events
        </h3>

        {upcomingEvents.length === 0 ? (
          <p className="text-center text-gray-500">No upcoming events.</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedEvent(event)}
                className="rounded-2xl bg-white shadow-md hover:shadow-xl cursor-pointer overflow-hidden group border border-slate-200"
              >
                <img
                  src={event.image}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="p-5">
                  <h3 className="text-xl font-bold">{event.event}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {event.post}
                  </p>
                  <button className="mt-3 text-blue-700 font-semibold">
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* PAST EVENTS */}
        {pastEvents.length > 0 && (
          <div className="mt-24">
            <h3 className="text-3xl font-bold text-center mb-10 text-slate-900">
              Past Events
            </h3>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pastEvents.map((event, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedEvent(event)}
                  className="rounded-2xl bg-slate-100 shadow-md hover:shadow-xl cursor-pointer overflow-hidden group border border-slate-200"
                >
                  <img
                    src={event.image}
                    className="w-full h-48 object-cover opacity-90 group-hover:scale-105 transition duration-500"
                  />

                  <div className="p-5">
                    <h3 className="text-lg font-bold">{event.event}</h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                      {event.post}
                    </p>
                    <button className="mt-3 text-gray-700 font-semibold hover:text-black">
                      Read More →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ================= MODAL ================= */}
     {selectedEvent && (
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="
        bg-white 
        rounded-2xl 
        shadow-xl 
        w-full 
        max-w-xl 
        max-h-[90vh] 
        overflow-hidden 
        relative
      "
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedEvent(null)}
        className="absolute right-4 top-3 text-2xl text-white hover:text-red-500"
      >
        ×
      </button>

      {/* Image */}
      {selectedEvent.image && (
        <img
          src={selectedEvent.image}
          className="w-full max-h-60 object-cover rounded-t-2xl"
        />
      )}

      {/* Body Scroll Area */}
      <div className="p-5 overflow-y-auto max-h-[calc(90vh-250px)]">
        <h2 className="text-2xl font-bold text-center mb-3">
          {selectedEvent.event}
        </h2>

        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {selectedEvent.post}
        </p>
      </div>
    </motion.div>
  </div>
)}


      <Footer />
    </>
  );
}
