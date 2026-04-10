import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { 
  Search, Globe, Lock, Shield, CheckCircle, XCircle, 
  Upload, FileText, AlertTriangle, Award, ChevronRight,
  RotateCcw, Home, User, Phone, MapPin, Briefcase,
  CreditCard, Eye, EyeOff, Check, X
} from 'lucide-react';
import Tooltip from '../../components/Tooltip';
import PageNotification from '../../components/PageNotification/PageNotification';
import './GovernmentSchemeTraining.css';

const GovernmentSchemeTraining = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const { completeModule } = useProgress();

  // Training state
  const [currentStep, setCurrentStep] = useState(0);
  const [showAvatarGuide, setShowAvatarGuide] = useState(true);
  const [userChoices, setUserChoices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    district: '',
    mobile: '',
    occupation: ''
  });
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [formError, setFormError] = useState('');
  const [uploadChoice, setUploadChoice] = useState(null);
  const [paymentChoice, setPaymentChoice] = useState(null);
  const [skillsLearned, setSkillsLearned] = useState([]);

  // Avatar guide content for each step
  const avatarContent = {
    english: [
      {
        title: "Welcome to Government Scheme Training",
        message: "Namaste! I am Seema Tai, your digital helper. Today I will help you safely apply for a government assistance scheme. Many scammers create fake websites, so let's learn to identify the real ones.",
        instruction: "Please select the official government website from the search results."
      },
      {
        title: "Website Verification",
        message: "Always check for two things: the lock icon (🔒) for secure connection and the website ending with .gov.in. Government websites never use .com or .net domains.",
        instruction: "Look at the address bar and verify this is the official website."
      },
      {
        title: "Starting Application",
        message: "Good! Now we are on the real government website. You can see 'Apply for Scheme' button. Click it to start your application.",
        instruction: "Click the 'Apply Now' button to open the application form."
      },
      {
        title: "Filling the Form",
        message: "Fill in your details carefully. But watch out! If any form asks for your ATM PIN or bank password, that's a RED FLAG! Government websites never ask for these.",
        instruction: "Fill in all the required fields. Be careful of suspicious questions."
      },
      {
        title: "Document Upload",
        message: "Now you need to upload documents. Always choose 'Masked Aadhaar' - it hides part of your Aadhaar number for safety. Never upload your full Aadhaar on unknown websites.",
        instruction: "Select the safer document upload option."
      },
      {
        title: "Payment Scam Alert!",
        message: "⚠️ WARNING! This is a common scam. Most government schemes are FREE to apply. They never ask for payment. If you see 'Processing Fee Required', it's a FRAUD!",
        instruction: "Make the correct choice - reject this payment request."
      },
      {
        title: "Success!",
        message: "Excellent! You successfully completed the application. You received a reference number. Save this for future tracking. Well done on avoiding all the scams!",
        instruction: "Your application is submitted safely."
      },
      {
        title: "Learning Summary",
        message: "Congratulations! You learned 5 important digital safety skills today. These skills will protect you from online fraud when applying for government schemes.",
        instruction: "Review what you learned and collect your badge."
      }
    ],
    hindi: [
      {
        title: "सरकारी योजना प्रशिक्षण में आपका स्वागत है",
        message: "नमस्ते! मैं सीमा ताई हूं, आपकी डिजिटल सहायक। आज मैं आपको सरकारी सहायता योजना के लिए सुरक्षित रूप से आवेदन करने में मदद करूंगी। कई घोटालेबाज नकली वेबसाइट बनाते हैं, इसलिए आइए असल की पहचान सीखें।",
        instruction: "कृपया खोज परिणामों से आधिकारिक सरकारी वेबसाइट चुनें।"
      },
      {
        title: "वेबसाइट सत्यापन",
        message: "हमेशा दो चीजों की जांच करें: सुरक्षित कनेक्शन के लिए ताला आइकन (🔒) और .gov.in से समाप्त होने वाली वेबसाइट। सरकारी वेबसाइटें कभी .com या .net डोमेन का उपयोग नहीं करती हैं।",
        instruction: "एड्रेस बार देखें और सत्यापित करें कि यह आधिकारिक वेबसाइट है।"
      },
      {
        title: "आवेदन शुरू करना",
        message: "अच्छा! अब हम असली सरकारी वेबसाइट पर हैं। आप 'योजना के लिए आवेदन करें' बटन देख सकते हैं। अपना आवेदन शुरू करने के लिए इसे क्लिक करें।",
        instruction: "आवेदन फॉर्म खोलने के लिए 'अभी आवेदन करें' बटन पर क्लिक करें।"
      },
      {
        title: "फॉर्म भरना",
        message: "ध्यान से अपना विवरण भरें। लेकिन सावधान रहें! यदि कोई फॉर्म आपसे आपका ATM PIN या बैंक पासवर्ड मांगता है, तो यह एक RED FLAG है! सरकारी वेबसाइटें कभी ये नहीं मांगती हैं।",
        instruction: "सभी आवश्यक फ़ील्ड भरें। संदिग्ध प्रश्नों से सावधान रहें।"
      },
      {
        title: "दस्तावेज़ अपलोड",
        message: "अब आपको दस्तावेज़ अपलोड करने होंगे। हमेशा 'मास्क्ड आधार' चुनें - यह आपके आधार नंबर का हिस्सा छुपाता है। कभी भी अपना पूरा आधार अज्ञात वेबसाइट पर अपलोड न करें।",
        instruction: "सुरक्षित दस्तावेज़ अपलोड विकल्प चुनें।"
      },
      {
        title: "भुगतान घोटाला अलर्ट!",
        message: "⚠️ चेतावनी! यह एक सामान्य घोटाला है। अधिकांश सरकारी योजनाओं के लिए आवेदन निःशुल्क है। वे कभी भुगतान नहीं मांगते। यदि आप 'प्रोसेसिंग शुल्क आवश्यक' देखते हैं, तो यह धोखाधड़ी है!",
        instruction: "सही विकल्प बनाएं - इस भुगतान अनुरोध को अस्वीकार करें।"
      },
      {
        title: "सफलता!",
        message: "उत्कृष्ट! आपने सफलतापूर्वक आवेदन पूरा किया। आपको एक संदर्भ नंबर मिला है। भविष्य की ट्रैकिंग के लिए इसे सहेजें। सभी घोटालों से बचने के लिए बहुत बढ़िया!",
        instruction: "आपका आवेदन सुरक्षित रूप से जमा किया गया है।"
      },
      {
        title: "सीखने का सारांश",
        message: "बधाई हो! आज आपने 5 महत्वपूर्ण डिजिटल सुरक्षा कौशल सीखे। ये कौशल सरकारी योजनाओं के लिए आवेदन करते समय आपको ऑनलाइन धोखाधड़ी से बचाएंगे।",
        instruction: "अपनी सीख को देखें और अपना बैज प्राप्त करें।"
      }
    ],
    marathi: [
      {
        title: "सरकारी योजना प्रशिक्षणात आपले स्वागत आहे",
        message: "नमस्कार! मी सीमा ताई, तुमची डिजिटल सहाय्यक. आज मी तुम्हाला सरकारी मदत योजनेसाठी सुरक्षितरित्या अर्ज करण्यात मदत करीन. अनेक फसवे फेक वेबसाइट्स बनवतात, म्हणून खऱ्याची ओळख शिकूया.",
        instruction: "कृपया शोध निकालांमधून अधिकृत सरकारी वेबसाइट निवडा."
      },
      {
        title: "वेबसाइट सत्यापन",
        message: "नेहमी दोन गोष्टींची तपासणी करा: सुरक्षित कनेक्शनसाठी कुलूप चिन्ह (🔒) आणि .gov.in ने संपणारी वेबसाइट. सरकारी वेबसाइट्स कधीही .com किंवा .net डोमेन वापरत नाहीत.",
        instruction: "अ‍ॅड्रेस बार पहा आणि सत्यापित करा की ही अधिकृत वेबसाइट आहे."
      },
      {
        title: "अर्ज सुरू करणे",
        message: "छान! आता आपण खऱ्या सरकारी वेबसाइटवर आहोत. तुम्ही 'योजनेसाठी अर्ज करा' बटण पाहू शकता. तुमचा अर्ज सुरू करण्यासाठी त्यावर क्लिक करा.",
        instruction: "अर्ज फॉर्म उघडण्यासाठी 'आता अर्ज करा' बटणावर क्लिक करा."
      },
      {
        title: "फॉर्म भरणे",
        message: "काळजीपूर्वक तुमचे तपशील भरा. पण सावधान! जर कोणताही फॉर्म तुमचा ATM PIN किंवा बँक पासवर्ड विचारत असेल, तर हा RED FLAG आहे! सरकारी वेबसाइट्स हे कधीच विचारत नाहीत.",
        instruction: "सर्व आवश्यक फील्ड भरा. संशयास्पद प्रश्नांपासून सावधान रहा."
      },
      {
        title: "दस्तऐवज अपलोड",
        message: "आता तुम्हाला दस्तऐवज अपलोड करावे लागतील. नेहमी 'मास्क्ड आधार' निवडा - हे तुमच्या आधार क्रमांकाचा भाग लपवते. कधीही तुमचा पूर्ण आधार अज्ञात वेबसाइटवर अपलोड करू नका.",
        instruction: "सुरक्षित दस्तऐवज अपलोड पर्याय निवडा."
      },
      {
        title: "पेमेंट फसवणूक अलर्ट!",
        message: "⚠️ चेतावणी! ही एक सामान्य फसवणूक आहे. बहुतेक सरकारी योजनांसाठी अर्ज करणे विनामूल्य आहे. ते कधीही पेमेंट मागत नाहीत. जर तुम्हाला 'प्रोसेसिंग शुल्क आवश्यक' दिसले, तर ही फसवणूक आहे!",
        instruction: "योग्य पर्याय निवडा - हा पेमेंट विनंती नाकारा."
      },
      {
        title: "यशस्वी!",
        message: "उत्कृष्ट! तुम्ही यशस्वीरित्या अर्ज पूर्ण केला. तुम्हाला एक संदर्भ क्रमांक मिळाला आहे. भविष्यातील ट्रॅकिंगसाठी हे जतन करा. सर्व फसवणुकांपासून बचावल्याबद्दल खूप छान!",
        instruction: "तुमचा अर्ज सुरक्षितरित्या सबमिट झाला आहे."
      },
      {
        title: "शिकण्याचा सारांश",
        message: "अभिनंदन! आज तुम्ही 5 महत्त्वाचे डिजिटल सुरक्षिती कौशल्ये शिकली. ही कौशल्ये सरकारी योजनांसाठी अर्ज करताना तुम्हाला ऑनलाइन फसवणुकीपासून वाचवतील.",
        instruction: "तुमचे शिकणे पहा आणि तुमचे बॅज संग्रहीत करा."
      }
    ]
  };

  const getCurrentContent = () => {
    const lang = currentLanguage === 'hinglish' ? 'hindi' : currentLanguage;
    return avatarContent[lang]?.[currentStep] || avatarContent.english[currentStep];
  };

  // Steps definition
  const totalSteps = 8;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);
    if (website === 'official') {
      setUserChoices([...userChoices, { step: 1, correct: true }]);
      setTimeout(() => nextStep(), 1000);
    } else {
      setShowWarning(true);
      setUserChoices([...userChoices, { step: 1, correct: false }]);
    }
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.age || !formData.district || !formData.mobile) {
      setFormError(t('fillAllFields') || 'Please fill all required fields');
      return;
    }
    setFormError('');
    setUserChoices([...userChoices, { step: 4, correct: true }]);
    nextStep();
  };

  const handleDocumentChoice = (choice) => {
    setUploadChoice(choice);
    if (choice === 'masked') {
      setUserChoices([...userChoices, { step: 5, correct: true }]);
      setTimeout(() => nextStep(), 1500);
    }
  };

  const handlePaymentChoice = (choice) => {
    setPaymentChoice(choice);
    if (choice === 'cancel') {
      setUserChoices([...userChoices, { step: 6, correct: true }]);
      setTimeout(() => nextStep(), 1500);
    }
  };

  const finishTraining = () => {
    const learnedSkills = [
      'Identifying official government websites',
      'Checking secure browser connections',
      'Filling online forms safely',
      'Uploading documents securely',
      'Avoiding scam payments'
    ];
    setSkillsLearned(learnedSkills);
    completeModule('governmentScheme', 90);
    navigate('/sandbox');
  };

  // Render different steps
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="search-results-step">
            <div className="search-header">
              <Search size={20} />
              <span>Search Results for: Sanjay Gandhi Niradhar Anudan Yojana</span>
            </div>
            <div className="results-list">
              <div 
                className={`search-result ${selectedWebsite === 'official' ? 'selected-correct' : ''} ${selectedWebsite && selectedWebsite !== 'official' ? 'dimmed' : ''}`}
                onClick={() => handleWebsiteSelect('official')}
              >
                <div className="result-icon official">
                  <Globe size={24} />
                </div>
                <div className="result-content">
                  <h4>maharashtra.gov.in/sanjay-gandhi-scheme</h4>
                  <p>Official Government Portal - Sanjay Gandhi Niradhar Anudan Yojana</p>
                  {selectedWebsite === 'official' && (
                    <div className="feedback-message correct">
                      <CheckCircle size={16} />
                      <span>✓ Secure! This is official .gov.in website</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div 
                className={`search-result ${selectedWebsite === 'fake1' ? 'selected-wrong' : ''} ${selectedWebsite && selectedWebsite !== 'fake1' ? 'dimmed' : ''}`}
                onClick={() => handleWebsiteSelect('fake1')}
              >
                <div className="result-icon official">
                  <Globe size={24} />
                </div>
                <div className="result-content">
                  <h4>sanjay-gandhi-benefits-help.com</h4>
                  <p>Apply for Benefits - Quick Processing</p>
                  {selectedWebsite === 'fake1' && (
                    <div className="feedback-message wrong">
                      <AlertTriangle size={16} />
                      <span>⚠ Suspicious! .com domain is not official</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div 
                className={`search-result ${selectedWebsite === 'fake2' ? 'selected-wrong' : ''} ${selectedWebsite && selectedWebsite !== 'fake2' ? 'dimmed' : ''}`}
                onClick={() => handleWebsiteSelect('fake2')}
              >
                <div className="result-icon official">
                  <Globe size={24} />
                </div>
                <div className="result-content">
                  <h4>maharashtra-scheme-support.net</h4>
                  <p>Government Scheme Assistance Center</p>
                  {selectedWebsite === 'fake2' && (
                    <div className="feedback-message wrong">
                      <AlertTriangle size={16} />
                      <span>⚠ Suspicious! .net domain is not official</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {showWarning && (
              <div className="warning-overlay">
                <div className="warning-modal">
                  <AlertTriangle size={48} className="warning-icon" />
                  <h3>⚠️ Warning!</h3>
                  <p>This website is NOT an official government portal.</p>
                  <ul>
                    <li>Domain does not end with .gov.in</li>
                    <li>Suspicious website name</li>
                    <li>Not a verified government domain</li>
                  </ul>
                  <button onClick={() => setShowWarning(false)} className="warning-btn">
                    I Understand, Let Me Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="website-verification-step">
            <div className="browser-mockup">
              <div className="browser-address-bar">
                <Tooltip content="tooltipSecure" position="bottom">
                  <Lock size={16} className="secure-icon" />
                </Tooltip>
                <span className="url-text">https://maharashtra.gov.in/sanjay-gandhi-scheme</span>
                <Tooltip content="tooltipOfficial" position="bottom">
                  <span className="secure-badge">Secure</span>
                </Tooltip>
              </div>
              <div className="browser-content">
                <div className="govt-header">
                  <img src="/govt-logo.png" alt="Government Logo" className="govt-logo" />
                  <h2>Government of Maharashtra</h2>
                  <p>Sanjay Gandhi Niradhar Anudan Yojana</p>
                </div>
                <div className="verification-checklist">
                  <div className="check-item">
                    <CheckCircle size={20} className="check-icon" />
                    <span>Website ends with .gov.in ✓</span>
                  </div>
                  <div className="check-item">
                    <CheckCircle size={20} className="check-icon" />
                    <span>Secure connection (HTTPS) ✓</span>
                  </div>
                  <div className="check-item">
                    <CheckCircle size={20} className="check-icon" />
                    <span>Official government logo ✓</span>
                  </div>
                </div>
                <button className="next-step-btn" onClick={nextStep}>
                  Continue <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="scheme-landing-step">
            <div className="scheme-card">
              <div className="scheme-header">
                <Award size={48} className="scheme-icon" />
                <h2>Sanjay Gandhi Niradhar Anudan Yojana</h2>
                <p>Financial Assistance for Destitute Persons</p>
              </div>
              <div className="scheme-details">
                <div className="detail-item">
                  <Shield size={20} />
                  <span>Monthly Assistance: ₹600</span>
                </div>
                <div className="detail-item">
                  <User size={20} />
                  <span>For persons above 65 years or disabled</span>
                </div>
                <div className="detail-item">
                  <FileText size={20} />
                  <span>Required: Aadhaar, Income Certificate</span>
                </div>
              </div>
              <button className="apply-now-btn" onClick={nextStep}>
                Apply Now <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="application-form-step">
            <h3>Application Form</h3>
            <div className="form-container">
              <div className="form-field">
                <label><User size={16} /> Full Name *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-row">
                <div className="form-field">
                  <label>Age *</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="Enter age"
                  />
                </div>
                <div className="form-field">
                  <label><Phone size={16} /> Mobile Number *</label>
                  <input 
                    type="tel" 
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label><MapPin size={16} /> District *</label>
                <select 
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value})}
                >
                  <option value="">Select District</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="pune">Pune</option>
                  <option value="nagpur">Nagpur</option>
                  <option value="nashik">Nashik</option>
                  <option value="aurangabad">Aurangabad</option>
                </select>
              </div>
              
              <div className="form-field">
                <label><Briefcase size={16} /> Occupation</label>
                <input 
                  type="text" 
                  value={formData.occupation}
                  onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                  placeholder="Enter occupation (if any)"
                />
              </div>

              {/* Suspicious field - RED FLAG */}
              <div className="form-field suspicious-field">
                <label className="suspicious-label">
                  <CreditCard size={16} /> Enter ATM PIN for Identity Verification
                  <span className="required-badge">Required</span>
                </label>
                <div className="suspicious-input-group">
                  <input type="password" placeholder="Enter 4-digit PIN" disabled />
                  <div className="red-flag-badge">
                    <AlertTriangle size={16} />
                    <span>RED FLAG!</span>
                  </div>
                </div>
                <p className="suspicious-note">
                  ⚠️ Government websites NEVER ask for ATM PIN or bank passwords!
                </p>
              </div>

              {formError && (
                <div className="form-error">
                  <AlertTriangle size={16} />
                  {formError}
                </div>
              )}
              
              <button className="submit-form-btn" onClick={handleFormSubmit}>
                Continue to Document Upload <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="document-upload-step">
            <h3>Upload Required Documents</h3>
            <div className="upload-container">
              <div className="upload-item">
                <div className="upload-icon">
                  <FileText size={40} />
                </div>
                <h4>Aadhaar Card</h4>
                <p>Select upload type:</p>
                
                <div className="upload-options">
                  <button 
                    className={`upload-option ${uploadChoice === 'full' ? 'selected' : ''}`}
                    onClick={() => handleDocumentChoice('full')}
                  >
                    <div className="option-header">
                      <Eye size={20} />
                      <span>Full Aadhaar</span>
                    </div>
                    <p className="option-desc">Shows complete Aadhaar number</p>
                    {uploadChoice === 'full' && (
                      <div className="option-warning">
                        <AlertTriangle size={16} />
                        <span>Less secure - shows full number</span>
                      </div>
                    )}
                  </button>
                  
                  <button 
                    className={`upload-option ${uploadChoice === 'masked' ? 'selected correct' : ''}`}
                    onClick={() => handleDocumentChoice('masked')}
                  >
                    <div className="option-header">
                      <EyeOff size={20} />
                      <span>Masked Aadhaar</span>
                      <CheckCircle size={20} className="correct-icon" />
                    </div>
                    <p className="option-desc">Hides first 8 digits (XXXX XXXX 1234)</p>
                    {uploadChoice === 'masked' && (
                      <div className="option-success">
                        <CheckCircle size={16} />
                        <span>✓ Safer choice - protects your identity!</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="upload-item disabled">
                <div className="upload-icon">
                  <FileText size={40} />
                </div>
                <h4>Income Certificate</h4>
                <p>Upload PDF or image (Max 2MB)</p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="payment-scam-step">
            <div className="scam-popup-overlay">
              <div className="scam-popup">
                <div className="popup-header suspicious">
                  <AlertTriangle size={32} />
                  <h3>Processing Fee Required</h3>
                </div>
                <div className="popup-content">
                  <p className="fee-amount">₹500</p>
                  <p className="fee-desc">Payment required to submit application</p>
                  <div className="fee-details">
                    <div className="fee-row">
                      <span>Application Processing</span>
                      <span>₹300</span>
                    </div>
                    <div className="fee-row">
                      <span>Document Verification</span>
                      <span>₹200</span>
                    </div>
                    <div className="fee-row total">
                      <span>Total</span>
                      <span>₹500</span>
                    </div>
                  </div>
                </div>
                <div className="popup-actions">
                  <button 
                    className={`action-btn cancel ${paymentChoice === 'cancel' ? 'selected' : ''}`}
                    onClick={() => handlePaymentChoice('cancel')}
                  >
                    <X size={20} />
                    Cancel - This is a scam
                  </button>
                  <button 
                    className={`action-btn pay ${paymentChoice === 'pay' ? 'selected wrong' : ''}`}
                    onClick={() => handlePaymentChoice('pay')}
                  >
                    <CreditCard size={20} />
                    Pay Now
                  </button>
                </div>
                
                {paymentChoice === 'pay' && (
                  <div className="wrong-choice-warning">
                    <AlertTriangle size={20} />
                    <p>❌ Wrong! Government schemes NEVER charge application fees!</p>
                  </div>
                )}
                
                {paymentChoice === 'cancel' && (
                  <div className="correct-choice-message">
                    <CheckCircle size={20} />
                    <p>✓ Correct! You identified a scam!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="success-step">
            <div className="success-card">
              <div className="success-icon">
                <CheckCircle size={64} />
              </div>
              <h2>Application Submitted Successfully!</h2>
              <div className="reference-box">
                <p>Reference ID:</p>
                <h3>SGN-843829</h3>
                <p className="save-note">Please save this number for tracking</p>
              </div>
              <div className="success-details">
                <div className="detail-row">
                  <span>Applicant Name:</span>
                  <strong>{formData.name || 'Ramesh Patil'}</strong>
                </div>
                <div className="detail-row">
                  <span>Scheme:</span>
                  <strong>Sanjay Gandhi Niradhar Anudan Yojana</strong>
                </div>
                <div className="detail-row">
                  <span>Status:</span>
                  <span className="status-badge">Under Review</span>
                </div>
              </div>
              <button className="next-step-btn" onClick={nextStep}>
                View Learning Summary <Award size={20} />
              </button>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="summary-step">
            <div className="summary-card">
              <h2>🎉 Congratulations!</h2>
              <p className="summary-intro">You successfully learned 5 important digital safety skills:</p>
              
              <div className="skills-grid">
                <div className="skill-item">
                  <div className="skill-icon">
                    <Globe size={28} />
                  </div>
                  <h4>Website Verification</h4>
                  <p>Check for .gov.in domain</p>
                  <CheckCircle size={20} className="learned-badge" />
                </div>
                
                <div className="skill-item">
                  <div className="skill-icon">
                    <Lock size={28} />
                  </div>
                  <h4>Secure Connections</h4>
                  <p>Look for HTTPS and lock icon</p>
                  <CheckCircle size={20} className="learned-badge" />
                </div>
                
                <div className="skill-item">
                  <div className="skill-icon">
                    <FileText size={28} />
                  </div>
                  <h4>Safe Form Filling</h4>
                  <p>Never share ATM PIN</p>
                  <CheckCircle size={20} className="learned-badge" />
                </div>
                
                <div className="skill-item">
                  <div className="skill-icon">
                    <Upload size={28} />
                  </div>
                  <h4>Document Upload</h4>
                  <p>Use Masked Aadhaar</p>
                  <CheckCircle size={20} className="learned-badge" />
                </div>
                
                <div className="skill-item">
                  <div className="skill-icon">
                    <AlertTriangle size={28} />
                  </div>
                  <h4>Scam Detection</h4>
                  <p>Avoid fake payment requests</p>
                  <CheckCircle size={20} className="learned-badge" />
                </div>
              </div>
              
              <div className="badge-earned">
                <Award size={48} />
                <div>
                  <h3>Digital Safety Expert</h3>
                  <p>Badge Earned!</p>
                </div>
              </div>
              
              <div className="summary-actions">
                <button className="finish-btn" onClick={finishTraining}>
                  <Home size={20} />
                  Back to Sandbox
                </button>
                <button className="replay-btn" onClick={() => window.location.reload()}>
                  <RotateCcw size={20} />
                  Practice Again
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const content = getCurrentContent();

  return (
    <div className="government-scheme-training">
      {/* Page Notification */}
      <PageNotification pageName="Government Scheme Training" />
      
      {/* Header */}
      <div className="training-header">
        <h1>{content.title}</h1>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }} />
          <span>Step {currentStep + 1} of {totalSteps}</span>
        </div>
      </div>

      {/* Government Scheme Safety Tips - Important! */}
      <div className="training-tips">
        <h3>⚠️ Scheme Registration Safety - Read Before You Start</h3>
        <div className="tips-grid">
          <div className="tip-card important">
            <span className="tip-icon">📋</span>
            <p><strong>Use official portals</strong> only - maharashtra.gov.in</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">💳</span>
            <p><strong>Never pay</strong> for scheme registration - It's FREE</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">🔐</span>
            <p><strong>Keep documents safe</strong> - Don't share Aadhaar copies</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">🏛️</span>
            <p><strong>Visit CSC centers</strong> - For help with registration</p>
          </div>
        </div>
      </div>

      <div className="training-container">
        {/* Left Panel: Avatar Guide */}
        <div className={`avatar-panel ${showAvatarGuide ? 'visible' : 'hidden'}`}>
          <div className="avatar-container">
            <div className="avatar-image">
              <div className="avatar-placeholder">
                <User size={80} />
                <span>Seema Tai</span>
                <small>Digital Helper</small>
              </div>
            </div>
            
            <div className="avatar-message">
              <p>{content.message}</p>
            </div>
            
            <div className="instruction-box">
              <ChevronRight size={20} />
              <span>{content.instruction}</span>
            </div>
          </div>
          
          <button 
            className="toggle-guide-btn"
            onClick={() => setShowAvatarGuide(!showAvatarGuide)}
          >
            {showAvatarGuide ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>

        {/* Right Panel: Browser Simulation */}
        <div className="browser-panel">
          <div className="browser-mockup">
            <div className="browser-toolbar">
              <div className="browser-buttons">
                <span className="btn red"></span>
                <span className="btn yellow"></span>
                <span className="btn green"></span>
              </div>
              <div className="address-bar">
                <Lock size={14} />
                <span>https://maharashtra.gov.in</span>
              </div>
            </div>
            <div className="browser-viewport">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="step-navigation">
        <button 
          className="nav-btn prev"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <div className="step-indicators">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <span 
              key={idx} 
              className={`indicator ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
            />
          ))}
        </div>
        <button 
          className="nav-btn next"
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1}
        >
          Skip Step
        </button>
      </div>
    </div>
  );
};

export default GovernmentSchemeTraining;
