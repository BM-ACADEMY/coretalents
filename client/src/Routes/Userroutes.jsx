import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from '@/userdashbaord/UserDashboard';
import CreateResume from '@/userdashbaord/Pages/CreateResume';

const Userroutes = () => {
  return (
    <Routes>
      {/* Default redirect to dashboard */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      
      {/* /user/dashboard */}
      <Route path="dashboard" element={<UserDashboard />} />
      
      {/* /user/create-resume */}
      <Route path="create-resume" element={<CreateResume />} />
      
    </Routes>
  );
};

export default Userroutes;