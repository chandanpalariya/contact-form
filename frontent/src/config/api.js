const API_URL = import.meta.env.VITE_API_URL || "https://contact-form1-l5qc.onrender.com/";

export const apiConfig = {
  baseURL: API_URL,
  endpoints: {
    contacts: '/api/contacts'
  }
};

export default API_URL;

