import axios from 'axios';
import { config } from '../config';

export const publicClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
