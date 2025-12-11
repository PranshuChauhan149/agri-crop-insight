import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  CloudRain,
  FileText,
  Activity,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * SlideBar (collapsible sidebar with icons)
 *
 * Usage:
 * <SlideBar onNavigate={(key) => console.log(key)} />
 *
 * Props:
 *  - onNavigate(key)    called when an item is clicked (key is string)
 *  - initialOpen = true | false
 *
 * Behavior:
 *  - Small screens: overlays and slides from left
 *  - Large screens: collapsible vertical bar (icons only when collapsed)
 *  - Shows tooltip label on hover when collapsed
 *  - Uses same green theme as SmartAgro
 */

const ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { key: "weather", label: "Weather", icon: <CloudRain size={18} /> },
  { key: "reports", label: "Reports", icon: <FileText size={18} /> },
  { key: "ai", label: "AI Tools", icon: <Activity size={18} /> },
  { key: "settings", label: "Settings", icon: <Settings size={18} /> },
  { key: "profile", label: "Profile", icon: <User size={18} /> },
  { key: "logout", label: "Logout", icon: <LogOut size={18} /> },
];

export default function SlideBar({ onNavigate, initialOpen = true }) {
  const [open, setOpen] = useState(Boolean(initialOpen));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (key) => {
    if (onNavigate) onNavigate(key);
    // if mobile, close after navigation
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden  fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 bg-white rounded-full shadow text-green-700"
          aria-label="Open menu"
        >
          <Home size={18} />
        </button>
      </div>

      {/* Desktop collapsed toggle */}
      <div className="hidden md:flex fixed left-6 top-6 z-40">
        <button
          onClick={() => setOpen((s) => !s)}
          className="flex items-center justify-center p-2 bg-white rounded-full shadow text-green-700"
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed inset-y-0 left-0 w-72 bg-gradient-to-br from-green-300 via-gray-300 to-green-200 shadow-xl z-50 p-4"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-bold text-green-800">🌾 SmartAgro</div>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded bg-white text-green-700">
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {ITEMS.map((it) => (
                <button
                  key={it.key}
                  onClick={() => handleClick(it.key)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/60 transition text-green-800 font-medium"
                >
                  <span className="w-6 h-6 flex items-center justify-center">{it.icon}</span>
                  <span>{it.label}</span>
                </button>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden md:flex fixed left-6 top-24 z-30`}>
        <motion.aside
          animate={{ width: open ? 220 : 72 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
          className="h-[80vh] bg-gradient-to-br from-green-300 via-gray-300 to-green-200 rounded-2xl shadow-xl border border-green-400 overflow-hidden"
        >
          <div className="h-full flex flex-col">
            <div className={`px-4 py-4 ${open ? "" : "items-center flex justify-center"}`}>
              {open ? (
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-green-800">🌾 SmartAgro</div>
                </div>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/60 text-green-800">SA</div>
              )}
            </div>

            <nav className="flex-1 px-2 py-3 space-y-1 overflow-auto">
              {ITEMS.map((it) => (
                <motion.button
                  key={it.key}
                  onClick={() => handleClick(it.key)}
                  whileHover={{ scale: 1.03 }}
                  className={`w-full flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/60 transition ${
                    open ? "justify-start" : "justify-center"
                  } text-green-800`}
                >
                  <span className="w-6 h-6 flex items-center justify-center">{it.icon}</span>
                  {open && <span className="font-medium">{it.label}</span>}
                </motion.button>
              ))}
            </nav>

            <div className="p-3 border-t border-green-200">
              <button
                onClick={() => handleClick("settings")}
                className={`w-full flex items-center gap-3 rounded-md px-3 py-2 hover:bg-white/60 transition ${
                  open ? "justify-start" : "justify-center"
                } text-green-800`}
              >
                <Settings size={18} />
                {open && <span className="font-medium">Settings</span>}
              </button>
            </div>
          </div>
        </motion.aside>
      </div>
    </>
  );
}
