import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import Accueil from './Accueil';

const Stack = createStackNavigator();

export const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="App" component={App} />
    <Stack.Screen name="Accueil" component={Accueil} />
  </Stack.Navigator>
);
