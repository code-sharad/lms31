
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserLayout from './UserLayout';
import ForgotPassword from '../../Login/ForgetPassword';
import ResetPassword from '../../Login/ResetPassword';

const UserRoutes = () => {
   return (
      <div>

      <Routes> 
            <Route  path='/' element={UserLayout} >

               <Route path="/forgot-password" element={<ForgotPassword />}  />
               <Route path="/resetPassword" element={<ResetPassword />}  />

            </Route>
      </Routes>
         
      </div>
   );
}

export default UserRoutes;

