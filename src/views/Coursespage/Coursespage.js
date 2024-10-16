import React from 'react';
import Courses from '../../components/Courses/Courses';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function Coursespage() {
  return (
    <div>
      <Navbar/>
     <div className='m-16'>
       <Courses/>
     </div>
      <Footer/>
    </div>
  )
}

export default Coursespage
