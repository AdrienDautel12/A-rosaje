import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const navigation = useNavigation();

  const handleInscription = () => {
    console.log('Inscription :', { email, password, nom, prenom, telephone,adresse,codePostal });
    navigation.navigate('Accueil');
  };

  return (
    <ImageBackground source={require('./assets/connexarbre.jpg')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.title}>INSCRIPTION</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="NOM"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setNom(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="PRENOM"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setPrenom(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="NUM TELEPHONE"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setTelephone(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="ADRESSE"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setAdresse(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="CODE POSTAL"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setCodePostal(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="ADRESSE EMAIL"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="MOT DE PASSE"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleInscription}>
              <Text style={styles.buttonText}>INSCRIPTION </Text>
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
      alignItems: 'center',
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
