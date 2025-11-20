import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogIn, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showlogin, setShowlogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setShowlogin(false);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Members", path: "/gallery" },
    { name: "Teachers", path: "/teacher" },
    { name: "Admissions", path: "/admission" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 bg-slate-900/80 backdrop-blur-xl shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

          {/* LOGO */}
          <a href="/" className="flex items-center gap-3">
            <motion.img
              src={logo}
              alt="Logo"
              className="h-12 w-12 rounded-full border border-white/20 object-cover shadow-md"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
            />

            <motion.h1
              className="font-poppins text-2xl font-extrabold tracking-tight text-white"
              whileHover={{ x: 3 }}
            >
              நந்தவனம்
            </motion.h1>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden gap-10 lg:flex">
            {navItems.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  [
                    "relative font-medium tracking-wide transition text-white/90 hover:text-blue-400",
                    isActive && "text-blue-400",
                  ].join(" ")
                }
              >
                {({ isActive }) =>
                  isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-blue-500"
                    />
                  )
                }
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* DESKTOP LOGIN */}
          <div className="hidden lg:flex">
            <NavLink
              to={showlogin ? "/login" : "/admin"}
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-2.5 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              {showlogin ? "Login" : "Admin Panel"}
            </NavLink>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg border border-white/20 bg-white/10 p-2 text-yellow-300 transition hover:bg-white/20 lg:hidden"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 rounded-b-2xl border-b border-slate-300/50 bg-white/80 backdrop-blur-xl shadow-xl lg:hidden"
          >
            <ul className="flex flex-col items-center gap-3 py-6 font-semibold text-gray-900">

              {navItems.map((link) => (
                <li key={link.name} className="w-full text-center">
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="inline-block w-4/5 rounded-xl py-3 transition hover:bg-blue-600 hover:text-white"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {/* LOGIN / ADMIN BUTTON */}
              <li className="w-full text-center">
                <NavLink
                  to={showlogin ? "/login" : "/admin"}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex w-4/5 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 py-3 font-semibold text-white shadow-md transition hover:scale-105"
                >
                  {showlogin ? <LogIn size={18} /> : <Settings size={18} />}
                  {showlogin ? "Login" : "Admin Panel"}
                </NavLink>
              </li>

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
