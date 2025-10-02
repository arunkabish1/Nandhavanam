import { motion } from "framer-motion";

export function Admission() {
  return (
    <div className="relative bg-gradient-to-b min-h-screen from-blue-50 to-white pt-20 px-6 overflow-hidden">
      {/* 🌟 Floating Background Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-400/60 rounded-full blur-3xl top-10 left-10"
        animate={{ y: [0, 60, 0], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[28rem] h-[28rem] bg-indigo-500/50 rounded-full blur-3xl top-40 right-10"
        animate={{ y: [0, -80, 0], x: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-purple-400/50 rounded-full blur-3xl bottom-10 left-1/4"
        animate={{ y: [0, 50, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative">
        {/* Intro Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xl font-semibold text-gray-800">
            Want to Know About the Admissions?
          </p>
          <p className="text-lg font-semibold mt-2 text-gray-700">
            Yes, you are at{" "}
            <span className="text-blue-800 font-PPPangram text-3xl">Correct</span>{" "}
            Place..!
          </p>
          <div className="mt-6 space-y-2 text-gray-600 font-baloo">
            <p>Come visit our friendly team at one of our offices.</p>
            <p>
              We are here to help you with the admission process and answer any
              questions you may have.
            </p>
            <p>We look forward to welcoming you to our school community!</p>
          </div>
        </motion.div>

        {/* Admission Details Card */}
        <motion.div
          className="max-w-3xl mx-auto mt-10 bg-white border rounded-2xl shadow-lg p-8 relative"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">
            Admission Details
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
            <li>Admissions are open for the academic year 2024-2025.</li>
            <li>We offer admissions for students from Kindergarten to Grade 12.</li>
            <li>
              Our school follows a holistic approach to education, focusing on
              academic excellence and extracurricular activities.
            </li>
            <li>
              We have a dedicated team of experienced teachers and staff to
              support our students' growth and development.
            </li>
            <li>Financial aid and scholarships are available for eligible students.</li>
            <li>
              For more information, please contact us by filling the form below
              or visiting our school office during working hours.
            </li>
          </ul>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center m-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://forms.gle/3y3b8pX9mYk7y2ZK6"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-800 text-white px-8 py-3 rounded-full shadow-lg 
                       font-semibold text-lg"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#1e3a8a",
              boxShadow: "0px 0px 20px rgba(30,58,138,0.7)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Fill Admission Form
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
