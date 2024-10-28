import axios from "axios";
import { ACCESS_TOKEN } from "./constants"

 export const apiUrl =  " https://react-backend-delta.vercel.app/" 


 export const imageUrl = 'https://res.cloudinary.com/db92abhgl/'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  
export default api;