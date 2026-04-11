import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ProgressProvider } from "./context/ProgressContext";
import { VoiceProvider } from "./context/VoiceContext";

import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home/Home";
import Sandbox from "./pages/Sandbox/Sandbox";
import BankingTraining from "./pages/BankingTraining/BankingTraining";
import GovernmentTraining from "./pages/GovernmentTraining/GovernmentTraining";
import Quiz from "./pages/Quiz/Quiz";
import About from "./pages/About/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import Badges from "./pages/Badges/Badges";
import DeepfakeTraining from "./pages/DeepfakeTraining/DeepfakeTraining";
import GovernmentSchemeTraining from "./pages/GovernmentSchemeTraining/GovernmentSchemeTraining";
import DigiLockerTraining from "./pages/DigiLockerTraining/DigiLockerTraining";
import MobileRechargeTraining from "./pages/MobileRechargeTraining/MobileRechargeTraining";

// Training Module
import TrainingLanding from "./pages/Training/TrainingLanding/TrainingLanding";
import MessageClassification from "./pages/Training/MessageClassification/MessageClassification";
import ScamChatSimulator from "./pages/Training/ScamChatSimulator/ScamChatSimulator";
import TrainingComplete from "./pages/Training/TrainingComplete/TrainingComplete";
import AnalyzeMessage from "./pages/Training/AnalyzeMessage/AnalyzeMessage";
import TestUI from "./pages/Training/TestUI/TestUI";

import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";

import "./App.css";
import "./styles/themes.css";

// Scam pages

import ScamHome from "./pages/ScamAI/ScamHome";
import Chat from "./pages/ScamAI/Chat";
import ScamQuiz from "./pages/ScamAI/ScamQuiz";
import Analyzer from "./pages/ScamAI/Analyzer";

// import "./styles.css";

// 🔹 Routes Component
function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  // ✅ Loading screen while checking token (/me API)
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading GuardianSathi...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Routes>
        {/* 🔹 Auth Routes */}
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        {/* 🔹 Main Layout */}
        <Route path="/" element={<Layout />}>
          {/* Public Pages */}
          <Route index element={<Home />} />
          <Route path="sandbox" element={<Sandbox />} />
          <Route path="sandbox/banking" element={<BankingTraining />} />
          <Route path="sandbox/government" element={<GovernmentTraining />} />
          <Route path="sandbox/deepfake" element={<DeepfakeTraining />} />
          <Route
            path="sandbox/government-scheme"
            element={<GovernmentSchemeTraining />}
          />
          <Route path="sandbox/digilocker" element={<DigiLockerTraining />} />
          <Route
            path="sandbox/mobile-recharge"
            element={<MobileRechargeTraining />}
          />
          <Route path="about" element={<About />} />

          {/* Training Module - Public */}
          <Route path="training" element={<TrainingLanding />} />
          <Route
            path="training/classification"
            element={<MessageClassification />}
          />
          <Route path="training/chat" element={<ScamChatSimulator />} />
          <Route path="training/complete" element={<TrainingComplete />} />
          <Route path="training/analyze" element={<AnalyzeMessage />} />
          <Route path="training/test" element={<TestUI />} />

          {/* 🔒 Protected Pages */}
          <Route
            path="quiz"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="badges"
            element={
              <ProtectedRoute>
                <Badges />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 🔹 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* Scam AI Training */}
        <Route path="scam-ai" element={<ScamHome />} />
        <Route path="scam-ai/chat" element={<Chat />} />
        <Route path="scam-ai/quiz" element={<ScamQuiz />} />
        <Route path="scam-ai/analyze" element={<Analyzer />} />
        
      </Routes>
    </div>
  );
}

// 🔹 Main App
function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ProgressProvider>
          <VoiceProvider>
            <Router>
              <AppRoutes />
            </Router>
          </VoiceProvider>
        </ProgressProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
