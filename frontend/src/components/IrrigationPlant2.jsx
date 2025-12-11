import React from "react";
import { motion } from "framer-motion";

import heroImg from "../assets/IRRIGATION1.jpg";
import { Droplets } from "lucide-react";

const SmartIrrigationHero = () => {
  return (
    <>
      <div className="w-full  py-10 flex flex-col items-center px-4">
        {/* ---------------- HERO SECTION ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative w-full max-w-6xl rounded-3xl overflow-hidden mb-12"
        >
          {/* Background Image */}
          <img
            src={heroImg}
            alt="irrigation"
            className="w-full h-[480px] object-cover"
          />

          {/* Dark green overlay */}
          <div className="absolute inset-0 bg-green-900/60"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16 text-white">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-green-700/70 backdrop-blur-md text-white px-5 py-2 rounded-full w-fit flex items-center gap-2 mb-6"
            >
              <Droplets size={18} />
              <span className="font-medium text-sm">Smart Irrigation</span>
            </motion.div>

            {/* Main Heading (inside hero) */}
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
            >
              Smart Irrigation Plan Generator
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-lg text-gray-200 max-w-3xl mb-8 leading-relaxed"
            >
              AI-powered irrigation scheduling based on soil moisture, weather
              forecasts, and crop requirements for optimal water efficiency.
            </motion.p>

            {/* Cards Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="flex flex-wrap gap-5"
            >
              {/* Card 1 */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl px-8 py-5 shadow-md">
                <p className="text-gray-700 text-sm">Save up to</p>
                <p className="text-green-700 font-semibold text-xl">
                  30% Water
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl px-8 py-5 shadow-md">
                <p className="text-gray-700 text-sm">Increase</p>
                <p className="text-green-700 font-semibold text-xl">
                  Yield 25%
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl px-8 py-5 shadow-md">
                <p className="text-gray-700 text-sm">AI Powered</p>
                <p className="text-green-700 font-semibold text-xl">
                  Predictions
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SmartIrrigationHero;
