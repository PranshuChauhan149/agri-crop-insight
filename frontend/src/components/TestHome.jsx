import React from "react";
import farmer1 from "../assets/t1.jpeg"
import farmer2 from "../assets/t2.jpeg";

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-gradient-to-br  from-green-300 via-gray-300 to-green-200  py-20 px-6 md:px-16 lg:px-24">

      {/* TOP HEADING */}
      <div className="flex items-center justify-center mb-4">
        <hr className="border-gray-300 w-12" />
        <span className="mx-3 text-gray-600 tracking-wide font-medium text-[14px]">
          OUR TESTIMONIALS
        </span>
        <hr className="border-gray-300 w-12" />
      </div>

      <h2 className="text-center text-[34px] md:text-[42px] font-bold text-gray-900 leading-snug mb-16">
        Trusted by Farmers <br /> Worldwide
      </h2>

      {/* TWO TESTIMONIALS SIDE BY SIDE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-center">

        {/* TESTIMONIAL 1 */}
        <div className="flex flex-col items-center">
          <img
            src={farmer1}
            alt="Farmer"
            className="w-28 h-28 rounded-full object-cover mb-6"
          />

          <p className="max-w-xl text-gray-700 text-[16px] leading-relaxed mb-6">
            "Our vision is to revolutionize agriculture through intelligent 
            machinery that enhances productivity, reduces manual effort, and 
            ensures food security for the growing global population."
          </p>

          <h3 className="text-[18px] font-semibold text-gray-900">
            David Rodriguez
          </h3>
          <p className="text-gray-600 text-[15px]">Agriculturist</p>
        </div>

        {/* TESTIMONIAL 2 */}
        <div className="flex flex-col items-center">
          <img
            src={farmer2}
            alt="Farmer"
            className="w-28 h-28 rounded-full object-cover mb-6"
          />

          <p className="max-w-xl text-gray-700 text-[16px] leading-relaxed mb-6">
            "The automation tools from Agronext have reduced our labor costs and 
            improved crop consistency. It's the future of farming, today. It’s a 
            game changer for our operation."
          </p>

          <h3 className="text-[18px] font-semibold text-gray-900">
            David Rodriguez
          </h3>
          <p className="text-gray-600 text-[15px]">Farm Founder</p>
        </div>

      </div>
    </section>
  );
}