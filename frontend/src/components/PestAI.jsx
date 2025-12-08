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
        { headers: { "Content-Type": "multipart/form-data" } }
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
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          🐛 Pest Prediction & Fertilizer Recommendation
        </h2>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border rounded p-2 mb-3"
        />

        <input
          className="w-full border rounded p-2 mb-4"
          placeholder="Enter Plant Name"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
        />

        <button
          onClick={submitPestData}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          {loading ? "Analyzing Plant..." : "Analyze Plant"}
        </button>

        {result && (
          <div className="mt-6 bg-green-50 p-4 rounded border space-y-5">

            <div>
              <h3 className="font-bold text-lg">Plant Overview</h3>
              <p>Name: {result.plantOverview.plantName}</p>
              <p>Type: {result.plantOverview.plantType}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Possible Disease</h3>
              <p>{result.possibleDisease}</p>
              <p className="text-sm text-gray-600">
                Cause: {result.diseaseCause}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Safe Spray Suggestions</h3>
              <ul className="list-disc pl-5">
                {result.safeSpraySuggestions.map((spray, i) => (
                  <li key={i}>{spray}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg">Recommended Fertilizers</h3>
              <div className="space-y-3">
                {result.recommendedFertilizers.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded border shadow-sm"
                  >
                    <p className="font-semibold">{item.name}</p>
                    <p>Dosage: {item.dosage}</p>
                    <p>Timing: {item.timing}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg">Application Guide</h3>
              <div className="space-y-3">
                {result.applicationGuide.map((step, i) => (
                  <div key={i} className="bg-white p-3 rounded border">
                    <p className="font-semibold">{step.heading}</p>
                    <p className="text-sm">{step.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-600">
              <strong>Pro Tip:</strong> {result.proTip}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default PestAI;
