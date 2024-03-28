import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleConnexion = () => {
    console.log('Connexion :', { email, password });
    navigation.navigate('Accueil');
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
            placeholder="EMAIL"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }} // Placeholder légèrement plus gros et plus foncé
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="PASSWORD"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }} // Placeholder légèrement plus gros et plus foncé
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    color: '#25d2ced9',
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
