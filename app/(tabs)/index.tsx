import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';
import { EventCard } from '@/components/EventCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockEvents } from '@/data/mockData';
import { colors } from '@/styles/colors';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const featuredEvents = mockEvents.slice(0, 3);
  const nearbyPlaces = mockEvents.filter(event => event.category === 'restaurant');

  const handleEventPress = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.primary[500], colors.secondary[400]]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.userName}>Triptown</Text>
          </View>
          <TouchableOpacity style={styles.locationButton}>
            <MapPin size={20} color={colors.white} />
            <Text style={styles.locationText}>California, US</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.neutral[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events and places..."
              placeholderTextColor={colors.neutral[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Featured Events Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Events</Text>
            <TouchableOpacity onPress={() => router.push('/explore')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => handleEventPress(event.id)}
            />
          ))}
        </View>

        {/* Nearby Places Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Places</Text>
            <TouchableOpacity onPress={() => router.push('/explore')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {nearbyPlaces.map((place) => (
            <EventCard
              key={place.id}
              event={place}
              onPress={() => handleEventPress(place.id)}
            />
          ))}
        </View>

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
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.white,
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    marginTop: 2,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.white,
    marginLeft: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[800],
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.neutral[900],
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary[600],
  },
  bottomSpacing: {
    height: 32,
  },
});