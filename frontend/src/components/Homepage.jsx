import { useEffect, useState } from "react";
import Header from "./Header";
import bg from "../assets/bgmap.webp";

export default function Homepage() {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-full ">
      <Header />
      
      
      <img src={bg}
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      />

      <div className=" flex mx-auto px-6 pt-32">
       <div className="w-1/2 text-center text-6xl">
        <h1>Nandhavanam </h1>
          <p>Tamil Family Association</p>
       </div>
       
       <div className="w-1/2 ">
        <h1 className="text-4xl  font-bold text-center text-blue-900 mb-10">
          Upcoming Events
        </h1>

        {loading && (
          <p className="text-center text-lg text-gray-500" aria-live="polite">
            Loading events...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold" aria-live="polite">
            {error}
          </p>
        )}

        {!loading && !error && notification.length === 0 && (
          <p className="text-center text-gray-500">No upcoming events available.</p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notification.map((n) => (
            <div
              key={n._id || n.event}
              className=" shadow-md rounded-xl p-6 border 
                         hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
            >
              <h2 className="text-2xl font-semibold  mb-2">
                {n.event}
              </h2>
              <p className="text-gray-700">{n.post}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
