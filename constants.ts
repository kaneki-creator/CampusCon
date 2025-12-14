import { University, Event, EventCategory, EventStatus } from './types';

export const UNIVERSITIES: University[] = [
  {
    id: 'uni_1',
    name: 'Metropolis Institute of Technology',
    location: 'New York, NY',
    logoUrl: 'https://picsum.photos/seed/mit_logo/100/100',
    primaryColor: 'bg-blue-600'
  },
  {
    id: 'uni_2',
    name: 'Greenwood State University',
    location: 'Austin, TX',
    logoUrl: 'https://picsum.photos/seed/gsu_logo/100/100',
    primaryColor: 'bg-green-600'
  },
  {
    id: 'uni_3',
    name: 'Royal Academy of Arts',
    location: 'London, UK',
    logoUrl: 'https://picsum.photos/seed/raa_logo/100/100',
    primaryColor: 'bg-purple-600'
  },
  {
    id: 'uni_4',
    name: 'Amrapali University',
    location: 'Haldwani, Uttarakhand',
    logoUrl: 'https://picsum.photos/seed/amrapali/100/100',
    primaryColor: 'bg-orange-600'
  }
];

// Mock Data Generation Helpers
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

export const MOCK_EVENTS: Event[] = [
  // --- UPCOMING EVENTS ---
  {
    id: 'evt_u1',
    title: 'Spring Hackathon 2025',
    description: 'A 24-hour coding marathon to solve campus problems. Teams of 4 allowed. Food and swag provided.',
    date: '2025-04-15',
    location: 'Engineering Block B, Hall 3',
    organizer: 'Computer Science Society',
    category: EventCategory.TECH,
    status: EventStatus.UPCOMING,
    imageUrl: 'https://picsum.photos/seed/hackathon/800/400',
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSd_mock_form',
    isAiPredicted: false,
  },
  {
    id: 'evt_u2',
    title: 'Inter-Department Football Finals',
    description: 'The final showdown between Mechanical Engineering and Business School. Come cheer for your team!',
    date: '2025-04-20',
    location: 'Main Stadium',
    organizer: 'Sports Committee',
    category: EventCategory.SPORTS,
    status: EventStatus.UPCOMING,
    imageUrl: 'https://picsum.photos/seed/football/800/400',
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSd_mock_form_sports',
    isAiPredicted: false,
  },
  {
    id: 'evt_u3',
    title: 'Career Fair: Summer Internships',
    description: 'Meet recruiters from top tech and finance companies. Bring your resume.',
    date: '2025-05-01',
    location: 'University Auditorium',
    organizer: 'Placement Cell',
    category: EventCategory.CAREER,
    status: EventStatus.UPCOMING,
    imageUrl: 'https://picsum.photos/seed/career/800/400',
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSd_mock_form_career',
    isAiPredicted: false,
  },

  // --- PAST EVENTS (Rich History) ---
  {
    id: 'evt_p1',
    title: 'Annual Cultural Fest "Aura 2024"',
    description: 'A 3-day extravaganza of dance, music, and art. The biggest event of the year featuring guest bands and student performances.',
    date: '2024-11-10',
    location: 'Open Air Theatre',
    organizer: 'Student Council',
    category: EventCategory.CULTURAL,
    status: EventStatus.PAST,
    imageUrl: 'https://picsum.photos/seed/concert/800/400',
    galleryImages: [
      'https://picsum.photos/seed/concert1/400/300',
      'https://picsum.photos/seed/concert2/400/300',
      'https://picsum.photos/seed/concert3/400/300',
      'https://picsum.photos/seed/concert4/400/300',
    ],
    reviews: [
      { id: 'r1', studentName: 'Alex D.', rating: 5, comment: 'Absolutely insane energy! The band was amazing.', timestamp: '2024-11-12' },
      { id: 'r2', studentName: 'Sarah M.', rating: 4, comment: 'Great performances, but food stalls were too crowded.', timestamp: '2024-11-13' },
      { id: 'r3', studentName: 'Priya K.', rating: 5, comment: 'Best fest in my 3 years here.', timestamp: '2024-11-12' },
    ],
    isAiPredicted: false,
  },
  {
    id: 'evt_p2',
    title: 'Robotics Workshop: Basics of Arduino',
    description: 'A hands-on workshop for beginners to learn electronics and coding.',
    date: '2024-10-05',
    location: 'Lab 204',
    organizer: 'Robotics Club',
    category: EventCategory.TECH,
    status: EventStatus.PAST,
    imageUrl: 'https://picsum.photos/seed/robotics/800/400',
    galleryImages: [
      'https://picsum.photos/seed/robo1/400/300',
      'https://picsum.photos/seed/robo2/400/300',
    ],
    reviews: [
      { id: 'r4', studentName: 'John T.', rating: 3, comment: 'Good content, but the kits were limited.', timestamp: '2024-10-06' },
      { id: 'r5', studentName: 'Emily R.', rating: 5, comment: 'Learned so much in just 4 hours.', timestamp: '2024-10-06' },
    ],
    isAiPredicted: false,
  },
  {
    id: 'evt_p3',
    title: 'Guest Lecture: Future of AI',
    description: 'Dr. Alan Grant discussed the implications of generative AI in modern software engineering.',
    date: '2024-09-15',
    location: 'Seminar Hall A',
    organizer: 'CS Dept',
    category: EventCategory.ACADEMIC,
    status: EventStatus.PAST,
    imageUrl: 'https://picsum.photos/seed/lecture/800/400',
    galleryImages: [
      'https://picsum.photos/seed/lecture1/400/300',
      'https://picsum.photos/seed/lecture2/400/300',
    ],
    reviews: [
      { id: 'r6', studentName: 'Mike L.', rating: 4, comment: 'Very insightful, tough technically heavy.', timestamp: '2024-09-15' },
    ],
    isAiPredicted: false,
  }
];

// Assumed Data for AI Context (Hidden from regular view initially)
export const PAST_YEAR_EVENTS_CONTEXT = `
  Last year's events:
  - January: Winter Coding Boot camp (Tech)
  - February: Valentine's Rose Sale (Social)
  - March: Annual Sports Meet (Sports)
  - August: Freshers Welcome Party (Social)
  - September: Debate Championship (Academic)
  - October: Halloween Horror Night (Social)
`;