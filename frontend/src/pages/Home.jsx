// CombinedSpectralPage.jsx
import React from "react";
import img1 from "../assets/soil.jpeg";

import {
  Leaf,
  Droplets,
  FlaskConical,
  Radar,
  Zap,
  CloudSun,
  ShieldCheck,
  Scan,
  Cpu,
  MapPin,
  BarChart2,
  Activity,
  Bug,
  CloudRain,
} from "lucide-react";

import { motion } from "framer-motion";

/* -------------------------
   CombinedSpectralPage
   Fully responsive, mobile-first
   Background: bg-gradient-to-br from-green-300 via-gray-300 to-green-200
   ------------------------- */

function SpectralShowcase() {
  return (
    <section className="w-full min-h-screen relative bg-gradient-to-br from-green-300 via-gray-300 to-green-200">
      {/* Full-bleed hero */}
      <div className="relative w-full h-[60vh] md:h-[100vh] overflow-hidden">
        <img
          src={img1}
          alt="Spectral Agriculture"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        <div className="absolute inset-0 bg-black/36" />

        <div className="relative z-10 flex items-center justify-center h-full px-5">
          <div className="text-center max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              AI-Powered Monitoring of Crop Health, Soil Condition
              <span className="hidden md:inline"> &nbsp;</span>
              <br className="md:hidden" />
              & Pest Risks
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
              Using multispectral & hyperspectral imaging fused with IoT sensor data
              to deliver real-time crop intelligence and early stress alerts.
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits (stacked on mobile, centered) */}
      <div className="py-12 md:py-20 px-4 md:px-8 lg:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-900 text-center mb-8">
          Key Benefits
        </h2>

        <div className="space-y-8 md:space-y-10">
          <div className="flex gap-4 md:gap-6 items-start">
            <Leaf className="w-9 h-9 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-emerald-800">
                Early Crop Stress Detection
              </h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base">
                Spot water, nutrient & pest-related stress before visible symptoms occur.
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6 items-start">
            <Droplets className="w-9 h-9 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-emerald-800">
                Water & Irrigation Optimization
              </h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base">
                AI blends spectral moisture signatures with soil sensors to optimize irrigation.
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6 items-start">
            <FlaskConical className="w-9 h-9 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-emerald-800">
                Nutrient & Fertilizer Insights
              </h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base">
                Predict nutrient requirements using NDRE, canopy density & spectral curves.
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-6 items-start">
            <Radar className="w-9 h-9 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-emerald-800">
                Pest & Disease Risk Forecasting
              </h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base">
                Identify pest hotspots using thermal & spectral anomaly patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeyFeaturesWithSources() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-20 bg-gradient-to-br from-green-300 via-gray-300 to-green-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 text-center mb-10">
          Why This System Is Unique
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4 items-start">
            <Zap className="w-10 h-10 text-emerald-700 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-emerald-800">High Accuracy</h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base">
                Proprietary spectral models tuned for field-level conditions ensure unmatched reliability.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <CloudSun className="w-10 h-10 text-emerald-700 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-emerald-800">Real-Time Integration</h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base">
                Syncs with weather APIs, drone feeds, and IoT soil sensors for up-to-the-minute insights.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <ShieldCheck className="w-10 h-10 text-emerald-700 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-emerald-800">Actionable & Simple</h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base">
                Clear irrigation, fertilizer & spray schedules optimized for every crop stage.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <Radar className="w-10 h-10 text-emerald-700 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-emerald-800">Predictive Intelligence</h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base">
                Models forecast future stress conditions, enabling preventive decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreIntelligenceSystem() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-green-200 w-full max-w-2xl h-64 md:h-[420px]">
            <img src={img1} alt="Drone Scanning" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <Cpu className="w-12 h-12 text-green-700 flex-shrink-0" />
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-green-900">Hyperspectral Stress Mapping</h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base leading-relaxed">
                Detects disease signals, nutrient deficiencies and leaf pigment variations long before visible symptoms appear.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <Radar className="w-12 h-12 text-green-700 flex-shrink-0" />
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-green-900">Pest Hotspot Forecasting</h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base leading-relaxed">
                Uses thermal + spectral contrasts to map early-stage pest activity zones and predict infestation spread.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <Droplets className="w-12 h-12 text-green-700 flex-shrink-0" />
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-green-900">Irrigation Intelligence Engine</h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base leading-relaxed">
                Combines spectral drought stress + soil moisture to deliver precise irrigation scheduling.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <FlaskConical className="w-12 h-12 text-green-700 flex-shrink-0" />
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-green-900">AI-Driven Fertilizer Advisor</h3>
              <p className="text-gray-800 mt-1 text-sm md:text-base leading-relaxed">
                Analyzes NDRE, canopy density & crop growth stages to compute NPK requirements without overuse.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FullFeaturesPage() {
  const steps = [
    { icon: MapPin, title: "Capture Data", desc: "Drone imagery & ground sensors collected." },
    { icon: BarChart2, title: "AI Spectral Processing", desc: "Compute indices, heatmaps, and anomaly scores." },
    { icon: Zap, title: "Risk Assessment", desc: "Water, nutrient & pest prediction models run." },
    { icon: ShieldCheck, title: "Actionable Plan", desc: "Irrigation, fertilizer & spray recommendations delivered." },
  ];

  const faqs = [
    { q: "How does the system process data?", a: "Our engine uses spectral indices, AI models, and anomaly detection to generate insights." },
    { q: "Can I analyze different crops?", a: "Yes, the system is compatible with multi-crop data inputs." },
    { q: "Is the platform beginner friendly?", a: "Absolutely — simple UI, clean insights, and easy navigation." },
  ];

  const testimonials = [
    { text: "This platform improved my crop monitoring efficiency and reduced farming costs.", user: "Ravi Kumar", role: "Farmer", img: img1 },
    { text: "The spectral insights are highly accurate. A must-have for consultants.", user: "Sunita Sharma", role: "Agri Consultant", img: img1 },
    { text: "Very clean interface and highly actionable recommendations.", user: "Amit Verma", role: "Field Technician", img: img1 },
  ];

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-20 bg-gradient-to-br from-green-300 via-gray-300 to-green-200">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-8 md:p-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="text-center md:text-left p-4">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto md:mx-0 mb-4">
                    <Icon className="text-green-700" size={28} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 text-center mb-10">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className="p-6 bg-white rounded-2xl shadow-lg border border-green-200">
                <p className="text-gray-700 italic leading-relaxed">“{t.text}”</p>
                <div className="mt-6 flex items-center gap-4">
                  <img src={t.img} alt={t.user} className="w-12 h-12 rounded-full object-cover border border-green-200" />
                  <div>
                    <h4 className="font-semibold text-green-800">{t.user}</h4>
                    <p className="text-gray-600 text-sm">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 text-center mb-8">FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="border border-green-300 rounded-xl p-4 bg-white shadow-sm">
                <summary className="cursor-pointer text-lg font-semibold text-green-700">{faq.q}</summary>
                <p className="mt-3 text-gray-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Flip card style (kept minimal and mobile friendly) */
const FlipStyles = () => (
  <style>{`
    .perspective { perspective: 1000px; }
    .preserve-3d { transform-style: preserve-3d; transition: transform 0.7s; }
    .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .group:hover .preserve-3d { transform: rotateY(180deg); }
    @media (max-width: 768px) {
      .group:hover .preserve-3d { transform: none; } /* disable hover flip on small devices */
    }
  `}</style>
);

export default function CombinedSpectralPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-gray-300 to-green-200">
      <SpectralShowcase />
      <KeyFeaturesWithSources />
      <CoreIntelligenceSystem />

      {/* Flip cards section moved into a compact container for responsiveness */}
      <div className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 text-center mb-10">Key Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group perspective">
              <div className="relative h-64 w-full preserve-3d">
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden backface-hidden shadow-lg"
                  style={{
                    backgroundImage: `url(${img1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-transparent to-black/45 flex flex-col justify-end p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-white/10 rounded-full p-2 backdrop-blur-sm">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl text-white font-semibold">Real-Time Crop Health</h3>
                    </div>
                    <p className="text-white/90 text-sm max-w-xs">Continuous vegetation-index monitoring and live alerts for stress.</p>
                  </div>
                </div>

                <div className="absolute inset-0 backface-hidden rounded-xl shadow-xl bg-emerald-700 text-white px-6 py-8 rotate-y-180 flex flex-col justify-center">
                  <h4 className="text-xl font-bold mb-2">Real-Time Crop Health</h4>
                  <p className="text-sm leading-relaxed">AI analyzes NDVI/NDRE layers to detect stress early, deliver alerts and trend graphs for each field.</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group perspective">
              <div className="relative h-64 w-full preserve-3d">
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden backface-hidden shadow-lg"
                  style={{
                    backgroundImage: `url(${img1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-transparent to-black/45 flex flex-col justify-end p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-white/10 rounded-full p-2 backdrop-blur-sm">
                        <Bug className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl text-white font-semibold">Pest & Disease Prediction</h3>
                    </div>
                    <p className="text-white/90 text-sm max-w-xs">Detect pest hotspots and disease signatures before spread.</p>
                  </div>
                </div>

                <div className="absolute inset-0 backface-hidden rounded-xl shadow-xl bg-emerald-700 text-white px-6 py-8 rotate-y-180 flex flex-col justify-center">
                  <h4 className="text-xl font-bold mb-2">Pest & Disease Prediction</h4>
                  <p className="text-sm leading-relaxed">Thermal + spectral anomaly detection pinpoints likely infestations and recommends targeted scouting areas.</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group perspective">
              <div className="relative h-64 w-full preserve-3d">
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden backface-hidden shadow-lg"
                  style={{
                    backgroundImage: `url(${img1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-transparent to-black/45 flex flex-col justify-end p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-white/10 rounded-full p-2 backdrop-blur-sm">
                        <CloudSun className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl text-white font-semibold">Soil & Weather Fusion</h3>
                    </div>
                    <p className="text-white/90 text-sm max-w-xs">Combine soil probes and climate forecasts for actionable insights.</p>
                  </div>
                </div>

                <div className="absolute inset-0 backface-hidden rounded-xl shadow-xl bg-emerald-700 text-white px-6 py-8 rotate-y-180 flex flex-col justify-center">
                  <h4 className="text-xl font-bold mb-2">Soil & Weather Fusion</h4>
                  <p className="text-sm leading-relaxed">Fuse soil moisture, EC and local weather data to optimize irrigation timing and fertilizer scheduling.</p>
                </div>
              </div>
            </div>
          </div>

          <FlipStyles />
        </div>
      </div>

      <FullFeaturesPage />
    </div>
  );
}
