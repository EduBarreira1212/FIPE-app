import React, { useState } from 'react';
import {
  ActivityIndicator,
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
import { Button } from '@react-navigation/elements';

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
    if (!search) return setBrands([]);

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
    if (!brandId) return setYears([]);

    setLoadingYears(true);
    try {
      const res = await api.get(`/brands/${brandId}/years`);
      setYears(res.data);
    } catch (error) {
      console.error(error);
      setYears([]);
    } finally {
      setLoadingYears(false);
    }
  };

  const fetchModels = async (brandCode: string, yearId: string) => {
    if (!brandCode) return setModels([]);

    setLoadingModels(true);
    try {
      const res = await api.get(`/brands/${brandCode}/years/${yearId}/models`);
      setModels(res.data);
    } catch (error) {
      console.error(error);
      setModels([]);
    } finally {
      setLoadingModels(false);
    }
  };

  const fetchFipeInfo = async (brandCode: string, modelCode: string, yearCode: string) => {
    if (!(brandCode && modelCode && yearCode)) return setFipeInfo(null);

    setLoadingFipeInfo(true);
    try {
      const res = await api.get(`/brands/${brandCode}/models/${modelCode}/years/${yearCode}`);
      setFipeInfo(res.data);
    } catch (error) {
      console.error(error);
      setFipeInfo(null);
    } finally {
      setLoadingFipeInfo(false);
    }
  };

  const handleChange = (text: string) => {
    setQuery(text);
    clearTimeout(timeout);
    timeout = setTimeout(() => fetchBrands(text), 500);
  };

  const handleModelChange = (text: string) => {
    setModelQuery(text);
    setFilteredModels(
      models.filter((model) => model.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const handleYearChange = (text: string) => {
    setYearQuery(text);
    setFilteredYears(years.filter((year) => year.name.toLowerCase().includes(text.toLowerCase())));
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
      <Text style={styles.label}>Marca</Text>
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
          style={{ maxHeight: 200 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectBrand(item)} style={styles.option}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.label}>Ano</Text>
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
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectYear(item)} style={styles.option}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.label}>Modelo</Text>
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
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
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

      <Button onPress={handleClearClick} style={styles.clearButton} color="white">
        Limpar
      </Button>

      {loadingFipeInfo && <ActivityIndicator size="small" color="#000" />}

      {fipeInfo && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Marca: {fipeInfo.brand}</Text>
          <Text style={styles.resultText}>Modelo: {fipeInfo.model}</Text>
          <Text style={styles.resultText}>Ano: {fipeInfo.modelYear}</Text>
          <Text style={styles.resultText}>Combustível: {fipeInfo.fuel}</Text>
          <Text style={styles.resultText}>Valor: {fipeInfo.price}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default VehicleFipeScreen;
