import axios from 'axios';

const api = axios.create({
   baseURL: 'https://tbd/api/v1',
   headers: {
      'Content-Type': 'application/json; charset=utf-8',
   },
   log: console,
});

export function setAuthentication(token) {
   api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default api;
