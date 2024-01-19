import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './Navigation';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleConnexion = () => {
  console.log('Connexion :', { email, password });
  
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  
  
  // Redirigez vers la page "Accueil"
  navigation.navigate('Accueil');
};


  return (
    <NavigationContainer>
      <ImageBackground source={require('./assets/connexarbre.jpg')} style={styles.background}>
        <View style={styles.headerContainer}>
          <Text style={[styles.arosaje, { fontSize: 30, marginTop: 20 }]}>A'ROSA-JE</Text>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="LOGIN"
              placeholderTextColor="#A9A9A9"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="PASSWORD"
              placeholderTextColor="#A9A9A9"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleConnexion}>
                <Text style={styles.buttonText}>Connexion</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </NavigationContainer>
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
  },  
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  input: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#01B763',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
