import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Fridge Inventory' }} />
        <Stack.Screen name="AddItemScreen" component={AddItemScreen} options={{ title: 'Add New Item' }} />
        <Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen} options={{ title: 'Item Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 