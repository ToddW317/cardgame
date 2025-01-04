import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Deck } from '../types/game';

interface DeckListProps {
  decks: Deck[];
  onDeckSelect: (deck: Deck) => void;
  onDeckDelete: (deckId: string) => void;
  onCreateDeck: () => void;
}

export function DeckList({ decks, onDeckSelect, onDeckDelete, onCreateDeck }: DeckListProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.createButton} onPress={onCreateDeck}>
        <Ionicons name="add-circle-outline" size={24} color="#ff4d4d" />
        <Text style={styles.createButtonText}>Create New Deck</Text>
      </Pressable>

      <FlatList
        data={decks}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.deckItem}
            onPress={() => onDeckSelect(item)}
          >
            <View style={styles.deckInfo}>
              <Text style={styles.deckName}>{item.name}</Text>
              <Text style={styles.heroName}>{item.hero?.name || 'No Hero Selected'}</Text>
              <Text style={styles.cardCount}>
                {item.cards.reduce((sum, card) => sum + card.count, 0)} cards
              </Text>
            </View>
            <Pressable 
              style={styles.deleteButton}
              onPress={() => onDeckDelete(item.id)}
            >
              <Ionicons name="trash-outline" size={20} color="#ff4d4d" />
            </Pressable>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 16,
  },
  createButtonText: {
    color: '#ff4d4d',
    fontSize: 16,
    marginLeft: 8,
  },
  deckItem: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  deckInfo: {
    flex: 1,
  },
  deckName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroName: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 4,
  },
  cardCount: {
    color: '#808080',
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
  },
}); 