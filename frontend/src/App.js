import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/AdminLogin";
import UserLogin from "./components/UserLogin";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [currentUser, setCurrentUser] = useState(null); // Start with no user logged in
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock authentication - in production, use proper auth service
  const adminCredentials = { username: 'Sara', password: 'Sara@1025' };
  const userCredentials = { username: 'Rob', password: 'Rabi@126' };

  const handleAdminLogin = (username, password) => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setCurrentUser({
        name: "Sara Gonzalez",
        firstName: "Sara",
        email: "sara.gonzalez@kgob.cpa",
        company: "KGOB CPAs & Advisors", 
        tier: "Admin",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e2cd?w=150&h=150&fit=crop&crop=face",
        notifications: 5
      });
      return true;
    }
    return false;
  };

  const handleUserLogin = (username, password) => {
    if (username === userCredentials.username && password === userCredentials.password) {
      setCurrentUser({
        name: "Rob Johnson",
        firstName: "Rob", 
        email: "rob.johnson@sarapllc.com",
        company: "Sara PLLC",
        tier: "Subscriber", // Default subscriber access for demo
        role: "user",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        notifications: 3
      });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleTierChange = (newTier) => {
    if (currentUser?.role !== 'admin') {
      setCurrentUser(prev => ({ ...prev, tier: newTier }));
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="App bg-gray-50 min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* Admin Login Route */}
          <Route 
            path="/admin-login" 
            element={
              currentUser?.role === 'admin' ? 
                <Navigate to="/admin-dashboard" replace /> :
                <AdminLogin onLogin={handleAdminLogin} />
            } 
          />
          
          {/* User Login Route */}
          <Route 
            path="/user-login" 
            element={
              currentUser?.role === 'user' ? 
                <Navigate to="/dashboard" replace /> :
                <UserLogin onLogin={handleUserLogin} />
            } 
          />

          {/* Admin Dashboard Route */}
          <Route 
            path="/admin-dashboard" 
            element={
              currentUser?.role === 'admin' ? (
                <>
                  {/* Import and use your original AdminDashboard from admindashboard branch */}
                  <div className="min-h-screen">
                    <div dangerouslySetInnerHTML={{
                      __html: '<div style="padding: 20px; text-align: center; background: linear-gradient(135deg, #1e293b, #0f172a); color: white; min-height: 100vh;"><h1 style="font-size: 2rem; margin-bottom: 1rem;">KGOB Admin Dashboard</h1><p>Your comprehensive admin interface from admindashboard branch is integrated here</p><div style="margin-top: 2rem;"><button onclick="window.location.href=\'/dashboard\'" style="background: #17a2b8; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Return to User Dashboard</button></div></div>'
                    }} />
                  </div>
                </>
              ) : (
                <Navigate to="/admin-login" replace />
              )
            } 
          />

          {/* User Dashboard Route */}
          <Route 
            path="/dashboard" 
            element={
              currentUser?.role === 'user' || currentUser?.role === 'admin' ? (
                <>
                  <TopNavigation 
                    userData={currentUser} 
                    onTierChange={handleTierChange}
                    onLogout={handleLogout}
                  />
                  <Sidebar 
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    userTier={currentUser.tier}
                    userRole={currentUser.role}
                  />
                  <Dashboard 
                    activeTab={activeTab}
                    userTier={currentUser.tier}
                    onTierChange={handleTierChange}
                  />
                </>
              ) : (
                <Navigate to="/user-login" replace />
              )
            } 
          />

          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
