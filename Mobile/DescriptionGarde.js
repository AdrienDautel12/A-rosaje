import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Alert, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { token } from './Connexion';

export default function DescriptionGarde() {
  const route = useRoute();
  const navigation = useNavigation(); // Hook pour la navigation
  const { requestId } = route.params;
  console.log("le request id de la plante est :", requestId);
  const [plantDetails, setPlantDetails] = useState(null);

  useEffect(() => {
    fetchPlantDetails();
  }, []);

  const fetchPlantDetails = async () => {
    try {
      const response = await fetch(`http://172.16.1.126:8000/api/guardian-requests-details/${requestId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur de récupération des détails de la plante - Code: ${response.status}, Message: ${errorData.message}`);
      }

      const data = await response.json();
      setPlantDetails(data);
    } catch (error) {
      console.log('Erreur lors de la récupération des détails de la plante:', error);
      Alert.alert('Erreur', `Impossible de récupérer les détails de la plante: ${error.message}`);
    }
  };

  const handleConversation = () => {
    navigation.navigate('Conversation', {
      ownerFirstName: plantDetails.first_name,
      ownerLastName: plantDetails.last_name
    });
  };
  


  // Fonction pour revenir à la page précédente
  const handleCancel = () => {
    navigation.goBack();
  };

  // Fonction placeholder pour démarrer une conversation
  const startConversation = () => {
    Alert.alert('Conversation', 'Démarrage d\'une conversation...');
  };

  if (!plantDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement des détails de la plante...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('./assets/connexarbre.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Propriétaire: {plantDetails.last_name} {plantDetails.first_name}</Text>
            <Text style={styles.infoText}>Nom de la plante: {plantDetails.plant_name}</Text>
            <Text style={styles.infoText}>Adresse: {plantDetails.address}</Text>
            <Text style={styles.infoText}>Espèce: {plantDetails.species}</Text>
            <Text style={styles.infoText}>Code postal: {plantDetails.postal_code}</Text>
            <Text style={styles.infoText}>Ville: {plantDetails.city_name}</Text>
            <Text style={styles.infoText}>Quantité d'eau: {plantDetails.watering_amount}</Text>
            <Text style={styles.infoText}>Température: {plantDetails.temperature_range}</Text>
            <Text style={styles.infoText}>Exposition au soleil: {plantDetails.sun_exposure}</Text>
            <Text style={styles.infoText}>Prix: {plantDetails.formatted_price}</Text>
            <Text style={styles.infoText}>Description: {plantDetails.description}</Text>
          </View>
        </View>

        {/* Boutons en bas */}
        <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleConversation}>
                <Text style={styles.buttonText}>Démarrer une conversation</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 100,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    width: '90%', // Ajuste la largeur pour mieux s'aligner au centre
    alignItems: 'center',
  },
  infoContainer: {
    width: '150%', // Assure que le conteneur des infos utilise toute la largeur disponible
    alignItems: 'center',
    padding: 10,
   },
  infoText: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'RubikMonoOne',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  buttonCancel: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
