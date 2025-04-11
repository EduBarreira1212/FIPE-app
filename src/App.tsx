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
  const [brandSelected, setBrandSelected] = useState<Brand>();
  const [loading, setLoading] = useState(false);

  const [modelQuery, setModelQuery] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);

  const [year, setYear] = useState('');

  const [fipeInfo, setFipeInfo] = useState<any>();
  const [loadingFipeInfo, setLoadingFipeInfo] = useState(false);

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

  const fetchFipeInfo = async (brandCode: string, modelCode: string, yearCode: string) => {
    if (!(brandCode && modelCode && yearCode)) {
      setFipeInfo('');
      return;
    }

    setLoadingFipeInfo(true);

    try {
      const res = await axios.get(
        `https://fipe.parallelum.com.br/api/v2/cars/brands/${brandCode}/models/${modelCode}/years/${yearCode}`
      );

      console.log(res.data);

      const fipeInfo = res.data;
      setFipeInfo(fipeInfo);
    } catch (error) {
      console.error(error);
      setFipeInfo('');
    } finally {
      setLoadingFipeInfo(false);
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

  const handleDateChange = (year: string) => {
    setYear(year);
  };

  const handleSelectBrand = (brand: Brand) => {
    setQuery(brand.name);
    setBrandSelected(brand);
    setBrands([]);
    fetchModels(brand.code);
  };

  const handleSelectModel = (model: Model, brandCode: string) => {
    setModelQuery(model.name);
    setModels([]);

    fetchFipeInfo(brandCode, model.code, `${year}-1`);
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
            <TouchableOpacity onPress={() => handleSelectBrand(item)} style={styles.option}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TextInput
        placeholder="Digite um ano..."
        value={year}
        onChangeText={handleDateChange}
        style={styles.input}
      />

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
            <TouchableOpacity
              onPress={() => handleSelectModel(item, brandSelected!.code)}
              style={styles.option}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {loadingFipeInfo && <ActivityIndicator size="small" color="#000" />}

      {fipeInfo && <Text>{fipeInfo.price}</Text>}
    </SafeAreaView>
  );
};

export default App;
