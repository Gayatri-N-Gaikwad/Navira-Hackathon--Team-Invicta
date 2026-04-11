import React, { useState } from 'react';
import './TestUI.css';

const TestUI = () => {
  const [activeTest, setActiveTest] = useState('landing');

  const renderTestContent = () => {
    switch(activeTest) {
      case 'landing':
        return <TestLanding />;
      case 'classification':
        return <TestClassification />;
      case 'chat':
        return <TestChat />;
      case 'complete':
        return <TestComplete />;
      case 'analyze':
        return <TestAnalyze />;
      default:
        return <TestLanding />;
    }
  };

  return (
    <div className="test-ui">
      <div className="test-nav">
        <h2>Training Platform Test UI</h2>
        <div className="test-buttons">
          <button onClick={() => setActiveTest('landing')} className={activeTest === 'landing' ? 'active' : ''}>
            Landing Page
          </button>
          <button onClick={() => setActiveTest('classification')} className={activeTest === 'classification' ? 'active' : ''}>
            Message Classification
          </button>
          <button onClick={() => setActiveTest('chat')} className={activeTest === 'chat' ? 'active' : ''}>
            Chat Simulator
          </button>
          <button onClick={() => setActiveTest('complete')} className={activeTest === 'complete' ? 'active' : ''}>
            Completion Screen
          </button>
          <button onClick={() => setActiveTest('analyze')} className={activeTest === 'analyze' ? 'active' : ''}>
            Analyze Message
          </button>
        </div>
      </div>
      
      <div className="test-content">
        {renderTestContent()}
      </div>
    </div>
  );
};

// Test Landing Page Component
const TestLanding = () => {
  return (
    <div className="test-landing">
      <div className="training-container">
        <div className="training-header">
          <h1 className="training-title">Scam Detection Training</h1>
          <p className="training-subtitle">
            Learn to spot scams through realistic simulations
          </p>
        </div>

        <div className="training-features">
          <div className="feature-card">
            <div className="feature-icon">???</div>
            <h3>Message Classification</h3>
            <p>Identify scam vs legitimate messages</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">???</div>
            <h3>Chat Simulator</h3>
            <p>Practice handling real scam conversations</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">???</div>
            <h3>Safety Tips</h3>
            <p>Learn red flags and protection strategies</p>
          </div>
        </div>

        <button className="start-training-btn">
          Start Training
        </button>

        <div className="training-info">
          <p>?? 10-15 minutes</p>
          <p>?? Mobile-friendly</p>
          <p>?? Interactive learning</p>
        </div>
      </div>
    </div>
  );
};

// Test Message Classification Component
const TestClassification = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const mockMessage = {
    sender: "Bank of India",
    message: "URGENT: Your account has been suspended. Click here to verify your details immediately: bit.ly/verify-now",
    type: "scam"
  };

  const mockFeedback = {
    correct: true,
    explanation: "This is a scam message. Banks never ask for urgent verification via suspicious links.",
    indicators: [
      "Creates false urgency with 'URGENT'",
      "Uses suspicious short link (bit.ly)",
      "Claims account suspension without prior notice"
    ],
    betterResponse: "Never click on suspicious links. Contact your bank directly through official channels."
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  return (
    <div className="test-classification">
      <div className="training-header">
        <div className="progress-info">
          <span>Round 1 of 5</span>
          <div className="score-display">
            Score: 0/0
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
            <span className="sender-name">{mockMessage.sender}</span>
            <span className="message-time">Just now</span>
          </div>
          
          <div className="message-bubble">
            {mockMessage.message}
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
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="feedback-section">
            <div className={`feedback-result ${mockFeedback.correct ? 'correct' : 'incorrect'}`}>
              <div className="result-icon">
                {mockFeedback.correct ? '??' : '??'}
              </div>
              <h3>{mockFeedback.correct ? 'Correct!' : 'Not quite right'}</h3>
            </div>

            <div className="feedback-details">
              <div className="explanation">
                <h4>Explanation:</h4>
                <p>{mockFeedback.explanation}</p>
              </div>

              <div className="indicators">
                <h4>Red Flags:</h4>
                <ul>
                  {mockFeedback.indicators.map((indicator, index) => (
                    <li key={index}>{indicator}</li>
                  ))}
                </ul>
              </div>

              <div className="better-response">
                <h4>Better Response:</h4>
                <p>{mockFeedback.betterResponse}</p>
              </div>
            </div>

            <button className="next-btn">
              Next Round
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Test Chat Simulator Component
const TestChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm calling from Microsoft Support. We've detected a virus on your computer.", sender: 'scammer', timestamp: new Date() }
  ]);
  const [selectedOption, setSelectedOption] = useState(null);

  const mockOptions = [
    { text: "Oh no! What should I do?", type: 'risky' },
    { text: "I didn't request any support. Please provide your employee ID.", type: 'neutral' },
    { text: "I don't believe you. Microsoft doesn't make unsolicited calls.", type: 'safe' }
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const userMessage = {
      id: messages.length + 1,
      text: option.text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
  };

  return (
    <div className="test-chat">
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-info">
            <div className="contact-info">
              <div className="contact-avatar">??</div>
              <div className="contact-details">
                <h3>Unknown Number</h3>
                <p className="status-text">Online</p>
              </div>
            </div>
            <div className="chat-status">
              Messages: 1/10
            </div>
          </div>
        </div>

        <div className="chat-messages">
          <div className="date-separator">Today</div>
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'scammer-message'}`}
            >
              <div className="message-bubble">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                  {message.sender === 'user' && selectedOption && (
                    <span className={`message-type ${selectedOption.type}`}>
                      {selectedOption.type === 'safe' ? '?? Safe' : 
                       selectedOption.type === 'risky' ? '?? Risky' : '?? Neutral'}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}

          <div className="message-options">
            {!selectedOption && (
              <div className="options-container">
                <p className="options-label">Choose your response:</p>
                <div className="options-grid">
                  {mockOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`option-btn ${option.type}`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option.text}
                      <span className="option-indicator">
                        {option.type === 'safe' ? '??' : 
                         option.type === 'risky' ? '??' : '??'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Test Completion Component
const TestComplete = () => {
  const mockScore = { correct: 4, total: 5 };
  const percentage = Math.round((mockScore.correct / mockScore.total) * 100);

  return (
    <div className="test-complete">
      <div className="completion-container">
        <div className="completion-header">
          <div className="completion-icon">??</div>
          <h1>Training Complete!</h1>
          <p>Great job completing the Message Classification training</p>
        </div>

        <div className="score-section">
          <div className="score-display">
            <div className="score-circle">
              <span className="score-percentage">{percentage}%</span>
              <span className="score-label">Accuracy</span>
            </div>
            <div className="score-details">
              <p>Correct Answers: <strong>{mockScore.correct}</strong></p>
              <p>Total Questions: <strong>{mockScore.total}</strong></p>
            </div>
          </div>
        </div>

        <div className="risk-section">
          <div className="risk-card low">
            <div className="risk-icon">??</div>
            <div className="risk-content">
              <h3>Risk Level: Low</h3>
              <p>Excellent! You have strong scam detection skills.</p>
            </div>
          </div>
        </div>

        <div className="recommendations">
          <h3>Next Steps</h3>
          <div className="recommendation-cards">
            <div className="recommendation-card">
              <div className="card-icon">???</div>
              <h4>Try Chat Simulator</h4>
              <p>Practice handling real scam conversations</p>
              <button className="card-btn">Start Chat</button>
            </div>
            
            <div className="recommendation-card">
              <div className="card-icon">??</div>
              <h4>Analyze Messages</h4>
              <p>Check suspicious messages with AI analysis</p>
              <button className="card-btn">Analyze</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Test Analyze Component
const TestAnalyze = () => {
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const mockAnalysis = {
    riskLevel: "High",
    explanation: "This message contains multiple indicators of a phishing scam attempting to steal personal information.",
    indicators: [
      "Creates false urgency with 'immediate action required'",
      "Requests personal information via SMS",
      "Contains suspicious link shortener",
      "Poor grammar and spelling errors"
    ],
    recommendations: [
      "Never click on suspicious links in messages",
      "Verify directly with the supposed sender through official channels",
      "Report the message to your mobile carrier",
      "Block the sender number"
    ],
    verdict: "This is definitely a scam. Do not respond or click any links."
  };

  const handleAnalyze = () => {
    if (message.trim()) {
      setAnalysis(mockAnalysis);
    }
  };

  return (
    <div className="test-analyze">
      <div className="analyze-container">
        <div className="analyze-header">
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
              placeholder="Copy and paste the message you want to analyze..."
              className="message-textarea"
            />
            <div className="input-actions">
              <button
                onClick={handleAnalyze}
                disabled={!message.trim()}
                className="analyze-btn"
              >
                Analyze Message
              </button>
            </div>
          </div>
        </div>

        {analysis && (
          <div className="analysis-results">
            <div className="risk-assessment">
              <div className="risk-badge" style={{ backgroundColor: '#ef4444' }}>
                <span className="risk-icon">??</span>
                <span className="risk-text">Risk Level: {analysis.riskLevel}</span>
              </div>
            </div>

            <div className="analysis-details">
              <div className="analysis-section">
                <h3>Analysis</h3>
                <p>{analysis.explanation}</p>
              </div>

              <div className="analysis-section">
                <h3>Suspicious Indicators</h3>
                <div className="indicators-list">
                  {analysis.indicators.map((indicator, index) => (
                    <div key={index} className="indicator-item">
                      <span className="indicator-icon">??</span>
                      <span>{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analysis-section verdict">
                <h3>Verdict</h3>
                <p className="verdict-text">{analysis.verdict}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestUI;
