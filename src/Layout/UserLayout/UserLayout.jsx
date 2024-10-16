




import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

const UserLayout = () => {
   return (
      <div>
            {/*    fixed header navbar */}
            <header>
                  <Navbar /> 
            </header>

            {/*  dynamic content inside this main container */}
            <main>
                  <Outlet />
            </main>
         
               {/*  fixed footer */}
            <footer>
                  <Footer />
            </footer>
      </div>
   );
}

export default UserLayout;










