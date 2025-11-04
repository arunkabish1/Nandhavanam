import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages } from "lucide-react";

export default function TranslateFloatingButton() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const translateRef = useRef(null);

  // Load Google Translate script once
  useEffect(() => {
    if (window.google?.translate?.TranslateElement) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.id = "google-translate-script";
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      setReady(true);
    };
  }, []);

  // Initialize Google Translate when ready and popup is open
  useEffect(() => {
    if (ready && open && translateRef.current && !translateRef.current.hasChildNodes()) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ta,hi,ar,fr",
          layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
        },
        translateRef.current
      );
    }
  }, [ready, open]);

  return (
    <>
      {/* 🌍 Floating Translate Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[100] bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full shadow-lg p-4 hover:shadow-xl transition"
      >
        <Languages size={24} />
      </motion.button>

      {/* 🌐 Translate Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-20 right-6 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-[99] w-56"
          >
            {ready ? (
              <div ref={translateRef} id="google_translate_element" />
            ) : (
              <p className="text-sm text-gray-500 text-center">Loading...</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
