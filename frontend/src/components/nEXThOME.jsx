import React from "react";
import bgImg from "../assets/soil.jpeg";
import { useNavigate } from "react-router-dom";

export default function NextSolution() {
  const navigate = useNavigate();
  return (
    <section
      className="relative w-full min-h-[80vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      {/* Dark overlay for visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* White card content */}
      <div className="relative z-20 bg-gradient-to-br  from-green-300 via-gray-300 to-green-200  rounded-2xl shadow-xl w-[90%] md:w-[60%] lg:w-[52%] p-10 md:p-14 ml-6 md:ml-16 lg:ml-24">
        {/* Label */}
        <div className="flex items-center gap-4 mb-4">
          <hr className="border-gray-300 w-10" />
          <span className="tracking-wide text-gray-600 font-medium text-[14px] uppercase">
            Next Solution
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[32px] md:text-[42px] font-bold leading-tight text-gray-900 mb-6">
          Experience the Future <br />
          of Farming
        </h2>

        {/* Paragraph */}
        <p className="text-gray-600 text-[16px] md:text-[17px] leading-relaxed mb-8">
          Our systems are ready to help you experience the best in smart
          agriculture. Start your journey to higher yields and lower costs with
          us. Automation and AI tools that work.
        </p>

        {/* Button */}
        <button
          className="bg-lime-400 hover:bg-lime-300 transition px-6 py-3 rounded-md font-medium text-black text-[16px] inline-flex items-center gap-2 shadow"
          onClick={() => navigate("/signup")}
        >
          Quick start →
        </button>
      </div>
    </section>
  );
}
