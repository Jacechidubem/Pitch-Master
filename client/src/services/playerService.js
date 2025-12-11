import axios from 'axios';
import { API_URL } from '../config';

const PLAYER_URL = `${API_URL}/players/`;

// Get players (with optional search)
const getPlayers = async (searchTerm = '') => {
  const response = await axios.get(PLAYER_URL + '?search=' + searchTerm);
  return response.data;
};

const playerService = {
  getPlayers,
};

export default playerService;