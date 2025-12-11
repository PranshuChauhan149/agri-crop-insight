import React from 'react'

import HeroSection from '../components/Hero'
import AboutSection from '../components/abouthome'
import ExpertiseSection from '../components/ExpertiseHome'
import WhyChooseUs from '../components/WhyHome'
import TestimonialsSection from '../components/TestHome'
import NextSolution from '../components/nEXThOME.JSX'
import ProductsSection from '../components/ProductHome'


const Landingpage = () => {
  return (
    <div>
      <HeroSection/>
      <AboutSection/>
      <ProductsSection/>
      <WhyChooseUs/>
      <ExpertiseSection/>
      
      <TestimonialsSection/>
      <NextSolution/>
    </div>
  )
}

export default Landingpage
