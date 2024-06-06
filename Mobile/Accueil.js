import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { token } from './Connexion';

export default function Accueil() {
  const navigation = useNavigation();
  const [plants, setPlants] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchPlants();
    }, [])
  );

  const fetchPlants = async () => {
    try {
      const response = await fetch('http://172.20.10.8:8000/api/plants/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`,
        },
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Erreur', `Code d'état: ${response.status}, Message: ${errorData.message}`);
      } else if (contentType && contentType.includes("application/json")) {
        let data = await response.json();
        console.log('Fetched data:', data);

        if (data.length > 0 && data[0].hasOwnProperty('created_at')) {
          data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        setPlants(data);
      } else {
        const errorText = await response.text();
        console.log('Response is not JSON:', errorText);
        Alert.alert('Erreur', 'La réponse du serveur n\'est pas au format JSON.');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Erreur', `Une erreur s'est produite: ${error.message}`);
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

  const deletePlant = async (plantId) => {
    try {
      const response = await fetch(`http://172.20.10.8:8000/api/plants/${plantId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`,
        },
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Erreur', `Code d'état: ${response.status}, Message: ${errorData.message}`);
      } else if (contentType && contentType.includes("application/json")) {
        setPlants(plants.filter(plant => plant.id !== id));
        Alert.alert('Succès', 'Plante supprimée avec succès');
      } else {
        const errorText = await response.text();
        console.log('Response is not JSON:', errorText);
        Alert.alert('Erreur', 'La réponse du serveur n\'est pas au format JSON.');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Erreur', `Une erreur s'est produite: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.arosaje, { fontSize: 32, fontFamily: 'RubikMonoOne' }]}>Bienvenue sur{'\n'}A'ROSA-JE</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonProfil} onPress={handle_profile}>
              <Text style={[styles.buttonTextProfil]}>Mon profil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.cardContainer1}>
          <View style={styles.infoContainer}>
            <Text style={[styles.buttonTextrenseigner]}>RENSEIGNEZ LES INFORMATIONS DE VOTRE PLANTE.</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <TouchableOpacity style={styles.button} onPress={handle_addplant}>
                <Text style={[styles.buttonText]}>Ajouter une plante</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.cardContainer1}>
          <View style={styles.infoContainer}>
            <Text style={[styles.buttonTextrenseigner]}>VOUS SOUHAITEZ GARDER UNE PLANTE ?</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <TouchableOpacity style={styles.button} onPress={handle_guardplant}>
                <Text style={[styles.buttonText]}>Garder une plante</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}>Vos plantes ({plants.length})</Text>
          <View style={styles.separator} />
        </View>
        {plants && plants.length > 0 ? (
          plants.map((plant, index) => (
            <TouchableOpacity key={index} style={styles.cardContainer} onPress={() => handleViewPlant(plant)}>
              <View style={styles.infoContainer}>
                <Text style={[styles.infoText]}>Nom de plante: {plant.name}</Text>
                <Text style={[styles.infoText]}>Espece: {plant.species}</Text>
                <Text style={[styles.infoText]}>Description: {plant.plantDescription}</Text>
                <Text style={styles.infoText}>Image:</Text>
      {plant.image_url && (
        <Image source={{ uri: plant.image_url }} style={styles.image}/>
      )}
                <TouchableOpacity style={styles.deleteButton} onPress={() => deletePlant(plant.id)}>
                  <Text style={[styles.deleteButtonText]}>X</Text>
                </TouchableOpacity>
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
    height: 200,
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
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  cardContainer: {
    width: '90%',
    height: '6.5%',
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
  cardContainer1: {
    width: '90',
    height: '4%',
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
