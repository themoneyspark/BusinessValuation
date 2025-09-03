import React from 'react';
import { Lock, ArrowRight, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

const TierUpgradePrompt = ({ upgradeData, currentTier, category }) => {
  if (upgradeData.lockedCount === 0) return null;

  return (
    <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-blue-600" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Unlock {upgradeData.lockedCount} More {category} Resources
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Get access to premium templates, advanced guides, and professional tools 
          with {upgradeData.nextTier} tier access.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6 max-w-sm mx-auto">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-green-600 font-bold text-lg">{upgradeData.currentAccess}</div>
            <div className="text-xs text-gray-600">Current Access</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-blue-600 font-bold text-lg">+{upgradeData.lockedCount}</div>
            <div className="text-xs text-gray-600">Additional</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-purple-600 font-bold text-lg">{upgradeData.totalAvailable}</div>
            <div className="text-xs text-gray-600">Total Available</div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Premium templates and workbooks</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Advanced methodologies and frameworks</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Industry-specific case studies</span>
          </div>
        </div>

        <Button 
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
          onClick={() => window.alert(`Upgrade to ${upgradeData.nextTier} tier to access all ${category} resources!`)}
        >
          Upgrade to {upgradeData.nextTier}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        <p className="text-xs text-gray-500 mt-3">
          Starting at {upgradeData.nextTier === 'Buyer' ? '$798' : '$1,498'} per assessment
        </p>
      </CardContent>
    </Card>
  );
};

export default TierUpgradePrompt;