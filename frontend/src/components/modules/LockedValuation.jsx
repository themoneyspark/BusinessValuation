import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const LockedValuation = ({ onUpgrade }) => {
  return (
    <Card className="relative overflow-hidden border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-gray-400" />
          <span className="text-gray-600">Business Valuation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-center py-8 relative">
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-6xl font-bold text-gray-300 mb-4 animate-pulse">--</div>
            
            {/* Blurred placeholder data */}
            <div className="space-y-3 mb-8">
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-8 animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-12 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-6 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            
            <Button 
              onClick={onUpgrade}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg font-semibold mb-3 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Unlock Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-600 font-medium">Starting at <span className="text-teal-600">$798</span></p>
          </div>
          
          {/* Decorative lock overlay */}
          <div className="absolute top-4 right-4 opacity-10">
            <Lock className="w-16 h-16 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LockedValuation;