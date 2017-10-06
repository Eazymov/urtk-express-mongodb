import Axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = Axios.create({
  baseURL: '/api',
  timeout: 3000,
});

export default instance;
