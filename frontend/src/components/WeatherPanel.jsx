import { motion } from "framer-motion";

const WeatherPanel = ({ weather }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow p-6 mt-10"
    >
      <h2 className="text-lg font-semibold mb-4">🌦 Live Weather Overview</h2>

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

      <div className="mt-4 flex gap-6 text-sm text-gray-700">
        <p>🌅 Sunrise: {weather.sunrise}</p>
        <p>🌇 Sunset: {weather.sunset}</p>
      </div>
    </motion.div>
  );
};

export default WeatherPanel;
