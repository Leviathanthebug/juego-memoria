import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import GameContext from '../context/GameContext';

const StartButton: React.FC = () => {
  const context = useContext(GameContext);
  
  if (!context) {
    return null;
  }

  const { startGame } = context;

  return (
    <TouchableOpacity style={styles.button} onPress={startGame}>
      <Text style={styles.buttonText}>Iniciar a jugar</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFB6B9',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StartButton;