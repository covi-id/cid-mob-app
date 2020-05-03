import axios from 'axios';

const api = axios.create({
  baseURL: 'server url here',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export function setAuthentication(token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default api;
