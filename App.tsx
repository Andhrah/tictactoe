import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home';
import TicTacToe from './src/components/TicTacToe';
import ScoreBoard from './src/components/ScoreBoard';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} options={{ title: 'none' }} />
        <Stack.Screen name="TicTacToe" component={TicTacToe} options={{ title: 'none' }} />
        <Stack.Screen name="ScoreBoard" component={ScoreBoard} options={{ title: 'none' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
