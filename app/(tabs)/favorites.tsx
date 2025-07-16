import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import { EventCard } from '@/components/EventCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockEvents } from '@/data/mockData';
import { colors } from '@/styles/colors';

export default function FavoritesScreen() {
  const { user } = useAuth();

  const favoriteEvents = mockEvents.filter(event => 
    user?.favorites.includes(event.id)
  );

  const handleEventPress = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites</Text>
        <Text style={styles.subtitle}>
          {favoriteEvents.length} saved {favoriteEvents.length === 1 ? 'place' : 'places'}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {favoriteEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => handleEventPress(event.id)}
          />
        ))}

        {favoriteEvents.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Heart size={48} color={colors.neutral[300]} />
            </View>
            <Text style={styles.emptyStateTitle}>No favorites yet</Text>
            <Text style={styles.emptyStateText}>
              Start exploring and save your favorite events and places by tapping the heart icon
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: colors.neutral[900],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[600],
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.neutral[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: colors.neutral[700],
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[500],
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSpacing: {
    height: 32,
  },
});