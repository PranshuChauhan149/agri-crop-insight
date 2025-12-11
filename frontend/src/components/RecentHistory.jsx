import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Droplet, Bug, Image, Clock, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";

const TYPE_META = {
  IrrigationPlan: { label: "Irrigation Plan", color: "bg-green-100 text-green-800", icon: <Droplet size={18} /> },
  SoilAnalysis: { label: "Soil Analysis", color: "bg-amber-100 text-amber-800", icon: <Zap size={18} /> },
  PestAnalysis: { label: "Pest Analysis", color: "bg-red-100 text-red-800", icon: <Bug size={18} /> },
  SpectralAnalysis: { label: "Spectral Analysis", color: "bg-purple-100 text-purple-800", icon: <Image size={18} /> },
  Default: { label: "Analysis", color: "bg-slate-100 text-slate-800", icon: <Activity size={18} /> },
};

function timeAgo(dateIso) {
  if (!dateIso) return "--";
  const d = new Date(dateIso);
  const now = new Date();
  const sec = Math.floor((now - d) / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

function formatDateTime(iso) {
  if (!iso) return "--";
  const d = new Date(iso);
  return d.toLocaleString();
}

export default function RecentHistory({ user: userProp, history: historyProp }) {
  const ctx = useContext(AppContext);
  const user = userProp || ctx?.user || {};
  const raw = Array.isArray(historyProp) ? historyProp : Array.isArray(user?.history) ? user.history : [];
  const navigate = useNavigate();

  const items = raw
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full bg-gradient-to-br from-green-300 via-gray-300 to-green-200 rounded-2xl shadow-xl border border-green-400 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="p-2 bg-white rounded-md shadow-sm"
          >
            <FileText size={18} className="text-green-800" />
          </motion.div>
          <h3 className="text-lg font-semibold text-green-800">Recent Analyses</h3>
        </div>

        <div className="text-sm text-gray-700 flex items-center gap-2">
          <Clock size={14} /> <span>Last 5</span>
        </div>
      </div>

      <div className="grid gap-3">
        {items.length === 0 && (
          <div className="bg-white rounded-xl p-4 shadow border border-gray-200 text-center text-sm text-gray-600">
            No history available.
          </div>
        )}

        {items.map((it) => {
          const meta = TYPE_META[it.analysisType] || TYPE_META.Default;
          const idToUse = it.analysisId._id || it._id || "";
          const shortId = idToUse ? idToUse.slice(0, 8) : "--";

          return (
            <motion.div
              key={it._id || it.analysisId || `${it.analysisType}-${it.createdAt}`}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-xl p-4 shadow border border-gray-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className={`p-2 rounded-md ${meta.color} flex items-center justify-center`}>
                  {meta.icon}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">{meta.label}</h4>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">ID: <span className="font-mono text-xs">{shortId}</span></span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Created: <span title={formatDateTime(it.createdAt)} className="font-medium text-gray-700">{timeAgo(it.createdAt)}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/recent-report/${idToUse}`)}
                  className="text-sm px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                >
                  View
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
