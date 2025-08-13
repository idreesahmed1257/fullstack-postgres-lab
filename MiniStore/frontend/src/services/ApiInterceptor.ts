import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { logout } from "../Redux/slice/auth.slice";
import { store } from "../Redux/store";

const apiInterceptor = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiInterceptor.interceptors.request.use(
  function (config) {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
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
      Cookies.remove("accessToken");
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default apiInterceptor;
