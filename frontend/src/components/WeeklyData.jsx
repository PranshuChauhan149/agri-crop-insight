import React from "react";
import { motion } from "framer-motion";

const dummyWeek = [
  { day: "Mon", icon: "10d", temp: "28°C", desc: "Light Rain" },
  { day: "Tue", icon: "04d", temp: "30°C", desc: "Cloudy" },
  { day: "Wed", icon: "01d", temp: "32°C", desc: "Sunny" },
  { day: "Thu", icon: "02d", temp: "31°C", desc: "Partly Cloudy" },
  { day: "Fri", icon: "09d", temp: "27°C", desc: "Showers" },
  { day: "Sat", icon: "03d", temp: "29°C", desc: "Overcast" },
  { day: "Sun", icon: "10d", temp: "26°C", desc: "Rain" },
];

export default function WeeklyWeather() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        w-full 
        bg-gradient-to-br from-green-300 via-gray-300 to-green-200 
        rounded-2xl 
        shadow-xl 
        border border-green-400 
        p-6 
        mt-6
      "
    >
      <h2 className="text-xl font-bold text-green-800 mb-4">Weekly Forecast</h2>

      {/* Full width grid */}
      <div
        className="
        w-full 
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        xl:grid-cols-7 
        gap-4
      "
      >
        {dummyWeek.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="
              bg-white 
              rounded-xl 
              p-4 
              shadow 
              border border-gray-200 
              text-center
            "
          >
            <p className="text-sm text-gray-600 font-semibold">{item.day}</p>

            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.desc}
              className="w-12 h-12 mx-auto"
            />

            <p className="text-lg font-bold text-green-700 mt-1">
              {item.temp}
            </p>

            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
