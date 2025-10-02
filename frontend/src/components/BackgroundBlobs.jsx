import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <>
      <motion.div
        className="absolute w-96 h-96 bg-blue-400/40 rounded-full blur-3xl -top-20 -left-20"
        animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[30rem] h-[30rem] bg-indigo-400/30 rounded-full blur-3xl top-40 -right-20"
        animate={{ y: [0, -80, 0], x: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-purple-400/30 rounded-full blur-3xl bottom-10 left-1/4"
        animate={{ y: [0, 50, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
