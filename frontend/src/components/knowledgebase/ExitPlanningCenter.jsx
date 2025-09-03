import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  DollarSign, 
  TrendingUp, 
  User,
  CheckSquare,
  Calculator,
  FileText,
  Award,
  ArrowRight,
  Clock,
  Star,
  Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Phase1BusinessBaseline from './Phase1BusinessBaseline';
import Phase2FinancialCalculators from './Phase2FinancialCalculators';

const ExitPlanningCenter = ({ userTier }) => {
  const [activePhase, setActivePhase] = useState(1);
  const [activeModule, setActiveModule] = useState('overview');
  const [userProgress, setUserProgress] = useState({});
  const [completedAssessments, setCompletedAssessments] = useState({});

  const phases = [
    {
      id: 1,
      title: "Foundation & Discovery",
      subtitle: "Stakeholder Mapping & Business Baseline",
      icon: Users,
      color: "blue",
      duration: "90-120 min",
      status: completedAssessments.phase1 ? 'completed' : 'available',
      tools: ["47-Point Business Assessment", "Stakeholder Impact Analysis", "Documentation System"],
      outcomes: ["Complete business profile", "Stakeholder risk map", "Documentation roadmap"]
    },
    {
      id: 2, 
      title: "Financial Readiness",
      subtitle: "Cash Flow Analysis & Wealth Gap Calculation", 
      icon: DollarSign,
      color: "green",
      duration: "90-120 min",
      status: completedAssessments.phase2 ? 'completed' : (completedAssessments.phase1 ? 'available' : 'locked'),
      tools: ["Cash Flow Normalization", "Wealth Gap Calculator", "Exit Feasibility Analysis"],
      outcomes: ["Normalized cash flow", "Precise wealth gap", "Financial readiness score"]
    },
    {
      id: 3,
      title: "Business Readiness",
      subtitle: "Owner Centricity & Management Assessment",
      icon: TrendingUp,
      color: "purple", 
      duration: "90-120 min",
      status: completedAssessments.phase3 ? 'completed' : (completedAssessments.phase2 ? 'available' : 'locked'),
      tools: ["Owner Centricity Assessment", "Management Depth Analysis", "Value Enhancement Planning"],
      outcomes: ["Owner dependency score", "Management gaps", "Value improvement plan"]
    },
    {
      id: 4,
      title: "Personal Readiness", 
      subtitle: "Vision Development & Identity Planning",
      icon: User,
      color: "teal",
      duration: "90-120 min", 
      status: completedAssessments.phase4 ? 'completed' : (completedAssessments.phase3 ? 'available' : 'locked'),
      tools: ["Personal Vision Builder", "Identity Transition Planner", "Lifestyle Designer"],
      outcomes: ["Personal vision", "Identity plan", "Lifestyle blueprint"]
    },
    {
      id: 5,
      title: "Action Planning",
      subtitle: "Implementation Strategy & Timeline",
      icon: Target,
      color: "orange",
      duration: "90-120 min",
      status: completedAssessments.phase5 ? 'completed' : (completedAssessments.phase4 ? 'available' : 'locked'),
      tools: ["SMART Goals Generator", "Priority Matrix", "Implementation Tracker"],
      outcomes: ["Action plan", "SMART goals", "Timeline"]
    }
  ];

  const renderPhaseNavigation = () => {
    return (
      <div className="grid grid-cols-5 gap-4 mb-8">
        {phases.map((phase) => {
          const Icon = phase.icon;
          const isActive = activePhase === phase.id;
          const isCompleted = phase.status === 'completed';
          const isLocked = phase.status === 'locked';
          const progress = userProgress[phase.id] || (isCompleted ? 100 : 0);
          
          return (
            <Card 
              key={phase.id}
              className={`cursor-pointer transition-all duration-300 ${
                isLocked ? 'opacity-50 cursor-not-allowed' :
                isActive ? `ring-2 ring-${phase.color}-500 shadow-lg scale-105` : 
                'hover:shadow-md hover:scale-102'
              }`}
              onClick={() => !isLocked && setActivePhase(phase.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  isCompleted ? 'bg-green-500 text-white' : 
                  isLocked ? 'bg-gray-300 text-gray-500' :
                  isActive ? `bg-${phase.color}-500 text-white` : 
                  `bg-${phase.color}-100 text-${phase.color}-600`
                }`}>
                  {isCompleted ? <CheckSquare className="w-8 h-8" /> : 
                   isLocked ? <Star className="w-8 h-8" /> : 
                   <Icon className="w-8 h-8" />}
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Phase {phase.id}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {phase.subtitle}
                  </p>
                  <div className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{phase.duration}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">
                    {isCompleted ? 'Completed' : isLocked ? 'Locked' : `${progress}% Done`}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const handlePhaseCompletion = (phaseId, data) => {
    setCompletedAssessments(prev => ({
      ...prev,
      [`phase${phaseId}`]: data
    }));
    setUserProgress(prev => ({
      ...prev,
      [phaseId]: 100
    }));
    
    // Auto-advance to next phase
    if (phaseId < 5) {
      setActivePhase(phaseId + 1);
    }
  };

  const renderPhaseContent = () => {
    const currentPhase = phases.find(p => p.id === activePhase);
    
    if (currentPhase?.status === 'locked') {
      return (
        <Card>
          <CardContent className="p-12 text-center">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Complete Previous Phases to Unlock
            </h3>
            <p className="text-gray-600">
              You must complete Phase {activePhase - 1} before accessing this content.
            </p>
          </CardContent>
        </Card>
      );
    }

    switch(activePhase) {
      case 1:
        return <Phase1BusinessBaseline onComplete={(data) => handlePhaseCompletion(1, data)} savedData={completedAssessments.phase1} />;
      case 2:
        return <Phase2FinancialCalculators userTier={userTier} />;
      case 3:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Phase 3: Business Readiness Assessment
              </h3>
              <p className="text-gray-600 mb-6">
                Owner Centricity Analysis & Management Assessment tools are being finalized...
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Schedule Phase 3 Consultation
              </Button>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <User className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Phase 4: Personal Readiness & Vision Development
              </h3>
              <p className="text-gray-600 mb-6">
                Personal Vision Builder and Identity Transition tools are being finalized...
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Schedule Phase 4 Consultation
              </Button>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Phase 5: Action Planning & Implementation
              </h3>
              <p className="text-gray-600 mb-6">
                SMART Goals Development & Priority Matrix tools are being finalized...
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Schedule Phase 5 Consultation
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return <div>Loading phase content...</div>;
    }
  };

  const renderPhase1Content = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-900">Phase 1: Foundation & Discovery</h2>
                  <p className="text-sm text-blue-700">Stakeholder Mapping & Business Baseline Assessment</p>
                </div>
              </div>
              <Badge className="bg-blue-500 text-white">47 Assessment Points</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs value={activeModule} onValueChange={setActiveModule}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="stakeholders">Stakeholder Analysis</TabsTrigger>
                <TabsTrigger value="baseline">Business Baseline</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-blue-900">6 Stakeholder Groups</h3>
                      <p className="text-sm text-blue-700">Complete impact analysis</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6 text-center">
                      <FileText className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-green-900">47 Data Points</h3>
                      <p className="text-sm text-green-700">Comprehensive baseline</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-6 text-center">
                      <CheckSquare className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-purple-900">25+ Documents</h3>
                      <p className="text-sm text-purple-700">Required documentation</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">What Makes This Phase Critical</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Stakeholder Mapping</h4>
                        <ul className="space-y-2 text-blue-100">
                          <li>• Identifies all parties affected by your exit</li>
                          <li>• Assesses impact level and risk for each group</li>
                          <li>• Develops mitigation strategies</li>
                          <li>• Prevents surprises during exit process</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Business Baseline</h4>
                        <ul className="space-y-2 text-blue-100">
                          <li>• Establishes comprehensive business profile</li>
                          <li>• Identifies strengths and improvement areas</li>
                          <li>• Sets foundation for valuation analysis</li>
                          <li>• Guides strategy development</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stakeholders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Stakeholder Impact Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Systematic evaluation of how your exit decision affects every stakeholder group. 
                      Complete assessment for each group to understand risks and develop mitigation strategies.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { name: 'Family & Personal', risk: 'Critical', color: 'red', description: 'Income, employment, inheritance impacts' },
                        { name: 'Key Employees', risk: 'High', color: 'orange', description: 'Job security, leadership transition' },
                        { name: 'Business Partners', risk: 'Critical', color: 'red', description: 'Ownership, control, agreements' },
                        { name: 'Major Customers', risk: 'High', color: 'orange', description: 'Relationship continuity, contracts' },
                        { name: 'Key Vendors', risk: 'Medium', color: 'yellow', description: 'Supply chain, credit terms' },
                        { name: 'Community', risk: 'Low', color: 'green', description: 'Employment, civic impact' }
                      ].map((stakeholder, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-gray-300 hover:border-l-blue-500">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-semibold text-gray-900">{stakeholder.name}</h4>
                              <Badge className={`bg-${stakeholder.color}-100 text-${stakeholder.color}-700 text-xs`}>
                                {stakeholder.risk} Risk
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{stakeholder.description}</p>
                            <Button variant="outline" size="sm" className="w-full">
                              Begin Assessment
                              <ArrowRight className="w-3 h-3 ml-2" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="baseline" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Comprehensive Business Baseline Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Assessment Overview</h4>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">47</div>
                          <div className="text-blue-700">Total Questions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">8</div>
                          <div className="text-green-700">Categories</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">60</div>
                          <div className="text-purple-700">Minutes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">100</div>
                          <div className="text-orange-700">Point Scale</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { category: 'Business Identity & Structure', questions: 7, weight: '10%', color: 'blue' },
                        { category: 'Operational Metrics', questions: 6, weight: '15%', color: 'green' },
                        { category: 'Financial Performance', questions: 8, weight: '25%', color: 'purple' },
                        { category: 'Market Position & Competition', questions: 4, weight: '15%', color: 'teal' },
                        { category: 'Risk Assessment', questions: 2, weight: '10%', color: 'orange' },
                        { category: 'Exit Strategy Preferences', questions: 4, weight: '15%', color: 'red' },
                        { category: 'Financial Dependencies', questions: 3, weight: '10%', color: 'indigo' }
                      ].map((section, index) => (
                        <Card key={index} className="border-l-4 border-l-gray-300 hover:border-l-blue-500 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">{section.category}</h4>
                                <p className="text-sm text-gray-600">{section.questions} detailed questions • {section.weight} of total score</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Start Section
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documentation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Documentation Collection System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">8</div>
                        <div className="text-sm text-red-700">Critical Documents</div>
                        <div className="text-xs text-red-600">Must Have</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">12</div>
                        <div className="text-sm text-orange-700">Important Documents</div>
                        <div className="text-xs text-orange-600">High Priority</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">8</div>
                        <div className="text-sm text-yellow-700">Supporting Documents</div>
                        <div className="text-xs text-yellow-600">If Available</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Card className="border-red-200 bg-red-50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-red-900 flex items-center space-x-2">
                            <span>Critical Financial Documents</span>
                            <Badge className="bg-red-600 text-white">Required</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              'Audited Financial Statements (3 years)', 
                              'Business Tax Returns (3 years)',
                              'Personal Tax Returns (3 years)',
                              'Management Reports & KPIs'
                            ].map((doc, index) => (
                              <label key={index} className="flex items-center space-x-3 p-3 bg-white border border-red-200 rounded cursor-pointer hover:bg-red-25">
                                <input type="checkbox" className="text-red-600" />
                                <div className="flex-1">
                                  <span className="font-medium text-gray-900">{doc}</span>
                                  <p className="text-xs text-gray-600">Essential for valuation analysis</p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPhase2Content = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-900">Phase 2: Financial Readiness Analysis</h2>
                <p className="text-sm text-green-700">Advanced Financial Assessment & Modeling</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-3 gap-6 mb-8">
              <Card className="bg-green-50 border-green-200 cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Calculator className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-green-900">Cash Flow Normalization</h3>
                  <p className="text-xs text-green-700 mb-3">25+ adjustment categories</p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Open Calculator
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200 cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Target className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-900">Wealth Gap Analysis</h3>
                  <p className="text-xs text-blue-700 mb-3">Multi-scenario modeling</p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Calculate Gap
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200 cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-purple-900">Exit Feasibility</h3>
                  <p className="text-xs text-purple-700 mb-3">Strategic timing analysis</p>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Analyze Timing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPhase3Content = () => {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <TrendingUp className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Phase 3: Business Readiness Assessment
          </h3>
          <p className="text-gray-600 mb-6">
            Owner Centricity Analysis & Management Assessment tools coming soon...
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700">
            Schedule Phase 3 Meeting
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderPhase4Content = () => {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <User className="w-16 h-16 text-teal-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Phase 4: Personal Readiness & Vision
          </h3>
          <p className="text-gray-600 mb-6">
            Personal Vision Development & Identity Transition tools coming soon...
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700">
            Schedule Phase 4 Meeting
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderPhase5Content = () => {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Target className="w-16 h-16 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Phase 5: Action Planning & Implementation
          </h3>
          <p className="text-gray-600 mb-6">
            SMART Goals Development & Priority Matrix tools coming soon...
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700">
            Schedule Phase 5 Meeting
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* KGOB Branded Header */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden relative">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src="/kgob-logo.png"
                  alt="KGOB Logo"
                  className="h-12 w-auto object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <div>
                  <h1 className="text-3xl font-bold">Professional Exit Planning System</h1>
                  <p className="text-gray-300">Comprehensive 5-Phase Methodology for Successful Business Transitions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-6 max-w-2xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">5</div>
                  <div className="text-sm text-gray-300">Structured Phases</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">95%</div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">32%</div>
                  <div className="text-sm text-gray-300">Avg Value Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">200+</div>
                  <div className="text-sm text-gray-300">Clients Served</div>
                </div>
              </div>
            </div>
            
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-10">
              <Target className="w-32 h-32" />
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div>Kohari Gonzalez CPAs & Advisors | Charlotte, NC</div>
              <div>2740 East WT Harris Blvd, Suite 200 | 1-844-599-3355 | support@kgob.cpa</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Navigation */}
      {renderPhaseNavigation()}

      {/* Current Phase Content */}
      {renderPhaseContent()}

      {/* Professional CTA Section */}
      <Card className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <Star className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Exit Planning Journey?</h3>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Our certified exit planning advisors will guide you through this proven methodology 
            to create a customized strategy that maximizes your business value and personal success.
          </p>
          <div className="space-y-4">
            <Button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Schedule Your Initial Consultation
            </Button>
            <p className="text-sm opacity-80">
              Initial consultation includes preliminary assessment and personalized recommendations
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExitPlanningCenter;