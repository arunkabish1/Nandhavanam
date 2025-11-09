import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogIn, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showlogin, setShowlogin] = useState(true);

  // ✅ Check login token
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setShowlogin(false);
  }, []);

  return (
    <>
      {/* 🌟 HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-lg shadow-md z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          {/* 🔰 Logo Section */}
          <a href="/" className="flex items-center gap-3 cursor-pointer select-none">
            <img
              src={logo}
              alt="Nandhavanam Logo"
              className="h-10 w-10 rounded-full object-cover shadow-sm"
            />
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight font-[Poppins]">
              நந்தவனம்
            </h1>
          </a>

          {/* 🧭 Desktop Navigation (only visible ≥1024px) */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-8 text-gray-800 font-semibold">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Members", path: "/gallery" },
                { name: "Teachers", path: "/teacher" },
                { name: "Admissions", path: "/admission" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `transition-all duration-200 hover:text-blue-600 ${
                        isActive
                          ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                          : ""
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* 💼 Desktop Login/Admin (≥1024px) */}
          <div className="hidden lg:flex items-center gap-4">
            <NavLink
              to={showlogin ? "/login" : "/admin"}
              className="px-5 py-2.5 rounded-full font-semibold bg-gradient-to-r from-blue-700 to-indigo-700 text-white hover:from-indigo-700 hover:to-blue-700 transition-transform hover:scale-105 shadow-sm"
            >
              {showlogin ? "Login" : "Admin Panel"}
            </NavLink>
          </div>

          {/* 📱 Mobile + Tablet Menu Button (<1024px) */}
          <button
            className="lg:hidden text-gray-800 p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* 📱 Mobile/Tablet Dropdown (≤1023px) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-md fixed top-16 left-0 right-0 z-40 rounded-b-2xl overflow-hidden"
          >
            <ul className="flex flex-col items-center space-y-4 text-gray-800 font-semibold py-6">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Members", path: "/gallery" },
                { name: "Teachers", path: "/teacher" },
                { name: "Admissions", path: "/admission" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name} className="w-full text-center">
                  <NavLink
                    to={link.path}
                    className="inline-block w-4/5 py-2 rounded-xl transition-all hover:bg-blue-600 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {/* 🔐 Login / Admin Button */}
              <li className="w-full flex justify-center mt-2">
                <NavLink
                  to={showlogin ? "/login" : "/admin"}
                  onClick={() => setIsOpen(false)}
                  className="w-4/5 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-5 py-2 rounded-full font-semibold hover:from-indigo-700 hover:to-blue-700 transition"
                >
                  {showlogin ? (
                    <>
                    <LogIn size={18} /> Login
                    </>
                  ) : (
                    <>
                    <Settings size={18} /> Admin Panel
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
