import { useState } from "react";
import axios from "axios";

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
        {withCredentials:true}
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
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-4xl">

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          💧 Smart Irrigation Planner
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <select className="w-full border rounded p-2" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
            <option value="">Select Soil Type</option>
            <option>Clay</option>
            <option>Loam</option>
            <option>Sandy</option>
            <option>Black Soil</option>
          </select>

          <input className="w-full border rounded p-2" placeholder="Soil Temperature (°C)" value={soilTemperature} onChange={(e) => setSoilTemperature(e.target.value)} />

          <input className="w-full border rounded p-2" placeholder="Field Area (Acre / Hectare / Sq.m)" value={fieldArea} onChange={(e) => setFieldArea(e.target.value)} />

          <select className="w-full border rounded p-2" value={irrigationMethod} onChange={(e) => setIrrigationMethod(e.target.value)}>
            <option value="">Select Irrigation Method</option>
            <option>Drip</option>
            <option>Sprinkler</option>
            <option>Flood</option>
          </select>

          <select className="w-full border rounded p-2" value={cropType} onChange={(e) => setCropType(e.target.value)}>
            <option value="">Select Crop Type</option>
            <option>Wheat</option>
            <option>Paddy</option>
            <option>Tomato</option>
            <option>Cotton</option>
            <option>Maize</option>
            <option>Vegetables</option>
          </select>

          <select className="w-full border rounded p-2" value={cropStage} onChange={(e) => setCropStage(e.target.value)}>
            <option value="">Select Crop Stage</option>
            <option>Seedling</option>
            <option>Vegetative</option>
            <option>Flowering</option>
            <option>Fruiting</option>
            <option>Maturity</option>
          </select>

          <input className="w-full border rounded p-2" placeholder="Weather Temperature (Optional)" value={weatherTemperature} onChange={(e) => setWeatherTemperature(e.target.value)} />

          <select className="w-full border rounded p-2" value={irrigationTimePreference} onChange={(e) => setIrrigationTimePreference(e.target.value)}>
            <option value="">Select Irrigation Time</option>
            <option>Morning</option>
            <option>Evening</option>
            <option>Any time</option>
          </select>

        </div>

        <button
          onClick={submitIrrigationData}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
        >
          {loading ? "Calculating Irrigation..." : "Generate Irrigation Plan"}
        </button>

        {result && (
          <div className="mt-8 bg-blue-50 p-5 rounded-xl space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">Required Water</h3>
                <p className="text-xl text-blue-700 font-bold">{result.requiredWaterVolume}</p>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">Irrigation Duration</h3>
                <p className="text-xl text-green-700 font-bold">{result.irrigationDuration}</p>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">Start Time</h3>
                <p className="text-xl text-purple-700 font-bold">{result.irrigationStartTime}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">7-Day Irrigation Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.sevenDayIrrigationSchedule.map((day, i) => (
                  <div key={i} className="bg-white p-3 rounded shadow">
                    <p className="font-semibold">{day.day}</p>
                    <p>Water: {day.water}</p>
                    <p>Duration: {day.duration}</p>
                    <p>Start Time: {day.startTime}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold">Soil Moisture Projection</h3>
              <p>{result.soilMoistureProjection}</p>
            </div>

            <div>
              <h3 className="font-bold mb-2">AI Recommendations</h3>
              <ul className="list-disc pl-6">
                {result.aiRecommendations.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default IrrigationAI;
