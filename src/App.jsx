// src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Clubs from './pages/Clubs';
import MapPage from './pages/Map';
import HiddenPage from './pages/HiddenPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/hiddenpage" element={<HiddenPage />} />
          {/* Add more routes here as we migrate */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
