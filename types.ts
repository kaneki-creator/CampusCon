export enum EventCategory {
  ACADEMIC = 'Academic',
  CULTURAL = 'Cultural',
  SPORTS = 'Sports',
  TECH = 'Tech',
  SOCIAL = 'Social',
  CAREER = 'Career',
}

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  PAST = 'PAST',
  ASSUMED = 'ASSUMED', // AI Predicted
}

export interface Review {
  id: string;
  studentName: string; // Anonymized usually, but simulated here
  rating: number;
  comment: string;
  timestamp: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  category: EventCategory;
  status: EventStatus;
  imageUrl: string;
  galleryImages?: string[]; // For past events
  videoUrl?: string; // For past events
  registrationLink?: string; // Google Form URL
  reviews?: Review[];
  isAiPredicted?: boolean;
}

export interface University {
  id: string;
  name: string;
  location: string;
  logoUrl: string;
  primaryColor: string;
}
