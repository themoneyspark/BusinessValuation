import React from 'react';
import { DollarSign, Trophy, Target, Clock } from 'lucide-react';

const QuickStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Business Value',
      value: stats.businessValue,
      subtitle: stats.businessValue === '--' ? 'Upgrade to unlock' : 'Current valuation range',
      icon: DollarSign,
      color: 'teal'
    },
    {
      title: 'Overall Score', 
      value: stats.overallScore,
      subtitle: stats.overallScore === '--' ? 'Upgrade to unlock' : 'Out of 100 points',
      icon: Trophy,
      color: 'blue'
    },
    {
      title: 'Exit Readiness',
      value: stats.exitReadiness,
      subtitle: stats.exitReadiness === '--' ? 'Upgrade to unlock' : 'Market preparation level', 
      icon: Target,
      color: 'green'
    },
    {
      title: 'Last Activity',
      value: stats.lastActivity,
      subtitle: 'Platform activity',
      icon: Clock,
      color: 'gray'
    }
  ];

  return (
    <div className="mb-8">
      {/* Gradient Background Container */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-teal-400 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Business Metrics Overview</h2>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-white/80 text-sm font-medium">{stat.title}</h3>
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <p className="text-white/70 text-xs">
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;