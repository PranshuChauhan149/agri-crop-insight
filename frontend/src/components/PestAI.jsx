import { useState } from "react";
import axios from "axios";

const PestAI = () => {
  const [plantName, setPlantName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const submitPestData = async () => {
    if (!plantName) {
      alert("Please enter plant name");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("plantName", plantName);
      if (image) formData.append("image", image);

      const res = await axios.post(
        "http://localhost:3000/api/ai/pest-analysis",
        formData,
        {withCredentials:true }
      );

      setResult(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Pest AI failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8f3] flex flex-col items-center justify-center px-4 py-16">
      {/* ✅ HEADING SECTION */}
      <div className="w-full max-w-6xl mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Pest Detection & Fertilizer Guidance
        </h2>
        <p className="mt-3 text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          Upload a plant image and enter crop details to detect pests, diseases,
          and receive smart fertilizer & spray recommendations.
        </p>
        <div className="mt-5 flex justify-center">
          <span className="w-24 h-1 rounded-full bg-green-500"></span>
        </div>
      </div>

      {/* ✅ FORM CARD */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-5xl border border-green-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ✅ LEFT COLUMN */}
          <div className="space-y-7">
            <div>
              <p className="text-sm font-semibold mb-3">
                Upload Plant Image (Optional)
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
                <p className="text-sm text-gray-700">
                  Drop your plant image here
                </p>
                <span className="text-xs text-gray-400">
                  or click to browse
                </span>
              </label>
            </div>
          </div>

          {/* ✅ RIGHT COLUMN */}
          <div className="space-y-7">
            <div>
              <p className="text-sm font-semibold mb-2">Plant Name</p>
              <input
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-400 outline-none"
                placeholder="Enter plant name (e.g., Tomato, Wheat)"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ✅ SUBMIT BUTTON */}
        <button
          onClick={submitPestData}
          disabled={loading}
          className="w-full mt-12 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-2xl transition text-lg shadow-lg"
        >
          {loading ? "Analyzing Plant..." : "🌿 Analyze Plant"}
        </button>
      </div>

      {/* ✅ RESULT DASHBOARD */}
      {result && (
        <section className="w-full max-w-6xl mt-16">
          <h3 className="text-2xl font-bold text-center mb-10">
            Pest & Fertilizer Report
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ✅ PLANT OVERVIEW */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="font-bold mb-3 text-green-700">
                🌱 Plant Overview
              </h4>
              <p>
                <strong>Name:</strong> {result.plantOverview.plantName}
              </p>
              <p>
                <strong>Type:</strong> {result.plantOverview.plantType}
              </p>
            </div>

            {/* ✅ DISEASE */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="font-bold mb-3 text-red-600">
                🦠 Possible Disease
              </h4>
              <p className="font-semibold">{result.possibleDisease}</p>
              <p className="text-sm text-gray-600 mt-2">
                Cause: {result.diseaseCause}
              </p>
            </div>

            {/* ✅ PRO TIP */}
            <div className="bg-green-100 p-6 rounded-xl shadow border-l-4 border-green-600">
              <h4 className="font-bold mb-3">✅ Pro Tip</h4>
              <p className="text-sm">{result.proTip}</p>
            </div>

            {/* ✅ SAFE SPRAYS */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="font-bold mb-4 text-green-700">
                🧴 Safe Spray Suggestions
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                {result.safeSpraySuggestions.map((spray, i) => (
                  <li key={i}>{spray}</li>
                ))}
              </ul>
            </div>

            {/* ✅ FERTILIZERS */}
            <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
              <h4 className="font-bold mb-4 text-green-700">
                🌾 Recommended Fertilizers
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendedFertilizers.map((item, i) => (
                  <div key={i} className="border p-4 rounded-xl shadow-sm">
                    <p className="font-semibold">{item.name}</p>
                    <p>Dosage: {item.dosage}</p>
                    <p>Timing: {item.timing}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ APPLICATION GUIDE */}
            <div className="bg-white p-6 rounded-xl shadow lg:col-span-3">
              <h4 className="font-bold mb-4 text-green-700">
                📘 Application Guide
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.applicationGuide.map((step, i) => (
                  <div key={i} className="border p-4 rounded-xl">
                    <p className="font-semibold">{step.heading}</p>
                    <p className="text-sm mt-1">{step.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PestAI;
