import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Smartphone, CreditCard, Lock, Phone, Radio, Wifi } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import PageNotification from '../../components/PageNotification/PageNotification';
import './MobileRechargeTraining.css';

const MobileRechargeTraining = () => {
  const { isElderly } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [safetyScore, setSafetyScore] = useState(0);
  const [detectedRedFlags, setDetectedRedFlags] = useState([]);
  const [selectedApp, setSelectedApp] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [showRedFlag, setShowRedFlag] = useState(false);
  const [redFlagMessage, setRedFlagMessage] = useState('');
  const [redFlagDetails, setRedFlagDetails] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const totalSteps = 8;

  const trainingSteps = {
    1: {
      title: 'Welcome to Mobile Recharge Training',
      subtitle: 'Learn safe mobile recharge practices',
      content: 'intro'
    },
    2: {
      title: 'Select Payment App',
      subtitle: 'Choose a trusted payment application',
      content: 'appSelection'
    },
    3: {
      title: 'Enter Mobile Number',
      subtitle: 'Always double-check the number',
      content: 'numberEntry'
    },
    4: {
      title: 'Select Operator',
      subtitle: 'Choose your mobile network provider',
      content: 'operatorSelection'
    },
    5: {
      title: 'Choose Recharge Plan',
      subtitle: 'Select legitimate recharge plans',
      content: 'planSelection'
    },
    6: {
      title: 'Payment Method',
      subtitle: 'Secure payment options',
      content: 'paymentSelection'
    },
    7: {
      title: 'OTP Verification',
      subtitle: 'Never share OTP with anyone',
      content: 'otpVerification'
    },
    8: {
      title: 'Training Complete!',
      subtitle: 'Congratulations on completing the training',
      content: 'success'
    }
  };

  const paymentApps = [
    { id: 'paytm', name: 'Paytm', icon: 'paytm', symbol: 'paytm', safe: true },
    { id: 'googlepay', name: 'GPay', icon: 'google', symbol: 'G', safe: true },
    { id: 'phonepe', name: 'PhonePe', icon: 'phone', symbol: 'P', safe: true },
    { id: 'fakerecharge', name: 'FakeRecharge', icon: 'warning', symbol: '!', safe: false }
  ];

  const operators = [
    { id: 'jio', name: 'Jio' },
    { id: 'airtel', name: 'Airtel' },
    { id: 'vi', name: 'Vi' },
    { id: 'bsnl', name: 'BSNL' }
  ];

  const rechargePlans = [
    { id: '239', price: '239', validity: '28 Days', data: '1.5GB/day', safe: true },
    { id: '666', price: '666', validity: '84 Days', data: '1.5GB/day', safe: true },
    { id: '999', price: '999', validity: '365 Days', data: '2GB/day', safe: true },
    { id: 'scam', price: '10', validity: '365 Days', data: 'UNLIMITED', safe: false }
  ];

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'smartphone' },
    { id: 'card', name: 'Debit Card', icon: 'credit-card' },
    { id: 'netbanking', name: 'Net Banking', icon: 'globe' }
  ];

  const handleAppSelection = (appId) => {
    const app = paymentApps.find(a => a.id === appId);
    if (!app.safe) {
      showRedFlagModal('fakeapp', 'Fake App Detected', 'This app looks real but may be fake', [
        'Unknown app name',
        'No official branding',
        'Suspiciously good offers'
      ]);
      return;
    }
    setSelectedApp(appId);
    setSafetyScore(prev => prev + 10);
    nextStep();
  };

  const handleNumberSubmit = () => {
    if (mobileNumber.length !== 10) {
      showRedFlagModal('wrongnumber', 'Invalid Number', 'Mobile number must be 10 digits', [
        'Check the number length',
        'Only use digits',
        'Verify the number is correct'
      ]);
      return;
    }
    
    if (mobileNumber === '0000000000' || mobileNumber === '9999999999') {
      showRedFlagModal('wrongnumber', 'Suspicious Number', 'This number looks invalid', [
        'Real mobile numbers don\'t have all same digits',
        'Always double-check before recharging',
        'Make sure you\'re recharging the right person'
      ]);
      return;
    }
    
    setSafetyScore(prev => prev + 10);
    nextStep();
  };

  const handleOperatorSelection = () => {
    if (!selectedOperator) return;
    setSafetyScore(prev => prev + 5);
    nextStep();
  };

  const handlePlanSelection = (planId) => {
    const plan = rechargePlans.find(p => p.id === planId);
    if (!plan.safe) {
      showRedFlagModal('scamplan', 'Scam Plan Detected', 'Plans that look too good to be true may be scams', [
        'Price too good to be true',
        'Unlimited data for very low price',
        'Not from official operator'
      ]);
      return;
    }
    setSelectedPlan(planId);
    setSafetyScore(prev => prev + 15);
    nextStep();
  };

  const handlePaymentSelection = (methodId) => {
    setSelectedPayment(methodId);
    setSafetyScore(prev => prev + 10);
    nextStep();
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOTPVerification = () => {
    const otp = otpValues.join('');
    if (otp.length === 6) {
      setSafetyScore(prev => prev + 10);
    }
  };

  const handleOTPScamChoice = (choice) => {
    if (choice === 'share') {
      showRedFlagModal('otp', 'OTP Scam', 'OTP is secret. Never share it with anyone', [
        'Never share OTP with anyone',
        'Companies never ask for OTP',
        'OTP is like your password'
      ]);
    } else {
      setDetectedRedFlags(prev => [...prev, 'otp']);
      setSafetyScore(prev => prev + 20);
      nextStep();
    }
  };

  const showRedFlagModal = (type, title, message, details) => {
    setRedFlagMessage(message);
    setRedFlagDetails(details);
    setShowRedFlag(true);
  };

  const closeRedFlag = () => {
    setShowRedFlag(false);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goBack = () => {
    navigate('/sandbox');
  };

  const resetTraining = () => {
    setCurrentStep(1);
    setSafetyScore(0);
    setDetectedRedFlags([]);
    setSelectedApp('');
    setMobileNumber('');
    setSelectedOperator('');
    setSelectedPlan('');
    setSelectedPayment('');
    setOtpValues(['', '', '', '', '', '']);
    setShowSuccess(false);
  };

  const saveProgress = () => {
    const progress = {
      completed: true,
      safetyScore,
      detectedRedFlags,
      timestamp: Date.now()
    };
    localStorage.setItem('mobileRechargeProgress', JSON.stringify(progress));
  };

  useEffect(() => {
    if (currentStep === totalSteps) {
      setShowSuccess(true);
      saveProgress();
    }
  }, [currentStep]);

  const renderStepContent = () => {
    switch (trainingSteps[currentStep].content) {
      case 'intro':
        return (
          <div className="intro-content">
            <div className="intro-icon">
              <Smartphone size={80} />
            </div>
            <h2>Mobile Recharge Safety Training</h2>
            <p>Learn how to recharge your mobile safely and avoid common scams</p>
            <div className="steps-overview">
              <div className="step-item">
                <CheckCircle className="step-icon" />
                <span>Enter number correctly</span>
              </div>
              <div className="step-item">
                <CheckCircle className="step-icon" />
                <span>Choose legitimate plans</span>
              </div>
              <div className="step-item">
                <CheckCircle className="step-icon" />
                <span>Pay securely</span>
              </div>
              <div className="step-item">
                <CheckCircle className="step-icon" />
                <span>Avoid scams</span>
              </div>
            </div>
            <button className="start-btn" onClick={nextStep}>
              Start Training
            </button>
          </div>
        );

      case 'appSelection':
        return (
          <div className="app-selection">
            <h3>Select your payment app</h3>
            <div className="apps-grid">
              {paymentApps.map(app => (
                <div
                  key={app.id}
                  className={`app-card ${app.safe ? 'safe' : 'fake'}`}
                  onClick={() => handleAppSelection(app.id)}
                >
                  <div className="app-icon">
                    {app.id === 'paytm' && (
                      <div className="paytm-icon">
                        <img 
                          src="https://cdn.iconscout.com/icon/free/png-256/paytm-1648834-1388963.png" 
                          alt="Paytm" 
                          className="payment-app-logo"
                        />
                      </div>
                    )}
                    {app.id === 'googlepay' && (
                      <div className="gpay-icon">
                        <img 
                          src="https://cdn.iconscout.com/icon/free/png-256/google-pay-3627445-3023656.png" 
                          alt="Google Pay" 
                          className="payment-app-logo"
                        />
                      </div>
                    )}
                    {app.id === 'phonepe' && (
                      <div className="phonepe-icon">
                        <img 
                          src="https://cdn.iconscout.com/icon/free/png-256/phonepe-3628485-3023659.png" 
                          alt="PhonePe" 
                          className="payment-app-logo"
                        />
                      </div>
                    )}
                    {app.id === 'fakerecharge' && (
                      <div className="fake-icon">
                        <div className="fake-app-logo">
                          <span>!</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="app-name">{app.name}</div>
                </div>
              ))}
            </div>
            <p className="selection-hint">Choose a trusted payment app</p>
          </div>
        );

      case 'numberEntry':
        return (
          <div className="number-entry">
            <h3>Enter Mobile Number</h3>
            <div className="number-input-container">
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="9876543210"
                className="number-input"
                maxLength={10}
              />
            </div>
            <button className="continue-btn" onClick={handleNumberSubmit}>
              Continue
            </button>
            <div className="warning-text">
              <AlertTriangle size={16} />
              Always double check the number before recharging
            </div>
          </div>
        );

      case 'operatorSelection':
        return (
          <div className="operator-selection">
            <h3>Choose Operator</h3>
            <div className="operators-grid">
              {operators.map(operator => (
                <label key={operator.id} className="operator-option">
                  <input
                    type="radio"
                    name="operator"
                    value={operator.id}
                    onChange={(e) => setSelectedOperator(e.target.value)}
                  />
                  <span className="operator-name">{operator.name}</span>
                </label>
              ))}
            </div>
            <button className="continue-btn" onClick={handleOperatorSelection}>
              Continue
            </button>
          </div>
        );

      case 'planSelection':
        return (
          <div className="plan-selection">
            <h3>Choose Recharge Plan</h3>
            <div className="plans-grid">
              {rechargePlans.map(plan => (
                <div
                  key={plan.id}
                  className={`plan-card ${plan.safe ? 'safe' : 'scam'}`}
                  onClick={() => handlePlanSelection(plan.id)}
                >
                  <div className="plan-price">{'\u20B9'}{plan.price}</div>
                  <div className="plan-validity">{plan.validity}</div>
                  <div className="plan-data">{plan.data}</div>
                </div>
              ))}
            </div>
            <p className="selection-hint">Compare plans before choosing</p>
          </div>
        );

      case 'paymentSelection':
        return (
          <div className="payment-selection">
            <h3>Choose Payment Method</h3>
            <div className="payment-methods">
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  className="payment-method"
                  onClick={() => handlePaymentSelection(method.id)}
                >
                  <div className="payment-icon">
                    {method.id === 'upi' && <Smartphone size={40} />}
                    {method.id === 'card' && <CreditCard size={40} />}
                    {method.id === 'netbanking' && <Wifi size={40} />}
                  </div>
                  <div className="payment-name">{method.name}</div>
                </div>
              ))}
            </div>
            <div className="safety-warning">
              <Lock size={16} />
              Never share your PIN with anyone
            </div>
          </div>
        );

      case 'otpVerification':
        return (
          <div className="otp-verification">
            <h3>Enter OTP</h3>
            <div className="otp-inputs">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  className="otp-input"
                  maxLength={1}
                />
              ))}
            </div>
            <button className="verify-btn" onClick={handleOTPVerification}>
              Verify
            </button>
            
            <div className="scam-message">
              <h4>New Message:</h4>
              <div className="message-content">
                <strong>URGENT: Your recharge failed. Share OTP with our agent to fix.</strong>
              </div>
            </div>
            
            <div className="scam-choice">
              <button className="scam-btn share" onClick={() => handleOTPScamChoice('share')}>
                Share OTP
              </button>
              <button className="scam-btn dont-share" onClick={() => handleOTPScamChoice('dontshare')}>
                Do NOT Share OTP
              </button>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="success-content">
            <div className="success-icon">
              <CheckCircle size={80} />
            </div>
            <h2>Training Complete!</h2>
            <p>Congratulations! You've completed the mobile recharge safety training.</p>
            
            <div className="skills-learned">
              <h3>Skills Learned:</h3>
              <div className="skill-item">
                <CheckCircle className="skill-icon" />
                <span>Safe recharge practices</span>
              </div>
              <div className="skill-item">
                <CheckCircle className="skill-icon" />
                <span>Detect fake apps</span>
              </div>
              <div className="skill-item">
                <CheckCircle className="skill-icon" />
                <span>Protect OTP</span>
              </div>
              <div className="skill-item">
                <CheckCircle className="skill-icon" />
                <span>Identify fake plans</span>
              </div>
            </div>
            
            <div className="safety-score">
              <h3>Safety Score: {safetyScore}/100</h3>
            </div>
            
            <div className="action-buttons">
              <button className="practice-btn" onClick={resetTraining}>
                Practice Again
              </button>
              <button className="sandbox-btn" onClick={goBack}>
                Back to Sandbox
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`mobile-recharge-training ${isElderly ? 'elderly-mode' : ''}`}>
      {/* Page Notification */}
      <PageNotification pageKey="pageMobileRecharge" />
      
      {/* Header */}
      <div className="training-header">
        <button className="back-btn" onClick={goBack}>
          <ArrowLeft size={20} />
          Back to Sandbox
        </button>
        <div className="header-title">
          <Shield size={30} />
          <h1>Mobile Recharge Safety Training</h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-info">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>Safety Score: {safetyScore}/100</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Training Content */}
      <div className="training-content">
        <div className="step-header">
          <h2>{trainingSteps[currentStep].title}</h2>
          <p>{trainingSteps[currentStep].subtitle}</p>
        </div>
        
        <div className="step-content">
          {renderStepContent()}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button 
          className="nav-btn prev" 
          onClick={previousStep}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button 
          className="nav-btn next" 
          onClick={nextStep}
          disabled={currentStep === totalSteps}
        >
          Next Step
        </button>
      </div>

      {/* Red Flag Modal */}
      {showRedFlag && (
        <div className="modal-overlay">
          <div className="red-flag-modal">
            <div className="modal-icon">
              <AlertTriangle size={60} />
            </div>
            <h3>Red Flag Detected!</h3>
            <p>{redFlagMessage}</p>
            <div className="red-flag-details">
              {redFlagDetails.map((detail, index) => (
                <div key={index} className="detail-item">
                  <AlertTriangle size={16} />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
            <button className="understand-btn" onClick={closeRedFlag}>
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileRechargeTraining;
