import { useState } from "react";
import axios from "axios";
import {
  ImageIcon,
  Leaf,
  CloudSun,
  Activity,
  Sparkles,
  Beaker,
} from "lucide-react";
import SpectralHero from "../components/SpectralPage2";
import SpectralHome from "../components/SpectraPage1";

/* ======================================================================================
   UTILITY — DETERMINE GRAPH COLOR BASED ON SELECTED INDEX
====================================================================================== */
const getColorForIndex = (analysisType) => {
  switch (analysisType) {
    case "NDVI":
      return "stroke-red-500";
    case "NDRE":
      return "stroke-yellow-500";
    case "GNDVI":
      return "stroke-green-600";
    default:
      return "stroke-indigo-600";
  }
};

/* ======================================================================================
   CARD COMPONENT — INCLUDED INSIDE SAME FILE
====================================================================================== */
const SpectralInfoCard = ({
  title,
  fullForm,
  meaning,
  value,
  valueColor,
  icon: Icon,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition-all duration-300 animate-fadeIn">
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className="text-indigo-600 w-6 h-6" />}
        <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
      </div>
      <p className="text-sm text-gray-500">{fullForm}</p>
      <p className="text-sm text-gray-600 mt-1">{meaning}</p>
      <p className={`text-3xl font-bold mt-4 ${valueColor}`}>{value}</p>
    </div>
  );
};

/* ======================================================================================
   MAIN COMPONENT (ONE FILE ONLY)
====================================================================================== */
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

  /* ===================================================================================
      API CALL
  =================================================================================== */
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
        { withCredentials: true }
      );

      setResult(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Spectral Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SpectralHero />
      <div className="min-h-screen bg-indigo-50 p-6 flex justify-center">
        <div className="bg-white w-full max-w-4xl shadow-2xl rounded-xl p-8">
          {/* ===================================================================================
            PAGE TITLE
        =================================================================================== */}
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
            🌈 Spectral Crop Analysis
          </h2>

          {/* ===================================================================================
            INPUT FORM (Styled Like Irrigation)
        =================================================================================== */}
          <div className="space-y-8">
            {/* IMAGE SECTION */}
            <div className="bg-indigo-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="text-indigo-600" />
                <p className="font-semibold text-indigo-700 text-lg">
                  Image & Weather
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="bg-white border rounded-lg p-3 shadow-sm"
                />

                <input
                  className="bg-white border rounded-lg p-3 shadow-sm"
                  placeholder="Temperature (°C)"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />

                <input
                  className="bg-white border rounded-lg p-3 shadow-sm"
                  placeholder="Climate / Weather"
                  value={climate}
                  onChange={(e) => setClimate(e.target.value)}
                />
              </div>
            </div>

            {/* FIELD DETAILS */}
            <div className="bg-green-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="text-green-700" />
                <p className="font-semibold text-green-800 text-lg">
                  Field Details
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="bg-white border rounded-lg p-3 shadow-sm"
                  placeholder="Field / Plot Name"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                />

                <input
                  className="bg-white border rounded-lg p-3 shadow-sm"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <select
                  className="bg-white border rounded-lg p-3 shadow-sm"
                  value={landType}
                  onChange={(e) => setLandType(e.target.value)}
                >
                  <option value="">Land Type</option>
                  <option>Slant Land</option>
                  <option>Flat Land</option>
                  <option>Dry Land</option>
                </select>

                <select
                  className="bg-white border rounded-lg p-3 shadow-sm"
                  value={farmingType}
                  onChange={(e) => setFarmingType(e.target.value)}
                >
                  <option value="">Farming Type</option>
                  <option>Organic</option>
                  <option>Traditional</option>
                  <option>Modern</option>
                </select>
              </div>
            </div>

            {/* CROP DETAILS */}
            <div className="bg-yellow-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CloudSun className="text-yellow-700" />
                <p className="font-semibold text-yellow-800 text-lg">
                  Crop & Analysis Type
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  className="bg-white border rounded-lg p-3 shadow-sm"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                >
                  <option value="">Select Crop Type</option>
                  <option>Wheat</option>
                  <option>Maize</option>
                  <option>Paddy</option>
                  <option>Cotton</option>
                </select>

                <select
                  className="bg-white border rounded-lg p-3 shadow-sm"
                  value={analysisType}
                  onChange={(e) => setAnalysisType(e.target.value)}
                >
                  <option value="">Select Analysis Type</option>
                  <option>NDVI</option>
                  <option>NDRE</option>
                  <option>GNDVI</option>
                </select>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={submitSpectralData}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition"
            >
              {loading ? "Understanding your crop..." : "Run Spectral Analysis"}
            </button>
          </div>

          {/* ===================================================================================
            OUTPUT SECTION
        =================================================================================== */}
          {result && (
            <div className="mt-12 bg-indigo-50 p-8 rounded-xl shadow-md space-y-10 animate-fadeIn">
              {/* ======================= ROW 1 — Crop Score + Canopy Cover ======================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpectralInfoCard
                  title="Crop Health Score"
                  fullForm="Overall Crop Health Rating"
                  meaning="Generated using vegetation indices and canopy structure."
                  value={`${result.cropHealthScore} / 100`}
                  valueColor="text-red-600"
                  icon={Activity}
                />

                <SpectralInfoCard
                  title="Canopy Cover"
                  fullForm="Percentage of Vegetation Coverage"
                  meaning="Shows how much area is covered by green canopy."
                  value={`${result.canopyCoverPercentage}%`}
                  valueColor="text-green-600"
                  icon={Leaf}
                />
              </div>

              {/* ======================= ROW 2 — Spectral Index + Circular Graph ======================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ===== DIS
              
              PLAY SELECTED INDEX CARD ===== */}
                {analysisType === "NDVI" && (
                  <SpectralInfoCard
                    title="NDVI"
                    fullForm="Normalized Difference Vegetation Index"
                    meaning="Shows plant vigor & photosynthesis strength."
                    value={result.vegetationHeatmaps.ndvi}
                    valueColor="text-red-600"
                    icon={Sparkles}
                  />
                )}

                {analysisType === "NDRE" && (
                  <SpectralInfoCard
                    title="NDRE"
                    fullForm="Red Edge Index — Early Stress Detection"
                    meaning="Detects nitrogen stress & chlorophyll decline early."
                    value={result.vegetationHeatmaps.ndre}
                    valueColor="text-yellow-600"
                    icon={Beaker}
                  />
                )}

                {analysisType === "GNDVI" && (
                  <SpectralInfoCard
                    title="GNDVI"
                    fullForm="Green NDVI — Canopy Greenness"
                    meaning="Measures canopy greenness and water stress."
                    value={result.vegetationHeatmaps.gndvi}
                    valueColor="text-green-600"
                    icon={Leaf}
                  />
                )}

                {/* ===== CIRCULAR GRAPH CARD ===== */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center items-center animate-fadeIn">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {analysisType} Index Graph
                  </h3>

                  <div className="relative w-40 h-40">
                    {/* BACKGROUND ARC */}
                    <svg className="w-full h-full">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        strokeWidth="12"
                        className="stroke-gray-200"
                        fill="transparent"
                      />
                    </svg>

                    {/* PROGRESS ARC */}
                    <svg className="absolute top-0 left-0 w-full h-full rotate-[-90deg]">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        strokeWidth="12"
                        fill="transparent"
                        className={`transition-all duration-700 ${getColorForIndex(
                          analysisType
                        )}`}
                        strokeDasharray="283"
                        strokeDashoffset={
                          283 -
                          283 *
                            Number(
                              analysisType === "NDVI"
                                ? result.vegetationHeatmaps.ndvi
                                : analysisType === "NDRE"
                                ? result.vegetationHeatmaps.ndre
                                : result.vegetationHeatmaps.gndvi
                            )
                        }
                      />
                    </svg>

                    {/* CENTER TEXT */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-2xl font-bold text-gray-800">
                        {analysisType === "NDVI"
                          ? result.vegetationHeatmaps.ndvi
                          : analysisType === "NDRE"
                          ? result.vegetationHeatmaps.ndre
                          : result.vegetationHeatmaps.gndvi}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-gray-600 text-sm text-center">
                    Visual representation of vegetation index strength.
                  </p>
                </div>
              </div>

              {/* ======================= DISEASE DETECTION ======================= */}
              <div>
                <h3 className="font-bold text-xl mb-3">Disease Detection</h3>

                <div className="space-y-2">
                  {result.diseaseDetectionMap.map((disease, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-gray-700 animate-fadeIn"
                    >
                      <Beaker className="w-5 h-5 text-red-500" />
                      <p className="font-medium">{disease}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ======================= AI RECOMMENDATIONS ======================= */}
              <div>
                <h3 className="font-bold text-xl mb-3">AI Recommendations</h3>

                <div className="space-y-4">
                  {result.aiRecommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="
                      p-4 rounded-lg border-l-4 border-indigo-600 bg-white shadow-sm 
                      hover:shadow-lg hover:border-indigo-700 transition-all duration-300
                      animate-fadeIn
                    "
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="text-indigo-600 w-5 h-5" />
                        <p className="text-gray-800 text-md">"{rec}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* INLINE ANIMATIONS CSS (NO EXTRA FILES) */}
        <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
      </div>

      <SpectralHome />
    </>
  );
};

export default SpectralAnalysis;
