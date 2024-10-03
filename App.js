import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalculatorScreen from './CalculatorScreen';
import HistoryScreen from './HistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calculator">
        <Stack.Screen 
          name="Calculator" 
          component={CalculatorScreen} 
          options={{ title: 'Densi' }}
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: 'Historique des calculs' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );}