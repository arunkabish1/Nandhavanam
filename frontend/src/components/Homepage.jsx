import { useEffect, useState } from "react";
import Header from "./Header";
import logo from '../assets/centerlogo.png'

export default function Homepage() {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [animate, setAnimate] = useState(false); // for transition

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

  // Rotate events every 10s with animation
  useEffect(() => {
    if (notification.length > 1) {
      const interval = setInterval(() => {
        setAnimate(true); // start animation
        setTimeout(() => {
          setNotification((prev) => {
            const [first, ...rest] = prev;
            return [...rest, first]; // move first to last
          });
          setAnimate(false); // reset animation
        }, 800); // should match transition duration
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />

      <div className="md:flex mx-auto md:px-6 md:pt-10">
        <div className="w-1/2 text-center text-6xl">
        <img src={logo} alt="" />
          <h1>Nandhavanam</h1>
          <p>Tamil Family Association</p>
        </div>

        <div className="w-1/2 shadow-md rounded-xl p-2  border">
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">
            Upcoming Events
          </h1>

          {loading && (
            <p className="text-center text-lg text-gray-500">Loading events...</p>
          )}
          {error && (
            <p className="text-center text-red-500 font-semibold">{error}</p>
          )}
          {!loading && !error && notification.length === 0 && (
            <p className="text-center text-gray-500">
              No upcoming events available.
            </p>
          )}

          {/* Vertical stack of events */}
          {!loading && !error && notification.length > 0 && (
            <div className="flex flex-col gap-6 relative">
              {notification.map((n, idx) => (
                <div
                  key={n._id || idx}
                  className={`shadow-lg rounded-xl p-6 border cursor-pointer transition-all duration-700 ${
                    animate && idx === 0
                      ? "opacity-0 -translate-y-5"
                      : "opacity-100 translate-y-0"
                  }`}
                  onClick={() => setSelectedEvent(n)}
                >
                  <h2 className="text-2xl font-semibold mb-2">{n.event}</h2>
                  <p className="text-gray-700">{n.post}</p>
                  <img
                    src={n.image}
                    alt={n.event}
                    className="mt-4 w-full max-h-[400px] object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-1/2 rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4 text-center text-blue-800">
              {selectedEvent.event}
            </h2>
            <p className="text-gray-700 mb-4">{selectedEvent.post}</p>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.event}
              className="rounded-lg shadow-md w-full max-h-[400px] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
