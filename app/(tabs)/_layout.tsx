import { Tabs } from 'expo-router';
import { Chrome as Home, Search, Heart, User } from 'lucide-react-native';
import { AuthGuard } from '@/components/AuthGuard';
import { colors } from '@/styles/colors';

export default function TabsLayout() {
  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary[600],
          tabBarInactiveTintColor: colors.neutral[400],
          tabBarStyle: {
            backgroundColor: colors.white,
            borderTopColor: colors.neutral[100],
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Inter-Medium',
            marginTop: 4,
            marginBottom: 4,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ size, color }) => (
              <Search size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ size, color }) => (
              <Heart size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}