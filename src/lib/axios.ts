import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const appAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

appAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      // const token = getToken();
      config.headers.Authorization = '';
    }
    return config;
  },
  (error: AxiosError) => {
    // if (error.response?.status == 401 || error.response?.status === 403) {
    // }
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (!response.data) {
      return Promise.reject(response);
    }
    return response;
  },
  async (error: AxiosError) => {
    // if (error.response?.status === 401 || error.response?.status === 403) {
    //   useVerifyModal().verifyModalOpenHandler();
    // }
    return Promise.reject(error);
  }
);

export default appAxios;
