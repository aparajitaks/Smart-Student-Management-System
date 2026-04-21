import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, CheckCircle2, AlertCircle, Search, Loader2 } from 'lucide-react';
import { batchService, Batch, Student } from '../../services/batchService';

export const BatchHopper = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [fromBatch, setFromBatch] = useState('');
  const [toBatch, setToBatch] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const data = await batchService.getAllBatches();
      setBatches(data);
    } catch (err) {
      setError('Failed to fetch batches');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setStudents([]);
      return;
    }
    try {
      const results = await batchService.searchStudents(query);
      setStudents(results);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  const handleTransfer = async () => {
    if (!selectedStudent) return;
    setIsTransferring(true);
    setError('');
    try {
      await batchService.transferStudent(selectedStudent._id, fromBatch, toBatch);
      setSuccess(true);
      setSelectedStudent(null);
      setFromBatch('');
      setToBatch('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Transfer failed');
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Batch Hopper</h1>
        <p className="text-slate-400">Securely transfer students between academic batches</p>
      </div>

      <div className="glass p-8 space-y-8">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

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
                onChange={(e) => handleSearch(e.target.value)}
              />
              {students.length > 0 && !selectedStudent && (
                <div className="absolute top-full left-0 w-full mt-2 glass-dark rounded-xl border border-slate-700 overflow-hidden z-20">
                  {students.map((student) => (
                    <button
                      key={student._id}
                      onClick={() => {
                        setSelectedStudent(student);
                        setStudents([]);
                      }}
                      className="w-full p-3 text-left text-white hover:bg-indigo-600/20 border-b border-slate-800 last:border-0 transition-colors"
                    >
                      <div className="font-medium">{student.name}</div>
                      <div className="text-xs text-slate-500">{student.rollNumber}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedStudent && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <div>
                  <div className="text-white font-medium">{selectedStudent.name}</div>
                  <div className="text-xs text-slate-400">{selectedStudent.rollNumber}</div>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="text-slate-500 hover:text-white"
                >
                  Change
                </button>
              </div>
            )}
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
                {batches.map(batch => (
                  <option key={batch._id} value={batch._id}>{batch.name}</option>
                ))}
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
                {batches.map(batch => (
                  <option key={batch._id} value={batch._id}>{batch.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleTransfer}
          disabled={!selectedStudent || !fromBatch || !toBatch || isTransferring}
          className={`
            w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2
            ${isTransferring ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'}
          `}
        >
          {isTransferring ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Processing Transfer...
            </>
          ) : 'Confirm Student Transfer'}
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

