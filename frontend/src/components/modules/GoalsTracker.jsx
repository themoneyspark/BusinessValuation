import React from 'react';
import { Target, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

const GoalsTracker = ({ goals }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-teal-600" />
            <span>Your Goals & Progress</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4 mb-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{goal.name}</h4>
                <span className="text-sm text-gray-500">{goal.dueDate}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Progress value={goal.progress} className="flex-1" />
                <span className="text-sm font-medium text-gray-600">{goal.progress}%</span>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">{goal.category}</span>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </CardContent>
    </Card>
  );
};

export default GoalsTracker;