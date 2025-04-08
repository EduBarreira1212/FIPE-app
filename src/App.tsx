import axios from 'axios';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

let timeout: NodeJS.Timeout;

const App = () => {
  const [query, setQuery] = useState('');
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [modelQuery, setModelQuery] = useState('');
  const [models, setModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);

  const fetchBrands = async (search: string) => {
    if (!search) {
      setBrands([]);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`
      );

      const names = res.data.results.map((item: any) => item.MakeName);
      console.log(names);
      setBrands(names);
    } catch (error) {
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async (search: string) => {
    if (!search) {
      setModels([]);
      return;
    }

    setLoadingModels(true);

    try {
      const res = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${search}?format=json`
      );

      const names = res.data.results.map((item: any) => item.MakeName);
      console.log(names);
      setBrands(names);
    } catch (error) {
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (text: string) => {
    setQuery(text);
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fetchModels(text);
    }, 500);
  };

  const handleModelChange = (text: string) => {
    setModelQuery(text);
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fetchModels(text);
    }, 500);
  };

  const handleSelect = (model: string) => {
    setModelQuery(model);
    setModels([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Digite o nome de uma marca..."
        value={query}
        onChangeText={handleChange}
        style={styles.input}
      />

      {loading && <ActivityIndicator size="small" color="#000" />}

      {!loading && brands.length > 0 && (
        <FlatList
          data={brands}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.option}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TextInput
        placeholder="Digite o nome de um modelo..."
        value={modelQuery}
        onChangeText={handleModelChange}
        style={styles.input}
      />

      {loadingModels && <ActivityIndicator size="small" color="#000" />}

      {!loadingModels && models.length > 0 && (
        <FlatList
          data={models}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.option}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default App;
