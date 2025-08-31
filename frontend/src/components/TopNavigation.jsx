import React from 'react';
import { Bell, Building, ChevronDown, User } from 'lucide-react';
import { Button } from './ui/button';

const TopNavigation = ({ userData, onTierChange }) => {


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