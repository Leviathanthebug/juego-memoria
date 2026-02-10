import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GameContext from '../context/GameContext';
import StartButton from '../components/StartButton';
import GameBoard from '../components/GameBoard';
import GameHistory from '../components/GameHistory';

const HomeScreen: React.FC = () => {
  const context = useContext(GameContext);

  if (!context) {
    return null;
  }

  const {
    gameStarted,
    cards,
    message,
    gameHistory,
    gameFinished,
    gameWon,
    startGame,
    resetGame
  } = context;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Juego de Memoria</Text>
      <Text style={styles.subtitle}>Encuentra los pares de cartas</Text>
      <Text style={styles.instructions}>
        Cartas: A, B, C, D (cada una aparece 2 veces)
      </Text>
      
      {!gameStarted ? (
        <StartButton />
      ) : (
        <>
          <View style={[
            styles.messageContainer,
            gameWon && styles.winMessage,
            gameFinished && !gameWon && styles.loseMessage
          ]}>
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.pairsFound}>
              Pares encontrados: {cards.filter(c => c.matched).length / 2} de 4
            </Text>
          </View>
          
          <GameBoard />
          
          {gameFinished && (
            <View style={styles.resultContainer}>
              <Text style={[
                styles.resultTitle,
                gameWon ? styles.winTitle : styles.loseTitle
              ]}>
                {gameWon ? 'HAS GANADO' : 'PERDISTE'}
              </Text>
              <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                <Text style={styles.resetButtonText}>Jugar de nuevo</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {!gameFinished && (
            <TouchableOpacity style={styles.backButton} onPress={resetGame}>
              <Text style={styles.backButtonText}>Volver al inicio</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      
      <GameHistory />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  messageContainer: {
    backgroundColor: '#FB929E',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  message: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  resultContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FB929E',
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: '#FB929E',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FFB6B9',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  winMessage: {
    backgroundColor: '#4CAF50',
  },
  loseMessage: {
    backgroundColor: '#F44336',
  },
  pairsFound: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 8,
    fontWeight: '500',
  },
  winTitle: {
    color: '#4CAF50',
  },
  loseTitle: {
    color: '#F44336',
  },
});

export default HomeScreen;