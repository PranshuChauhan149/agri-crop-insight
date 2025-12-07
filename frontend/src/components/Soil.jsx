import { useState } from "react";
import axios from "axios";

const SoilAI = () => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const submitSoilData = async () => {
    if (!image || !location) {
      alert("Please upload soil image and enter location!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("location", location);

      const res = await axios.post(
        "http://localhost:3000/api/ai/soil-analysis",
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
      alert("Soil AI failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl">

        <h2 className="text-2xl font-bold text-center text-amber-700 mb-6">
          🌍 Soil Health Analysis (Gemini AI)
        </h2>

        {/* SOIL IMAGE */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Upload Soil Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded p-2"
          />
        </div>

        {/* LOCATION */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Enter Location (Area/City)</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Sirsi, Karnataka"
            className="w-full border rounded p-2"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={submitSoilData}
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded transition"
        >
          {loading ? "Analyzing Soil..." : "Analyze Soil"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-6 bg-amber-50 p-4 rounded border">
            <h3 className="font-bold text-lg mb-2 text-amber-700">
              ✅ Soil AI Report
            </h3>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilAI;
