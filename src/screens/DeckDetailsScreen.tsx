import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Modal, 
  Pressable,
  Dimensions,
  Alert,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { Deck } from '../types/game';
import type { Card as CardType } from '../types/game';
import { fireCards } from '../data/fireCards';
import { loadDecks, saveDecks } from '../utils/storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MODAL_PADDING = 20;
const CARD_WIDTH = SCREEN_WIDTH - (MODAL_PADDING * 2);

export function DeckDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { deck } = route.params as { deck: Deck };
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const deckCards = deck.cards.flatMap(cardRef => {
    const card = fireCards.find(c => c.id === cardRef.cardId);
    return card ? Array(cardRef.count).fill(card) : [];
  });

  const handleCardPress = (card: CardType) => {
    setSelectedCard(card);
  };

  const handleDeleteDeck = () => {
    Alert.alert(
      'Delete Deck',
      'Are you sure you want to delete this deck? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const allDecks = await loadDecks();
              const updatedDecks = allDecks.filter(d => d.id !== deck.id);
              await saveDecks(updatedDecks);
              navigation.navigate('DecksList', { refresh: Date.now() });
            } catch (error) {
              console.error('Error deleting deck:', error);
              Alert.alert('Error', 'Failed to delete deck. Please try again.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{deck.name}</Text>
          {deck.isDraft && <Text style={styles.draftLabel}>Draft</Text>}
        </View>
        <TouchableOpacity 
          onPress={handleDeleteDeck}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={24} color="#ff4d4d" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={deckCards}
          numColumns={3}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.cardWrapper}
              onPress={() => handleCardPress(item)}
            >
              <Card 
                card={item}
                size="small"
              />
            </Pressable>
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListHeaderComponent={() => (
            <View style={styles.stats}>
              <Text style={styles.statsText}>
                Cards: {deckCards.length}
              </Text>
            </View>
          )}
        />
      </View>

      <Modal
        visible={selectedCard !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedCard(null)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setSelectedCard(null)}
        >
          <View style={styles.modalContent}>
            {selectedCard && (
              <Card 
                card={selectedCard}
                size="large"
              />
            )}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold'
  },
  draftLabel: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic'
  },
  content: {
    flex: 1,
    padding: 10
  },
  cardWrapper: {
    flex: 1/3,
    padding: 5,
    aspectRatio: 0.7
  },
  stats: {
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#333',
    borderRadius: 8
  },
  statsText: {
    color: '#fff',
    fontSize: 16
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    padding: MODAL_PADDING,
    width: CARD_WIDTH,
    aspectRatio: 0.7
  },
  deleteButton: {
    padding: 8,
  },
}); 