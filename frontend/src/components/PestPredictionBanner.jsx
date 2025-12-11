import React from "react";

const PestPredictionBanner = () => {
  return (
    <section className="w-full bg-[#f4f4ed] flex justify-center py-10">
      <div className="w-[95%] md:w-[92%] lg:w-[90%] bg-[#216944] rounded-[32px] px-8 md:px-14 lg:px-20 py-10 md:py-14 text-left text-white">

        {/* ICONS */}
        <div className="flex items-center gap-4 mb-10">
          {/* Shield icon */}
          <div className="h-14 w-14 rounded-[24px] bg-[#1a5a3a] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3.2 6 5.4v6.1c0 3.4 2.4 6.5 6 7.3 3.6-.8 6-3.9 6-7.3V5.4L12 3.2z" />
              <path d="M9.25 12.25 11 14l3.75-3.75" />
            </svg>
          </div>

          {/* Leaf icon */}
          <div className="h-14 w-14 rounded-[24px] bg-[#1a5a3a] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 19c8 0 14-6 14-14-4.5 0-8.3 1.5-11 4S5 14.5 5 19z" />
              <path d="M9 15c.5-1.5 1.5-3 3-4.5S15.5 8 17 7.5" />
            </svg>
          </div>
        </div>

        {/* TEXT */}
        <div className="max-w-3xl">
          <h1 className="font-serif font-semibold text-[2.3rem] leading-tight md:text-[2.9rem] lg:text-[3.2rem] mb-4">
            Pest Prediction &amp; Fertilizer
            <br />
            Recommendation
          </h1>

          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-[#f2f6f0]">
            Prevent attacks before they occur. Upload your plant image and get AI-powered 
            disease predictions with safe treatment recommendations.
          </p>
        </div>

      </div>
    </section>
  );
};

export default PestPredictionBanner;