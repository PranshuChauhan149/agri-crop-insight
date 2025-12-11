import React from "react";
import img1 from  "../assets/IRRIGATION2.jpg";

const IrrigationPlan = () => {
  return (
    <div className="w-full  min-h-screen py-16 flex flex-col items-center px-4">

      {/* Main Heading */}
      <h1 className="text-[42px] md:text-[48px] font-semibold text-[#1a2b1e] leading-tight text-center mb-3">
        Smart Irrigation Plan Generator
      </h1>

      {/* Subtitle */}
      <p className="text-[#6d7d6d] text-[18px] leading-relaxed text-center max-w-3xl mb-12">
        AI-powered irrigation scheduling based on soil moisture, weather forecasts, 
        and crop requirements for optimal water efficiency.
      </p>

      {/* Image Card */}
      <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-sm">
        
        {/* Image */}
        <img
          src={img1}
          alt="irrigation"
          className="w-full h-[430px] object-cover"
        />

        {/* Soft black overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"></div>

        {/* Text overlay */}
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-[36px] font-semibold mb-2 leading-tight">
            Precision Water Management
          </h2>
          <p className="text-[17px] leading-relaxed max-w-xl opacity-95">
            Save up to 30% water with our AI-optimized irrigation schedules 
            tailored to your soil conditions.
          </p>
        </div>
      </div>

    </div>
  );
};

export default IrrigationPlan;