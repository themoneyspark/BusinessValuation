import React, { useState } from 'react';
import { 
  Target, 
  CheckSquare, 
  Calendar, 
  User,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Award,
  ArrowRight,
  Plus,
  Edit
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const Phase5ActionPlanning = ({ onComplete, savedData = {} }) => {
  const [activeTab, setActiveTab] = useState('goals');
  const [goals, setGoals] = useState(savedData.goals || []);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [priorityMatrix, setPriorityMatrix] = useState(savedData.priorityMatrix || []);

  const goalCategories = [
    {
      category: "Business Value Enhancement",
      color: "blue",
      icon: TrendingUp,
      description: "Actions to increase business value and reduce owner dependency",
      templateGoals: [
        {
          title: "Reduce Owner Centricity Score",
          description: "Develop management team to reduce business dependency on owner",
          impact: "High",
          timeline: "12-18 months",
          valueIncrease: "15-25%"
        },
        {
          title: "Increase EBITDA Performance", 
          description: "Improve profitability through operational efficiency and growth",
          impact: "High",
          timeline: "6-12 months",
          valueIncrease: "10-20%"
        },
        {
          title: "Diversify Customer Base",
          description: "Reduce customer concentration risk and build stable revenue",
          impact: "Medium",
          timeline: "12-24 months", 
          valueIncrease: "5-15%"
        }
      ]
    },
    {
      category: "Personal Readiness",
      color: "purple",
      icon: User,
      description: "Personal preparation for successful life transition",
      templateGoals: [
        {
          title: "Develop Post-Exit Identity",
          description: "Create new professional identity and social connections",
          impact: "High",
          timeline: "6-18 months",
          valueIncrease: "Personal satisfaction"
        },
        {
          title: "Build Financial Security Confidence",
          description: "Ensure complete financial planning and investment strategy",
          impact: "High", 
          timeline: "3-12 months",
          valueIncrease: "Peace of mind"
        },
        {
          title: "Plan Activity and Engagement",
          description: "Design meaningful activities and purpose for post-exit life",
          impact: "Medium",
          timeline: "6-12 months",
          valueIncrease: "Life satisfaction"
        }
      ]
    },
    {
      category: "Legal & Financial Structure",
      color: "green",
      icon: DollarSign, 
      description: "Legal and financial preparations for successful exit",
      templateGoals: [
        {
          title: "Optimize Exit Tax Structure",
          description: "Implement tax strategies to minimize exit tax burden",
          impact: "High",
          timeline: "6-24 months",
          valueIncrease: "Tax savings"
        },
        {
          title: "Update Legal Documentation",
          description: "Ensure all legal documents support optimal exit strategy",
          impact: "Medium",
          timeline: "3-9 months", 
          valueIncrease: "Risk reduction"
        }
      ]
    }
  ];

  const smartGoalFramework = {
    specific: {
      title: "Specific",
      description: "Goals must be clear and specific",
      questions: ["What exactly will be accomplished?", "Who is involved?", "What are the requirements?"],
      helpText: "Avoid vague goals like 'improve the business' - be specific about what will change"
    },
    measurable: {
      title: "Measurable", 
      description: "Goals must have measurable outcomes",
      questions: ["How will progress be measured?", "How will you know when it's complete?", "What are the KPIs?"],
      helpText: "Include specific numbers, percentages, or other quantifiable metrics"
    },
    achievable: {
      title: "Achievable",
      description: "Goals must be realistic and attainable",
      questions: ["Is this realistic given resources?", "Do you have necessary capabilities?", "What constraints exist?"],
      helpText: "Ambitious but realistic - consider time, budget, and capability constraints"
    },
    relevant: {
      title: "Relevant",
      description: "Goals must align with exit planning objectives",
      questions: ["How does this support your exit strategy?", "Is timing appropriate?", "Does it align with values?"],
      helpText: "Ensure each goal directly supports your overall exit planning objectives"
    },
    timeBound: {
      title: "Time-bound",
      description: "Goals must have specific deadlines and milestones",
      questions: ["When will this be completed?", "What are interim milestones?", "How will progress be tracked?"],
      helpText: "Include both final deadline and interim milestone dates"
    }
  };

  const renderGoalBuilder = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>SMART Goals Development</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Template Goals */}
            <div className="grid gap-6">
              {goalCategories.map((category, categoryIndex) => {
                const CategoryIcon = category.icon;
                
                return (
                  <div key={categoryIndex}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        category.color === 'blue' ? 'bg-blue-500' :
                        category.color === 'purple' ? 'bg-purple-500' :
                        'bg-green-500'
                      } text-white`}>
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.category}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      {category.templateGoals.map((template, templateIndex) => (
                        <Card key={templateIndex} className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 mb-2">{template.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                                <div className="flex items-center space-x-4 text-xs">
                                  <Badge variant="outline">Impact: {template.impact}</Badge>
                                  <Badge variant="outline">Timeline: {template.timeline}</Badge>
                                  <Badge variant="outline">{template.valueIncrease}</Badge>
                                </div>
                              </div>
                              <Button 
                                size="sm"
                                onClick={() => setCurrentGoal(template)}
                                className="ml-4"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add Goal
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current Goals List */}
            {goals.length > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Your SMART Goals ({goals.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {goals.map((goal, index) => (
                      <div key={index} className="bg-white rounded p-4 border border-blue-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{goal.title}</h4>
                            <p className="text-sm text-gray-600">{goal.description}</p>
                            <div className="flex items-center space-x-3 mt-2 text-xs">
                              <span>Deadline: {goal.deadline}</span>
                              <span>Priority: {goal.priority}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPriorityMatrix = () => {
    const priorityLevels = [
      {
        level: "Priority 1: Critical & Immediate",
        description: "High impact, urgent, manageable complexity - start immediately",
        color: "red",
        timeline: "Next 90 days",
        resourceAllocation: "50% of resources"
      },
      {
        level: "Priority 2: Important & Near-term",
        description: "Good impact, moderate urgency - important for success", 
        color: "orange",
        timeline: "3-6 months",
        resourceAllocation: "30% of resources"
      },
      {
        level: "Priority 3: Valuable & Medium-term",
        description: "Moderate impact, good for long-term success",
        color: "yellow", 
        timeline: "6-18 months",
        resourceAllocation: "15% of resources"
      },
      {
        level: "Priority 4: Future Considerations",
        description: "Lower immediate impact - future planning",
        color: "green",
        timeline: "18+ months",
        resourceAllocation: "5% of resources"
      }
    ];

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Priority Matrix & Resource Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {priorityLevels.map((level, index) => (
                <Card key={index} className={`border-l-4 ${
                  level.color === 'red' ? 'border-l-red-500 bg-red-50' :
                  level.color === 'orange' ? 'border-l-orange-500 bg-orange-50' :
                  level.color === 'yellow' ? 'border-l-yellow-500 bg-yellow-50' :
                  'border-l-green-500 bg-green-50'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{level.level}</h3>
                        <p className="text-gray-600 mb-3">{level.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-700">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{level.timeline}</span>
                          </div>
                          <div>Resource: {level.resourceAllocation}</div>
                        </div>
                      </div>
                      <Badge className={
                        level.color === 'red' ? 'bg-red-500 text-white' :
                        level.color === 'orange' ? 'bg-orange-500 text-white' :
                        level.color === 'yellow' ? 'bg-yellow-500 text-white' :
                        'bg-green-500 text-white'
                      }>
                        {index + 1}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderImplementationPlan = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Implementation Timeline & Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-6">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-red-600">90 Days</div>
                  <div className="text-sm text-red-700 mt-1">Critical Actions</div>
                  <div className="text-xs text-red-600 mt-2">Must start immediately</div>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">6 Months</div>
                  <div className="text-sm text-orange-700 mt-1">Important Goals</div>
                  <div className="text-xs text-orange-600 mt-2">Major milestones</div>
                </CardContent>
              </Card>
              
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-yellow-600">1 Year</div>
                  <div className="text-sm text-yellow-700 mt-1">Strategic Goals</div>
                  <div className="text-xs text-yellow-600 mt-2">Foundation building</div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">3+ Years</div>
                  <div className="text-sm text-green-700 mt-1">Long-term</div>
                  <div className="text-xs text-green-600 mt-2">Future planning</div>
                </CardContent>
              </Card>
            </div>

            {/* Sample Implementation Timeline */}
            <Card className="bg-teal-50 border-teal-200 mt-6">
              <CardContent className="p-6">
                <h4 className="font-semibold text-teal-900 mb-4">Sample Exit Planning Timeline</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-red-700 mb-2">First 90 Days</h5>
                      <ul className="space-y-1 text-red-600">
                        <li>• Complete all assessments</li>
                        <li>• Gather required documentation</li>
                        <li>• Begin management development</li>
                        <li>• Start process documentation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-700 mb-2">Months 3-6</h5>
                      <ul className="space-y-1 text-orange-600">
                        <li>• Hire key management positions</li>
                        <li>• Implement new systems</li>
                        <li>• Begin reducing owner involvement</li>
                        <li>• Update financial reporting</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-yellow-700 mb-2">Months 6-12</h5>
                      <ul className="space-y-1 text-yellow-600">
                        <li>• Complete management transition</li>
                        <li>• Achieve independence targets</li>
                        <li>• Conduct interim valuation</li>
                        <li>• Finalize personal planning</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-700 mb-2">Year 2+</h5>
                      <ul className="space-y-1 text-green-600">
                        <li>• Market the business</li>
                        <li>• Execute exit strategy</li>
                        <li>• Complete transition</li>
                        <li>• Begin post-exit life</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderFinalReport = () => {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <CardContent className="p-8 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl font-bold mb-4">Your Complete ExitMap Report</h1>
            <p className="text-xl opacity-90 mb-6">
              Comprehensive exit planning analysis and implementation roadmap
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm opacity-80">Phases Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{goals.length}</div>
                <div className="text-sm opacity-80">SMART Goals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Assessment Results</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Business Baseline Score:</span>
                    <span className="font-medium">Completed ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Financial Readiness:</span>
                    <span className="font-medium">Analyzed ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Owner Centricity Score:</span>
                    <span className="font-medium">Assessed ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Personal Vision:</span>
                    <span className="font-medium">Developed ✓</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Next Steps</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-4 h-4 text-green-600" />
                    <span>Begin Priority 1 action items</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-4 h-4 text-green-600" />
                    <span>Schedule quarterly progress reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-4 h-4 text-green-600" />
                    <span>Implement tracking and monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-4 h-4 text-green-600" />
                    <span>Begin ongoing advisory relationship</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            className="bg-teal-600 hover:bg-teal-700 px-8 py-3"
            onClick={() => onComplete?.({ goals, priorityMatrix, completed: true })}
          >
            Complete Exit Planning Process
            <CheckSquare className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Phase 5: Action Planning & Implementation
              </h1>
              <p className="text-gray-600 text-lg">
                Create SMART goals and prioritized implementation roadmap
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{goals.length}</div>
              <div className="text-sm text-gray-600">SMART Goals</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="goals">SMART Goals</TabsTrigger>
          <TabsTrigger value="matrix">Priority Matrix</TabsTrigger>
          <TabsTrigger value="timeline">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="goals">
          {renderGoalBuilder()}
        </TabsContent>

        <TabsContent value="matrix">
          {renderPriorityMatrix()}
        </TabsContent>

        <TabsContent value="timeline">
          {renderImplementationPlan()}
        </TabsContent>
      </Tabs>

      {/* Final Report Section */}
      {goals.length >= 3 && (
        <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
          <CardContent className="p-6 text-center">
            <CheckSquare className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Generate Your ExitMap Report</h3>
            <p className="text-gray-600 mb-4">
              You have {goals.length} SMART goals ready for implementation. Generate your comprehensive exit planning report.
            </p>
            <Button 
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => setActiveTab('report')}
            >
              Generate Final Report
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'report' && renderFinalReport()}

      {/* KGOB Footer */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6 text-center">
          <div className="space-y-2 text-sm text-gray-400">
            <div>SMART Goals Development by Kohari Gonzalez CPAs & Advisors</div>
            <div>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213 | 1-844-599-3355</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase5ActionPlanning;