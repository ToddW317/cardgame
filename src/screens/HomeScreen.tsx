import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handlePlayPress = () => {
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.currencyContainer}>
            <View style={styles.currency}>
              <Ionicons name="cash-outline" size={24} color="#FFD700" />
              <Text style={styles.currencyText}>10,000</Text>
            </View>
            <View style={styles.currency}>
              <Ionicons name="diamond-outline" size={24} color="#00FFFF" />
              <Text style={styles.currencyText}>500</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.profileContainer}>
            <View style={styles.profilePic}>
              <Ionicons name="person" size={30} color="#666" />
            </View>
            <Text style={styles.playerName}>Player123</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.missionsButton}>
            <Ionicons name="list" size={24} color="#fff" />
            <Text style={styles.missionsText}>Missions</Text>
          </TouchableOpacity>
        </View>

        {/* Season Pass Progress */}
        <View style={styles.seasonPass}>
          <Text style={styles.seasonTitle}>Season 1</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '60%' }]} />
          </View>
          <Text style={styles.levelText}>Level 24</Text>
        </View>

        {/* Hero Section (News/Updates) */}
        <View style={[styles.heroSection, { backgroundColor: '#333' }]}>
          <Text style={styles.newsTitle}>Latest Update</Text>
          <Text style={styles.newsSubtitle}>New Cards Available!</Text>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={styles.selectedDeck}
            onPress={() => navigation.navigate('Decks')}
          >
            <View style={styles.deckImage}>
              <Ionicons name="albums" size={30} color="#666" />
            </View>
            <Text style={styles.deckName}>Current Deck</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.playButton}
            onPress={handlePlayPress}
          >
            <Text style={styles.playText}>PLAY</Text>
          </TouchableOpacity>

          <View style={styles.rankContainer}>
            <View style={styles.rankIcon}>
              <Ionicons name="trophy" size={30} color="#666" />
            </View>
            <Text style={styles.rankText}>Gold III</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  currencyContainer: {
    gap: 8,
  },
  currency: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
    gap: 4,
  },
  currencyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerName: {
    color: '#fff',
    marginTop: 4,
    fontWeight: 'bold',
  },
  missionsButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  missionsText: {
    color: '#fff',
    fontSize: 12,
  },
  seasonPass: {
    margin: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
  },
  seasonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginVertical: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  newsSubtitle: {
    color: '#fff',
    fontSize: 24,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  selectedDeck: {
    alignItems: 'center',
  },
  deckImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckName: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  playButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  playText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  rankContainer: {
    alignItems: 'center',
  },
  rankIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
}); 