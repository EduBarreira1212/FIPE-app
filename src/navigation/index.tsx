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
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1e1e1e',
          },
          headerTintColor: '#f1f1f1',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Início',
          }}
        />
        <RootStack.Screen
          name="VehicleFipe"
          component={VehicleFipeScreen}
          options={{
            title: 'Consulta FIPE por Veículo',
          }}
        />
        <RootStack.Screen
          name="PlateFipe"
          component={PlateFipeScreen}
          options={{
            title: 'Consulta FIPE por Placa',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
