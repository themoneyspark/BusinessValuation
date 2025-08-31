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

const Dashboard = ({ userTier, onTierChange }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardTab, setDashboardTab] = useState('overview');

  const handleUpgrade = () => {
    if (userTier === 'Free') {
      onTierChange('Buyer');
    } else if (userTier === 'Buyer') {
      onTierChange('Subscriber');
    }
  };

  const renderTierContent = () => {
    const stats = quickStats[userTier];
    
    return (
      <div className="space-y-6">
        {/* Quick Stats */}
        <QuickStats stats={stats} />
        
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
            {renderTierContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;