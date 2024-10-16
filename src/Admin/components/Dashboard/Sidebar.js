import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="text-2xl font-bold mb-6">Admin Menu</h2>
      <a href="#dashboard">Dashboard</a>
      <a href="#students">Students</a>
      <a href="#teachers">Teachers</a>
      <a href="#courses">Courses</a>
      <a href="#classes">Classes</a>
      <a href="#departments">Departments</a>
    </div>
  );
};

export default Sidebar;
