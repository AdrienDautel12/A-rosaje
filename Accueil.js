// Accueil.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Accueil = () => {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur la page Accueil !</Text>
      {/* Vous pouvez ajouter d'autres éléments ou fonctionnalités ici */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Accueil;
