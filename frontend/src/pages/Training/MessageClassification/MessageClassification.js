import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trainingAPI } from '../../../api/training';
import './MessageClassification.css';

const MessageClassification = () => {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [round, setRound] = useState(1);
  const [error, setError] = useState(null);

  const totalRounds = 5;

  useEffect(() => {
    fetchNewMessage();
  }, []);

  const fetchNewMessage = async () => {
    try {
      setLoading(true);
      setError(null);
      setSelectedAnswer(null);
      setShowFeedback(false);
      
      const response = await trainingAPI.getRandomMessage();
      setCurrentMessage(response.data);
    } catch (err) {
      setError('Failed to load message. Please try again.');
      console.error('Error fetching message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const submitAnswer = async () => {
    if (!selectedAnswer || !currentMessage) return;

    try {
      setLoading(true);
      const response = await trainingAPI.checkAnswer(
        currentMessage.message,
        selectedAnswer
      );
      
      setFeedback(response.data);
      setShowFeedback(true);
      
      // Update score
      setScore(prev => ({
        correct: prev.correct + (response.data.correct ? 1 : 0),
        total: prev.total + 1
      }));
    } catch (err) {
      setError('Failed to check answer. Please try again.');
      console.error('Error checking answer:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextRound = () => {
    if (round >= totalRounds) {
      navigate('/training/complete', { 
        state: { score, type: 'classification' } 
      });
    } else {
      setRound(round + 1);
      fetchNewMessage();
    }
  };

  
  if (loading && !currentMessage) {
    return (
      <div className="message-classification loading">
        <div className="loading-spinner"></div>
        <p>Loading training message...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="message-classification error">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchNewMessage} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="message-classification">
      <div className="training-header">
        <button onClick={() => navigate('/training')} className="back-btn">
          ← Back
        </button>
        <div className="progress-info">
          <span>Round {round} of {totalRounds}</span>
          <div className="score-display">
            Score: {score.correct}/{score.total}
          </div>
        </div>
      </div>

      <div className="phone-container">
        <div className="phone-header">
          <div className="phone-notch"></div>
          <span className="time">9:41 AM</span>
        </div>

        <div className="message-content">
          <div className="sender-info">
            <span className="sender-name">{currentMessage?.sender || 'Unknown'}</span>
            <span className="message-time">Just now</span>
          </div>
          
          <div className="message-bubble">
            {currentMessage?.message}
          </div>
        </div>

        {!showFeedback ? (
          <div className="answer-section">
            <h3>Is this message legitimate or a scam?</h3>
            <div className="answer-options">
              {['Scam', 'Legitimate', 'Not Sure'].map((option) => (
                <button
                  key={option}
                  className={`answer-btn ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={loading}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <button
              className="submit-btn"
              onClick={submitAnswer}
              disabled={!selectedAnswer || loading}
            >
              {loading ? 'Checking...' : 'Submit Answer'}
            </button>
          </div>
        ) : (
          <div className="feedback-section">
            <div className={`feedback-result ${feedback?.correct ? 'correct' : 'incorrect'}`}>
              <div className="result-icon">
                {feedback?.correct ? '✅' : '❌'}
              </div>
              <h3>{feedback?.correct ? 'Correct!' : 'Not quite right'}</h3>
            </div>

            <div className="feedback-details">
              <div className="explanation">
                <h4>Explanation:</h4>
                <p>{feedback?.explanation}</p>
              </div>

              {feedback?.indicators && feedback.indicators.length > 0 && (
                <div className="indicators">
                  <h4>Red Flags:</h4>
                  <ul>
                    {feedback.indicators.map((indicator, index) => (
                      <li key={index}>{indicator}</li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback?.betterResponse && (
                <div className="better-response">
                  <h4>Better Response:</h4>
                  <p>{feedback.betterResponse}</p>
                </div>
              )}
            </div>

            <button
              className="next-btn"
              onClick={nextRound}
            >
              {round >= totalRounds ? 'Complete Training' : 'Next Round'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageClassification;
