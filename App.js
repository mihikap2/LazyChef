import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ingredients from './Ingredients';
import Results from './Results';
import Favorites from './Favorites';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator

      tabBarOptions={{
        showLabel:false,
        activeTintColor: '#FFBE16',
        inactiveTintColor: '#111'
      }}>
      <Tab.Screen 
        name="Ingredients" 
        component={Ingredients} 
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-basket" color={color} size={30} />
          ),
        }}/>
      <Tab.Screen 
        name="Results" 
        component={Results} 
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="search" color={color} size={30} />
          ),
        }}/>
      <Tab.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="heart" color={color} size={30} />
          ),
        }}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}

