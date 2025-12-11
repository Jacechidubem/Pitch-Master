import axios from 'axios';

const API_URL = 'http://localhost:5000/api/teams/';

// Create new team
const createTeam = async (teamData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL, teamData, config);
  return response.data;
};

// Get user's teams
const getMyTeams = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete team
const deleteTeam = async (teamId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(API_URL + teamId, config);
  return response.data;
};

// Get single team
const getTeamById = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Update team
const updateTeam = async (id, teamData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(API_URL + id, teamData, config);
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