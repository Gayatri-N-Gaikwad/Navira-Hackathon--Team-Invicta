import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  english: {
    // Navigation
    home: 'Home',
    sandbox: 'Sandbox',
    quiz: 'Quiz',
    about: 'About',
    dashboard: 'Dashboard',
    badges: 'Badges',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Home
    welcome: 'Welcome to GuardianSathi',
    welcomeUser: 'Welcome',
    subtitle: 'Your trusted companion for digital safety',
    heroTitle: 'Stay Safe in the Digital World',
    heroSubtitle: 'Learn how to protect yourself from online scams',
    exploreSandbox: 'Explore Sandbox',
    takeQuiz: 'Take Quiz',
    
    // Sandbox
    bankingTraining: 'Banking Training',
    governmentTraining: 'Government Training',
    deepfakeTraining: 'Deepfake Scam Simulator',
    governmentSchemeTraining: 'Government Scheme Application',
    digilockerTraining: 'DigiLocker Security Training',
    startTraining: 'Start Training',
    safeEnvironment: 'Safe Environment',
    
    // Progress
    continueJourney: 'Continue your digital safety journey',
    overallScore: 'Overall Safety Score',
    completed: 'Completed',
    inProgress: 'In Progress',
    locked: 'Locked',
    
    // Badges
    scamDetector: 'Scam Detector',
    sharpObserver: 'Sharp Observer',
    safeUser: 'Safe User',
    badgeLocked: 'Complete more training to unlock',
    
    // Voice
    audioGuide: 'Audio Guide',
    playInstructions: 'Play Instructions',
    pause: 'Pause',
    play: 'Play',
    audioGuidePlaying: 'Audio Guide Playing',
    audioGuidePaused: 'Audio Guide Paused',
    
    // Common
    close: 'Close',
    selectLanguage: 'Select Language',
    tagline: 'Stay Safe Online',
    
    // Page Notification - Shows when entering a page
    pageNotification: 'This is the {page} page',
    pageHome: 'Home',
    pageSandbox: 'Sandbox',
    pageQuiz: 'Quiz',
    pageAbout: 'About',
    pageDashboard: 'Dashboard',
    pageBadges: 'Badges',
    pageBankingTraining: 'Banking Training',
    pageGovernmentIDTraining: 'Government ID Training',
    pageDeepfakeTraining: 'Deepfake Training',
    pageGovernmentSchemeTraining: 'Government Scheme Training',
    pageDigiLockerTraining: 'DigiLocker Training',
    
    // Tooltips - Page Descriptions
    tooltipHome: 'This is the Home page - Your starting point to explore digital safety features',
    tooltipSandbox: 'This is the Sandbox page - Practice scam scenarios in a safe environment',
    tooltipQuiz: 'This is the Quiz page - Test your knowledge about digital safety and scams',
    tooltipAbout: 'This is the About page - Learn about GuardianSathi and our mission',
    tooltipDashboard: 'This is the Dashboard page - View your learning progress and achievements',
    tooltipBadges: 'This is the Badges page - See all your earned achievements and milestones',
    tooltipLogin: 'Sign in to your account',
    tooltipLogout: 'Sign out from your account',
    tooltipLanguage: 'Change display language',
    tooltipVoice: 'Listen to audio instructions',
    tooltipStartTraining: 'Click to begin this training module',
    tooltipLocked: 'Complete previous modules to unlock',
    tooltipCompleted: 'You have completed this module!',
    tooltipProgress: 'Your current learning progress',
    tooltipElderlyMode: 'Toggle larger text for easier reading',
    tooltipMenu: 'Open navigation menu',
    tooltipClose: 'Close this window',
    tooltipBack: 'Go back to previous page',
    tooltipNext: 'Go to next step',
    tooltipHelp: 'Get help and guidance',
    tooltipBankingTraining: 'This is Banking Training - Learn about OTP fraud, UPI scams, and fake banking calls',
    tooltipGovernmentTraining: 'This is Government ID Training - Learn about Aadhaar scams and fake government websites',
    tooltipDeepfakeTraining: 'This is Deepfake Training - Learn to identify AI-generated video scams',
    tooltipGovernmentSchemeTraining: 'This is Government Scheme Training - Learn to safely apply for government assistance',
    tooltipDigiLockerTraining: 'This is DigiLocker Training - Learn to safely use DigiLocker for documents',
    tooltipOTP: 'One-Time Password - Never share this!',
    tooltipSecure: 'This is a secure connection',
    tooltipWarning: 'Warning: Potential security risk',
    tooltipOfficial: 'Official government website',
    tooltipFake: 'Suspicious website - Do not trust',
  },
  hindi: {
    // Navigation
    home: 'होम',
    sandbox: 'सैंडबॉक्स',
    quiz: 'क्विज़',
    about: 'हमारे बारे में',
    dashboard: 'डैशबोर्ड',
    badges: 'बैज',
    login: 'लॉग इन',
    register: 'रजिस्टर',
    logout: 'लॉग आउट',
    
    // Home
    welcome: 'GuardianSathi में आपका स्वागत है',
    welcomeUser: 'स्वागत है',
    subtitle: 'डिजिटल सुरक्षा के लिए आपका साथी',
    heroTitle: 'डिजिटल दुनिया में सुरक्षित रहें',
    heroSubtitle: 'ऑनलाइन धोखाधड़ी से खुद को बचाना सीखें',
    exploreSandbox: 'सैंडबॉक्स देखें',
    takeQuiz: 'क्विज़ दें',
    
    // Sandbox
    bankingTraining: 'बैंकिंग प्रशिक्षण',
    governmentTraining: 'सरकारी प्रशिक्षण',
    deepfakeTraining: 'डीपफेक घोटाला सिम्युलेटर',
    governmentSchemeTraining: 'सरकारी योजना आवेदन',
    digilockerTraining: 'डिजीलॉकर सुरक्षा प्रशिक्षण',
    startTraining: 'प्रशिक्षण शुरू करें',
    safeEnvironment: 'सुरक्षित वातावरण',
    
    // Progress
    continueJourney: 'अपनी डिजिटल सुरक्षा यात्रा जारी रखें',
    overallScore: 'कुल सुरक्षा स्कोर',
    completed: 'पूर्ण',
    inProgress: 'प्रगति में',
    locked: 'लॉक्ड',
    
    // Badges
    scamDetector: 'स्कैम डिटेक्टर',
    sharpObserver: 'तीक्ष्ण पर्यवेक्षक',
    safeUser: 'सुरक्षित उपयोगकर्ता',
    badgeLocked: 'अनलॉक करने के लिए और प्रशिक्षण पूरा करें',
    
    // Voice
    audioGuide: 'ऑडियो गाइड',
    playInstructions: 'निर्देश चलाएं',
    pause: 'रोकें',
    play: 'चलाएं',
    audioGuidePlaying: 'ऑडियो गाइड चल रहा है',
    audioGuidePaused: 'ऑडियो गाइड रोका गया',
    
    // Common
    close: 'बंद करें',
    selectLanguage: 'भाषा चुनें',
    tagline: 'ऑनलाइन सुरक्षित रहें',
    
    // Page Notification - Shows when entering a page
    pageNotification: 'यह {page} पेज है',
    pageHome: 'होम',
    pageSandbox: 'सैंडबॉक्स',
    pageQuiz: 'क्विज़',
    pageAbout: 'अबाउट',
    pageDashboard: 'डैशबोर्ड',
    pageBadges: 'बैजेस',
    pageBankingTraining: 'बैंकिंग प्रशिक्षण',
    pageGovernmentIDTraining: 'सरकारी आईडी प्रशिक्षण',
    pageDeepfakeTraining: 'डीपफेक प्रशिक्षण',
    pageGovernmentSchemeTraining: 'सरकारी योजना प्रशिक्षण',
    pageDigiLockerTraining: 'डिजीलॉकर प्रशिक्षण',
    
    // Tooltips - Page Descriptions
    tooltipHome: 'यह होम पेज है - डिजिटल सुरक्षा सुविधाएं एक्सप्लोर करने का प्रारंभिक बिंदु',
    tooltipSandbox: 'यह सैंडबॉक्स पेज है - सुरक्षित वातावरण में घोटाले परिदृश्यों का अभ्यास करें',
    tooltipQuiz: 'यह क्विज़ पेज है - डिजिटल सुरक्षा और घोटालों के बारे में अपने ज्ञान का परीक्षण करें',
    tooltipAbout: 'यह अबाउट पेज है - GuardianSathi और हमारे मिशन के बारे में जानें',
    tooltipDashboard: 'यह डैशबोर्ड पेज है - अपनी सीखने की प्रगति और उपलब्धियां देखें',
    tooltipBadges: 'यह बैजेस पेज है - अपनी सभी अर्जित उपलब्धियां और मील के पत्थर देखें',
    tooltipLogin: 'अपने खाते में साइन इन करें',
    tooltipLogout: 'अपने खाते से साइन आउट करें',
    tooltipLanguage: 'प्रदर्शन भाषा बदलें',
    tooltipVoice: 'ऑडियो निर्देश सुनें',
    tooltipStartTraining: 'इस प्रशिक्षण मॉड्यूल को शुरू करने के लिए क्लिक करें',
    tooltipLocked: 'अनलॉक करने के लिए पिछले मॉड्यूल पूरे करें',
    tooltipCompleted: 'आपने यह मॉड्यूल पूरा कर लिया है!',
    tooltipProgress: 'आपकी वर्तमान सीखने की प्रगति',
    tooltipElderlyMode: 'आसान पढ़ने के लिए बड़ा टेक्स्ट टॉगल करें',
    tooltipMenu: 'नेविगेशन मेनू खोलें',
    tooltipClose: 'इस विंडो को बंद करें',
    tooltipBack: 'पिछले पेज पर जाएं',
    tooltipNext: 'अगले चरण पर जाएं',
    tooltipHelp: 'मदद और मार्गदर्शन प्राप्त करें',
    tooltipBankingTraining: 'यह बैंकिंग प्रशिक्षण है - ओटीपी धोखाधड़ी, यूपीपी घोटालों और नकली बैंकिंग कॉल के बारे में जानें',
    tooltipGovernmentTraining: 'यह सरकारी आईडी प्रशिक्षण है - आधार घोटालों और नकली सरकारी वेबसाइटों के बारे में जानें',
    tooltipDeepfakeTraining: 'यह डीपफेक प्रशिक्षण है - एआई-जनित वीडियो घोटालों की पहचान करना सीखें',
    tooltipGovernmentSchemeTraining: 'यह सरकारी योजना प्रशिक्षण है - सरकारी सहायता के लिए सुरक्षित रूप से आवेदन करना सीखें',
    tooltipDigiLockerTraining: 'यह डिजीलॉकर प्रशिक्षण है - दस्तावेजों के लिए डिजीलॉकर का सुरक्षित उपयोग करना सीखें',
    tooltipOTP: 'वन-टाइम पासवर्ड - इसे कभी साझा न करें!',
    tooltipSecure: 'यह एक सुरक्षित कनेक्शन है',
    tooltipWarning: 'चेतावनी: संभावित सुरक्षा जोखिम',
    tooltipOfficial: 'आधिकारिक सरकारी वेबसाइट',
    tooltipFake: 'संदिग्ध वेबसाइट - विश्वास न करें',
  },
  marathi: {
    // Navigation
    home: 'होम',
    sandbox: 'सॅंडबॉक्स',
    quiz: 'क्विझ',
    about: 'आमच्याबद्दल',
    dashboard: 'डॅशबोर्ड',
    badges: 'बॅजेस',
    login: 'लॉग इन',
    register: 'रजिस्टर',
    logout: 'लॉग आउट',
    
    // Home
    welcome: 'GuardianSathi मध्ये आपले स्वागत आहे',
    welcomeUser: 'स्वागत आहे',
    subtitle: 'डिजिटल सुरक्षितीसाठी तुमचा साथीदार',
    heroTitle: 'डिजिटल जगात सुरक्षित रहा',
    heroSubtitle: 'ऑनलाइन फसवणुकीपासून स्वतःला वाचवणे शिका',
    exploreSandbox: 'सॅंडबॉक्स पहा',
    takeQuiz: 'क्विझ द्या',
    
    // Sandbox
    bankingTraining: 'बँकिंग प्रशिक्षण',
    governmentTraining: 'सरकारी प्रशिक्षण',
    deepfakeTraining: 'डीपफेक फसवणूक सिम्युलेटर',
    governmentSchemeTraining: 'सरकारी योजना अर्ज प्रशिक्षण',
    digilockerTraining: 'डिजीलॉकर सुरक्षा प्रशिक्षण',
    startTraining: 'प्रशिक्षण सुरू करा',
    safeEnvironment: 'सुरक्षित वातावरण',
    
    // Progress
    continueJourney: 'तुमची डिजिटल सुरक्षा प्रवास सुरू ठेवा',
    overallScore: 'एकंदर सुरक्षा स्कोर',
    completed: 'पूर्ण',
    inProgress: 'प्रगतीत',
    locked: 'लॉक्ड',
    
    // Badges
    scamDetector: 'स्कॅम डिटेक्टर',
    sharpObserver: 'तीक्ष्ण निरीक्षक',
    safeUser: 'सुरक्षित वापरकर्ता',
    badgeLocked: 'अनलॉक करण्यासाठी अधिक प्रशिक्षण पूर्ण करा',
    
    // Voice
    audioGuide: 'ऑडियो गाईड',
    playInstructions: 'सूचना वाजवा',
    pause: 'थांबा',
    play: 'वाजवा',
    audioGuidePlaying: 'ऑडियो गाईड सुरू आहे',
    audioGuidePaused: 'ऑडियो गाईड थांबवले',
    
    // Common
    close: 'बंद करा',
    selectLanguage: 'भाषा निवडा',
    tagline: 'ऑनलाइन सुरक्षित रहा',
    
    // Page Notification - Shows when entering a page
    pageNotification: 'हा {page} पेज आहे',
    pageHome: 'होम',
    pageSandbox: 'सॅंडबॉक्स',
    pageQuiz: 'क्विझ',
    pageAbout: 'अबाउट',
    pageDashboard: 'डॅशबोर्ड',
    pageBadges: 'बॅजेस',
    pageBankingTraining: 'बँकिंग प्रशिक्षण',
    pageGovernmentIDTraining: 'सरकारी आयडी प्रशिक्षण',
    pageDeepfakeTraining: 'डीपफेक प्रशिक्षण',
    pageGovernmentSchemeTraining: 'सरकारी योजना प्रशिक्षण',
    pageDigiLockerTraining: 'डिजीलॉकर प्रशिक्षण',
    
    // Tooltips - Page Descriptions
    tooltipHome: 'हा होम पेज आहे - डिजिटल सुरक्षा वैशिष्ट्ये एक्सप्लोर करण्याची सुरुवात',
    tooltipSandbox: 'हा सॅंडबॉक्स पेज आहे - सुरक्षित वातावरणात फसवणूक परिस्थितींचा सराव करा',
    tooltipQuiz: 'हा क्विझ पेज आहे - डिजिटल सुरक्षिती आणि फसवणुकांबद्दल तुमच्या ज्ञानाची चाचणी घ्या',
    tooltipAbout: 'हा अबाउट पेज आहे - GuardianSathi आणि आमच्या मिशनबद्दल जाणून घ्या',
    tooltipDashboard: 'हा डॅशबोर्ड पेज आहे - तुमची शिकण्याची प्रगती आणि उपलब्ध्या पहा',
    tooltipBadges: 'हा बॅजेस पेज आहे - तुमच्या सर्व मिळवलेल्या उपलब्धी आणि मैलखुणा पहा',
    tooltipLogin: 'तुमच्या खात्यात साइन इन करा',
    tooltipLogout: 'तुमच्या खात्यातून साइन आउट करा',
    tooltipLanguage: 'प्रदर्शन भाषा बदला',
    tooltipVoice: 'ऑडियो सूचना ऐका',
    tooltipStartTraining: 'हा प्रशिक्षण मॉड्यूल सुरू करण्यासाठी क्लिक करा',
    tooltipLocked: 'अनलॉक करण्यासाठी मागील मॉड्यूल्स पूर्ण करा',
    tooltipCompleted: 'तुम्ही हा मॉड्यूल पूर्ण केला आहे!',
    tooltipProgress: 'तुमची सध्याची शिकण्याची प्रगती',
    tooltipElderlyMode: 'सुलभ वाचनासाठी मोठा मजकूर टॉगल करा',
    tooltipMenu: 'नेविगेशन मेनू उघडा',
    tooltipClose: 'ही विंडो बंद करा',
    tooltipBack: 'मागील पृष्ठावर जा',
    tooltipNext: 'पुढील टप्प्यावर जा',
    tooltipHelp: 'मदत आणि मार्गदर्शन मिळवा',
    tooltipBankingTraining: 'हा बँकिंग प्रशिक्षण आहे - ओटीपी फसवणूक, यूपीआय फसवणूक आणि बनावट बँकिंग कॉलबद्दल जाणून घ्या',
    tooltipGovernmentTraining: 'हा सरकारी आयडी प्रशिक्षण आहे - आधार फसवणूक आणि बनावट सरकारी वेबसाइट्सबद्दल जाणून घ्या',
    tooltipDeepfakeTraining: 'हा डीपफेक प्रशिक्षण आहे - एआय-जनित व्हिडिओ फसवणुकी ओळखणे शिका',
    tooltipGovernmentSchemeTraining: 'हा सरकारी योजना प्रशिक्षण आहे - सरकारी मदतीसाठी सुरक्षितरित्या अर्ज करणे शिका',
    tooltipDigiLockerTraining: 'हा डिजीलॉकर प्रशिक्षण आहे - दस्तऐवजांसाठी डिजीलॉकर सुरक्षितरित्या वापरणे शिका',
    tooltipOTP: 'वन-टाइम पासवर्ड - हा कधीही शेअर करू नका!',
    tooltipSecure: 'हा एक सुरक्षित जोडणी आहे',
    tooltipWarning: 'चेतावणी: संभाव्य सुरक्षा धोका',
    tooltipOfficial: 'अधिकृत सरकारी वेबसाइट',
    tooltipFake: 'संशयास्पद वेबसाइट - विश्वास ठेवू नका',
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('english');

  useEffect(() => {
    const saved = localStorage.getItem('guardiansathi_language');
    if (saved && translations[saved]) {
      setCurrentLanguage(saved);
    }
  }, []);

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setCurrentLanguage(lang);
      localStorage.setItem('guardiansathi_language', lang);
    }
  };

  const t = (key) => {
    return translations[currentLanguage][key] || translations.english[key] || key;
  };

  const value = {
    currentLanguage,
    setLanguage,
    t,
    languages: [
      { code: 'english', label: 'English', native: 'English' },
      { code: 'hindi', label: 'हिंदी', native: 'Hindi' },
      { code: 'marathi', label: 'मराठी', native: 'Marathi' }
    ]
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
