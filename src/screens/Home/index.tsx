import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { styles } from './styles';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Como você deseja saber o valor da FIPE?</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VehicleFipe')}>
          <Text style={styles.buttonText}>🔍 Procurar FIPE pelo veículo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PlateFipe')}>
          <Text style={styles.buttonText}>🚗 Procurar FIPE pela placa do veículo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
