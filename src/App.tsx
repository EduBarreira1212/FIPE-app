import axios from 'axios';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

let timeout: NodeJS.Timeout;

type Brand = {
  code: string;
  name: string;
};

type Model = {
  code: string;
  name: string;
};

const App = () => {
  const [query, setQuery] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  const [modelQuery, setModelQuery] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);

  const fetchBrands = async (search: string) => {
    if (!search) {
      setBrands([]);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(`https://fipe.parallelum.com.br/api/v2/cars/brands`);

      const brands = res.data;
      setBrands(
        brands.filter((item: Brand) => item.name.toLowerCase().includes(query.toLowerCase()))
      );
    } catch (error) {
      console.error(error);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async (brandCode: string) => {
    if (!brandCode) {
      setModels([]);
      return;
    }

    setLoadingModels(true);

    try {
      const res = await axios.get(
        `https://fipe.parallelum.com.br/api/v2/cars/brands/${brandCode}/models`
      );

      const models = res.data;
      setModels(models);
    } catch (error) {
      console.error(error);
      setBrands([]);
    } finally {
      setLoadingModels(false);
    }
  };

  const handleChange = (text: string) => {
    setQuery(text);
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fetchBrands(text);
    }, 500);
  };

  const handleModelChange = (text: string) => {
    setModelQuery(text);
    const filtered = models.filter((model) =>
      model.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredModels(filtered);
  };

  const handleSelectBrand = (brand: string, brandCode: string) => {
    setQuery(brand);
    setBrands([]);
    fetchModels(brandCode);
  };

  const handleSelectModel = (model: string) => {
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
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectBrand(item.name, item.code)}
              style={styles.option}
            >
              <Text>{item.name}</Text>
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
          data={filteredModels.length > 0 ? filteredModels : models}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectModel(item.name)} style={styles.option}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
