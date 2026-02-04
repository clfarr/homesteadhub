import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuestionDetail from './pages/QuestionDetail';
import NewQuestion from './pages/NewQuestion';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/question/new" element={<NewQuestion />} />
          <Route path="/question/:id" element={<QuestionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;