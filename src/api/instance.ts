import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://housing-hub-back.onrender.com',
});
