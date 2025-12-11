import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import d from "../assets/soil.jpeg";
import d1 from "../assets/dash1.jpeg";
import d2 from "../assets/dash2.jpeg";
import d3 from "../assets/dash3.jpeg";

const defaultImages = [d, d2, d3,d1];

export default function RightSideImageSlider({
  images = defaultImages,
  width = "600px",
  height = "400px",
  interval = 2000,
}) {
  const [index, setIndex] = useState(0);
  const len = images.length;
  const containerRef = useRef(null);

  useEffect(() => {
    if (len === 0) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % len), interval);
    return () => clearInterval(id);
  }, [len, interval]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{ width, height }}
      className="relative overflow-hidden rounded-2xl border-green-300 border-1 shadow-lg bg-gray-200"
    >
      {/* Slide Container */}
      <motion.div
        ref={containerRef}
        className="flex h-full"
        animate={{
          x: `-${index * (100 / len)}%`,
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{
          width: `${len * 100}%`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              width: `${100 / len}%`,
              height: "100%",
            }}
          >
            <motion.img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
              draggable={false}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        ))}
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <motion.button
            whileHover={{ scale: 1.2 }}
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white ring-2 ring-green-500" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
