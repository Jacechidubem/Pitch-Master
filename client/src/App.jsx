import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTeam from './pages/CreateTeam';
import Dashboard from './pages/Dashboard';
import CompareTeams from './pages/CompareTeams'; // Ensure this exists!
import Players from './pages/Players'; // New Page
import InfoPage from './pages/InfoPage';
import Developer from './pages/Developer';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/players" element={<Players />} /> {/* Public access allowed */}
        <Route path="/info/:type" element={<InfoPage />} />
        <Route path="/developer" element={<Developer />} />

        {/* Private Routes (Must be logged in) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/edit-team/:id" element={<CreateTeam />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compare" element={<CompareTeams />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;