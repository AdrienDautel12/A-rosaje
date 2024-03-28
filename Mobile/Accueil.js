import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Accueil() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.arosaje, { fontSize: 32 }]}>Bienvenue sur{'\n'}A'ROSA-JE</Text>
          <Text style={styles.subtitle}>Commençons par ajouter votre première plante !</Text>
        </View>
        <View style={styles.notificationIcon}>
          <Image source={require('./assets/bell1.png')} style={{ width: 45, height: 45, marginBottom:'100%',marginRight:'100%'}} />
        </View>
      </View>
      <View style={styles.bottomContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'column', 
  },
  bottomContainer: {
    flex: 2,
    backgroundColor: '#D9D9D9',
  },
  notificationIcon: {
    width: 40, // Largeur de l'image de notification
    justifyContent: 'center', // Centrez l'image horizontalement
    alignItems: 'center', // Centrez l'image verticalement
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: '15%', // Réduisez légèrement l'espace supérieur
  },
  arosaje: {
    color: '#F5F5DC',
    marginTop:'10%',
  },   
});
