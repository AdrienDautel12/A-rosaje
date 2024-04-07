import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  const handleInscription = async () => {
    console.log('Informations saisies :', { username, password, password2, email, first_name, last_name });
    try {
      const response = await fetch('http://172.20.10.8:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          password2,
          email,
          first_name,
          last_name,
        }),
      });

      console.log 

      if (!response.ok) {
        const responseData = await response.json();
        console.error('Erreur lors de l\'inscription :', responseData);
      } else {
        const responseData = await response.json();
        console.log('Inscription réussie :', responseData);
        navigation.navigate('Connexion'); // Redirection vers la page de connexion après l'inscription
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      // Gérez les erreurs de requête, par exemple affichez un message générique à l'utilisateur
    }
  };

  const handleConnexion = () => {
    navigation.navigate('Connexion');
  };

  return (
    <ImageBackground source={require('./assets/connexarbre.jpg')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>A'ROSA-JE</Text>
        <View style={styles.formContainer}>
        <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Username"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Password2"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setPassword2(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Firstname"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setFirstname(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Lastname"
            placeholderTextColor="#A9A9A9"
            placeholderStyle={{ fontSize: 18, color: '#666666' }}
            onChangeText={(text) => setLastname(text)}
          />
          {/* Ajoutez les autres champs de formulaire de la même manière */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleInscription}>
              <Text style={styles.buttonText}>INSCRIPTION </Text>
            </TouchableOpacity>
            <Text style={styles.noCompte}>Vous avez déjà un compte ?</Text>
            <TouchableOpacity onPress={handleConnexion}>
              <Text style={styles.forgotPassword}>Connectez-vous</Text>
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
  forgotPassword: {
    fontSize: 15,
    color: '#25d2ced9',
    textAlign: 'center',
    marginTop: 10,
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
  noCompte: {
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
});
