import React from "react";
import { motion } from "framer-motion";
import tractor from "../assets/t12.jpeg"; // your image file

export default function AboutSection() {
  return (
    <section className="w-full bg-gradient-to-br  from-green-300 via-gray-300 to-green-200  py-20 px-6 md:px-16 lg:px-24">
      
      {/* ABOUT US Heading */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <div className="w-full flex items-center gap-4">
          <hr className="border-gray-300 w-14" />
          <span className="tracking-wide text-gray-600 font-medium text-[14px]">
            ABOUT US
          </span>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <img
            src={tractor}
            alt="About Tractor"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </motion.div>

        {/* RIGHT TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Title */}
          <h2 className="text-[32px] md:text-[40px] font-bold text-gray-900 leading-snug">
            Our vision is to revolutionize <br />
            agriculture through intelligent <br />
            machinery that enhances productivity, <br />
            reduces manual effort, and ensures <br />
            food security for the growing global <br />
            population.
          </h2>

          {/* Description */}
          <p className="mt-6 text-gray-600 text-[16px] leading-relaxed">
            Combining decades of agricultural expertise with cutting-edge 
            technology, we offer solutions that help farmers achieve more with 
            less. From automated harvesting to smart irrigation, our products 
            are designed to address the challenges of modern farming. Our 
            commitment to sustainability drives us to develop technologies that 
            not only boost production but also preserve our planet for future 
            generations.
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 bg-lime-400 hover:bg-lime-300 px-8 py-3 rounded-md 
            text-black font-medium text-[17px] inline-flex items-center gap-2 shadow"
          >
            Learn more →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}