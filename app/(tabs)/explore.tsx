import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Grid3x3 as Grid3X3, List } from 'lucide-react-native';
import { router } from 'expo-router';
import { EventCard } from '@/components/EventCard';
import { mockEvents } from '@/data/mockData';
import { colors } from '@/styles/colors';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'events' | 'restaurants'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'events' && event.category === 'event') ||
                         (selectedFilter === 'restaurants' && event.category === 'restaurant');
    
    return matchesSearch && matchesFilter;
  });

  const handleEventPress = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore with Triptown</Text>
        
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
          <TouchableOpacity style={styles.viewToggle}>
            {viewMode === 'list' ? (
              <Grid3X3 size={20} color={colors.neutral[600]} />
            ) : (
              <List size={20} color={colors.neutral[600]} />
            )}
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterTab, selectedFilter === 'all' && styles.activeFilterTab]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterTabText, selectedFilter === 'all' && styles.activeFilterTabText]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, selectedFilter === 'events' && styles.activeFilterTab]}
            onPress={() => setSelectedFilter('events')}
          >
            <Text style={[styles.filterTabText, selectedFilter === 'events' && styles.activeFilterTabText]}>
              Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, selectedFilter === 'restaurants' && styles.activeFilterTab]}
            onPress={() => setSelectedFilter('restaurants')}
          >
            <Text style={[styles.filterTabText, selectedFilter === 'restaurants' && styles.activeFilterTabText]}>
              Restaurants
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Results */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredEvents.length} results found
          </Text>
        </View>

        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => handleEventPress(event.id)}
          />
        ))}

        {filteredEvents.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No results found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filters
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
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
  viewToggle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.neutral[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.neutral[50],
  },
  activeFilterTab: {
    backgroundColor: colors.primary[500],
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.neutral[600],
  },
  activeFilterTabText: {
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  resultsHeader: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.neutral[600],
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.neutral[700],
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[500],
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 32,
  },
});