import { useState } from "react";
import axios from "axios";
import { Droplets, Leaf, Sun, CloudRain } from "lucide-react";
import IrrigationPlan from "../components/IrrigationPlan";
import ThreeCardSlider from "../components/IriigationSlider";
import SmartIrrigationHero from "../components/IrrigationPlant2";

const IrrigationAI = () => {
  const [soilType, setSoilType] = useState("");
  const [soilTemperature, setSoilTemperature] = useState("");
  const [fieldArea, setFieldArea] = useState("");
  const [irrigationMethod, setIrrigationMethod] = useState("");
  const [cropType, setCropType] = useState("");
  const [cropStage, setCropStage] = useState("");
  const [weatherTemperature, setWeatherTemperature] = useState("");
  const [irrigationTimePreference, setIrrigationTimePreference] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const submitIrrigationData = async () => {
    if (
      !soilType ||
      !soilTemperature ||
      !fieldArea ||
      !irrigationMethod ||
      !cropType ||
      !cropStage ||
      !irrigationTimePreference
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/ai/irrigation-analysis",
        {
          soilType,
          soilTemperature,
          fieldArea,
          irrigationMethod,
          cropType,
          cropStage,
          weatherTemperature,
          irrigationTimePreference,
        },
        { withCredentials: true }
      );

      setResult(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Irrigation AI failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <IrrigationPlan/>
      <ThreeCardSlider/>
    
    <div className="min-h-screen  bg-[#f7faf5] p-6 flex justify-center">
      <div className="w-full max-w-4xl">

        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-[#1a3c24] mb-1">
          Configure Your Irrigation Plan
        </h1>
        <p className="text-[#5f725f] mb-8">
          Enter your field details to generate an AI-optimized irrigation schedule.
        </p>

        {/* ========================================================
           INPUT SECTION (Screenshot 1 - EXACT UI)
        ========================================================== */}

        <div className="space-y-6">

          {/* SOIL INPUTS */}
          <div className="bg-[#f3eee9] p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="text-[#6b5649]" />
              <h2 className="text-lg font-semibold text-[#6b5649]">Soil Inputs</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="bg-white border rounded-lg p-3"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
              >
                <option value="">Soil Type</option>
                <option>Clay</option>
                <option>Loam</option>
                <option>Sandy</option>
                <option>Black Soil</option>
              </select>

              <input
                type="number"
                placeholder="Soil Temperature (°C)"
                className="bg-white border rounded-lg p-3"
                value={soilTemperature}
                onChange={(e) => setSoilTemperature(e.target.value)}
              />
            </div>
          </div>

          {/* FIELD DETAILS */}
          <div className="bg-[#edf6ef] p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-[#4d7c4d]" />
              <h2 className="text-lg font-semibold text-[#4d7c4d]">Field Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Field Area"
                className="bg-white border rounded-lg p-3"
                value={fieldArea}
                onChange={(e) => setFieldArea(e.target.value)}
              />

              <select className="bg-white border rounded-lg p-3">
                <option>Acre</option>
                <option>Hectare</option>
              </select>

              <select
                className="bg-white border rounded-lg p-3"
                value={irrigationMethod}
                onChange={(e) => setIrrigationMethod(e.target.value)}
              >
                <option value="">Irrigation Method</option>
                <option>Drip</option>
                <option>Sprinkler</option>
              </select>
            </div>
          </div>

          {/* CROP INFORMATION */}
          <div className="bg-[#e7f4ee] p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="text-[#4c7669]" />
              <h2 className="text-lg font-semibold text-[#4c7669]">Crop Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="bg-white border rounded-lg p-3"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
              >
                <option value="">Crop Type</option>
                <option>Tomato</option>
                <option>Wheat</option>
                <option>Maize</option>
              </select>

              <select
                className="bg-white border rounded-lg p-3"
                value={cropStage}
                onChange={(e) => setCropStage(e.target.value)}
              >
                <option value="">Growth Stage</option>
                <option>Vegetative</option>
                <option>Flowering</option>
                <option>Maturity</option>
              </select>
            </div>
          </div>

          {/* WEATHER & TIMING */}
          <div className="bg-[#e8f4ff] p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CloudRain className="text-[#4d88b3]" />
              <h2 className="text-lg font-semibold text-[#4d88b3]">Weather & Timing</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Temperature (°C)"
                className="bg-white border rounded-lg p-3"
                value={weatherTemperature}
                onChange={(e) => setWeatherTemperature(e.target.value)}
              />

              <select
                className="bg-white border rounded-lg p-3"
                value={irrigationTimePreference}
                onChange={(e) =>
                  setIrrigationTimePreference(e.target.value)
                }
              >
                <option value="">Irrigation Time Preference</option>
                <option>Morning</option>
                <option>Evening</option>
                <option>Any Time</option>
              </select>

            </div>

            <p className="text-xs text-gray-500 mt-2">Auto-fetched from weather API</p>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={submitIrrigationData}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg shadow-lg"
          >
            {loading ? "Generating Irrigation Plan..." : "Generate Irrigation Plan"}
          </button>
        </div>

        {/* ========================================================
           OUTPUT SECTION (Screenshots 2 + 3)
        ========================================================== */}

        {result && (
          <>
            {/* ========== SUMMARY CARDS ========== */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* REQUIRED WATER */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl">💧</div>
                  <p className="text-gray-700 font-medium text-lg">Required Water Volume</p>
                </div>

                <p className="text-4xl font-bold text-[#0d1a0e]">{result.requiredWaterVolume}</p>
                <p className="text-green-600 font-semibold mt-2 text-right">-12%</p>
              </div>

              {/* IRRIGATION DURATION */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl">⏱️</div>
                  <p className="text-gray-700 font-medium text-lg">Irrigation Duration</p>
                </div>

                <p className="text-4xl font-bold text-[#0d1a0e]">{result.irrigationDuration}</p>
                <p className="text-green-600 font-semibold mt-2 text-right">+5%</p>
              </div>
            </div>

            {/* ========== WEEKLY SCHEDULE UI ========== */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-[#1a3c24] mb-4">
                Weekly Irrigation Schedule
              </h2>

              <div className="space-y-3">
                {result.sevenDayIrrigationSchedule.map((day, i) => {
                  
                  const isActive = i === 2;
                  const isDone = i < 2;

                  return (
                    <div
                      key={i}
                      className={`
                        p-5 rounded-xl flex justify-between items-center border
                        ${isActive ? "bg-blue-50 border-blue-200" :
                          isDone ? "bg-[#eef7ee] border-green-200" :
                          "bg-[#f6faf4] border-gray-200"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          p-2 rounded-full 
                          ${isActive ? "bg-blue-100" :
                            isDone ? "bg-green-100" : "bg-gray-100"}
                        `}>
                          💧
                        </div>

                        <div>
                          <p className="text-lg font-medium">{day.day}</p>
                          <p className="text-gray-600 text-sm">
                            {day.startTime} • {day.duration}
                          </p>
                        </div>
                      </div>

                      <span className={`
                        px-4 py-1 rounded-full font-medium border
                        ${isActive ? "bg-blue-100 text-blue-700 border-blue-300" :
                          isDone ? "bg-green-100 text-green-700 border-green-300" :
                          "bg-gray-100 text-gray-700 border-gray-300"}
                      `}>
                        {day.zone}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
      <SmartIrrigationHero/>
    </>
  );
};

export default IrrigationAI;