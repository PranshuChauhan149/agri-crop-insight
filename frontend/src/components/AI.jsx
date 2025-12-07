import { useState } from "react";
import axios from "axios";

const AI = () => {
  const [image, setImage] = useState(null);

  const [soilMoisture, setSoilMoisture] = useState("");
  const [soilPH, setSoilPH] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const submitData = async () => {
    if (!image || !soilMoisture || !soilPH || !temperature || !humidity) {
      alert("Please fill all fields and select an image!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("soilMoisture", soilMoisture);
      formData.append("soilPH", soilPH);
      formData.append("temperature", temperature);
      formData.append("humidity", humidity);
      formData.append("cropName", "Potato");

      const res = await axios.post(
        "http://localhost:3000/api/ai/plant-image", // ✅ Backend port
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data.analysis);

    } catch (error) {
      console.error(error);
      alert("Image AI failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          🌱 Plant Disease Detection (Gemini AI)
        </h2>

      
        <div className="mb-4">
          <label className="block font-medium mb-1">Upload Plant Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded p-2"
          />
        </div>

       
        <div className="mb-4">
          <label className="block font-medium mb-1">Soil Moisture (%)</label>
          <input
            type="number"
            value={soilMoisture}
            onChange={(e) => setSoilMoisture(e.target.value)}
            placeholder="e.g. 32"
            className="w-full border rounded p-2"
          />
        </div>

      
        <div className="mb-4">
          <label className="block font-medium mb-1">Soil pH (0 - 14)</label>
          <input
            type="number"
            step="0.1"
            value={soilPH}
            onChange={(e) => setSoilPH(e.target.value)}
            placeholder="e.g. 5.8"
            className="w-full border rounded p-2"
          />
        </div>

      
        <div className="mb-4">
          <label className="block font-medium mb-1">Temperature (°C)</label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="e.g. 30"
            className="w-full border rounded p-2"
          />
        </div>

        {/* HUMIDITY */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Humidity (%)</label>
          <input
            type="number"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            placeholder="e.g. 70"
            className="w-full border rounded p-2"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={submitData}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
        >
          {loading ? "Analyzing..." : "Analyze Plant"}
        </button>

        {/* AI RESULT */}
        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded border">
            <h3 className="font-bold text-lg mb-2 text-green-700">
              ✅ AI Result
            </h3>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AI;
