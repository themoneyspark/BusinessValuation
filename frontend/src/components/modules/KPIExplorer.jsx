import React from 'react';
import { BarChart3, Lock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const KPIExplorer = ({ isLocked = true, data = null, onUpgrade }) => {
  const mockCharts = [
    { title: 'Monthly Revenue', type: 'bar' },
    { title: 'Client Retention', type: 'line' },
    { title: 'Profit Margin', type: 'pie' },
    { title: 'Active Clients', type: 'gauge' }
  ];

  if (isLocked) {
    return (
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">Key Performance Indicators</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {mockCharts.map((chart, index) => (
              <div key={index} className="relative">
                <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center opacity-50">
                    <div className="w-8 h-8 bg-gray-300 rounded mx-auto mb-2"></div>
                    <p className="text-xs text-gray-500">{chart.title}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>
            <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-lg p-4 border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-600 mb-3">Upgrade for real data insights</p>
              <Button 
                onClick={onUpgrade}
                variant="outline" 
                className="border-teal-300 text-teal-600 hover:bg-teal-50"
              >
                View All KPIs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Unlocked version would show actual charts
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-teal-600" />
          <span>Key Performance Indicators</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4">
          {mockCharts.map((chart, index) => (
            <div key={index} className="h-24 bg-teal-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-teal-200 rounded mx-auto mb-2"></div>
                <p className="text-xs text-teal-700 font-medium">{chart.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIExplorer;