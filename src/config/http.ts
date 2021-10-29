import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // console.log('请求拦截', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // console.log('响应拦截', response);
    return response.data;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);
