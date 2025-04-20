import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';

const PlateFipeScreen = () => {
  const [plate, setPlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<string | null>(null);

  const handleSearch = () => {
    setLoading(true);
    setPrice(null);

    setTimeout(() => {
      setLoading(false);
      setPrice('R$ 45.300,00');
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Insira a placa</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: ABC1D23"
        placeholderTextColor="#888"
        autoCapitalize="characters"
        value={plate}
        onChangeText={setPlate}
        maxLength={7}
      />

      <TouchableOpacity
        style={[styles.button, !plate ? styles.buttonDisabled : null]}
        onPress={handleSearch}
        disabled={!plate || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Buscar</Text>
        )}
      </TouchableOpacity>

      {price && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>FIPE:</Text>
          <Text style={styles.resultPrice}>{price}</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default PlateFipeScreen;
