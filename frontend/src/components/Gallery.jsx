import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackgroundBlobs from "./BackgroundBlobs";
import Footer from "./Footer";

export default function Gallery() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/members`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch members");
        return res.json();
      })
      .then((data) => setMembers(Array.isArray(data) ? data : []))
      .catch(() => setError("Could not load members"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-white via-blue-50 to-slate-100 pt-24 px-6 overflow-hidden">

        {/* Floating blobs like Homepage */}
        <BackgroundBlobs />

        {/* Page Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center text-slate-900 mb-16 tracking-tight"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Executive <span className="text-blue-700">Committee</span>
        </motion.h1>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500 text-lg animate-pulse">
            Loading members…
          </p>
        )}

        {/* Error */}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        {/* Members Grid */}
        {!loading && !error && (
          <motion.div
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 },
              },
            }}
            viewport={{ once: true }}
          >
            {members.map((item, idx) => (
              <motion.div
                key={item._id || idx}
                className="group relative rounded-2xl overflow-hidden bg-white/80 backdrop-blur-xl 
                shadow-md hover:shadow-xl border border-slate-200 transition-all duration-500"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/4] overflow-hidden bg-blue-50">
  <motion.img
    src={item.image || "https://via.placeholder.com/300x200?text=Member"}
    alt={item.mname || "Unnamed Member"}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
</div>


                {/* Card Content */}
                <div className="p-6 text-center">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition">
                    {item.mname || "Unknown Member"}
                  </h2>

                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mt-2">
                    {item.position || "No Position"}
                  </p>

                  <p className="text-gray-600 mt-3 text-sm leading-relaxed italic line-clamp-3">
                    {item.description || "No description available."}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Hover Link Images Bottom Section */}
     <Footer/>
    </>
  );
}
