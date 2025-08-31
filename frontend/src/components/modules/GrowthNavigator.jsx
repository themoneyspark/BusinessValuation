import React, { useState } from 'react';
import { Navigation, CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const GrowthNavigator = ({ actions }) => {
  const [completedActions, setCompletedActions] = useState(
    actions.filter(action => action.completed).map(action => action.id)
  );

  const toggleCompletion = (actionId) => {
    setCompletedActions(prev => 
      prev.includes(actionId)
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  const getImpactColor = (impact) => {
    const colors = {
      High: 'text-red-600 bg-red-50',
      Medium: 'text-yellow-600 bg-yellow-50', 
      Low: 'text-green-600 bg-green-50'
    };
    return colors[impact] || colors.Low;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-teal-600" />
            <span>Growth Navigator</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 mb-4">
          {actions.map((action) => {
            const isCompleted = completedActions.includes(action.id);
            return (
              <div key={action.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                <button 
                  onClick={() => toggleCompletion(action.id)}
                  className="mt-0.5 text-teal-600 hover:text-teal-700"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-bold text-gray-500">#{action.priority}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(action.impact)}`}>
                      {action.impact}
                    </span>
                  </div>
                  <p className={`text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                    {action.action}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <Button variant="outline" className="w-full">
          View Full Navigator
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default GrowthNavigator;