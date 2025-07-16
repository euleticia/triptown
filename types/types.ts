export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  category: 'event' | 'restaurant';
  rating: number;
  price: string;
  hours?: {
    open: string;
    close: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
}