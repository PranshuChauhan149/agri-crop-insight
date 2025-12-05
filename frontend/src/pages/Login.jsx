import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const serverUrl = "http://localhost:4000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/login`,
        form,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Login Successful!");
        navigate("/"); // Redirect to home
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE - LOGIN FORM */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-10 md:p-14 flex flex-col justify-center"
        >
          {/* Logo */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg text-xl font-extrabold text-white">
              AG
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
              Welcome Back
            </h1>
          </div>

          {/* Form */}
          <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>

            {/* Email */}
            <div>
              <label className="text-gray-600 mb-1 block font-medium text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:border-green-600 outline-none py-2 text-gray-800 placeholder-gray-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-600 mb-1 block font-medium text-sm">
                Password
              </label>

              <div className="relative">
                <input
                  type={viewPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 focus:border-green-600 outline-none py-2 text-gray-800 placeholder-gray-400 transition"
                />

                {/* Eye Toggle */}
                <button
                  type="button"
                  onClick={() => setViewPassword(!viewPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {viewPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19.5c-5.25 
                      0-9.4-3.14-11-7.5C2.127 9.18 4.66 6.936 
                      7.623 5.963M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 
                      5c4.477 0 8.268 2.943 9.542 7-1.274 
                      4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a className="text-sm text-green-700 hover:underline cursor-pointer">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition-transform active:scale-95"
            >
              Login
            </button>
          </form>

          {/* Create account */}
          <p className="text-center mt-6 text-gray-500 text-sm">
            Don’t have an account?
            <span
              className="text-green-700 font-semibold ml-1 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Create account
            </span>
          </p>
        </motion.div>

        {/* RIGHT SIDE — IMAGE / AD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="hidden md:flex items-center justify-center bg-gradient-to-br from-yellow-50 to-green-50 p-10 relative"
        >
          <div className="w-10/12 h-80 bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-gray-400 text-lg">
            <p>Your Ad / Image</p>
            <p className="text-sm mt-1">Replace this area</p>
          </div>

          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-200 rounded-full blur-xl opacity-40"></div>
        </motion.div>

      </div>
    </div>
  );
}
