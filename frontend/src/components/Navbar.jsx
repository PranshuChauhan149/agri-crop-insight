import { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { serrverUrl } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, current, setUser } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Plant AI", href: "/plant-ai" },
    { name: "Pest AI", href: "/pest-ai" },
    { name: "About us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // ✅ Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${serrverUrl}/api/user/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(null);
        navigate("/login");
        await current();
        toast.success(res.data.message);
        setOpen(false); // ✅ CLOSE MOBILE MENU
      }
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ✅ LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-green-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          🌾 SmartAgro
        </motion.div>

        {/* ✅ DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.name}
              onClick={() => navigate(link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 font-medium hover:text-green-700 transition"
            >
              {link.name}
            </motion.button>
          ))}

          {/* ✅ USER / LOGIN */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-green-600 text-white font-bold"
              >
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0).toUpperCase()
                )}
              </motion.div>

              {/* ✅ DROPDOWN */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-44 bg-white shadow-xl rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.05 }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
            >
              Sign Up
            </motion.button>
          )}
        </nav>

        {/* ✅ MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ✅ MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-4">
              {/* ✅ MOBILE LINKS (FIXED CLOSE ISSUE) */}
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    navigate(link.href);
                    setOpen(false); // ✅ CLOSE MENU
                  }}
                  className="text-left text-gray-700 font-medium hover:text-green-700"
                >
                  {link.name}
                </button>
              ))}

              {/* ✅ MOBILE USER ACTIONS */}
              {user ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="py-2 rounded-lg shadow"
                  >
                    Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-2 rounded-lg shadow"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="bg-green-600 text-white py-2 rounded-lg shadow"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
