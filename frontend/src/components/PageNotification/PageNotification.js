import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './PageNotification.css';

const PageNotification = ({ pageKey }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // Get translated page name
  const pageName = t(pageKey) || pageKey;
  
  // Get notification template and replace {page} placeholder
  const notificationTemplate = t('pageNotification') || 'This is the {page} page';
  const notificationText = notificationTemplate.replace('{page}', pageName);

  return (
    <div className="page-notification">
      <div className="page-notification-content">
        <MapPin size={18} className="page-notification-icon" />
        <span className="page-notification-text">{notificationText}</span>
      </div>
      <button 
        className="page-notification-close"
        onClick={() => setIsVisible(false)}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default PageNotification;
