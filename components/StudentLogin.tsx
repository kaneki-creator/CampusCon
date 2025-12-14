import React, { useState } from 'react';
import { ArrowRight, Lock, User } from 'lucide-react';
import { University } from '../types';

interface Props {
  university: University;
  onLogin: (studentId: string) => void;
  onBack: () => void;
}

export const StudentLogin: React.FC<Props> = ({ university, onLogin, onBack }) => {
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.length < 3) {
      setError('Please enter a valid Student ID');
      return;
    }
    // Simulate lightweight verification
    onLogin(studentId);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
        <div className="text-center mb-8">
           <img 
            src={university.logoUrl} 
            alt={university.name} 
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
           />
           <h2 className="text-xl font-bold text-slate-900">{university.name}</h2>
           <p className="text-slate-500 text-sm mt-1">Student Portal Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Student ID / Roll Number</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={studentId}
                onChange={(e) => {
                    setStudentId(e.target.value);
                    setError('');
                }}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                placeholder="e.g. 23211345"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}
          </div>

          <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-3">
             <Lock className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
             <p className="text-xs text-blue-700">
                This is a lightweight verification to ensure campus exclusivity. No sensitive personal data is stored.
             </p>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 ${university.primaryColor || 'bg-blue-600'}`}
          >
            Enter Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <button onClick={onBack} className="w-full mt-4 text-sm text-slate-400 hover:text-slate-600">
            Switch University
        </button>
      </div>
    </div>
  );
};