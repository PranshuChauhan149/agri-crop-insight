import { useState } from "react";
import axios from "axios";

const PestAI = () => {
  const [form, setForm] = useState({
    temperature: "",
    humidity: "",
    rainfall: "",
    windSpeed: "",
    windDirection: "",
    location: "",
    scenario: ""
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const predictPest = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/pest-ai/predict",
        form
      );

      setResult(res.data.report);
    } catch (err) {
      alert("Pest AI failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-5">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-xl w-full">

        <h2 className="text-2xl font-bold text-center text-red-700 mb-4">
          🐛 AI Pest Prediction System
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={key}
              className="border p-2 rounded"
            />
          ))}
        </div>

        <button
          onClick={predictPest}
          className="w-full bg-red-600 text-white mt-4 py-2 rounded hover:bg-red-700"
        >
          {loading ? "Analyzing..." : "Predict Pest Risk with AI"}
        </button>

        {result && (
          <div className="mt-5 bg-red-100 p-4 rounded border text-sm">
            <h3 className="font-bold mb-2">✅ AI Prediction Result:</h3>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PestAI;
