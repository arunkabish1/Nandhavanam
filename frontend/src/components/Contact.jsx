import React, { useRef, useState } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import Modal from "./Modal.jsx";
import logo from "../assets/logo.png";
export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const toggleModal = () => {
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
  };

  const resetDetails = () => {
    form.current.reset();
    setErrorMsg(null);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const formData = new FormData(form.current);
    const data = {
      name: formData.get("user_name"),
      email: formData.get("user_email"),
      mobile: formData.get("mobile"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      setLoading(false);

      if (res.ok) {
        toggleModal();
        resetDetails();
      } else {
        setErrorMsg("Failed to send message. Please try again later.");
      }
    } catch (error) {
      setLoading(false);
      if (error.name === "AbortError")
        setErrorMsg("Server is taking too long to respond. Try again later.");
      else setErrorMsg("An error occurred. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen pt-10 flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* LEFT PANEL */}
      <div className="relative flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-900 text-white p-10 overflow-hidden">
        {/* Floating gradient blob */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)]"></div>

        <div className="relative z-10 max-w-md space-y-6">
          <img
            src={logo}
            className="rounded-full mx-auto border-4 border-white shadow-lg w-40 h-40 object-cover"
            alt="Nandhavanam Logo"
          />
          <h1 className="text-5xl font-extrabold tracking-wide mt-4">
            Contact Us
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed mt-3">
            We’d love to hear from you! Whether you have questions, suggestions,
            or just want to say hi, drop us a message anytime.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-8 mt-8 text-3xl">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-300 hover:text-white transition-transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-white transition-transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-white transition-transform hover:scale-110"
            >
              <FaYoutube />
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center mt-10 space-y-2">
            <p className="text-blue-100 text-sm">OR</p>
            <a
              href="tel:+96566693181"
              className="flex items-center space-x-2 text-blue-100 hover:text-white transition-transform hover:scale-105"
            >
              <FaPhoneAlt className="text-lg" />
              <span>Call us at +965 6669 3181</span>
            </a>
          </div>

          <p className="text-sm text-blue-200 mt-12">
            © {new Date().getFullYear()} Nandhavanam
          </p>
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex-1 flex justify-center items-center py-20 px-6 relative">
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-2xl border border-blue-100 rounded-3xl shadow-2xl p-10 transition-all duration-500 hover:shadow-blue-200">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
            Send us a Message 💌
          </h2>

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                id="name"
                name="user_name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="mobile"
              >
                Mobile Number
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="+965 1234 5678"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                id="email"
                name="user_email"
                type="email"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                id="message"
                name="message"
                rows="5"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-red-500 text-sm text-center">{errorMsg}</p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-full font-semibold text-white text-lg transition-transform ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 hover:shadow-lg"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

            {/* Reset */}
            <div className="flex justify-center mt-4">
              <button
                onClick={resetDetails}
                type="reset"
                className="text-gray-500 text-sm hover:text-gray-700 transition"
              >
                Reset Form
              </button>
            </div>
          </form>

          {isOpen && <Modal />}
        </div>
      </div>
    </div>
  );
}
