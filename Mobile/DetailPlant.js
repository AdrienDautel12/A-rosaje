import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { token } from './Connexion';


export default function DetailPlant() {
  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params;
  const [plantDetail, setPlantDetail] = useState(plant);
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [showDebutPicker, setShowDebutPicker] = useState(false);
  const [showFinPicker, setShowFinPicker] = useState(false);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [price, setPrice] = useState('');

  const handleChange = (key, value) => {
    setPlantDetail({
      ...plantDetail,
      [key]: value,
    });
  };

  const onChangeDebut = (event, selectedDate) => {
    const currentDate = selectedDate || dateDebut;
    setShowDebutPicker(Platform.OS === 'ios');
    setDateDebut(currentDate);
  };

  const onChangeFin = (event, selectedDate) => {
    const currentDate = selectedDate || dateFin;
    setShowFinPicker(Platform.OS === 'ios');
    setDateFin(currentDate);
  };

  const handleSubmit = async () => {
    const data = {
      start_date: dateDebut.toISOString().split('T')[0],
      end_date: dateFin.toISOString().split('T')[0],
      address: address,
      postal_code: postalCode,
      city: 1,
      plant: plantDetail.plantId, 
      price: price,
    };
    console.log('Data to be sent:', data);
    try {
      const response = await fetch('http://172.20.10.8:8000/api/guardian-requests/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.access}`,
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        Alert.alert('Succès', 'Votre demande a été envoyée avec succès.');
        navigation.goBack();
      } else {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        Alert.alert('Erreur', `Une erreur s'est produite : ${response.status} - ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Fetch timeout error:', error);
        Alert.alert('Erreur', 'La requête a expiré.');
      } else {
        console.error('Fetch error:', error);
        Alert.alert('Erreur', 'Une erreur s\'est produite : ' + error.message);
      }
    }
  };

  return (
    <ImageBackground source={require('./assets/connexarbre.jpg')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>GARDER MA PLANTE</Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={[styles.input, { textAlign: 'center' }]}
              placeholder="Nom"
              placeholderTextColor="#888"
              value={plantDetail.name}
              onChangeText={(text) => handleChange('name', text)}
            />
            <Text style={styles.label}>Espèce</Text>
            <TextInput
              style={[styles.input, { textAlign: 'center' }]}
              placeholder="Espèce"
              placeholderTextColor="#888"
              value={plantDetail.species}
              onChangeText={(text) => handleChange('species', text)}
            />
            
            <Text style={styles.label}>Informations complémentaires</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Informations complémentaires"
              placeholderTextColor="#888"
              value={plantDetail.plantDescription}
              multiline
              numberOfLines={4}
              onChangeText={(text) => handleChange('additionalInfo', text)}
            />
            <Text style={styles.label}>Adresse Postal</Text>
            <TextInput
              style={[styles.input, { textAlign: 'center' }]}
              placeholder="Adresse Postal"
              placeholderTextColor="#888"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <Text style={styles.label}>Code Postal</Text>
            <TextInput
              style={[styles.input, { textAlign: 'center' }]}
              placeholder="Code Postal"
              placeholderTextColor="#888"
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
            />
            <Text style={styles.label}>Date de début</Text>
            <TouchableOpacity onPress={() => setShowDebutPicker(true)} style={styles.datePicker}>
              <Text style={styles.dateText}>{dateDebut.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDebutPicker && (
              <DateTimePicker
                value={dateDebut}
                mode="date"
                display="default"
                onChange={onChangeDebut}
              />
            )}
            <Text style={styles.label}>Date de fin</Text>
            <TouchableOpacity onPress={() => setShowFinPicker(true)} style={styles.datePicker}>
              <Text style={styles.dateText}>{dateFin.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showFinPicker && (
              <DateTimePicker
                value={dateFin}
                mode="date"
                display="default"
                onChange={onChangeFin}
              />
            )}
            <Text style={styles.label}>Prix (en €)</Text>
            <TextInput
              style={[styles.input, { textAlign: 'center' }]}
              placeholder="Prix"
              placeholderTextColor="#888"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Demander la garde de ma plante</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 25,
    borderRadius: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePicker: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonCancel: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
