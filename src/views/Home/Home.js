import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import HeroComponent from '../../components/HeroComponent/HeroComponent';
import VideoSection from '../../components/VideoSection/VideoSection';
import Courses from '../../components/Courses/Courses';
import Categorys from '../../components/Categorys/Categorys';
import Companies from '../../components/Companies/Companies';
import SuccessStories from '../../components/SuccessStories/SuccessStories';
import Footer from '../../components/Footer/Footer';
import Faq from '../../components/Faq/Faq';


function Home() {
  return (
    <div>
        <Navbar/>
        <HeroComponent/>
        <VideoSection/>
        <Categorys/>
        <Courses/>     
        <Companies/>
        <SuccessStories/>
        <Faq/>
        <Footer/>
        
        
    </div>
  )
}

export default Home
