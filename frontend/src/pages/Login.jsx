import { useContext, useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { serrverUrl } from "../main";
import AppContext from "../Context/AppContext";
import img1 from "../../public/agroIcon.png"

export default function Login() {
  const { setUser, current } = useContext(AppContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ FORM STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${serrverUrl}/api/user/login`, // ✅ correct backend route
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        await current();
        toast.success(data.message || "Login successful ✅");

        navigate("/"); // ✅ or /dashboard
      } else {
        toast.error(data.message || "Login failed ❌");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        {/* Title */}
       <div className="flex gap-2 items-center justify-center">
                <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
                 SmartAgro
               </h1>
               <img className="w-7" src={img1} alt="" />
              </div>
        <p className="text-center text-gray-500 mb-8">
          Login to your farmer account
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* ✅ Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <div className="relative mt-1">
              <Mail
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-green-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* ✅ Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>

            <div className="relative mt-1">
              <Lock
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-2 pl-10 pr-10 outline-none focus:ring-2 focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-green-700 cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          {/* ✅ Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* ✅ Google Button (UI Ready) */}
        <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle size={22} />
          <span className="font-medium">Login with Google</span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <span
            className="text-green-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
