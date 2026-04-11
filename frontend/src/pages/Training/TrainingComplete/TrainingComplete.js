import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TrainingComplete.css';

const TrainingComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, type } = location.state || { score: { correct: 0, total: 0 }, type: 'classification' };

  const calculateRiskLevel = () => {
    const percentage = score.total > 0 ? (score.correct / score.total) * 100 : 0;
    if (percentage >= 80) return { level: 'Low', color: '#22c55e', icon: '🛡️' };
    if (percentage >= 60) return { level: 'Medium', color: '#f59e0b', icon: '⚠️' };
    return { level: 'High', color: '#ef4444', icon: '🚨' };
  };

  const riskLevel = calculateRiskLevel();
  const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  const goToChatSimulator = () => {
    navigate('/training/chat');
  };

  const goToAnalysis = () => {
    navigate('/training/analyze');
  };

  const restartTraining = () => {
    navigate('/training/classification');
  };

  const goHome = () => {
    navigate('/training');
  };

  return (
    <div className="training-complete">
      <div className="completion-container">
        <div className="completion-header">
          <div className="completion-icon">🎉</div>
          <h1>Training Complete!</h1>
          <p>Great job completing the {type === 'classification' ? 'Message Classification' : 'Chat Simulator'} training</p>
        </div>

        <div className="score-section">
          <div className="score-display">
            <div className="score-circle">
              <span className="score-percentage">{percentage}%</span>
              <span className="score-label">Accuracy</span>
            </div>
            <div className="score-details">
              <p>Correct Answers: <strong>{score.correct}</strong></p>
              <p>Total Questions: <strong>{score.total}</strong></p>
            </div>
          </div>
        </div>

        <div className="risk-section">
          <div className={`risk-card ${riskLevel.level.toLowerCase()}`}>
            <div className="risk-icon">{riskLevel.icon}</div>
            <div className="risk-content">
              <h3>Risk Level: {riskLevel.level}</h3>
              <p>
                {riskLevel.level === 'Low' && 'Excellent! You have strong scam detection skills.'}
                {riskLevel.level === 'Medium' && 'Good job! Consider more practice to improve your skills.'}
                {riskLevel.level === 'High' && 'Keep practicing! Scam detection skills improve with experience.'}
              </p>
            </div>
          </div>
        </div>

        <div className="recommendations">
          <h3>Next Steps</h3>
          <div className="recommendation-cards">
            {type === 'classification' && (
              <div className="recommendation-card">
                <div className="card-icon">💬</div>
                <h4>Try Chat Simulator</h4>
                <p>Practice handling real scam conversations</p>
                <button onClick={goToChatSimulator} className="card-btn">
                  Start Chat
                </button>
              </div>
            )}
            
            <div className="recommendation-card">
              <div className="card-icon">🔍</div>
              <h4>Analyze Messages</h4>
              <p>Check suspicious messages with AI analysis</p>
              <button onClick={goToAnalysis} className="card-btn">
                Analyze
              </button>
            </div>
            
            <div className="recommendation-card">
              <div className="card-icon">🔄</div>
              <h4>Practice Again</h4>
              <p>Improve your skills with more scenarios</p>
              <button onClick={restartTraining} className="card-btn">
                Restart
              </button>
            </div>
          </div>
        </div>

        <div className="safety-tips">
          <h3>🛡️ Safety Reminders</h3>
          <ul>
            <li>Never share personal information with unknown contacts</li>
            <li>Verify identity before sending money or sharing details</li>
            <li>Be suspicious of urgent requests and high-pressure tactics</li>
            <li>Trust your instincts - if something feels wrong, it probably is</li>
            <li>Report suspicious messages to authorities</li>
          </ul>
        </div>

        <div className="completion-actions">
          <button onClick={goHome} className="home-btn">
            Back to Training Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingComplete;
