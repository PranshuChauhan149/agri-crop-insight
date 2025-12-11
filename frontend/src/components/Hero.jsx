import React from "react";
import d from "../assets/p2.jpeg";

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={d}
        alt="Hero Drone"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Content wrapper */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">

        {/* MAIN CONTENT ROW */}
        <div className="flex flex-col md:flex-row items-start md:items-center w-full h-full pt-24">

          {/* LEFT TEXT */}
          <div className="w-full md:w-[55%]">
            <h1
              className="text-white font-extrabold leading-[1.05] tracking-tight
              text-[45px] sm:text-[55px] md:text-[70px] lg:text-[78px]"
            >
              INNOVATIVE <br />
              AGRO TECH <br />
              <span className="text-lime-300">BY AGRONEXT</span>
            </h1>

            <button
              className="mt-8 sm:mt-10 bg-lime-400 hover:bg-lime-300 
              text-black font-medium text-[16px] sm:text-[18px] px-6 sm:px-8 py-3 
              rounded-full inline-flex items-center gap-2"
            >
              Explore Solutions →
            </button>
          </div>

          {/* RIGHT PARAGRAPH */}
          <div
            className="w-full md:w-[35%] ml-auto text-right mt-10 md:mt-0 
            text-white font-light leading-relaxed opacity-95 text-[16px] sm:text-[18px]"
          >
            We are driving the future of farming with <br />
            advanced machinery and automation to <br />
            maximize yield and sustainability.
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      {/* <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30
        text-white text-[12px] sm:text-[14px] tracking-[0.35em]"
      >
        SCROLL
      </div> */}
    </section>
  );
}