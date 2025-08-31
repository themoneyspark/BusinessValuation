import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const LockedValuation = ({ onUpgrade }) => {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-gray-400" />
          <span className="text-gray-600">Business Valuation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-center py-8">
          {/* Blurred Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-30"></div>
          <div className="relative z-10">
            <div className="text-6xl font-bold text-gray-300 mb-4">--</div>
            <div className="space-y-3 mb-6">
              <div className="h-3 bg-gray-200 rounded-full mx-8"></div>
              <div className="h-3 bg-gray-200 rounded-full mx-12"></div>
              <div className="h-3 bg-gray-200 rounded-full mx-6"></div>
            </div>
            
            <Button 
              onClick={onUpgrade}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 text-lg font-semibold mb-3"
            >
              Unlock Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-600">Starting at $798</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LockedValuation;