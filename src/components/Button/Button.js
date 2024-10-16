import React from 'react';
import { Link } from 'react-router-dom';

function ImpButton() {
  return (
    <div className='flex justify-center'>
      <div className="text-center mt-12 text-black bg-cyan-400 text-xl  p-2 rounded">
        <Link to="/courses" className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4">
        
          <button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4">Check Courses - Make an Impact</button>
        </Link>
      </div>
    </div>
  );
}

function LearningButton(){
    return (
        <div className='flex justify-center'>
        <div className="text-center mt-12 text-black bg-cyan-400 text-xl  p-2 rounded">
          <button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4">Explore free learning</button>
        </div>
      </div>  
    )

}

export { ImpButton, LearningButton };
