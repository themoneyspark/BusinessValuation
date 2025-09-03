import React, { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { Toaster } from "./components/ui/toaster";
import { userData } from "./data/mock";

function App() {
  const [currentUser, setCurrentUser] = useState(userData);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTierChange = (newTier) => {
    setCurrentUser(prev => ({ ...prev, tier: newTier }));
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

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
