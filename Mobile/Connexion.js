import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
let token = 'salut';

export default function Connexion() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleConnexion = async () => {
    console.log('Connexion :', { username, password });
    try {
      const response = await fetch('http://172.16.1.126:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        Alert.alert('Erreur', 'Nom d\'utilisateur ou mot de passe incorrect');
      } else {
        const responseData = await response.json();
        console.log('Connexion réussie :', responseData);
        token = responseData;
        navigation.navigate('Accueil');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite. Veuillez réessayer plus tard.');
    }
  };
  

  const handleForgotPassword = () => {
  };

  const handleInscription = () => {
    navigation.navigate('Inscription');
  };

   return (
    <ImageBackground source={require('./assets/connexarbre.jpg')} style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={[styles.arosaje, { fontSize: 30, marginTop: 20 }]}>A'ROSA-JE</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Nom d'utilisateur"
            placeholderTextColor="#A9A9A9"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Mot de passe"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleConnexion}>
              <Text style={styles.buttonText}>CONNEXION </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.noCompte}>Vous n'avez pas encore de compte ?</Text>
          <TouchableOpacity onPress={handleInscription}>
            <Text style={styles.forgotPassword}>Inscrivez-vous</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export { token };

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop:140,
  },
  arosaje: {
    fontSize: 40,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: '',
  },  
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    height:'50%',
  },
  input: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    alignItems:'center',
    padding: 13,
    marginVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonContainer: {
    marginTop: 15,
    alignItems:'center',
  },
  button: {
    backgroundColor: '#01B763',
    padding: 15,
    borderRadius: 30,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  forgotPassword: {
    fontSize: 15,
    color: '#1F1F1F',
    textAlign: 'center',
    marginTop: 10,
  },
  noCompte: {
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
});
