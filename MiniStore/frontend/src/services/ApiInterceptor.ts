import axios from "axios";
import { logout } from "../Redux/slice/auth.slice";
import { store } from "../Redux/store";

const apiInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

apiInterceptor.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiInterceptor.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default apiInterceptor;
