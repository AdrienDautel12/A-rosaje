import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Connexion from './Connexion';
import Inscription from './Inscription';
import Accueil from './Accueil';
import AjoutPlant from './AjoutPlant';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Connexion" headerMode="none">
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="AjoutPlant" component={AjoutPlant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
