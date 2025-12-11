import React from "react";
import { Camera, Sprout, Droplet, Calendar, Bell, BarChart2 } from "lucide-react";

const features = [
  { icon: <Camera className="w-10 h-10 text-[#1b5e20]" />, title: "Image Recognition", desc: "Upload plant photos and get instant disease identification using advanced AI algorithms." },
  { icon: <Sprout className="w-10 h-10 text-[#1b5e20]" />, title: "Smart Predictions", desc: "Predict potential diseases before they spread based on environmental conditions." },
  { icon: <Droplet className="w-10 h-10 text-[#1b5e20]" />, title: "Safe Spray Guide", desc: "Get organic and chemical spray recommendations with exact dosage instructions." },
  { icon: <Calendar className="w-10 h-10 text-[#1b5e20]" />, title: "Treatment Schedule", desc: "Receive personalized fertilizer and treatment schedules for your crops." },
  { icon: <Bell className="w-10 h-10 text-[#1b5e20]" />, title: "Alert System", desc: "Real-time notifications about disease outbreaks in your region." },
  { icon: <BarChart2 className="w-10 h-10 text-[#1b5e20]" />, title: "Yield Analytics", desc: "Track and analyze your crop health and yield improvements over time." }
];

export default function FeaturesSection() {
  return (
    <div className="w-full bg-[#f4f9f3] py-20 px-6 flex flex-col items-center">
      
      {/* Label */}
      <div className="bg-[#e0efdf] text-[#1b5e20] px-5 py-1 rounded-full text-sm font-medium mb-4">
        Powerful Features
      </div>

      {/* Heading */}
      <h2 className="text-4xl font-bold text-[#1b331d] text-center mb-3">
        Everything You Need for Healthy Crops
      </h2>

      {/* Subtext */}
      <p className="text-center text-[#4a6a50] max-w-2xl mb-12">
        Our comprehensive toolkit helps you prevent, identify, and treat plant diseases effectively.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {features.map((f, i) => (
          <div
            key={i}
            className="
              group bg-white border border-[#e5eee5] rounded-xl p-8 shadow-sm 
              transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:-translate-y-3 hover:scale-[1.04]
              hover:shadow-xl hover:border-[#1b5e20]/40
            "
          >
            <div className="mb-5">
              <div
                className="
                  w-14 h-14 bg-[#e3f2e7] flex items-center justify-center rounded-xl 
                  transition-all duration-300 group-hover:bg-[#d8eddd] 
                  group-hover:rotate-[3deg] group-hover:scale-110
                "
              >
                {f.icon}
              </div>
            </div>

            <h3
              className="
                text-xl font-semibold text-[#1b331d] mb-2 
                transition-all duration-300 group-hover:text-[#1b5e20]
              "
            >
              {f.title}
            </h3>

            <p className="text-[#4a6a50] text-sm leading-relaxed transition-all duration-300 group-hover:text-[#355c40]">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}