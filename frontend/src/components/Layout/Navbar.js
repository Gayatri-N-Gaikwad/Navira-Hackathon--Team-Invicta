import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, LogIn, UserPlus, LogOut, Shield, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import VoicePlayer from '../VoicePlayer/VoicePlayer';
import Tooltip from '../Tooltip';
import './Navbar.css';

const Navbar = ({ toggleSidebar, isSidebarCollapsed }) => {
  const { user, isAuthenticated, logout, isElderly } = useAuth();
  const { t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${isElderly ? 'elderly-navbar elderly-mode' : ''}`}>
      <div className="navbar-left">
        <Tooltip content="tooltipMenu" position="bottom">
          <button 
            className={`menu-btn ${isSidebarCollapsed ? 'active' : ''}`}
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </Tooltip>
        
        {/* GuardianSathi Logo */}
        <Link to="/" className="logo">
          <Shield className="logo-icon" size={28} />
          <span className="logo-text">GuardianSathi</span>
        </Link>
      </div>
      
      <div className="navbar-center">
        {/* Center area - now empty or can be used for page title */}
      </div>
      
      <div className="navbar-right">
        <Tooltip content="tooltipVoice" position="bottom">
          <VoicePlayer />
        </Tooltip>
        <Tooltip content="tooltipLanguage" position="bottom">
          <LanguageSelector />
        </Tooltip>
        
        {/* User Icon - Moved to right side */}
        <div className="user-dropdown-container">
          <Tooltip content={isAuthenticated ? 'tooltipLogout' : 'tooltipLogin'} position="bottom">
            <button 
              className="user-btn" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="User menu"
              aria-expanded={dropdownOpen}
            >
              <User size={24} />
              {isAuthenticated && (
                <span className="user-name">{user.username}</span>
              )}
            </button>
          </Tooltip>
          
          {dropdownOpen && (
            <div className="user-dropdown">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <LogIn size={18} />
                    <span>{t('login') || 'Login'}</span>
                  </Link>
                  <Link to="/signup" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <UserPlus size={18} />
                    <span>{t('register') || 'Register'}</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <LayoutDashboard size={18} />
                    <span>{t('dashboard')}</span>
                  </Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>{t('logout') || 'Logout'}</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        
        {isAuthenticated && (
          <Tooltip content="tooltipDashboard" position="bottom">
            <Link to="/dashboard" className="dashboard-link">
              <LayoutDashboard size={22} />
            </Link>
          </Tooltip>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
