import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  Target, 
  Award,
  Lock,
  ChevronLeft,
  Star,
  Trophy
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import PageNotification from '../../components/PageNotification/PageNotification';
import './Badges.css';

const Badges = () => {
  const { isElderly } = useAuth();
  const { progress } = useProgress();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const badges = [
    {
      id: 'scamDetector',
      name: t('scamDetector'),
      description: t('badgeLocked'),
      icon: Shield,
      color: '#4caf50',
      requirement: `${progress.badges.scamDetector.progress}/${progress.badges.scamDetector.required} modules`,
      unlocked: progress.badges.scamDetector.unlocked
    },
    {
      id: 'sharpObserver',
      name: t('sharpObserver'),
      description: t('badgeLocked'),
      icon: Search,
      color: '#2196f3',
      requirement: `${progress.badges.sharpObserver.progress}/${progress.badges.sharpObserver.required} red flags`,
      unlocked: progress.badges.sharpObserver.unlocked
    },
    {
      id: 'safeUser',
      name: t('safeUser'),
      description: t('badgeLocked'),
      icon: Target,
      color: '#ff9800',
      requirement: 'Perfect score required',
      unlocked: progress.badges.safeUser.unlocked
    },
    {
      id: 'quickLearner',
      name: 'Quick Learner',
      description: 'Complete 2 modules in one day',
      icon: Trophy,
      color: '#9c27b0',
      requirement: 'Complete 2 modules',
      unlocked: false
    },
    {
      id: 'persistent',
      name: 'Persistent',
      description: 'Retry a module after failing',
      icon: Star,
      color: '#f44336',
      requirement: 'Retry any module',
      unlocked: false
    },
    {
      id: 'masterGuardian',
      name: 'Master Guardian',
      description: 'Complete all training modules',
      icon: Award,
      color: '#ffd700',
      requirement: 'All modules complete',
      unlocked: false,
      special: true
    }
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalCount = badges.length;

  return (
    <div className={`badges-page ${isElderly ? 'elderly-mode' : ''}`}>
      {/* Page Notification */}
      <PageNotification pageKey="pageBadges" />
      
      {/* Header */}
      <div className="badges-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ChevronLeft size={24} />
          {t('backToDashboard')}
        </button>
        <h1>{t('yourAchievements')}</h1>
        <div className="badges-summary">
          <Award size={24} />
          <span>{unlockedCount}/{totalCount} {t('unlocked')}</span>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="badges-overview">
        <div className="overview-card">
          <div className="overview-icon unlocked">
            <Shield size={32} />
          </div>
          <div className="overview-info">
            <span className="overview-value">{unlockedCount}</span>
            <span className="overview-label">{t('badgesEarned')}</span>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon remaining">
            <Lock size={32} />
          </div>
          <div className="overview-info">
            <span className="overview-value">{totalCount - unlockedCount}</span>
            <span className="overview-label">{t('remaining')}</span>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon total">
            <Trophy size={32} />
          </div>
          <div className="overview-info">
            <span className="overview-value">{Math.round((unlockedCount / totalCount) * 100)}%</span>
            <span className="overview-label">{t('completion')}</span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="badges-section">
        <h2 className="section-title">
          <Star size={24} />
          {t('badgeCollection')}
        </h2>
        
        <div className="badges-grid">
          {badges.map((badge) => {
            const Icon = badge.icon;
            
            return (
              <div 
                key={badge.id} 
                className={`badge-card ${badge.unlocked ? 'unlocked' : 'locked'} ${badge.special ? 'special' : ''}`}
              >
                <div className="badge-glow" style={{ '--badge-color': badge.color }}></div>
                
                <div className="badge-icon-wrapper" style={{ backgroundColor: badge.unlocked ? `${badge.color}20` : '#f5f5f5' }}>
                  <Icon 
                    size={40} 
                    style={{ color: badge.unlocked ? badge.color : '#bdbdbd' }}
                  />
                  {!badge.unlocked && <Lock size={16} className="lock-icon" />}
                </div>

                <div className="badge-content">
                  <h3 className="badge-name">{badge.name}</h3>
                  <p className="badge-description">{badge.description}</p>
                  
                  <div className="badge-requirement">
                    <span className="requirement-label">{t('requirement')}</span>
                    <span className="requirement-value">{badge.requirement}</span>
                  </div>

                  {badge.unlocked && (
                    <div className="badge-unlocked-badge">
                      <Shield size={14} />
                      <span>{t('unlockedBadge')}</span>
                    </div>
                  )}
                </div>

                {badge.unlocked && (
                  <div className="badge-shine"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Encouragement Message */}
      <div className="encouragement-card">
        <div className="encouragement-icon">
          <Trophy size={40} />
        </div>
        <div className="encouragement-content">
          <h3>{t('keepGoing')}</h3>
          <p>
            {unlockedCount === 0 
              ? t('startTrainingJourney')
              : unlockedCount === totalCount
              ? t('allBadgesUnlocked')
              : t('completeMoreTraining', { count: totalCount - unlockedCount })
            }
          </p>
        </div>
        <button className="encouragement-btn" onClick={() => navigate('/sandbox')}>
          {t('startTraining')}
        </button>
      </div>
    </div>
  );
};

export default Badges;
