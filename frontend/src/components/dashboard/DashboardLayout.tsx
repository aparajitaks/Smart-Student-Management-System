import React from 'react';
import { Sidebar } from './Sidebar';
import { Routes, Route } from 'react-router-dom';
import { AdminDashboard } from '../../pages/dashboard/AdminDashboard';
import { BatchHopper } from '../../pages/dashboard/BatchHopper';

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="absolute top-0 right-0 p-32 bg-indigo-600/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 p-32 bg-purple-600/5 blur-[120px] rounded-full -z-10" />
        
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/batches" element={<BatchHopper />} />
          {/* Add other dashboard routes here */}
        </Routes>
      </main>
    </div>
  );
};
