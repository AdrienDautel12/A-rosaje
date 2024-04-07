import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,  Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';




export default function Accueil() {
  const navigation = useNavigation();

  const handle_addplant = () => {
    navigation.navigate('AjoutPlant');
  };


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.arosaje, { fontSize: 32 }]}>Bienvenue sur{'\n'}A'ROSA-JE</Text>
          <TouchableOpacity style={styles.button} onPress={handle_addplant}>
          <Text style={styles.subtitle}>Commençons par ajouter votre première plante !</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.notificationIcon}>
          <Image source={require('./assets/bell1.png')} style={{ width: 45, height: 45, marginBottom:'100%',marginRight:'100%'}} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {[...Array(5).keys()].map((index) => (
          <View key={index} style={styles.cardContainer}>
            <Text>Container {index + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: 200, // Ajustez la hauteur de la partie noire ici
    backgroundColor: 'black',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'column', 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: 300,
    height: 200,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 40, // Largeur de l'image de notification
    justifyContent: 'center', // Centrez l'image horizontalement
    alignItems: 'center', // Centrez l'image verticalement
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: '15%',
  },
  arosaje: {
    color: '#F5F5DC',
    marginTop:'10%',
  },   
});
