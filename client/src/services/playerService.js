import axios from 'axios';

const API_URL = 'http://localhost:5000/api/players';

// Fetch players (with optional search query)
const getPlayers = async (searchQuery = '') => {
  const response = await axios.get(`${API_URL}?search=${searchQuery}`);
  return response.data;
};

const playerService = {
  getPlayers,
};

export default playerService;