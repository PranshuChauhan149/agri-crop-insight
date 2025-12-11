import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How accurate is the disease detection?",
    a: "CropGuard uses advanced AI models trained on thousands of plant images to provide high accuracy. Results may vary depending on image clarity."
  },
  {
    q: "What types of crops are supported?",
    a: "CropGuard currently supports over 50 crop types including wheat, rice, corn, tomatoes, potatoes, cotton, soybeans, and many more. We regularly add support for new crops."
  },
  {
    q: "Are the spray recommendations safe for organic farming?",
    a: "Yes, our spray suggestions include organic-friendly options and adhere to sustainable farming guidelines."
  },
  {
    q: "Can I use CropGuard offline?",
    a: "Some features work offline, but disease detection and fertilizer recommendations require internet connectivity."
  },
  {
    q: "How do I get personalized fertilizer recommendations?",
    a: "Provide soil details, crop type, and growth stage, and our system will generate tailored fertilizer suggestions."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full min-h-screen bg-[#f8f9f3] py-16 flex flex-col items-center">
      
      {/* Top Label */}
      <div className="px-6 py-1 rounded-full bg-[#e5efdf] text-[#4b704d] text-sm font-medium mb-4">
        FAQs
      </div>

      {/* Title */}
      <h1 className="text-4xl font-semibold text-[#1a2b1e] mb-2">
        Frequently Asked Questions
      </h1>

      {/* Subtitle */}
      <p className="text-[#7c8b7c] mb-10 text-center">
        Got questions? We've got answers.
      </p>

      {/* FAQ List */}
      <div className="w-full max-w-3xl space-y-4 px-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-[#d8e5d3] rounded-xl shadow-sm transition-all duration-300"
          >
            {/* Question Row */}
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left text-[#1a2b1e] font-medium text-lg"
            >
              {item.q}
              <ChevronDown
                className={`w-5 h-5 text-[#1a2b1e] transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Answer Section */}
            {openIndex === index && (
              <div className="px-6 pb-5 text-[#5b6d5b] leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;