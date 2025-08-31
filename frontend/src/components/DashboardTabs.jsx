import React from 'react';
import { Button } from './ui/button';

const DashboardTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'submissions', label: 'Submissions' }, 
    { id: 'reports', label: 'Reports' }
  ];

  return (
    <div className="flex space-x-1 border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 h-12 font-medium border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600 bg-blue-50'
              : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default DashboardTabs;