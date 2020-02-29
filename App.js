import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ingredients from './Ingredients';
import Results from './Results';
import Favorites from './Favorites';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Ingredients" component={Ingredients} />
      <Tab.Screen name="Results" component={Results} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

