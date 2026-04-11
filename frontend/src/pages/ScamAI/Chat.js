import React, { useEffect, useState, useRef } from "react";
import { startChat, sendMessage } from "../../api/api";
import "./Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [scenario, setScenario] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const initChat = async () => {
    try {
      const res = await startChat();
      setScenario(res.data.scenario);
      setMessages([
        {
          text: res.data.message,
          sender: "scammer",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()
        }
      ]);
      setOptions(res.data.options);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const handleClick = async (opt) => {
    const userMsg = {
      text: opt.text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const newHistory = [...history, userMsg];
      const res = await sendMessage({
        scenario,
        history: newHistory,
        message: opt.text
      });

      const scamMsg = {
        text: res.data.reply,
        sender: "scammer",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()
      };

      setMessages(prev => [...prev, scamMsg]);
      setOptions(res.data.options || []);
      setHistory([...newHistory, scamMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (message, index) => {
    const isUser = message.sender === "user";
    return (
      <div key={index} className={`message-wrapper ${isUser ? 'user-wrapper' : 'scammer-wrapper'}`}>
        <div className={`bubble ${message.sender}`}>
          <p>{message.text}</p>
          <div className="message-info">
            <span className="timestamp">{message.timestamp}</span>
            {isUser && <span className="status">✓✓</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-info">
          <div className="contact-avatar">
            {/* Placeholder for Profile Icon */}
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div className="contact-details">
            <h3>Scam Bot</h3>
            <p className="status-text">Online</p>
          </div>
        </div>
        <div className="header-actions">
          <span className="chat-status">Scam Simulation</span>
        </div>
      </div>

      <div ref={chatBoxRef} className="chat-box">
        {messages.map((m, i) => formatMessage(m, i))}
        
        {loading && (
          <div className="message-wrapper scammer-wrapper">
            <div className="bubble scammer">
              <p>Typing...</p>
            </div>
          </div>
        )}
      </div>

      <div className="options">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`option ${opt.type || ''}`}
            onClick={() => handleClick(opt)}
            disabled={loading}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}