import { View, Text, StyleSheet, Modal, Pressable, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutDown, withSpring, withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { CardPreview } from './CardPreview';
import type { Card as CardType } from '../types/game';
import * as Haptics from 'expo-haptics';

interface CardDetailProps {
  card: CardType;
  visible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

export function CardDetail({ card, visible, onClose }: CardDetailProps) {
  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  const scale = useSharedValue(1);
  
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View 
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.overlay}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <Animated.View 
            entering={SlideInUp.springify()}
            exiting={SlideOutDown.springify()}
            style={styles.content}
          >
            <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
              <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
                <CardPreview card={card} size="large" />
              </Animated.View>
              <Animated.View 
                entering={SlideInUp.delay(100)}
                style={styles.detailsContainer}
              >
                <Text style={styles.cardName}>{card.name}</Text>
                <Text style={styles.elementText}>Element: {card.element}</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statGroup}>
                    <Text style={[styles.statLabel, { color: '#4a90e2' }]}>COST</Text>
                    <Text style={styles.statValue}>{card.cost}</Text>
                  </View>
                  <View style={styles.statGroup}>
                    <Text style={[styles.statLabel, { color: '#e25555' }]}>POW</Text>
                    <Text style={styles.statValue}>{card.power}</Text>
                  </View>
                  <View style={styles.statGroup}>
                    <Text style={[styles.statLabel, { color: '#27ae60' }]}>HP</Text>
                    <Text style={styles.statValue}>{card.health}</Text>
                  </View>
                </View>
                <Text style={styles.abilityLabel}>Ability:</Text>
                <Text style={styles.abilityText}>{card.ability || 'No ability'}</Text>
              </Animated.View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  content: {
    width: width * 0.9,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  cardName: {
    color: '#ff4d4d',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  elementText: {
    color: '#808080',
    fontSize: 16,
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  statGroup: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  abilityLabel: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 4,
  },
  abilityText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
}); 