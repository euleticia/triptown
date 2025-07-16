import { Event } from '@/types/types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Sunset Beach Festival',
    description: 'Experience the magic of California sunsets with live music, food trucks, and beach vibes.',
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
    date: '2025-01-15',
    time: '18:00',
    location: {
      name: 'Santa Monica Beach',
      address: '1 Santa Monica Pier, Santa Monica, CA 90401',
      latitude: 34.0099,
      longitude: -118.4969
    },
    category: 'event',
    rating: 4.8,
    price: 'Free'
  },
  {
    id: '2',
    title: 'The Golden Coast',
    description: 'Upscale seafood restaurant with panoramic ocean views and fresh California cuisine.',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    date: '',
    time: '',
    location: {
      name: 'Malibu Coast',
      address: '23000 Pacific Coast Hwy, Malibu, CA 90265',
      latitude: 34.0259,
      longitude: -118.7798
    },
    category: 'restaurant',
    rating: 4.6,
    price: '$$$',
    hours: {
      open: '11:00',
      close: '22:00'
    }
  },
  {
    id: '3',
    title: 'LA Food & Wine Festival',
    description: 'Celebrate California\'s culinary excellence with tastings from top chefs and wineries.',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
    date: '2025-01-20',
    time: '15:00',
    location: {
      name: 'Grand Park',
      address: '200 N Grand Ave, Los Angeles, CA 90012',
      latitude: 34.0522,
      longitude: -118.2437
    },
    category: 'event',
    rating: 4.7,
    price: '$45'
  },
  {
    id: '4',
    title: 'Pacific Breeze Café',
    description: 'Cozy beachfront café serving organic coffee and fresh pastries with ocean views.',
    image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg',
    date: '',
    time: '',
    location: {
      name: 'Venice Beach',
      address: '1800 Ocean Front Walk, Venice, CA 90291',
      latitude: 34.0195,
      longitude: -118.4912
    },
    category: 'restaurant',
    rating: 4.4,
    price: '$$',
    hours: {
      open: '07:00',
      close: '19:00'
    }
  },
  {
    id: '5',
    title: 'Hollywood Hills Hike & Picnic',
    description: 'Join us for a guided hike through the Hollywood Hills with stunning city views.',
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
    date: '2025-01-18',
    time: '09:00',
    location: {
      name: 'Griffith Observatory',
      address: '2800 E Observatory Rd, Los Angeles, CA 90027',
      latitude: 34.1184,
      longitude: -118.3004
    },
    category: 'event',
    rating: 4.5,
    price: '$25'
  },
  {
    id: '6',
    title: 'Sunset Boulevard Bistro',
    description: 'French-California fusion cuisine in the heart of West Hollywood.',
    image: 'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg',
    date: '',
    time: '',
    location: {
      name: 'West Hollywood',
      address: '8000 Sunset Blvd, West Hollywood, CA 90046',
      latitude: 34.0928,
      longitude: -118.3815
    },
    category: 'restaurant',
    rating: 4.3,
    price: '$$$',
    hours: {
      open: '17:00',
      close: '23:00'
    }
  }
];