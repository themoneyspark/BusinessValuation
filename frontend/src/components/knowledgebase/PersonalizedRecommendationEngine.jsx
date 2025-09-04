import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  DollarSign,
  Users,
  Award,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Calculator,
  BarChart3,
  Lightbulb,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { businessAnalyzer } from '../../utils/businessIntelligenceEngine';

const PersonalizedRecommendationEngine = ({ userTier }) => {
  const [businessData, setBusinessData] = useState({
    // Sample data - would be populated from user assessments
    revenue: 2500000,
    profitMargin: 12,
    employees: 25,
    industry: 'professional-services',
    ownerCentricityScore: 45,
    topCustomerPercentage: 35,
    managementLevels: 2,
    wealthGap: 400000
  });
  
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeRecommendation, setActiveRecommendation] = useState(0);

  useEffect(() => {
    generateAnalysis();
  }, [businessData]);

  const generateAnalysis = async () => {
    setLoading(true);
    try {
      const result = await businessAnalyzer.analyzeBusinessForExitPlanning(businessData);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis generation failed:', error);
    }
    setLoading(false);
  };

  const handleBusinessDataChange = (field, value) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderBusinessDataInputs = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Your Business Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="revenue">Annual Revenue</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="revenue"
                    type="number"
                    value={businessData.revenue}
                    onChange={(e) => handleBusinessDataChange('revenue', parseInt(e.target.value))}
                    className="pl-8"
                    placeholder="2,500,000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="profitMargin">Net Profit Margin (%)</Label>
                <div className="relative">
                  <Input
                    id="profitMargin" 
                    type="number"
                    value={businessData.profitMargin}
                    onChange={(e) => handleBusinessDataChange('profitMargin', parseInt(e.target.value))}
                    className="pr-8"
                    placeholder="12"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <Label htmlFor="employees">Total Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  value={businessData.employees}
                  onChange={(e) => handleBusinessDataChange('employees', parseInt(e.target.value))}
                  placeholder="25"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="ownerCentricity">Owner Centricity Score (0-100)</Label>
                <Input
                  id="ownerCentricity"
                  type="number"
                  value={businessData.ownerCentricityScore}
                  onChange={(e) => handleBusinessDataChange('ownerCentricityScore', parseInt(e.target.value))}
                  placeholder="45"
                />
                <p className="text-xs text-gray-500">Lower scores mean higher owner dependency</p>
              </div>

              <div>
                <Label htmlFor="topCustomer">Top Customer % of Revenue</Label>
                <div className="relative">
                  <Input
                    id="topCustomer"
                    type="number"
                    value={businessData.topCustomerPercentage}
                    onChange={(e) => handleBusinessDataChange('topCustomerPercentage', parseInt(e.target.value))}
                    className="pr-8"
                    placeholder="35"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <select
                  id="industry"
                  value={businessData.industry}
                  onChange={(e) => handleBusinessDataChange('industry', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="professional-services">Professional Services</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="construction">Construction</option>
                </select>
              </div>
            </div>
          </div>

          <Button 
            onClick={generateAnalysis}
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Generate Personalized Analysis'}
            <Brain className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderAnalysisResults = () => {
    if (!analysis) return null;

    return (
      <div className="space-y-6">
        {/* Exit Readiness Score */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Your Exit Readiness Score</h3>
                <p className="text-gray-600">Based on your specific business profile</p>
              </div>
              <div className="text-center">
                <div className={`text-6xl font-bold ${
                  analysis.exitReadinessScore.overallScore >= 85 ? 'text-green-600' :
                  analysis.exitReadinessScore.overallScore >= 70 ? 'text-blue-600' :
                  analysis.exitReadinessScore.overallScore >= 55 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {analysis.exitReadinessScore.overallScore}
                </div>
                <div className="text-lg text-gray-600">out of 100</div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-4 gap-4">
              {Object.entries(analysis.exitReadinessScore.breakdown).map(([key, score], index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${
                    score >= 75 ? 'text-green-600' :
                    score >= 60 ? 'text-blue-600' :
                    score >= 45 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {score}
                  </div>
                  <div className="text-sm text-gray-600 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Business Value Estimate */}
        <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Estimated Current Business Value</h3>
                <p className="text-gray-600">Based on your financial metrics and risk factors</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  ${analysis.estimatedValueImpact?.currentValue?.toLocaleString() || '2,300,000'}
                </div>
                <div className="text-sm text-gray-600">Current Estimate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <span>Your Personalized Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysis.recommendations?.length > 0 ? (
              <div className="space-y-6">
                {analysis.recommendations.map((rec, index) => (
                  <Card key={index} className={`border-l-4 ${
                    rec.priority === 1 ? 'border-l-red-500 bg-red-50' :
                    rec.priority === 2 ? 'border-l-orange-500 bg-orange-50' :
                    'border-l-yellow-500 bg-yellow-50'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <Badge className={`${
                              rec.priority === 1 ? 'bg-red-500 text-white' :
                              rec.priority === 2 ? 'bg-orange-500 text-white' :
                              'bg-yellow-500 text-white'
                            }`}>
                              Priority {rec.priority}
                            </Badge>
                            <Badge variant="outline">{rec.impact} Impact</Badge>
                          </div>
                          
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{rec.action}</h4>
                          <p className="text-gray-600 mb-4">{rec.reasoning}</p>
                          
                          {rec.specifics && (
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-800 mb-2">Specific Actions:</h5>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {rec.specifics.map((step, stepIndex) => (
                                  <li key={stepIndex} className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            {rec.timeline && (
                              <div>
                                <span className="font-medium">Timeline:</span>
                                <div className="text-gray-600">{rec.timeline}</div>
                              </div>
                            )}
                            {rec.investment && (
                              <div>
                                <span className="font-medium">Investment:</span>
                                <div className="text-gray-600">{rec.investment}</div>
                              </div>
                            )}
                            {rec.valueIncrease && (
                              <div>
                                <span className="font-medium">Value Impact:</span>
                                <div className="text-green-600 font-semibold">{rec.valueIncrease}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="ml-4">
                          Implement Plan
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Analysis in Progress</h3>
                <p className="text-gray-500">Enter your business data above to generate personalized recommendations</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Value Enhancement Opportunities */}
        {analysis.valueEnhancement && analysis.valueEnhancement.length > 0 && (
          <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <span>Value Enhancement Opportunities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {analysis.valueEnhancement.map((enhancement, index) => (
                  <Card key={index} className="border border-teal-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{enhancement.enhancement}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-teal-500 text-white">{enhancement.priority}</Badge>
                          <Badge variant="outline">{enhancement.difficulty}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <span className="font-medium text-gray-700">Value Increase:</span>
                          <div className="text-green-600 font-bold">
                            ${enhancement.currentValueImpact?.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Investment:</span>
                          <div className="text-gray-600">
                            ${enhancement.investmentRequired?.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">ROI:</span>
                          <div className="text-blue-600 font-bold">
                            {enhancement.roi}%
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Timeline:</span>
                          <div className="text-gray-600">{enhancement.timeline}</div>
                        </div>
                      </div>

                      {enhancement.specificActions && (
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">Implementation Steps:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {enhancement.specificActions.map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-start space-x-2">
                                <Zap className="w-3 h-3 text-teal-500 mt-1 flex-shrink-0" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Industry Benchmarking */}
        {analysis.industryComparison && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Industry Benchmarking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {analysis.industryComparison.revenuePercentile || '65'}th
                  </div>
                  <div className="text-sm text-blue-700">Revenue Percentile</div>
                  <div className="text-xs text-gray-600">vs. industry peers</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {analysis.industryComparison.profitPercentile || '70'}th
                  </div>
                  <div className="text-sm text-green-700">Profit Percentile</div>
                  <div className="text-xs text-gray-600">above average</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {businessData.industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                  <div className="text-sm text-purple-700">Industry Focus</div>
                  <div className="text-xs text-gray-600">specialized analysis</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ROI Calculator for Improvements */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-orange-600" />
              <span>Improvement ROI Calculator</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <Card className="bg-white border border-orange-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Hire General Manager</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Investment:</span>
                      <span className="font-medium">$150K/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Value Increase:</span>
                      <span className="font-bold text-green-600">$500K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI:</span>
                      <span className="font-bold text-blue-600">333%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                    Calculate Custom ROI
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border border-green-200">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Customer Diversification</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Investment:</span>
                      <span className="font-medium">$75K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Value Increase:</span>
                      <span className="font-bold text-green-600">$300K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI:</span>
                      <span className="font-bold text-blue-600">400%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Create Diversification Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border border-blue-200">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Process Documentation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Investment:</span>
                      <span className="font-medium">$30K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Value Increase:</span>
                      <span className="font-bold text-green-600">$200K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI:</span>
                      <span className="font-bold text-blue-600">667%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Start Documentation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <Brain className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl font-bold mb-4">Personalized Business Analysis Engine</h1>
          <p className="text-xl opacity-90 mb-6">
            Get custom recommendations based on your specific business data and exit planning goals
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-80">Rule-Based</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm opacity-80">API Dependencies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">∞</div>
              <div className="text-sm opacity-80">Portability</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Data Inputs */}
      {renderBusinessDataInputs()}

      {/* Analysis Results */}
      {renderAnalysisResults()}

      {/* Future AI Enhancement Note */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-300 border-dashed">
        <CardContent className="p-6 text-center">
          <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Future AI Enhancement Ready</h3>
          <p className="text-gray-600 mb-4">
            This system is designed to integrate with ChatGPT 5 for enhanced natural language 
            recommendations while maintaining complete independence.
          </p>
          <Badge className="bg-blue-100 text-blue-700">
            AI Integration Layer: Prepared for ChatGPT 5
          </Badge>
        </CardContent>
      </Card>

      {/* KGOB Footer */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6 text-center">
          <div className="space-y-2 text-sm text-gray-400">
            <div>Advanced Business Analysis by Kohari Gonzalez CPAs & Advisors</div>
            <div>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213 | 1-844-599-3355</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedRecommendationEngine;