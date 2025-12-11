import { motion } from "framer-motion";
import { Leaf, FlaskRound, Bug, ScanEye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-green-300 via-gray-300 to-green-200 rounded-2xl shadow-xl border h-full border-green-400 p-5 w-full"
    >
      <h2 className="text-lg font-bold text-green-800 mb-1">⚡ Quick Actions</h2>

      <p className="text-sm text-gray-700 mb-4">
        Run fast AI tools to analyze plants, soil, pests, and spectral crop health instantly.
      </p>

      <div className="flex flex-col gap-3">

        {/* Plant AI */}
        <button
          onClick={() => navigate("/irrigation")}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl shadow hover:bg-green-700 transition"
        >
          <Leaf size={18} /> Irrigation Ai
        </button>

        {/* Soil AI */}
        <button
          onClick={() => navigate("/soil")}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          <FlaskRound size={18} /> Run Soil AI
        </button>

        {/* Pest AI */}
        <button
          onClick={() => navigate("/pest-ai")}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-xl shadow hover:bg-red-700 transition"
        >
          <Bug size={18} /> Run Pest AI
        </button>

        {/* Spectral Analysis */}
        <button
          onClick={() => navigate("/spectral")}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-xl shadow hover:bg-purple-700 transition"
        >
          <ScanEye size={18} /> Run Spectral Analysis
        </button>

      </div>
    </motion.div>
  );
}
