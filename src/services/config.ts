// config.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const BASE_URL = "Url Services";

const TIME_OUT = 30000;
export const INFINITE_TOKEN_NAME = "infinite_user_token";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export const saveToken = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log("error in saveToken", error);
    throw error;
  }
};

export const removeToken = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("error in removeToken", error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(async (req) => {
  try {
    const access_token = await SecureStore.getItemAsync(INFINITE_TOKEN_NAME);
    req.headers.Authorization = access_token;
    return req;
  } catch (error) {
    return req;
  }
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;
