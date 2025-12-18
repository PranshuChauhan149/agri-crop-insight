import React from "react";

import HeroSection from "../components/Hero";
import AboutSection from "../components/abouthome";
import ExpertiseSection from "../components/ExpertiseHome";
import WhyChooseUs from "../components/WhyHome";
import TestimonialsSection from "../components/TestHome";

import ProductsSection from "../components/ProductHome";

import Page from "../components/Page.jsx";

const Landingpage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <WhyChooseUs />
      <ExpertiseSection />

      <TestimonialsSection />
      <Page />
    </div>
  );
};

export default Landingpage;
