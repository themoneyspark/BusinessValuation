import React from 'react';
import { DollarSign, Trophy, Target, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const QuickStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Business Value',
      value: stats.businessValue,
      icon: DollarSign,
      color: 'teal'
    },
    {
      title: 'Overall Score', 
      value: stats.overallScore,
      icon: Trophy,
      color: 'blue'
    },
    {
      title: 'Exit Readiness',
      value: stats.exitReadiness, 
      icon: Target,
      color: 'green'
    },
    {
      title: 'Last Activity',
      value: stats.lastActivity,
      icon: Clock,
      color: 'gray'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      teal: 'text-teal-600 bg-teal-50',
      blue: 'text-blue-600 bg-blue-50', 
      green: 'text-green-600 bg-green-50',
      gray: 'text-gray-600 bg-gray-50'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="grid grid-cols-4 gap-5 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${getColorClasses(stat.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-2xl font-bold ${
                    stat.value === '--' ? 'text-gray-400' : `text-${stat.color}-600`
                  }`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;