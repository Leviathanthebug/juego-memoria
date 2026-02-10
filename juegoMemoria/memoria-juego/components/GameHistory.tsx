import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GameContext from '../context/GameContext';

const GameHistory: React.FC = () => {
  const context = useContext(GameContext);
  
  if (!context) {
    return null;
  }

  const { gameHistory } = context;
  
  const wonGames = gameHistory.filter(game => game.result === 'won').length;
  const lostGames = gameHistory.filter(game => game.result === 'lost').length;
  const totalPairs = gameHistory.reduce((sum, game) => sum + game.pairsFound, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Partidas</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{wonGames}</Text>
          <Text style={styles.statLabel}>Ganadas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{lostGames}</Text>
          <Text style={styles.statLabel}>Perdidas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalPairs}</Text>
          <Text style={styles.statLabel}>Pares totales</Text>
        </View>
      </View>
      
      <ScrollView style={styles.historyList}>
        {gameHistory.length === 0 ? (
          <Text style={styles.emptyText}>No hay partidas jugadas</Text>
        ) : (
          gameHistory.slice().reverse().map((record) => (
            <View key={record.id} style={styles.historyItem}>
              <Text style={styles.historyDate}>{record.date}</Text>
              <Text style={[
                styles.historyResult,
                record.result === 'won' ? styles.won : styles.lost
              ]}>
                {record.result === 'won' ? ' Ganada' : 'Perdida'} 
                {' - '}{record.pairsFound} {record.pairsFound === 1 ? 'par' : 'pares'}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#BEEBE9',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FB929E',
  },
  statLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  historyList: {
    maxHeight: 200,
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
  },
  historyResult: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  won: {
    color: '#4CAF50',
  },
  lost: {
    color: '#F44336',
  },
  emptyText: {
    textAlign: 'center',
    color: '#000',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
});

export default GameHistory;