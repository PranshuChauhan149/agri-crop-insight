import { useState } from "react";
import axios from "axios";

const SpectralAnalysis = () => {
  const [image, setImage] = useState(null);
  const [temperature, setTemperature] = useState("");
  const [climate, setClimate] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [cropType, setCropType] = useState("");
  const [location, setLocation] = useState("");
  const [landType, setLandType] = useState("");
  const [farmingType, setFarmingType] = useState("");
  const [analysisType, setAnalysisType] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const submitSpectralData = async () => {
    if (!fieldName || !cropType || !analysisType) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      if (image) formData.append("image", image);

      formData.append("temperature", temperature);
      formData.append("climate", climate);
      formData.append("fieldName", fieldName);
      formData.append("cropType", cropType);
      formData.append("location", location);
      formData.append("landType", landType);
      formData.append("farmingType", farmingType);
      formData.append("analysisType", analysisType);

      const res = await axios.post(
        "http://localhost:3000/api/ai/spectral-analysis",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Spectral Analysis failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-4xl">

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🌈 Spectral Crop Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full border rounded p-2" />

          <input className="w-full border rounded p-2" placeholder="Temperature (°C)" value={temperature} onChange={(e) => setTemperature(e.target.value)} />

          <input className="w-full border rounded p-2" placeholder="Climate / Weather" value={climate} onChange={(e) => setClimate(e.target.value)} />

          <input className="w-full border rounded p-2" placeholder="Field / Plot Name" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />

          <select className="w-full border rounded p-2" value={cropType} onChange={(e) => setCropType(e.target.value)}>
            <option value="">Select Crop Type</option>
            <option>Wheat</option>
            <option>Paddy</option>
            <option>Maize</option>
            <option>Vegetables</option>
            <option>Cotton</option>
          </select>

          <input className="w-full border rounded p-2" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

          <select className="w-full border rounded p-2" value={landType} onChange={(e) => setLandType(e.target.value)}>
            <option value="">Select Land Type</option>
            <option>Slant Land</option>
            <option>Step Land</option>
            <option>Flat Land</option>
            <option>Dry Land</option>
          </select>

          <select className="w-full border rounded p-2" value={farmingType} onChange={(e) => setFarmingType(e.target.value)}>
            <option value="">Select Farming Type</option>
            <option>Organic</option>
            <option>Traditional</option>
            <option>Modern</option>
            <option>Mixed</option>
          </select>

          <select className="w-full border rounded p-2 col-span-1 md:col-span-2" value={analysisType} onChange={(e) => setAnalysisType(e.target.value)}>
            <option value="">Select Analysis Type</option>
            <option>NDVI</option>
            <option>GNDVI</option>
            <option>NDRE</option>
          </select>

        </div>

        <button
          onClick={submitSpectralData}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
        >
          {loading ? "Analyzing Spectral Data..." : "Run Spectral Analysis"}
        </button>

        {result && (
          <div className="mt-8 bg-indigo-50 p-5 rounded-xl space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">NDVI</h3>
                <p>{result.vegetationHeatmaps.ndvi}</p>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">NDRE</h3>
                <p>{result.vegetationHeatmaps.ndre}</p>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">GNDVI</h3>
                <p>{result.vegetationHeatmaps.gndvi}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">Crop Health Score</h3>
                <p className="text-2xl font-bold text-indigo-700">
                  {result.cropHealthScore}
                </p>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">Canopy Cover</h3>
                <p className="text-2xl font-bold text-green-700">
                  {result.canopyCoverPercentage}%
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">Disease Detection Map</h3>
              <ul className="list-disc pl-6">
                {result.diseaseDetectionMap.map((disease, i) => (
                  <li key={i}>{disease}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-2">AI Recommendations</h3>
              <ul className="list-disc pl-6">
                {result.aiRecommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default SpectralAnalysis;
