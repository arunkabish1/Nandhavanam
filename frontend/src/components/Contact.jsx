import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import React, { useRef, useState } from "react";
import Modal from "./Modal.jsx";

export default function Contact() {
  const [isopen, setIsopen] = useState(false);
  const form = useRef();
  const [Loading, setLoading] = useState(false);

  const toggleModal = () => {
    setIsopen(true);
    setTimeout(() => {
      setIsopen(false);
    }, 3000);
  };

  const resetDetails = () => {
    form.current.reset();
  };

  const sentEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("user_name"),
      email: formData.get("user_email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("https://nandhavanam-backend.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setLoading(false);
      if (res.ok) {
        toggleModal();
        resetDetails();
      } else {
        console.error("Failed to send");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-white flex flex-col items-center justify-center py-16 px-4">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-600 font-serif tracking-wide">
          Get in Touch
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-xl mx-auto">
          Have a question, feedback, or just want to say hello? Fill in the form
          below and I’ll get back to you shortly.
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-8 mb-10">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-pink-500 text-3xl transition-transform transform hover:scale-110"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-400 text-3xl transition-transform transform hover:scale-110"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 text-3xl transition-transform transform hover:scale-110"
        >
          <FaFacebook />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-red-600 text-3xl transition-transform transform hover:scale-110"
        >
          <FaYoutube />
        </a>
        {isopen && <Modal />}
      </div>

      {/* Contact Form */}
      <form
        ref={form}
        onSubmit={sentEmail}
        className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-lg border border-gray-100"
      >
        {/* Name */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
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

        {/* Email */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
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
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
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

        {/* Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            type="submit"
          >
            {Loading ? "Sending..." : "Send Message"}
          </button>
          <button
            className="bg-gray-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-500 transition-transform transform hover:scale-105"
            onClick={resetDetails}
            type="reset"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-600 text-sm">
        <p>
          Made with ❤️ | Developed by{" "}
          <span className="font-semibold text-blue-600">Arun J</span>
        </p>
      </div>
    </div>
  );
}
