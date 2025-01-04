import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Deck } from '../types/game';

const DECKS_STORAGE_KEY = '@cardgame:decks';

export async function saveDecks(decks: Deck[]): Promise<void> {
  try {
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  } catch (error) {
    console.error('Error saving decks:', error);
  }
}

export async function loadDecks(): Promise<Deck[]> {
  try {
    const decksJson = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    return decksJson ? JSON.parse(decksJson) : [];
  } catch (error) {
    console.error('Error loading decks:', error);
    return [];
  }
}

export async function clearDecks(): Promise<void> {
  try {
    await AsyncStorage.removeItem(DECKS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing decks:', error);
  }
} 