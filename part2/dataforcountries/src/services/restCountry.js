import axios from "axios";

const baseUrl = import.meta.env.VITE_API_COUNTRY;

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`);
  return request.then((response) => response.data);
};

const getOne = (country) => {
  const request = axios.get(`${baseUrl}/api/name/${country}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  getOne,
};
