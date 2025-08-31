import React from 'react';
import { Bell, Building, ChevronDown, User } from 'lucide-react';
import { Button } from './ui/button';

const TopNavigation = ({ userData, onTierChange }) => {

  const logoBase64 = "data:image/png;base64,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";

  return (
    <nav className="fixed top-0 left-0 right-0 h-18 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between h-full px-6">
        
        {/* Left Section - Logo Area */}
        <div className="flex items-center w-60">
          <div className="flex items-center space-x-3">
            <img 
              src="/kgob-logo.png"
              alt="Kohari Gonzalez Logo"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-12 h-12 bg-teal-500 rounded-lg items-center justify-center">
              <span className="text-white font-bold text-lg">KG</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-navy-900">Kohari Gonzalez</h1>
              <p className="text-sm text-teal-500">CPAs & Advisors</p>
            </div>
          </div>
        </div>

        {/* Center Section - Company Selector & Welcome */}
        <div className="flex items-center space-x-8 flex-1 justify-center">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-gray-500" />
            <Button variant="ghost" className="flex items-center space-x-2">
              <span className="text-sm font-medium">Active Business: {userData.company}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium">Welcome, {userData.firstName}</span>
          </div>
        </div>

        {/* Right Section - User Profile */}
        <div className="flex items-center space-x-4 w-50">
          {/* Tier Switcher for Demo */}
          <select 
            value={userData.tier}
            onChange={(e) => onTierChange(e.target.value)}
            className="text-xs px-2 py-1 border rounded bg-teal-50 border-teal-200 min-w-[100px]"
          >
            <option value="Free">Free Tier</option>
            <option value="Buyer">Buyer Tier</option>
            <option value="Subscriber">Subscriber Tier</option>
          </select>
          
          {/* Notifications */}
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-500" />
            {userData.notifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {userData.notifications}
              </span>
            )}
          </div>
          
          {/* User Profile */}
          <Button variant="ghost" className="flex items-center space-x-2">
            <img 
              src={userData.avatar} 
              alt={userData.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{userData.name}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;