import { motion } from "framer-motion";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

 const checkLogin = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try{
    setLoading(true);
    const response = await fetch("https://api.nfakuwait.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }); 

    const data = await response.json();
    console.log(data);
    if (data) {
      alert("Login successful!");
localStorage.setItem("authToken", data.user?._id);

      window.location.href = "/admin";
    } 
  } catch (error) {
    console.log(`${import.meta.env.VITE_API_URL}`);
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  } finally {
    setLoading(false);  
  }

  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-gray-200"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h2
          className="text-3xl font-bold text-blue-800 text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Login
        </motion.h2>

        {/* Form */}
        <motion.form
          onSubmit={checkLogin}
          method="post"
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Email */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <motion.input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <motion.input
              type="password"
              name="password"
              id="password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold shadow text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            whileHover={!loading ? { scale: 1.05, y: -2 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            {loading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </motion.button>
        </motion.form>

        {/* Extra Links */}
        <motion.p
          className="text-sm text-gray-600 text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
