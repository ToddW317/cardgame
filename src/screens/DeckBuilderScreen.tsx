import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { FilterDropdown } from '../components/FilterDropdown';
import type { Card as CardType, Deck } from '../types/game';
import { fireCards } from '../data/fireCards';
import { saveDecks, loadDecks } from '../utils/storage';
import { useNavigation, useRoute, usePreventRemove } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { generateUniqueId } from '../utils/helpers';

const MAX_DECK_SIZE = 15;

export function DeckBuilderScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const deckDetails = route.params?.deckDetails ?? {
    name: 'New Deck',
    emblem: '',
    color: '#000000'
  };

  const [deck, setDeck] = useState<Deck>({
    id: generateUniqueId(),
    name: deckDetails.name,
    cards: [],
    emblem: deckDetails.emblem,
    color: deckDetails.color
  });

  const [filters, setFilters] = useState({
    element: 'all',
    cost: 'all',
    sortBy: 'cost' as const,
    sortOrder: 'asc' as const,
    search: '',
    ability: 'All',
    showBackFirst: false
  });

  const cardCount = useMemo(() => 
    deck.cards.reduce((sum, card) => sum + card.count, 0),
    [deck.cards]
  );

  const [isDraft, setIsDraft] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Track changes
  useEffect(() => {
    if (deck.cards.length > 0) {
      setHasUnsavedChanges(true);
    }
  }, [deck.cards]);

  // Replace useFocusEffect with usePreventRemove
  usePreventRemove(
    hasUnsavedChanges,
    () => {
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure you want to leave?',
        [
          { text: "Don't leave", style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(navigation.getParent()?.goBack()),
          },
        ]
      );
    }
  );

  const handleAddCard = (card: CardType) => {
    if (cardCount >= MAX_DECK_SIZE) {
      // Maybe show an error message
      return;
    }

    setDeck(current => {
      const existingCard = current.cards.find(c => c.cardId === card.id);
      
      if (existingCard) {
        if (existingCard.count >= 2 || cardCount >= MAX_DECK_SIZE) {
          return current;
        }
        
        return {
          ...current,
          cards: current.cards.map(c => 
            c.cardId === card.id 
              ? { ...c, count: c.count + 1 }
              : c
          )
        };
      }
      
      return {
        ...current,
        cards: [...current.cards, { cardId: card.id, count: 1 }]
      };
    });
  };

  const handleFinish = async () => {
    if (!deck.name.trim()) {
      Alert.alert('Error', 'Please give your deck a name');
      return;
    }

    if (cardCount === 0) {
      Alert.alert('Error', 'Your deck must have at least 1 card');
      return;
    }

    if (cardCount < MAX_DECK_SIZE) {
      Alert.alert(
        'Incomplete Deck',
        'This deck has less than 15 cards. Do you want to save it as a draft?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Save as Draft',
            onPress: () => saveDeck(true)
          }
        ]
      );
      return;
    }

    Alert.alert(
      'Save Deck',
      'Are you sure you want to save this deck?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Save',
          onPress: () => saveDeck(false)
        }
      ]
    );
  };

  const saveDeck = async (asDraft: boolean) => {
    const deckToSave = {
      ...deck,
      isDraft: asDraft,
      lastModified: new Date().toISOString()
    };

    try {
      const allDecks = await loadDecks();
      allDecks.push(deckToSave);
      await saveDecks(allDecks);
      setHasUnsavedChanges(false);
      
      // Navigate back to Decks screen and remove the back button
      navigation.navigate('DecksList', { 
        highlightDeckId: deckToSave.id,
        refresh: Date.now(),
        hideBackButton: true
      });
    } catch (error) {
      console.error('Error saving deck:', error);
      Alert.alert('Error', 'Failed to save deck. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{deck.name}</Text>
        <View style={styles.headerRight}>
          <Text style={[
            styles.cardCount,
            cardCount === MAX_DECK_SIZE ? styles.cardCountComplete : 
            cardCount > MAX_DECK_SIZE ? styles.cardCountError : 
            styles.cardCountIncomplete
          ]}>
            {cardCount}/{MAX_DECK_SIZE}
          </Text>
          <Pressable 
            onPress={handleFinish}
            style={styles.checkButton}
            disabled={cardCount !== MAX_DECK_SIZE}
          >
            <Ionicons 
              name="checkmark" 
              size={24} 
              color={cardCount === MAX_DECK_SIZE ? '#4CAF50' : '#808080'} 
            />
          </Pressable>
        </View>
      </View>

      <FilterDropdown 
        filters={filters}
        onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
      />

      <View style={styles.content}>
        <FlatList
          data={fireCards}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <Card 
                card={item}
                size="small"
                showBackFirst={filters.showBackFirst}
              />
              <Pressable 
                style={[
                  styles.addButton,
                  (deck.cards.find(c => c.cardId === item.id)?.count >= 2 || 
                   cardCount >= MAX_DECK_SIZE) && 
                  styles.addButtonDisabled
                ]}
                onPress={() => handleAddCard(item)}
                disabled={deck.cards.find(c => c.cardId === item.id)?.count >= 2 || 
                         cardCount >= MAX_DECK_SIZE}
              >
                <Ionicons name="add" size={20} color="white" />
              </Pressable>
              {deck.cards.find(c => c.cardId === item.id)?.count > 0 && (
                <View style={styles.cardCount}>
                  <Text style={styles.cardCountText}>
                    {deck.cards.find(c => c.cardId === item.id)?.count}
                  </Text>
                </View>
              )}
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    color: '#fff'
  },
  checkButton: {
    padding: 8
  },
  content: {
    flex: 1,
    padding: 10
  },
  cardWrapper: {
    flex: 1/3,
    padding: 5,
    aspectRatio: 0.7,
    position: 'relative'
  },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonDisabled: {
    backgroundColor: '#808080'
  },
  cardCount: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff4d4d',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardCountComplete: {
    color: '#4CAF50',
  },
  cardCountError: {
    color: '#ff4d4d',
  },
  cardCountIncomplete: {
    color: '#808080',
  },
}); 