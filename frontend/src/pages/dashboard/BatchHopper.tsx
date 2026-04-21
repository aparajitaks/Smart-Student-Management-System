import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, CheckCircle2, AlertCircle, Search } from 'lucide-react';

export const BatchHopper = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [fromBatch, setFromBatch] = useState('');
  const [toBatch, setToBatch] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTransfer = () => {
    setIsTransferring(true);
    // Simulate API call
    setTimeout(() => {
      setIsTransferring(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Batch Hopper</h1>
        <p className="text-slate-400">Securely transfer students between academic batches</p>
      </div>

      <div className="glass p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Selection */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-300">Select Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Search by name or roll number..."
                onChange={(e) => setSelectedStudent(e.target.value)}
              />
            </div>
          </div>

          {/* Transfer Details */}
          <div className="flex items-center justify-between gap-4 pt-6 md:pt-0">
            <div className="flex-1 space-y-2">
              <label className="text-xs text-slate-500 uppercase tracking-wider">From Batch</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                value={fromBatch}
                onChange={(e) => setFromBatch(e.target.value)}
              >
                <option value="">Select Batch</option>
                <option value="A">2024 - Computer Science A</option>
                <option value="B">2024 - Computer Science B</option>
              </select>
            </div>
            
            <div className="mt-6 text-indigo-500">
              <ArrowLeftRight size={24} />
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-xs text-slate-500 uppercase tracking-wider">To Batch</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                value={toBatch}
                onChange={(e) => setToBatch(e.target.value)}
              >
                <option value="">Select Batch</option>
                <option value="B">2024 - Computer Science B</option>
                <option value="C">2024 - Computer Science C</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex gap-3">
          <AlertCircle className="text-indigo-400 shrink-0" size={20} />
          <p className="text-sm text-indigo-200">
            Destination batch "2024 - Computer Science B" has 5 spots remaining.
          </p>
        </div>

        <button
          onClick={handleTransfer}
          disabled={!selectedStudent || !fromBatch || !toBatch || isTransferring}
          className={`
            w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2
            ${isTransferring ? 'bg-slate-700 text-slate-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'}
          `}
        >
          {isTransferring ? 'Processing Transfer...' : 'Confirm Student Transfer'}
        </button>

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-emerald-400 justify-center font-medium"
          >
            <CheckCircle2 size={20} />
            Transfer completed successfully!
          </motion.div>
        )}
      </div>
    </div>
  );
};
