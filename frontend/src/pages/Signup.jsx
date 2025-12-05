import React, { useState } from "react";
import { IoIosEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const serverUrl = "http://localhost:4000";

const SignUp = () => {
  const primaryColr = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); 
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !mobile) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverUrl}/api/auth/register`,
        { name, email, password }, // backend accepts only these
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Account created successfully!");

        setName("");
        setEmail("");
        setMobile("");
        setPassword("");

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          name: result.user.displayName,
          email: result.user.email,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Google Login Successful!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColr }}>
          Vingo
        </h1>

        <p className="text-gray-600 font-bold mb-8">
          Create your account to get started with delicious food deliveries
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your Full Name"
              className="w-full border rounded-lg px-3 py-2"
              style={{ border: `1px solid ${borderColor}` }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your Email"
              className="w-full border rounded-lg px-3 py-2"
              style={{ border: `1px solid ${borderColor}` }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Mobile
            </label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="text"
              placeholder="Enter your mobile number"
              className="w-full border rounded-lg px-3 py-2"
              style={{ border: `1px solid ${borderColor}` }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-3 py-2"
                style={{ border: `1px solid ${borderColor}` }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[14px] text-gray-500"
              >
                {showPassword ? <IoIosEyeOff /> : <IoEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold flex items-center justify-center py-2 rounded-lg 
            bg-[#ff4d2d] text-white transition-all duration-200 hover:bg-[#e64323] hover:scale-105 shadow-md"
          >
            {loading ? <ClipLoader size={20} /> : "Sign Up"}
          </button>
        </form>

        <button
          onClick={handleGoogleAuth}
          type="button"
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 
          transition duration-200 border-gray-400 hover:bg-gray-200"
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-[#ff4d2d] font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
