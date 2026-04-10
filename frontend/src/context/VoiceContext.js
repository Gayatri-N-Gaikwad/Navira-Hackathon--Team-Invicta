import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const VoiceContext = createContext();

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};

const pageInstructions = {
  english: {
    '/': 'Welcome to Guardian Sathi. This is your home page where you can explore sandbox training, take quizzes, and learn about digital safety. Click on Explore Sandbox to start learning.',
    '/sandbox': 'You are in the Sandbox section. Here you can practice banking and government training in a safe environment. These simulations help you learn to identify scams without any risk.',
    '/sandbox/banking': 'Welcome to Banking Training. This is a split-screen simulation. On the left, you will see a UPI app. On the right, you will see SMS messages. Watch out for scam messages asking for your OTP. Banks never ask for OTPs.',
    '/sandbox/government': 'Welcome to Government Training. This simulation shows you how to identify fake government websites. Look for the dot gov dot in domain in official sites. Do not click on suspicious links in SMS messages.',
    '/sandbox/deepfake': 'Welcome to Deepfake Scam Simulator. This training teaches you to identify AI-generated video scams. Watch for lip-sync issues, robotic voices, and urgent money requests. Always verify identity before trusting video calls.',
    '/sandbox/government-scheme': 'Welcome to Government Scheme Application Training. This simulation teaches you to safely apply for government assistance. Learn to identify official websites ending with dot gov dot in. Never share your ATM PIN or pay processing fees for government schemes.',
    '/sandbox/digilocker': 'Welcome to DigiLocker Security Training. This module teaches you to safely use DigiLocker for storing and sharing documents. Learn to identify official portals, handle OTPs securely, detect WhatsApp OTP scams, and avoid phishing emails. Remember: No government service will ever ask for your OTP through messages or calls.',
    '/quiz': 'You are in the Quiz section. Test your knowledge about digital safety and scams. Answer the questions to improve your safety score.',
    '/dashboard': 'This is your Progress Dashboard. Here you can see your learning progress, completed modules, and earned badges. Keep training to unlock more achievements.',
    '/badges': 'Welcome to your Badges collection. Complete training modules and identify red flags to earn badges. Each badge represents a milestone in your digital safety journey.',
  },
  hindi: {
    '/': 'Guardian Sathi में आपका स्वागत है। यह आपका होम पेज है जहाँ आप सैंडबॉक्स ट्रेनिंग देख सकते हैं, क्विज़ दे सकते हैं, और डिजिटल सुरक्षा के बारे में सीख सकते हैं। सीखना शुरू करने के लिए सैंडबॉक्स देखें पर क्लिक करें।',
    '/sandbox': 'आप सैंडबॉक्स सेक्शन में हैं। यहाँ आप सुरक्षित वातावरण में बैंकिंग और सरकारी प्रशिक्षण का अभ्यास कर सकते हैं। ये सिमुलेशन आपको बिना किसी जोखम के घोटालों की पहचान करना सीखने में मदद करते हैं।',
    '/sandbox/banking': 'बैंकिंग प्रशिक्षण में आपका स्वागत है। यह एक स्प्लिट-स्क्रीन सिमुलेशन है। बाईं ओर, आपको एक यूपीआई ऐप दिखाई देगा। दाईं ओर, आपको एसएमएस संदेश दिखाई देंगे। अपने ओटीपी के लिए पूछने वाले घोटाले संदेशों से सावधान रहें। बैंक कभी भी ओटीपी नहीं मांगते।',
    '/sandbox/government': 'सरकारी प्रशिक्षण में आपका स्वागत है। यह सिमुलेशन आपको नकली सरकारी वेबसाइटों की पहचान करना दिखाता है। आधिकारिक साइटों में डॉट गव डॉट इन डोमेन देखें। एसएमएस संदेशों में संदिग्ध लिंक पर क्लिक न करें।',
    '/sandbox/deepfake': 'डीपफेक घोटाला सिमुलेटर में आपका स्वागत है। यह प्रशिक्षण आपको एआई-जनित वीडियो घोटालों की पहचान करना सिखाता है। होंठ की हरकत, रोबोटिक आवाज और तातड़ी के पैसे के अनुरोधों के लिए देखें। वीडियो कॉल पर भरोसा करने से पहले हमेशा पहचान सत्यापित करें।',
    '/sandbox/government-scheme': 'सरकारी योजना आवेदन प्रशिक्षण में आपका स्वागत है। यह सिमुलेशन आपको सरकारी सहायता के लिए सुरक्षित रूप से आवेदन करना सिखाता है। डॉट गव डॉट इन से समाप्त होने वाली आधिकारिक वेबसाइटों की पहचान करना सीखें। कभी भी अपना ATM PIN साझा न करें या सरकारी योजनाओं के लिए प्रोसेसिंग शुल्क का भुगतान न करें।',
    '/sandbox/digilocker': 'डिजीलॉकर सुरक्षा प्रशिक्षण में आपका स्वागत है। यह मॉड्यूल आपको दस्तावेज़ संग्रहीत और साझा करने के लिए डिजीलॉकर का सुरक्षित उपयोग करना सिखाता है। आधिकारिक पोर्टल की पहचान करना, ओटीपी को सुरक्षित रूप से संभालना, व्हाट्सएप ओटीपी घोटालों का पता लगाना, और फिशिंग ईमेल से बचना सीखें। याद रखें: कोई भी सरकारी सेवा कभी भी आपके ओटीपी के लिए संदेश या कॉल के माध्यम से नहीं पूछेगी।',
    '/quiz': 'आप क्विज़ सेक्शन में हैं। डिजिटल सुरक्षा और घोटालों के बारे में अपने ज्ञान का परीक्षण करें। अपने सुरक्षा स्कोर में सुधार के लिए प्रश्नों का उत्तर दें।',
    '/dashboard': 'यह आपकी प्रोग्रेस डैशबोर्ड है। यहाँ आप अपनी सीखने की प्रगति, पूर्ण किए गए मॉड्यूल और अर्जित बैज देख सकते हैं। और उपलब्धियों को अनलॉक करने के लिए प्रशिक्षण जारी रखें।',
    '/badges': 'आपके बैज संग्रह में आपका स्वागत है। बैज अर्जित करने के लिए प्रशिक्षण मॉड्यूल पूरे करें और रेड फ्लैग की पहचान करें। प्रत्येक बैज आपकी डिजिटल सुरक्षा यात्रा में एक मील का पत्थर का प्रतीक है।',
  },
  marathi: {
    '/': 'Guardian Sathi मध्ये आपले स्वागत आहे. हे तुमचे होम पेज आहे जिथे तुम्ही सॅंडबॉक्स प्रशिक्षन पाहू शकता, क्विझ देऊ शकता आणि डिजिटल सुरक्षितीबद्दल शिकू शकता. शिकणे सुरू करण्यासाठी सॅंडबॉक्स पहा वर क्लिक करा.',
    '/sandbox': 'तुम्ही सॅंडबॉक्स विभागात आहात. येथे तुम्ही सुरक्षित वातावरणात बँकिंग आणि सरकारी प्रशिक्षणाचा सराव करू शकता. हे सिम्युलेशन्स तुम्हाला कोणत्याही जोखमीशिवाय फसवणुकांची ओळख करणे शिकण्यास मदत करतात.',
    '/sandbox/banking': 'बँकिंग प्रशिक्षणात आपले स्वागत आहे. हा स्प्लिट-स्क्रीन सिम्युलेशन आहे. डावीकडे, तुम्हाला यूपीआय अ‍ॅप दिसेल. उजवीकडे, तुम्हाला एसएमएस मेसेज दिसतील. तुमच्या ओटीपीसाठी विचारणारे फसवणूक मेसेज पाहा. बँका कधीही ओटीपी मागत नाहीत.',
    '/sandbox/government': 'सरकारी प्रशिक्षणात आपले स्वागत आहे. हे सिम्युलेशन तुम्हाला बनावट सरकारी वेबसाइट्स ओळखणे दाखवते. अधिकृत साइट्समध्ये डॉट गव डॉट इन डोमेन पाहा. एसएमएस मेसेजमधील संशयास्पद लिंकवर क्लिक करू नका.',
    '/sandbox/deepfake': 'डीपफेक फसवणूक सिम्युलेटरमध्ये आपले स्वागत आहे. हे प्रशिक्षण तुम्हाला AI-जनित व्हिडिओ फसवणुकी ओळखणे शिकवते. ओठांच्या हालचाली, रोबोटिक आवाज आणि तातडीच्या पैशाच्या विनंत्या यांसाठी पहा. व्हिडिओ कॉलवर विश्वास ठेवण्यापूर्वी नेहमी ओळख सत्यापित करा.',
    '/sandbox/government-scheme': 'सरकारी योजना अर्ज प्रशिक्षणात आपले स्वागत आहे. हे सिम्युलेशन तुम्हाला सरकारी मदतीसाठी सुरक्षितरित्या अर्ज करणे शिकवते. डॉट गव डॉट इन ने संपणाऱ्या अधिकृत वेबसाइट्स ओळखणे शिका. कधीही तुमचा ATM PIN शेअर करू नका किंवा सरकारी योजनांसाठी प्रोसेसिंग शुल्क देऊ नका.',
    '/sandbox/digilocker': 'डिजीलॉकर सुरक्षा प्रशिक्षणात आपले स्वागत आहे. हे मॉड्यूल तुम्हाला दस्तऐवज साठवण्यासाठी आणि सामायिक करण्यासाठी डिजीलॉकर सुरक्षितरित्या वापरणे शिकवते. अधिकृत पोर्टल्स ओळखणे, OTP सुरक्षितपणे हाताळणे, WhatsApp OTP फसवणूक शोधणे आणि फिशिंग ईमेल्स टाळणे शिका. लक्षात ठेवा: कोणत्याही सरकारी सेवेने कधीही संदेश किंवा कॉलद्वारे तुमचा OTP विचारणार नाही.',
    '/quiz': 'तुम्ही क्विझ विभागात आहात. डिजिटल सुरक्षिती आणि फसवणुकांबद्दल तुमच्या ज्ञानाची चाचणी घ्या. तुमचे सुरक्षिती स्कोर सुधारण्यासाठी प्रश्नांची उत्तरे द्या.',
    '/dashboard': 'हे तुमचे प्रोग्रेस डॅशबोर्ड आहे. येथे तुम्ही तुमची शिकण्याची प्रगती, पूर्ण केलेले मॉड्यूल्स आणि मिळवलेले बॅजेस पाहू शकता. अधिक उपलब्धी अनलॉक करण्यासाठी प्रशिक्षण सुरू ठेवा.',
    '/badges': 'तुमच्या बॅज संग्रहात आपले स्वागत आहे. बॅज मिळवण्यासाठी प्रशिक्षण मॉड्यूल्स पूर्ण करा आणि रेड फ्लॅग्स ओळखा. प्रत्येक बॅज तुमच्या डिजिटल सुरक्षिती प्रवासातील एक महत्त्वाचे टप्पा प्रतिनिधित्व करतो.',
  }
};

export const VoiceProvider = ({ children }) => {
  const { currentLanguage } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWaveform, setShowWaveform] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [highlightedWord, setHighlightedWord] = useState(-1);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [useGoogleCloud, setUseGoogleCloud] = useState(false);
  const speechRef = useRef(null);
  const wordsRef = useRef([]);
  const audioRef = useRef(null);
  
  // Preload voices on mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis?.getVoices() || [];
      setAvailableVoices(voices);
      console.log('Preloaded voices:', voices.length);
      console.log('All available voices:');
      voices.forEach((v, i) => console.log(`${i + 1}. ${v.name} - ${v.lang}`));
    };
    
    if ('speechSynthesis' in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);
  
  // Check if Google Cloud TTS is available
  useEffect(() => {
    const checkGoogleCloud = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        const data = await response.json();
        setUseGoogleCloud(data.ttsConfigured);
        console.log('Google Cloud TTS available:', data.ttsConfigured);
      } catch (error) {
        console.log('Google Cloud TTS not available, using browser TTS');
        setUseGoogleCloud(false);
      }
    };
    checkGoogleCloud();
  }, []);

  // Stop any playing audio when language changes
  useEffect(() => {
    console.log('Language changed to:', currentLanguage, '- stopping any playing audio');
    // Stop browser TTS
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    // Stop Google Cloud audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setShowWaveform(false);
  }, [currentLanguage]);

  // Play using Google Cloud TTS API
  const playGoogleCloudTTS = useCallback(async (text, language) => {
    try {
      const response = await fetch('http://localhost:5000/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language })
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      // Convert base64 to audio
      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
        { type: 'audio/mp3' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Play audio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onplay = () => {
        console.log('Google Cloud TTS playing');
        setIsPlaying(true);
        setShowWaveform(true);
      };
      
      audio.onended = () => {
        console.log('Google Cloud TTS finished');
        setIsPlaying(false);
        setShowWaveform(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = (error) => {
        console.error('Audio playback error:', error);
        setIsPlaying(false);
        setShowWaveform(false);
      };
      
      await audio.play();
      return true;
      
    } catch (error) {
      console.error('Google Cloud TTS error:', error);
      return false;
    }
  }, []);

  const playInstruction = useCallback(async (path) => {
    // Get current language at play time (not from closure)
    const activeLanguage = currentLanguage;
    const langInstructions = pageInstructions[activeLanguage] || pageInstructions.english;
    const text = langInstructions[path] || langInstructions['/'];
    
    console.log('Playing audio for:', path, 'Language:', activeLanguage, 'Text:', text.substring(0, 50));
    
    // Force stop any existing audio before starting new
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    // Try Google Cloud TTS first (for better quality)
    if (useGoogleCloud) {
      console.log('Trying Google Cloud TTS for', activeLanguage);
      const success = await playGoogleCloudTTS(text, activeLanguage);
      if (success) {
        console.log('✅ Using Google Cloud TTS');
        return;
      }
      console.log('⚠️ Falling back to browser TTS');
    }
    
    // Fall back to browser TTS
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech again to be safe
      window.speechSynthesis.cancel();
      
      // Wait for voices to be loaded (important for Chrome)
      const speak = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.length);
        console.log('Voices list:', voices.map(v => `${v.name} (${v.lang})`));
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9; // Slightly slower for elderly users
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Map language to proper BCP 47 language tag
        const langMap = {
          english: 'en-IN',
          hindi: 'hi-IN',
          marathi: 'mr-IN'
        };
        
        const targetLang = langMap[currentLanguage] || 'en-IN';
        utterance.lang = targetLang; // Set utterance language
        console.log('Target language:', targetLang);
        
        // Try to find appropriate voice for language
        const langCode = currentLanguage === 'english' ? 'en' : 
                        currentLanguage === 'hindi' ? 'hi' : 'mr';
        
        // First try: Exact match with full language code
        let voice = voices.find(v => v.lang.toLowerCase().startsWith(langCode + '-'));
        
        // Second try: Partial match with language code
        if (!voice) {
          voice = voices.find(v => v.lang.toLowerCase().startsWith(langCode));
        }
        
        // Third try: For Hindi/Marathi, try to find any Indian language voice
        if (!voice && (currentLanguage === 'hindi' || currentLanguage === 'marathi')) {
          voice = voices.find(v => v.lang.toLowerCase().includes('in') || v.lang.toLowerCase().includes('india'));
        }
        
        // Fourth try: For Marathi, fallback to Hindi voice if available
        if (!voice && currentLanguage === 'marathi') {
          voice = voices.find(v => v.lang.toLowerCase().startsWith('hi'));
          if (voice) {
            console.log('Using Hindi voice as fallback for Marathi');
          }
        }
        
        // Fifth try: For English, use default
        if (!voice && currentLanguage === 'english') {
          voice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
        }
        
        if (voice) {
          utterance.voice = voice;
          console.log('Using voice:', voice.name, 'Lang:', voice.lang);
        } else {
          console.warn('No voice found for language:', currentLanguage, '- using browser default');
          
          // Alert user if voices are missing
          if (currentLanguage === 'hindi') {
            console.warn('Hindi voice not found. Please install Hindi language pack in Windows Settings > Time & Language > Language.');
          } else if (currentLanguage === 'marathi') {
            console.warn('Marathi voice not found. Using Hindi voice as fallback. For better experience, consider using Google Chrome with Google Translate extension or install third-party Marathi TTS software.');
          }
        }
        
        // Split text into words for highlighting
        wordsRef.current = text.split(' ');
        setCurrentText(text);
        
        utterance.onstart = () => {
          console.log('Audio started playing');
          setIsPlaying(true);
          setShowWaveform(true);
        };
        
        utterance.onend = () => {
          console.log('Audio finished');
          setIsPlaying(false);
          setShowWaveform(false);
          setHighlightedWord(-1);
        };
        
        utterance.onerror = (event) => {
          console.error('Audio error:', event.error);
          setIsPlaying(false);
          setShowWaveform(false);
        };
        
        utterance.onpause = () => {
          setIsPlaying(false);
        };
        
        utterance.onresume = () => {
          setIsPlaying(true);
        };

        // Word boundary tracking (approximate)
        let wordIndex = 0;
        utterance.onboundary = (event) => {
          if (event.name === 'word') {
            setHighlightedWord(wordIndex);
            wordIndex++;
          }
        };
        
        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      };
      
      // Chrome needs voices loaded first
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = speak;
      } else {
        speak();
      }
    } else {
      console.error('speechSynthesis not supported');
      alert('Voice guidance is not supported in your browser.');
    }
  }, [currentLanguage]);

  const stopInstruction = useCallback(() => {
    // Stop browser TTS
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    // Stop Google Cloud audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setShowWaveform(false);
    setHighlightedWord(-1);
  }, []);

  const togglePlay = useCallback((path) => {
    if (isPlaying) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      }
    } else {
      playInstruction(path);
    }
  }, [isPlaying]);

  const value = {
    isPlaying,
    showWaveform,
    currentText,
    highlightedWord,
    wordsRef,
    playInstruction,
    stopInstruction,
    togglePlay,
    hasSupport: 'speechSynthesis' in window || useGoogleCloud,
    availableVoices,
    useGoogleCloud
  };

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>;
};
