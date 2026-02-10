import React, { useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameContext, { Card, GameRecord } from '../context/GameContext';

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [gameHistory, setGameHistory] = useState<GameRecord[]>([]);
  const [message, setMessage] = useState('');
  const [gameFinished, setGameFinished] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);

  useEffect(() => {
    loadGameHistory();
  }, []);

  const loadGameHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('gameHistory');
      if (history) {
        setGameHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log('Error loading game history:', error);
    }
  };

  const saveGameHistory = async (result: 'won' | 'lost') => {
    try {
      const pairsFound = cards.filter(card => card.matched).length / 2;
      
      const newRecord: GameRecord = {
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        result: result,
        pairsFound: pairsFound,
      };
      
      const updatedHistory = [...gameHistory, newRecord];
      setGameHistory(updatedHistory);
      await AsyncStorage.setItem('gameHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.log('Error saving game history:', error);
    }
  };

  const initializeCards = () => {

    const values = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'];
    const shuffledValues = [...values].sort(() => Math.random() - 0.5);
    
    const newCards: Card[] = shuffledValues.map((value, index) => ({
      id: index.toString(),
      value,
      flipped: false,
      matched: false,
    }));
    
    setCards(newCards);
    setFlippedCards([]);
    setMessage('');
    setGameFinished(false);
    setGameWon(false);
  };

  const startGame = () => {
    initializeCards();
    setGameStarted(true);
    setMessage('Encuentra todos los pares. Toca dos cartas.');
  };

  const flipCard = (cardId: string) => {
    if (gameFinished || flippedCards.length >= 2) {
      return;
    }

    const cardIndex = cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1 || cards[cardIndex].matched) return;

    const updatedCards = [...cards];
    updatedCards[cardIndex] = {
      ...updatedCards[cardIndex],
      flipped: true,
    };
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      checkMatch(newFlippedCards);
    }
  };

  const checkMatch = (flippedIds: string[]) => {
    const [firstId, secondId] = flippedIds;
    const firstCard = cards.find(card => card.id === firstId);
    const secondCard = cards.find(card => card.id === secondId);

    if (firstCard && secondCard && firstCard.value === secondCard.value) {
      setTimeout(() => {
        const updatedCards = cards.map(card => {
          if (card.id === firstId || card.id === secondId) {
            return { ...card, matched: true };
          }
          return card;
        });
        
        setCards(updatedCards);
        setFlippedCards([]);
    
        const matchedCount = updatedCards.filter(card => card.matched).length;
        
        if (matchedCount === 8) {
          setMessage('Felicidades Has ganado el juego');
          setGameWon(true);
          setGameFinished(true);
          saveGameHistory('won');
        } else {
          setMessage(`Encontraste el par ${firstCard.value} Sigue buscando.`);
        }
      }, 500);
    } else {
      setTimeout(() => {
        const updatedCards = cards.map(card => {
          if (card.id === firstId || card.id === secondId) {
            return { ...card, flipped: false };
          }
          return card;
        });
        
        setCards(updatedCards);
        setFlippedCards([]);
        setMessage('Las cartas no coinciden. Fin del juego.');
        setGameWon(false);
        setGameFinished(true);
        saveGameHistory('lost');
      }, 1000);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCards([]);
    setFlippedCards([]);
    setMessage('');
    setGameFinished(false);
    setGameWon(false);
  };

  const contextValue = {
    gameStarted,
    cards,
    gameHistory,
    message,
    gameFinished,
    gameWon,
    startGame,
    flipCard,
    resetGame,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;