import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import teamReducer from './slices/teamSlice'; // Ensure this path matches your actual file structure
import playerReducer from './slices/playerSlice'; // Ensure this matches if you have one

// 1. Helper to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('pitchMasterState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// 2. Helper to save state
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('pitchMasterState', serializedState);
  } catch {
    // ignore write errors
  }
};

// 3. Load the persisted state
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    // Add other reducers if you have them, e.g., players: playerReducer
  },
  preloadedState, // <--- This restores your data on refresh
});

// 4. Subscribe to store updates (Auto-Save)
store.subscribe(() => {
  saveState({
    // We save the 'team' slice so your squad persists
    team: store.getState().team, 
    // We save 'auth' so you stay logged in
    auth: store.getState().auth
  });
});

export default store;