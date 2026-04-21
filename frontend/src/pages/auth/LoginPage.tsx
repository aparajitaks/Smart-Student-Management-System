import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data.data;
      setAuth(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent)]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-dark w-full max-w-md p-8 relative"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 mb-4">
            <GraduationCap size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-slate-400">Enter your credentials to access dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="admin@school.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-semibold py-3 rounded-xl transition-all shadow-lg ${
              isLoading 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
            }`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
