import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Heart,
  Share,
  MapPin,
  Clock,
  Star,
  Calendar,
  Navigation,
} from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { mockEvents } from '@/data/mockData';
import { colors } from '@/styles/colors';

const { width } = Dimensions.get('window');

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user, toggleFavorite } = useAuth();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = mockEvents.find(e => e.id === id);
    setEvent(foundEvent);
  }, [id]);

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Event not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isFavorite = user?.favorites.includes(event.id) || false;

  const handleFavoritePress = () => {
    toggleFavorite(event.id);
  };

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${event.location.latitude},${event.location.longitude}`;
    
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      // On mobile, this would open the native maps app
      // You could use Linking.openURL(url) here
    }
  };

  const handleShare = () => {
    if (Platform.OS === 'web') {
      if (navigator.share) {
        navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.6)']}
            style={styles.imageOverlay}
          />
          
          {/* Header Actions */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.white} />
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleFavoritePress}
            >
              <Heart
                size={24}
                color={isFavorite ? colors.error : colors.white}
                fill={isFavorite ? colors.error : 'transparent'}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {event.category === 'event' ? 'Event' : 'Restaurant'}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Rating */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.accent[500]} fill={colors.accent[500]} />
              <Text style={styles.rating}>{event.rating}</Text>
              <Text style={styles.price}>{event.price}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{event.description}</Text>

          {/* Event Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailItem}>
              <MapPin size={20} color={colors.primary[600]} />
              <View style={styles.detailText}>
                <Text style={styles.detailTitle}>{event.location.name}</Text>
                <Text style={styles.detailSubtitle}>{event.location.address}</Text>
              </View>
            </View>

            {event.category === 'event' ? (
              <>
                <View style={styles.detailItem}>
                  <Calendar size={20} color={colors.primary[600]} />
                  <View style={styles.detailText}>
                    <Text style={styles.detailTitle}>Date</Text>
                    <Text style={styles.detailSubtitle}>{event.date}</Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <Clock size={20} color={colors.primary[600]} />
                  <View style={styles.detailText}>
                    <Text style={styles.detailTitle}>Time</Text>
                    <Text style={styles.detailSubtitle}>{event.time}</Text>
                  </View>
                </View>
              </>
            ) : (
              event.hours && (
                <View style={styles.detailItem}>
                  <Clock size={20} color={colors.primary[600]} />
                  <View style={styles.detailText}>
                    <Text style={styles.detailTitle}>Hours</Text>
                    <Text style={styles.detailSubtitle}>
                      {event.hours.open} - {event.hours.close}
                    </Text>
                  </View>
                </View>
              )
            )}
          </View>

          {/* Location Section */}
          <View style={styles.mapSection}>
            <Text style={styles.sectionTitle}>Location</Text>
            
            {/* Static Map Placeholder */}
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <MapPin size={48} color={colors.primary[500]} />
                <Text style={styles.mapPlaceholderTitle}>{event.location.name}</Text>
                <Text style={styles.mapPlaceholderAddress}>{event.location.address}</Text>
                <Text style={styles.mapCoordinates}>
                  {event.location.latitude.toFixed(4)}, {event.location.longitude.toFixed(4)}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.directionsButton}
              onPress={handleDirections}
            >
              <Navigation size={20} color={colors.white} />
              <Text style={styles.directionsText}>Get Directions</Text>
            </TouchableOpacity>
          </View>

          {/* Additional Info */}
          <View style={styles.additionalInfo}>
            <Text style={styles.sectionTitle}>About this {event.category === 'event' ? 'Event' : 'Place'}</Text>
            <Text style={styles.additionalText}>
              {event.category === 'event' 
                ? 'Join us for an unforgettable experience in the heart of California. This event showcases the best of what our beautiful state has to offer.'
                : 'Experience authentic California cuisine in a stunning setting. Our commitment to fresh, local ingredients and exceptional service makes every visit memorable.'
              }
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.neutral[600],
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    position: 'absolute',
    top: 50,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: colors.primary[500],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  categoryText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  content: {
    padding: 24,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.neutral[900],
    marginRight: 16,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.neutral[700],
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.primary[600],
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[600],
    lineHeight: 24,
    marginBottom: 32,
  },
  detailsSection: {
    marginBottom: 32,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  detailText: {
    marginLeft: 16,
    flex: 1,
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.neutral[900],
    marginBottom: 2,
  },
  detailSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[600],
  },
  mapSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.neutral[900],
    marginBottom: 16,
  },
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: colors.neutral[50],
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  mapPlaceholderTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.neutral[800],
    marginTop: 12,
    textAlign: 'center',
  },
  mapPlaceholderAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[600],
    marginTop: 4,
    textAlign: 'center',
  },
  mapCoordinates: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[500],
    marginTop: 8,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  directionsText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
  },
  additionalInfo: {
    marginBottom: 32,
  },
  additionalText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[600],
    lineHeight: 24,
  },
});