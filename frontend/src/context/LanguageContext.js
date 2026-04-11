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
    mobileRechargeTraining: 'Mobile Recharge Safety',
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
    
    // Problem Section
    whyDigitalSafetyMatters: 'Why Digital Safety Matters',
    onlineScamsIncreasing: 'Online Scams Increasing',
    onlineScamsDescription: 'Cybercrime is on the rise, with millions falling victim to online scams every year.',
    peopleLoseMoneyIdentity: 'People Lose Money & Identity',
    peopleLoseMoneyDescription: 'Financial fraud and identity theft can have devastating consequences for victims.',
    lackOfAwareness: 'Lack of Awareness',
    lackOfAwarenessDescription: 'Many users, especially elderly and beginners, lack the knowledge to identify threats.',
    
    // Solution Section
    howGuardianSathiHelps: 'How GuardianSathi Helps',
    interactiveLearning: 'Interactive Learning',
    interactiveLearningDescription: 'Learn through hands-on experience in a safe, simulated environment.',
    safePracticeEnvironment: 'Safe Practice Environment',
    safePracticeEnvironmentDescription: 'Make mistakes and learn from them without any real-world consequences.',
    realWorldScenarios: 'Real-World Scenarios',
    realWorldScenariosDescription: 'Practice with realistic scam scenarios you\'re likely to encounter.',
    
    // Awareness Section
    didYouKnow: 'Did You Know?',
    safetyTipsReadBefore: 'Safety Tips - Read Before You Start',
    neverShare: 'Never share',
    neverShareOtps: 'Never share OTPs, PINs, or passwords with anyone',
    alwaysCheck: 'Always check',
    scammersCreateUrgency: 'Scammers Create Urgency',
    scammersCreateUrgencyDescription: '"Act now or lose everything" is a common tactic. Take your time to verify before taking action.',
    fakeWebsitesLookReal: 'Fake Websites Look Real',
    fakeWebsitesLookRealDescription: 'Scammers create convincing copies of real websites. Always check the URL carefully.',
    
    // Target Users Section
    whoCanBenefit: 'Who Can Benefit?',
    elderlyUsers: 'Elderly Users',
    elderlyUsersDescription: 'Special focus on accessibility with larger text, simple navigation, and patient learning pace.',
    beginners: 'Beginners',
    beginnersDescription: 'New to digital services? Start from the basics and build confidence step by step.',
    students: 'Students',
    studentsDescription: 'Learn essential digital safety skills to protect yourself as you explore the online world.',
    
    // Mission Section
    ourMission: 'Our Mission',
    missionQuote: 'To make every user digitally safe and confident',
    missionText: 'We believe everyone deserves to use digital services without fear. GuardianSathi is committed to empowering users with the knowledge and skills to navigate the digital world safely.',
    readyToStartJourney: 'Ready to start your safety journey?',
    getStartedToday: 'Get Started Today',
    
    // About Page
    aboutGuardianSathi: 'About GuardianSathi',
    aboutHeroSubtitle: 'Your trusted companion in digital world, dedicated to keeping you safe from online scams and fraud.',
    ourMissionAbout: 'Our Mission',
    missionQuoteAbout: 'To empower every individual with knowledge and confidence to navigate digital world safely.',
    missionDescription: 'In an increasingly connected world, digital safety is not a luxury—it\'s a necessity. GuardianSathi was created to bridge the gap between technology and safety education, making it accessible to everyone, regardless of age or technical expertise.',
    whyGuardianSathi: 'Why GuardianSathi?',
    safetyFirst: 'Safety First',
    safetyFirstDescription: 'We prioritize your digital safety with comprehensive training modules and real-world scenarios.',
    madeWithCare: 'Made with Care',
    madeWithCareDescription: 'Designed specifically for elderly users and beginners with accessibility in mind.',
    communityDriven: 'Community Driven',
    communityDrivenDescription: 'Built with feedback from users to ensure relevance and effectiveness.',
    alwaysLearning: 'Always Learning',
    alwaysLearningDescription: 'Continuously updated with the latest scam techniques and prevention methods.',
    meetTeam: 'Meet Team',
    founder: 'Founder',
    digitalSafetyExpert: 'Digital Safety Expert',
    founderDescription: 'Committed to making the internet safer for everyone.',
    educationLead: 'Education Lead',
    learningSpecialist: 'Learning Specialist',
    educationLeadDescription: 'Designing intuitive learning experiences for all age groups.',
    techLead: 'Tech Lead',
    securityEngineer: 'Security Engineer',
    redFlagsFound: 'Red Flags Found',
    quickActions: 'Quick Actions',
    continueTraining: 'Continue Training',
    viewBadges: 'View Badges',
    bestScore: 'Best Score: {score}/100',
    completePreviousModules: 'Complete previous modules to unlock',
    
    // Badges Page
    yourAchievements: 'Your Achievements',
    backToDashboard: 'Back to Dashboard',
    unlocked: 'Unlocked',
    badgesOverview: 'Badges Overview',
    badgesEarned: 'Badges Earned',
    remaining: 'Remaining',
    completion: 'Completion',
    badgeCollection: 'Badge Collection',
    requirement: 'Requirement:',
    unlockedBadge: 'Unlocked!',
    keepGoing: 'Keep Going!',
    startTraining: 'Start Training',
    startTrainingJourney: 'Start your training journey to earn your first badge!',
    allBadgesUnlocked: 'Amazing! You\'ve unlocked all badges! You are a true Guardian.',
    completeMoreTraining: 'Complete more training modules to unlock {count} more badges!',
    
    // Dashboard Module Names
    aadhaarSafety: 'Aadhaar Safety',
    protectAadhaarInfo: 'Protect your Aadhaar information',
    upiSafetyDashboard: 'UPI Safety',
    secureDigitalPayments: 'Secure your digital payments',
    jobScamAwareness: 'Job Scam Awareness',
    identifyFakeJobOffers: 'Identify fake job offers',
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
     mobileRechargeTraining: 'मोबाइल रिचार्ज सुरक्षा प्रशिक्षण',
    deepfakeTraining: 'डीपफेक घोटाला सिम्युलेटर',
    governmentSchemeTraining: 'सरकारी योजना आवेदन',
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
    
    // Problem Section
    whyDigitalSafetyMatters: 'डिजिटल सुरक्षा क्यों मायने रखती है',
    onlineScamsIncreasing: 'ऑनलाइन घोटाले बढ़ रहे हैं',
    onlineScamsDescription: 'साइबर अपराध बढ़ रहा है, हर साल लाखों लोग ऑनलाइन धोखाधड़ी के शिकार होते हैं।',
    peopleLoseMoneyIdentity: 'लोग पैसे और पहचान खो देते हैं',
    peopleLoseMoneyDescription: 'वित्तीय धोखाधड़ी और पहचान की चोरी का पीड़ितों के लिए विनाशकारी परिणाम हो सकते हैं।',
    lackOfAwareness: 'जागरूकता की कमी',
    lackOfAwarenessDescription: 'कई उपयोगकर्ता, विशेष रूप से बुजुर्ग और शुरुआती, खतरों की पहचान करने के ज्ञान की कमी रखते हैं।',
    
    // Solution Section
    howGuardianSathiHelps: 'GuardianSathi कैसे मदद करता है',
    interactiveLearning: 'इंटरैक्टिव लर्निंग',
    interactiveLearningDescription: 'सुरक्षित, सिमुलेटेड वातावरण में हाथों-हाथ अनुभव के माध्यम से सीखें।',
    safePracticeEnvironment: 'सुरक्षित अभ्यास वातावरण',
    safePracticeEnvironmentDescription: 'बिना किसी वास्तविक दुनिया के परिणामों के गलतियां करें और उनसे सीखें।',
    realWorldScenarios: 'वास्तविक दुनिया के परिदृश्य',
    realWorldScenariosDescription: 'यथार्थवादी घोटाला परिदृश्यों के साथ अभ्यास करें जिनका आप सामना करने की संभावना है।',
    
    // Awareness Section
    didYouKnow: 'क्या आप जानते हैं?',
    otpNeverShared: 'ओटीपी कभी साझा नहीं करना चाहिए',
    otpNeverSharedDescription: 'आपका वन-टाइम पासवर्ड आपके खातों की कुंजी है। इसे किसी के साथ साझा न करें, भले ही वे आपके बैंक से होने का दावा करें।',
    scammersCreateUrgency: 'घोटालेबाज तत्कालता बनाते हैं',
    scammersCreateUrgencyDescription: '"अभी कार्रवाई करें या सब कुछ खो दें" एक सामान्य रणनीति है। कार्रवाई करने से पहले सत्यापन करने के लिए अपना समय लें।',
    fakeWebsitesLookReal: 'नकली वेबसाइटें वास्तविक दिखती हैं',
    fakeWebsitesLookRealDescription: 'घोटालेबाज वास्तविक वेबसाइटों की आकर्षक प्रतियां बनाते हैं। हमेशा URL ध्यान से जांचें।',
    
    // Target Users Section
    whoCanBenefit: 'कौन लाभ उठा सकता है?',
    elderlyUsers: 'बुजुर्ग उपयोगकर्ता',
    elderlyUsersDescription: 'बड़े टेक्स्ट, सरल नेविगेशन और धैर्यवान लर्निंग गति के साथ पहुंच पर विशेष ध्यान।',
    beginners: 'शुरुआती',
    beginnersDescription: 'डिजिटल सेवाओं के लिए नए हैं? बुनियादी बातों से शुरू करें और कदम दर कदम आत्मविश्वास बनाएं।',
    students: 'छात्र',
    studentsDescription: 'ऑनलाइन दुनिया का अन्वेषण करते समय खुद की रक्षा के लिए आवश्यक डिजिटल सुरक्षा कौशल सीखें।',
    
    // Mission Section
    ourMission: 'हमारा मिशन',
    missionQuote: 'हर उपयोगकर्ता को डिजिटल रूप से सुरक्षित और आत्मविश्वासी बनाना',
    missionText: 'हम मानते हैं कि हर किसी को बिना किसी डर के डिजिटल सेवाओं का उपयोग करने का हक़ है। GuardianSathi उपयोगकर्ताओं को ज्ञान और कौशल के साथ सशक्त बनाने के लिए प्रतिबद्ध है ताकि वे डिजिटल दुनिया में सुरक्षित रूप से नेविगेट कर सकें।',
    readyToStartJourney: 'अपनी सुरक्षा यात्रा शुरू करने के लिए तैयार हैं?',
    getStartedToday: 'आज ही शुरू करें',
    
    // About Page
    aboutGuardianSathi: 'GuardianSathi के बारे में',
    aboutHeroSubtitle: 'डिजिटल दुनिया में आपका विश्वसनीय साथी, ऑनलाइन धोखाधड़ी और फ्रॉड से आपकी सुरक्षा के लिए समर्पित।',
    ourMissionAbout: 'हमारा मिशन',
    missionQuoteAbout: 'हर व्यक्ति को डिजिटल दुनिया में सुरक्षित रूप से नेविगेट करने के लिए ज्ञान और आत्मविश्वास से सशक्त बनाना।',
    missionDescription: 'एक बढ़ते हुए कनेक्टेड दुनिया में, डिजिटल सुरक्षा विलासिती नहीं है—यह आवश्यकता है। GuardianSathi तकनीक और सुरक्षा शिक्षा के बीच अंतर को पाटने के लिए बनाया गया था, इसे उम्र या तकनीकी विशेषज्ञता के बावजूद हर किसी के लिए सुलभ बनाना।',
    whyGuardianSathi: 'GuardianSathi क्यों?',
    safetyFirst: 'सुरक्षा पहले',
    safetyFirstDescription: 'हम व्यापक प्रशिक्षण मॉड्यूल और वास्तविक दुनिया के परिदृश्यों के साथ आपकी डिजिटल सुरक्षा को प्राथमिकता देते हैं।',
    madeWithCare: 'ध्यान के साथ बनाया गया',
    madeWithCareDescription: 'वृद्ध उपयोगकर्ताओं और शुरुआती लोगों के लिए विशेष रूप से डिज़ाइन किया गया, पहुंच को ध्यान में रखते हुए।',
    communityDriven: 'समुदाय द्वारा संचालित',
    communityDrivenDescription: 'प्रासंगिकता और प्रभावशीलता सुनिश्चित करने के लिए उपयोगकर्ताओं से प्रतिक्रिया के साथ बनाया गया।',
    alwaysLearning: 'हमेशा सीख रहे हैं',
    alwaysLearningDescription: 'नवीनतम घोटाला तकनीकों और रोकथाम विधियों के साथ लगातार अपडेट किया जा रहा है।',
    meetTeam: 'टीम से मिलें',
    founder: 'संस्थापक',
    digitalSafetyExpert: 'डिजिटल सुरक्षा विशेषज्ञ',
    founderDescription: 'हर किसी के लिए इंटरनेट को अधिक सुरक्षित बनाने के लिए प्रतिबद्ध।',
    educationLead: 'शिक्षा प्रमुख',
    learningSpecialist: 'लर्निंग विशेषज्ञ',
    educationLeadDescription: 'सभी आयु समूहों के लिए सहज लर्निंग अनुभव डिज़ाइन करना।',
    techLead: 'तकनीक प्रमुख',
    securityEngineer: 'सुरक्षा इंजीनियर',
    techLeadDescription: 'सुरक्षित और सुलभ तकनीक समाधान बनाना।',
    getInTouch: 'संपर्क करें',
    contactQuestions: 'कोई प्रश्न या प्रतिक्रिया है? हमें सुनना अच्छा लगेगा!',
    supportEmail: 'support@guardiansathi.com',
    tollFree: '+91 1800-XXXX-XXX (टोल फ्री)',
    website: 'www.guardiansathi.com',
    versionInfo: 'GuardianSathi v1.0.0 | डिजिटल सुरक्षा के लिए ❤️ के साथ बनाया गया',
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
    
    // Problem Section
    whyDigitalSafetyMatters: 'डिजिटल सुरक्षिती का महत्त्वाचे आहे',
    onlineScamsIncreasing: 'ऑनलाइन फसवणुकी वाढत आहेत',
    onlineScamsDescription: 'सायबर गुन्हे वाढत आहेत, दरवर्षी लाखो लोक ऑनलाइन फसवणुकीचे बळी ठरतात.',
    peopleLoseMoneyIdentity: 'लोक पैसे आणि ओळख गमावतात',
    peopleLoseMoneyDescription: 'वित्तीय फसवणूक आणि ओळख चोरीचा बळींसाठी विनाशकारी परिणाम होऊ शकतात.',
    lackOfAwareness: 'जागरूकतेची कमतरता',
    lackOfAwarenessDescription: 'अनेक वापरकर्ते, विशेषतः वृद्ध आणि सुरुवातीचे, धोके ओळखण्याच्या ज्ञानाची कमतरता ठेवतात.',
    
    // Solution Section
    howGuardianSathiHelps: 'GuardianSathi कशी मदत करते',
    interactiveLearning: 'इंटरॅक्टिव शिक्षण',
    interactiveLearningDescription: 'सुरक्षित, सिम्युलेटेड वातावरणात हातोहात अनुभवातून शिका.',
    safePracticeEnvironment: 'सुरक्षित सराव वातावरण',
    safePracticeEnvironmentDescription: 'कोणत्याही खर्या जगाच्या परिणामांशिवाय चुका करा आणि त्यांपासून शिका.',
    realWorldScenarios: 'खरे जगातील परिदृश्ये',
    realWorldScenariosDescription: 'वास्तववादी फसवणूक परिदृश्यांसह सराव करा जे तुम्हाला सामोरे जाण्याची शक्यता आहे.',
    
    // Awareness Section
    didYouKnow: 'तुम्हाला माहित आहे का?',
    otpNeverShared: 'ओटीपी कधीही सामायिक करू नये',
    otpNeverSharedDescription: 'तुमचा वन-टाईम पासवर्ड हा तुमच्या खात्यांची कळी आहे. तो कोणासोबतही सामायिक करू नका, भले ते तुमच्या बँकेतून असल्याचा दावा करत असतील.',
    scammersCreateUrgency: 'फसवणूक करणारे तातडी निर्माण करतात',
    scammersCreateUrgencyDescription: '"आत्ता कृती करा किंवा सर्व काही हरवा" ही एक सामान्य युक्ती आहे. कृती करण्यापूर्वी सत्यापन करण्यासाठी तुमचा वेळ घ्या.',
    fakeWebsitesLookReal: 'खोटी वेबसाइट्स खर्या दिसतात',
    fakeWebsitesLookRealDescription: 'फसवणूक करणारे खऱ्या वेबसाइट्सची प्रभावी प्रतिया तयार करतात. नेहमी URL काळजीपूर्वक तपासा.',
    
    // Target Users Section
    whoCanBenefit: 'कोण लाभ घेऊ शकतो?',
    elderlyUsers: 'वृद्ध वापरकर्ते',
    elderlyUsersDescription: 'मोठ्या मजकुरासह, सोप्या नेव्हिगेशनसह आणि सवशास्त्रक शिक्षण गतीसह सुलभतेवर विशेष लक्ष केंद्रित करा.',
    beginners: 'सुरुवातीचे',
    beginnersDescription: 'डिजिटल सेवांसाठी नवीन आहात? मूलभूत गोष्टींपासून सुरुवात करा आणि पायरी पायरीने आत्मविश्वास निर्माण करा.',
    students: 'विद्यार्थी',
    studentsDescription: 'ऑनलाइन जगाचा शोध घेताना स्वतःची सुरक्षा करण्यासाठी आवश्यक डिजिटल सुरक्षा कौशल शिका.',
    
    // Mission Section
    ourMission: 'आमचे मिशन',
    missionQuote: 'प्रत्येक वापरकर्त्यास डिजिटलरित्या सुरक्षित आणि आत्मविश्वासी बनवणे',
    missionText: 'आम्हाला विश्वास आहे की प्रत्येक जणाला भीतीशिवाय डिजिटल सेवा वापरण्याचा हक्क आहे. GuardianSathi वापरकर्त्यांना ज्ञान आणि कौशलांसह सशक्त करण्यासाठी प्रतिबद्ध आहे जेणेकरून ते डिजिटल जगात सुरक्षितपणे नेव्हिगेट करू शकतील.',
    readyToStartJourney: 'आपली सुरक्षा प्रवास सुरू करण्यास तयार आहात का?',
    getStartedToday: 'आजच सुरुवात करा',
    
    // About Page
    aboutGuardianSathi: 'GuardianSathi बद्दल',
    aboutHeroSubtitle: 'डिजिटल जगात तुमचा विश्वासू साथी, ऑनलाइन फसवणुकी आणि फसवणुकीपासून तुमची सुरक्षिती करण्यासाठी समर्पित.',
    ourMissionAbout: 'आमचे मिशन',
    missionQuoteAbout: 'प्रत्येक व्यक्तीला ज्ञान आणि आत्मविश्वासासह डिजिटल जगात सुरक्षितपणे नेव्हिगेट करण्यासाठी सक्षम करणे.',
    missionDescription: 'वाढत्या जगात, डिजिटल सुरक्षिती विलासिती नाही - ही आवश्यकता आहे. GuardianSathi तंत्रज्ञान आणि सुरक्षिती शिक्षण यांमधील अंतर भरण्यासाठी तयार केले गेले आहे, वयाचिर्वाच्या किंवा तांत्रिक विशेषज्ञतेच्या पर्वाचे विचार न करता सर्वांसाठी ते सुलभ करणे.',
    whyGuardianSathi: 'GuardianSathi का?',
    safetyFirst: 'सुरक्षिती प्रथम',
    safetyFirstDescription: 'आपण व्यापक प्रशिक्षण मॉड्युल आणि वास्तविक जगातील परिदृश्यांसह तुमची डिजिटल सुरक्षितीला प्राधान्य देतो.',
    madeWithCare: 'काळजीने बनवले',
    madeWithCareDescription: 'वृद्ध वापरकर्त्यांसाठी आणि सुरुवातीच्या लोकांसाठी सुलभतेच्या विचारासह विशेषतः डिझाइन केले आहे.',
    communityDriven: 'समुदाय द्वारे चालित',
    communityDrivenDescription: 'प्रासंगिकता आणि प्रभावीता सुनिश्चित करण्यासाठी वापरकर्त्यांकडून प्रतिसाद घेऊन बनवले आहे.',
    alwaysLearning: 'नेहमी शिकत आहे',
    alwaysLearningDescription: 'नवीनतम फसवणूक तंत्रज्ञान आणि प्रतिबंध पद्धतींसह लगातार अपडेट केले जाते.',
    meetTeam: 'टीमशी भेट',
    founder: 'संस्थापक',
    digitalSafetyExpert: 'डिजिटल सुरक्षिती तज्ञ',
    founderDescription: 'प्रत्येकासाठी इंटरनेट सुरक्षित करण्यासाठी प्रतिबद्ध.',
    educationLead: 'शिक्षण प्रमुख',
    learningSpecialist: 'शिक्षण तज्ञ',
    educationLeadDescription: 'सर्व वयोगांसाठी सहज शिक्षण अनुभव डिझाइन करणे.',
    techLead: 'तंत्रज्ञान प्रमुख',
    securityEngineer: 'सुरक्षा अभियंता',
    techLeadDescription: 'सुरक्षित आणि सुलभ तंत्रज्ञान उपाय तयार करणे.',
    getInTouch: 'संपर्क साधा',
    contactQuestions: 'प्रश्न किंवा प्रतिसाद आहे का? आपण ऐकू इच्छितो!',
    supportEmail: 'support@guardiansathi.com',
    tollFree: '+91 1800-XXXX-XXX (टोल फ्री)',
    website: 'www.guardiansathi.com',
    versionInfo: 'GuardianSathi v1.0.0 | डिजिटल सुरक्षितीसाठी ❤️ सह बनवले',
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
