import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTermsAccepted, setTermsAccepted] = useState(false);
  const navigation = useNavigation();

  const handleInscription = async () => {
    if (!isTermsAccepted) {
      Alert.alert("Conditions d'utilisation", "Vous devez accepter les conditions d'utilisation pour vous inscrire.");
      return;
    }

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
        <Text style={styles.title}>INSCRIPTION</Text>
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
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#A9A9A9"
            onChangeText={(text) => setPassword2(text)}
            secureTextEntry
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Firstname"
            placeholderTextColor="#A9A9A9"
            onChangeText={(text) => setFirstname(text)}
          />
          <TextInput
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="Lastname"
            placeholderTextColor="#A9A9A9"
            onChangeText={(text) => setLastname(text)}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.link}>Voir les conditions d'utilisation</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleInscription}>
              <Text style={styles.buttonText}>INSCRIPTION</Text>
            </TouchableOpacity>
            <Text style={styles.noCompte}>Vous avez déjà un compte ?</Text>
            <TouchableOpacity onPress={handleConnexion}>
              <Text style={styles.forgotPassword}>Connectez-vous</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={isModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Conditions d'utilisation</Text>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.modalText}>
                  1. Introduction{'\n'}
                  En utilisant notre application, vous acceptez les présentes conditions d'utilisation.
                  {'\n\n'}
                  2. Utilisation de l'application{'\n'}
                  Vous acceptez d'utiliser l'application uniquement à des fins légales et conformément à toutes les lois applicables.
                  {'\n\n'}
                  3. Protection des données{'\n'}
                  Nous respectons votre vie privée et nous engageons à protéger vos informations personnelles conformément à notre politique de confidentialité.
                  {'\n\n'}
                  4. Comptes utilisateurs{'\n'}
                  Vous êtes responsable de la confidentialité de votre compte et de votre mot de passe.
                  {'\n\n'}
                  5. Modifications des conditions{'\n'}
                  Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications seront effectives dès leur publication.
                  {'\n\n'}
                  6. Limitation de responsabilité{'\n'}
                  Nous ne serons pas responsables des dommages indirects ou consécutifs résultant de l'utilisation ou de l'incapacité d'utiliser l'application.
                  {'\n\n'}
                  7. Résiliation{'\n'}
                  Nous pouvons suspendre ou résilier votre accès à l'application à tout moment, sans préavis, en cas de violation de ces conditions.
                  {'\n\n'}
                  8. Loi applicable{'\n'}
                  Ces conditions d'utilisation sont régies par les lois en vigueur dans notre juridiction.
                  {'\n\n'}
                  9. Contact{'\n'}
                  Si vous avez des questions concernant ces conditions, veuillez nous contacter à [votre adresse e-mail de contact].
                </Text>
              </ScrollView>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setTermsAccepted(true);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>J'accepte</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    marginBottom: 'auto'
  },
  forgotPassword: {
    fontSize: 15,
    color: '#1F1F1F',
    textAlign: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 450,
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  noCompte: {
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
  link: {
    color: '#01B763',
    textAlign: 'center',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 300,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#01B763',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
  },
});
