import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showlogin, setShowlogin] = useState(true);

  const checkLogin = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      showlogin(false);
    }
  };

  // Show header only when cursor is near top
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 60) {
        setShowHeader(true);
      } else if (!isOpen) {
        setShowHeader(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  // Common class generator for NavLink
  const linkClass = ({ isActive }) =>
    `inline-block px-2 py-1 font-semibold cursor-pointer rounded-2xl transition-colors ${
      isActive ? "bg-gray-700 text-white" : "text-black hover:text-cyan-900"
    }`;

  return (
    <>
      {/* Main Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={
          showHeader || isOpen ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50 rounded-b-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-black font-mono font-medium text-2xl">
            Nandavanam
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
                  Gallery
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
                <NavLink to="/admin">Admin Panel</NavLink>
              ) : (
                <NavLink to="/login">Login</NavLink>
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

      {/* Mobile Nav Dropdown with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-gray-100 rounded-xl shadow-md mx-3 mt-16 overflow-hidden fixed top-12 left-0 right-0 z-40"
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
                  Gallery
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
                <NavLink to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-black font-semibold text-white px-4 py-2 rounded-xl hover:bg-cyan-700">
                    {showlogin ? (
                      <NavLink to="/admin">Admin Panel</NavLink>
                    ) : (
                      <NavLink to="/login">Login</NavLink>
                    )}
                  </button>
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
