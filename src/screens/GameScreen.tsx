import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LOCATION_WIDTH = SCREEN_WIDTH * 0.3;

export function GameScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Opponent's Hand */}
      <View style={styles.opponentHand}>
        <View style={styles.cardBack} />
        <View style={styles.cardBack} />
        <View style={styles.cardBack} />
      </View>

      {/* Locations */}
      <View style={styles.locations}>
        <View style={styles.location}>
          <LinearGradient
            colors={['#444', '#222']}
            style={styles.locationInner}
          >
            <Text style={styles.locationName}>Location 1</Text>
          </LinearGradient>
          <View style={styles.cardSlots}>
            <View style={styles.cardSlot} />
            <View style={styles.cardSlot} />
          </View>
        </View>

        <View style={styles.location}>
          <LinearGradient
            colors={['#444', '#222']}
            style={styles.locationInner}
          >
            <Text style={styles.locationName}>Location 2</Text>
          </LinearGradient>
          <View style={styles.cardSlots}>
            <View style={styles.cardSlot} />
            <View style={styles.cardSlot} />
          </View>
        </View>

        <View style={styles.location}>
          <LinearGradient
            colors={['#444', '#222']}
            style={styles.locationInner}
          >
            <Text style={styles.locationName}>Location 3</Text>
          </LinearGradient>
          <View style={styles.cardSlots}>
            <View style={styles.cardSlot} />
            <View style={styles.cardSlot} />
          </View>
        </View>
      </View>

      {/* Player's Hand */}
      <View style={styles.hand}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={styles.handCard} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  opponentHand: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  cardBack: {
    width: 40,
    height: 60,
    backgroundColor: '#ff4d4d',
    borderRadius: 4,
    transform: [{ rotateY: '180deg' }],
  },
  locations: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  location: {
    width: LOCATION_WIDTH,
    height: LOCATION_WIDTH * 1.4,
    backgroundColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
  },
  locationInner: {
    flex: 1,
    padding: 8,
    justifyContent: 'flex-end',
  },
  locationName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardSlots: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8,
  },
  cardSlot: {
    height: '45%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  hand: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  handCard: {
    width: 60,
    height: 90,
    backgroundColor: '#333',
    borderRadius: 8,
  },
}); 