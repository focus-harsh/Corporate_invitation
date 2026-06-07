// ─────────────────────────────────────────────────────────────
// Event Configuration — The Art of Story Telling by Harsh Shah
// Update this file to change event details site-wide.
// ─────────────────────────────────────────────────────────────

export const EVENT = {
  name: 'The Art of Story Telling',
  byline: 'By Harsh Shah',
  fullTitle: 'The Art of Story Telling By Harsh Shah',
  tagline: 'Stories Connect. Influence. Inspire.',

  // 12 June 2026, 10:00 AM IST (UTC+5:30)
  date: new Date('2026-06-12T10:00:00+05:30'),
  dateDisplay: '12 June 2026',
  timeDisplay: '10:00 AM – 5:00 PM',
  location: 'Ahmedabad, Gujarat',

  venue: {
    name: 'The Grand Bhagwati',
    address: 'S.G Highway, Ahmedabad, Gujarat',
    mapsUrl: 'https://maps.app.goo.gl/BPcwGt624T3x1yP86',
    mapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.8!2d72.5!3d23.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sThe+Grand+Bhagwati!5e0!3m2!1sen!2sin!4v1',
  },

  youtubeVideoId: 'KUkdawoG7iM',

  // Agenda items
  agenda: [
    {
      id: 'welcome',
      title: 'Welcome & Registration',
      time: '09:30 AM – 10:00 AM',
      description: "Let's begin our journey together.",
      image: '/assets/3_Welcome_and_Registration.png',
    },
    {
      id: 'session1',
      title: 'Discover Your Story',
      label: 'Session 1',
      time: '10:00 AM – 11:00 AM',
      description: 'Uncover the experiences that shaped you.',
      image: '/assets/4_Session_1.png',
    },
    {
      id: 'session2',
      title: 'Structure That Connects',
      label: 'Session 2',
      time: '11:15 AM – 12:15 PM',
      description: 'Build a story that engages and flows.',
      image: '/assets/5_Session_2.png',
    },
    {
      id: 'lunch',
      title: 'Lunch Break',
      time: '12:15 PM – 01:15 PM',
      description: 'Recharge and connect.',
      image: null,
    },
    {
      id: 'session3',
      title: 'Deliver With Impact',
      label: 'Session 3',
      time: '01:15 PM – 02:15 PM',
      description: 'Speak your story with confidence and clarity.',
      image: '/assets/6_Session_3.png',
    },
    {
      id: 'networking',
      title: 'Networking Break',
      time: '02:15 PM – 02:45 PM',
      description: 'Conversations today. Connections tomorrow.',
      image: '/assets/8_Networking_Break.png',
    },
    {
      id: 'exercise',
      title: 'Interactive Exercise',
      time: '02:45 PM – 03:45 PM',
      description: 'Practice. Share. Grow together.',
      image: '/assets/7_Exercise_Together.png',
    },
    {
      id: 'closing',
      title: 'Closing & Takeaways',
      time: '03:45 PM – 04:15 PM',
      description: 'Key learnings to inspire your journey ahead.',
      image: '/assets/9_Closing_Takeaways.png',
    },
    {
      id: 'venue',
      title: 'Venue Experience',
      time: '04:15 PM – 05:00 PM',
      description: 'Continue conversations and networking.',
      image: '/assets/2_Event_Venue.png',
    },
  ],

  // Gallery images (all event photos)
  galleryImages: [
    { src: '/assets/1_The Art of Story telling By Harsh Shah.png', alt: 'The Art of Story Telling cover' },
    { src: '/assets/2_Event_Venue.png', alt: 'Event venue' },
    { src: '/assets/3_Welcome_and_Registration.png', alt: 'Welcome and registration' },
    { src: '/assets/4_Session_1.png', alt: 'Session 1 — Discover Your Story' },
    { src: '/assets/5_Session_2.png', alt: 'Session 2 — Structure That Connects' },
    { src: '/assets/6_Session_3.png', alt: 'Session 3 — Deliver With Impact' },
    { src: '/assets/7_Exercise_Together.png', alt: 'Interactive exercise together' },
    { src: '/assets/8_Networking_Break.png', alt: 'Networking break' },
    { src: '/assets/9_Closing_Takeaways.png', alt: 'Closing and takeaways' },
  ],

  // Hero background images (cycling)
  heroImages: [
    '/assets/1_The Art of Story telling By Harsh Shah.png',
    '/assets/2_Event_Venue.png',
    '/assets/3_Welcome_and_Registration.png',
  ],
} as const;
