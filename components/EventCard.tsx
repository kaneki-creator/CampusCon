import React from 'react';
import { Calendar, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { Event, EventStatus } from '../types';

interface Props {
  event: Event;
  onClick: () => void;
}

export const EventCard: React.FC<Props> = ({ event, onClick }) => {
  const isPast = event.status === EventStatus.PAST;
  const isAssumed = event.status === EventStatus.ASSUMED;

  return (
    <div 
      className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 overflow-hidden cursor-pointer flex flex-col h-full relative ${isAssumed ? 'border-dashed border-purple-200 bg-purple-50/30' : ''}`}
      onClick={onClick}
    >
      {isAssumed && (
        <div className="absolute top-3 right-3 bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
          <Sparkles className="w-3 h-3 mr-1" /> Predicted
        </div>
      )}
      
      <div className="h-48 overflow-hidden relative">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isPast ? 'grayscale-[30%]' : ''}`}
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-slate-800 uppercase tracking-wide">
          {event.category}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-auto">
          <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 line-clamp-2">
            {event.title}
          </h3>
          <p className="text-slate-500 text-sm line-clamp-2 mb-4">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {!isPast && !isAssumed && (
             <div className="mt-4 w-full bg-blue-50 text-blue-600 py-2 rounded-lg text-center text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                Details & Register <ExternalLink className="w-3 h-3" />
             </div>
        )}
        
        {isPast && (
            <div className="mt-4 w-full bg-slate-50 text-slate-600 py-2 rounded-lg text-center text-sm font-medium group-hover:bg-slate-800 group-hover:text-white transition-colors">
                View Gallery & Reviews
            </div>
        )}
      </div>
    </div>
  );
};
