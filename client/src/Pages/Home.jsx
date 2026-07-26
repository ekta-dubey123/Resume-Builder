import React from 'react'
import Banner from '../Components/home/Banner'
import Hero from '../Components/home/Hero'
import Features from '../Components/home/features'
import Badge from '../Components/home/Badge'
import Testinomials from '../Components/home/Testinomials'
import CallToAction from '../Components/home/CallToAction'
import Footer from '../Components/home/Footer'

const Home = () => {
  return (
    <div>
    <Banner/>
    <Hero/>
    <Features/>
    <Testinomials/>
    <CallToAction/>
    <Footer/>
    <Badge/>
    </div>
    
  )
}

export default Home