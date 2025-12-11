import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import teamReducer from './slices/teamSlice'; // Commented out until file exists
// import playerReducer from './slices/playerSlice'; // Commented out until file exists

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

// 3. Load persisted state
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    // team: teamReducer, // Commented out
    // players: playerReducer // Commented out
  },
  preloadedState,
});

// 4. Subscribe to store updates (Auto-Save)
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    // team: store.getState().team // Commented out
  });
});

export default store;