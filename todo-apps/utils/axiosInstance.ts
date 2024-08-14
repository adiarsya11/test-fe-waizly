import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url) {
      const url = new URL(
        config.url,
        process.env.NEXT_PUBLIC_WEATHER_BASE_URL ?? ""
      );

      url.searchParams.set(
        "appid",
        process.env.NEXT_PUBLIC_WEATHER_API_KEY ?? ""
      );

      config.url = url.toString();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
