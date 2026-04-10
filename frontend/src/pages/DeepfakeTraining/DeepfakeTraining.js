import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { 
  Phone, PhoneOff, Mic, MicOff, Video, VideoOff, 
  AlertTriangle, CheckCircle, XCircle, MessageCircle,
  Shield, User, Clock, DollarSign, Lock, ChevronRight,
  Play, Pause, RotateCcw, Award, Volume2, VolumeX
} from 'lucide-react';
import PageNotification from '../../components/PageNotification/PageNotification';
import './DeepfakeTraining.css';

const DeepfakeTraining = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const { completeModule } = useProgress();
  
  // Training state
  const [currentStep, setCurrentStep] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showAvatarGuide, setShowAvatarGuide] = useState(true);
  const [userChoices, setUserChoices] = useState([]);
  const [showDecision, setShowDecision] = useState(false);
  const [verificationAsked, setVerificationAsked] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(true);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [lipSyncIssue, setLipSyncIssue] = useState(false);
  const [roboticVoice, setRoboticVoice] = useState(false);
  const [showRedFlags, setShowRedFlags] = useState([]);
  
  // Audio refs for effects
  const audioRef = useRef(null);
  
  // Translations for this module
  const translations = {
    english: {
      title: 'Deepfake Scam Simulator',
      subtitle: 'Learn to identify AI-generated video scams',
      avatarName: 'Seema Tai',
      step1Title: 'Incoming Video Call',
      step1Desc: 'You receive a video call from someone claiming to be your son Rahul.',
      incomingCall: 'Incoming Video Call',
      callerName: 'Rahul (Son)',
      accept: 'Accept Call',
      decline: 'Decline',
      step2Title: 'Video Call Active',
      step2Desc: 'The call is connected. Listen carefully to what the person says.',
      scammerDialogue1: '"Mom, I am in trouble. I had an accident and urgently need money. Please help me."',
      step3Title: 'Notice the Clues',
      step3Desc: 'Watch for suspicious signs in the video and audio.',
      visualClue: 'Visual Clue: Lip movement slightly mismatched with speech',
      audioClue: 'Audio Clue: Voice sounds slightly robotic or unnatural',
      behaviorClue: 'Behavior Clue: Caller avoids answering personal questions',
      step4Title: 'Urgency Pressure',
      step4Desc: 'The caller is creating urgency. This is a common scam tactic.',
      scammerDialogue2: '"I need money in the next 10 minutes. Please send it quickly!"',
      sendMoney: 'Send Money',
      askVerification: 'Ask Verification Question',
      endCall: 'End Call',
      correctChoice: '✓ Correct choice! Always verify identity first.',
      wrongChoice: '✗ Be careful! Scammers create false urgency.',
      step5Title: 'Identity Verification',
      step5Desc: 'Ask a question only the real person would know.',
      verificationQuestion: 'Where did we go for dinner last Diwali?',
      scammerWrongAnswer: '"Uh... we went to... that restaurant..." (Wrong answer!)',
      verificationSuccess: 'The caller could not answer correctly! This confirms it is a scam.',
      step6Title: 'Scam Request',
      step6Desc: 'The scammer now asks for sensitive information.',
      scammerDialogue3: '"Mom, I just received an OTP on your phone. Please tell me the code."',
      shareOTP: 'Share OTP',
      refuseOTP: 'Refuse & Report',
      otpWarning: 'Never share OTP with anyone! This is a critical security rule.',
      step7Title: 'End the Call',
      step7Desc: 'You have identified the scam. End the call safely.',
      reportScam: 'Report & Block',
      callEnded: 'Call Ended Safely',
      step8Title: 'Learning Complete!',
      completionMessage: 'You successfully avoided a deepfake scam!',
      badgeUnlocked: '🏆 Badge Unlocked: AI Scam Awareness',
      lessons: [
        'Deepfake videos can impersonate real people',
        'Scammers create false urgency to pressure you',
        'Always verify identity with personal questions',
        'Never share OTP or financial information',
        'When in doubt, end the call and contact directly'
      ],
      avatarIntro: 'Today we will learn to identify deepfake scam calls. Watch carefully for suspicious signs.',
      avatarDuringCall: 'Do you notice anything unusual in this video? Look at the lip movements.',
      avatarUrgency: 'Scammers always create urgency. Never rush when money is involved.',
      avatarVerification: 'Excellent! You asked a verification question. This is the best defense.',
      avatarOTP: 'Perfect! Never share OTP. Banks and family never ask for OTP.',
      avatarEnd: 'Congratulations! You have learned to protect yourself from deepfake scams.',
      mute: 'Mute',
      unmute: 'Unmute',
      camera: 'Camera',
      redFlags: 'Red Flags Detected:',
      next: 'Continue',
      back: 'Back',
      finish: 'Finish Training',
      replay: 'Replay Simulation'
    },
    hindi: {
      title: 'डीपफेक घोटाला सिमुलेटर',
      subtitle: 'AI-जनित वीडियो घोटालों की पहचान सीखें',
      avatarName: 'सीमा ताई',
      step1Title: 'आ रहा वीडियो कॉल',
      step1Desc: 'आपको अपने बेटे राहुल का दावा करने वाले व्यक्ति से वीडियो कॉल प्राप्त होता है।',
      incomingCall: 'आ रहा वीडियो कॉल',
      callerName: 'राहुल (बेटा)',
      accept: 'कॉल स्वीकार करें',
      decline: 'अस्वीकार करें',
      step2Title: 'वीडियो कॉल सक्रिय',
      step2Desc: 'कॉल जुड़ गया है। ध्यान से सुनें कि व्यक्ति क्या कहता है।',
      scammerDialogue1: '"मम्मी, मैं मुसीबत में हूं। मेरा एक्सीडेंट हो गया है और मुझे तुरंत पैसे चाहिए। कृपया मेरी मदद करें।"',
      step3Title: 'संकेतों पर ध्यान दें',
      step3Desc: 'वीडियो और ऑडियो में संदिग्ध संकेतों को देखें।',
      visualClue: 'दृश्य संकेत: होंठ की हरकत बोलने से थोड़ी मेल नहीं खाती',
      audioClue: 'ऑडियो संकेत: आवाज थोड़ी रोबोटिक या अप्राकृतिक लगती है',
      behaviorClue: 'व्यवहार संकेत: कॉल करने वाला व्यक्तिगत सवालों का जवाब देने से बचता है',
      step4Title: 'तात्कालिकता का दबाव',
      step4Desc: 'कॉल करने वाला तात्कालिकता पैदा कर रहा है। यह एक सामान्य घोटाला तरीका है।',
      scammerDialogue2: '"मुझे अगले 10 मिनट में पैसे चाहिए। कृपया जल्दी भेजें!"',
      sendMoney: 'पैसे भेजें',
      askVerification: 'सत्यापन सवाल पूछें',
      endCall: 'कॉल समाप्त करें',
      correctChoice: '✓ सही विकल्प! हमेशा पहले पहचान सत्यापित करें।',
      wrongChoice: '✗ सावधान रहें! घोटालेबाज झूठी तात्कालिकता पैदा करते हैं।',
      step5Title: 'पहचान सत्यापन',
      step5Desc: 'वह सवाल पूछें जिसका जवाब केवल असली व्यक्ति ही जानता हो।',
      verificationQuestion: 'पिछली दीवाली हम कहां खाने गए थे?',
      scammerWrongAnswer: '"उह... हम गए थे... उस रेस्टोरेंट में..." (गलत जवाब!)',
      verificationSuccess: 'कॉल करने वाला सही जवाब नहीं दे सका! यह घोटाले की पुष्टि करता है।',
      step6Title: 'घोटाले का अनुरोध',
      step6Desc: 'घोटालेबाज अब संवेदनशील जानकारी मांगता है।',
      scammerDialogue3: '"मम्मी, मैंने आपके फोन पर एक OTP प्राप्त किया है। कृपया मुझे कोड बताएं।"',
      shareOTP: 'OTP साझा करें',
      refuseOTP: 'मना करें और रिपोर्ट करें',
      otpWarning: 'कभी भी किसी के साथ OTP साझा न करें! यह एक महत्वपूर्ण सुरक्षा नियम है।',
      step7Title: 'कॉल समाप्त करें',
      step7Desc: 'आपने घोटाले की पहचान कर ली है। कॉल सुरक्षित रूप से समाप्त करें।',
      reportScam: 'रिपोर्ट और ब्लॉक करें',
      callEnded: 'कॉल सुरक्षित रूप से समाप्त हुआ',
      step8Title: 'सीखना पूरा हुआ!',
      completionMessage: 'आपने सफलतापूर्वक डीपफेक घोटाले से बचाव किया!',
      badgeUnlocked: '🏆 बैज अनलॉक: AI घोटाला जागरूकता',
      lessons: [
        'डीपफेक वीडियो असली लोगों का रूप ले सकते हैं',
        'घोटालेबाज आप पर दबाव डालने के लिए झूठी तात्कालिकता पैदा करते हैं',
        'हमेशा व्यक्तिगत सवालों से पहचान सत्यापित करें',
        'कभी भी OTP या वित्तीय जानकारी साझा न करें',
        'संदेह होने पर कॉल समाप्त करें और सीधे संपर्क करें'
      ],
      avatarIntro: 'आज हम डीपफेक घोटाला कॉल की पहचान करना सीखेंगे। संदिग्ध संकेतों के लिए सावधानी से देखें।',
      avatarDuringCall: 'क्या आपको इस वीडियो में कुछ असामान्य लग रहा है? होंठ की हरकतों को देखें।',
      avatarUrgency: 'घोटालेबाज हमेशा तात्कालिकता पैदा करते हैं। पैसे के मामले में कभी जल्दबाजी न करें।',
      avatarVerification: 'बहुत बढ़िया! आपने सत्यापन सवाल पूछा। यह सबसे अच्छा बचाव है।',
      avatarOTP: 'उत्कृष्ट! कभी भी OTP साझा न करें। बैंक और परिवार कभी OTP नहीं मांगते।',
      avatarEnd: 'बधाई! आपने डीपफेक घोटालों से खुद को बचाना सीख लिया है।',
      mute: 'म्यूट',
      unmute: 'अनम्यूट',
      camera: 'कैमरा',
      redFlags: 'लाल झंडे पहचाने:',
      next: 'जारी रखें',
      back: 'वापस',
      finish: 'प्रशिक्षण पूरा करें',
      replay: 'सिमुलेशन फिर से चलाएं'
    },
    marathi: {
      title: 'डीपफेक फसवणूक सिम्युलेटर',
      subtitle: 'AI-जनित व्हिडिओ फसवणुकी ओळखा शिका',
      avatarName: 'सीमा ताई',
      step1Title: 'येणारी व्हिडिओ कॉल',
      step1Desc: 'तुम्हाला तुमचा मुलगा राहुल असे दावे करणाऱ्या व्यक्तीकडून व्हिडिओ कॉल येतो.',
      incomingCall: 'येणारी व्हिडिओ कॉल',
      callerName: 'राहुल (मुलगा)',
      accept: 'कॉल स्वीकारा',
      decline: 'नाकारा',
      step2Title: 'व्हिडिओ कॉल सक्रिय',
      step2Desc: 'कॉल कनेक्ट झाला आहे. व्यक्ती काय बोलते ते लक्षपूर्वक ऐका.',
      scammerDialogue1: '"आई, मी अडचणीत आहे. माझा अपघात झाला आहे आणि मला तातडीने पैसे हवे आहेत. कृपया माझी मदत करा."',
      step3Title: 'संकेतांवर लक्ष द्या',
      step3Desc: 'व्हिडिओ आणि ऑडिओमध्ये संशयास्पद संकेतांसाठी पहा.',
      visualClue: 'दृश्य संकेत: ओठांची हालचाल बोलण्याशी थोडी जुळत नाही',
      audioClue: 'ऑडिओ संकेत: आवाज थोडा रोबोटिक किंवा अनैसर्गिक वाटतो',
      behaviorClue: 'वागणूक संकेत: कॉल करणारा वैयक्तिक प्रश्नांची उत्तरे देणे टाळतो',
      step4Title: 'तातडीचा दबाव',
      step4Desc: 'कॉल करणारा तातडी निर्माण करत आहे. हा एक सामान्य फसवणुकीचा त的手段 आहे.',
      scammerDialogue2: '"मला पुढील 10 मिनिटात पैसे हवे आहेत. कृपया लवकर पाठवा!"',
      sendMoney: 'पैसे पाठवा',
      askVerification: 'सत्यापन प्रश्न विचारा',
      endCall: 'कॉल संपवा',
      correctChoice: '✓ योग्य निवड! नेहमी आधी ओळख सत्यापित करा.',
      wrongChoice: '✗ सावध रहा! फसवणुकीकार खोटी तातडी निर्माण करतात.',
      step5Title: 'ओळख सत्यापन',
      step5Desc: 'तो प्रश्न विचारा ज्याचे उत्तर फक्त खरी व्यक्तीच जाणे.',
      verificationQuestion: 'मागील दिवाळी आपण कोठे जेवायला गेलो होतो?',
      scammerWrongAnswer: '"अह... आपण गेलो होतो... त्या रेस्टॉरंटमध्ये..." (चुकीचे उत्तर!)',
      verificationSuccess: 'कॉल करणाऱ्याला योग्य उत्तर देता आले नाही! हे फसवणूक असल्याची पुष्टी करते.',
      step6Title: 'फसवणुकीची विनंती',
      step6Desc: 'फसवणुकीकार आता संवेदनशील माहिती मागतो.',
      scammerDialogue3: '"आई, मला तुमच्या फोनवर एक OTP आला आहे. कृपया मला कोड सांगा."',
      shareOTP: 'OTP शेअर करा',
      refuseOTP: 'नकार द्या आणि रिपोर्ट करा',
      otpWarning: 'कधीही कोणाशीही OTP शेअर करू नका! हा एक महत्त्वाचा सुरक्षा नियम आहे.',
      step7Title: 'कॉल संपवा',
      step7Desc: 'तुम्ही फसवणूक ओळखली आहे. कॉल सुरक्षितपणे संपवा.',
      reportScam: 'रिपोर्ट आणि ब्लॉक करा',
      callEnded: 'कॉल सुरक्षितपणे संपला',
      step8Title: 'शिक्षण पूर्ण!',
      completionMessage: 'तुम्ही यशस्वीरित्या डीपफेक फसवणुकीपासून बचाव केला!',
      badgeUnlocked: '🏆 बॅज अनलॉक: AI फसवणूक जागरूकता',
      lessons: [
        'डीपफेक व्हिडिओ खऱ्या लोकांचे रूप घेऊ शकतात',
        'फसवणुकीकार तुमच्यावर दबाव आणण्यासाठी खोटी तातडी निर्माण करतात',
        'नेहमी वैयक्तिक प्रश्नांनी ओळख सत्यापित करा',
        'कधीही OTP किंवा आर्थिक माहिती शेअर करू नका',
        'संशय असल्यास कॉल संपवा आणि थेट संपर्क साधा'
      ],
      avatarIntro: 'आज आपण डीपफेक फसवणूक कॉल ओळखणे शिकू. संशयास्पद संकेतांसाठी काळजीपूर्वक पहा.',
      avatarDuringCall: 'तुम्हाला या व्हिडिओमध्ये काही असामान्य वाटते आहे का? ओठांच्या हालचालींकडे पहा.',
      avatarUrgency: 'फसवणुकीकार नेहमी तातडी निर्माण करतात. पैशाच्या बाबतीत कधी घाई करू नका.',
      avatarVerification: 'उत्तम! तुम्ही सत्यापन प्रश्न विचारला. हे सर्वोत्तम बचाव आहे.',
      avatarOTP: 'उत्कृष्ट! कधीही OTP शेअर करू नका. बँका आणि कुटुंब कधीही OTP मागत नाहीत.',
      avatarEnd: 'अभिनंदन! तुम्ही डीपफेक फसवणुकींपासून स्वतःला वाचवणे शिकलात.',
      mute: 'म्यूट',
      unmute: 'अनम्यूट',
      camera: 'कॅमेरा',
      redFlags: 'लाल झेंडे ओळखले:',
      next: 'पुढे जा',
      back: 'मागे',
      finish: 'प्रशिक्षण पूर्ण करा',
      replay: 'सिम्युलेशन पुन्हा चालवा'
    }
  };
  
  const txt = translations[currentLanguage] || translations.english;
  
  // Step configurations
  const steps = [
    { id: 0, title: txt.step1Title },
    { id: 1, title: txt.step2Title },
    { id: 2, title: txt.step3Title },
    { id: 3, title: txt.step4Title },
    { id: 4, title: txt.step5Title },
    { id: 5, title: txt.step6Title },
    { id: 6, title: txt.step7Title },
    { id: 7, title: txt.step8Title }
  ];
  
  // Handle step progression
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowDecision(false);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Accept incoming call
  const acceptCall = () => {
    setIsCallActive(true);
    nextStep();
  };
  
  // End call
  const endCall = () => {
    setIsCallActive(false);
    if (currentStep === 6) {
      nextStep();
    }
  };
  
  // Handle user choices
  const handleChoice = (choice) => {
    setUserChoices([...userChoices, { step: currentStep, choice }]);
    
    if (currentStep === 3) { // Urgency pressure step
      if (choice === 'verify') {
        setVerificationAsked(true);
        setShowRedFlags([...showRedFlags, 'urgency']);
      }
      nextStep();
    } else if (currentStep === 5) { // OTP step
      if (choice === 'refuse') {
        setShowRedFlags([...showRedFlags, 'otp_request']);
      }
      nextStep();
    }
  };
  
  // Complete training
  const finishTraining = () => {
    completeModule('deepfake', 85);
    navigate('/sandbox');
  };
  
  // Replay simulation
  const replaySimulation = () => {
    setCurrentStep(0);
    setIsCallActive(false);
    setUserChoices([]);
    setShowDecision(false);
    setVerificationAsked(false);
    setShowRedFlags([]);
    setGlitchEffect(false);
    setLipSyncIssue(false);
    setRoboticVoice(false);
  };
  
  // Trigger visual effects based on step
  useEffect(() => {
    if (currentStep === 2) { // Clues step
      const timer1 = setTimeout(() => setLipSyncIssue(true), 2000);
      const timer2 = setTimeout(() => setRoboticVoice(true), 4000);
      const timer3 = setTimeout(() => setGlitchEffect(true), 6000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [currentStep]);
  
  // Render avatar guide message
  const getAvatarMessage = () => {
    switch (currentStep) {
      case 0: return txt.avatarIntro;
      case 1: return txt.avatarDuringCall;
      case 2: return txt.avatarDuringCall;
      case 3: return txt.avatarUrgency;
      case 4: return verificationAsked ? txt.avatarVerification : txt.avatarUrgency;
      case 5: return txt.avatarOTP;
      case 6: return txt.avatarEnd;
      case 7: return txt.avatarEnd;
      default: return txt.avatarIntro;
    }
  };
  
  return (
    <div className="deepfake-training">
      {/* Page Notification */}
      <PageNotification pageName="Deepfake Training" />
      
      {/* Header */}
      <div className="training-header">
        <div className="header-content">
          <Shield className="header-icon" />
          <div className="header-text">
            <h1 className=" Elder-friendly">{txt.title}</h1>
            <p className="subtitle">{txt.subtitle}</p>
          </div>
        </div>
        <div className="progress-indicator">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            >
              {index < currentStep ? <CheckCircle size={16} /> : index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Deepfake Safety Tips - Important! */}
      <div className="training-tips">
        <h3>⚠️ Deepfake Scam Safety - Read Before You Start</h3>
        <div className="tips-grid">
          <div className="tip-card important">
            <span className="tip-icon">🎭</span>
            <p><strong>AI can mimic voices</strong> - Don't trust voice alone</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">📹</span>
            <p><strong>Video calls can be faked</strong> - Watch for odd movements</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">⏸️</span>
            <p><strong>Pause and verify</strong> - Call back on known numbers</p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">❌</span>
            <p><strong>Never act in panic</strong> - Scammers create urgency</p>
          </div>
        </div>
      </div>
      
      {/* Main Content - Split Screen */}
      <div className="training-container">
        {/* Left Panel - Avatar Guide */}
        <div className="avatar-panel">
          <div className="avatar-container">
            <div className="avatar-image">
              <div className="avatar-emoji">👩‍🏫</div>
              <div className="avatar-pulse"></div>
            </div>
            <div className="avatar-info">
              <h3 className="Elder-friendly">{txt.avatarName}</h3>
              <span className="avatar-role">{t('yourGuide') || 'Your Guide'}</span>
            </div>
          </div>
          
          <div className="guide-message-box">
            <MessageCircle className="message-icon" />
            <p className="guide-message Elder-friendly">{getAvatarMessage()}</p>
          </div>
          
          {/* Red Flags List */}
          {showRedFlags.length > 0 && (
            <div className="red-flags-box">
              <AlertTriangle className="alert-icon" />
              <h4 className="Elder-friendly">{txt.redFlags}</h4>
              <ul>
                {showRedFlags.includes('urgency') && (
                  <li className="Elder-friendly">⚠️ {txt.scammerDialogue2}</li>
                )}
                {showRedFlags.includes('otp_request') && (
                  <li className="Elder-friendly">🚫 {txt.scammerDialogue3}</li>
                )}
                {lipSyncIssue && (
                  <li className="Elder-friendly">👄 {txt.visualClue}</li>
                )}
                {roboticVoice && (
                  <li className="Elder-friendly">🔊 {txt.audioClue}</li>
                )}
              </ul>
            </div>
          )}
          
          {/* Navigation */}
          <div className="step-navigation">
            <button 
              className="nav-btn Elder-friendly" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              {txt.back}
            </button>
            <span className="step-counter Elder-friendly">
              {currentStep + 1} / {steps.length}
            </span>
            <button 
              className="nav-btn Elder-friendly" 
              onClick={nextStep}
              disabled={currentStep === steps.length - 1 || (currentStep === 3 && !verificationAsked)}
            >
              {txt.next}
            </button>
          </div>
        </div>
        
        {/* Right Panel - Simulation */}
        <div className="simulation-panel">
          {/* Step 0: Incoming Call */}
          {currentStep === 0 && (
            <div className="incoming-call-screen">
              <div className="call-notification">
                <div className="incoming-animation">
                  <Phone className="incoming-icon" />
                </div>
                <h2 className="Elder-friendly">{txt.incomingCall}</h2>
                <div className="caller-info">
                  <div className="caller-avatar">👨</div>
                  <h3 className="Elder-friendly caller-name">{txt.callerName}</h3>
                  <p className="call-type">WhatsApp Video</p>
                </div>
                <div className="call-actions">
                  <button 
                    className="accept-btn Elder-friendly" 
                    onClick={acceptCall}
                  >
                    <Phone className="btn-icon" />
                    {txt.accept}
                  </button>
                  <button 
                    className="decline-btn Elder-friendly" 
                    onClick={() => navigate('/sandbox')}
                  >
                    <PhoneOff className="btn-icon" />
                    {txt.decline}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Steps 1-6: Video Call Interface */}
          {(currentStep >= 1 && currentStep <= 6) && (
            <div className={`video-call-interface ${glitchEffect ? 'glitch' : ''}`}>
              {/* Video Screen */}
              <div className="video-screen">
                {cameraOff ? (
                  <div className="video-placeholder">
                    <div className={`scammer-avatar ${lipSyncIssue ? 'lip-sync-issue' : ''}`}>
                      <User size={80} />
                      {lipSyncIssue && <span className="glitch-text">👄</span>}
                    </div>
                    <div className={`voice-waveform ${roboticVoice ? 'robotic' : ''}`}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="wave-bar"></span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="active-video">
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      className="caller-video"
                      poster="/deepfake-scammer.jpg"
                    >
                      <source src="/deepfake-sample.mp4" type="video/mp4" />
                    </video>
                  </div>
                )}
                
                {/* Call Status */}
                <div className="call-status">
                  <span className="status-dot"></span>
                  <span className="Elder-friendly">Connected • 00:{String(currentStep * 15).padStart(2, '0')}</span>
                </div>
                
                {/* Dialogue Bubble */}
                <div className="dialogue-bubble">
                  <p className="Elder-friendly">
                    {currentStep === 1 && txt.scammerDialogue1}
                    {currentStep === 3 && txt.scammerDialogue2}
                    {currentStep === 5 && txt.scammerDialogue3}
                    {currentStep === 2 && txt.step3Desc}
                    {currentStep === 4 && (verificationAsked ? txt.scammerWrongAnswer : txt.step5Desc)}
                    {currentStep === 6 && txt.step7Desc}
                  </p>
                </div>
              </div>
              
              {/* Call Controls */}
              <div className="call-controls">
                <button 
                  className={`control-btn ${muted ? 'active' : ''}`}
                  onClick={() => setMuted(!muted)}
                >
                  {muted ? <MicOff size={24} /> : <Mic size={24} />}
                  <span className="Elder-friendly">{muted ? txt.unmute : txt.mute}</span>
                </button>
                <button 
                  className={`control-btn ${cameraOff ? 'active' : ''}`}
                  onClick={() => setCameraOff(!cameraOff)}
                >
                  {cameraOff ? <VideoOff size={24} /> : <Video size={24} />}
                  <span className="Elder-friendly">{txt.camera}</span>
                </button>
                
                {currentStep === 6 && (
                  <button 
                    className="control-btn end-call-btn"
                    onClick={endCall}
                  >
                    <PhoneOff size={24} />
                    <span className="Elder-friendly">{txt.endCall}</span>
                  </button>
                )}
              </div>
              
              {/* Decision Buttons */}
              {currentStep === 3 && (
                <div className="decision-panel">
                  <h4 className="Elder-friendly decision-title">{txt.step4Title}</h4>
                  <div className="decision-buttons">
                    <button 
                      className="decision-btn danger Elder-friendly"
                      onClick={() => handleChoice('send_money')}
                    >
                      <DollarSign className="btn-icon" />
                      {txt.sendMoney}
                    </button>
                    <button 
                      className="decision-btn success Elder-friendly"
                      onClick={() => handleChoice('verify')}
                    >
                      <MessageCircle className="btn-icon" />
                      {txt.askVerification}
                    </button>
                    <button 
                      className="decision-btn neutral Elder-friendly"
                      onClick={() => handleChoice('end')}
                    >
                      <PhoneOff className="btn-icon" />
                      {txt.endCall}
                    </button>
                  </div>
                </div>
              )}
              
              {currentStep === 5 && (
                <div className="decision-panel">
                  <h4 className="Elder-friendly decision-title">{txt.step6Title}</h4>
                  <p className="Elder-friendly warning-text">{txt.otpWarning}</p>
                  <div className="decision-buttons">
                    <button 
                      className="decision-btn danger Elder-friendly"
                      onClick={() => handleChoice('share_otp')}
                    >
                      <Lock className="btn-icon" />
                      {txt.shareOTP}
                    </button>
                    <button 
                      className="decision-btn success Elder-friendly"
                      onClick={() => handleChoice('refuse')}
                    >
                      <Shield className="btn-icon" />
                      {txt.refuseOTP}
                    </button>
                  </div>
                </div>
              )}
              
              {currentStep === 4 && !verificationAsked && (
                <div className="decision-panel">
                  <h4 className="Elder-friendly decision-title">{txt.step5Title}</h4>
                  <p className="Elder-friendly">{txt.verificationQuestion}</p>
                  <button 
                    className="decision-btn success Elder-friendly"
                    onClick={() => {
                      setVerificationAsked(true);
                      setShowRedFlags([...showRedFlags, 'wrong_answer']);
                    }}
                  >
                    <CheckCircle className="btn-icon" />
                    {txt.askVerification}
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Step 7: Completion Summary */}
          {currentStep === 7 && (
            <div className="completion-screen">
              <div className="completion-content">
                <div className="success-icon">
                  <Award size={80} className="trophy" />
                </div>
                <h2 className="Elder-friendly completion-title">{txt.step8Title}</h2>
                <p className="Elder-friendly completion-message">{txt.completionMessage}</p>
                
                <div className="badge-unlocked">
                  <span className="badge-icon">🏆</span>
                  <span className="Elder-friendly badge-text">{txt.badgeUnlocked}</span>
                </div>
                
                <div className="lessons-learned">
                  <h4 className="Elder-friendly">{t('whatYouLearned') || 'What You Learned:'}</h4>
                  <ul>
                    {txt.lessons.map((lesson, index) => (
                      <li key={index} className="Elder-friendly">
                        <CheckCircle className="lesson-icon" size={20} />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="completion-actions">
                  <button 
                    className="action-btn primary Elder-friendly"
                    onClick={finishTraining}
                  >
                    <CheckCircle className="btn-icon" />
                    {txt.finish}
                  </button>
                  <button 
                    className="action-btn secondary Elder-friendly"
                    onClick={replaySimulation}
                  >
                    <RotateCcw className="btn-icon" />
                    {txt.replay}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Step indicators */}
      <div className="step-progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DeepfakeTraining;
