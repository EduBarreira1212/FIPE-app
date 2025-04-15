import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import VehicleFipeScreen from '../screens/VehicleFipe';
import HomeScreen from '../screens/Home';
import { RootStackParamList } from '../types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="VehicleFipe" component={VehicleFipeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
