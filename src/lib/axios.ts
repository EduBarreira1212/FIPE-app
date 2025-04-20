import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://fipe.parallelum.com.br/api/v2/cars',
});