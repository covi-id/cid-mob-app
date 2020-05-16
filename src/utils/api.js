import axios from 'axios';
import { API_URL, API_KEY } from '../../env.json';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-api-key': API_KEY,
  },
});

export function setAuthentication(token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default api;
