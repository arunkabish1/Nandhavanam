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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
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
        setErrorMsg("Server response timed out. Try again later.");
      else setErrorMsg("An error occurred. Please check your connection.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-blue-50 to-slate-100 pt-24 pb-16 px-6 overflow-hidden">

      {/* 🫧 Background Blobs */}
      <div className="absolute w-[26rem] h-[26rem] bg-blue-200/30 rounded-full blur-3xl top-10 left-6 animate-[float_10s_ease-in-out_infinite]"></div>
      <div className="absolute w-[30rem] h-[30rem] bg-yellow-200/40 rounded-full blur-3xl bottom-20 right-10 animate-[float_12s_ease-in-out_infinite]"></div>

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <img
          src={logo}
          className="rounded-full w-32 h-32 mx-auto mb-5 shadow-xl border-4 border-white"
          alt="Nandhavanam Logo"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-700 text-lg max-w-xl mx-auto">
          We’d love to hear from you! For questions, suggestions or support,
          just drop us a message below.
        </p>
      </div>

      {/* Main Content */}
      <div className="mt-16 grid md:grid-cols-2 gap-12 max-w-6xl mx-auto relative z-10">

        {/* LEFT SECTION - Social + Contact */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-lg p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Connect With Us
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Stay updated with the latest events, announcements, and activities
              of the Nandhavanam Tamil Family Association.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-6 text-3xl mt-8">
              <a
                href="https://instagram.com/"
                target="_blank"
                className="text-pink-500 hover:text-pink-600 transition transform hover:scale-110"
              >
                <FaInstagram />
              </a>

              <a
                href="https://facebook.com/"
                target="_blank"
                className="text-blue-500 hover:text-blue-600 transition transform hover:scale-110"
              >
                <FaFacebook />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                className="text-sky-500 hover:text-sky-600 transition transform hover:scale-110"
              >
                <FaTwitter />
              </a>

              <a
                href="https://youtube.com/"
                target="_blank"
                className="text-red-500 hover:text-red-600 transition transform hover:scale-110"
              >
                <FaYoutube />
              </a>
            </div>

            <div className="mt-10">
              <a
                href="tel:+96566693181"
                className="flex items-center gap-3 text-blue-700 hover:text-blue-900 transition"
              >
                <FaPhoneAlt className="text-lg" />
                <span className="font-semibold">+965 6669 3181</span>
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-12">
            © {new Date().getFullYear()} Nandhavanam – All Rights Reserved
          </p>
        </div>

        {/* RIGHT SECTION - Contact Form */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl rounded-3xl p-10">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
            Send us a Message 💌
          </h2>

          <form ref={form} onSubmit={sendEmail} className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="user_name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                name="mobile"
                type="tel"
                required
                placeholder="+965 1234 5678"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                name="user_email"
                type="email"
                required
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm text-center">{errorMsg}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full font-semibold text-white text-lg transition 
                ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 hover:shadow-lg"
                }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* Reset */}
            <button
              type="reset"
              onClick={resetDetails}
              className="w-full text-center text-gray-600 mt-4 hover:text-gray-800"
            >
              Reset Form
            </button>
          </form>

          {isOpen && <Modal />}
        </div>
      </div>
    </div>
  );
}
