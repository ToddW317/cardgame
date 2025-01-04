import { View, StyleSheet, Dimensions, Image } from 'react-native';
import type { Card as CardType } from '../types/game';
import { cardImages } from '../utils/imageMapping';

interface CardPreviewProps {
  card: CardType;
  size?: 'small' | 'medium' | 'large';
}

export function CardPreview({ card, size = 'medium' }: CardPreviewProps) {
  const { width } = Dimensions.get('window');
  const CARD_RATIO = 1.4;
  
  const cardWidth = size === 'small' ? width * 0.25 : 
                   size === 'medium' ? width * 0.3 : 
                   width * 0.4;
  const cardHeight = cardWidth * CARD_RATIO;

  return (
    <View style={[styles.container, { width: cardWidth, height: cardHeight }]}>
      <Image
        source={cardImages[card.id]}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  image: {
    width: '100%',
    height: '100%',
  },
}); 