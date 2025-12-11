import axios from 'axios';
import { API_URL } from '../config'; 

// We add '/users/' here so we don't have to type it every time
const AUTH_URL = `${API_URL}/users/`;

// Register user
const register = async (userData) => {
  // USE AUTH_URL HERE (Not API_URL)
  const response = await axios.post(AUTH_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  // USE AUTH_URL HERE (Not API_URL)
  const response = await axios.post(AUTH_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;