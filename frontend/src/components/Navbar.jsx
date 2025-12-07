import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useContext } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { serrverUrl } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, current, setUser } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Plant AI", href: "/plant-ai" },
    { name: "Pest AI", href: "/pest-ai" },
    { name: "About us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${serrverUrl}/api/user/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        await current();
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-green-700"
          onClick={() => navigate("/")}
        >
          🌾 SmartAgro
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 font-medium hover:text-green-700 transition"
            >
              {link.name}
            </motion.a>
          ))}

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            Logout
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-700 font-medium hover:text-green-700"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={handleLogout}
                className="bg-green-600 text-white py-2 rounded-lg shadow"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
