// /components/Dashboard/DashboardCard.js
import React from 'react';

const DashboardCard = ({ title, number }) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-green-400 text-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xxl">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-3xl font-semibold">{number}</p>
    </div>
  );
};

export default DashboardCard;
