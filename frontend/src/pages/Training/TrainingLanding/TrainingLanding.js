import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainingLanding.css';

const TrainingLanding = () => {
  const navigate = useNavigate();

  const startTraining = () => {
    navigate('/training/classification');
  };

  return (
    <div className="training-landing">
      <div className="training-container">
        <div className="training-main">
          <div className="main-card">
            <h1 className="training-title">Scam Detection Training</h1>
            <p className="training-subtitle">
              Learn to spot scams through realistic simulations
            </p>
          </div>
        </div>

        <div className="training-features">
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Message Classification</h3>
            <p>Identify scam vs legitimate messages</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Chat Simulator</h3>
            <p>Practice handling real scam conversations</p>
          </div>
        </div>

        <div className="training-actions">
          <button 
            className="start-training-btn"
            onClick={startTraining}
          >
            Start Training
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingLanding;
