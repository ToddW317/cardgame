export type RootStackParamList = {
  MainTabs: undefined;
  Game: undefined;
  Home: undefined;
  Collection: undefined;
  Decks: undefined;
  DecksList: {
    highlightDeckId?: string;
    refresh?: number;
    hideBackButton?: boolean;
  } | undefined;
  CreateDeck: undefined;
  DeckBuilder: {
    deckDetails?: {
      name: string;
      emblem: string;
      color: string;
    };
  } | undefined;
  DeckDetails: {
    deck: Deck;
  };
}; 