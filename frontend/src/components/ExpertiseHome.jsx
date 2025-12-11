import React, { useState } from "react";
import img1 from "../assets/g1.jpeg";
import img2 from "../assets/g2.jpeg";

export default function ExpertiseSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "Autonomous Harvesting",
      desc: "Our autonomous harvesting systems operate around the clock with precision and accuracy, significantly reducing labor costs and crop loss while ensuring optimal quality and consistent output.",
    },
    {
      title: "Smart Irrigation Systems",
      desc: "AI-enabled irrigation systems deliver water efficiently, reducing waste and improving crop hydration with real-time adjustments.",
    },
    {
      title: "Precision Seeding Technology",
      desc: "Automated seed placement ensures optimal spacing and growth patterns for maximum yield.",
    },
    {
      title: "AI-Driven Crop Monitoring",
      desc: "Machine-learning crop monitoring provides early insights into plant health, diseases, and nutrient deficiencies.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br  from-green-300 via-gray-300 to-green-200  py-20 px-6 md:px-16 lg:px-24">

      {/* TOP TITLE */}
      <div className="flex items-center justify-center mb-4">
        <hr className="border-gray-300 w-12" />
        <span className="mx-3 text-gray-600 tracking-wide font-medium text-[14px]">
          EXPERTISE & SOLUTIONS
        </span>
        <hr className="border-gray-300 w-12" />
      </div>

      <h2 className="text-center text-[34px] md:text-[42px] font-bold text-gray-900 leading-snug">
        Empowering Modern <br /> Agriculture with Innovation
      </h2>

      {/* SUBTEXT */}
      <p className="mt-6 mb-12 text-gray-600 text-center md:text-left leading-relaxed max-w-3xl mx-auto md:mx-0 text-[16px]">
        Through decades of expertise, we deliver cutting-edge machinery and automation
        solutions to farming operations worldwide, ensuring precision, higher yields, 
        and lower costs.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">

        {/* LEFT IMAGES */}
        <div className="flex gap-6">
          <img
            src={img1}
            alt="Agriculture"
            className="w-1/2 h-[240px] md:h-[300px] object-cover rounded-xl shadow"
          />
          <img
            src={img2}
            alt="Crop"
            className="w-1/2 h-[240px] md:h-[300px] object-cover rounded-xl shadow"
          />
        </div>

        {/* RIGHT ACCORDION */}
        <div className="space-y-6">

          {items.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              
              {/* TITLE ROW */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[18px] font-medium text-gray-900">
                    {index + 1}.
                  </span>
                  <h3 className="text-[20px] font-medium text-gray-900">
                    {item.title}
                  </h3>
                </div>

                {/* + / - BUTTON */}
                <button
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white 
                    transition-all duration-300 
                    ${openIndex === index ? "bg-lime-500" : "bg-lime-400"} 
                  `}
                >
                  {openIndex === index ? (
                    <span className="text-[22px] font-bold">−</span>
                  ) : (
                    <span className="text-[22px] font-bold">+</span>
                  )}
                </button>
              </div>

              {/* CONTENT */}
              {openIndex === index && (
                <p className="mt-4 text-gray-600 text-[15px] leading-relaxed pr-10">
                  {item.desc}
                </p>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}