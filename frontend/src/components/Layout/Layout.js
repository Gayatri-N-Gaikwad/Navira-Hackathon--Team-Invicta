import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isElderly } = useAuth();

  const toggleSidebar = () => {
    // On mobile, use mobile sidebar behavior
    if (window.innerWidth <= 768) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      // On desktop, toggle collapse
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const closeSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className={`layout ${isElderly ? 'elderly-layout elderly-mode' : ''}`}>
      <Navbar toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
      <div className="layout-container">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          isMobileOpen={isMobileSidebarOpen}
          closeSidebar={closeSidebar} 
        />
        <main className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="content-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
      {isMobileSidebarOpen && (
        <div className="sidebar-overlay active" onClick={closeSidebar}></div>
      )}
    </div>
  );
};

export default Layout;
