import axios from 'axios';

const api = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: api,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  
  console.log(`Api url ${api}`)
  export default apiClient;