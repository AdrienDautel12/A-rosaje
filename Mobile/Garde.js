import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { token } from './Connexion';

export default function Accueil() {
  const navigation = useNavigation();
  const [plants, setPlants] = useState([]);
  const [profil, setProfil] = useState([]);
  const [usernameConnecte, setUsernameConnecte] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchPlants();
    }, [])
  );

  const fetchPlants = async () => {
    try {
      const userResponse = await fetch('http://172.20.10.8:8000/api/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`,
        },
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(`Échec de la récupération des données utilisateur - Code d'état: ${userResponse.status}, Message: ${errorData.message}`);
      } else {
        const userData = await userResponse.json();
        console.log('Fetched user data:', userData);
        setProfil(userData);
        setUsernameConnecte(userData.username);
        console.log('Username connecté:', usernameConnecte);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
      Alert.alert('Erreur', `Une erreur s'est produite lors de la récupération des données utilisateur: ${error.message}`);
    }

    try {
      const plantsResponse = await fetch('http://172.20.10.8:8000/api/guardian-requests/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`,
        },
      });

      if (!plantsResponse.ok) {
        const errorData = await plantsResponse.json();
        throw new Error(`Échec de la récupération des demandes de garde - Code d'état: ${plantsResponse.status}, Message: ${errorData.message}`);
      } else {
        const plantsData = await plantsResponse.json();
        console.log('Fetched plants data:', plantsData);

        if (plantsData.length > 0 && plantsData[0].hasOwnProperty('created_at')) {
          plantsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        setPlants(plantsData);
      }
    } catch (error) {
      console.log('Error fetching plants data:', error);
      Alert.alert('Erreur', `Une erreur s'est produite lors de la récupération des données de demande de garde: ${error.message}`);
    }
  };

  const handle_addplant = () => {
    navigation.navigate('AjoutPlant');
  };

  const handle_guardplant = () => {
    navigation.navigate('Garde');
  };

  const handle_profile = () => {
    navigation.navigate('Profil');
  };

  const handleViewPlant = (plant) => {
    navigation.navigate('DetailPlant', { plant });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.arosaje, { fontSize: 32, fontFamily: 'RubikMonoOne' }]}>Demande de Garde</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {plants && plants.length > 0 ? (
          plants.map((plant, index) => (
            <TouchableOpacity key={index} style={styles.cardContainer} onPress={() => handleViewPlant(plant)}>
              <View style={styles.infoContainer}>
                <View style={styles.userInfo}>
                  <Image source={require('./assets/user-account.png')} style={styles.userImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.infoText]}>Propriétaire: {plant.last_name} {plant.first_name}</Text>
                    <Text style={[styles.infoText]}>Espèce: {plant.species}</Text>
                    <Text style={[styles.infoText]}>Prix: {plant.price}</Text>
                    <Text style={[styles.infoText]}>Période de garde: {plant.formatted_dates}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Aucune plante trouvée.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: 150,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'column',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#01B763',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginRight: 10,
    alignItems: 'center',
    height: 50,
    width: 190,
  },
  button1: {
    backgroundColor: '#01B763',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginRight: 10,
    alignItems: 'center',
    height: 50,
    width: 190,
  },
  buttonProfil: {
    backgroundColor: '#01B763',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonTextrenseigner: {
    color: 'black',
    fontSize: 15,
    width: 300
  },
  buttonTextProfil: {
    color: 'white',
    fontSize: 20,
  },
  scrollContainer: {
    flexGrow: 1
  },
  cardContainer: {
    width: '90%',
    backgroundColor: '#E1E1E1',
    marginVertical: 10,
    borderRadius: 10,
    padding: 20,
    alignSelf: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: '15%',
  },
  arosaje: {
    color: '#F5F5DC',
    marginTop: '10%',
    fontFamily: 'RubikMonoOne',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: '#000',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  infoContainer: {
    flex: 1,
  },
  infoContainer1: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  infoText: {
    marginBottom: 5,
    fontFamily: 'RubikMonoOne',
  },
  deleteButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#FF0000',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

