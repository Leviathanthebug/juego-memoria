import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import GameContext from '../context/GameContext';
import Card from './Card';

const GameBoard: React.FC = () => {
  const context = useContext(GameContext);
  
  if (!context) {
    return null;
  }

  const { cards } = context;

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {cards.map(card => (
          <Card key={card.id} cardId={card.id} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 320,
  },
});

export default GameBoard;