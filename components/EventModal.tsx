import React, { useEffect, useState } from 'react';
import { X, Calendar, MapPin, User, ExternalLink, MessageSquare, ImageIcon, Sparkles } from 'lucide-react';
import { Event, EventStatus } from '../types';
import { summarizeReviews } from '../services/geminiService';

interface Props {
  event: Event;
  onClose: () => void;
  primaryColor: string; // Tailwind class
}

export const EventModal: React.FC<Props> = ({ event, onClose, primaryColor }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'gallery' | 'reviews'>('info');
  const [summary, setSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  const isPast = event.status === EventStatus.PAST;

  useEffect(() => {
    // Only fetch summary if past event and has reviews
    if (isPast && event.reviews && event.reviews.length > 0 && activeTab === 'reviews') {
        const fetchSummary = async () => {
            setLoadingSummary(true);
            const text = await summarizeReviews(event.reviews!);
            setSummary(text);
            setLoadingSummary(false);
        };
        fetchSummary();
    }
  }, [isPast, event.reviews, activeTab]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col">
        {/* Header Image */}
        <div className="h-48 sm:h-64 relative shrink-0">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
             <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{event.title}</h2>
             <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {event.date}</span>
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {event.location}</span>
                <span className="flex items-center"><User className="w-4 h-4 mr-1.5" /> {event.organizer}</span>
             </div>
          </div>
        </div>

        {/* Navigation Tabs (Only for past events with content) */}
        {isPast && (
            <div className="flex border-b border-slate-100 px-6">
                <button 
                    onClick={() => setActiveTab('info')}
                    className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'info' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                    Overview
                </button>
                <button 
                    onClick={() => setActiveTab('gallery')}
                    className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'gallery' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                    <ImageIcon className="w-4 h-4" /> Gallery
                </button>
                <button 
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'reviews' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                    <MessageSquare className="w-4 h-4" /> Reviews
                </button>
            </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
            
            {/* --- INFO TAB --- */}
            {activeTab === 'info' && (
                <div className="space-y-6">
                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 leading-relaxed text-lg">{event.description}</p>
                    </div>

                    {!isPast && !event.isAiPredicted && (
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                            <h3 className="font-semibold text-slate-900 mb-2">Ready to participate?</h3>
                            <p className="text-slate-500 text-sm mb-4">Registration is handled directly by the university via Google Forms.</p>
                            <a 
                                href={event.registrationLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`inline-flex items-center justify-center px-6 py-3 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all gap-2 ${primaryColor}`}
                            >
                                Register Now <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    )}

                    {event.isAiPredicted && (
                         <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 flex items-start gap-4">
                             <div className="bg-purple-100 p-2 rounded-full shrink-0">
                                <Sparkles className="w-5 h-5 text-purple-600" />
                             </div>
                             <div>
                                <h3 className="font-semibold text-purple-900 mb-1">AI Predicted Event</h3>
                                <p className="text-purple-700 text-sm">
                                    This event is projected based on historical campus data. Dates and details are subject to official confirmation by the university.
                                </p>
                             </div>
                         </div>
                    )}
                </div>
            )}

            {/* --- GALLERY TAB --- */}
            {activeTab === 'gallery' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.galleryImages?.map((img, idx) => (
                        <div key={idx} className="aspect-square rounded-lg overflow-hidden group relative">
                            <img src={img} alt="Event moment" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </div>
                    )) || <p className="col-span-3 text-center text-slate-500 py-10">No images available for this event.</p>}
                </div>
            )}

            {/* --- REVIEWS TAB --- */}
            {activeTab === 'reviews' && (
                <div className="space-y-6">
                    {/* AI Summary Section */}
                    {event.reviews && event.reviews.length > 0 && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                             <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                <h4 className="font-semibold text-blue-900 text-sm">AI Sentiment Summary</h4>
                             </div>
                             {loadingSummary ? (
                                 <div className="animate-pulse flex space-x-4">
                                     <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                                 </div>
                             ) : (
                                 <p className="text-blue-800 text-sm italic">"{summary}"</p>
                             )}
                        </div>
                    )}

                    <div className="space-y-4">
                        {event.reviews?.map((review) => (
                            <div key={review.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-semibold text-slate-900">{review.studentName}</div>
                                    <div className="text-xs text-slate-400">{review.timestamp}</div>
                                </div>
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-slate-300'}`}>★</span>
                                    ))}
                                </div>
                                <p className="text-slate-600 text-sm">{review.comment}</p>
                            </div>
                        )) || <p className="text-center text-slate-500 py-10">No reviews yet.</p>}
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};
