import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default MainLayout;
