import React from 'react';
import { HeroScene } from '../../components/three/HeroScene';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <HeroScene />
      
      <div className="z-10 max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-dark p-12 space-y-8"
        >
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/20 text-primary">
              <GraduationCap size={48} />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
            Smart Student <br /> Management System
          </h1>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A production-grade education ERP for modern academic excellence. 
            Manage batches, track performance, and automate attendance with our premium dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/login">
              <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all group">
                Login to Dashboard
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="px-8 py-4 glass hover:bg-white/20 text-white rounded-xl font-semibold transition-all">
              Explore Batch Hopper
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
