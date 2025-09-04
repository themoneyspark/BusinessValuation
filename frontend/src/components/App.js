import React, { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboardOriginal";
import { Toaster } from "./components/ui/toaster";
import { userData } from "./data/mock";

function App() {
  const [currentUser, setCurrentUser] = useState(userData);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Determine user role - in production, this would come from authentication
  const userRole = currentUser.email?.includes('@kgob.cpa') ? 'admin' : 'user';

  const handleTierChange = (newTier) => {
    setCurrentUser(prev => ({ ...prev, tier: newTier }));
  };

  const handleTabChange = (tabId) => {
    if (tabId === 'admin') {
      setIsAdminMode(true);
      setActiveTab('admin');
    } else {
      setIsAdminMode(false);
      setActiveTab(tabId);
    }
  };

  // Admin mode renders the original comprehensive admin dashboard
  if (isAdminMode) {
    return (
      <div className="App bg-gray-50 min-h-screen">
        <BrowserRouter>
          <AdminDashboard />
          <Toaster />
        </BrowserRouter>
      </div>
    );
  }

  // Regular user dashboard
  return (
    <div className="App bg-gray-50 min-h-screen">
      <BrowserRouter>
        <TopNavigation 
          userData={currentUser} 
          onTierChange={handleTierChange}
        />
        <Sidebar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          userTier={currentUser.tier}
          userRole={userRole}
        />
        <Dashboard 
          activeTab={activeTab}
          userTier={currentUser.tier}
          onTierChange={handleTierChange}
        />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;