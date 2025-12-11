import React from "react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: "🌿",
      title: "Sustainable Farming",
      desc: "Eco-friendly solutions that reduce environmental impact while maximizing productivity.",
    },
    {
      icon: "⚡",
      title: "Real-time Analytics",
      desc: "Instant insights and data-driven decisions for optimal crop management.",
      highlight: true,
    },
    {
      icon: "🛡️",
      title: "Crop Protection",
      desc: "Advanced monitoring systems to detect and prevent crop diseases early.",
    },
    {
      icon: "📊",
      title: "Yield Optimization",
      desc: "AI-powered predictions and recommendations to maximize harvest output.",
    },
    {
      icon: "☁️",
      title: "Weather Integration",
      desc: "Smart weather forecasting integrated into farming operations.",
    },
    {
      icon: "⚙️",
      title: "Smart Automation",
      desc: "Fully automated systems that work around the clock with minimal supervision.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br  from-green-300 via-gray-300 to-green-200  py-20 px-6 md:px-16 lg:px-24">

      {/* HEADING */}
      <div className="flex items-center justify-center mb-4">
        <hr className="border-gray-300 w-12" />
        <span className="mx-3 text-gray-600 tracking-wide font-medium text-[14px]">
          WHY CHOOSE US
        </span>
        <hr className="border-gray-300 w-12" />
      </div>

      <h2 className="text-center text-[34px] md:text-[42px] font-bold text-gray-900 leading-snug mb-12">
        Advanced Technology for <br /> Modern Agriculture
      </h2>

      {/* FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}

            whileHover={{
              scale: 1.07,
              y: -10,
              rotateX: 3,
              rotateY: -3,
              boxShadow: "0px 25px 50px rgba(0,0,0,0.2)",
            }}
            className={`rounded-2xl border backdrop-blur-lg bg-white/70 
            transition-all duration-300 p-8 shadow-md hover:shadow-xl 
            hover:border-lime-400 cursor-pointer
            ${item.highlight ? "border-lime-300 bg-lime-50/80 shadow-lg" : "border-gray-200"}`}
          >
            {/* ICON BOX */}
            <div className="w-16 h-16 rounded-2xl bg-[#EAFAD7] flex items-center justify-center 
                text-[30px] mb-5 shadow-inner hover:shadow-lg transition-all duration-300">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-[21px] text-gray-900 mb-2">
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-[15px] leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}