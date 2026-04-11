import React from "react";
import { Link } from "react-router-dom";
import "./ScamHome.css";

export default function ScamHome() {
  return (
    <div className="scam-home-page">

      {/* Page Header */}
      <div className="page-header">
        <div className="header-icon">
          🛡️
        </div>
        <div className="header-content">
          <h1>Scam Awareness Trainer</h1>
          <p>Learn to identify and protect yourself from various types of scams through interactive training modules</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        
        {/* Chat Simulator Feature */}
        <div className="feature-card">
          <div className="feature-icon">
            💬
          </div>
          <h3 className="feature-title">Chat Simulator</h3>
          <p className="feature-description">
            Practice handling real scam conversations with AI-powered chat simulations. Learn to recognize red flags in real-time conversations.
          </p>
          <div className="tooltip-wrapper">
            <Link to="/scam-ai/chat" className="feature-button">
              <span>Start Scam Chat</span>
              <span className="tooltip">Practice with realistic scam conversations</span>
            </Link>
          </div>
        </div>

        {/* Quiz Feature */}
        <div className="feature-card">
          <div className="feature-icon">
            📝
          </div>
          <h3 className="feature-title">Scam Quiz</h3>
          <p className="feature-description">
            Test your knowledge with interactive quizzes covering various scam types. Learn to identify suspicious patterns quickly.
          </p>
          <div className="tooltip-wrapper">
            <Link to="/scam-ai/quiz" className="feature-button">
              <span>Take Quiz</span>
              <span className="tooltip">Test your scam detection skills</span>
            </Link>
          </div>
        </div>

        {/* Message Analysis Feature */}
        <div className="feature-card">
          <div className="feature-icon">
            🔍
          </div>
          <h3 className="feature-title">Message Analysis</h3>
          <p className="feature-description">
            Analyze suspicious messages instantly with AI-powered detection. Get detailed risk assessments and safety recommendations.
          </p>
          <div className="tooltip-wrapper">
            <Link to="/scam-ai/analyze" className="feature-button">
              <span>Analyze Message</span>
              <span className="tooltip">Check if a message is suspicious</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Safety Tips Section */}
      <div className="safety-tips">
        <h3>
          <span className="tip-icon">⚠️</span>
          Important Safety Tips
        </h3>
        <div className="tips-grid">
          <div className="tip-card">
            <p><strong>Never share</strong> OTPs, PINs, or passwords with anyone</p>
          </div>
          <div className="tip-card">
            <p><strong>Verify identity</strong> before sharing personal information</p>
          </div>
          <div className="tip-card">
            <p><strong>Be suspicious</strong> of urgent requests and threats</p>
          </div>
          <div className="tip-card">
            <p><strong>Think twice</strong> before clicking unknown links</p>
          </div>
        </div>
      </div>

    </div>
  );
}