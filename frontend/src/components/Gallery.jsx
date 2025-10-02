import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackgroundBlobs from "./BackgroundBlobs";

export default function Gallery() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://nandhavanam-backend.onrender.com/members")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch members");
        return res.json();
      })
      .then((data) => {
        setMembers(Array.isArray(data) ? data : []);
      })
      .catch(() => setError("Could not load members"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-blue-50 to-white pt-20 px-4 overflow-hidden">
      <BackgroundBlobs />

      {/* Title */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Meet Our <span className="text-blue-600">Members</span>
      </motion.h1>
      
      {/* Loading / Error */}
      {loading && (
        <p className="text-center text-gray-500 text-base animate-pulse">
          Loading members…
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 text-base">{error}</p>
      )}

      {/* Cards */}
      {!loading && !error && (
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          viewport={{ once: true }}
        >
          {members.map((item, idx) => (
            <motion.div
              key={item._id || idx}
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-400 backdrop-blur-md bg-white/80 border border-gray-200"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <motion.img
                  src={item.image || "https://via.placeholder.com/300x200?text=Member"}
                  alt={item.mname || "Unnamed Member"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-400"></div>
              </div>

              {/* Content */}
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition">
                  {item.mname || "Unknown Member"}
                </h2>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mt-1">
                  {item.position || "No Position"}
                </p>
                <p className="text-gray-600 mt-2 text-xs leading-relaxed">
                  {item.description || "No description available."}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
