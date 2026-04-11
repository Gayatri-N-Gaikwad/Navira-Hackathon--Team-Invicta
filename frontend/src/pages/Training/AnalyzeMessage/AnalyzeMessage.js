import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trainingAPI } from '../../../api/training';
import './AnalyzeMessage.css';

const AnalyzeMessage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!message.trim()) {
      setError('Please enter a message to analyze');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setAnalysis(null);
      
      const response = await trainingAPI.analyzeMessage(message.trim());
      setAnalysis(response.data);
    } catch (err) {
      setError('Failed to analyze message. Please try again.');
      console.error('Error analyzing message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const resetAnalysis = () => {
    setMessage('');
    setAnalysis(null);
    setError(null);
  };

  const goToTraining = () => {
    navigate('/training');
  };

  const getRiskLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return '#22c55e';
      case 'medium':
        return '#f59e0b';
      case 'high':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getRiskLevelIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return '🛡️';
      case 'medium':
        return '⚠️';
      case 'high':
        return '🚨';
      default:
        return '❓';
    }
  };

  return (
    <div className="analyze-message">
      <div className="analyze-container">
        <div className="analyze-header">
          <button onClick={() => navigate('/training')} className="back-btn">
            ← Back
          </button>
          <h1>Analyze My Message</h1>
          <p>Check if a message is suspicious with AI analysis</p>
        </div>

        <div className="message-input-section">
          <div className="input-container">
            <label htmlFor="message-input">Paste the suspicious message here:</label>
            <textarea
              id="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Copy and paste the message you want to analyze..."
              className="message-textarea"
              disabled={loading}
            />
            <div className="input-actions">
              <button
                onClick={handleAnalyze}
                disabled={loading || !message.trim()}
                className="analyze-btn"
              >
                {loading ? 'Analyzing...' : 'Analyze Message'}
              </button>
              {message && (
                <button onClick={resetAnalysis} className="clear-btn">
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {analysis && (
          <div className="analysis-results">
            <div className="risk-assessment">
              <div 
                className="risk-badge"
                style={{ 
                  backgroundColor: getRiskLevelColor(analysis.riskLevel),
                  color: 'white'
                }}
              >
                <span className="risk-icon">{getRiskLevelIcon(analysis.riskLevel)}</span>
                <span className="risk-text">Risk Level: {analysis.riskLevel}</span>
              </div>
            </div>

            <div className="analysis-details">
              {analysis.explanation && (
                <div className="analysis-section">
                  <h3>Analysis</h3>
                  <p>{analysis.explanation}</p>
                </div>
              )}

              {analysis.indicators && analysis.indicators.length > 0 && (
                <div className="analysis-section">
                  <h3>Suspicious Indicators</h3>
                  <div className="indicators-list">
                    {analysis.indicators.map((indicator, index) => (
                      <div key={index} className="indicator-item">
                        <span className="indicator-icon">🔍</span>
                        <span>{indicator}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.recommendations && analysis.recommendations.length > 0 && (
                <div className="analysis-section">
                  <h3>Recommendations</h3>
                  <div className="recommendations-list">
                    {analysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="recommendation-item">
                        <span className="recommendation-icon">✓</span>
                        <span>{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.verdict && (
                <div className="analysis-section verdict">
                  <h3>Verdict</h3>
                  <p className="verdict-text">{analysis.verdict}</p>
                </div>
              )}
            </div>

            <div className="analysis-actions">
              <button onClick={resetAnalysis} className="new-analysis-btn">
                Analyze Another Message
              </button>
              <button onClick={goToTraining} className="training-btn">
                Practice Detection Skills
              </button>
            </div>
          </div>
        )}

        <div className="help-tips">
          <h3>💡 Tips for Using This Tool</h3>
          <ul>
            <li>Copy the complete message, including sender information if available</li>
            <li>Include any links, phone numbers, or email addresses mentioned</li>
            <li>Pay attention to urgency, threats, or requests for personal information</li>
            <li>Trust your instincts - if something feels wrong, it probably is</li>
            <li>This tool helps identify patterns but always verify independently</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeMessage;
