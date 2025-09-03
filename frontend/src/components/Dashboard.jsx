import React, { useState } from 'react';
import QuickStats from './QuickStats';
import DashboardTabs from './DashboardTabs';
import BusinessQuotes from './modules/BusinessQuotes';
import IndustryNews from './modules/IndustryNews';
import LockedValuation from './modules/LockedValuation';
import ScoreDrivers from './modules/ScoreDrivers';
import AskSara from './modules/AskSara';
import GoalsTracker from './modules/GoalsTracker';
import GrowthNavigator from './modules/GrowthNavigator';
import ResourceLibrary from './modules/ResourceLibrary';
import KPIExplorer from './modules/KPIExplorer';
import KnowledgeBase from './knowledgebase/KnowledgeBase';

import { 
  quickStats, 
  businessQuotes, 
  industryNews, 
  scoreDrivers,
  askSaraHistory,
  goals,
  growthActions,
  resources 
} from '../data/mock';

const Dashboard = ({ activeTab, userTier, onTierChange }) => {
  const [dashboardTab, setDashboardTab] = useState('overview');

  const handleUpgrade = () => {
    if (userTier === 'Free') {
      onTierChange('Buyer');
    } else if (userTier === 'Buyer') {
      onTierChange('Subscriber');
    }
  };

  // Get current tier stats - this ensures fresh data on tier change
  const currentStats = quickStats[userTier] || quickStats['Free'];

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'valuation':
        if (!['Buyer', 'Subscriber'].includes(userTier)) {
          return renderLockedContent('Valuation Overview', 'Access detailed business valuation tools and insights.');
        }
        return <div className="text-center py-16 text-gray-500">Valuation Overview content coming soon...</div>;
      case 'growth':
        if (userTier !== 'Subscriber') {
          return renderLockedContent('Growth Navigator', 'Get personalized growth strategies and action plans.');
        }
        return <div className="text-center py-16 text-gray-500">Growth Navigator content coming soon...</div>;
      case 'sara':
        return <AskSara tier={userTier} history={userTier !== 'Free' ? askSaraHistory : []} queriesRemaining={userTier === 'Free' ? 7 : null} />;
      case 'goals':
        if (userTier !== 'Subscriber') {
          return renderLockedContent('Goals & Progress', 'Track your business improvement goals and milestones.');
        }
        return <GoalsTracker goals={goals} />;
      case 'resources':
        return <KnowledgeBase userTier={userTier} />;
      case 'reports':
        if (!['Buyer', 'Subscriber'].includes(userTier)) {
          return renderLockedContent('My Reports', 'Generate and download comprehensive business reports.');
        }
        return <div className="text-center py-16 text-gray-500">My Reports content coming soon...</div>;
      case 'settings':
        return <div className="text-center py-16 text-gray-500">Settings content coming soon...</div>;
      default:
        return renderDashboardContent();
    }
  };

  const renderLockedContent = (title, description) => (
    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <Button 
          onClick={handleUpgrade}
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
        >
          {userTier === 'Free' ? 'Upgrade to Buyer' : 'Upgrade to Subscriber'}
        </Button>
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    return (
      <div className="space-y-6">
        {/* Quick Stats - now uses currentStats which updates with tier */}
        <QuickStats stats={currentStats} />
        
        {/* Dashboard Tabs */}
        <DashboardTabs activeTab={dashboardTab} onTabChange={setDashboardTab} />
        
        {dashboardTab === 'overview' && (
          <div className="space-y-6">
            {/* Row 1: Business Quote Rotator */}
            <BusinessQuotes quotes={businessQuotes} />
            
            {/* Row 2: Two Columns */}
            <div className="grid grid-cols-2 gap-6">
              <IndustryNews news={industryNews} />
              {userTier === 'Free' ? (
                <LockedValuation onUpgrade={handleUpgrade} />
              ) : (
                <ScoreDrivers drivers={scoreDrivers} />
              )}
            </div>
            
            {/* Row 3: KPI Explorer & Ask Sara */}
            <div className="grid grid-cols-2 gap-6">
              <KPIExplorer 
                isLocked={userTier === 'Free'} 
                onUpgrade={handleUpgrade}
              />
              <AskSara 
                tier={userTier} 
                history={userTier !== 'Free' ? askSaraHistory : []}
                queriesRemaining={userTier === 'Free' ? 7 : null}
              />
            </div>
            
            {/* Row 4: Subscriber Only - Goals & Growth */}
            {userTier === 'Subscriber' && (
              <div className="grid grid-cols-2 gap-6">
                <GoalsTracker goals={goals} />
                <GrowthNavigator actions={growthActions} />
              </div>
            )}
            
            {/* Row 5: Resource Library - Subscriber Only */}
            {userTier === 'Subscriber' && (
              <ResourceLibrary resources={resources} />
            )}
          </div>
        )}
        
        {dashboardTab === 'submissions' && (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-2">No submissions yet</p>
              <p className="text-sm">Your form submissions will appear here</p>
            </div>
          </div>
        )}
        
        {dashboardTab === 'reports' && (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              {userTier === 'Free' ? (
                <>
                  <p className="text-lg mb-2">Reports locked</p>
                  <p className="text-sm">Upgrade to access business reports</p>
                </>
              ) : (
                <>
                  <p className="text-lg mb-2">No reports generated</p>
                  <p className="text-sm">Your business reports will appear here</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="ml-70 pt-18">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {renderMainContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;