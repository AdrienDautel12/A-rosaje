import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Connexion from './Connexion';
import Inscription from './Inscription';
import Accueil from './Accueil';
import AjoutPlant from './AjoutPlant';
import Profil from './Profil';
import Map from './Map';
import Garde from './Garde';
import DetailPlant from './DetailPlant';
import DescriptionGarde from './DescriptionGarde';
import Conversation from './Conversation';




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Accueil" component={Accueil} />
      <Tab.Screen name="Profil" component={Profil} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Connexion" headerMode="none">
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="AjoutPlant" component={AjoutPlant} />
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Garde" component={Garde} />
        <Stack.Screen name="DetailPlant" component={DetailPlant} />
        <Stack.Screen name="DescriptionGarde" component={DescriptionGarde} />
        <Stack.Screen name="Conversation" component={Conversation} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
