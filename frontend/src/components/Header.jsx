import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [showlogin, setShowlogin] = useState(true);

  // Check login (fix)
  const checkLogin = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setShowlogin(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // Change header opacity based on cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 60) {
        setHeaderOpacity(1); // fully visible
      } else if (!isOpen) {
        setHeaderOpacity(0.4); // lightly transparent
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  const linkClass = ({ isActive }) =>
    `inline-block px-2 py-1 font-semibold cursor-pointer rounded-2xl transition-colors ${
      isActive ? "bg-gray-800 text-white" : "text-black hover:text-cyan-900"
    }`;

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: headerOpacity }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full backdrop-blur-lg shadow-sm z-50 rounded-b-2xl transition-all duration-300"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${headerOpacity})`,
          boxShadow: headerOpacity === 1 ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-black font-mono font-medium text-2xl tracking-tight">
            Nandhavanam
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul>
              <li className="inline-block">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
              </li>
              <li className="inline-block">
                <NavLink to="/about" className={linkClass}>
                  About
                </NavLink>
              </li>
              <li className="inline-block">
                <NavLink to="/contact" className={linkClass}>
                  Contact
                </NavLink>
              </li>
              <li className="inline-block">
                <NavLink to="/gallery" className={linkClass}>
                  Members
                </NavLink>
              </li>
              <li className="inline-block">
                <NavLink to="/admission" className={linkClass}>
                  Admissions
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <button className="bg-black font-semibold text-white px-4 py-2 rounded-xl hover:bg-cyan-700">
              {showlogin ? (
                <NavLink to="/login">Login</NavLink>
              ) : (
                <NavLink to="/admin">Admin Panel</NavLink>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-slate-100 rounded-xl shadow-md mx-3 mt-16 overflow-hidden fixed top-0 left-0 right-0 z-40 backdrop-blur-md"
          >
            <ul className="flex flex-col space-y-4 text-black font-semibold p-4">
              <li>
                <NavLink
                  to="/"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gallery"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Members
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admission"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Admissions
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-black font-semibold text-white px-4 py-2 rounded-xl hover:bg-cyan-700"
                >
                  {showlogin ? (
                    <NavLink to="/login">Login</NavLink>
                  ) : (
                    <NavLink to="/admin">Admin Panel</NavLink>
                  )}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
