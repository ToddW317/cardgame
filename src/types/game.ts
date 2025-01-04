import type { Ability } from './abilities';
import type { CardImageKey } from '../utils/imageMapping';

interface Card {
  id: CardImageKey;
  name: string;
  element: 'fire' | 'water' | 'earth' | 'air' | 'aether' | 'colorless';
  power: number;
  cost: number;
  health: number;
  ability?: string;
}

interface Hero {
  id: string;
  name: string;
  ability: {
    name: string;
    description: string;
    cost: number;
    maxUses?: number;
  };
  bestSynergy: string;
}

interface Location {
  id: string;
  name: string;
  effect?: string;
}

interface GameState {
  locations: Location[];
  playerHand: Card[];
  playerEnergy: number;
  turn: number;
}

export interface Deck {
  id: string;
  name: string;
  color: string;
  cards: Array<{
    cardId: string;
    count: number;
  }>;
  isDraft?: boolean;
  lastModified?: string;
}

export const DECK_LIMITS = {
  MIN_CARDS: 40,
  MAX_CARDS: 60,
  MAX_COPIES: 3, // Maximum copies of a single card
} as const;

export type { Card, Location, GameState, Hero }; 