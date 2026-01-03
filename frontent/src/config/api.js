const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiConfig = {
  baseURL: API_URL,
  endpoints: {
    contacts: '/api/contacts'
  }
};

export default API_URL;

