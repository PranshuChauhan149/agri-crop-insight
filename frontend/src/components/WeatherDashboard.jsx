import { motion } from "framer-motion";

const WeatherDashboard = ({ weather }) => {
  if (!weather) return null;

  // safe conversions (handles undefined)
  const kelvinToC = (k) =>
    typeof k === "number" ? (k - 273.15).toFixed(1) : "--";

  const tempC = kelvinToC(weather?.main?.temp);
  const feelsLike = kelvinToC(weather?.main?.feels_like);

  const minTemp = kelvinToC(weather?.main?.temp_min);
  const maxTemp = kelvinToC(weather?.main?.temp_max);

  const humidity = weather?.main?.humidity ?? "--";
  const pressure = weather?.main?.pressure ?? "--";
  const windSpeed = weather?.wind?.speed ?? "--";
  const clouds = weather?.clouds?.all ?? "--";
  const visibilityKm =
    typeof weather?.visibility === "number"
      ? (weather.visibility / 1000).toFixed(1)
      : "--";
  const windDeg = weather?.wind?.deg ?? "--";

  const sunrise = weather?.sys?.sunrise
    ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";

  const sunset = weather?.sys?.sunset
    ? new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      // RESPONSIVE: full width on small screens, exact 600x400 on md+
      className="w-full max-w-[600px] md:w-[600px] md:h-[400px] bg-gradient-to-br from-green-300 via-gray-300 to-green-200 text-gray-800 rounded-2xl shadow-xl p-6 border border-green-400"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 h-auto md:h-[230px]">
        {/* LEFT SIDE */}
        <div className="flex-1 min-w-0">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-green-800 truncate"
          >
            {weather?.name ?? "--"}, {weather?.sys?.country ?? "--"}
          </motion.h2>

          <p className="text-gray-600 mt-1 capitalize truncate">
            {weather?.weather?.[0]?.description ?? "--"}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon ?? "01d"}@2x.png`}
              alt={weather?.weather?.[0]?.description ?? "weather icon"}
              className="w-16 h-16"
            />
            <div>
              <p className="text-4xl font-bold text-green-700">
                {tempC}°C
              </p>
              <p className="text-sm text-gray-500">Feels like {feelsLike}°C</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE STATS */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          <StatBox title="Humidity" value={`${humidity}%`} />
          <StatBox title="Pressure" value={`${pressure} hPa`} />
          <StatBox title="Wind Speed" value={`${windSpeed} m/s`} />
          <StatBox title="Clouds" value={`${clouds}%`} />
          <StatBox title="Visibility" value={`${visibilityKm} km`} />
          <StatBox title="Wind Direction" value={`${windDeg}°`} />
        </div>
      </div>

      {/* BOTTOM EXTRA STATS */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <ExtraStat title="Min Temp" value={`${minTemp}°C`} />
        <ExtraStat title="Max Temp" value={`${maxTemp}°C`} />
        <ExtraStat title="Sunrise" value={sunrise} />
        <ExtraStat title="Sunset" value={sunset} />
      </div>
    </motion.div>
  );
};

const StatBox = ({ title, value }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl p-3 text-center shadow border border-gray-200"
    >
      <p className="text-sm text-gray-500 truncate">{title}</p>
      <p className="text-lg font-bold text-green-700">{value}</p>
    </motion.div>
  );
};

const ExtraStat = ({ title, value }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl p-3 text-center shadow border border-gray-200"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-semibold text-green-700 truncate">{value}</p>
    </motion.div>
  );
};

export default WeatherDashboard;
