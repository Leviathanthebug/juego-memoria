import React from 'react';

export interface Card {
  id: string;
  value: string;
  flipped: boolean;
  matched: boolean;
}

export interface GameRecord {
  id: string;
  date: string;
  result: 'won' | 'lost';
  pairsFound: number;
}

export interface GameContextType {
  gameStarted: boolean;
  cards: Card[];
  gameHistory: GameRecord[];
  message: string;
  gameFinished: boolean;
  gameWon: boolean;
  startGame: () => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
}

const GameContext = React.createContext<GameContextType | undefined>(undefined);

export default GameContext;