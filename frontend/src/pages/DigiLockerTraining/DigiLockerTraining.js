import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, AlertTriangle, CheckCircle, Lock, 
  Smartphone, Shield, FileText, Download, Share2,
  MessageCircle, Mail, ChevronRight, ChevronLeft,
  QrCode, Link, X, Award, Home
} from 'lucide-react';
import { useVoice } from '../../context/VoiceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import Tooltip from '../../components/Tooltip';
import PageNotification from '../../components/PageNotification/PageNotification';
import VoicePlayer from '../../components/VoicePlayer/VoicePlayer';
import './DigiLockerTraining.css';

const DigiLockerTraining = () => {
  const navigate = useNavigate();
  const { stopInstruction } = useVoice();
  const { t, currentLanguage } = useLanguage();
  const { completeModule } = useProgress();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpScam, setShowOtpScam] = useState(false);
  const [scamHandled, setScamHandled] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentDownloaded, setDocumentDownloaded] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [userChoices, setUserChoices] = useState([]);
  const [finalScore, setFinalScore] = useState(0);

  const totalSteps = 11;

  const avatarMessages = {
    0: {
      text: t('digilockerAvatar.intro') || "Namaste! Welcome to DigiLocker Security Training. Today we will learn how to safely use DigiLocker to store and download your important documents. DigiLocker is a secure government digital vault.",
      voice: "Namaste! Welcome to DigiLocker Security Training. Today we will learn how to safely use DigiLocker to store and download your important documents. DigiLocker is a secure government digital vault."
    },
    1: {
      text: t('digilockerAvatar.step1') || "Step 1: Always use the official DigiLocker website. Look for .gov.in at the end of the web address. Only government websites use this domain.",
      voice: "Step 1: Always use the official DigiLocker website. Look for .gov.in at the end of the web address. Only government websites use this domain."
    },
    2: {
      text: t('digilockerAvatar.step2') || "Good! Before logging in, always check for the lock icon in the address bar. This means the connection is secure and encrypted.",
      voice: "Good! Before logging in, always check for the lock icon in the address bar. This means the connection is secure and encrypted."
    },
    3: {
      text: t('digilockerAvatar.step3') || "Step 3: Enter your registered mobile number. DigiLocker will send a One-Time Password (OTP) to verify it's really you.",
      voice: "Step 3: Enter your registered mobile number. DigiLocker will send a One-Time Password or OTP to verify it's really you."
    },
    4: {
      text: t('digilockerAvatar.step4') || "Step 4: An OTP is a special code sent only to your phone. It expires quickly and can be used only once. Never share your OTP with anyone!",
      voice: "Step 4: An OTP is a special code sent only to your phone. It expires quickly and can be used only once. Never share your OTP with anyone!"
    },
    5: {
      text: t('digilockerAvatar.step5') || "🚨 BE CAREFUL! Someone is trying to trick you! They are asking for your OTP through WhatsApp. This is a SCAM! No government service will ever ask for your OTP through messages or calls.",
      voice: "Be careful! Someone is trying to trick you! They are asking for your OTP through WhatsApp. This is a scam! No government service will ever ask for your OTP through messages or calls."
    },
    6: {
      text: t('digilockerAvatar.step6') || "Excellent! You ignored the scam message. Now you're safely logged into your DigiLocker dashboard. Here you can see all your stored documents like Aadhaar, Driving License, and PAN Card.",
      voice: "Excellent! You ignored the scam message. Now you're safely logged into your DigiLocker dashboard. Here you can see all your stored documents like Aadhaar, Driving License, and PAN Card."
    },
    7: {
      text: t('digilockerAvatar.step7') || "Step 7: Click on a document to download it. Remember: Only download documents on trusted devices like your own phone or computer. Never use public computers for this.",
      voice: "Step 7: Click on a document to download it. Remember: Only download documents on trusted devices like your own phone or computer. Never use public computers for this."
    },
    8: {
      text: t('digilockerAvatar.step8') || "Step 8: You can also share documents securely. Always verify who you are sharing with. Never share with unknown people or on suspicious websites.",
      voice: "Step 8: You can also share documents securely. Always verify who you are sharing with. Never share with unknown people or on suspicious websites."
    },
    9: {
      text: t('digilockerAvatar.step9') || "🚨 Another scam attempt! You received an urgent email saying your account is suspended. This creates panic to make you click without thinking. Always verify such messages before clicking any links.",
      voice: "Another scam attempt! You received an urgent email saying your account is suspended. This creates panic to make you click without thinking. Always verify such messages before clicking any links."
    },
    10: {
      text: t('digilockerAvatar.complete') || "Congratulations! You've completed the DigiLocker Security Training! You learned: 1. How to identify official government websites, 2. Why OTP must never be shared, 3. How to safely download documents, 4. How to detect phishing emails and messages. You are now a Digital Safety Champion!",
      voice: "Congratulations! You've completed the DigiLocker Security Training! You learned how to identify official government websites, why OTP must never be shared, how to safely download documents, and how to detect phishing emails and messages. You are now a Digital Safety Champion!"
    }
  };


  useEffect(() => {
    return () => {
      stopInstruction();
    };
  }, []);

  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);
    if (website === 'official') {
      setUserChoices([...userChoices, { step: 1, correct: true }]);
      setTimeout(() => nextStep(), 1000);
    } else {
      setUserChoices([...userChoices, { step: 1, correct: false }]);
      setShowWarning(true);
    }
  };

  const handleMobileSubmit = () => {
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
      setTimeout(() => {
        setShowOtpScam(true);
      }, 3000);
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6 && !scamHandled) {
      setUserChoices([...userChoices, { step: 5, correct: false }]);
    } else if (otp.length === 6 && scamHandled) {
      setUserChoices([...userChoices, { step: 5, correct: true }]);
      nextStep();
    }
  };

  const handleScamChoice = (choice) => {
    if (choice === 'ignore') {
      setScamHandled(true);
      setShowOtpScam(false);
      setUserChoices([...userChoices, { step: 5, correct: true }]);
    } else {
      setUserChoices([...userChoices, { step: 5, correct: false }]);
      alert(t('digilockerScamWarning') || "⚠️ NEVER share your OTP! This is how scammers steal your identity and money!");
    }
  };

  const handleEmailChoice = (choice) => {
    if (choice === 'report') {
      setUserChoices([...userChoices, { step: 9, correct: true }]);
      setShowEmailAlert(false);
      nextStep();
    } else {
      setUserChoices([...userChoices, { step: 9, correct: false }]);
      alert(t('digilockerPhishingWarning') || "⚠️ That was a phishing attempt! Never click suspicious links in urgent emails!");
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedWebsite(null);
      setShowWarning(false);
      setShowOtpScam(false);
      setScamHandled(false);
      setShowEmailAlert(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishTraining = () => {
    const correctChoices = userChoices.filter(c => c.correct).length;
    const score = Math.round((correctChoices / userChoices.length) * 100) || 85;
    setFinalScore(score);
    completeModule('digilocker', score);
    setTimeout(() => navigate('/sandbox'), 1500);
  };

  const renderAvatarPanel = () => (
    <div className="digilocker-avatar-panel">
      <div className="digilocker-avatar-container">
        <div className="digilocker-avatar-image">
          <div className="digilocker-avatar-character">👩</div>
        </div>
        <div className="digilocker-avatar-info">
          <h4>Seema Tai</h4>
          <span className="digilocker-avatar-role">Digital Safety Guide</span>
        </div>
      </div>
      
      <div className="digilocker-avatar-message">
        <div className="digilocker-message-bubble">
          <p>{avatarMessages[currentStep]?.text}</p>
        </div>
      </div>

      <VoicePlayer pageId="digilocker" />

      <div className="digilocker-step-indicator">
        <div className="digilocker-progress-bar">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`digilocker-progress-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}
            />
          ))}
        </div>
        <span className="digilocker-step-text">Step {currentStep + 1} of {totalSteps}</span>
      </div>
    </div>
  );

  const renderBrowserPanel = () => {
    const urls = [
      'Search Results: DigiLocker login',
      'https://digilocker.gov.in',
      'https://digilocker.gov.in/login',
      'https://digilocker.gov.in/dashboard',
      'https://digilocker.gov.in/dashboard',
      'https://digilocker.gov.in/dashboard',
      'https://digilocker.gov.in/dashboard',
      'https://digilocker.gov.in/documents',
      'https://digilocker.gov.in/share',
      'https://digilocker.gov.in/dashboard',
      'Training Complete'
    ];

    return (
      <div className="digilocker-browser-panel">
        <div className="digilocker-browser-header">
          <div className="digilocker-browser-tabs">
            <div className="digilocker-tab active">
              <span>{currentStep === 0 ? 'Search' : 'DigiLocker'}</span>
              <X size={14} />
            </div>
          </div>
          <div className="digilocker-address-bar">
            <Lock size={14} className={currentStep >= 2 ? 'secure' : ''} />
            <span className={currentStep >= 2 ? 'secure-url' : ''}>{urls[currentStep]}</span>
          </div>
        </div>

        <div className="digilocker-browser-content">
          {renderStep()}
        </div>

        <div className="digilocker-browser-controls">
          <button 
            onClick={prevStep} 
            disabled={currentStep === 0}
            className="digilocker-nav-btn"
          >
            <ChevronLeft size={20} /> Previous
          </button>
          <button 
            onClick={nextStep} 
            disabled={currentStep === totalSteps - 1}
            className="digilocker-nav-btn primary"
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="digilocker-search-results-step">
            <div className="digilocker-search-header">
              <span>Search Results for: DigiLocker login</span>
            </div>
            <div className="digilocker-results-list">
              <div 
                className={`digilocker-search-result ${selectedWebsite === 'official' ? 'selected-correct' : ''} ${selectedWebsite && selectedWebsite !== 'official' ? 'dimmed' : ''}`}
                onClick={() => handleWebsiteSelect('official')}
              >
                <div className="digilocker-result-icon official">
                  <Globe size={24} />
                </div>
                <div className="digilocker-result-content">
                  <h4>digilocker.gov.in</h4>
                  <p>Official DigiLocker Portal - Government of India</p>
                  {selectedWebsite === 'official' && (
                    <div className="digilocker-feedback-message correct">
                      <CheckCircle size={16} />
                      <span>✓ Secure! Official .gov.in website</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div 
                className={`digilocker-search-result ${selectedWebsite === 'fake1' ? 'selected-wrong' : ''} ${selectedWebsite && selectedWebsite !== 'fake1' ? 'dimmed' : ''}`}
                onClick={() => handleWebsiteSelect('fake1')}
              >
                <div className="digilocker-result-icon official">
                  <Globe size={24} />
                </div>
                <div className="digilocker-result-content">
                  <h4>digilocker-help-support.com</h4>
                  <p>DigiLocker Assistance Center</p>
                  {selectedWebsite === 'fake1' && (
                    <div className="digilocker-feedback-message wrong">
                      <AlertTriangle size={16} />
                      <span>⚠ Suspicious! .com domain is not official</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div 
                className={`digilocker-search-result ${selectedWebsite === 'fake2' ? 'selected-wrong' : ''} ${selectedWebsite && selectedWebsite !== 'fake2' ? 'dimmed' : ''}`}
                onClick={() => handleWebsiteSelect('fake2')}
              >
                <div className="digilocker-result-icon official">
                  <Globe size={24} />
                </div>
                <div className="digilocker-result-content">
                  <h4>digilocker-login-verification.net</h4>
                  <p>Login Verification Service</p>
                  {selectedWebsite === 'fake2' && (
                    <div className="digilocker-feedback-message wrong">
                      <AlertTriangle size={16} />
                      <span>⚠ Suspicious! .net domain is not official</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {showWarning && (
              <div className="digilocker-warning-overlay">
                <div className="digilocker-warning-modal">
                  <AlertTriangle size={48} className="digilocker-warning-icon" />
                  <h3>⚠️ Warning!</h3>
                  <p>This website is NOT an official government portal.</p>
                  <div className="digilocker-warning-details">
                    <p><strong>Red Flags:</strong></p>
                    <ul>
                      <li>❌ Suspicious domain (not .gov.in)</li>
                      <li>❌ Extra words like "help" or "support"</li>
                      <li>❌ Unofficial TLD (.com or .net)</li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => setShowWarning(false)}
                    className="digilocker-warning-btn"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="digilocker-website-step">
            <div className="digilocker-website-header">
              <div className="digilocker-lock-icon">
                <Lock size={40} />
              </div>
              <h2>DigiLocker</h2>
              <p className="digilocker-website-subtitle">Government of India</p>
            </div>
            <div className="digilocker-security-info">
              <div className="digilocker-security-badge">
                <Shield size={24} />
                <span>🔒 Secure Connection</span>
              </div>
              <p className="digilocker-security-text">
                This website uses encryption to protect your data.
                Always verify the lock icon before entering any information.
              </p>
              <button 
                onClick={nextStep}
                className="digilocker-continue-btn"
              >
                Continue to Login <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="digilocker-login-step">
            <div className="digilocker-login-box">
              <div className="digilocker-login-header">
                <Smartphone size={32} />
                <h3>Login to DigiLocker</h3>
              </div>
              <div className="digilocker-form-group">
                <label>Mobile Number</label>
                <input 
                  type="tel" 
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength="10"
                  className="digilocker-input"
                />
                <small>Your registered mobile number linked to Aadhaar</small>
              </div>
              <button 
                onClick={handleMobileSubmit}
                disabled={mobileNumber.length < 10}
                className="digilocker-get-otp-btn"
              >
                Get OTP
              </button>
            </div>
            <div className="digilocker-login-info">
              <p>🔐 Your information is secure and encrypted</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="digilocker-otp-step">
            {!otpSent ? (
              <div className="digilocker-otp-sending">
                <div className="digilocker-loading-spinner"></div>
                <p>Sending OTP to your mobile...</p>
              </div>
            ) : (
              <div className="digilocker-otp-box">
                <div className="digilocker-otp-header">
                  <Smartphone size={32} />
                  <h3>Enter OTP</h3>
                </div>
                <p className="digilocker-otp-instruction">
                  We've sent a 6-digit code to +91 {mobileNumber.replace(/(\d{2})(\d{4})(\d{4})/, 'XXXXXX$3')}
                </p>
                <div className="digilocker-otp-inputs">
                  <input 
                    type="text" 
                    placeholder="_ _ _ _ _ _"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength="6"
                    className="digilocker-otp-input"
                  />
                </div>
                <div className="digilocker-otp-info">
                  <Shield size={16} />
                  <span>Never share this OTP with anyone</span>
                </div>
                <button 
                  onClick={handleOtpSubmit}
                  disabled={otp.length !== 6}
                  className="digilocker-verify-btn"
                >
                  Verify & Login
                </button>
                <p className="digilocker-otp-resend">Resend OTP (30s)</p>
              </div>
            )}
          </div>
        );

      case 4:
      case 5:
        return (
          <div className="digilocker-otp-with-scam">
            <div className="digilocker-otp-box">
              <div className="digilocker-otp-header">
                <Smartphone size={32} />
                <h3>Enter OTP</h3>
              </div>
              <p className="digilocker-otp-instruction">
                Enter the 6-digit code sent to your mobile
              </p>
              <div className="digilocker-otp-inputs">
                <input 
                  type="text" 
                  placeholder="_ _ _ _ _ _"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength="6"
                  className="digilocker-otp-input"
                  disabled={showOtpScam}
                />
              </div>
              <div className="digilocker-otp-info">
                <Shield size={16} />
                <span>Never share this OTP with anyone</span>
              </div>
              <button 
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6 || showOtpScam}
                className="digilocker-verify-btn"
              >
                Verify & Login
              </button>
            </div>

            {showOtpScam && (
              <div className="digilocker-whatsapp-overlay">
                <div className="digilocker-whatsapp-popup">
                  <div className="digilocker-whatsapp-header">
                    <MessageCircle size={20} />
                    <span>WhatsApp Message</span>
                  </div>
                  <div className="digilocker-whatsapp-content">
                    <div className="digilocker-whatsapp-sender">
                      <span className="digilocker-sender-name">DigiLocker Support</span>
                      <span className="digilocker-sender-time">Just now</span>
                    </div>
                    <p className="digilocker-whatsapp-message">
                      "Hello! Your DigiLocker account needs verification. 
                      Please send your OTP for immediate confirmation."
                    </p>
                    <div className="digilocker-whatsapp-buttons">
                      <button 
                        onClick={() => handleScamChoice('send')}
                        className="digilocker-whatsapp-btn danger"
                      >
                        Send OTP
                      </button>
                      <button 
                        onClick={() => handleScamChoice('ignore')}
                        className="digilocker-whatsapp-btn safe"
                      >
                        Ignore Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {scamHandled && (
              <div className="digilocker-success-message">
                <CheckCircle size={20} />
                <span>✓ Scam avoided! Never share OTPs via messages.</span>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="digilocker-dashboard-step">
            <div className="digilocker-dashboard-header">
              <h2>Welcome to DigiLocker</h2>
              <p>Your secure digital document vault</p>
            </div>
            <div className="digilocker-documents-grid">
              <div 
                className={`digilocker-document-card ${selectedDocument === 'aadhaar' ? 'selected' : ''}`}
                onClick={() => setSelectedDocument('aadhaar')}
              >
                <div className="digilocker-doc-icon">
                  <FileText size={32} />
                </div>
                <h4>Aadhaar Card</h4>
                <span className="digilocker-doc-status">✓ Available</span>
              </div>
              
              <div 
                className={`digilocker-document-card ${selectedDocument === 'license' ? 'selected' : ''}`}
                onClick={() => setSelectedDocument('license')}
              >
                <div className="digilocker-doc-icon">
                  <FileText size={32} />
                </div>
                <h4>Driving License</h4>
                <span className="digilocker-doc-status">✓ Available</span>
              </div>
              
              <div 
                className={`digilocker-document-card ${selectedDocument === 'pan' ? 'selected' : ''}`}
                onClick={() => setSelectedDocument('pan')}
              >
                <div className="digilocker-doc-icon">
                  <FileText size={32} />
                </div>
                <h4>PAN Card</h4>
                <span className="digilocker-doc-status">✓ Available</span>
              </div>
            </div>
            
            {selectedDocument && (
              <div className="digilocker-doc-actions">
                <button 
                  onClick={() => { setDocumentDownloaded(true); nextStep(); }}
                  className="digilocker-action-btn download"
                >
                  <Download size={18} /> Download PDF
                </button>
                <button 
                  onClick={nextStep}
                  className="digilocker-action-btn share"
                >
                  <Share2 size={18} /> Share Document
                </button>
              </div>
            )}
            
            <div className="digilocker-security-tip">
              <Shield size={16} />
              <span>Tip: Only download documents on trusted devices</span>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="digilocker-share-step">
            <div className="digilocker-document-preview">
              <FileText size={48} />
              <h3>Aadhaar Card</h3>
              <p>Selected for sharing</p>
            </div>
            <div className="digilocker-share-options">
              <h4>Share via:</h4>
              <div className="digilocker-share-grid">
                <div className="digilocker-share-option">
                  <Link size={24} />
                  <span>Secure Link</span>
                  <small>Expires in 24 hours</small>
                </div>
                <div className="digilocker-share-option">
                  <QrCode size={24} />
                  <span>QR Code</span>
                  <small>Scan to download</small>
                </div>
                <div className="digilocker-share-option disabled">
                  <MessageCircle size={24} />
                  <span>WhatsApp</span>
                  <small className="digilocker-warning-text">Not recommended</small>
                </div>
              </div>
            </div>
            <div className="digilocker-share-warning">
              <AlertTriangle size={16} />
              <span>Always verify who you're sharing documents with!</span>
            </div>
            <button 
              onClick={nextStep}
              className="digilocker-continue-btn"
            >
              Continue <ChevronRight size={20} />
            </button>
          </div>
        );

      case 8:
        return (
          <div className="digilocker-email-step">
            {!showEmailAlert ? (
              <div className="digilocker-dashboard-placeholder">
                <div className="digilocker-loading-spinner"></div>
                <p>Checking for notifications...</p>
                <button 
                  onClick={() => setShowEmailAlert(true)}
                  className="digilocker-trigger-email-btn"
                >
                  Check Email
                </button>
              </div>
            ) : (
              <div className="digilocker-email-alert">
                <div className="digilocker-email-header">
                  <Mail size={24} />
                  <span>New Email</span>
                </div>
                <div className="digilocker-email-content">
                  <div className="digilocker-email-subject">
                    <AlertTriangle size={16} className="digilocker-email-warning-icon" />
                    <span>URGENT: DigiLocker Account Suspended</span>
                  </div>
                  <div className="digilocker-email-body">
                    <p>Dear User,</p>
                    <p>Your DigiLocker account has been temporarily suspended due to suspicious activity.</p>
                    <p className="digilocker-email-link">Click here to verify your account immediately →</p>
                    <p className="digilocker-email-signature">DigiLocker Security Team</p>
                  </div>
                  <div className="digilocker-email-actions">
                    <button 
                      onClick={() => handleEmailChoice('open')}
                      className="digilocker-email-btn danger"
                    >
                      Open Link
                    </button>
                    <button 
                      onClick={() => handleEmailChoice('report')}
                      className="digilocker-email-btn safe"
                    >
                      Report Phishing
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 9:
        return (
          <div className="digilocker-phishing-detected">
            <div className="digilocker-phishing-icon">
              <Shield size={48} />
            </div>
            <h3>Phishing Attempt Blocked!</h3>
            <div className="digilocker-phishing-info">
              <h4>You correctly identified a phishing email:</h4>
              <ul>
                <li>✓ Creates urgency ("URGENT", "immediately")</li>
                <li>✓ Threatens account suspension</li>
                <li>✓ Contains suspicious links</li>
                <li>✓ Claims to be from "Security Team"</li>
              </ul>
            </div>
            <button 
              onClick={nextStep}
              className="digilocker-continue-btn"
            >
              Continue to Summary <ChevronRight size={20} />
            </button>
          </div>
        );

      case 10:
        return (
          <div className="digilocker-completion-step">
            <div className="digilocker-completion-icon">
              <Award size={64} />
            </div>
            <h2>🎉 Training Completed!</h2>
            <p className="digilocker-completion-subtitle">
              You are now a DigiLocker Security Champion!
            </p>
            
            <div className="digilocker-skills-learned">
              <h4>Skills You Learned:</h4>
              <div className="digilocker-skill-list">
                <div className="digilocker-skill-item">
                  <CheckCircle size={16} />
                  <span>Identify official .gov.in websites</span>
                </div>
                <div className="digilocker-skill-item">
                  <CheckCircle size={16} />
                  <span>Never share OTP with anyone</span>
                </div>
                <div className="digilocker-skill-item">
                  <CheckCircle size={16} />
                  <span>Download documents securely</span>
                </div>
                <div className="digilocker-skill-item">
                  <CheckCircle size={16} />
                  <span>Detect phishing emails & messages</span>
                </div>
                <div className="digilocker-skill-item">
                  <CheckCircle size={16} />
                  <span>Share documents only with trusted people</span>
                </div>
              </div>
            </div>
            
            <div className="digilocker-badge-earned">
              <div className="digilocker-badge-icon">
                <Shield size={32} />
              </div>
              <div className="digilocker-badge-info">
                <h4>🏅 Digital Safety Level 2</h4>
                <p>DigiLocker Security Expert</p>
              </div>
            </div>
            
            <div className="digilocker-completion-actions">
              <button 
                onClick={finishTraining}
                className="digilocker-finish-btn"
              >
                <Award size={20} /> Complete Training
              </button>
              <button 
                onClick={() => navigate('/sandbox')}
                className="digilocker-home-btn"
              >
                <Home size={20} /> Back to Sandbox
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="digilocker-training-container">
      {/* Page Notification */}
      <PageNotification pageName="DigiLocker Training" />

      {/* DigiLocker Safety Tips - Important! */}
      <div className="training-tips">
        <h3>⚠️ DigiLocker Safety - Read Before You Start</h3>
        <div className="tips-grid">
          <div className="tip-card important">
            <span className="tip-icon">🔐</span>
            <p><strong>Use official site only</strong> - digilocker.gov.in</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">🆔</span>
            <p><strong>Link your Aadhaar</strong> - For secure access</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">📱</span>
            <p><strong>Enable 2FA</strong> - Use OTP for extra security</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">🚫</span>
            <p><strong>Never share</strong> your DigiLocker password</p>
          </div>
        </div>
      </div>
      
      <div className="digilocker-training-header">
        <button 
          onClick={() => navigate('/sandbox')}
          className="digilocker-back-btn"
        >
          <ChevronLeft size={20} /> Back to Sandbox
        </button>
        <h1>DigiLocker Security Training</h1>
        <div className="digilocker-training-progress">
          <span>Progress: {Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>
      </div>

      <div className="digilocker-training-content">
        {renderAvatarPanel()}
        {renderBrowserPanel()}
      </div>
    </div>
  );
};

export default DigiLockerTraining;
