import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { token } from './Connexion';

export default function Inscription() {
  const navigation = useNavigation();
  const [profil, setProfil] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  

  const fetchProfil = async () => {
    try {
      const response = await fetch('http://172.16.1.126:8000/api/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Erreur', `Code d'état: ${response.status}, Message: ${errorData.message}`);
      } else {
        let data = await response.json();
        console.log('Fetched data:', data);
        setProfil(data);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Erreur', `Une erreur s'est produite: ${error.message}`);
    }
  };

  const handleChange = (key, value) => {
    setProfil({
      ...profil,
      
      [key]: value,
    });
  };

  const updateProfil = async () => {
    try {
      const response = await fetch('http://172.16.1.126:8000/api/user/', {
        method: 'POST', // Changez PUT en POST si nécessaire
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`,
        },
        body: JSON.stringify(profil),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error Data:', errorData);
        Alert.alert('Erreur', `Code d'état: ${response.status}, Message: ${errorData.message}`);
      } else {
        Alert.alert('Succès', 'Votre profil a été mis à jour avec succès.');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Erreur', `Une erreur s'est produite: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchProfil();
  }, []);

  return (
    <ImageBackground source={require('./assets/connexarbre.jpg')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>MON PROFIL</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Username"
            placeholderTextColor="#A9A9A9"
            value={profil.username}
            onChangeText={(text) => handleChange('username', text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            value={profil.email}
            onChangeText={(text) => handleChange('email', text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Firstname"
            placeholderTextColor="#A9A9A9"
            value={profil.first_name}
            onChangeText={(text) => handleChange('first_name', text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Lastname"
            placeholderTextColor="#A9A9A9"
            value={profil.last_name}
            onChangeText={(text) => handleChange('last_name', text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={updateProfil}>
              <Text style={styles.buttonText}>Enregistrer les modifications</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  buttonContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#01B763',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
}); 
