import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HoverImageLinks } from "./HoverImageLinks";

export function Admission() {
  const [ready, setReady] = useState(false);

  // Ensures hydration delay to avoid flicker or skipped animations
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative min-h-screen bg-gradient-to-b from-indigo-50 via-blue-100/40 to-white pt-24 px-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="absolute w-[26rem] h-[26rem] bg-blue-400/40 rounded-full blur-3xl top-10 left-10 z-0"
          animate={{ y: [0, 60, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[30rem] h-[30rem] bg-indigo-500/40 rounded-full blur-3xl top-40 right-10 z-0"
          animate={{ y: [0, -80, 0], x: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-purple-400/40 rounded-full blur-3xl bottom-10 left-1/4 z-0"
          animate={{ y: [0, 50, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 🌿 Content */}
        <div className="relative z-10">
          {/* Header / Intro */}
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">
              Admissions & Classes
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              Building Knowledge through Culture & Language
            </p>
           
            <div className="mt-6 text-gray-600 leading-relaxed">
              <p>Join our vibrant community of Tamil learners and families.</p>
              <p className="mt-1">
                Explore our programs, meet our dedicated teachers, and grow with
                us through the joy of learning Tamil and traditional arts.
              </p>
            </div>
          </motion.div>
         <div>
        <img className="rounded-3xl items-center shadow-xl mx-auto p-4" src="https://res.cloudinary.com/delx0bz9t/image/upload/v1762617858/537726309_3968495800069589_5130353839376617639_n_nsqtaw.jpg" alt="" />
            </div>

          {/* 🌼 Admission Info Card */}
          <motion.div
            className="max-w-3xl mx-auto mt-12 bg-white/80 backdrop-blur-xl border border-blue-100 rounded-2xl shadow-xl p-8"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">
              Admission Details
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
              <li>Admissions are open for the academic year 2024–2025.</li>
              <li>
                We offer Tamil language and Silambam classes for all ages.
              </li>
              <li>
                Classes are conducted by experienced teachers focusing on
                language, culture, and traditional martial art values.
              </li>
              <li>
                Weekend classes available in multiple locations across Kuwait.
              </li>
              <li>Financial aid and scholarships for eligible students.</li>
              <li>
                For more details, contact us or fill the admission form below.
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto mt-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 rounded-2xl shadow-md p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
              Tamil Class Locations 🏫
            </h2>

            {/* Friday Classes */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
                Friday
              </h3>
              <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-center">
                {/* Mangaf */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/80 border border-blue-100 rounded-xl shadow-md"
                >
                  <img
                    src="https://scontent.fmaa2-2.fna.fbcdn.net/v/t39.30808-6/545766409_3984595488459620_2458843004921002685_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bF_R9chY97wQ7kNvwHTXlIA&_nc_oc=AdlfIlNZMaT27TTOWx08raV5hiB7wjDvYMH3rSV3OfHgOBrr87XuK1drAFh4GpAzGLZjS-R5s-kXN27K0OZkMafO&_nc_zt=23&_nc_ht=scontent.fmaa2-2.fna&_nc_gid=aesMmSM3SnRZhYnkD7IGCw&oh=00_AfjZFWTbVjgCJS7kdT1C1lJMdtFOf3gkXIcNWZBID3uH2Q&oe=690FAC08"
                    alt="Mangaf Tamil Class"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">
                    Mangaf <span className="text-blue-700">- மங்காப்</span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Weekend Batch (2 hrs)
                  </p>
                  <a
                    className="mt-3 inline-block bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition font-medium"
                    href="/contact"
                  >
                    Know More
                  </a>
                </motion.div>

                {/* Abu Halifa */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/80 border border-blue-100 rounded-xl shadow-md"
                >
                  <img
                    src="https://scontent.fmaa2-4.fna.fbcdn.net/v/t39.30808-6/550774458_3993197817599387_7561429241756067497_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=6v1NgwQhAYQQ7kNvwFeH1G0&_nc_oc=AdmBRpQ4Bfp1C06F5gZipCbPYKlCw7VbvCQw2Zdp_6A-0C9y5tfVunttJWeksZ1Y3SHMtnxyevygyw0G1xwgNonK&_nc_zt=23&_nc_ht=scontent.fmaa2-4.fna&_nc_gid=EaSlGNYajMgONN1Cl2iiuA&oh=00_Afin5Jv0NCjbdE9pxpjJ4xyLZ62w_ECQALSKgprRI6lJoA&oe=690FC7B6"
                    alt="Abu Halifa Tamil Class"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />

                  <h4 className="text-lg font-semibold text-gray-800">
                    Abu Halifa <span className="text-blue-700">- அபுகலிபா</span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Weekend Batch (2 hrs)
                  </p>
                  <a
                    className="mt-3 inline-block bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition font-medium"
                    href="/contact"
                  >
                    Know More
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Saturday Classes */}
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
                Saturday
              </h3>
              <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-center">
                {/* Salmiya */}

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/80 border border-blue-100 rounded-xl shadow-md"
                >
                  <img
                    src="https://scontent.fmaa2-3.fna.fbcdn.net/v/t39.30808-6/547151790_3984595761792926_4438388912605419073_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=GrgHLe9ePr0Q7kNvwHvZuKj&_nc_oc=AdmHHJTsernPc2w1s0OifHCI9NpOu0zCEWLoyIGfNNjyy24nUNH8rPEESleOkwUVpGz1ZEH5gLI1Ri_aaQ3C_8NK&_nc_zt=23&_nc_ht=scontent.fmaa2-3.fna&_nc_gid=DAugEKKFdmdOxu1Rx16tCA&oh=00_AfgalIAU_vH6N3qWcRirG--IP3IdEF31Ui_e9Nw_4seztw&oe=690FBF8E"
                    alt="Salmiya Tamil Class"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">
                    Salmiya <span className="text-blue-700">- சால்மியா</span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    2-hour class sessions
                  </p>
                  <a
                    className="mt-3 inline-block bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition font-medium"
                    href="/contact"
                  >
                    Know More
                  </a>
                </motion.div>

                {/* Abbasiya */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/80 border border-blue-100 rounded-xl shadow-md"
                >
                  <img
                    src="https://scontent.fmaa2-2.fna.fbcdn.net/v/t39.30808-6/502526175_3891098774475959_4186534492424341966_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cNcpL3VyMYYQ7kNvwGWouh_&_nc_oc=AdmAOaNexCYZnmUWLPYrxta1Ydgjmnb6heHg8Ei1_OkKOObIVHANEp3dhGxdazKrR0eYdo91dlT_Wn0OV05WIn8w&_nc_zt=23&_nc_ht=scontent.fmaa2-2.fna&_nc_gid=_ytymV1XB0IcqIS5gRwJMQ&oh=00_AfjnSm8rF6rPhu5UTgQG8_KahSqHEHglp8OI3VTWzUFUGw&oe=690FB066"
                    alt="Abbasiya Tamil Class"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">
                    Abbasiya <span className="text-blue-700">- அப்பாசியா</span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    2-hour class sessions
                  </p>
                  <a
                    className="mt-3 inline-block bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition font-medium"
                    href="/contact"
                  >
                    Know More
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 🥋 Silambam Classes Section */}
          <motion.div
            className="max-w-5xl mx-auto mt-16 bg-gradient-to-tr from-indigo-50 via-white to-blue-50 border border-blue-100 rounded-2xl shadow-md p-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
              Silambam Classes 🥋{" "}
              <span className="text-gray-700">சிலம்பம் வகுப்புகள்</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
              {[
                "https://www.roots.gov.sg/-/media/Roots/ich/ich-article-images/silambam/8-process_mvi-106_curavali-sutthal.ashx",
              ].map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/80 border border-blue-100 rounded-xl shadow-md"
                >
                  <img
                    src={img}
                    alt="Silambam Class"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">
                    Silambam <span className="text-blue-700">- சிலம்பம்</span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Traditional Tamil martial art classes (2 hrs)
                  </p>
                  <a
                    className="mt-3 inline-block bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition font-medium"
                    href="/contact"
                  >
                    Know More
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 🌟 CTA Button */}
          <motion.div
            className="flex justify-center my-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.a
              href="https://forms.office.com/r/RASMjnfssF?origin=lprLink"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white px-10 py-4 rounded-full shadow-lg 
                         font-semibold text-lg tracking-wide"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#1e3a8a",
                boxShadow: "0px 0px 25px rgba(30,58,138,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Fill Admission Form
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
      <HoverImageLinks/>
    </AnimatePresence>
    
  );
}
