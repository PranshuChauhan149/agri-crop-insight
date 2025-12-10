import { motion } from "framer-motion";

const WeatherDashboard = ({ weather }) => {
  if (!weather) return null;

  const tempC = ((weather?.main?.temp || 0) - 273.15).toFixed(1);
  const feelsLike = ((weather?.main?.feels_like || 0) - 273.15).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full lg:w-1/2 bg-gradient-to-br from-green-300 via-gray-300 to-green-200 text-gray-800 rounded-2xl shadow-xl p-6 border border-green-400"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        {/* LEFT SIDE */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-green-800"
          >
            {weather?.name}, {weather?.sys?.country}
          </motion.h2>

          <p className="text-gray-600 mt-1 capitalize">
            {weather?.weather?.[0]?.description}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
              alt="icon"
              className="w-16 h-16"
            />
            <div>
              <p className="text-4xl font-bold text-green-700">{tempC}°C</p>
              <p className="text-sm text-gray-500">
                Feels like {feelsLike}°C
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE STATS */}
        <div className="grid grid-cols-2 gap-4 w-full  md:w-1/2">
          <StatBox title="Humidity" value={`${weather?.main?.humidity ?? "--"}%`} />
          <StatBox title="Pressure" value={`${weather?.main?.pressure ?? "--"} hPa`} />
          <StatBox title="Wind Speed" value={`${weather?.wind?.speed ?? "--"} m/s`} />
          <StatBox title="Clouds" value={`${weather?.clouds?.all ?? "--"}%`} />
          <StatBox title="Visibility" value={`${(weather?.visibility ?? 0) / 1000} km`} />
          <StatBox title="Wind Direction" value={`${weather?.wind?.deg ?? "--"}°`} />
        </div>
      </div>

      {/* BOTTOM EXTRA STATS */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 ">
        <ExtraStat
          title="Min Temp"
          value={`${((weather?.main?.temp_min || 0) - 273.15).toFixed(1)}°C`}
        />
        <ExtraStat
          title="Max Temp"
          value={`${((weather?.main?.temp_max || 0) - 273.15).toFixed(1)}°C`}
        />
        <ExtraStat
          title="Sunrise"
          value={
            weather?.sys?.sunrise
              ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString()
              : "--"
          }
        />
        <ExtraStat
          title="Sunset"
          value={
            weather?.sys?.sunset
              ? new Date(weather.sys.sunset * 1000).toLocaleTimeString()
              : "--"
          }
        />
      </div>
    </motion.div>
  );
};

const StatBox = ({ title, value }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl p-4 text-center shadow border border-gray-200"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-bold text-green-700">{value}</p>
    </motion.div>
  );
};

const ExtraStat = ({ title, value }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl p-3 text-center shadow border border-gray-200"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-semibold text-green-700">{value}</p>
    </motion.div>
  );
};

export default WeatherDashboard;
