import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd'; 
import { TouchBackend } from 'react-dnd-touch-backend'; 
import { ToastContainer } from 'react-toastify'; // <--- IMPORT THIS
import 'react-toastify/dist/ReactToastify.css'; // <--- IMPORT CSS

// 1. Import Toastify and its CSS


// Pages
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTeam from './pages/CreateTeam';
import Dashboard from './pages/Dashboard';
import CompareTeams from './pages/CompareTeams';
import Players from './pages/Players';
import InfoPage from './pages/InfoPage';
import Developer from './pages/Developer';
import Verify from './pages/Verify';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  // Config to support BOTH Mouse (Desktop) and Touch (Mobile)
  const backendOptions = {
    enableMouseEvents: true,
    enableTouchEvents: true,
    delayTouchStart: 200,    // <--- CRITICAL FIX: Wait 200ms before dragging (Allows scrolling!)
    ignoreContextMenu: true, // Prevent right-click/long-press menu from appearing
  };

  return (
    // Wrap the entire app in the DndProvider
    <DndProvider backend={TouchBackend} options={backendOptions}>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Router>
        
      

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/players" element={<Players />} /> 
          <Route path="/info/:type" element={<InfoPage />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/verify/:token" element={<Verify />} />

          {/* Private Routes (Must be logged in) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/create-team" element={<CreateTeam />} />
            <Route path="/edit-team/:id" element={<CreateTeam />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compare" element={<CompareTeams />} />
          </Route>
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;