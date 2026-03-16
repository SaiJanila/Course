import axios from 'axios';

// Change the baseURL if your backend runs on a different port
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export default api;

