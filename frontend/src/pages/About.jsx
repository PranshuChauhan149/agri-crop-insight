import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
            About Smart Agro AI
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Smart Agro AI is an intelligent farming platform that uses Artificial Intelligence
            to monitor crop health, analyze soil condition, predict pest risks, and support
            farmers with real-time, data-driven decisions.
          </p>
        </motion.div>

        {/* Mission, Vision, Goal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {["🎯 Our Mission", "👁 Our Vision", "🚀 Our Goal"].map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-2xl shadow p-6"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                {title}
              </h2>
              <p className="text-gray-600 text-sm">
                {title === "🎯 Our Mission" &&
                  "To empower farmers with AI-based tools for better crop productivity and reduced losses."}
                {title === "👁 Our Vision" &&
                  "To build a fully digital, smart, and sustainable agricultural ecosystem."}
                {title === "🚀 Our Goal" &&
                  "To make AI technology simple, affordable, and accessible for every farmer."}
              </p>
            </motion.div>
          ))}
        </div>

        {/* What We Provide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
            What We Provide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Plant Disease Detection", "Soil Health Analysis", "Pest Prediction AI", "Weather & Crop Monitoring"].map(
              (feature, i) => (
                <motion.div
                  key={feature}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl shadow p-6 text-center"
                >
                  <h3 className="font-semibold mb-2 text-green-700">
                    {feature}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    AI-powered insights to help farmers take the right action at the right time.
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
            Why Choose Smart Agro AI?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["Real-Time AI Analysis", "Farmer-Friendly Interface", "Accurate Pest Alerts", "Smart Weather Integration"].map(
              (point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-2xl shadow"
                >
                  <h4 className="font-semibold text-green-700 mb-2">{point}</h4>
                  <p className="text-gray-600 text-sm">
                    We combine advanced AI models with simple design so every farmer can use the system easily.
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Developer / Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-green-700">Meet The Developer</h2>
          <div className="bg-white max-w-xl mx-auto rounded-2xl shadow p-8">
            <h3 className="text-xl font-semibold mb-2">Pranshu Chauhan</h3>
            <p className="text-gray-600 mb-4">Full Stack MERN Developer & AI Enthusiast</p>
            <p className="text-gray-700 text-sm">
              This project is built with React, Node.js, MongoDB, and Gemini AI to create
              a complete Smart Farming Assistant for real-world agricultural challenges.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}