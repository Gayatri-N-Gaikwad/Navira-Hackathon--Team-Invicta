import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Smartphone, MessageSquare, Shield, AlertTriangle, CheckCircle, XCircle, Send, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageNotification from '../../components/PageNotification/PageNotification';
import './BankingTraining.css';

const BankingTraining = () => {
  const { isElderly } = useAuth();
  const navigate = useNavigate();

  // UPI App State
  const [upiStep, setUpiStep] = useState('phone'); // phone, otp, pin, success
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  // SMS State
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Bank', text: 'Welcome to SecureBank UPI services.', time: '10:00 AM', type: 'bank' }
  ]);

  // Training State
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [score, setScore] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState(''); // 'success', 'error', 'warning'
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Generate random OTP
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    return otp;
  };

  // Add SMS message
  const addMessage = useCallback((sender, text, type = 'unknown') => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender,
      text,
      time,
      type
    }]);
  }, []);

  // Handle Phone Submit
  const handlePhoneSubmit = () => {
    if (phoneNumber.length === 10) {
      const otp = generateOtp();
      setUpiStep('otp');
      
      // Send Bank OTP immediately
      setTimeout(() => {
        addMessage('SecureBank', `Your OTP to verify UPI set by user ${phoneNumber} is ${otp}. Do not share this OTP with anyone.`, 'bank');
      }, 500);

      // Send Scammer message after delay
      setTimeout(() => {
        addMessage('+91-98765-43210', `Hello, I am from SecureBank support. We noticed unusual activity on your account. Please share your OTP here , that you have just received to secure your account immediately.`, 'scammer');
        setShowWarning(true);
        setWarningMessage('⚠️ Suspicious message detected! Banks never ask for OTPs.');
      }, 3500);
    }
  };

  // Handle OTP Submit
  const handleOtpSubmit = () => {
    if (otp === generatedOtp) {
      setUpiStep('pin');
      setShowWarning(false);
      addMessage('SecureBank', 'OTP verified successfully. Please set your UPI PIN.', 'bank');
    } else {
      showFeedbackMessage('error', 'Incorrect OTP. Please try again.');
    }
  };

  // Handle PIN Submit
  const handlePinSubmit = () => {
    if (upiPin.length === 4 && upiPin === confirmPin) {
      setUpiStep('success');
      setScore(prev => prev + 100);
      addMessage('SecureBank', 'UPI PIN set successfully! Your account is now secure.', 'bank');
      showFeedbackMessage('success', 'Congratulations! You have successfully completed the UPI setup training.');
    } else if (upiPin !== confirmPin) {
      showFeedbackMessage('error', 'PINs do not match. Please try again.');
    } else {
      showFeedbackMessage('error', 'PIN must be 4 digits.');
    }
  };

  // Show feedback message
  const showFeedbackMessage = (type, message) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 5000);
  };

  // Handle Scammer SMS click (educational)
  const handleScammerMessageClick = (messageId) => {
    const message = messages.find(m => m.id === messageId);
    if (message && message.type === 'scammer') {
      showFeedbackMessage('warning', '🚨 RED FLAG: "Support" asking for OTP. Banks NEVER request OTPs via SMS or calls.');
    }
  };

  // Reset training
  const resetTraining = () => {
    setUpiStep('phone');
    setPhoneNumber('');
    setOtp('');
    setUpiPin('');
    setConfirmPin('');
    setMessages([{ id: 1, sender: 'Bank', text: 'Welcome to SecureBank UPI services.', time: '10:00 AM', type: 'bank' }]);
    setShowWarning(false);
    setScore(0);
    setShowFeedback(false);
  };

  // Render UPI App Screen
  const renderUpiScreen = () => {
    switch (upiStep) {
      case 'phone':
        return (
          <div className="upi-screen">
            <div className="upi-header">
              <Shield size={48} className="upi-logo" />
              <h3>SecureBank UPI</h3>
              <p>Set up your UPI account</p>
            </div>
            <div className="upi-form">
              <div className="form-group">
                <label>Enter Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="upi-input"
                />
              </div>
              <button 
                className="upi-btn primary"
                onClick={handlePhoneSubmit}
                disabled={phoneNumber.length !== 10}
              >
                <Send size={18} />
                Send OTP
              </button>
              <div className="upi-tip">
                <Lock size={16} />
                <span>Your number is secure and encrypted</span>
              </div>
            </div>
          </div>
        );

      case 'otp':
        return (
          <div className="upi-screen">
            <div className="upi-header">
              <Shield size={48} className="upi-logo" />
              <h3>Verify OTP</h3>
              <p>Enter the OTP sent to {phoneNumber}</p>
            </div>
            <div className="upi-form">
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit OTP"
                  maxLength={6}
                  className="upi-input"
                />
              </div>
              <button 
                className="upi-btn primary"
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6}
              >
                <CheckCircle size={18} />
                Verify OTP
              </button>
              <div className="upi-tip warning">
                <AlertTriangle size={16} />
                <span>Never share your OTP with anyone!</span>
              </div>
            </div>
          </div>
        );

      case 'pin':
        return (
          <div className="upi-screen">
            <div className="upi-header">
              <Shield size={48} className="upi-logo" />
              <h3>Set UPI PIN</h3>
              <p>Create a secure 4-digit PIN</p>
            </div>
            <div className="upi-form">
              <div className="form-group">
                <label>Enter UPI PIN</label>
                <div className="pin-input-wrapper">
                  <input
                    type={showPin ? "text" : "password"}
                    value={upiPin}
                    onChange={(e) => setUpiPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="4-digit PIN"
                    maxLength={4}
                    className="upi-input"
                  />
                  <button 
                    className="toggle-pin"
                    onClick={() => setShowPin(!showPin)}
                  >
                    {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm UPI PIN</label>
                <input
                  type={showPin ? "text" : "password"}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="Re-enter 4-digit PIN"
                  maxLength={4}
                  className="upi-input"
                />
              </div>
              <button 
                className="upi-btn primary"
                onClick={handlePinSubmit}
                disabled={upiPin.length !== 4 || confirmPin.length !== 4}
              >
                <Lock size={18} />
                Set UPI PIN
              </button>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="upi-screen success">
            <div className="success-animation">
              <CheckCircle size={80} className="success-icon" />
            </div>
            <h3>UPI Setup Complete!</h3>
            <p>Your UPI account is now ready to use.</p>
            <div className="score-display">
              <span>Score: {score}</span>
            </div>
            <button className="upi-btn secondary" onClick={resetTraining}>
              Restart Training
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`banking-training-page ${isElderly ? 'elderly-mode' : ''}`}>
      {/* Page Notification */}
      <PageNotification pageKey="pageBankingTraining" />
      
      {/* Header */}
      <div className="training-header">
        <button className="back-btn" onClick={() => navigate('/sandbox')}>
          <ArrowLeft size={24} />
          Back to Sandbox
        </button>
        <h1>UPI / Banking Training</h1>
        <div className="score-badge">
          <Shield size={18} />
          Score: {score}
        </div>
      </div>

      {/* Banking Safety Tips - Important! */}
      <div className="training-tips">
        <h3>⚠️ Banking Safety - Read Before You Start</h3>
        <div className="tips-grid">
          <div className="tip-card important">
            <span className="tip-icon">🔐</span>
            <p><strong>Never share</strong> your UPI PIN, OTP, or passwords</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">📱</span>
            <p><strong>Verify caller identity</strong> - Banks never ask for PINs</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">🔗</span>
            <p><strong>Check payment requests</strong> carefully before approving</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">🚨</span>
            <p><strong>Urgency = Red flag</strong> - Scammers create fake urgency</p>
          </div>
        </div>
      </div>

      {/* Main Training Area */}
      <div className="training-container">
        {/* Left Side - UPI App Simulator */}
        <div className="simulator-section">
          <div className="simulator-header">
            <Smartphone size={20} />
            <span>UPI App Simulation</span>
          </div>
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              {renderUpiScreen()}
            </div>
            <div className="phone-home-btn"></div>
          </div>
          <div className="simulator-label">Fake Banking App</div>
        </div>

        {/* Right Side - SMS Interface */}
        <div className="simulator-section">
          <div className="simulator-header">
            <MessageSquare size={20} />
            <span>SMS Interface</span>
          </div>
          <div className="phone-frame sms-frame">
            <div className="phone-notch"></div>
            <div className="phone-screen sms-screen">
              <div className="sms-header">
                <span>Messages</span>
              </div>
              <div className="sms-list">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`sms-bubble ${message.type}`}
                    onClick={() => handleScammerMessageClick(message.id)}
                  >
                    <div className="sms-sender">{message.sender}</div>
                    <div className="sms-text">{message.text}</div>
                    <div className="sms-time">{message.time}</div>
                    {message.type === 'scammer' && (
                      <div className="sms-warning">
                        <AlertTriangle size={14} />
                        <span>Suspicious</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="simulator-label">Scammer Messages</div>
        </div>
      </div>

      {/* Warning Banner */}
      {showWarning && (
        <div className="warning-banner">
          <AlertTriangle size={24} />
          <span>{warningMessage}</span>
          <button onClick={() => setShowWarning(false)}>
            <XCircle size={20} />
          </button>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className={`feedback-modal ${feedbackType}`}>
          <div className="feedback-content">
            {feedbackType === 'success' && <CheckCircle size={40} />}
            {feedbackType === 'error' && <XCircle size={40} />}
            {feedbackType === 'warning' && <AlertTriangle size={40} />}
            <p>{feedbackMessage}</p>
            <button onClick={() => setShowFeedback(false)}>Got it</button>
          </div>
        </div>
      )}

      {/* Training Tips */}
      <div className="training-tips">
        <h3>
          <Shield size={20} />
          Training Tips
        </h3>
        <ul>
          <li>Never share your OTP with anyone, even bank officials</li>
          <li>Banks never ask for passwords or PINs via SMS or calls</li>
          <li>Always verify the sender's identity before responding</li>
          <li>If in doubt, contact your bank directly using official numbers</li>
        </ul>
      </div>
    </div>
  );
};

export default BankingTraining;
