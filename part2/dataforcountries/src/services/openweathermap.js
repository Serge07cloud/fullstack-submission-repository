import axios from "axios";

const baseUrl = import.meta.env.VITE_API_WEATHER;
const secret = import.meta.env.VITE_API_WEATHER_KEY;

const getWeather = (country) => {
  const request = axios.get(`${baseUrl}/weather?q=${country}&APPID=${secret}`);
  return request.then((response) => response.data);
};

export default { getWeather };
