import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Award,
  ChevronRight,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import PageNotification from '../../components/PageNotification/PageNotification';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated, isElderly } = useAuth();
  const { progress } = useProgress();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const modules = [
    { 
      id: 'aadhaar', 
      name: t('aadhaarSafety'), 
      icon: Shield,
      color: '#4caf50',
      description: t('protectAadhaarInfo')
    },
    { 
      id: 'upi', 
      name: t('upiSafetyDashboard'), 
      icon: Lock,
      color: '#2196f3',
      description: t('secureDigitalPayments')
    },
    { 
      id: 'jobScam', 
      name: t('jobScamAwareness'), 
      icon: AlertTriangle,
      color: '#ff9800',
      description: t('identifyFakeJobOffers'),
      locked: true
    }
  ];

  const getStatusBadge = (moduleId) => {
    const module = progress.modules[moduleId];
    if (!module) return { text: t('locked'), class: 'locked' };
    
    if (module.completed) return { text: t('completed'), class: 'completed' };
    if (module.locked) return { text: t('locked'), class: 'locked' };
    if (module.percentage > 0) return { text: t('inProgress'), class: 'in-progress' };
    return { text: t('locked'), class: 'locked' };
  };

  return (
    <div className={`dashboard-page ${isElderly ? 'elderly-mode' : ''}`}>
      {/* Page Notification */}
      <PageNotification pageKey="pageDashboard" />
      
      {/* Welcome Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <div className="user-avatar">
            <User size={32} />
          </div>
          <div className="welcome-text">
            <h1>
              {isAuthenticated ? `${t('welcomeUser')}, ${user.username}!` : t('welcome')}
            </h1>
            <p>{t('continueJourney')}</p>
          </div>
        </div>

        {/* Overall Score Circle */}
        <div className="score-circle-container">
          <div className="score-circle" style={{ '--score': `${progress.overallScore}%` }}>
            <svg viewBox="0 0 100 100">
              <circle className="score-bg" cx="50" cy="50" r="45" />
              <circle className="score-progress" cx="50" cy="50" r="45" />
            </svg>
            <div className="score-content">
              <span className="score-value">{progress.overallScore}%</span>
              <span className="score-label">{t('overallScore')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <CheckCircle size={24} className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">{progress.totalModulesCompleted}</span>
            <span className="stat-label">{t('modulesCompleted')}</span>
          </div>
        </div>
        <div className="stat-card">
          <AlertTriangle size={24} className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">{progress.redFlagsIdentified}</span>
            <span className="stat-label">{t('redFlagsFound')}</span>
          </div>
        </div>
        <div className="stat-card">
          <Award size={24} className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">
              {Object.values(progress.badges).filter(b => b.unlocked).length}
            </span>
            <span className="stat-label">{t('badgesEarned')}</span>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="progress-section">
        <h2 className="section-title">
          <TrendingUp size={24} />
          {t('learningProgress')}
        </h2>
        
        <div className="progress-grid">
          {modules.map((module) => {
            const moduleProgress = progress.modules[module.id] || { percentage: 0, score: 0 };
            const status = getStatusBadge(module.id);
            const Icon = module.icon;

            return (
              <div 
                key={module.id} 
                className={`progress-card ${status.class} ${moduleProgress.locked ? 'locked' : ''}`}
                onClick={() => !moduleProgress.locked && navigate('/sandbox')}
              >
                <div className="progress-card-header">
                  <div className="module-icon" style={{ backgroundColor: `${module.color}20`, color: module.color }}>
                    <Icon size={28} />
                  </div>
                  <div className="module-info">
                    <h3>{module.name}</h3>
                    <p>{module.description}</p>
                  </div>
                  <span className={`status-badge ${status.class}`}>
                    {status.text}
                  </span>
                </div>

                <div className="progress-bar-container">
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${moduleProgress.percentage}%`, backgroundColor: module.color }}
                    />
                  </div>
                  <span className="progress-percentage">{moduleProgress.percentage}%</span>
                </div>

                {moduleProgress.score > 0 && (
                  <div className="module-score">
                    <span>{t('bestScore', { score: moduleProgress.score })}</span>
                  </div>
                )}

                {moduleProgress.locked && (
                  <div className="locked-overlay">
                    <Lock size={32} />
                    <span>{t('completePreviousModules')}</span>
                  </div>
                )}

                {!moduleProgress.locked && (
                  <div className="continue-arrow">
                    <ChevronRight size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">
          <Clock size={24} />
          {t('quickActions')}
        </h2>
        <div className="action-buttons">
          <button className="action-btn primary" onClick={() => navigate('/sandbox')}>
            <Shield size={20} />
            {t('continueTraining')}
          </button>
          <button className="action-btn secondary" onClick={() => navigate('/badges')}>
            <Award size={20} />
            {t('viewBadges')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
