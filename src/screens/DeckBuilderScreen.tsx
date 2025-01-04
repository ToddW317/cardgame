import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo, useEffect } from 'react';
import { Card } from '../components/Card';
import { FilterDropdown } from '../components/FilterDropdown';
import { DECK_LIMITS } from '../types/game';
import type { Card as CardType, Deck, Hero } from '../types/game';
import { fireCards } from '../data/fireCards';
import { HeroSelector } from '../components/HeroSelector';
import { saveDecks, loadDecks } from '../utils/storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export function DeckBuilderScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const editingDeck = route.params?.deck;

  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [deck, setDeck] = useState<Deck>({
    id: 'new-deck',
    name: 'New Deck',
    hero: null,
    cards: []
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
  const [isEditingName, setIsEditingName] = useState(false);

  const cardCount = useMemo(() => 
    deck.cards.reduce((sum, card) => sum + card.count, 0),
    [deck.cards]
  );

  useEffect(() => {
    if (editingDeck) {
      setDeck(editingDeck);
      setSelectedHero(editingDeck.hero);
    }
  }, [editingDeck]);

  const handleAddCard = (card: CardType) => {
    setDeck(current => {
      const existingCard = current.cards.find(c => c.cardId === card.id);
      
      if (existingCard) {
        if (existingCard.count >= DECK_LIMITS.MAX_COPIES) {
          return current; // Already at max copies
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

  const handleRemoveCard = (cardId: string) => {
    setDeck(current => ({
      ...current,
      cards: current.cards.map(c => 
        c.cardId === cardId 
          ? { ...c, count: Math.max(0, c.count - 1) }
          : c
      ).filter(c => c.count > 0)
    }));
  };

  const handleSaveDeck = async () => {
    if (!selectedHero) {
      // Show error message
      return;
    }

    const updatedDeck = {
      ...deck,
      hero: selectedHero,
    };

    const allDecks = await loadDecks();
    const existingDeckIndex = allDecks.findIndex(d => d.id === deck.id);

    if (existingDeckIndex >= 0) {
      allDecks[existingDeckIndex] = updatedDeck;
    } else {
      allDecks.push(updatedDeck);
    }

    await saveDecks(allDecks);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Deck Builder</Text>
        <Text style={styles.cardCount}>
          {cardCount} / {DECK_LIMITS.MAX_CARDS}
        </Text>
      </View>

      <FilterDropdown 
        filters={filters}
        onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
      />

      <HeroSelector
        selectedHero={selectedHero}
        onHeroSelect={setSelectedHero}
      />

      <View style={styles.content}>
        <FlatList
          data={fireCards}
          numColumns={3}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.cardWrapper}
              onPress={() => handleAddCard(item)}
              onLongPress={() => handleRemoveCard(item.id)}
            >
              <Card 
                card={item}
                size="small"
                showBackFirst={filters.showBackFirst}
              />
              {deck.cards.find(c => c.cardId === item.id)?.count > 0 && (
                <View style={styles.cardCount}>
                  <Text style={styles.cardCountText}>
                    {deck.cards.find(c => c.cardId === item.id)?.count}
                  </Text>
                </View>
              )}
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.footer}>
        <Pressable 
          style={[
            styles.saveButton,
            (!selectedHero || cardCount < DECK_LIMITS.MIN_CARDS) && styles.saveButtonDisabled
          ]}
          onPress={handleSaveDeck}
          disabled={!selectedHero || cardCount < DECK_LIMITS.MIN_CARDS}
        >
          <Text style={styles.saveButtonText}>
            {cardCount < DECK_LIMITS.MIN_CARDS 
              ? `Add ${DECK_LIMITS.MIN_CARDS - cardCount} more cards`
              : 'Save Deck'
            }
          </Text>
        </Pressable>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff4d4d'
  },
  cardCount: {
    color: '#fff',
    fontSize: 16
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
  cardCount: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff4d4d',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8
  },
  cardCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#ff4d4d',
    padding: 16,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#808080',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 