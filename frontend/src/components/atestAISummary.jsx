import React from "react";
import { motion } from "framer-motion";

export default function LatestAISuggestion({ data }) {
  // Default dummy suggestion
  const suggestion =
    data || {
      title: "Latest AI Farming Suggestion",
      problem: "High humidity detected — increased risk of fungal infection on crops.",
      advice: [
        "Spray Neem Oil solution within the next 24 hours.",
        "Reduce watering frequency for the next 2 days.",
        "Improve airflow by removing dense surrounding leaves.",
        "Check soil moisture daily using Soil AI.",
      ],
      note: "AI suggests preventive action to avoid crop damage.",
      time: new Date().toLocaleString(),
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[800px] bg-gradient-to-br from-green-300 via-gray-300 to-green-200 rounded-2xl shadow-xl border border-green-400 p-6"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-green-800 mb-2">
        {suggestion.title}
      </h2>

      {/* Time */}
      <p className="text-xs text-gray-700 mb-4">
        Updated: {suggestion.time}
      </p>

      {/* Problem Statement */}
      <div className="bg-white rounded-xl shadow p-4 border border-gray-200 mb-5">
        <h3 className="text-lg font-semibold text-green-700 mb-1">
          ⚠ Issue Detected
        </h3>
        <p className="text-gray-700 text-sm">{suggestion.problem}</p>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-green-700 mb-3">
          🌱 Recommended Actions
        </h3>

        <ul className="text-sm text-gray-700 space-y-2">
          {suggestion.advice.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-green-700 font-bold">•</span>
              {point}
            </li>
          ))}
        </ul>

        {/* Note */}
        <p className="text-xs text-gray-600 mt-4 italic">
          {suggestion.note}
        </p>
      </div>
    </motion.div>
  );
}
