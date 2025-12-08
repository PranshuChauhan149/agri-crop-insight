import { useState } from "react";
import axios from "axios";

import { Play, Check } from "lucide-react";
import soilImage from "../assets/soil.jpeg";
import { useContext } from "react";
import AppContext from "../Context/AppContext";
const SoilAI = () => {
  const { user } = useContext(AppContext);
  console.log(user);

  const [image, setImage] = useState(null);

  const [landType, setLandType] = useState("");
  const [temperature, setTemperature] = useState("");
  const [climate, setClimate] = useState("");
  const [soilType, setSoilType] = useState("");
  const [soilColor, setSoilColor] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitSoilData = async () => {
    if (
      !location ||
      !landType ||
      !temperature ||
      !climate ||
      !soilType ||
      !soilColor
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      if (image) formData.append("image", image);

      formData.append("location", location);
      formData.append("landType", landType);
      formData.append("temperature", temperature);
      formData.append("climate", climate);
      formData.append("soilType", soilType);
      formData.append("soilColor", soilColor);

      const res = await axios.post(
        "http://localhost:3000/api/ai/soil-analysis",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Soil AI failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100   mt-15 flex flex-col gap-7 items-center justify-center ">
      <section className="relative h-[90vh]    w-full overflow-hidden">
        {/* ✅ Background Image */}
        <img
          src={soilImage} // <-- Put your second image in PUBLIC folder with this name
          alt="Soil Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ✅ Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* ✅ Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white max-w-5xl mx-auto">
          {/* ✅ Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide leading-tight">
            Understand Your Soil.
          </h1>

          {/* ✅ Green Highlighted Line */}
          <h2 className="text-4xl md:text-6xl font-extrabold text-green-500 mt-3">
            Grow Smarter.
          </h2>

          {/* ✅ Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl">
            AI-powered soil assessment for better crop planning, nutrient
            balancing, and smart farming decisions.
          </p>

          {/* ✅ Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
            {/* ✅ Start Soil Analysis Button */}
            <button className="flex items-center gap-2 rounded-full border-2 border-green-500 bg-green-500 px-8 py-3 text-white font-semibold hover:bg-green-600 transition">
              🌱 Start Soil Analysis
            </button>

            {/* ✅ Watch Demo Button */}
            <button className="flex items-center gap-3 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur px-8 py-3 text-white font-semibold hover:bg-white/20 transition">
              <Play size={18} />
              Watch Demo (2:45)
            </button>
          </div>

          {/* ✅ Down Arrow Icon */}
          <div className="absolute bottom-10 text-white/70 animate-bounce">
            ⌄
          </div>
        </div>
      </section>
 <div className="w-full mt-4 max-w-6xl mx-auto mb-10 text-center px-4">
  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
    Analyze Your Soil
  </h2>

  <p className="mt-3 text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
    Enter your soil details below for a comprehensive AI-powered analysis
  </p>

  {/* ✅ Decorative underline */}
  <div className="mt-5 flex justify-center">
    <span className="w-24 h-1 rounded-full bg-green-500"></span>
  </div>
</div>

      
    <div className="bg-[#fbfdf7] shadow-2xl rounded-3xl p-10 w-full max-w-6xl border border-green-100">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

    {/* ✅ COLUMN 1 */}
    <div className="space-y-7">

      {/* ✅ IMAGE UPLOAD */}
      <div>
        <p className="text-sm font-semibold mb-3">
          Upload Soil Image (Optional)
        </p>

        <label className="border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-green-50 transition">
          <input
            type="file"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2 text-xl">
            ⬆️
          </div>
          <p className="text-sm text-gray-700">Drop your soil image here</p>
          <span className="text-xs text-gray-400">or click to browse</span>
        </label>
      </div>

      {/* ✅ LOCATION */}
      <div>
        <p className="text-sm font-semibold mb-2">Location</p>
        <input
          className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-400 outline-none"
          placeholder="Enter your farm location..."
          value={user?.location || ""}
        />
      </div>

      {/* ✅ TEMPERATURE */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">🌡 Temperature</span>
          <span className="text-red-500 font-semibold">
            {temperature || "29"}°C
          </span>
        </div>

        <input
          type="range"
          min="-10"
          max="50"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="w-full accent-green-600"
        />
      </div>

      {/* ✅ SOIL COLOR */}
      <div>
        <p className="font-semibold mb-3">Soil Colour</p>
        <div className="flex justify-between px-2">
          {[
            { name: "Red", color: "bg-red-500" },
            { name: "Black", color: "bg-black" },
            { name: "Dark Brown", color: "bg-[#5a2d0c]" },
            { name: "Yellow", color: "bg-yellow-400" },
            { name: "Light Brown", color: "bg-[#c68642]" },
          ].map((c) => (
            <button
              key={c.name}
              onClick={() => setSoilColor(c.name)}
              className={`w-11 h-11 rounded-full ${c.color} transition ${
                soilColor === c.name
                  ? "ring-4 ring-green-400 scale-110"
                  : "hover:scale-105"
              }`}
            ></button>
          ))}
        </div>
      </div>

    </div>

    {/* ✅ COLUMN 2 */}
    <div className="space-y-7">

      {/* ✅ LAND TYPE */}
      <div>
        <p className="font-semibold mb-3">Land Type</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Flat Land", icon: "🌾" },
            { name: "Slant Land", icon: "⛰" },
            { name: "Step Land", icon: "🪜" },
            { name: "Dry Land", icon: "🏜" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setLandType(item.name)}
              className={`border rounded-xl py-4 text-sm font-medium flex items-center justify-center gap-2 transition ${
                landType === item.name
                  ? "border-green-600 bg-green-50 shadow"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ CLIMATE */}
      <div>
        <p className="font-semibold mb-3">Climate / Season</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "Summer", icon: "☀️" },
            { name: "Monsoon", icon: "🌧" },
            { name: "Winter", icon: "❄️" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setClimate(item.name)}
              className={`border rounded-xl py-4 text-sm font-medium flex flex-col items-center gap-1 transition ${
                climate === item.name
                  ? "border-green-600 bg-green-50 shadow"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ SOIL TYPE */}
      <div>
        <p className="font-semibold mb-3">Soil Type</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: "Dry", icon: "🏜" },
            { name: "Wet", icon: "💧" },
            { name: "Muddy", icon: "🟤" },
            { name: "Clay", icon: "🧱" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setSoilType(item.name)}
              className={`border rounded-xl py-4 text-xs font-medium flex flex-col items-center gap-1 transition ${
                soilType === item.name
                  ? "border-green-600 bg-green-50 shadow"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>
      </div>

      

    </div>
  </div>

  {/* ✅ SUBMIT BUTTON */}
  <button
    onClick={submitSoilData}
    disabled={loading}
    className="w-full mt-10 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-2xl transition text-lg shadow-lg"
  >
    {loading ? "Analyzing Soil..." : "🌱 Analyze Soil"}
  </button>

</div>


{result && (
  <section className="w-full max-w-7xl mt-16 px-4">
    <h2 className="text-3xl font-bold text-center text-gray-900">
      N-P-K Predictions & Soil Health
    </h2>
    <p className="text-center text-gray-500 mt-2 mb-10">
      Comprehensive analysis of nitrogen, phosphorus, and potassium levels with AI-powered predictions for optimal crop growth.
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ✅ SOIL HEALTH SCORE + TEMP */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
        <h3 className="font-semibold mb-4">Soil Health Score</h3>

        {/* ✅ Circular Score */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="absolute w-full h-full rotate-[-90deg]">
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#15803d"
              strokeWidth="10"
              fill="none"
              strokeDasharray="377"
              strokeDashoffset={377 - (377 * result.soilHealthScore) / 100}
            />
          </svg>

          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">
              {result.soilHealthScore}
            </div>
            <div className="text-sm text-gray-500">out of 100</div>
          </div>
        </div>

        {/* ✅ Temperature directly below like image */}
        <div className="mt-3 text-sm font-semibold text-green-700">
          Soil Temperature: {result.soilTemperature}°C
        </div>

        <div className="mt-3 text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">
          Good Condition
        </div>

        <p className="text-xs text-center text-gray-500 mt-3">
          Your soil is in good condition. Minor improvements in phosphorus levels can boost overall health.
        </p>
      </div>

      {/* ✅ NPK BARS */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-6 flex items-center gap-2 text-green-700">
          🌿 N-P-K Nutrient Levels
        </h3>

        {[
          { name: "Nitrogen (N)", value: result.npkLevels.nitrogen, max: 100 },
          { name: "Phosphorus (P)", value: result.npkLevels.phosphorus, max: 100 },
          { name: "Potassium (K)", value: result.npkLevels.potassium, max: 150 },
        ].map((item, i) => (
          <div key={i} className="mb-5">
            <div className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span>{item.value}/{item.max} ppm</span>
            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-700"
                style={{ width: `${(item.value / item.max) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ SOIL DEFICIENCY */}
      <div className="bg-green-100 rounded-xl shadow p-6">
        <h3 className="font-semibold mb-4 text-red-700">
          ⚠ Soil Deficiency Predictor
        </h3>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-red-700">
            {result.soilDeficiencyPredictor.name}
          </p>
          <p className="text-sm">Impact: {result.soilDeficiencyPredictor.impact}</p>
          <p className="text-sm">
            Recommendation: {result.soilDeficiencyPredictor.recommendation}
          </p>
          <span className="inline-block mt-2 bg-red-200 text-red-800 text-xs px-3 py-1 rounded-full">
            {result.soilDeficiencyPredictor.severity}
          </span>
        </div>
      </div>

      {/* ✅ RECOMMENDED CROPS */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-6 text-green-700">
          🌾 Recommended Crops for Your Soil
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {result.recommendedCrops.map((crop, i) => (
            <div
              key={i}
              className="bg-green-50 p-4 rounded-xl shadow-sm"
            >
              <p className="font-semibold">{crop}</p>

              <div className="w-full h-2 bg-green-200 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-green-700"
                  style={{ width: `${80 + i * 5}%` }}
                ></div>
              </div>

              <p className="text-xs text-right mt-1 text-gray-600">
                {80 + i * 5}%
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </section>
)}

      

      <section className="w-full bg-green-10s0 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ✅ LEFT IMAGE CARD */}
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <img
              src={soilImage} // ✅ Put your image in PUBLIC as soil-video.jpg
              alt="Smart Soil Video"
              className="w-full h-full object-cover"
            />

            {/* ✅ Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition">
                <Play size={32} className="text-white ml-1" />
              </div>
            </div>
          </div>

          {/* ✅ RIGHT CONTENT */}
          <div>
            {/* ✅ Heading */}
            <h2 className="text-4xl font-extrabold leading-tight text-gray-900">
              Changing the Future of Farming Through{" "}
              <span className="text-green-700">Smarter Soil Insights</span>
            </h2>

            {/* ✅ Description */}
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Our soil intelligence engine delivers deeper insights using AI,
              real-time data, and precision farming techniques.
            </p>

            {/* ✅ Feature List */}
            <ul className="mt-8 space-y-5">
              {[
                "Real-time soil monitoring",
                "AI-powered predictions",
                "Smart irrigation planning",
                "Nutrient optimization",
                "Climate-adjusted soil insights",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 text-gray-800"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white">
                    <Check size={16} />
                  </span>
                  <span className="text-base font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* ✅ Learn More Button */}
            <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-green-700 px-8 py-4 text-white font-semibold hover:bg-green-800 transition">
              Learn More
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoilAI;
