import axiosInstance from "@/utils/axiosInstance";
import { WeatherResponse } from "../types";

export const getWeather = async (
  lat: string,
  long: string
): Promise<WeatherResponse> => {
  const response = await axiosInstance.get(
    `/data/2.5/weather?lat=${lat}&lon=${long}`
  );
  return response.data;
};
