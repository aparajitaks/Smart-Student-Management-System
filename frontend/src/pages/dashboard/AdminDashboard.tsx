import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserSquare2, School, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass p-6 space-y-4"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
        <TrendingUp size={16} />
        {trend}
      </div>
    </div>
    <div>
      <h3 className="text-slate-400 text-sm font-medium">{label}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </motion.div>
);

export const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">System Overview</h1>
        <p className="text-slate-400">Welcome back, Administrator</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          label="Total Students" 
          value="1,284" 
          trend="+12%" 
          color="bg-indigo-500" 
        />
        <StatCard 
          icon={UserSquare2} 
          label="Total Teachers" 
          value="48" 
          trend="+4%" 
          color="bg-purple-500" 
        />
        <StatCard 
          icon={School} 
          label="Active Batches" 
          value="32" 
          trend="+2%" 
          color="bg-pink-500" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Avg. Attendance" 
          value="94.2%" 
          trend="+1.5%" 
          color="bg-cyan-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-8">
          <h2 className="text-xl font-bold text-white mb-6">Attendance Trends</h2>
          <div className="h-64 flex items-center justify-center border border-white/5 rounded-xl bg-white/5">
            <span className="text-slate-500">Analytics Chart Placeholder</span>
          </div>
        </div>
        
        <div className="glass p-8">
          <h2 className="text-xl font-bold text-white mb-6">Recent Transfers</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800" />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">John Doe</p>
                  <p className="text-slate-400 text-xs">Batch A → Batch B</p>
                </div>
                <span className="text-slate-500 text-xs">2h ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
