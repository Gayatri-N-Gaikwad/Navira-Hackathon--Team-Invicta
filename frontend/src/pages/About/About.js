import React from 'react';
import { Shield, Heart, Users, BookOpen, Mail, Phone, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import PageNotification from '../../components/PageNotification/PageNotification';
import './About.css';

const About = () => {
  const { isElderly } = useAuth();
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('safetyFirst'),
      description: t('safetyFirstDescription')
    },
    {
      icon: Heart,
      title: t('madeWithCare'),
      description: t('madeWithCareDescription')
    },
    {
      icon: Users,
      title: t('communityDriven'),
      description: t('communityDrivenDescription')
    },
    {
      icon: BookOpen,
      title: t('alwaysLearning'),
      description: t('alwaysLearningDescription')
    }
  ];

  const team = [
    {
      role: t('founder'),
      name: t('digitalSafetyExpert'),
      description: t('founderDescription')
    },
    {
      role: t('educationLead'),
      name: t('learningSpecialist'),
      description: t('educationLeadDescription')
    },
    {
      role: t('techLead'),
      name: t('securityEngineer'),
      description: t('techLeadDescription')
    }
  ];

  return (
    <div className={`about-page ${isElderly ? 'elderly-mode' : ''}`}>
      {/* Page Notification */}
      <PageNotification pageKey="pageAbout" />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-badge">
          <Shield size={48} />
        </div>
        <h1>{t('aboutGuardianSathi')}</h1>
        <p className="hero-subtitle">
          {t('aboutHeroSubtitle')}
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mission-statement">
        <div className="statement-card">
          <h2>{t('ourMissionAbout')}</h2>
          <p className="quote">
            "{t('missionQuoteAbout')}"
          </p>
          <p className="description">
            {t('missionDescription')}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <h2>{t('whyGuardianSathi')}</h2>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <Icon size={32} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>{t('meetTeam')}</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">
                {member.name.charAt(0)}
              </div>
              <span className="team-role">{member.role}</span>
              <h3>{member.name}</h3>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-card">
          <h2>{t('getInTouch')}</h2>
          <p>{t('contactQuestions')}</p>
          <div className="contact-methods">
            <div className="contact-item">
              <Mail size={24} />
              <span>{t('supportEmail')}</span>
            </div>
            <div className="contact-item">
              <Phone size={24} />
              <span>{t('tollFree')}</span>
            </div>
            <div className="contact-item">
              <Globe size={24} />
              <span>{t('website')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Version Info */}
      <div className="version-info">
        <p>{t('versionInfo')}</p>
      </div>
    </div>
  );
};

export default About;
