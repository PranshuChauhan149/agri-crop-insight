import React from "react";
import img1 from "../assets/spe2.jpeg";
import img2 from "../assets/spe1.jpeg";
const SpectralHero = () => {
  return (
    <section
      className="w-full min-h-screen bg-gradient-to-br from-green-300 via-gray-300 to-green-200 px-6 py-10 flex flex-col items-center"
      aria-labelledby="spectral-hero-heading"
    >
      <h1
  id="spectral-hero-heading"
  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold 
  text-[#1b3c28] tracking-tight text-center leading-tight"
>
  Advanced Spectral Analysis  
  <br className="hidden sm:block" />
  for Precision Agriculture
</h1>

<p
  className="text-sm sm:text-base md:text-lg text-gray-700 mt-4 
  text-center max-w-2xl md:max-w-3xl leading-relaxed"
>
  Real-time spectral insights, drone + sensor-based vegetation monitoring, 
  automatic stress detection (water, nutrient, pest), and AI-powered fertilizer 
  recommendations using advanced vegetation indices.
</p>

      {/* ---------- IMAGE BANNER ---------- */}
      <div
        className="w-full max-w-6xl mt-10 rounded-3xl overflow-hidden shadow-xl relative"
        role="img"
        aria-label="Drone capturing spectral data over crops"
      >
        <img
          src={img1}
          alt="Drone surveying crop field for spectral analysis"
          className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover brightness-[0.9] transition-all duration-500"
        />

        {/* ---------- TEXT OVER IMAGE ---------- */}
        <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-auto text-white drop-shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold">
            Precision Spectral Monitoring
          </h2>

          <p className="text-sm sm:text-base md:text-lg max-w-xl mt-3">
            Identify crop stress early using AI-powered spectral imaging — NDVI, GNDVI, NDRE,
            canopy analysis, and automated fertilizer insights.
          </p>
        </div>
      </div>

      {/* ---------- FEATURE CARDS SECTION ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mt-10 w-full">
        {/* CARD 1 */}
        <article
          className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-transform duration-300 border border-green-100"
          aria-labelledby="card-1-title"
        >
          <h3 id="card-1-title" className="text-xl font-bold text-[#1b5e20]">
            🌱 Vegetation Stress Detection
          </h3>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Detect early plant stress caused by water shortage, nutrient deficiency, or pests.
          </p>
        </article>

        {/* CARD 2 */}
        <article
          className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-transform duration-300 border border-green-100"
          aria-labelledby="card-2-title"
        >
          <h3 id="card-2-title" className="text-xl font-bold text-[#1b5e20]">
            📊 NDVI / NDRE / GNDVI Insights
          </h3>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Generate high-precision vegetation indices to monitor plant vigor & chlorophyll activity.
          </p>
        </article>

        {/* CARD 3 */}
        <article
          className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 transition-transform duration-300 border border-green-100"
          aria-labelledby="card-3-title"
        >
          <h3 id="card-3-title" className="text-xl font-bold text-[#1b5e20]">
            🧪 Fertilizer Recommendations
          </h3>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Smart AI suggests the best nutrient plan based on crop condition & spectral patterns.
          </p>
        </article>
      </div>
    </section>
  );
};

export default SpectralHero;
