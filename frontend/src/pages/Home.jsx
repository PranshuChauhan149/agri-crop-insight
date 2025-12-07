import {
  Leaf,
  CloudSun,
  Bug,
  Sprout,
  BarChart,
  ShieldCheck,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-br from-green-100 to-emerald-200 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 leading-tight">
              AI Powered Smart Farming for{" "}
              <span className="text-green-600">Modern Farmers 🌱</span>
            </h1>

            <p className="mt-6 text-gray-700 text-lg">
              Monitor crop health, soil condition, pest risks & weather using
              Artificial Intelligence and real-time sensors.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/signup")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="border border-green-600 text-green-700 px-6 py-3 rounded-lg font-semibold"
              >
                View Dashboard
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://i.ibb.co/zZ5pJHY/farm-ai.png"
              alt="Smart Farming"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            Smart Agro AI Features
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mb-14">
            Advanced AI tools to make farming more intelligent, profitable and
            sustainable.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Leaf />}
              title="Crop Health AI"
              desc="Detect plant diseases using images."
            />
            <FeatureCard
              icon={<CloudSun />}
              title="Weather Monitor"
              desc="Live weather with AI advisories."
            />
            <FeatureCard
              icon={<Bug />}
              title="Pest Prediction"
              desc="7-day pest risk forecast."
            />
            <FeatureCard
              icon={<BarChart />}
              title="Soil Analysis"
              desc="Soil health and nutrient report."
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-green-50 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-12">
            How Smart Agro AI Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard number="1" title="Upload Data" desc="Upload crop image or soil details." />
            <StepCard number="2" title="AI Analysis" desc="AI analyzes all farm conditions." />
            <StepCard number="3" title="Get Report" desc="Instant disease, pest & soil report." />
            <StepCard number="4" title="Take Action" desc="Follow AI spray & care plans." />
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold text-green-700 mb-6">
              Why Farmers Choose Us?
            </h2>

            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" /> Accurate AI Diagnosis
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" /> Reduced Crop Loss
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" /> Increased Yield
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" /> Smart Alerts & Reports
              </li>
            </ul>
          </div>

          <div>
            <img
              src="https://i.ibb.co/LP89Qk4/farm-benefit.png"
              alt="Benefits"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20 bg-green-700 text-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <StatBox value="20K+" label="Farmers" />
          <StatBox value="1.2M+" label="Crops Analyzed" />
          <StatBox value="95%" label="Accuracy" />
          <StatBox value="24/7" label="AI Support" />
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-10">
            What Farmers Say
          </h2>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-center mb-4">
              <Users size={40} className="text-green-600" />
            </div>

            <p className="text-gray-700 mb-6">
              "Smart Agro AI saved my entire potato crop from blight disease.
              Their AI report & spray suggestion worked perfectly!"
            </p>

            <div className="flex justify-center text-yellow-400">
              <Star /><Star /><Star /><Star /><Star />
            </div>

            <h4 className="mt-4 font-semibold text-green-700">
              – Ramesh Kumar, Farmer
            </h4>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Smart Farming with AI Today 🚜
          </h2>
          <p className="mb-8">
            Join thousands of farmers using Smart Agro AI to protect their crops.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
          >
            Start Free <ArrowRight />
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-300 py-8 text-center">
        <p>© {new Date().getFullYear()} Smart Agro AI. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-green-50 rounded-xl text-center shadow hover:shadow-lg transition">
      <div className="flex justify-center mb-4 text-green-600">{icon}</div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function StepCard({ number, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="text-3xl font-bold text-green-600 mb-4">
        {number}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <div>
      <h3 className="text-4xl font-bold">{value}</h3>
      <p className="text-green-100">{label}</p>
    </div>
  );
}
