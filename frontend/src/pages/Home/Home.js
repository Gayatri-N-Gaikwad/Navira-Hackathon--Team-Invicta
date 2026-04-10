import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Gamepad2, 
  HelpCircle, 
  AlertTriangle, 
  Lightbulb, 
  Users, 
  Globe,
  TrendingUp,
  Lock,
  Clock,
  Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import PageNotification from '../../components/PageNotification/PageNotification';
import './Home.css';

const Home = () => {
  const { user, isAuthenticated, isElderly } = useAuth();
  const { t } = useLanguage();

  return (
    <div className={`home-page ${isElderly ? 'elderly-mode' : ''}`}>
      {/* Page Notification */}
      <PageNotification pageKey="pageHome" />
      
      {/* Dynamic Welcome Section */}
      <section className="welcome-banner">
        <div className="welcome-content">
          {isAuthenticated ? (
            <>
              <h1>{t('welcomeUser')}, {user.username}! 👋</h1>
              <p>{t('continueJourney')}</p>
            </>
          ) : (
            <>
              <h1>{t('welcome')}</h1>
              <p>{t('subtitle')}</p>
            </>
          )}
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h2>{t('heroTitle')}</h2>
            <p>{t('heroSubtitle')}</p>
            <div className="hero-buttons">
              <Link to="/sandbox" className="btn btn-primary">
                <Gamepad2 size={20} />
                {t('exploreSandbox')}
              </Link>
              <Link to="/quiz" className="btn btn-secondary">
                <HelpCircle size={20} />
                {t('takeQuiz')}
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="shield-animation">
              <Shield size={120} className="shield-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="section-header">
          <AlertTriangle className="section-icon warning" size={32} />
          <h2>Why Digital Safety Matters</h2>
        </div>
        <div className="problem-grid">
          <div className="problem-card">
            <TrendingUp size={40} className="problem-icon" />
            <h3>Online Scams Increasing</h3>
            <p>Cybercrime is on the rise, with millions falling victim to online scams every year.</p>
          </div>
          <div className="problem-card">
            <Lock size={40} className="problem-icon" />
            <h3>People Lose Money & Identity</h3>
            <p>Financial fraud and identity theft can have devastating consequences for victims.</p>
          </div>
          <div className="problem-card">
            <Eye size={40} className="problem-icon" />
            <h3>Lack of Awareness</h3>
            <p>Many users, especially elderly and beginners, lack the knowledge to identify threats.</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="section-header">
          <Lightbulb className="section-icon" size={32} />
          <h2>How GuardianSathi Helps</h2>
        </div>
        <div className="solution-grid">
          <div className="solution-card">
            <div className="solution-number">1</div>
            <h3>Interactive Learning</h3>
            <p>Learn through hands-on experience in a safe, simulated environment.</p>
          </div>
          <div className="solution-card">
            <div className="solution-number">2</div>
            <h3>Safe Practice Environment</h3>
            <p>Make mistakes and learn from them without any real-world consequences.</p>
          </div>
          <div className="solution-card">
            <div className="solution-number">3</div>
            <h3>Real-World Scenarios</h3>
            <p>Practice with realistic scam scenarios you're likely to encounter.</p>
          </div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="awareness-section">
        <div className="section-header">
          <Shield className="section-icon primary" size={32} />
          <h2>Did You Know?</h2>
        </div>
        <div className="awareness-grid">
          <div className="awareness-card">
            <div className="awareness-badge">⚠️</div>
            <h3>OTP Should Never Be Shared</h3>
            <p>Your One-Time Password is the key to your accounts. Never share it with anyone, even if they claim to be from your bank.</p>
          </div>
          <div className="awareness-card">
            <div className="awareness-badge">⏰</div>
            <h3>Scammers Create Urgency</h3>
            <p>"Act now or lose everything" is a common tactic. Take your time to verify before taking action.</p>
          </div>
          <div className="awareness-card">
            <div className="awareness-badge">🎭</div>
            <h3>Fake Websites Look Real</h3>
            <p>Scammers create convincing copies of real websites. Always check the URL carefully.</p>
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="target-section">
        <div className="section-header">
          <Users className="section-icon" size={32} />
          <h2>Who Can Benefit?</h2>
        </div>
        <div className="target-grid">
          <div className="target-card">
            <div className="target-icon elderly">👴</div>
            <h3>Elderly Users</h3>
            <p>Special focus on accessibility with larger text, simple navigation, and patient learning pace.</p>
          </div>
          <div className="target-card">
            <div className="target-icon beginner">🌱</div>
            <h3>Beginners</h3>
            <p>New to digital services? Start from the basics and build confidence step by step.</p>
          </div>
          <div className="target-card">
            <div className="target-icon student">🎓</div>
            <h3>Students</h3>
            <p>Learn essential digital safety skills to protect yourself as you explore the online world.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <Globe size={48} className="mission-icon" />
          <h2>Our Mission</h2>
          <p className="mission-quote">
            "To make every user digitally safe and confident"
          </p>
          <p className="mission-text">
            We believe everyone deserves to use digital services without fear. 
            GuardianSathi is committed to empowering users with the knowledge and 
            skills to navigate the digital world safely.
          </p>
          {!isAuthenticated && (
            <div className="mission-cta">
              <p>Ready to start your safety journey?</p>
              <Link to="/signup" className="btn btn-accent">
                Get Started Today
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
