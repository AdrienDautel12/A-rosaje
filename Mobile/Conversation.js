import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Conversation() {
  const route = useRoute();
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  // Extraire les paramètres passés à la navigation
  const { ownerFirstName, ownerLastName } = route.params || {};

  // Fonction pour envoyer un message
  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage(''); // Réinitialise le champ de saisie
    }
  };

  // Fonction pour revenir à la page précédente
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={require('./assets/connexarbre.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Conversation avec {ownerFirstName} {ownerLastName}</Text>
        </View>
        <ScrollView style={styles.messageContainer}>
          {messages.map((msg, index) => (
            <View key={index} style={styles.messageBubble}>
              <Text style={styles.messageText}>{msg}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Écrivez un message..."
            placeholderTextColor="#A9A9A9"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.backButtonContainer}>
          <Button title="Retour" onPress={handleBack} color="#ff6347" />
        </View>
      </View>
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
    justifyContent: 'space-between',
    padding: 20,
  },
  headerContainer: {
    padding: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'RubikMonoOne',
  },
  messageContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    alignSelf: 'flex-start', // Ajuster si les messages sont envoyés ou reçus
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  sendButton: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButtonContainer: {
    marginTop: 10,
  },
});
