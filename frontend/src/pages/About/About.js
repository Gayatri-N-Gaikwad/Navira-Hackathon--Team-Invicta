import React from 'react';
import { Shield, Heart, Users, BookOpen, Mail, Phone, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageNotification from '../../components/PageNotification/PageNotification';
import './About.css';

const About = () => {
  const { isElderly } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'We prioritize your digital safety with comprehensive training modules and real-world scenarios.'
    },
    {
      icon: Heart,
      title: 'Made with Care',
      description: 'Designed specifically for elderly users and beginners with accessibility in mind.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built with feedback from users to ensure relevance and effectiveness.'
    },
    {
      icon: BookOpen,
      title: 'Always Learning',
      description: 'Continuously updated with the latest scam techniques and prevention methods.'
    }
  ];

  const team = [
    {
      role: 'Founder',
      name: 'Digital Safety Expert',
      description: 'Committed to making the internet safer for everyone.'
    },
    {
      role: 'Education Lead',
      name: 'Learning Specialist',
      description: 'Designing intuitive learning experiences for all age groups.'
    },
    {
      role: 'Tech Lead',
      name: 'Security Engineer',
      description: 'Building secure and accessible technology solutions.'
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
        <h1>About GuardianSathi</h1>
        <p className="hero-subtitle">
          Your trusted companion in the digital world, dedicated to keeping you safe from online scams and fraud.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mission-statement">
        <div className="statement-card">
          <h2>Our Mission</h2>
          <p className="quote">
            "To empower every individual with the knowledge and confidence to navigate the digital world safely."
          </p>
          <p className="description">
            In an increasingly connected world, digital safety is not a luxury—it's a necessity. 
            GuardianSathi was created to bridge the gap between technology and safety education, 
            making it accessible to everyone, regardless of age or technical expertise.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <h2>Why GuardianSathi?</h2>
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
        <h2>Meet the Team</h2>
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
          <h2>Get in Touch</h2>
          <p>Have questions or feedback? We'd love to hear from you!</p>
          <div className="contact-methods">
            <div className="contact-item">
              <Mail size={24} />
              <span>support@guardiansathi.com</span>
            </div>
            <div className="contact-item">
              <Phone size={24} />
              <span>+91 1800-XXXX-XXX (Toll Free)</span>
            </div>
            <div className="contact-item">
              <Globe size={24} />
              <span>www.guardiansathi.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Version Info */}
      <div className="version-info">
        <p>GuardianSathi v1.0.0 | Made with ❤️ for Digital Safety</p>
      </div>
    </div>
  );
};

export default About;
