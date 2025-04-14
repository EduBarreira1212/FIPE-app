import React from 'react';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { Brand, Model, Year } from '../../types';
import { api } from '../../lib/axios';

let timeout: NodeJS.Timeout;

const VehicleFipeScreen = () => {
  const [query, setQuery] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandSelected, setBrandSelected] = useState<Brand>();
  const [loading, setLoading] = useState(false);

  const [modelQuery, setModelQuery] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);

  const [yearQuery, setYearQuery] = useState('');
  const [years, setYears] = useState<Year[]>([]);
  const [filteredYears, setFilteredYears] = useState<Year[]>([]);
  const [yearSelected, setYearSelected] = useState<Year>();
  const [loadingYears, setLoadingYears] = useState(false);

  const [fipeInfo, setFipeInfo] = useState<any>();
  const [loadingFipeInfo, setLoadingFipeInfo] = useState(false);

  const fetchBrands = async (search: string) => {
    if (!search) {
      setBrands([]);
      return;
    }

    setLoading(true);

    try {
      const res = await api.get(`/brands`);

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

  const fetchYears = async (brandId: string) => {
    if (!brandId) {
      setYears([]);
      return;
    }

    setLoadingYears(true);

    try {
      const res = await api.get(`/brands/${brandId}/years`);

      const years = res.data;
      setYears(years);
    } catch (error) {
      console.error(error);
      setYears([]);
    } finally {
      setLoadingYears(false);
    }
  };

  const fetchModels = async (brandCode: string, yearId: string) => {
    if (!brandCode) {
      setModels([]);
      return;
    }

    setLoadingModels(true);

    try {
      const res = await api.get(`/brands/${brandCode}/years/${yearId}/models`);

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
      const res = await api.get(`/brands/${brandCode}/models/${modelCode}/years/${yearCode}`);

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

  const handleYearChange = (text: string) => {
    setYearQuery(text);

    const filtered = years.filter((year) => year.name.toLowerCase().includes(text.toLowerCase()));

    setFilteredYears(filtered);
  };

  const handleSelectBrand = (brand: Brand) => {
    setQuery(brand.name);
    setBrandSelected(brand);
    setBrands([]);
    fetchYears(brand.code);
  };

  const handleSelectYear = (year: Year) => {
    setYearQuery(year.name);
    setYearSelected(year);
    setYears([]);

    if (!brandSelected) return;

    fetchModels(brandSelected.code, year.code);
  };

  const handleSelectModel = (model: Model, brandCode: string) => {
    setModelQuery(model.name);
    setModels([]);

    if (!yearSelected) return;

    fetchFipeInfo(brandCode, model.code, yearSelected.code);
  };

  const handleClearClick = () => {
    setQuery('');
    setYearQuery('');
    setFilteredYears([]);
    setYearSelected(undefined);
    setModelQuery('');
    setModels([]);
    setFilteredModels([]);
    setFipeInfo(null);
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
        value={yearQuery}
        onChangeText={handleYearChange}
        style={styles.input}
      />

      {!loadingYears && years.length > 0 && (
        <FlatList
          data={filteredYears.length > 0 ? filteredYears : years}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectYear(item)} style={styles.option}>
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
            <TouchableOpacity
              onPress={() => handleSelectModel(item, brandSelected!.code)}
              style={styles.option}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Button title="Limpar" onPress={handleClearClick} />

      {loadingFipeInfo && <ActivityIndicator size="small" color="#000" />}

      {fipeInfo && (
        <View>
          <Text>Marca: {fipeInfo.brand}</Text>
          <Text>Modelo: {fipeInfo.model}</Text>
          <Text>Ano: {fipeInfo.modelYear}</Text>
          <Text>Combustível: {fipeInfo.fuel}</Text>
          <Text>Valor: {fipeInfo.price}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default VehicleFipeScreen;
