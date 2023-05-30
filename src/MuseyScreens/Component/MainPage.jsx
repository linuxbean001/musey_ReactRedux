import React from 'react'
import Header from '../../Shared/Component/Header'
import HeroSection from './HeroSection'
import MidSection from './MidSection'
import BottomSection from './BottomSection'


function MainPage() {
  return (
  <div className="mainWraper">
    <Header/>
    <HeroSection/>
    <MidSection/>
    <BottomSection/>
  </div>
  )
}

export default MainPage