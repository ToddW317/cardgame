import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  interpolate, 
  useSharedValue 
} from 'react-native-reanimated';
import type { Card as CardType } from '../types/game';
import { cardImages } from '../utils/imageMapping';
import { useState, useEffect } from 'react';
import { CardDetail } from './CardDetail';
import * as Haptics from 'expo-haptics';

interface CardProps {
  card: CardType;
  size?: 'small' | 'medium' | 'large';
  showBackFirst?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_RATIO = 1.4;

export function Card({ card, size = 'medium', showBackFirst = false }: CardProps) {
  const [imageError, setImageError] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const rotation = useSharedValue(showBackFirst ? 1 : 0);
  const scale = useSharedValue(1);
  
  const cardWidth = size === 'small' ? width * 0.25 : 
                   size === 'medium' ? width * 0.3 : 
                   width * 0.4;
  const cardHeight = cardWidth * CARD_RATIO;

  useEffect(() => {
    rotation.value = withTiming(showBackFirst ? 1 : 0, { 
      duration: 400 
    });
  }, [showBackFirst]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    rotation.value = withTiming(rotation.value ? 0 : 1, { 
      duration: 400 
    });
  };

  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowDetail(true);
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` }
    ],
    backfaceVisibility: 'hidden',
    ...StyleSheet.absoluteFillObject,
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(rotation.value, [0, 1], [180, 360])}deg` }
    ],
    backfaceVisibility: 'hidden',
    ...StyleSheet.absoluteFillObject,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <>
      <Pressable 
        style={[styles.container, { width: cardWidth, height: cardHeight }]}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayLongPress={200}
      >
        <Animated.View style={[styles.cardContainer, containerAnimatedStyle]}>
          <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>
            {imageError ? (
              <View style={styles.placeholderContainer}>
                <Ionicons name="happy-outline" size={cardWidth * 0.4} color="#666" />
                <Text style={styles.placeholderText}>{card.name}</Text>
              </View>
            ) : (
              <Animated.Image
                source={cardImages[card.id]}
                style={styles.image}
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
            )}
            
            <View style={styles.statsOverlay}>
              <View style={styles.cost}>
                <Text style={styles.statText}>{card.cost}</Text>
              </View>
              <View style={styles.power}>
                <Text style={styles.statText}>{card.power}</Text>
              </View>
              <View style={styles.health}>
                <Text style={styles.statText}>{card.health}</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View style={[styles.cardFace, styles.cardBack, backAnimatedStyle]}>
            <View style={styles.cardBackContent}>
              <View style={styles.cardGlow} />
              <View style={styles.cardBackgroundOverlay} />
              <View style={styles.cardBackHeader}>
                <Text style={styles.cardName} numberOfLines={1}>
                  {card.name}
                </Text>
                <View style={styles.statIndicator}>
                  <View style={[styles.statDot, { backgroundColor: '#4a90e2' }]} />
                  <Text style={styles.statLabel}>
                    <Text style={styles.statLabelText}>COST </Text>
                    {card.cost}
                  </Text>
                </View>
              </View>
              <ScrollView 
                style={styles.abilitySection}
                contentContainerStyle={styles.abilityContent}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.abilityText}>
                  {card.ability || 'No ability'}
                </Text>
              </ScrollView>
              <View style={styles.cardBackFooter}>
                <View style={styles.statIndicator}>
                  <View style={[styles.statDot, { backgroundColor: '#e25555' }]} />
                  <Text style={styles.statLabel}>
                    <Text style={styles.statLabelText}>POW </Text>
                    {card.power}
                  </Text>
                </View>
                <View style={styles.statIndicator}>
                  <View style={[styles.statDot, { backgroundColor: '#27ae60' }]} />
                  <Text style={styles.statLabel}>
                    <Text style={styles.statLabelText}>HP </Text>
                    {card.health}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      </Pressable>

      <CardDetail
        card={card}
        visible={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  cardFace: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardBack: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#333',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statsOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 8,
  },
  cost: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  power: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e25555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  health: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  placeholderContainer: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  placeholderText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  cardBackContent: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  cardBackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  cardBackFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  statIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minWidth: 40,
  },
  statDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  statLabelText: {
    color: '#808080',
    fontSize: 10,
    fontWeight: 'normal',
  },
  abilitySection: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 6,
    marginVertical: 4,
  },
  abilityContent: {
    padding: 8,
  },
  cardName: {
    color: '#ff4d4d',
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  abilityText: {
    color: '#fff',
    fontSize: 11,
    lineHeight: 16,
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff4d4d',
    opacity: 0.5,
    shadowColor: '#ff4d4d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  cardBackgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderRadius: 8,
  },
}); 