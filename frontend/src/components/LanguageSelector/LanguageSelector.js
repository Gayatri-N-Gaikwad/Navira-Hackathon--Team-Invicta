import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage, t, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const getCurrentLanguageLabel = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.native : 'English';
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe size={20} />
        <span className="language-label">{getCurrentLanguageLabel()}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <div className="language-header">
            <span>{t('selectLanguage')}</span>
          </div>
          <div className="language-options">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span className="language-name">{lang.label}</span>
                <span className="language-native">{lang.native}</span>
                {currentLanguage === lang.code && (
                  <Check size={16} className="language-check" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
