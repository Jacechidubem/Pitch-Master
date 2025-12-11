// Universal Fix: This checks the browser URL directly
// It works on Vite, Webpack, Create-React-App, and everything else.

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_URL = isLocalhost 
  ? 'http://localhost:5000/api'            // If URL is localhost, use local backend
  : 'https://pitch-master.onrender.com/api'; // Otherwise, use Render backend

export default API_URL;