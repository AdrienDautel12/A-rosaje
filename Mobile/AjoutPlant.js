import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Alert, TextInput, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { token } from './Connexion';

export default function AjoutPlant() {
  const [name, setNomPlante] = useState('');
  const [species, setEspece] = useState('');
  const [plantDescription, setDescriptionPlante] = useState('');
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const getGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the gallery is required!');
    }
  };
  
  const getCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera is required!');
    }
  };

  useEffect(() => {
    getGalleryPermission();
    getCameraPermission();
  }, []);

  const handleEnregistrer = async () => {
    console.log('Ajout de plante :', { name, species, plantDescription });
    try {
      const response = await fetch('http://172.20.10.8:8000/api/plants/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`,
        },
        body: JSON.stringify({
          name,
          species,
          plantDescription,
        }),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.log('Erreur de réponse :', responseData);
        Alert.alert('Erreur', 'Une erreur est survenue');
      } else {
        console.log('Ajout de plante réussie :', responseData);
        const plantId = responseData.plantId;
        if (image) {
          await uploadImage(plantId);
        }
        navigation.navigate('Accueil');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Erreur', `${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        Alert.alert('Erreur', 'Aucune réponse du serveur');
      } else {
        Alert.alert('Erreur', error.message);
      }
    }
  };
  
  const uploadImage = async (plantId) => {
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: 'plant_image.jpg',
      type: 'image/jpeg'
    });
    formData.append('plant', plantId); // Envoyer l'ID de la plante dans le champ plant
  
    try {
      const response = await fetch('http://172.20.10.8:8000/api/plant-images/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token.access}`,
        },
        body: formData,
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.log('Erreur de réponse pour l\'image :', responseData);
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'upload de l\'image');
      } else {
        console.log('Upload de l\'image réussi :', responseData);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Erreur', `${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        Alert.alert('Erreur', 'Aucune réponse du serveur');
      } else {
        Alert.alert('Erreur', error.message);
      }
    }
  };
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); 
    }
    setModalVisible(false);
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
    setModalVisible(false);
  };

  return (
    <ImageBackground source={require('./assets/connexarbre.jpg')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>Ajouter une plante</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nom de la plante"
            placeholderTextColor="#A9A9A9"
            onChangeText={(text) => setNomPlante(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Espece de plante"
            placeholderTextColor="#A9A9A9"
            onChangeText={(text) => setEspece(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description de la plante"
            placeholderTextColor="#A9A9A9"
            onChangeText={(text) => setDescriptionPlante(text)}
          />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Sélectionnez une image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleEnregistrer}>
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choisir une option</Text>
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.buttonText}>Depuis la galerie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
              <Text style={styles.buttonText}>Prendre une photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    padding: 13,
    marginVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#01B763',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    marginTop: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#01B763',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
});
