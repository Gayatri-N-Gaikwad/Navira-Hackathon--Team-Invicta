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
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageNotification from '../../components/PageNotification/PageNotification';
import './Quiz.css';

// Quiz Modules Data - Clean structure matching backend
const quizModules = [
  {
    id: 'basics',
    title: 'Digital Safety Basics',
    description: 'Learn to identify common scams and stay safe online',
    icon: Shield,
    difficulty: 'Beginner',
    totalQuestions: 4,
    category: 'Security Awareness',
    questions: [
      {
        id: 1,
        type: 'scenario',
        category: 'WhatsApp Scams',
        title: 'Suspicious Message',
        scenarioText: 'You receive a WhatsApp message from an unknown number:\n\n"Hello sir, your electricity bill is OVERDUE. If you don\'t pay now, your power will be cut within 2 hours. Pay immediately: bit.ly/paybill-now"',
        question: 'What is the safest action to take?',
        options: [
          { id: 'a', text: 'Click the link and pay immediately to avoid power cut', isCorrect: false },
          { id: 'b', text: 'Verify through official electricity website or app', isCorrect: true },
          { id: 'c', text: 'Reply to the message asking for more details', isCorrect: false },
          { id: 'd', text: 'Forward the message to friends to warn them', isCorrect: false }
        ],
        explanation: {
          correct: 'Correct! Always verify through official channels.',
          tips: [
            'Shortened URLs (bit.ly) are often used to hide malicious links',
            'Urgent language creating panic is a classic scam tactic',
            'Always verify bills through official apps or websites',
            'Never click links from unknown senders'
          ],
          redFlags: ['Urgent threats', 'Unknown sender', 'Suspicious shortened link', 'Grammatical errors']
        }
      },
      {
        id: 2,
        type: 'image',
        category: 'Email Phishing',
        title: 'Spot the Fake Email',
        imageUrl: '/images/phishing-email.png',
        imageDescription: 'Email from "SBI Bank <security@sbi-bank.co.in>" with subject "URGENT: Your Account Will Be Blocked". Body text mentions suspicious activity and asks to click a link to verify.',
        question: 'Which red flags indicate this is a phishing email?',
        options: [
          { id: 'a', text: 'Only the urgent subject line', isCorrect: false },
          { id: 'b', text: 'Wrong sender domain and suspicious link', isCorrect: false },
          { id: 'c', text: 'Urgent tone, wrong domain, suspicious link, and generic greeting', isCorrect: true },
          { id: 'd', text: 'Nothing - this looks like a legitimate email', isCorrect: false }
        ],
        explanation: {
          correct: 'Excellent! You spotted all the warning signs.',
          tips: [
            'Official SBI emails come from @sbi.co.in or @onlinesbi.sbi',
            'Banks never ask you to click links in emails to verify accounts',
            'Urgent threats are designed to make you act without thinking',
            'Generic greetings like "Dear Customer" are common in phishing'
          ],
          redFlags: ['Wrong email domain (@sbi-bank.co.in)', 'Urgent threatening language', 'Suspicious link', 'Generic greeting']
        }
      },
      {
        id: 3,
        type: 'scenario',
        category: 'UPI Safety',
        title: 'Payment Request Scam',
        scenarioText: 'You receive a UPI payment request of ₹5,000 on your PhonePe app. The request is from "Merchant - Flipkart Order" with the message "Approve to complete your order".\n\nHowever, you don\'t remember placing any recent order.',
        question: 'What should you do?',
        options: [
          { id: 'a', text: 'Approve it - it might be a delayed order', isCorrect: false },
          { id: 'b', text: 'Decline and check your Flipkart order history first', isCorrect: true },
          { id: 'c', text: 'Call the merchant number shown in the request', isCorrect: false },
          { id: 'd', text: 'Approve a smaller amount first to test', isCorrect: false }
        ],
        explanation: {
          correct: 'Smart move! Never approve UPI requests you did not initiate.',
          tips: [
            'UPI requests can be sent by anyone - verify before approving',
            'Check your actual order history in the official Flipkart app',
            'Scammers often use names of popular companies',
            'Never call numbers provided in suspicious requests'
          ],
          redFlags: ['Unexpected payment request', 'Generic merchant name', 'Urgency to approve', 'Unknown origin']
        }
      },
      {
        id: 4,
        type: 'scenario',
        category: 'Phone Scams',
        title: 'Fake Bank Call',
        scenarioText: 'You receive a call from someone claiming to be from HDFC Bank:\n\n"Hello, I am calling from HDFC Bank security department. We have detected suspicious transactions on your card ending in 4521. To block your card immediately, please share the OTP you just received on your phone."',
        question: 'How should you respond to this call?',
        options: [
          { id: 'a', text: 'Share the OTP quickly to block the card', isCorrect: false },
          { id: 'b', text: 'Ask for their employee ID to verify', isCorrect: false },
          { id: 'c', text: 'Hang up and call HDFC official customer care', isCorrect: true },
          { id: 'd', text: 'Give them your card number for verification', isCorrect: false }
        ],
        explanation: {
          correct: 'Correct! Banks never ask for OTPs over the phone.',
          tips: [
            'Banks NEVER ask for OTPs, PINs, or passwords over phone',
            'Always hang up and call the official number yourself',
            'Employee IDs can be faked - verify independently',
            'Use the customer care number on your bank card or statement'
          ],
          redFlags: ['Asking for OTP/PIN', 'Creating urgency', 'Unsolicited call', 'Threatening consequences']
        }
      }
    ]
  },
  {
    id: 'intermediate',
    title: 'Advanced Scam Detection',
    description: 'Learn to spot sophisticated scams and social engineering',
    icon: Eye,
    difficulty: 'Intermediate',
    totalQuestions: 3,
    category: 'Advanced Security',
    questions: [
      {
        id: 5,
        type: 'scenario',
        category: 'Social Engineering',
        title: 'Fake Tech Support',
        scenarioText: 'A pop-up appears on your computer saying "VIRUS DETECTED! Call Microsoft Support immediately at 1800-XXX-XXXX". The screen is flashing red and making beeping sounds.',
        question: 'What is the best response?',
        options: [
          { id: 'a', text: 'Call the number immediately', isCorrect: false },
          { id: 'b', text: 'Close the browser and run antivirus', isCorrect: true },
          { id: 'c', text: 'Click "Remove Virus" button on the pop-up', isCorrect: false },
          { id: 'd', text: 'Share your credit card to buy their antivirus', isCorrect: false }
        ],
        explanation: {
          correct: 'Right! These are fake tech support scams.',
          tips: [
            'Legitimate antivirus never asks you to call numbers',
            'Close the browser using Task Manager if needed',
            'Run your own trusted antivirus software',
            'Never give credit card info to unsolicited support'
          ],
          redFlags: ['Fake virus warnings', 'Urgency', 'Requests to call numbers', 'Payment demands']
        }
      },
      {
        id: 6,
        type: 'scenario',
        category: 'Investment Scams',
        title: 'Too Good to Be True',
        scenarioText: 'You receive a message: "Invest ₹10,000 and get ₹50,000 in 7 days! Guaranteed returns by SEBI registered expert. Many people have earned lakhs. Limited spots available!"',
        question: 'What should you do?',
        options: [
          { id: 'a', text: 'Invest quickly before spots fill', isCorrect: false },
          { id: 'b', text: 'Research the company on SEBI website first', isCorrect: true },
          { id: 'c', text: 'Invest a small amount to test', isCorrect: false },
          { id: 'd', text: 'Refer friends to earn commission', isCorrect: false }
        ],
        explanation: {
          correct: 'Correct! Verify all investment claims through official channels.',
          tips: [
            'Guaranteed high returns are always suspicious',
            'Verify SEBI registration on official SEBI website',
            'Pyramid schemes often ask you to refer friends',
            'If it sounds too good to be true, it probably is'
          ],
          redFlags: ['Guaranteed high returns', 'Urgency', 'Pyramid-style referrals', 'Unregistered operators']
        }
      },
      {
        id: 7,
        type: 'scenario',
        category: 'QR Code Scams',
        title: 'Scan to Win',
        scenarioText: 'You receive a QR code via WhatsApp with the message: "Scan this QR code to win iPhone 15! Winner announced in 24 hours. 100% genuine Flipkart offer!"',
        question: 'Is this safe to scan?',
        options: [
          { id: 'a', text: 'Yes, it claims to be from Flipkart', isCorrect: false },
          { id: 'b', text: 'Scan only if it comes from official Flipkart number', isCorrect: false },
          { id: 'c', text: 'Never scan QR codes from unknown sources', isCorrect: true },
          { id: 'd', text: 'Scan but don\'t enter any details', isCorrect: false }
        ],
        explanation: {
          correct: 'Correct! QR codes from unknown sources can be dangerous.',
          tips: [
            'Malicious QR codes can steal your data or money',
            'Never scan codes sent by strangers',
            'Verify offers through official websites only',
            'QR codes can redirect to phishing sites'
          ],
          redFlags: ['Too-good-to-be-true offers', 'Unknown sender', 'Urgency', 'QR codes in messages']
        }
      }
    ]
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

  const handleStartModule = (module) => {
    setActiveModule(module);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowWelcome(false);
    setShowFeedback(false);
    setSelectedOption(null);
  };

  const handleAnswer = () => {
    if (!selectedOption) return;

    const question = activeModule.questions[currentQuestion];
    const isCorrect = question.options.find(o => o.id === selectedOption)?.isCorrect;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, { questionId: question.id, selected: selectedOption, isCorrect }]);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < activeModule.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setCompletedModules([...completedModules, activeModule.id]);
      setActiveModule(null);
      setShowWelcome(true);
    }
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
                <span className="overview-value">{completedModules.length}/{quizModules.length}</span>
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

          {/* Modules */}
          <div className="modules-section">
            <h2>Start Learning</h2>
            <div className="modules-list">
              {quizModules.map(module => {
                const Icon = module.icon;
                const isCompleted = completedModules.includes(module.id);
                return (
                  <div
                    key={module.id}
                    className={`module-card ${isCompleted ? 'completed' : ''}`}
                    onClick={() => handleStartModule(module)}
                  >
                    <div className="module-icon">
                      <Icon size={32} />
                    </div>
                    <div className="module-content">
                      <div className="module-header">
                        <h3>{module.title}</h3>
                        {isCompleted && <CheckCircle size={20} className="completed-icon" />}
                      </div>
                      <p>{module.description}</p>
                      <div className="module-meta">
                        <span className="difficulty">{module.difficulty}</span>
                        <span className="questions">{module.totalQuestions} questions</span>
                      </div>
                    </div>
                    <ChevronRight size={24} className="module-arrow" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!activeModule) return null;

  const question = activeModule.questions[currentQuestion];
  const progress = ((currentQuestion) / activeModule.questions.length) * 100;

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
            <span>Question {currentQuestion + 1} of {activeModule.questions.length}</span>
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

        {/* Question Card */}
        <div className="question-card">
          {!showFeedback ? (
            <>
              {/* Question Header */}
              <div className="question-header">
                <div className="category-tag">{question.category}</div>
                <button
                  className={`voice-btn ${isSpeaking ? 'active' : ''}`}
                  onClick={() => isSpeaking ? stopSpeaking() : speakText(question.scenarioText + '. ' + question.question)}
                  aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
                >
                  <Volume2 size={20} />
                  <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                </button>
              </div>

              {/* Scenario Box */}
              <div className="scenario-box">
                <h2 className="question-title">{question.title}</h2>
                <div className="scenario-text">
                  {question.scenarioText.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className="question-text-box">
                <h3>{question.question}</h3>
              </div>

              {/* Options */}
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
            </>
          ) : (
            /* Feedback Screen */
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
                {currentQuestion < activeModule.questions.length - 1 ? 'Next Question' : 'Finish Module'}
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
