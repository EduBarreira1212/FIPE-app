import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import VehicleFipeScreen from '../screens/VehicleFipe';
import HomeScreen from '../screens/Home';
import { RootStackParamList } from '../types';
import PlateFipeScreen from '../screens/PlateFipe';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }}
        />
        <RootStack.Screen
          name="VehicleFipe"
          component={VehicleFipeScreen}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }}
        />
        <RootStack.Screen
          name="PlateFipe"
          component={PlateFipeScreen}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
