import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const ScoreDrivers = ({ drivers }) => {
  const getColorClass = (color) => {
    const colors = {
      green: 'text-green-600 border-green-200 bg-green-50',
      yellow: 'text-yellow-600 border-yellow-200 bg-yellow-50',
      red: 'text-red-600 border-red-200 bg-red-50'
    };
    return colors[color] || colors.gray;
  };

  const getProgressColor = (color) => {
    const colors = {
      green: 'stroke-green-500',
      yellow: 'stroke-yellow-500', 
      red: 'stroke-red-500'
    };
    return colors[color] || 'stroke-gray-500';
  };

  const CircularProgress = ({ score, color }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

    return (
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            strokeWidth="6"
            fill="none"
            className={getProgressColor(color)}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-700">{score}</span>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          <span>Business Score Drivers</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4">
          {drivers.map((driver, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <CircularProgress score={driver.score} color={driver.color} />
              </div>
              <h4 className="text-sm font-medium text-gray-700 leading-tight">
                {driver.name}
              </h4>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreDrivers;