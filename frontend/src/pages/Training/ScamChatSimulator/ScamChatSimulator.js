import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { trainingAPI } from '../../../api/training';
import './ScamChatSimulator.css';

const ScamChatSimulator = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const maxMessages = 10;

  useEffect(() => {
    startChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startChat = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await trainingAPI.startScamChat();
      const data = response.data;
      
      setSessionId(data.sessionId);
      setScenario(data.scenario);
      setMessages([{
        id: 1,
        text: data.message,
        sender: 'scammer',
        timestamp: new Date()
      }]);
      setUserOptions(data.options || []);
      setMessageCount(1);
    } catch (err) {
      setError('Failed to start chat simulation. Please try again.');
      console.error('Error starting chat:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectOption = async (option) => {
    if (sendingMessage || chatEnded) return;

    try {
      setSendingMessage(true);
      
      // Add user message
      const userMessage = {
        id: messages.length + 1,
        text: option.text,
        sender: 'user',
        timestamp: new Date(),
        type: option.type
      };
      
      setMessages(prev => [...prev, userMessage]);
      setUserOptions([]);
      
      const newMessageCount = messageCount + 1;
      setMessageCount(newMessageCount);
      
      // Check if chat should end
      if (newMessageCount >= maxMessages || option.type === 'safe') {
        setChatEnded(true);
        return;
      }
      
      // Get AI response
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
      
      const response = await trainingAPI.continueChat(
        scenario,
        history,
        option.text
      );
      
      const aiMessage = {
        id: messages.length + 2,
        text: response.data.reply,
        sender: 'scammer',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setUserOptions(response.data.options || []);
      
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setSendingMessage(false);
    }
  };

  const restartChat = () => {
    setSessionId(null);
    setScenario(null);
    setMessages([]);
    setUserOptions([]);
    setChatEnded(false);
    setMessageCount(0);
    startChat();
  };

  const goToAnalysis = () => {
    navigate('/training/analyze');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (loading) {
    return (
      <div className="scam-chat-simulator loading">
        <div className="loading-spinner"></div>
        <p>Starting chat simulation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="scam-chat-simulator error">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={restartChat} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="scam-chat-simulator">
      <div className="chat-container">
        <div className="chat-header">
          <button onClick={() => navigate('/training')} className="back-btn">
            ← Back
          </button>
          <div className="chat-info">
            <div className="contact-info">
              <div className="contact-avatar">👤</div>
              <div className="contact-details">
                <h3>Unknown Number</h3>
                <p className="status-text">Online</p>
              </div>
            </div>
            <div className="chat-status">
              {chatEnded ? 'Chat Ended' : `Messages: ${messageCount}/${maxMessages}`}
            </div>
          </div>
        </div>

        <div className="chat-messages">
          <div className="date-separator">
            Today
          </div>
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'scammer-message'}`}
            >
              <div className="message-bubble">
                <p>{message.text}</p>
                <span className="message-time">
                  {formatTime(message.timestamp)}
                  {message.sender === 'user' && message.type && (
                    <span className={`message-type ${message.type}`}>
                      {message.type === 'safe' ? '🛡️ Safe' : 
                       message.type === 'risky' ? '⚠️ Risky' : '❓ Neutral'}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}

          {sendingMessage && (
            <div className="message scammer-message">
              <div className="message-bubble typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {chatEnded ? (
          <div className="chat-ended">
            <div className="ended-message">
              <h3>Chat Complete!</h3>
              <p>
                {messageCount >= maxMessages 
                  ? "You've reached the maximum number of messages."
                  : "Good job! You detected the scam and ended the conversation safely."}
              </p>
              <div className="ended-actions">
                <button onClick={restartChat} className="restart-btn">
                  Try Another Scenario
                </button>
                <button onClick={goToAnalysis} className="analyze-btn">
                  Analyze Messages
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="message-options">
            {userOptions.length > 0 && !sendingMessage && (
              <div className="options-container">
                <p className="options-label">Choose your response:</p>
                <div className="options-grid">
                  {userOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`option-btn ${option.type}`}
                      onClick={() => selectOption(option)}
                      disabled={sendingMessage}
                    >
                      {option.text}
                      <span className="option-indicator">
                        {option.type === 'safe' ? '🛡️' : 
                         option.type === 'risky' ? '⚠️' : '❓'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScamChatSimulator;
