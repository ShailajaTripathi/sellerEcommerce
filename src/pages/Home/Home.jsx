import React, { useEffect, useRef, useState } from 'react'
import Herobanner from './components/Herobanner/Herobanner';
import Counter from './components/Counter/Counter';
import WhySupplier from './components/WhySupplier/WhySupplier';
import ExclusiveSupplier from './components/ExclusiveSupplier/ExclusiveSupplier';
import ExperienceSupplier from './components/ExperienceSupplier/ExperienceSupplier';
import HowItWorks from './components/HowItWorks/HowItWorks';
import VisitHub from './components/VisitHub/VisitHub';
import GrowYourBusiness from './components/GrowYourBusiness/GrowYourBusiness';
import Support from './components/Support/Support';

const Home = () => {
// const ref = useRef()
  return (
    <>
      <Herobanner/>
      <Counter/>
      <WhySupplier/>
      <ExclusiveSupplier/>
      <ExperienceSupplier/>
      <HowItWorks/>
      <VisitHub/>
      <GrowYourBusiness/>
      <Support/>
    </>
  )
}

export default Home