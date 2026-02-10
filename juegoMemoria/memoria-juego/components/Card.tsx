import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import GameContext from '../context/GameContext';

interface CardProps {
  cardId: string;
}

const Card: React.FC<CardProps> = ({ cardId }) => {
  const context = useContext(GameContext);
  
  if (!context) {
    return null;
  }

  const { cards, flipCard } = context;
  
  const card = cards.find(c => c.id === cardId);
  
  if (!card) {
    return null;
  }

  const isFlipped = card.flipped || card.matched;
  
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isFlipped ? styles.cardFlipped : styles.cardHidden,
      ]}
      onPress={() => flipCard(cardId)}
      disabled={isFlipped}
    >
      {isFlipped ? (
        <Text style={styles.cardText}>{card.value}</Text>
      ) : (
        <Text style={styles.cardHiddenText}>?</Text>
      )}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 90,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardHidden: {
    backgroundColor: '#BEEBE9',
  },
  cardFlipped: {
    backgroundColor: '#FFF',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cardHiddenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Card;