import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Target,
  BarChart3,
  Calculator,
  ArrowUp,
  ArrowDown,
  Minus,
  Award,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { businessAnalyzer } from '../../utils/businessIntelligenceEngine';

const BusinessValueTracker = ({ userBusinessData, onDataUpdate }) => {
  const [baselineValue, setBaselineValue] = useState(null);
  const [projectedValue, setProjectedValue] = useState(null);
  const [selectedImprovements, setSelectedImprovements] = useState([]);
  const [trackingMetrics, setTrackingMetrics] = useState({});

  useEffect(() => {
    calculateBusinessValues();
  }, [userBusinessData, selectedImprovements]);

  const calculateBusinessValues = () => {
    // Calculate baseline business value
    const baseline = businessAnalyzer.estimateCurrentBusinessValue(userBusinessData);
    setBaselineValue(baseline);

    // Calculate projected value with improvements
    const totalValueIncrease = selectedImprovements.reduce((total, improvement) => {
      return total + (improvement.valueIncrease || 0);
    }, 0);
    
    setProjectedValue(baseline + totalValueIncrease);
  };

  const availableImprovements = [
    {
      id: 'management',
      title: 'Hire General Manager',
      description: 'Reduce owner dependency by hiring professional management',
      investmentRequired: 150000,
      valueIncrease: 500000,
      timeline: 12,
      roi: 333,
      difficulty: 'Medium',
      category: 'Management',
      keyMetrics: ['Owner Centricity Score', 'Management Depth', 'Operational Independence']
    },
    {
      id: 'customer-diversification',
      title: 'Customer Diversification Program',
      description: 'Reduce customer concentration risk and build stable revenue base',
      investmentRequired: 75000,
      valueIncrease: 300000,
      timeline: 18,
      roi: 400,
      difficulty: 'Medium',
      category: 'Customer Base',
      keyMetrics: ['Customer Concentration', 'Revenue Stability', 'Contract Strength']
    },
    {
      id: 'process-documentation',
      title: 'Process Documentation & Systematization',
      description: 'Document critical processes and create operational procedures',
      investmentRequired: 30000,
      valueIncrease: 200000,
      timeline: 6,
      roi: 667,
      difficulty: 'Low',
      category: 'Operations',
      keyMetrics: ['Process Maturity', 'Knowledge Transfer', 'Scalability']
    },
    {
      id: 'financial-controls',
      title: 'Advanced Financial Controls & Reporting',
      description: 'Implement professional financial management and reporting systems',
      investmentRequired: 45000,
      valueIncrease: 180000,
      timeline: 9,
      roi: 400,
      difficulty: 'Low',
      category: 'Financial',
      keyMetrics: ['Financial Controls', 'Reporting Quality', 'Buyer Confidence']
    },
    {
      id: 'technology-upgrade',
      title: 'Technology & Systems Upgrade',
      description: 'Modernize technology infrastructure and business systems',
      investmentRequired: 100000,
      valueIncrease: 250000,
      timeline: 12,
      roi: 250,
      difficulty: 'High',
      category: 'Technology',
      keyMetrics: ['Operational Efficiency', 'Competitive Position', 'Scalability']
    }
  ];

  const toggleImprovement = (improvement) => {
    setSelectedImprovements(prev => {
      const exists = prev.find(item => item.id === improvement.id);
      if (exists) {
        return prev.filter(item => item.id !== improvement.id);
      } else {
        return [...prev, improvement];
      }
    });
  };

  const calculateTotalInvestment = () => {
    return selectedImprovements.reduce((total, imp) => total + imp.investmentRequired, 0);
  };

  const calculateTotalValueIncrease = () => {
    return selectedImprovements.reduce((total, imp) => total + imp.valueIncrease, 0);
  };

  const calculateAverageROI = () => {
    if (selectedImprovements.length === 0) return 0;
    return Math.round(selectedImprovements.reduce((total, imp) => total + imp.roi, 0) / selectedImprovements.length);
  };

  const getValueChangePercentage = () => {
    if (!baselineValue || baselineValue === 0) return 0;
    return Math.round(((projectedValue - baselineValue) / baselineValue) * 100);
  };

  const renderValueComparison = () => {
    const valueChange = projectedValue - baselineValue;
    const valueChangePercentage = getValueChangePercentage();

    return (
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>Business Value Impact Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Current Estimated Value</div>
              <div className="text-3xl font-bold text-gray-900">
                ${baselineValue?.toLocaleString()}
              </div>
            </div>
            
            <div className="text-center p-6 bg-green-100 rounded-lg border border-green-300">
              <div className="text-sm text-green-700 mb-2">Projected Value After Improvements</div>
              <div className="text-3xl font-bold text-green-600">
                ${projectedValue?.toLocaleString()}
              </div>
            </div>
            
            <div className="text-center p-6 bg-blue-100 rounded-lg border border-blue-300">
              <div className="text-sm text-blue-700 mb-2">Total Value Increase</div>
              <div className="text-3xl font-bold text-blue-600">
                +${valueChange?.toLocaleString()}
              </div>
              <div className="text-lg text-blue-500">({valueChangePercentage}%)</div>
            </div>
          </div>

          {/* Investment Summary */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded p-4">
              <div className="text-lg font-bold text-gray-900">${calculateTotalInvestment().toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Investment</div>
            </div>
            <div className="bg-white rounded p-4">
              <div className="text-lg font-bold text-purple-600">{calculateAverageROI()}%</div>
              <div className="text-sm text-gray-600">Average ROI</div>
            </div>
            <div className="bg-white rounded p-4">
              <div className="text-lg font-bold text-teal-600">
                {Math.round(selectedImprovements.reduce((total, imp) => total + imp.timeline, 0) / (selectedImprovements.length || 1))}
              </div>
              <div className="text-sm text-gray-600">Avg. Timeline (months)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderImprovementSelector = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Business Improvement Options</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {availableImprovements.map((improvement) => {
              const isSelected = selectedImprovements.find(item => item.id === improvement.id);
              
              return (
                <Card 
                  key={improvement.id}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleImprovement(improvement)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <input
                            type="checkbox"
                            checked={!!isSelected}
                            onChange={() => toggleImprovement(improvement)}
                            className="text-blue-600"
                          />
                          <h4 className="font-semibold text-gray-900">{improvement.title}</h4>
                          <Badge variant="outline">{improvement.category}</Badge>
                          <Badge className={`${
                            improvement.difficulty === 'Low' ? 'bg-green-100 text-green-700' :
                            improvement.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {improvement.difficulty}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{improvement.description}</p>
                        
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Investment:</span>
                            <div className="text-gray-900">${improvement.investmentRequired.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Value Increase:</span>
                            <div className="text-green-600 font-bold">${improvement.valueIncrease.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">ROI:</span>
                            <div className="text-blue-600 font-bold">{improvement.roi}%</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Timeline:</span>
                            <div className="text-gray-900">{improvement.timeline} months</div>
                          </div>
                        </div>

                        {improvement.keyMetrics && (
                          <div className="mt-4">
                            <span className="font-medium text-gray-700 text-sm">Key Metrics Improved:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {improvement.keyMetrics.map((metric, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {metric}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="ml-4">
                        {isSelected ? (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <ArrowUp className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            <Minus className="w-4 h-4 text-gray-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl font-bold mb-4">Real-Time Business Value Tracker</h1>
          <p className="text-xl opacity-90 mb-6">
            See how business improvements impact your estimated exit value in real-time
          </p>
        </CardContent>
      </Card>

      {/* Current Business Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Your Current Business Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <Label>Annual Revenue</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  value={userBusinessData.revenue || ''}
                  onChange={(e) => onDataUpdate('revenue', parseInt(e.target.value))}
                  className="pl-8"
                  placeholder="2,500,000"
                />
              </div>
            </div>
            
            <div>
              <Label>Net Profit Margin (%)</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={userBusinessData.profitMargin || ''}
                  onChange={(e) => onDataUpdate('profitMargin', parseInt(e.target.value))}
                  className="pr-8"
                  placeholder="12"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>
            
            <div>
              <Label>Owner Centricity Score</Label>
              <Input
                type="number"
                value={userBusinessData.ownerCentricityScore || ''}
                onChange={(e) => onDataUpdate('ownerCentricityScore', parseInt(e.target.value))}
                placeholder="45"
                max="100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Value Comparison Dashboard */}
      {renderValueComparison()}

      {/* Improvement Selector */}
      {renderImprovementSelector()}

      {/* Implementation Timeline */}
      {selectedImprovements.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-purple-600" />
              <span>Your Implementation Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Timeline Overview</h4>
                  <div className="space-y-3">
                    {selectedImprovements
                      .sort((a, b) => a.timeline - b.timeline)
                      .map((improvement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                        <span className="font-medium text-gray-900">{improvement.title}</span>
                        <Badge variant="outline">{improvement.timeline} months</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Financial Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-white rounded border">
                      <span>Total Investment Required:</span>
                      <span className="font-bold text-red-600">${calculateTotalInvestment().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded border">
                      <span>Total Value Increase:</span>
                      <span className="font-bold text-green-600">${calculateTotalValueIncrease().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded border">
                      <span>Net Value Creation:</span>
                      <span className="font-bold text-blue-600">
                        ${(calculateTotalValueIncrease() - calculateTotalInvestment()).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-purple-100 rounded border border-purple-200">
                      <span className="font-semibold">Average ROI:</span>
                      <span className="font-bold text-purple-600">{calculateAverageROI()}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-teal-600 hover:bg-teal-700 py-3">
                Generate Detailed Implementation Plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Enhancement Notice */}
      <Card className="bg-gradient-to-r from-gray-50 to-purple-50 border-dashed border-gray-300">
        <CardContent className="p-6 text-center">
          <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Enhanced Analysis Available</h3>
          <p className="text-gray-600 mb-4">
            Upgrade to include ChatGPT 5 integration for enhanced natural language recommendations 
            and industry-specific insights tailored to your business.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-purple-100 text-purple-700">
              Current: Advanced Rule-Based Engine
            </Badge>
            <Badge className="bg-blue-100 text-blue-700">
              Future: + ChatGPT 5 Integration
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* KGOB Professional Footer */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6 text-center">
          <div className="space-y-2 text-sm text-gray-400">
            <div>Advanced Business Value Analysis by Kohari Gonzalez CPAs & Advisors</div>
            <div>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213 | 1-844-599-3355</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessValueTracker;