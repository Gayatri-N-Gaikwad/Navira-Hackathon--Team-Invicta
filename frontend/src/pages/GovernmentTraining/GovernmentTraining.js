import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Globe, MessageSquare, Shield, AlertTriangle, CheckCircle, XCircle, Search, ExternalLink, Lock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageNotification from '../../components/PageNotification/PageNotification';
import './GovernmentTraining.css';

const GovernmentTraining = () => {
  const { isElderly } = useAuth();
  const navigate = useNavigate();

  // Website Simulator State
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [showUrlPreview, setShowUrlPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [websiteStep, setWebsiteStep] = useState('select'); // select, form, success, danger
  const [formData, setFormData] = useState({ name: '', aadhaar: '' });

  // SMS State
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Govt Alerts', text: 'Welcome to Government Services Portal.', time: '10:00 AM', type: 'govt' }
  ]);

  // Training State
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [redFlagsFound, setRedFlagsFound] = useState(0);

  // Website database
  const websites = [
    {
      id: 1,
      name: 'PM Kisan Portal',
      displayUrl: 'pmkisan.gov.in',
      fullUrl: 'https://pmkisan.gov.in',
      isOfficial: true,
      description: 'Official PM Kisan Samman Nidhi portal'
    },
    {
      id: 2,
      name: 'PM Kisan Update',
      displayUrl: 'pmkisan-update.in',
      fullUrl: 'https://pmkisan-update.in/registration',
      isOfficial: false,
      description: 'Unofficial website - NOT government endorsed',
      redFlags: ['No .gov.in domain', 'Asks for Aadhaar immediately']
    },
    {
      id: 3,
      name: 'Govt Subsidy Portal',
      displayUrl: 'govtsubsidy-india.com',
      fullUrl: 'https://govtsubsidy-india.com/claim',
      isOfficial: false,
      description: 'Fake website - NOT a government domain',
      redFlags: ['.com domain (not .gov.in)', 'Too good to be true offers']
    },
    {
      id: 4,
      name: 'Aadhaar Services',
      displayUrl: 'uidai.gov.in',
      fullUrl: 'https://uidai.gov.in',
      isOfficial: true,
      description: 'Official UIDAI portal for Aadhaar services'
    }
  ];

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

  // Start scenario - send scam SMS after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      addMessage('+91-98432-10987', `Congratulations! You are eligible for ₹5,000 PM Kisan subsidy. Click here to claim instantly: https://pmkisan-claim.in/apply (Offer valid for 2 hours only!)`, 'scammer');
    }, 4000);

    return () => clearTimeout(timer);
  }, [addMessage]);

  // Handle website selection
  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);
    setPreviewUrl(website.fullUrl);
    setShowUrlPreview(true);
  };

  // Handle website confirm
  const handleWebsiteConfirm = () => {
    if (selectedWebsite.isOfficial) {
      setWebsiteStep('form');
      setShowWarning(false);
      addMessage('Govt Alerts', `You have accessed the official ${selectedWebsite.name}. This is a secure connection.`, 'govt');
      showFeedbackMessage('success', '✅ Correct! This is an official government website with .gov.in domain.');
      setScore(prev => prev + 50);
    } else {
      setWebsiteStep('danger');
      addMessage('Security Alert', `Warning: You clicked on a potentially fraudulent website.`, 'alert');
      showFeedbackMessage('error', `🚨 DANGER: "${selectedWebsite.displayUrl}" is NOT an official government website. Official sites always end with .gov.in`);
      setShowWarning(true);
      setWarningMessage('⚠️ Fake website detected! Never enter personal information on unofficial sites.');
    }
  };

  // Handle form submit (only for official sites)
  const handleFormSubmit = () => {
    if (formData.name && formData.aadhaar.length === 12) {
      setWebsiteStep('success');
      setScore(prev => prev + 50);
      addMessage('Govt Alerts', 'Your information has been securely submitted to the official portal.', 'govt');
      showFeedbackMessage('success', 'Excellent! You successfully completed the government portal training.');
    } else {
      showFeedbackMessage('warning', 'Please fill in all fields correctly. Aadhaar number must be 12 digits.');
    }
  };

  // Show feedback message
  const showFeedbackMessage = (type, message) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 6000);
  };

  // Handle red flag click
  const handleRedFlagClick = (flag) => {
    setRedFlagsFound(prev => prev + 1);
    showFeedbackMessage('warning', `🚩 RED FLAG: "${flag}" - This is a common scam indicator!`);
  };

  // Handle SMS scam link click
  const handleSmsClick = (messageId) => {
    const message = messages.find(m => m.id === messageId);
    if (message && message.type === 'scammer') {
      showFeedbackMessage('warning', '🚨 You clicked a scam link! In real life, this could steal your data or install malware.');
      setShowWarning(true);
      setWarningMessage('⚠️ Never click links in unsolicited SMS messages claiming government benefits.');
    }
  };

  // Reset training
  const resetTraining = () => {
    setSelectedWebsite(null);
    setShowUrlPreview(false);
    setPreviewUrl('');
    setWebsiteStep('select');
    setFormData({ name: '', aadhaar: '' });
    setMessages([{ id: 1, sender: 'Govt Alerts', text: 'Welcome to Government Services Portal.', time: '10:00 AM', type: 'govt' }]);
    setShowWarning(false);
    setScore(0);
    setRedFlagsFound(0);
    setShowFeedback(false);
  };

  // Get domain color
  const getDomainColor = (url) => {
    if (url.includes('.gov.in')) return 'official';
    if (url.includes('.in') && !url.includes('.gov.in')) return 'suspicious';
    return 'danger';
  };

  // Render Website Screen
  const renderWebsiteScreen = () => {
    switch (websiteStep) {
      case 'select':
        return (
          <div className="govt-screen">
            <div className="govt-header">
              <Globe size={48} className="govt-logo" />
              <h3>Government Services</h3>
              <p>Select an official government portal</p>
            </div>

            <div className="search-bar">
              <Search size={20} />
              <input type="text" placeholder="Search government services..." readOnly />
            </div>

            <div className="website-list">
              {websites.map((site) => (
                <div
                  key={site.id}
                  className={`website-card ${selectedWebsite?.id === site.id ? 'selected' : ''}`}
                  onClick={() => handleWebsiteSelect(site)}
                >
                  <div className="website-info">
                    <div className={`domain-indicator ${getDomainColor(site.displayUrl)}`}>
                      {site.isOfficial ? <Lock size={14} /> : <AlertTriangle size={14} />}
                    </div>
                    <div className="website-details">
                      <h4>{site.name}</h4>
                      <span className={`website-url ${getDomainColor(site.displayUrl)}`}>
                        {site.displayUrl}
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={18} className="website-link-icon" />
                </div>
              ))}
            </div>

            {showUrlPreview && selectedWebsite && (
              <div className="url-preview">
                <h4>URL Preview</h4>
                <div className={`preview-url ${getDomainColor(previewUrl)}`}>
                  <Eye size={16} />
                  {previewUrl}
                </div>
                <div className="url-analysis">
                  {selectedWebsite.isOfficial ? (
                    <div className="analysis-safe">
                      <CheckCircle size={16} />
                      <span>✓ Official .gov.in domain</span>
                    </div>
                  ) : (
                    <div className="analysis-danger">
                      <XCircle size={16} />
                      <span>✗ Not a government domain</span>
                      {selectedWebsite.redFlags?.map((flag, idx) => (
                        <div key={idx} className="red-flag-item" onClick={() => handleRedFlagClick(flag)}>
                          <AlertTriangle size={12} />
                          {flag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="confirm-btn" onClick={handleWebsiteConfirm}>
                  {selectedWebsite.isOfficial ? 'Visit Official Site' : 'Continue (Demo)'}
                </button>
              </div>
            )}

            <div className="govt-tip">
              <Shield size={16} />
              <span>Tip: Always check for .gov.in in government website URLs</span>
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="govt-screen">
            <div className="form-header">
              <div className="secure-badge">
                <Lock size={16} />
                <span>Secure Connection</span>
              </div>
              <h3>{selectedWebsite.name}</h3>
              <p className="official-url">{selectedWebsite.displayUrl}</p>
            </div>

            <div className="secure-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="govt-input"
                />
              </div>

              <div className="form-group">
                <label>Aadhaar Number</label>
                <input
                  type="text"
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, '').slice(0, 12) })}
                  placeholder="12-digit Aadhaar number"
                  maxLength={12}
                  className="govt-input"
                />
                <span className="input-hint">Your data is encrypted and secure</span>
              </div>

              <div className="security-notice">
                <Shield size={18} />
                <div>
                  <strong>Official Government Portal</strong>
                  <p>All information is protected under digital security protocols</p>
                </div>
              </div>

              <button
                className="submit-btn"
                onClick={handleFormSubmit}
                disabled={!formData.name || formData.aadhaar.length !== 12}
              >
                <CheckCircle size={18} />
                Submit Securely
              </button>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="govt-screen success">
            <div className="success-animation">
              <CheckCircle size={80} className="success-icon" />
            </div>
            <h3>Task Completed!</h3>
            <p>You successfully identified the official government portal.</p>
            <div className="learning-points">
              <h4>What You Learned:</h4>
              <ul>
                <li>✓ Official sites use .gov.in domain</li>
                <li>✓ Look for secure connection indicators</li>
                <li>✓ Don't trust SMS links claiming urgent benefits</li>
                <li>✓ Red flags found: {redFlagsFound}</li>
              </ul>
            </div>
            <div className="score-display">
              <span>Score: {score}</span>
            </div>
            <button className="upi-btn secondary" onClick={resetTraining}>
              Restart Training
            </button>
          </div>
        );

      case 'danger':
        return (
          <div className="govt-screen danger">
            <div className="danger-animation">
              <AlertTriangle size={80} className="danger-icon" />
            </div>
            <h3>⚠️ Fake Website Detected!</h3>
            <p>You clicked on a fraudulent website that could have stolen your data.</p>
            <div className="danger-details">
              <h4>Warning Signs Identified:</h4>
              <ul>
                <li>✗ Domain does not end with .gov.in</li>
                <li>✗ Website name mimics official portal</li>
                <li>✗ Unofficial domain extension (.com, .in)</li>
                {selectedWebsite?.redFlags?.map((flag, idx) => (
                  <li key={idx}>✗ {flag}</li>
                ))}
              </ul>
            </div>
            <button className="upi-btn secondary" onClick={resetTraining}>
              Try Again
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`banking-training-page govt-training-page ${isElderly ? 'elderly-mode' : ''}`}>
      {/* Page Notification */}
      <PageNotification pageName="Government ID Training" />
      
      {/* Header */}
      <div className="training-header">
        <button className="back-btn" onClick={() => navigate('/sandbox')}>
          <ArrowLeft size={24} />
          Back to Sandbox
        </button>
        <h1>Government Training</h1>
        <div className="score-badge">
          <Shield size={18} />
          Score: {score}
        </div>
      </div>

      {/* Government Website Safety Tips - Important! */}
      <div className="training-tips">
        <h3>⚠️ Government Website Safety - Read Before You Start</h3>
        <div className="tips-grid">
          <div className="tip-card important">
            <span className="tip-icon">🔒</span>
            <p><strong>Look for HTTPS</strong> and lock icon in address bar</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">🌐</span>
            <p><strong>Official domains only</strong> - .gov.in or .nic.in</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">💰</span>
            <p><strong>No payment for forms</strong> - Official forms are FREE</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">📧</span>
            <p><strong>Ignore email links</strong> - Type URLs manually</p>
          </div>
        </div>
      </div>

       {/* Training Tips */}
      <div className="training-tips">
        <h3>
          <Shield size={20} />
          How to Identify Official Government Websites
        </h3>
        <ul>
          <li><strong>Domain Check:</strong> Official sites always end with <code>.gov.in</code></li>
          <li><strong>HTTPS Security:</strong> Look for the lock icon in the browser</li>
          <li><strong>No Urgency:</strong> Government sites never create false urgency</li>
          <li><strong>No SMS Links:</strong> Never click links in unsolicited messages</li>
          <li><strong>Verify URL:</strong> Type URLs directly or use official bookmarks</li>
        </ul>
      </div>

      {/* Main Training Area */}
      <div className="training-container">
        {/* Left Side - Website Simulator */}
        <div className="simulator-section">
          <div className="simulator-header">
            <Globe size={20} />
            <span>Government Website</span>
          </div>
          <div className="phone-frame browser-frame">
            <div className="browser-bar">
              <div className="browser-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="browser-address">
                <Lock size={12} />
                <span>{selectedWebsite ? selectedWebsite.displayUrl : 'portal.gov.in'}</span>
              </div>
            </div>
            <div className="phone-screen browser-screen">
              {renderWebsiteScreen()}
            </div>
          </div>
          <div className="simulator-label">Fake Website Portal</div>
        </div>

        {/* Right Side - SMS Interface */}
        <div className="simulator-section">
          <div className="simulator-header">
            <MessageSquare size={20} />
            <span>SMS</span>
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
                    onClick={() => handleSmsClick(message.id)}
                  >
                    <div className="sms-sender">{message.sender}</div>
                    <div className="sms-text">{message.text}</div>
                    <div className="sms-time">{message.time}</div>
                    {message.type === 'scammer' && (
                      <div className="sms-warning">
                        <AlertTriangle size={14} />
                        <span>Scam Alert</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="simulator-label">Scam Messages</div>
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
    </div>
  );
};

export default GovernmentTraining;
