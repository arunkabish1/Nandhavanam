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
      .then((data) => setMembers(Array.isArray(data) ? data : []))
      .catch(() => setError("Could not load members"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-blue-50/60 to-white pt-24 px-6 overflow-hidden">
      <BackgroundBlobs />

      {/* Title */}
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-12 drop-shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Executive <span className="text-blue-600">Committee</span>
      </motion.h1>

      {/* Loading / Error */}
      {loading && (
        <p className="text-center text-gray-500 text-lg animate-pulse">
          Loading members…
        </p>
      )}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {/* Cards */}
      {!loading && !error && (
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
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
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-md bg-white/70 border border-blue-100"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center bg-blue-100/20">
                <motion.img
                  src={item.image || "https://via.placeholder.com/300x200?text=Member"}
                  alt={item.mname || "Unnamed Member"}
                  className="object-contain w-[90%] h-[90%] transition-transform duration-700 group-hover:scale-105 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition">
                  {item.mname || "Unknown Member"}
                </h2>
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mt-2">
                  {item.position || "No Position"}
                </p>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed italic">
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
