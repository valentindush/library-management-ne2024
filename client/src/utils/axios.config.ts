import axios from 'axios'
const API_URL = 'http://localhost:3000/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export default axiosInstance;