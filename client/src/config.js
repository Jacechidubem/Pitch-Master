// Automatically switches API URL based on where the app is running
const isProduction = import.meta.env.MODE === 'production';

export const API_URL = isProduction 
  ? 'https://pitch-master.onrender.com/api'  // <--- YOUR RENDER BACKEND URL
  : 'http://localhost:5000/api';             // Localhost for development

export default API_URL;