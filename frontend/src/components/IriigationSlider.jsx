import React, { useEffect, useState } from "react";
import img1 from "../assets/soil.jpeg";
import img2 from "../assets/IRRIGATION1.jpg";
import img3 from "../assets/IRRIGATION2.jpg";
import img4 from "../assets/dash2.jpeg";
import img5 from "../assets/irr4.jpeg";

const images = [img1, img2, img3, img4, img5];

const irrigationCards = [
  { title: "Water Savings", value: "Save up to 30% water with AI-optimized scheduling." },
  { title: "Increase Crop Yield", value: "Boost productivity by up to 25% using smart irrigation." },
  { title: "AI Predictions", value: "Get real-time irrigation forecasts and moisture alerts." },
  { title: "Soil Health", value: "Maintain balanced soil moisture across all crop stages." },
  { title: "Weather-Based Control", value: "Automatically adjust irrigation based on rainfall predictions." },
  { title: "Smart Water Allocation", value: "Distribute water precisely where crops need it most." },
];

const ThreeCardSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % irrigationCards.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + irrigationCards.length) % irrigationCards.length);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, []);

  // Cards + Images for visible 3
  const visible = [
    { ...irrigationCards[current], img: images[current % images.length] },
    { ...irrigationCards[(current + 1) % irrigationCards.length], img: images[(current + 1) % images.length] },
    { ...irrigationCards[(current + 2) % irrigationCards.length], img: images[(current + 2) % images.length] },
  ];

  return (
    <div className="w-full flex flex-col items-center mt-12">
      {/* SLIDER WRAPPER */}
      <div className="relative w-full max-w-6xl flex items-center justify-center">
        
        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="absolute left-0 bg-white shadow px-3 py-2 rounded-full text-2xl hover:bg-gray-100 z-20"
        >
          ‹
        </button>

        {/* CARDS SECTION */}
        <div className="flex gap-8 px-10">
          {visible.map((item, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-2xl w-[300px] overflow-hidden">

              {/* IMAGE HEADER */}
              <div className="relative h-40 w-full">
                <img
                  src={item.img}
                  alt="irrigation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-800/40"></div>
              </div>

              {/* CONTENT */}
              <div className="p-5 text-center">
                <h2 className="font-semibold text-lg text-green-700">{item.title}</h2>
                <p className="text-gray-600 text-sm mt-2 mb-4 leading-relaxed">
                  {item.value}
                </p>
                <button className="bg-green-700 text-white rounded-full px-6 py-2 text-sm hover:bg-green-800">
                  Learn More
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="absolute right-0 bg-white shadow px-3 py-2 rounded-full text-2xl hover:bg-gray-100 z-20"
        >
          ›
        </button>
      </div>

      {/* DOT INDICATORS */}
      <div className="flex gap-2 mt-5">
        {irrigationCards.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full ${
              i === current ? "bg-green-700" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ThreeCardSlider;
