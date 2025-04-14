import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import VehicleFipeScreen from '../screens/VehicleFipe';
import HomeScreen from '../screens/Home';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VehicleFipe" component={VehicleFipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
