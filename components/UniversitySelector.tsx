import React, { useState } from 'react';
import { Search, MapPin, School } from 'lucide-react';
import { University } from '../types';
import { UNIVERSITIES } from '../constants';

interface Props {
  onSelect: (uni: University) => void;
}

export const UniversitySelector: React.FC<Props> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnis = UNIVERSITIES.filter(uni => 
    uni.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center mb-12">
        <div className="flex justify-center mb-6">
           <div className="p-4 bg-blue-600 rounded-full shadow-lg">
             <School className="w-12 h-12 text-white" />
           </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          CampusCon
        </h1>
        <p className="text-lg text-slate-600">
          Your centralized gateway to university life. Find your campus to begin.
        </p>
      </div>

      <div className="w-full max-w-xl relative">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all shadow-sm text-lg"
            placeholder="Search your university..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {searchTerm && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-10 max-h-96 overflow-y-auto">
            {filteredUnis.length > 0 ? (
              filteredUnis.map(uni => (
                <button
                  key={uni.id}
                  onClick={() => onSelect(uni)}
                  className="w-full text-left p-4 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors flex items-center gap-4"
                >
                  <img src={uni.logoUrl} alt={uni.name} className="w-10 h-10 rounded-full object-cover bg-slate-200" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{uni.name}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-0.5">
                      <MapPin className="w-3 h-3 mr-1" />
                      {uni.location}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-slate-500">No universities found.</div>
            )}
          </div>
        )}
      </div>

      <div className="mt-12 flex gap-4 text-sm text-slate-400">
        <span>© 2024 CampusCon</span>
        <span>•</span>
        <span>Privacy</span>
        <span>•</span>
        <span>Institutional Login</span>
      </div>
    </div>
  );
};
