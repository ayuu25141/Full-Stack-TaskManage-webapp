import React from 'react'
import Nav from '../Comp/nav'
import Hero from '../Comp/Hero'
import ProgressSection from '../Comp/ProgressSection'
import Featureheadline from '../Comp/Featureheadline'
import Featurebox from '../Comp/Featurebox'
import GetStartedSection from '../Comp/GetStartedSection'
import TestimonialsSection from '../Comp/TestimonialsSection'
import Cta from '../Comp/Cta'
import Footer from '../Comp/Footer'
function Home() {
  return (
   <>
   <Nav />
   <Hero />
  <ProgressSection />
  <Featureheadline />
  <Featurebox />
  <GetStartedSection />
  <TestimonialsSection />
  <Cta />
  <Footer />
   </>
  )
}

export default Home