import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ✅ Weather Component INSIDE Dashboard (No TypeScript, No extra file)
function WeatherPanel({ weather }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow p-6 mb-8"
    >
      <h2 className="text-lg font-semibold mb-4">🌦 Full Weather Overview</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-blue-50 p-3 rounded text-center">
          <p className="text-xs text-gray-500">Temperature</p>
          <h3 className="text-lg font-bold">{weather.temperature}°C</h3>
        </div>

        <div className="bg-green-50 p-3 rounded text-center">
          <p className="text-xs text-gray-500">Humidity</p>
          <h3 className="text-lg font-bold">{weather.humidity}%</h3>
        </div>

        <div className="bg-indigo-50 p-3 rounded text-center">
          <p className="text-xs text-gray-500">Rainfall</p>
          <h3 className="text-lg font-bold">{weather.rainfall} mm</h3>
        </div>

        <div className="bg-yellow-50 p-3 rounded text-center">
          <p className="text-xs text-gray-500">Wind Speed</p>
          <h3 className="text-lg font-bold">{weather.windSpeed} km/h</h3>
        </div>

        <div className="bg-purple-50 p-3 rounded text-center">
          <p className="text-xs text-gray-500">Wind Direction</p>
          <h3 className="text-lg font-bold">{weather.windDirection}</h3>
        </div>

        <div className="bg-rose-50 p-3 rounded text-center">
          <p className="text-xs text-gray-500">Condition</p>
          <h3 className="text-lg font-bold">{weather.condition}</h3>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-700">
        <p>🌅 Sunrise: {weather.sunrise}</p>
        <p>🌇 Sunset: {weather.sunset}</p>
        <p>📍 Location: {weather.location}</p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    plantHealth: "Good",
    soilHealth: "Medium",
    pestRisk: "High",
    temperature: 30,
    humidity: 75,
    rainfall: 12,
  });

  // ✅ Weather State (Connected to WeatherPanel)
  const [weather, setWeather] = useState({
    temperature: 30,
    humidity: 75,
    rainfall: 12,
    windSpeed: 14,
    windDirection: "North-East",
    condition: "Cloudy",
    sunrise: "5:32 AM",
    sunset: "6:48 PM",
    location: "Kanpur",
  });

  const [recentReports, setRecentReports] = useState([
    { id: 1, type: "Plant", result: "Early Blight", date: "Today" },
    { id: 2, type: "Soil", result: "Sandy Loam", date: "Yesterday" },
    { id: 3, type: "Pest", result: "High Risk", date: "2 Days Ago" },
  ]);

  return (
    <div className=" mt-19 min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold mb-6 text-green-700">🌾 Smart Agro</h2>
        <nav className="flex flex-col gap-3 text-sm">
          <button className="text-left px-3 py-2 rounded bg-green-100">Dashboard</button>
          <button className="text-left px-3 py-2 rounded hover:bg-gray-100">Plant AI</button>
          <button className="text-left px-3 py-2 rounded hover:bg-gray-100">Soil AI</button>
          <button className="text-left px-3 py-2 rounded hover:bg-gray-100">Pest AI</button>
          <button className="text-left px-3 py-2 rounded hover:bg-gray-100">History</button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4"
        >
          <h1 className="text-2xl font-bold">🌾 Smart Farming Dashboard</h1>
          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              New Plant Scan
            </button>
            <button className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100">
              New Soil Scan
            </button>
          </div>
        </motion.div>

        {/* ✅ FULL WEATHER PANEL ADDED HERE */}
        <WeatherPanel weather={weather} />

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {[
            { title: "Plant Health", value: stats.plantHealth },
            { title: "Soil Health", value: stats.soilHealth },
            { title: "Pest Risk", value: stats.pestRisk },
            { title: "Temperature", value: `${stats.temperature}°C` },
            { title: "Humidity", value: `${stats.humidity}%` },
            { title: "Rainfall", value: `${stats.rainfall}mm` },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl shadow p-4">
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-xl font-semibold mt-1">{item.value}</h2>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow p-5 lg:col-span-2"
          >
            <h2 className="text-lg font-semibold mb-3">🤖 Latest AI Summary</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Your latest plant scan shows signs of <b>Early Blight</b> with high
              humidity increasing pest risk. Spray recommendation: Neem Oil +
              Mancozeb. Soil moisture is moderate; avoid over-irrigation for the
              next 3 days.
            </p>

            {/* Alert Status */}
            <div className="mt-4 flex gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs">High Pest Alert</span>
              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">Medium Soil Health</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">Plant Stable</span>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow p-5"
          >
            <h2 className="text-lg font-semibold mb-4">⚡ Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Run Plant AI
              </button>
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Run Soil AI
              </button>
              <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Run Pest AI
              </button>
            </div>
          </motion.div>
        </div>

        {/* Recent Reports Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow mt-8 p-5"
        >
          <h2 className="text-lg font-semibold mb-4">📑 Recent AI Reports</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Type</th>
                  <th className="p-2">Result</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{report.type}</td>
                    <td className="p-2">{report.result}</td>
                    <td className="p-2">{report.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
