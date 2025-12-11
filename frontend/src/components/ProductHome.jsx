import React from "react";
import { motion } from "framer-motion";
import droneImg from "../assets/f1.jpeg";
import irrigationImg from "../assets/f2.jpeg";
import im1 from "../assets/spe2.jpeg";

export default function ProductsSection() {
  return (
    <section className="w-full bg-gradient-to-br  from-green-300 via-gray-300 to-green-200  py-20 px-6 md:px-16 lg:px-24">

      {/* SECTION TITLE */}
      <div className="flex items-center gap-4 mb-3">
        <hr className="border-gray-300 w-14" />
        <span className="tracking-wide text-gray-600 font-medium text-[14px]">
          OUR PRODUCTS
        </span>
      </div>

      <h2 className="text-[34px] md:text-[42px] font-bold text-gray-900 leading-tight">
        Innovative Agro Machinery <br /> by Agronext
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">

        {/* CARD 1 */}
        <FlipCard
          frontImg={im1}
          location="CALIFORNIA, USA"
          title="AI Surveillance Drone"
          description="High-precision monitoring of agricultural lands."
        />
        <FlipCard
  frontImg={droneImg}
  location="UTTAR PRADESH, INDIA"
  title="Smart Crop Drone"
  description="Real-time aerial scanning for disease detection and crop health analytics."
/>


<FlipCard
  frontImg={irrigationImg}
  location="PUNJAB, INDIA"
  title="AI-Driven Irrigation System"
  description="Automatically adjusts watering schedules using soil and weather intelligence."
/>

      </div>
    </section>
  );
}

/* ---------------------------------------------
   FLIP CARD COMPONENT USING PURE TAILWIND
---------------------------------------------- */
function FlipCard({ frontImg, location, title, description, dark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="group w-full h-[260px] md:h-[300px] [perspective:1200px]"
    >
      <div className="relative w-full h-full rounded-xl shadow-lg transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden [backface-visibility:hidden]">
          {frontImg ? (
            <img src={frontImg} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#1C1C1C] flex flex-col justify-center items-center rounded-xl px-6 text-center">
              <p className="text-lime-300 text-[13px] font-semibold tracking-wide mb-3">
                {location}
              </p>
              <h3 className="text-[22px] md:text-[24px] font-semibold text-white mb-4">
                {title}
              </h3>
              <p className="text-gray-300 text-[15px] leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>

        {/* BACK SIDE */}
        <div
          className={`absolute inset-0 w-full h-full rounded-xl px-6 md:px-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] ${
            dark ? "bg-[#1C1C1C]" : "bg-white"
          }`}
        >
          <p
            className={`text-[13px] font-semibold mb-3 ${
              dark ? "text-lime-300" : "text-lime-600"
            }`}
          >
            {location}
          </p>

          <h3
            className={`text-[22px] md:text-[24px] font-semibold mb-4 ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>

          <p
            className={`text-[15px] leading-relaxed ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>

      </div>
    </motion.div>
  );
}