import React from 'react';
import { 
  Home, 
  BarChart3, 
  TrendingUp, 
  MessageCircle, 
  Target, 
  Folder, 
  Download, 
  Settings,
  Lock,
  Badge
} from 'lucide-react';
import { Button } from './ui/button';

const Sidebar = ({ activeTab, onTabChange, userTier }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Home',
      icon: Home,
      tiers: ['Free', 'Buyer', 'Subscriber'],
      always: true
    },
    {
      id: 'valuation',
      label: 'Valuation Overview', 
      icon: BarChart3,
      tiers: ['Buyer', 'Subscriber'],
      locked: !['Buyer', 'Subscriber'].includes(userTier)
    },
    {
      id: 'growth',
      label: 'Growth Navigator',
      icon: TrendingUp, 
      tiers: ['Subscriber'],
      locked: userTier !== 'Subscriber'
    },
    {
      id: 'sara',
      label: 'Ask Sara',
      icon: MessageCircle,
      tiers: ['Free', 'Buyer', 'Subscriber'],
      badge: userTier === 'Free' ? '7 left' : null
    },
    {
      id: 'goals',
      label: 'Goals & Progress',
      icon: Target,
      tiers: ['Subscriber'], 
      locked: userTier !== 'Subscriber',
      progress: userTier === 'Subscriber' ? 65 : null
    },
    {
      id: 'resources',
      label: 'Knowledge Base',
      icon: Folder,
      tiers: ['Subscriber'],
      locked: userTier !== 'Subscriber',
      badge: userTier === 'Subscriber' ? 'NEW' : null
    },
    {
      id: 'reports',
      label: 'My Reports', 
      icon: Download,
      tiers: ['Buyer', 'Subscriber'],
      locked: !['Buyer', 'Subscriber'].includes(userTier),
      badge: ['Buyer', 'Subscriber'].includes(userTier) ? '3' : null
    }
  ];

  const settingsItem = {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    tiers: ['Free', 'Buyer', 'Subscriber'],
    always: true
  };

  return (
    <aside className="fixed left-0 top-18 w-70 h-[calc(100vh-4.5rem)] bg-gray-50 border-r border-gray-200">
      <div className="flex flex-col h-full">
        
        {/* Navigation Menu */}
        <div className="flex-1 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isLocked = item.locked;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => !isLocked && onTabChange(item.id)}
                className={`w-full h-14 justify-start px-6 mb-1 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                } ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                  </div>
                  
                  {/* Badges and indicators */}
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.badge === 'NEW' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.progress && (
                      <div className="w-8 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Settings at bottom */}
        <div className="p-6 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={() => onTabChange('settings')}
            className={`w-full h-14 justify-start ${
              activeTab === 'settings'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-4">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </div>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;