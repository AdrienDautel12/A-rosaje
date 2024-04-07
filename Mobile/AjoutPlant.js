import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';

export default function AjoutPlant() {
  const [plantAdresse, setAdresse] = useState('');
  const [species, setSpecies] = useState('');
  const [name, setName] = useState('');
  const [plantDescription, setDescription] = useState('');

  const handleSavePlant = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/plants/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          species: species,
          adresse: plantAdresse,
          description: plantDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la plante');
      }

      Alert.alert('Plante créée avec succès!');
      setName('');
      setSpecies('');
      setAdresse('');
      setDescription('');
    } catch (error) {
      Alert.alert('Erreur lors de la création de la plante.');
      console.error(error);
    }
  };

  return (
    <ImageBackground source={require('./assets/connexarbre.jpg')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>Ajouter une plante</Text>
        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nom de la plante"
              placeholderTextColor="#A9A9A9"
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder="Espèce de la plante"
              placeholderTextColor="#A9A9A9"
              onChangeText={(text) => setSpecies(text)}
              value={species}
            />
            <TextInput
              style={styles.input}
              placeholder="Adresse"
              placeholderTextColor="#A9A9A9"
              onChangeText={(text) => setAdresse(text)}
              value={plantAdresse}
            />
            <TextInput
              style={styles.input}
              placeholder="Description de la plante"
              placeholderTextColor="#A9A9A9"
              onChangeText={(text) => setDescription(text)}
              multiline
              value={plantDescription}
            />
            <TouchableOpacity style={styles.button} onPress={handleSavePlant}>
              <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    alignItems: 'center', // Centrer les éléments horizontalement
  },
  input: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    alignItems: 'center',
    padding: 13,
    marginVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
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
});
