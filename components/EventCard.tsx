import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, MapPin, Clock, Star } from 'lucide-react-native';
import { Event } from '@/types/types';
import { colors } from '@/styles/colors';
import { useAuth } from '@/contexts/AuthContext';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
  const { user, toggleFavorite } = useAuth();
  const isFavorite = user?.favorites.includes(event.id) || false;

  const handleFavoritePress = () => {
    toggleFavorite(event.id);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.gradient}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          activeOpacity={0.8}
        >
          <Heart
            size={20}
            color={isFavorite ? colors.error : colors.white}
            fill={isFavorite ? colors.error : 'transparent'}
          />
        </TouchableOpacity>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {event.category === 'event' ? 'Event' : 'Restaurant'}
          </Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {event.description}
        </Text>
        
        <View style={styles.infoRow}>
          <MapPin size={14} color={colors.neutral[500]} />
          <Text style={styles.location} numberOfLines={1}>
            {event.location.name}
          </Text>
        </View>
        
        {event.category === 'event' && (
          <View style={styles.infoRow}>
            <Clock size={14} color={colors.neutral[500]} />
            <Text style={styles.timeText}>
              {event.date} at {event.time}
            </Text>
          </View>
        )}
        
        <View style={styles.bottomRow}>
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.accent[500]} fill={colors.accent[500]} />
            <Text style={styles.rating}>{event.rating}</Text>
          </View>
          <Text style={styles.price}>{event.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary[500],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.neutral[900],
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[600],
    lineHeight: 20,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[600],
    marginLeft: 6,
    flex: 1,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.neutral[600],
    marginLeft: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.neutral[700],
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.primary[600],
  },
});