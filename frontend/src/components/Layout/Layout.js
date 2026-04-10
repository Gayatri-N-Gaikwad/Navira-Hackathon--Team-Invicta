import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isElderly } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={`layout ${isElderly ? 'elderly-layout elderly-mode' : ''}`}>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="layout-container">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="content-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}
    </div>
  );
};

export default Layout;
