import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { GameProvider } from './provider/GameProvider';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <GameProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <HomeScreen />
      </SafeAreaView>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});