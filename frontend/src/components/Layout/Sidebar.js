import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Gamepad2, HelpCircle, Info, X, LayoutDashboard, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, isMobileOpen, closeSidebar }) => {
  const { isElderly, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  // Public menu items - accessible without login
  const publicMenuItems = [
    { path: '/', icon: Home, labelKey: 'home', tooltipKey: 'tooltipHome' },
    { path: '/sandbox', icon: Gamepad2, labelKey: 'sandbox', tooltipKey: 'tooltipSandbox' },
    { path: '/about', icon: Info, labelKey: 'about', tooltipKey: 'tooltipAbout' },
  ];

  // Protected menu items - require login
  const protectedMenuItems = [
    { path: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard', tooltipKey: 'tooltipDashboard' },
    { path: '/quiz', icon: HelpCircle, labelKey: 'quiz', tooltipKey: 'tooltipQuiz' },
    { path: '/badges', icon: Award, labelKey: 'badges', tooltipKey: 'tooltipBadges' },
  ];

  // Combine based on auth status
  const menuItems = isAuthenticated 
    ? [...publicMenuItems, ...protectedMenuItems]
    : publicMenuItems;

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  // Determine sidebar visibility based on screen size
  const isOpen = window.innerWidth <= 768 ? isMobileOpen : !isCollapsed;
  
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'} ${isMobileOpen ? 'mobile-open' : ''} ${isElderly ? 'elderly-sidebar' : ''}`}>
      <div className="sidebar-header">
        <h3>Menu</h3>
        <Tooltip content="tooltipClose" position="bottom">
          <button 
            className="close-sidebar-btn" 
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </Tooltip>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Tooltip content={item.tooltipKey} position="right">
                  <NavLink
                    to={item.path}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    <Icon size={22} className="sidebar-icon" />
                    <span className="sidebar-label">{t(item.labelKey)}</span>
                  </NavLink>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <p>© 2026 GuardianSathi</p>
        <p className="tagline">{t('tagline')}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
