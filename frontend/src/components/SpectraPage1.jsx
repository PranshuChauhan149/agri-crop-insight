import React from "react";

import img1 from "../assets/spe1.jpeg";

import { 
  Activity,
  Leaf,
  Scan,
  Droplets,
  FlaskConical,
  Radar,
  CloudSun,
  Cpu,
  LineChart
} from "lucide-react";

const SpectralHome = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-emerald-50 p-10">

      {/* ---------------------------------------------- */}
      {/*          CORE INTELLIGENCE FEATURES            */}
      {/* ---------------------------------------------- */}

      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-xl font-bold text-green-800 mb-8">
          Core Intelligence Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1 — Irrigation Optimization (GREEN THEME) */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition-all">
            <Droplets className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="font-bold text-xl text-gray-800">Irrigation Optimization</h3>
            <p className="text-gray-600 mt-2">
              Spectral water stress + soil readings allow AI-precise irrigation planning.
            </p>
          </div>

          {/* Feature 2 — Smart Fertilizer Guide */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition-all">
            <FlaskConical className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="font-bold text-xl text-gray-800">Smart Fertilizer Guide</h3>
            <p className="text-gray-600 mt-2">
              Real-time nutrient deficiency mapping using NDVI, NDRE & canopy data.
            </p>
          </div>

          {/* Feature 3 — Early Stress Detection (GREEN THEME) */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition-all">
            <Radar className="w-12 h-12 text-green-700 mb-4" />
            <h3 className="font-bold text-xl text-gray-800">Early Stress Detection</h3>
            <p className="text-gray-600 mt-2">
              Detect pest hotspots, nitrogen stress & irrigation issues instantly.
            </p>
          </div>

        </div>
      </div>



      {/* ---------------------------------------------- */}
      {/*             SUPPORTED DATA TYPES               */}
      {/* ---------------------------------------------- */}

      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-green-800 mb-8">
          Supported Data Types
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Card 1 — Multispectral Imaging */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition-all">
            <Scan className="w-12 h-12 text-green-700 mb-4" />
            <h3 className="font-bold text-lg text-gray-800">Multispectral Imaging</h3>
            <p className="text-gray-600 mt-2">
              NDVI, NDRE, GNDVI & vegetation reflectance layers.
            </p>
          </div>

          {/* Card 2 — Hyperspectral Imaging */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition-all">
            <Cpu className="w-12 h-12 text-emerald-700 mb-4" />
            <h3 className="font-bold text-lg text-gray-800">Hyperspectral Imaging</h3>
            <p className="text-gray-600 mt-2">
              High-precision spectrum analysis for nutrient & disease detection.
            </p>
          </div>

          {/* Card 3 — Soil IoT Sensors */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition-all">
            <Leaf className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="font-bold text-lg text-gray-800">Soil IoT Sensors</h3>
            <p className="text-gray-600 mt-2">
              Moisture, nitrogen, EC, pH & temperature readings.
            </p>
          </div>

          {/* Card 4 — Weather & Climate Data (GREEN THEME) */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition-all">
            <CloudSun className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="font-bold text-lg text-gray-800">Weather & Climate Data</h3>
            <p className="text-gray-600 mt-2">
              Rainfall, humidity & predictive crop stress modeling.
            </p>
          </div>

        </div>
      </div>



      {/* ---------------------------------------------- */}
      {/*              MAIN HEADING SECTION              */}
      {/* ---------------------------------------------- */}

      <div className="max-w-6xl mx-auto flex flex-col mt-20 md:flex-row items-center gap-12">

        {/* TEXT SECTION */}
        <div className="flex-1 space-y-6 animate-fadeIn">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight">
            Advanced Spectral Analysis for <br />
            <span className="text-emerald-600">Precision Agriculture</span>
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            Real-time spectral insights powered by drone imaging, IoT sensors, 
            and vegetation indices. Monitor crop health, detect nutrient/water/pest stress early, 
            and receive AI-powered fertilizer recommendations.
          </p>

          {/* BULLET POINTS */}
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-3">
              <Scan className="text-green-700" />
              Drone + multispectral vegetation monitoring
            </li>
            <li className="flex items-center gap-3">
              <Activity className="text-emerald-600" />
              Early detection of water, nutrient & pest stress
            </li>
            <li className="flex items-center gap-3">
              <FlaskConical className="text-green-600" />
              AI-powered fertilizer optimization using spectral indices
            </li>
            <li className="flex items-center gap-3">
              <LineChart className="text-green-500" />
              Real-time spectral trend visualization
            </li>
          </ul>

        </div>

        {/* IMAGE SECTION */}
        <div className="flex-1">
          <img 
            src={img1}
            alt="Spectral Drone"
            className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

    </div>
  );
};

export default SpectralHome;