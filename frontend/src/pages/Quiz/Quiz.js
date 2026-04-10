import React, { useState, useEffect } from 'react';
import {
  Shield,
  Volume2,
  Trophy,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Lock,
  ArrowLeft,
  Sparkles,
  Brain,
  Info,
  Award,
  Eye,
  Mail,
  Smartphone,
  CreditCard,
  MessageSquare,
  Loader,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageNotification from '../../components/PageNotification/PageNotification';
import API from '../../api/axios';
import './Quiz.css';

// Quiz Module Configurations (for generating from backend)
const quizConfigs = [
  {
    id: 'upi-safety',
    title: 'UPI Safety',
    description: 'Learn to identify UPI payment scams and protect your money',
    icon: CreditCard,
    difficulty: 'Beginner',
    category: 'Payments',
    module: 'upi-safety'
  },
  {
    id: 'email-phishing',
    title: 'Email Phishing',
    description: 'Spot fake emails and phishing attempts in your inbox',
    icon: Mail,
    difficulty: 'Beginner',
    category: 'Email Security',
    module: 'email-security'
  },
  {
    id: 'whatsapp-scams',
    title: 'WhatsApp Scams',
    description: 'Identify suspicious messages and fraud attempts on WhatsApp',
    icon: MessageSquare,
    difficulty: 'Beginner',
    category: 'Messaging',
    module: 'whatsapp-security'
  },
  {
    id: 'phone-fraud',
    title: 'Phone Call Scams',
    description: 'Recognize fake bank calls and phone fraud attempts',
    icon: Smartphone,
    difficulty: 'Intermediate',
    category: 'Phone Security',
    module: 'phone-security'
  }
];

// Badge System
const badges = [
  { id: 'beginner', name: 'Safety Starter', icon: Shield, color: '#22C55E', description: 'Completed first quiz module' },
  { id: 'sharp', name: 'Sharp Eye', icon: Eye, color: '#3B82F6', description: 'Spotted 5 scams correctly' },
  { id: 'email-pro', name: 'Email Pro', icon: Mail, color: '#F59E0B', description: 'Mastered email phishing detection' },
  { id: 'upi-master', name: 'UPI Master', icon: CreditCard, color: '#8B5CF6', description: 'Perfect score on UPI safety' },
  { id: 'expert', name: 'Safety Expert', icon: Award, color: '#EF4444', description: 'Completed all modules with 90%+' }
];

// Language options
const languages = [
  { code: 'english', name: 'English', flag: '🇬🇧' },
  { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'marathi', name: 'मराठी', flag: '🇮🇳' }
];

const Quiz = () => {
  const { isElderly } = useAuth();
  const [activeModule, setActiveModule] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState(['beginner']);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [pendingModule, setPendingModule] = useState(null);
  
  // Backend integration states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [totalQuestions] = useState(5);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = isElderly ? 0.8 : 1;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Generate single question from backend
  const generateSingleQuestion = async (moduleConfig, questionNum) => {
    const response = await API.post('/quiz/generate', {
      module: moduleConfig.module,
      difficulty: moduleConfig.difficulty.toLowerCase(),
      type: questionNum % 2 === 0 ? 'scenario' : 'image',
      language: selectedLanguage
    });
    
    if (response.data.success) {
      const backendQuiz = response.data.quiz;
      return {
        id: questionNum,
        type: backendQuiz.type || 'scenario',
        category: backendQuiz.skillsTested?.[0] || moduleConfig.category,
        title: backendQuiz.title,
        scenarioText: backendQuiz.scenario,
        imageDescription: backendQuiz.imageDescription,
        imageUrl: backendQuiz.imageUrl,
        question: backendQuiz.question,
        options: backendQuiz.options.map((opt, idx) => ({
          id: String.fromCharCode(97 + idx),
          text: opt,
          isCorrect: opt === backendQuiz.correctAnswer
        })),
        explanation: {
          correct: backendQuiz.explanation,
          tips: backendQuiz.redFlags || backendQuiz.tellsToSpot || [],
          redFlags: backendQuiz.redFlags || backendQuiz.tellsToSpot || []
        }
      };
    }
    return null;
  };

  // Generate full quiz (5 questions)
  const generateQuiz = async (moduleConfig) => {
    setLoading(true);
    setError(null);
    
    try {
      const questions = [];
      for (let i = 0; i < totalQuestions; i++) {
        const question = await generateSingleQuestion(moduleConfig, i + 1);
        if (question) {
          questions.push(question);
        }
      }
      
      if (questions.length === 0) {
        setError('Failed to generate quiz questions. Please try again.');
        setLoading(false);
        return;
      }
      
      const quizData = {
        id: moduleConfig.id,
        title: moduleConfig.title,
        description: moduleConfig.description,
        icon: moduleConfig.icon,
        difficulty: moduleConfig.difficulty,
        category: moduleConfig.category,
        questions: questions
      };
      
      setQuizQuestions(questions);
      setCurrentQuiz(quizData);
      setActiveModule(quizData);
      setCurrentQuestion(0);
      setScore(0);
      setAnswers([]);
      setShowWelcome(false);
      setShowFeedback(false);
      setSelectedOption(null);
      setShowLanguageSelect(false);
      
    } catch (err) {
      console.error('Quiz generation error:', err);
      setError(err.response?.data?.message || 'Failed to load quiz. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartModule = (moduleConfig) => {
    setPendingModule(moduleConfig);
    setShowLanguageSelect(true);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    if (pendingModule) {
      generateQuiz(pendingModule);
    }
  };

  const handleAnswer = () => {
    if (!selectedOption || !currentQuiz || quizQuestions.length === 0) return;

    const question = quizQuestions[currentQuestion];
    if (!question) return;
    
    const isCorrect = question.options.find(o => o.id === selectedOption)?.isCorrect;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, { questionId: question.id, selected: selectedOption, isCorrect }]);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // Quiz completed
      setCompletedModules([...completedModules, currentQuiz?.id]);
      setShowFeedback(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setCurrentQuiz(null);
    setActiveModule(null);
    setQuizQuestions([]);
    setShowWelcome(true);
    setShowLanguageSelect(false);
    setPendingModule(null);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
  };


  // Welcome Screen
  if (showWelcome) {
    return (
      <div className={`quiz-page ${isElderly ? 'elderly-mode' : ''}`}>
        <PageNotification pageKey="pageQuiz" />
        <div className="quiz-container">
          {/* Header */}
          <div className="quiz-header">
            <div className="quiz-header-icon">
              <Shield size={48} />
            </div>
            <h1>Digital Safety Quiz</h1>
            <p className="quiz-subtitle">Learn to spot scams and stay safe online</p>
          </div>

          {/* Progress Overview */}
          <div className="quiz-overview">
            <div className="overview-card">
              <Trophy size={32} />
              <div className="overview-info">
                <span className="overview-value">{completedModules.length}/{quizConfigs.length}</span>
                <span className="overview-label">Modules Completed</span>
              </div>
            </div>
            <div className="overview-card">
              <Target size={32} />
              <div className="overview-info">
                <span className="overview-value">{score}</span>
                <span className="overview-label">Correct Answers</span>
              </div>
            </div>
            <div className="overview-card">
              <Award size={32} />
              <div className="overview-info">
                <span className="overview-value">{earnedBadges.length}</span>
                <span className="overview-label">Badges Earned</span>
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="badges-section">
            <h2>Your Badges</h2>
            <div className="badges-grid">
              {badges.map(badge => {
                const Icon = badge.icon;
                const isEarned = earnedBadges.includes(badge.id);
                return (
                  <div key={badge.id} className={`badge-card ${isEarned ? 'earned' : 'locked'}`}>
                    <div className="badge-icon" style={{ backgroundColor: isEarned ? badge.color : '#e5e7eb' }}>
                      <Icon size={24} color={isEarned ? 'white' : '#9ca3af'} />
                    </div>
                    <div className="badge-info">
                      <span className="badge-name">{badge.name}</span>
                      <span className="badge-desc">{badge.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Language Selection Modal */}
          {showLanguageSelect && (
            <div className="language-modal-overlay">
              <div className="language-modal">
                <h2>Choose Your Language</h2>
                <p>Select your preferred language for the quiz</p>
                <div className="language-options">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      className={`language-btn ${selectedLanguage === lang.code ? 'selected' : ''}`}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      <span className="language-flag">{lang.flag}</span>
                      <span className="language-name">{lang.name}</span>
                    </button>
                  ))}
                </div>
                <button 
                  className="close-language-btn" 
                  onClick={() => setShowLanguageSelect(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Modules */}
          <div className="modules-section">
            <h2>Start Learning</h2>
            
            {/* Loading State */}
            {loading && (
              <div className="quiz-loading">
                <Loader size={48} className="loading-spinner" />
                <p>Generating your personalized quiz...</p>
                <span>This may take a few seconds</span>
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="quiz-error">
                <AlertTriangle size={48} />
                <p>{error}</p>
                <button className="retry-btn" onClick={handleRetry}>
                  <RefreshCw size={18} />
                  Try Again
                </button>
              </div>
            )}
            
            {/* Module List */}
            {!loading && !error && (
              <div className="modules-list">
                {quizConfigs.map(config => {
                  const Icon = config.icon;
                  const isCompleted = completedModules.includes(config.id);
                  return (
                    <div
                      key={config.id}
                      className={`module-card ${isCompleted ? 'completed' : ''}`}
                      onClick={() => !loading && handleStartModule(config)}
                    >
                      <div className="module-icon">
                        <Icon size={32} />
                      </div>
                      <div className="module-content">
                        <div className="module-header">
                          <h3>{config.title}</h3>
                          {isCompleted && <CheckCircle size={20} className="completed-icon" />}
                        </div>
                        <p>{config.description}</p>
                        <div className="module-meta">
                          <span className="difficulty">{config.difficulty}</span>
                          <span className="questions">AI Generated Quiz • 5 Questions</span>
                        </div>
                      </div>
                      <ChevronRight size={24} className="module-arrow" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!activeModule || !currentQuiz || quizQuestions.length === 0) return null;

  // Get current question from quizQuestions array
  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + (showFeedback ? 1 : 0)) / totalQuestions) * 100;

  return (
    <div className={`quiz-page ${isElderly ? 'elderly-mode' : ''}`}>
      <PageNotification pageKey="pageQuiz" />
      <div className="quiz-container">
        {/* Top Bar */}
        <div className="quiz-top-bar">
          <button className="back-btn" onClick={() => setShowWelcome(true)}>
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="progress-info">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          </div>
          <div className="score-info">
            <Trophy size={18} />
            <span>{score}/{currentQuestion + (showFeedback ? 1 : 0)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Question Card - Split Layout */}
        <div className="question-card">
          {!showFeedback ? (
            <div className="split-layout">
              {/* LEFT SIDE - Question Content */}
              <div className="split-left">
                {/* Question Header */}
                <div className="question-header">
                  <div className="category-tag">{question?.category || 'Security Quiz'}</div>
                  <button
                    className={`voice-btn ${isSpeaking ? 'active' : ''}`}
                    onClick={() => isSpeaking ? stopSpeaking() : speakText((question?.scenarioText || question?.imageDescription || '') + '. ' + question?.question)}
                    aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
                  >
                    <Volume2 size={20} />
                    <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                  </button>
                </div>

                {/* Scenario/Image Box */}
                <div className="scenario-box">
                  <h2 className="question-title">{question?.title}</h2>
                  
                  {/* Show image if available */}
                  {question.imageUrl && (
                    <div className="quiz-image-container">
                      <img src={question.imageUrl} alt="Quiz scenario" className="quiz-image" />
                    </div>
                  )}
                  
                  <div className="scenario-text">
                    {question.scenarioText ? (
                      question.scenarioText.split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))
                    ) : question.imageDescription ? (
                      <p>{question.imageDescription}</p>
                    ) : (
                      <p>Read the scenario carefully before answering.</p>
                    )}
                  </div>
                </div>

                {/* Question */}
                <div className="question-text-box">
                  <h3>{question.question}</h3>
                </div>
              </div>

              {/* RIGHT SIDE - Options & Submit */}
              <div className="split-right">
                <div className="options-wrapper">
                  <h4 className="options-label">Select your answer:</h4>
                  <div className="options-grid">
                    {question.options.map((option) => (
                      <button
                        key={option.id}
                        className={`option-card ${selectedOption === option.id ? 'selected' : ''}`}
                        onClick={() => setSelectedOption(option.id)}
                      >
                        <span className="option-letter">{option.id.toUpperCase()}</span>
                        <span className="option-text">{option.text}</span>
                      </button>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <button
                    className="submit-btn"
                    onClick={handleAnswer}
                    disabled={!selectedOption}
                  >
                    {selectedOption ? 'Check Answer' : 'Select an option'}
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Feedback Screen - Centered */
            <div className={`feedback-card ${answers[answers.length - 1]?.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="feedback-header">
                <div className="feedback-icon">
                  {answers[answers.length - 1]?.isCorrect ? (
                    <CheckCircle size={48} />
                  ) : (
                    <XCircle size={48} />
                  )}
                </div>
                <h2>
                  {answers[answers.length - 1]?.isCorrect
                    ? 'Correct! Well done!'
                    : 'Not quite right'}
                </h2>
              </div>

              <div className="explanation-section">
                <h3>Explanation</h3>
                <p className="explanation-text">{question.explanation.correct}</p>

                <div className="tips-box">
                  <h4><Info size={18} /> Key Tips</h4>
                  <ul>
                    {question.explanation.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="redflags-box">
                  <h4><AlertTriangle size={18} /> Red Flags to Watch For</h4>
                  <div className="redflags-list">
                    {question.explanation.redFlags.map((flag, idx) => (
                      <span key={idx} className="redflag-tag">{flag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="next-btn" onClick={handleNext}>
                {currentQuestion < totalQuestions - 1 ? 'Next Question' : `Finish Quiz - Score: ${score}/${totalQuestions}`}
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
