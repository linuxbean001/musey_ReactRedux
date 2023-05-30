import React from 'react'

import HeroSection from './HeroSection'
import MidSection from './MidSection'
import BottomSection from './BottomSection'


function MainPage() {
  return (
  <div className="mainWraper">
   
    <HeroSection/>
    <MidSection/>
    <BottomSection/>
  </div>
  )
}

export default MainPage