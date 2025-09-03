import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Building, 
  DollarSign,
  CheckSquare,
  AlertTriangle,
  Award,
  ArrowRight,
  Target,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Label } from '../ui/label';

const Phase3OwnerCentricity = ({ onComplete, savedData = {} }) => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [assessmentData, setAssessmentData] = useState(savedData);
  const [showResults, setShowResults] = useState(false);

  const functionalAreas = [
    {
      area: "Sales & Customer Management",
      weight: 25,
      color: "blue",
      icon: Users,
      description: "Customer relationships, sales processes, and revenue generation",
      questions: [
        {
          id: "customer_relationships",
          question: "Who maintains primary relationships with your top 10 customers?",
          options: [
            { text: "Dedicated sales team members exclusively", score: 4, explanation: "Excellent - no owner dependency in customer relationships" },
            { text: "Mix of owner and sales team", score: 3, explanation: "Good - shared responsibility reduces risk" },
            { text: "Primarily owner with some team backup", score: 2, explanation: "Concerning - high owner dependency" },
            { text: "Owner maintains all key customer relationships", score: 1, explanation: "Critical risk - complete owner dependency" }
          ]
        },
        {
          id: "sales_process",
          question: "How documented and systematized are your sales processes?",
          options: [
            { text: "Fully documented CRM with standardized processes", score: 4, explanation: "Excellent - systematic approach enables consistent results" },
            { text: "Good documentation with minor gaps", score: 3, explanation: "Good - mostly systematic with some informal processes" },
            { text: "Basic documentation, relies on experience", score: 2, explanation: "Average - too dependent on individual experience" },
            { text: "Mostly undocumented, owner-dependent", score: 1, explanation: "Poor - success depends entirely on owner knowledge" }
          ]
        },
        {
          id: "new_customer_acquisition",
          question: "Who handles new customer acquisition and development?",
          options: [
            { text: "Dedicated sales team with proven track record", score: 4, explanation: "Excellent - sustainable growth capability" },
            { text: "Sales team with owner oversight and support", score: 3, explanation: "Good - team driven with owner guidance" },
            { text: "Owner primary with team support", score: 2, explanation: "Concerning - growth depends heavily on owner" },
            { text: "Owner handles all new business development", score: 1, explanation: "Critical - growth completely owner dependent" }
          ]
        }
      ]
    },
    {
      area: "Operations & Production",
      weight: 20,
      color: "green", 
      icon: Building,
      description: "Daily operations, quality control, and production management",
      questions: [
        {
          id: "daily_operations",
          question: "Who manages daily operations when you're away for 2+ weeks?",
          options: [
            { text: "Operations manager handles everything smoothly", score: 4, explanation: "Excellent - business runs independently" },
            { text: "Manager handles most, occasional consultation needed", score: 3, explanation: "Good - minimal owner dependency" },
            { text: "Manager handles routine, owner needed for problems", score: 2, explanation: "Average - moderate dependency" },
            { text: "Operations struggle significantly without owner", score: 1, explanation: "Poor - critical owner dependency" }
          ]
        },
        {
          id: "quality_control",
          question: "How are quality standards maintained and monitored?",
          options: [
            { text: "Systematic quality management with documented procedures", score: 4, explanation: "Excellent - consistent quality without owner involvement" },
            { text: "Good systems with regular owner oversight", score: 3, explanation: "Good - systems in place with owner guidance" },
            { text: "Basic systems requiring owner involvement", score: 2, explanation: "Average - quality depends on owner presence" },
            { text: "Quality control depends primarily on owner", score: 1, explanation: "Poor - quality risks without owner" }
          ]
        },
        {
          id: "vendor_management",
          question: "Who manages key vendor and supplier relationships?",
          options: [
            { text: "Purchasing manager with established relationships", score: 4, explanation: "Excellent - diversified vendor management" },
            { text: "Team manages routine, owner handles strategic vendors", score: 3, explanation: "Good - balanced approach" },
            { text: "Owner primary contact with team support", score: 2, explanation: "Average - moderate owner dependency" },
            { text: "Owner maintains all critical vendor relationships", score: 1, explanation: "Poor - complete vendor relationship dependency" }
          ]
        }
      ]
    },
    {
      area: "Financial Management",
      weight: 20,
      color: "purple",
      icon: DollarSign,
      description: "Financial reporting, cash management, and fiscal controls",
      questions: [
        {
          id: "financial_reporting",
          question: "Who prepares and analyzes monthly financial reports?",
          options: [
            { text: "CFO/Controller produces comprehensive reports", score: 4, explanation: "Excellent - professional financial management" },
            { text: "Bookkeeper prepares, owner analyzes", score: 3, explanation: "Good - shared financial responsibilities" },
            { text: "Owner compiles and analyzes most reports", score: 2, explanation: "Average - high owner involvement in finance" },
            { text: "Owner handles most financial management", score: 1, explanation: "Poor - complete financial dependency on owner" }
          ]
        },
        {
          id: "cash_management",
          question: "Who makes cash management and investment decisions?",
          options: [
            { text: "Financial manager with established policies", score: 4, explanation: "Excellent - systematic cash management" },
            { text: "Team makes routine, owner approves major decisions", score: 3, explanation: "Good - delegated authority with oversight" },
            { text: "Owner makes most financial decisions", score: 2, explanation: "Average - centralized decision making" },
            { text: "All financial decisions require owner approval", score: 1, explanation: "Poor - bottleneck in financial operations" }
          ]
        }
      ]
    },
    {
      area: "Strategic Decision Making",
      weight: 25,
      color: "teal",
      icon: Target, 
      description: "Strategic planning, major decisions, and business direction",
      questions: [
        {
          id: "strategic_planning",
          question: "Who participates in strategic planning and major decisions?",
          options: [
            { text: "Management team leads strategic planning process", score: 4, explanation: "Excellent - distributed strategic thinking" },
            { text: "Management participates, owner guides direction", score: 3, explanation: "Good - collaborative strategic planning" },
            { text: "Owner leads with management input", score: 2, explanation: "Average - owner-led planning" },
            { text: "Owner makes all strategic decisions alone", score: 1, explanation: "Poor - no strategic succession capability" }
          ]
        },
        {
          id: "problem_solving",
          question: "When significant problems arise, who typically resolves them?",
          options: [
            { text: "Management team resolves most issues independently", score: 4, explanation: "Excellent - autonomous problem-solving capability" },
            { text: "Management handles routine, escalates complex issues", score: 3, explanation: "Good - appropriate escalation process" },
            { text: "Owner involved in most problem resolution", score: 2, explanation: "Average - high owner involvement needed" },
            { text: "All significant problems come directly to owner", score: 1, explanation: "Poor - owner is single point of failure" }
          ]
        },
        {
          id: "external_relationships",
          question: "Who manages relationships with banks, lawyers, accountants?",
          options: [
            { text: "Designated team members manage each relationship", score: 4, explanation: "Excellent - professional relationship distribution" },
            { text: "Team involved, owner maintains primary contact", score: 3, explanation: "Good - shared professional relationships" },
            { text: "Owner primary with team support", score: 2, explanation: "Average - owner-centric relationships" },
            { text: "Owner maintains all external relationships", score: 1, explanation: "Poor - complete relationship dependency" }
          ]
        }
      ]
    },
    {
      area: "Innovation & Development",
      weight: 10,
      color: "orange",
      icon: BarChart3,
      description: "Product development, innovation, and business improvement",
      questions: [
        {
          id: "innovation_process",
          question: "Who drives product/service innovation and development?",
          options: [
            { text: "Innovation team with systematic process", score: 4, explanation: "Excellent - sustainable innovation capability" },
            { text: "Team contributes ideas, owner provides direction", score: 3, explanation: "Good - collaborative innovation" },
            { text: "Owner primary innovator with team input", score: 2, explanation: "Average - owner-dependent innovation" },
            { text: "Owner exclusively drives all innovation", score: 1, explanation: "Poor - innovation stops without owner" }
          ]
        }
      ]
    }
  ];

  const calculateOwnerCentricityScore = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    functionalAreas.forEach(area => {
      const areaWeight = area.weight;
      let areaScore = 0;
      let questionCount = 0;

      area.questions.forEach(question => {
        const answer = assessmentData[question.id];
        if (answer) {
          areaScore += answer.score;
          questionCount++;
        }
      });

      if (questionCount > 0) {
        const averageAreaScore = areaScore / questionCount;
        totalWeightedScore += averageAreaScore * (areaWeight / 100);
        totalWeight += areaWeight / 100;
      }
    });

    return totalWeight > 0 ? Math.round((totalWeightedScore / totalWeight) * 25) : 0;
  };

  const getScoreInterpretation = (score) => {
    if (score >= 85) return { 
      level: 'Excellent', 
      color: 'text-green-600 bg-green-50 border-green-200',
      description: 'Your business demonstrates exceptional independence from owner involvement. This significantly enhances business value.',
      valueImpact: '+20-25% above base valuation',
      readiness: 'Ready for immediate exit consideration'
    };
    if (score >= 70) return { 
      level: 'Good', 
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Strong management systems with some areas for improvement. Moderate positive impact on value.',
      valueImpact: '+10-15% above base valuation',
      readiness: 'Ready for exit planning with minor improvements'
    };
    if (score >= 55) return { 
      level: 'Developing', 
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      description: 'Moderate owner dependency that should be addressed before exit. Some impact on valuation.',
      valueImpact: 'Neutral to +5% above base valuation',
      readiness: 'Needs 12-18 months of improvement before exit'
    };
    return { 
      level: 'High Dependency', 
      color: 'text-red-600 bg-red-50 border-red-200',
      description: 'High owner dependency significantly impacts business value and exit options.',
      valueImpact: '-15-25% below base valuation',
      readiness: 'Requires 2-3 years of systematic improvement'
    };
  };

  const currentArea = functionalAreas[currentCategory];
  const totalAreas = functionalAreas.length;
  const overallProgress = Math.round(((currentCategory + 1) / totalAreas) * 100);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAssessmentData(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const handleNextCategory = () => {
    if (currentCategory < totalAreas - 1) {
      setCurrentCategory(currentCategory + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousCategory = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };

  if (showResults) {
    const finalScore = calculateOwnerCentricityScore();
    const interpretation = getScoreInterpretation(finalScore);
    
    return (
      <div className="space-y-6">
        {/* Results Header */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl font-bold mb-4">Owner Centricity Assessment Results</h1>
            <div className="text-6xl font-bold mb-2">{finalScore}</div>
            <div className="text-xl opacity-90">out of 100</div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card className={`border-2 ${interpretation.color}`}>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-3">{interpretation.level} Business Independence</h2>
              <p className="text-lg">{interpretation.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Impact on Business Value</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Base Business Value:</span>
                    <span className="font-medium">$3,000,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Owner Centricity Adjustment:</span>
                    <span className={`font-bold ${finalScore >= 70 ? 'text-green-600' : finalScore >= 55 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {interpretation.valueImpact}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Adjusted Business Value:</span>
                    <span className="font-bold text-lg">
                      ${finalScore >= 85 ? '3,600,000' : finalScore >= 70 ? '3,300,000' : finalScore >= 55 ? '3,000,000' : '2,400,000'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Exit Readiness Timeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Current Readiness:</span>
                    <span className="font-medium">{interpretation.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recommended Timeline:</span>
                    <span className="font-medium">{interpretation.readiness}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Area-by-Area Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Area Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {functionalAreas.map((area, index) => {
                const areaQuestions = area.questions.filter(q => assessmentData[q.id]);
                const areaScore = areaQuestions.length > 0 
                  ? Math.round(areaQuestions.reduce((sum, q) => sum + assessmentData[q.id].score, 0) / areaQuestions.length * 25)
                  : 0;
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <area.icon className={`w-5 h-5 ${
                        area.color === 'blue' ? 'text-blue-600' :
                        area.color === 'green' ? 'text-green-600' :
                        area.color === 'purple' ? 'text-purple-600' :
                        area.color === 'teal' ? 'text-teal-600' :
                        'text-orange-600'
                      }`} />
                      <div>
                        <span className="font-medium">{area.area}</span>
                        <div className="text-xs text-gray-500">{area.weight}% weight</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        areaScore >= 85 ? 'text-green-600' :
                        areaScore >= 70 ? 'text-blue-600' :
                        areaScore >= 55 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {areaScore}/100
                      </div>
                      <div className="text-xs text-gray-500">
                        {areaScore >= 85 ? 'Excellent' :
                         areaScore >= 70 ? 'Good' :
                         areaScore >= 55 ? 'Average' : 'Needs Work'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-teal-50 border-teal-200">
          <CardHeader>
            <CardTitle className="text-teal-900">Improvement Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {finalScore < 85 && (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-teal-800 mb-2">High Impact Actions:</h4>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• Hire or promote general manager/COO</li>
                        <li>• Implement management training program</li>
                        <li>• Document critical business processes</li>
                        <li>• Create customer relationship management system</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-800 mb-2">Timeline & Investment:</h4>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• 6-18 month improvement timeline</li>
                        <li>• $50K-150K investment required</li>
                        <li>• 15-25% potential value increase</li>
                        <li>• Quarterly progress reviews recommended</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline"
            onClick={() => {
              setShowResults(false);
              setCurrentCategory(0);
            }}
          >
            Retake Assessment
          </Button>
          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => onComplete?.(assessmentData)}
          >
            Continue to Phase 4
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  const renderCurrentCategory = () => {
    const area = functionalAreas[currentCategory];
    const AreaIcon = area.icon;

    return (
      <div className="space-y-6">
        {/* Progress Header */}
        <Card className={`bg-gradient-to-r ${
          area.color === 'blue' ? 'from-blue-50 to-blue-100' :
          area.color === 'green' ? 'from-green-50 to-green-100' :
          area.color === 'purple' ? 'from-purple-50 to-purple-100' :
          area.color === 'teal' ? 'from-teal-50 to-teal-100' :
          'from-orange-50 to-orange-100'
        } border-2 ${
          area.color === 'blue' ? 'border-blue-200' :
          area.color === 'green' ? 'border-green-200' :
          area.color === 'purple' ? 'border-purple-200' :
          area.color === 'teal' ? 'border-teal-200' :
          'border-orange-200'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  area.color === 'blue' ? 'bg-blue-500' :
                  area.color === 'green' ? 'bg-green-500' :
                  area.color === 'purple' ? 'bg-purple-500' :
                  area.color === 'teal' ? 'bg-teal-500' :
                  'bg-orange-500'
                } text-white`}>
                  <AreaIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{area.area}</h2>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              </div>
              <Badge className={`text-white ${
                area.color === 'blue' ? 'bg-blue-500' :
                area.color === 'green' ? 'bg-green-500' :
                area.color === 'purple' ? 'bg-purple-500' :
                area.color === 'teal' ? 'bg-teal-500' :
                'bg-orange-500'
              }`}>
                {area.weight}% Weight
              </Badge>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <div className="text-sm text-gray-600 mt-2">
              Category {currentCategory + 1} of {totalAreas} • {overallProgress}% Complete
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {area.questions.map((question, questionIndex) => {
            const selectedAnswer = assessmentData[question.id];
            
            return (
              <Card key={question.id}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">{question.question}</h3>
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswer?.text === option.text;
                      
                      return (
                        <label 
                          key={optionIndex}
                          className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => handleAnswerSelect(question.id, option)}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(question.id, option)}
                            className="text-blue-600 mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{option.text}</span>
                              <Badge variant="outline">{option.score} points</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{option.explanation}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Navigation */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousCategory}
                disabled={currentCategory === 0}
              >
                Previous Category
              </Button>

              <div className="text-sm text-gray-600">
                {currentCategory + 1} of {totalAreas} categories
              </div>

              <Button
                onClick={handleNextCategory}
                disabled={!area.questions.every(q => assessmentData[q.id])}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {currentCategory === totalAreas - 1 ? 'See Results' : 'Next Category'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Phase 3: Owner Centricity Assessment
              </h1>
              <p className="text-gray-600 text-lg">
                Evaluate your business's dependence on your personal involvement
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{functionalAreas.length}</div>
              <div className="text-sm text-gray-600">Assessment Areas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {renderCurrentCategory()}

      {/* KGOB Footer */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6 text-center">
          <div className="space-y-2 text-sm text-gray-400">
            <div>Professional Business Assessment by Kohari Gonzalez CPAs & Advisors</div>
            <div>2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213 | 1-844-599-3355</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase3OwnerCentricity;