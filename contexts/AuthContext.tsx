import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/types';
import { router } from 'expo-router';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  toggleFavorite: (eventId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        id: '1',
        name: 'Triptown Explorer',
        email: email,
        favorites: []
      });
      router.replace('/(tabs)');
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        id: '1',
        name: name,
        email: email,
        favorites: []
      });
      router.replace('/(tabs)');
    } catch (error) {
      throw new Error('Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUser({
        id: '1',
        name: 'Google User',
        email: 'user@gmail.com',
        favorites: []
      });
      router.replace('/(tabs)');
    } catch (error) {
      throw new Error('Google sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithApple = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUser({
        id: '1',
        name: 'Apple User',
        email: 'user@icloud.com',
        favorites: []
      });
      router.replace('/(tabs)');
    } catch (error) {
      throw new Error('Apple sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      router.replace('/auth');
    } catch (error) {
      throw new Error('Sign out failed');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (eventId: string) => {
    if (!user) return;
    setUser(prevUser => {
      if (!prevUser) return null;
      const favorites = prevUser.favorites.includes(eventId)
        ? prevUser.favorites.filter(id => id !== eventId)
        : [...prevUser.favorites, eventId];
      return { ...prevUser, favorites };
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signIn,
      signUp,
      signInWithGoogle,
      signInWithApple,
      signOut,
      toggleFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
}