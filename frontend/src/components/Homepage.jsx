import { useEffect, useState } from "react";
import bg from "../assets/kuwait.mp4";

export default function Homepage() {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [animate, setAnimate] = useState(false);


  



  // Toggle language state

  const [isTamil, setIsTamil] = useState(true);
 
  // Change language every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTamil((prev) => !prev);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Fetch events
  useEffect(() => {
    fetch("http://localhost:5000/notifications")
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

  // Rotate events every 10s
  useEffect(() => {
    if (notification.length > 1) {
      const interval = setInterval(() => {
        setAnimate(true);
        setTimeout(() => {
          setNotification((prev) => {
            const [first, ...rest] = prev;
            return [...rest, first];
          });
          setAnimate(false);
        }, 800);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [notification]);

  return (
    <div className="min-h-screen  text-gray-900">
      {/* Hero Section */}
      <section className="relative rounded-b-3xl min-h-screen flex flex-col items-center justify-center text-center px-6 h-[80vh] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/fallback.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bg} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

        {/* Content */}
        <div className="relative z-10 text-white px-4 transition-all duration-500">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
            {isTamil ? "நந்தவனம்" : "Nandhavanam"}
          </h1>
          <p className="text-xl font-semibold mb-2 drop-shadow-md">
            {isTamil ? "தமிழ் குடும்ப சங்கம்" : "Tamil Family Association"}
          </p>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 drop-shadow-sm">
            {isTamil
              ? "இணக்கம், பண்பு, ஒற்றுமை ஆகியவற்றின் மீது கட்டப்பட்ட சமூகமாம் நந்தவனம். எங்களின் நிகழ்வுகள் மற்றும் கொண்டாடல்களுடன் இணைந்திருங்கள்."
              : "A community built on culture, unity, and togetherness. Stay connected with our latest events and celebrations."}
          </p>

          <button className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl shadow-lg">
            {isTamil ? "மேலும் அறிய" : "To Know More"}
          </button>
        </div>
      </section>

      {/* Events Section */}
      {/* Events Section */}

      <section id="events" className="px-6 py-16  max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {notification.map((n, idx) => (
              <div
                key={n._id || idx}
                className="relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                onClick={() => setSelectedEvent(n)}
              >
                {/* Event Image */}
                {n.image && (
                  <img
                    src={n.image}
                    alt={n.event}
                    className="w-full h-56 object-cover rounded-t-2xl group-hover:scale-105 transition duration-500"
                  />
                )}

                {/* Date Badge */}
                {n.date && (
                  <span className="absolute top-4 left-4 bg-yellow-400 text-black font-bold text-sm px-3 py-1 rounded-full shadow">
                    {new Date(n.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                )}

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {n.event}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-3">{n.post}</p>
                  <button className="text-sm font-semibold text-yellow-600 hover:text-yellow-800">
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
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl shadow-md">
              View All Events
            </button>
          </div>
        )}
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl relative p-6 animate-fadeIn">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.event}</h2>
            <p className="text-gray-700 mb-4">{selectedEvent.post}</p>
            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.event}
                className="w-full max-h-[400px] object-contain rounded-xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
