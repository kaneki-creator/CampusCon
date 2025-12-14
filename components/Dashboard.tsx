import React, { useState } from 'react';
import { University, Event, EventStatus } from '../types';
import { MOCK_EVENTS } from '../constants';
import { EventCard } from './EventCard';
import { EventModal } from './EventModal';
import { Sparkles, History, CalendarDays, LogOut } from 'lucide-react';
import { generateAssumedEvents } from '../services/geminiService';

interface Props {
  university: University;
  studentId: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<Props> = ({ university, studentId, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [predicting, setPredicting] = useState(false);
  const [hasPredicted, setHasPredicted] = useState(false);

  const upcomingEvents = events.filter(e => e.status === EventStatus.UPCOMING || e.status === EventStatus.ASSUMED);
  const pastEvents = events.filter(e => e.status === EventStatus.PAST);

  const handlePredictEvents = async () => {
      setPredicting(true);
      const predicted = await generateAssumedEvents();
      // Add unique IDs to avoid collision with existing mock
      const newEvents = [...events, ...predicted];
      setEvents(newEvents);
      setPredicting(false);
      setHasPredicted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
               <img src={university.logoUrl} alt="logo" className="w-8 h-8 rounded-full border border-slate-200" />
               <div>
                  <h1 className="text-lg font-bold text-slate-900 leading-none">{university.name}</h1>
                  <span className="text-xs text-slate-500">Events Portal</span>
               </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600 hidden sm:block">
                    ID: <span className="font-mono text-slate-900">{studentId}</span>
                </span>
                <button onClick={onLogout} className="text-slate-400 hover:text-red-500 transition-colors">
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Campus Events Dashboard</h2>
            <p className="text-slate-500">Discover what's happening and explore history.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 overflow-x-auto">
            <button 
                onClick={() => setActiveTab('upcoming')}
                className={`flex items-center gap-2 pb-3 px-1 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'upcoming' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
                <CalendarDays className="w-4 h-4" /> Upcoming & Recommended
            </button>
            <button 
                onClick={() => setActiveTab('past')}
                className={`flex items-center gap-2 pb-3 px-1 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'past' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
                <History className="w-4 h-4" /> Past Events Archive
            </button>
        </div>

        {/* Content */}
        {activeTab === 'upcoming' && (
            <div>
                 {!hasPredicted && (
                     <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 mb-8 text-white flex items-center justify-between shadow-lg">
                        <div>
                            <h3 className="text-lg font-bold mb-1">Plan Ahead with AI</h3>
                            <p className="text-purple-100 text-sm opacity-90">Analyze past trends to predict probable future events.</p>
                        </div>
                        <button 
                            onClick={handlePredictEvents}
                            disabled={predicting}
                            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-50 transition-colors flex items-center gap-2 disabled:opacity-70"
                        >
                            {predicting ? 'Analyzing...' : <><Sparkles className="w-4 h-4" /> Predict Events</>}
                        </button>
                     </div>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map(evt => (
                        <EventCard key={evt.id} event={evt} onClick={() => setSelectedEvent(evt)} />
                    ))}
                 </div>
                 {upcomingEvents.length === 0 && (
                     <div className="text-center py-20 text-slate-400">No upcoming events listed. Try the AI predictor!</div>
                 )}
            </div>
        )}

        {activeTab === 'past' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map(evt => (
                    <EventCard key={evt.id} event={evt} onClick={() => setSelectedEvent(evt)} />
                ))}
                {pastEvents.length === 0 && (
                     <div className="text-center py-20 text-slate-400">No event history found.</div>
                 )}
             </div>
        )}

      </main>

      {/* Modal */}
      {selectedEvent && (
          <EventModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
            primaryColor={university.primaryColor}
          />
      )}
    </div>
  );
};
