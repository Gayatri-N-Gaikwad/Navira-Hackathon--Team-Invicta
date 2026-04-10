import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProgressProvider } from './context/ProgressContext';
import { VoiceProvider } from './context/VoiceContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Sandbox from './pages/Sandbox/Sandbox';
import BankingTraining from './pages/BankingTraining/BankingTraining';
import GovernmentTraining from './pages/GovernmentTraining/GovernmentTraining';
import Quiz from './pages/Quiz/Quiz';
import About from './pages/About/About';
import Dashboard from './pages/Dashboard/Dashboard';
import Badges from './pages/Badges/Badges';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading GuardianSathi...</p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <ProgressProvider>
          <VoiceProvider>
            <Router>
              <div className="app">
                <Routes>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="sandbox" element={<Sandbox />} />
                    <Route path="sandbox/banking" element={<BankingTraining />} />
                    <Route path="sandbox/government" element={<GovernmentTraining />} />
                    <Route path="quiz" element={<Quiz />} />
                    <Route path="about" element={<About />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="badges" element={<Badges />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </Router>
          </VoiceProvider>
        </ProgressProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
