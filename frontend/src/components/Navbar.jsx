import { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { serrverUrl } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import icon from "../../public/agroIcon.png"

export default function Navbar() {
  const { user, current, setUser } = useContext(AppContext);
  const [open, setOpen] = useState(false); // mobile dropdown
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown (desktop)
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // navLinks returns array depending on user
  const navLinks = (user) => {
    if (!user) {
      return [
        { name: "Home", href: "/" },
        { name: "Login", href: "/login" },
        { name: "Signup", href: "/signup" },
      ];
    }

    return [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Pest AI", href: "/pest-ai" },
      { name: "Soil AI", href: "/soil" },
      { name: "Spectral Analysis", href: "/spectral" },
      { name: "Irrigation AI", href: "/irrigation" },
    ];
  };

  const links = navLinks(user);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
        // optionally call current() if you want to refresh context
        try { await current?.(); } catch (e) {}
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (err) {
      console.error("Logout Error:", err);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-green-300 via-gray-300 to-green-200 border-b border-green-400 backdrop-blur shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
        {/* Left: Logo */}
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => navigate("/")}
          aria-label="Go home"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-green-700 flex gap-2 items-center justify-center"
          >
            <img src={icon} className="w-8" alt="" /> SmartAgro
          </motion.div>
        </div>

        {/* Center: Nav links (desktop) */}
        <nav className="hidden md:flex flex-1 justify-center items-center">
          <ul className="flex gap-6">
            {links.map((link, i) => (
              <li key={link.href}>
                <motion.button
                  onClick={() => navigate(link.href)}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.04 }}
                  className="text-green-800 font-medium hover:text-green-900 transition px-2"
                >
                  {link.name}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Auth / Mobile toggle */}
        <div className="ml-4 flex items-center gap-3">
          {/* Desktop auth */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setProfileOpen((p) => !p)}
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-green-600 text-white font-bold"
                  aria-label="Open profile menu"
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
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className="absolute right-0 mt-3 w-44 bg-white shadow-xl rounded-xl overflow-hidden z-50"
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
                        onClick={() => {
                          navigate("/about");
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100"
                      >
                        About
                      </button>
                      <button
                        onClick={() => {
                          navigate("/contact");
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100"
                      >
                        Contact
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
                Login / Sign Up
              </motion.button>
            )}
          </div>

          {/* Mobile menu toggle - positioned on right side, fixed small-screen only */}
          <button
            className="md:hidden ml-3 pl-50 text-green-800"
            onClick={() => setOpen((s) => !s)}
            aria-label="Open mobile menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-gradient-to-br from-green-300 via-gray-300 to-green-200 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-3">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    navigate(link.href);
                    setOpen(false);
                  }}
                  className="text-left text-green-800 font-medium hover:text-green-900 py-2"
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-2 border-t border-green-200" />

              {user ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="py-2 rounded-lg shadow bg-white text-green-800"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
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
