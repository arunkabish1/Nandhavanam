import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "./Footer";

export function Admission() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!ready)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-blue-700 text-lg font-semibold">
        Loading Admissions...
      </div>
    );

  return (<>
    <AnimatePresence mode="wait">
      <motion.div
        className="relative min-h-screen bg-gradient-to-b from-white via-blue-50 to-slate-100 pt-24 px-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* 🔵 Brand Blobs - Cleaner & More Consistent */}
        <motion.div
          className="absolute w-[26rem] h-[26rem] bg-blue-300/30 rounded-full blur-3xl top-10 left-10"
          animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[28rem] h-[28rem] bg-yellow-300/30 rounded-full blur-3xl top-1/3 right-10"
          animate={{ y: [0, -50, 0], x: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 🌿 Content Wrapper */}
        <div className="relative z-10 max-w-6xl mx-auto">

          {/* HEADER */}
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Admissions & Classes
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              Building Knowledge through Culture & Language
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Join our vibrant Tamil learning community.  
              Discover programs, meet our teachers, and grow with us.
            </p>
          </motion.div>

          {/* HEADER IMAGE */}
          <img
            className="rounded-3xl shadow-xl w-full max-w-3xl mx-auto mt-10 object-cover"
            src="https://res.cloudinary.com/delx0bz9t/image/upload/v1762617858/537726309_3968495800069589_5130353839376617639_n_nsqtaw.jpg"
            alt="Admission"
          />

          {/* ADMISSION DETAILS */}
          <motion.div
            className="max-w-3xl mx-auto mt-14 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg p-8"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl text-center font-bold text-blue-700 mb-6">
              Admission Details
            </h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed">
              <li>Admissions open for academic year 2024–2025.</li>
              <li>Tamil & Silambam classes for all age groups.</li>
              <li>Certified teachers with cultural and linguistic expertise.</li>
              <li>Weekend classes available across multiple locations.</li>
              <li>Scholarships & financial aid available for eligible students.</li>
              <li>Fill the admission form or contact us for more info.</li>
            </ul>
          </motion.div>

          {/* CLASS LOCATIONS */}
          <motion.div
            className="max-w-5xl mx-auto mt-20 bg-white/70 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-md p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-center text-slate-900 mb-10">
              Tamil Class Locations 🏫
            </h2>

            {/* DAY SECTIONS */}
            {[
              {
                day: "Friday",
                centers: [
                  {
                    name: "Mangaf",
                    tamil: "மங்காப்",
                    img: "https://scontent.fmaa2-2.fna.fbcdn.net/v/t39.30808-6/545766409_3984595488459620_2458843004921002685_n.jpg",
                  },
                  {
                    name: "Abu Halifa",
                    tamil: "அபுகலிபா",
                    img: "https://scontent.fmaa2-4.fna.fbcdn.net/v/t39.30808-6/550774458_3993197817599387_7561429241756067497_n.jpg",
                  },
                ],
              },
              {
                day: "Saturday",
                centers: [
                  {
                    name: "Salmiya",
                    tamil: "சால்மியா",
                    img: "",
                  },
                  {
                    name: "Abbasiya",
                    tamil: "அப்பாசியா",
                    img: "https://scontent.fmaa2-2.fna.fbcdn.net/v/t39.30808-6/545766409_3984595488459620_2458843004921002685_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bF_R9chY97wQ7kNvwHTXlIA&_nc_oc=AdlfIlNZMaT27TTOWx08raV5hiB7wjDvYMH3rSV3OfHgOBrr87XuK1drAFh4GpAzGLZjS-R5s-kXN27K0OZkMafO&_nc_zt=23&_nc_ht=scontent.fmaa2-2.fna&_nc_gid=aesMmSM3SnRZhYnkD7IGCw&oh=00_AfjZFWTbVjgCJS7kdT1C1lJMdtFOf3gkXIcNWZBID3uH2Q&oe=690FAC08",
                  },
                ],
              },
            ].map((section, i) => (
              <div key={i} className="mb-16">
                <h3 className="text-xl font-semibold text-blue-700 mb-6 text-center">
                  {section.day}
                </h3>

                <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {section.centers.map((center, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ scale: 1.05 }}
                      className="p-6 bg-white/80 border border-slate-200 rounded-xl shadow-md"
                    >
                      <img
                        src={center.img}
                        className="w-full h-44 object-cover rounded-lg mb-4"
                        alt={center.name}
                      />

                      <h4 className="text-lg font-semibold text-gray-800">
                        {center.name}{" "}
                        <span className="text-blue-700">- {center.tamil}</span>
                      </h4>

                      <p className="text-sm text-gray-600 mt-1">
                        Weekend Batch (2 hrs)
                      </p>

                      <a
                        href="/contact"
                        className="mt-3 inline-block bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition font-medium"
                      >
                        Know More
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* SILAMBAM SECTION */}
          <motion.div
            className="max-w-5xl mx-auto mt-20 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-md p-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-10">
              Silambam Classes 🥋  
              <span className="text-gray-700"> சிலம்பம் வகுப்புகள்</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/80 border border-slate-200 rounded-xl shadow-md"
              >
                <img
                  src="https://www.roots.gov.sg/-/media/Roots/ich/ich-article-images/silambam/8-process_mvi-106_curavali-sutthal.ashx"
                  alt="Silambam"
                  className="w-full h-44 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-800">
                  Silambam <span className="text-blue-700">- சிலம்பம்</span>
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Traditional Tamil martial art (2 hrs)
                </p>
                <a
                  href="/contact"
                  className="mt-3 inline-block bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition font-medium"
                >
                  Know More
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex justify-center my-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://forms.office.com/r/RASMjnfssF?origin=lprLink"
              target="_blank"
              className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-10 py-4 rounded-full shadow-xl font-semibold text-lg"
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 18px rgba(29,78,216,0.5)",
              }}
            >
              Fill Admission Form
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

    </AnimatePresence>
    <Footer/>
    </>
  );
}
