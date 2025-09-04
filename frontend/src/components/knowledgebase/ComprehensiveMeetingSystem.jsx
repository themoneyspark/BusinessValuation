import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  User, 
  Target,
  CheckSquare,
  Calculator,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  FileText,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

const ComprehensiveMeetingSystem = ({ userTier }) => {
  const [currentMeeting, setCurrentMeeting] = useState(1);
  const [currentSection, setCurrentSection] = useState('overview');
  const [meetingProgress, setMeetingProgress] = useState({});
  const [userResponses, setUserResponses] = useState({});
  const [calculatorResults, setCalculatorResults] = useState({});

  const meetings = [
    {
      id: 1,
      title: "Stakeholder Assessment & Business Baseline",
      icon: Users,
      color: "blue",
      sections: ["overview", "stakeholders", "baseline", "documentation"]
    },
    {
      id: 2, 
      title: "Financial Readiness & Wealth Gap",
      icon: DollarSign,
      color: "green",
      sections: ["overview", "cashflow", "wealth-gap", "scenarios"]
    },
    {
      id: 3,
      title: "Business Readiness & Management",
      icon: TrendingUp,
      color: "purple", 
      sections: ["overview", "owner-centricity", "management", "value-enhancement"]
    },
    {
      id: 4,
      title: "Personal Readiness & Vision",
      icon: User,
      color: "teal",
      sections: ["overview", "vision", "identity", "lifestyle"]
    },
    {
      id: 5,
      title: "Action Planning & Implementation", 
      icon: Target,
      color: "orange",
      sections: ["overview", "prioritization", "smart-goals", "tracking"]
    }
  ];

  const getCurrentMeetingData = () => meetings.find(m => m.id === currentMeeting);

  const renderMeetingNavigation = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            KGOB Exit Planning Process
          </h1>
          <div className="flex items-center space-x-2">
            <img 
              src="/kgob-logo.png"
              alt="KGOB Logo"
              className="h-8 w-auto object-contain"
            />
            <div className="text-sm text-gray-600">
              <div>2740 East WT Harris Blvd, Suite 200</div>
              <div>Charlotte, NC 28213 | 1-844-599-3355</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-6">
          {meetings.map((meeting) => {
            const Icon = meeting.icon;
            const isActive = currentMeeting === meeting.id;
            const isCompleted = meetingProgress[meeting.id]?.completed;
            const progress = meetingProgress[meeting.id]?.progress || 0;
            
            return (
              <Card 
                key={meeting.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isActive ? 'ring-2 ring-teal-500 shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setCurrentMeeting(meeting.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    isCompleted ? 'bg-green-500 text-white' : 
                    isActive ? `bg-${meeting.color}-500 text-white` : 
                    `bg-${meeting.color}-100 text-${meeting.color}-600`
                  }`}>
                    {isCompleted ? <CheckSquare className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-2">
                    Meeting #{meeting.id}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">{meeting.title}</p>
                  <Progress value={progress} className="h-1" />
                  <div className="text-xs text-gray-500 mt-1">{progress}% Complete</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWealthGapCalculator = () => {
    const [inputs, setInputs] = useState({
      currentIncome: '',
      desiredIncome: '',
      currentAssets: '',
      businessValue: '',
      timeToExit: '',
      currentExpenses: '',
      postExitExpenses: ''
    });

    const calculateResults = () => {
      const desired = parseFloat(inputs.desiredIncome) || 0;
      const current = parseFloat(inputs.currentAssets) || 0;
      const business = parseFloat(inputs.businessValue) || 0;
      
      const capitalNeeded = desired * 25; // 4% rule
      const totalAssets = current + business;
      const gap = Math.max(0, capitalNeeded - totalAssets);
      const years = parseFloat(inputs.timeToExit) || 1;
      
      const annualValueNeeded = gap / years;
      const businessVal = parseFloat(inputs.businessValue) || 0;
      const valueImprovementPct = businessVal > 0 ? (annualValueNeeded / businessVal) * 100 : 0;
      
      return {
        capitalNeeded: capitalNeeded.toLocaleString(),
        totalAssets: totalAssets.toLocaleString(), 
        wealthGap: gap.toLocaleString(),
        hasGap: gap > 0,
        annualValueNeeded: annualValueNeeded.toLocaleString(),
        requiredGrowth: Math.round(valueImprovementPct * 10) / 10,
        yearsOfSecurity: totalAssets > 0 ? Math.round((totalAssets / desired) * 10) / 10 : 0
      };
    };

    const results = calculateResults();

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-green-600" />
            <span>Advanced Wealth Gap Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Financial Inputs</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="currentIncome">Current Annual Income</Label>
                  <Input
                    id="currentIncome"
                    type="number"
                    placeholder="200,000"
                    value={inputs.currentIncome}
                    onChange={(e) => setInputs(prev => ({...prev, currentIncome: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="desiredIncome">Desired Post-Exit Income</Label>
                  <Input
                    id="desiredIncome"
                    type="number"
                    placeholder="150,000"
                    value={inputs.desiredIncome}
                    onChange={(e) => setInputs(prev => ({...prev, desiredIncome: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="currentAssets">Current Personal Assets</Label>
                  <Input
                    id="currentAssets" 
                    type="number"
                    placeholder="800,000"
                    value={inputs.currentAssets}
                    onChange={(e) => setInputs(prev => ({...prev, currentAssets: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="businessValue">Estimated Business Value</Label>
                  <Input
                    id="businessValue"
                    type="number"
                    placeholder="3,000,000"
                    value={inputs.businessValue}
                    onChange={(e) => setInputs(prev => ({...prev, businessValue: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="timeToExit">Years Until Exit</Label>
                  <Input
                    id="timeToExit"
                    type="number"
                    placeholder="5"
                    value={inputs.timeToExit}
                    onChange={(e) => setInputs(prev => ({...prev, timeToExit: e.target.value}))}
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className={`bg-gradient-to-br rounded-lg p-6 text-white ${
              results.hasGap ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600'
            }`}>
              <h3 className="font-semibold mb-4">Wealth Gap Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Capital Needed:</span>
                  <span className="font-bold">${results.capitalNeeded}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Projected Assets:</span>
                  <span className="font-bold">${results.totalAssets}</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-2">
                  <span>Wealth Gap:</span>
                  <span className="font-bold">
                    {results.hasGap ? `-$${results.wealthGap}` : 'Sufficient'}
                  </span>
                </div>
                {results.hasGap && (
                  <div className="bg-white/10 rounded p-3 mt-4">
                    <p className="text-sm">
                      <strong>Action Required:</strong> Increase business value by ${results.annualValueNeeded} 
                      annually ({results.requiredGrowth}% growth) or extend timeline.
                    </p>
                  </div>
                )}
                {!results.hasGap && (
                  <div className="bg-white/10 rounded p-3 mt-4">
                    <p className="text-sm">
                      <strong>Excellent Position:</strong> Your projected assets should support 
                      {results.yearsOfSecurity} years at desired income level.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h4 className="font-semibold text-blue-900 mb-3">
                {results.hasGap ? 'Strategies to Close the Gap' : 'Optimizing Your Position'}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {results.hasGap ? (
                  <>
                    <div>
                      <strong>Business Value Enhancement:</strong>
                      <ul className="mt-1 space-y-1 text-blue-700">
                        <li>• Reduce owner dependency</li>
                        <li>• Improve profit margins</li>
                        <li>• Strengthen management team</li>
                        <li>• Diversify revenue streams</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Alternative Strategies:</strong>
                      <ul className="mt-1 space-y-1 text-blue-700">
                        <li>• Extend exit timeline</li>
                        <li>• Consider seller financing</li>
                        <li>• Reduce post-exit expenses</li>
                        <li>• Explore earn-out structures</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>Maximize Your Outcome:</strong>
                      <ul className="mt-1 space-y-1 text-blue-700">
                        <li>• Optimize exit timing</li>
                        <li>• Minimize tax impact</li>
                        <li>• Consider multiple offers</li>
                        <li>• Structure for maximum proceeds</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Risk Management:</strong>
                      <ul className="mt-1 space-y-1 text-blue-700">
                        <li>• Diversify post-exit investments</li>
                        <li>• Plan for market fluctuations</li>
                        <li>• Maintain some liquidity</li>
                        <li>• Consider contingency plans</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  };

  const renderMeetingContent = () => {
    const meeting = getCurrentMeetingData();
    
    switch(currentMeeting) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Meeting #1: Stakeholder Assessment & Business Baseline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  In this meeting, we'll identify all stakeholders affected by your exit decision and establish 
                  a comprehensive baseline understanding of your business.
                </p>
                
                <Tabs value={currentSection} onValueChange={setCurrentSection}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
                    <TabsTrigger value="baseline">Business Baseline</TabsTrigger>
                    <TabsTrigger value="documentation">Documentation</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Meeting Objectives</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckSquare className="w-4 h-4 text-green-600" />
                          <span>Map all stakeholders affected by your exit decision</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckSquare className="w-4 h-4 text-green-600" />
                          <span>Complete comprehensive business baseline assessment</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckSquare className="w-4 h-4 text-green-600" />
                          <span>Establish documentation requirements</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckSquare className="w-4 h-4 text-green-600" />
                          <span>Set expectations for the exit planning process</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="stakeholders">
                    <Card>
                      <CardHeader>
                        <CardTitle>Interactive Stakeholder Mapping</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Identify and assess how your exit will impact each group. Click on each stakeholder type to explore specific considerations:
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {['Family Members', 'Key Employees', 'Business Partners', 'Major Customers', 'Key Vendors', 'Community'].map((stakeholder, index) => (
                            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-4 text-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <h4 className="font-medium text-gray-900">{stakeholder}</h4>
                                <p className="text-xs text-gray-600 mt-1">Click to assess impact</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="baseline">
                    <Card>
                      <CardHeader>
                        <CardTitle>Business Baseline Assessment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="businessName">Business Name</Label>
                              <Input id="businessName" placeholder="Enter legal business name" />
                            </div>
                            <div>
                              <Label htmlFor="businessStructure">Legal Structure</Label>
                              <select className="w-full p-2 border rounded">
                                <option>Select structure...</option>
                                <option>C Corporation</option>
                                <option>S Corporation</option>
                                <option>LLC</option>
                                <option>Partnership</option>
                                <option>Sole Proprietorship</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="bg-teal-50 border border-teal-200 rounded p-4">
                            <h4 className="font-medium text-teal-900 mb-2">Why This Matters</h4>
                            <p className="text-sm text-teal-700">
                              Understanding your business structure and baseline metrics is essential for accurate 
                              valuation and identifying the best exit strategies for your situation.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="documentation">
                    <Card>
                      <CardHeader>
                        <CardTitle>Required Documentation Checklist</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {['Financial statements (3 years)', 'Business tax returns (3 years)', 'Personal tax returns (3 years)', 'Management reports', 'A/R aging report', 'Buy-sell agreements'].map((doc, index) => (
                            <label key={index} className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                              <input type="checkbox" className="text-teal-600" />
                              <div className="flex-1">
                                <span className="font-medium">{doc}</span>
                                <p className="text-xs text-gray-600">Essential for comprehensive analysis</p>
                              </div>
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                            </label>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span>Meeting #2: Financial Readiness & Wealth Gap Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Analyze your financial position and determine what you need from your business exit to achieve your personal goals.
                </p>
                {renderWealthGapCalculator()}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Meeting #{currentMeeting}: {meeting.title}
              </h3>
              <p className="text-gray-600 mb-6">
                Interactive content for this meeting is being developed. 
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Schedule This Meeting with KGOB
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderMeetingNavigation()}
      {renderMeetingContent()}
      
      {/* Progress Summary */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Overall Progress</h3>
              <p className="text-sm text-gray-600">Complete all 5 meetings to finalize your exit plan</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">
                {Object.values(meetingProgress).filter(m => m?.completed).length}/5
              </div>
              <div className="text-sm text-gray-600">Meetings Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KGOB Contact Footer */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img 
              src="/kgob-logo.png"
              alt="KGOB Logo"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-8 h-8 bg-teal-500 rounded-lg items-center justify-center">
              <span className="text-white font-bold text-sm">KG</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">Ready to Start Your Exit Planning Process?</h3>
          <p className="text-gray-300 mb-4">
            Schedule your initial consultation with our certified exit planning advisors
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <div>Kohari Gonzalez CPAs & Advisors</div>
            <div>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213</div>
            <div>Phone: 1-844-599-3355 | Email: support@kgob.cpa</div>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 mt-4">
            Schedule Consultation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveMeetingSystem;