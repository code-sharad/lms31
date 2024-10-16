import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const darkModeToggle = () => {
  document.documentElement.classList.toggle('dark');
};

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className='sticky top-0 w-full z-50'>
      <div className="flex items-center justify-between w-fit lg:w-full p-4 bg-gradient-to-r bg-white  text-gray-600 shadow-lg rounded-sm">
        
        <div className="flex items-center bg-white rounded-md border border-gray-500 hover:border-green-500 shadow-sm w-full max-w-md">
          <input type="text" placeholder="Search here..." className="flex-grow p-3 bg-transparent focus:outline-none" />
          <button className="p-2">
            <img aria-hidden="true" alt="search-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🔍" />
          </button>
        </div>
        <div className="flex items-center space-x-4 ml-4">
         
         
          <div className="flex items-center space-x-2">
            <img className="w-10 h-10 rounded-full border-2 border-primary" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User profile picture" />
            <div className="text-sm">
              <p className="font-semibold">Amrita Singh</p>
            
            </div>
          </div>
          <button className="p-2 transition-transform transform hover:scale-110 bg-gradient-to-r from-teal-400 to-green-500 rounded-full">
            <img aria-hidden="true" alt="settings-icon" src="https://openui.fly.dev/openui/24x24.svg?text=⚙️" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
