import axios from 'axios';
import { API_URL } from '../config'; // Import the dynamic URL

// Define the specific endpoint for teams
const TEAM_URL = `${API_URL}/teams/`;

// Create new team
const createTeam = async (teamData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(TEAM_URL, teamData, config);
  return response.data;
};

// Get user's teams
const getMyTeams = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(TEAM_URL, config);
  return response.data;
};

// Get single team (for editing)
const getTeamById = async (id, token) => {
  const config = { 
    headers: { Authorization: `Bearer ${token}` } 
  };
  const response = await axios.get(TEAM_URL + id, config);
  return response.data;
};

// Update team
const updateTeam = async (id, teamData, token) => {
  const config = { 
    headers: { Authorization: `Bearer ${token}` } 
  };
  const response = await axios.put(TEAM_URL + id, teamData, config);
  return response.data;
};

// Delete team
const deleteTeam = async (teamId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(TEAM_URL + teamId, config);
  return response.data;
};

const teamService = {
  createTeam,
  getMyTeams,
  deleteTeam,
  getTeamById,
  updateTeam,
};

export default teamService;