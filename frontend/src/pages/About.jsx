import { motion } from "framer-motion";

export default function About() {
  const devs = [
    {
      name: "Pranshu Chauhan",
      id: "12320772",
      // using ui-avatars service so you get a circular photo even without local images
      img: "https://ui-avatars.com/api/?name=Pranshu+Chauhan&background=4caf50&color=ffffff&size=256",
    },
    {
      name: "Adarsh Varma",
      id: "12319562",
      img: "https://ui-avatars.com/api/?name=Adarsh+Varma&background=4caf50&color=ffffff&size=256",
    },
    {
      name: "Aman Choudhary",
      id: "11223344",
      img: "https://ui-avatars.com/api/?name=Aman+Choudhary&background=4caf50&color=ffffff&size=256",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-gray-300 to-green-200 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            About Smart Agro AI
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Smart Agro AI is an intelligent farming platform that uses Artificial Intelligence
            to monitor crop health, analyze soil condition, predict pest risks, and support
            farmers with real-time, data-driven decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {["🎯 Our Mission", "👁 Our Vision", "🚀 Our Goal"].map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-2xl shadow p-6 border border-green-200"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-3">{title}</h2>
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
            What We Provide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Plant Disease Detection",
              "Soil Health Analysis",
              "Pest Prediction AI",
              "Weather & Crop Monitoring",
            ].map((feature, i) => (
              <motion.div
                key={feature}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow p-6 text-center border border-green-200"
              >
                <h3 className="font-semibold mb-2 text-green-700">{feature}</h3>
                <p className="text-gray-600 text-sm">
                  AI-powered insights to help farmers take the right action at the right time.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
            Why Choose Smart Agro AI?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Real-Time AI Analysis",
              "Farmer-Friendly Interface",
              "Accurate Pest Alerts",
              "Smart Weather Integration",
            ].map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl shadow border border-green-200"
              >
                <h4 className="font-semibold text-green-700 mb-2">{point}</h4>
                <p className="text-gray-600 text-sm">
                  We combine advanced AI models with simple design so every farmer can use the system easily.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ---------- MEET THE DEVELOPERS (three cards) ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6  text-center text-green-800">Meet The Developers</h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            {devs.map((dev, idx) => (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center border border-green-200"
              >
                {/* circular profile photo */}
                <img
                  src={dev.img}
                  alt={dev.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md -mt-12"
                />

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-green-800">{dev.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">ID: <span className="font-mono">{dev.id}</span></p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
