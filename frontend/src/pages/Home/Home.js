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
          <h2>{t('whyDigitalSafetyMatters')}</h2>
        </div>
        <div className="problem-grid">
          <div className="problem-card">
            <TrendingUp size={40} className="problem-icon" />
            <h3>{t('onlineScamsIncreasing')}</h3>
            <p>{t('onlineScamsDescription')}</p>
          </div>
          <div className="problem-card">
            <Lock size={40} className="problem-icon" />
            <h3>{t('peopleLoseMoneyIdentity')}</h3>
            <p>{t('peopleLoseMoneyDescription')}</p>
          </div>
          <div className="problem-card">
            <Eye size={40} className="problem-icon" />
            <h3>{t('lackOfAwareness')}</h3>
            <p>{t('lackOfAwarenessDescription')}</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="section-header">
          <Lightbulb className="section-icon" size={32} />
          <h2>{t('howGuardianSathiHelps')}</h2>
        </div>
        <div className="solution-grid">
          <div className="solution-card">
            <div className="solution-number">1</div>
            <h3>{t('interactiveLearning')}</h3>
            <p>{t('interactiveLearningDescription')}</p>
          </div>
          <div className="solution-card">
            <div className="solution-number">2</div>
            <h3>{t('safePracticeEnvironment')}</h3>
            <p>{t('safePracticeEnvironmentDescription')}</p>
          </div>
          <div className="solution-card">
            <div className="solution-number">3</div>
            <h3>{t('realWorldScenarios')}</h3>
            <p>{t('realWorldScenariosDescription')}</p>
          </div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="awareness-section">
        <div className="section-header">
          <Shield className="section-icon primary" size={32} />
          <h2>{t('didYouKnow')}</h2>
        </div>
        <div className="awareness-grid">
          <div className="awareness-card">
            <div className="awareness-badge">⚠️</div>
            <h3>{t('otpNeverShared')}</h3>
            <p>{t('otpNeverSharedDescription')}</p>
          </div>
          <div className="awareness-card">
            <div className="awareness-badge">⏰</div>
            <h3>{t('scammersCreateUrgency')}</h3>
            <p>{t('scammersCreateUrgencyDescription')}</p>
          </div>
          <div className="awareness-card">
            <div className="awareness-badge">🎭</div>
            <h3>{t('fakeWebsitesLookReal')}</h3>
            <p>{t('fakeWebsitesLookRealDescription')}</p>
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="target-section">
        <div className="section-header">
          <Users className="section-icon" size={32} />
          <h2>{t('whoCanBenefit')}</h2>
        </div>
        <div className="target-grid">
          <div className="target-card">
            <div className="target-icon elderly">👴</div>
            <h3>{t('elderlyUsers')}</h3>
            <p>{t('elderlyUsersDescription')}</p>
          </div>
          <div className="target-card">
            <div className="target-icon beginner">🌱</div>
            <h3>{t('beginners')}</h3>
            <p>{t('beginnersDescription')}</p>
          </div>
          <div className="target-card">
            <div className="target-icon student">🎓</div>
            <h3>{t('students')}</h3>
            <p>{t('studentsDescription')}</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <Globe size={48} className="mission-icon" />
          <h2>{t('ourMission')}</h2>
          <p className="mission-quote">
            "{t('missionQuote')}"
          </p>
          <p className="mission-text">
            {t('missionText')}
          </p>
          {!isAuthenticated && (
            <div className="mission-cta">
              <p>{t('readyToStartJourney')}</p>
              <Link to="/signup" className="btn btn-accent">
                {t('getStartedToday')}
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
