import { View, TouchableOpacity, StyleSheet, FlatList, Animated, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { loadDecks, saveDecks } from '../utils/storage'
import type { Deck } from '../types/game'
import { Swipeable } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'

export function DecksScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const [decks, setDecks] = useState<Deck[]>([])
  const [highlightedDeckId, setHighlightedDeckId] = useState<string | null>(null)
  const highlightDeckId = route.params?.highlightDeckId
  const refresh = route.params?.refresh

  useEffect(() => {
    loadDecks().then(setDecks)
  }, [refresh])

  useEffect(() => {
    if (highlightDeckId) {
      setHighlightedDeckId(highlightDeckId)
      // Remove highlight after animation
      setTimeout(() => setHighlightedDeckId(null), 2000)
    }
  }, [highlightDeckId])

  function handleCreateDeck() {
    navigation.navigate('CreateDeck')
  }

  const handleDeckPress = (deck: Deck) => {
    navigation.navigate('DeckDetails', { deck });
  };

  const handleDeleteDeck = async (deckId: string) => {
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
              const updatedDecks = allDecks.filter(d => d.id !== deckId);
              await saveDecks(updatedDecks);
              setDecks(updatedDecks);
            } catch (error) {
              console.error('Error deleting deck:', error);
              Alert.alert('Error', 'Failed to delete deck. Please try again.');
            }
          }
        }
      ]
    );
  };

  const renderRightActions = (deckId: string) => {
    return (
      <TouchableOpacity 
        style={styles.deleteAction}
        onPress={() => handleDeleteDeck(deckId)}
      >
        <Ionicons name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Decks</Text>
      </View>

      <FlatList
        data={decks}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => renderRightActions(item.id)}
            rightThreshold={40}
          >
            <TouchableOpacity 
              onPress={() => handleDeckPress(item)}
            >
              <Animated.View 
                style={[
                  styles.deckItem,
                  { backgroundColor: item.color || '#333' },
                  highlightedDeckId === item.id && styles.highlightedDeck
                ]}
              >
                <Text style={styles.deckName}>{item.name}</Text>
                {item.isDraft && (
                  <Text style={styles.draftLabel}>Draft</Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          </Swipeable>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No decks yet</Text>
            <Text style={styles.emptySubtext}>Create your first deck!</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity 
        onPress={handleCreateDeck}
        style={styles.createButton}
      >
        <Text style={styles.createButtonText}>Create New Deck</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold'
  },
  listContent: {
    padding: 16,
    flexGrow: 1
  },
  deckItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deckName: {
    fontSize: 18,
    color: '#fff'
  },
  emblem: {
    fontSize: 24
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666'
  },
  createButton: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  highlightedDeck: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    transform: [{ scale: 1.02 }],
  },
  draftLabel: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic'
  },
  deleteAction: {
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    marginBottom: 12
  },
}) 