import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity , Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function Map({ route }) {
  const navigation = useNavigation();
  const { plant } = route.params;
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (plant.address) {
      fetchCoordinates(plant.address);
    }
  }, [plant.address]);

  const fetchCoordinates = async (address) => {
    console.log(plant.address);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ latitude: lat, longitude: lng });
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates ? coordinates.latitude : 0,
          longitude: coordinates ? coordinates.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates && (
          <Marker
            coordinate={coordinates}
            title={plant.name}
            description={plant.plantDescription}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  backButtonText: {
    color: '#000000',
    fontSize: 16,
  },
});
