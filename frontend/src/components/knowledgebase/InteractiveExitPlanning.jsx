import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  CheckSquare, 
  TrendingUp, 
  DollarSign, 
  Users,
  Target,
  ArrowRight,
  RefreshCw,
  Award,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

const InteractiveExitPlanning = ({ userTier }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [calculatorData, setCalculatorData] = useState({
    currentIncome: '',
    desiredIncome: '',
    currentAssets: '',
    businessValue: '',
    timeToExit: ''
  });
  const [quizProgress, setQuizProgress] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [completedSections, setCompletedSections] = useState([]);

  const calculateWealthGap = () => {
    const current = parseFloat(calculatorData.currentAssets) || 0;
    const business = parseFloat(calculatorData.businessValue) || 0;
    const desired = parseFloat(calculatorData.desiredIncome) || 0;
    const years = parseFloat(calculatorData.timeToExit) || 0;
    
    const totalNeeded = desired * 25; // 4% withdrawal rate rule
    const totalAssets = current + business;
    const gap = Math.max(0, totalNeeded - totalAssets);
    
    return {
      totalNeeded,
      totalAssets,
      gap,
      adequacy: gap === 0 ? 'Sufficient' : 'Gap Exists',
      recommendation: gap === 0 
        ? 'Your projected assets should support your desired lifestyle.' 
        : `You may need an additional $${gap.toLocaleString()} in assets or business value improvement.`
    };
  };

  const interactiveQuiz = [
    {
      id: 1,
      category: 'Business Independence',
      question: 'How long could your business operate successfully without your daily involvement?',
      options: [
        { text: '6+ months without any issues', score: 4 },
        { text: '3-6 months with occasional check-ins', score: 3 },
        { text: '1-3 months with some challenges', score: 2 },
        { text: 'Less than 1 month before problems arise', score: 1 }
      ],
      explanation: 'Owner independence is crucial for business value. Buyers pay premiums for businesses that can operate without the current owner.'
    },
    {
      id: 2,
      category: 'Financial Performance',
      question: 'How would you rate the consistency of your business financial performance over the past 3 years?',
      options: [
        { text: 'Consistently growing revenue and profits', score: 4 },
        { text: 'Generally stable with minor fluctuations', score: 3 },
        { text: 'Some volatility but overall positive trend', score: 2 },
        { text: 'Significant ups and downs or declining', score: 1 }
      ],
      explanation: 'Consistent financial performance demonstrates business stability and predictability, which directly impacts valuation.'
    },
    {
      id: 3,
      category: 'Management Team',
      question: 'How capable is your management team of running daily operations without you?',
      options: [
        { text: 'Fully capable - they handle everything', score: 4 },
        { text: 'Very capable - minimal oversight needed', score: 3 },
        { text: 'Somewhat capable - regular guidance required', score: 2 },
        { text: 'Not capable - heavily dependent on my involvement', score: 1 }
      ],
      explanation: 'A strong management team reduces owner dependency and increases business value significantly.'
    },
    {
      id: 4,
      category: 'Customer Concentration',
      question: 'What percentage of your revenue comes from your top 5 customers?',
      options: [
        { text: 'Less than 25%', score: 4 },
        { text: '25-40%', score: 3 },
        { text: '40-60%', score: 2 },
        { text: 'More than 60%', score: 1 }
      ],
      explanation: 'Lower customer concentration reduces risk and makes your business more attractive to buyers.'
    },
    {
      id: 5,
      category: 'Growth Potential',
      question: 'How would you describe your business growth opportunities over the next 5 years?',
      options: [
        { text: 'Significant growth potential with clear strategies', score: 4 },
        { text: 'Moderate growth potential', score: 3 },
        { text: 'Limited growth potential', score: 2 },
        { text: 'Declining market or significant challenges', score: 1 }
      ],
      explanation: 'Growth potential is a key driver of business value and buyer interest.'
    }
  ];

  const getQuizScore = () => {
    return Object.values(quizAnswers).reduce((total, answer) => total + (answer?.score || 0), 0);
  };

  const getReadinessLevel = (score) => {
    if (score >= 16) return { level: 'Excellent', color: 'text-green-600 bg-green-50', description: 'Your business demonstrates strong exit readiness across all dimensions.' };
    if (score >= 12) return { level: 'Good', color: 'text-blue-600 bg-blue-50', description: 'Your business is well-positioned with some areas for improvement.' };
    if (score >= 8) return { level: 'Developing', color: 'text-yellow-600 bg-yellow-50', description: 'Several areas need attention to maximize exit value.' };
    return { level: 'Early Stage', color: 'text-red-600 bg-red-50', description: 'Significant preparation needed before considering an exit.' };
  };

  const guidedSteps = [
    {
      id: 'stakeholders',
      title: 'Step 1: Identify Your Stakeholders',
      description: 'Who will be affected by your exit decisions?',
      interactive: true,
      stakeholderTypes: ['Family Members', 'Key Employees', 'Business Partners', 'Major Customers', 'Vendors', 'Community']
    },
    {
      id: 'financial',
      title: 'Step 2: Calculate Your Wealth Gap', 
      description: 'Determine if your business value meets your financial needs',
      interactive: true,
      calculator: true
    },
    {
      id: 'business',
      title: 'Step 3: Assess Business Readiness',
      description: 'Evaluate your business independence and transferability',
      interactive: true,
      assessment: true
    },
    {
      id: 'personal',
      title: 'Step 4: Define Your Personal Vision',
      description: 'Plan your life and identity after the business',
      interactive: true,
      vision: true
    },
    {
      id: 'action',
      title: 'Step 5: Create Your Action Plan',
      description: 'Prioritize and schedule your exit preparation activities',
      interactive: true,
      planning: true
    }
  ];

  const renderCalculator = () => {
    const results = calculateWealthGap();
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-teal-600" />
            <span>Wealth Gap Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentIncome">Current Annual Income</Label>
                <Input
                  id="currentIncome"
                  type="number"
                  placeholder="150000"
                  value={calculatorData.currentIncome}
                  onChange={(e) => setCalculatorData(prev => ({ ...prev, currentIncome: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="desiredIncome">Desired Post-Exit Annual Income</Label>
                <Input
                  id="desiredIncome"
                  type="number"
                  placeholder="120000"
                  value={calculatorData.desiredIncome}
                  onChange={(e) => setCalculatorData(prev => ({ ...prev, desiredIncome: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="currentAssets">Current Personal Assets</Label>
                <Input
                  id="currentAssets"
                  type="number"
                  placeholder="500000"
                  value={calculatorData.currentAssets}
                  onChange={(e) => setCalculatorData(prev => ({ ...prev, currentAssets: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="businessValue">Estimated Business Value</Label>
                <Input
                  id="businessValue"
                  type="number"
                  placeholder="2000000"
                  value={calculatorData.businessValue}
                  onChange={(e) => setCalculatorData(prev => ({ ...prev, businessValue: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-teal-900">Wealth Gap Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Assets Needed for Desired Income:</span>
                  <span className="font-semibold">${results.totalNeeded.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Projected Assets:</span>
                  <span className="font-semibold">${results.totalAssets.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Wealth Gap:</span>
                  <span className={`font-bold ${results.gap > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {results.gap > 0 ? `-$${results.gap.toLocaleString()}` : 'Sufficient'}
                  </span>
                </div>
                <div className="bg-white rounded p-3 mt-4">
                  <p className="text-sm text-gray-700">{results.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
          
          {results.gap > 0 && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Strategies to Close the Gap:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Increase business value through operational improvements</li>
                  <li>• Extend timeline to allow for more business growth</li>
                  <li>• Consider seller financing or earn-out structures</li>
                  <li>• Reduce desired post-exit expenses</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderQuiz = () => {
    const currentQuestion = interactiveQuiz[quizProgress];
    const totalScore = getQuizScore();
    const maxScore = interactiveQuiz.length * 4;
    const isComplete = quizProgress >= interactiveQuiz.length;

    if (isComplete) {
      const readiness = getReadinessLevel(totalScore);
      
      return (
        <Card>
          <CardHeader>
            <CardTitle>Exit Readiness Assessment Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`${readiness.color} rounded-lg p-6 text-center`}>
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{readiness.level} Exit Readiness</h3>
              <p className="text-lg mb-2">Score: {totalScore} / {maxScore}</p>
              <p>{readiness.description}</p>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              {interactiveQuiz.map((q, index) => (
                <div key={q.id} className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm font-semibold">{quizAnswers[index]?.score || 0}</span>
                  </div>
                  <p className="text-xs text-gray-600">{q.category}</p>
                </div>
              ))}
            </div>

            <Card className="bg-teal-50 border-teal-200">
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold text-teal-900 mb-3">Next Steps Recommendation</h4>
                {totalScore >= 16 ? (
                  <p className="text-teal-700">
                    Your business shows excellent exit readiness. Consider scheduling a comprehensive exit planning consultation to formalize your strategy.
                  </p>
                ) : totalScore >= 12 ? (
                  <p className="text-teal-700">
                    Your business has good fundamentals. Focus on strengthening areas with lower scores to maximize exit value.
                  </p>
                ) : (
                  <p className="text-teal-700">
                    Significant preparation is needed. We recommend starting with our Business Value Enhancement Program to build exit readiness.
                  </p>
                )}
                <Button className="bg-teal-600 hover:bg-teal-700 mt-4">
                  Schedule Exit Planning Consultation
                </Button>
              </CardContent>
            </Card>

            <Button 
              variant="outline" 
              onClick={() => {
                setQuizProgress(0);
                setQuizAnswers({});
              }}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              <span>Interactive Exit Readiness Quiz</span>
            </div>
            <div className="text-sm text-gray-500">
              Question {quizProgress + 1} of {interactiveQuiz.length}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={(quizProgress / interactiveQuiz.length) * 100} />
          
          {currentQuestion && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentQuestion.category}
                </h3>
                <p className="text-gray-700">{currentQuestion.question}</p>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label 
                    key={index} 
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={index}
                      onChange={() => setQuizAnswers(prev => ({
                        ...prev,
                        [quizProgress]: option
                      }))}
                      className="text-teal-600"
                    />
                    <span className="text-gray-700">{option.text}</span>
                    <span className="ml-auto text-sm text-gray-500">({option.score} pts)</span>
                  </label>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <p className="text-sm text-blue-700">
                    <strong>Why this matters:</strong> {currentQuestion.explanation}
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setQuizProgress(Math.max(0, quizProgress - 1))}
                  disabled={quizProgress === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setQuizProgress(quizProgress + 1)}
                  disabled={!quizAnswers[quizProgress]}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {quizProgress === interactiveQuiz.length - 1 ? 'See Results' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderGuidedProcess = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>5-Step Exit Planning Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {guidedSteps.map((step, index) => {
                const isCompleted = completedSections.includes(step.id);
                const isActive = index === 0 || completedSections.includes(guidedSteps[index - 1].id);
                
                return (
                  <div key={step.id} className={`border rounded-lg p-6 ${isActive ? 'border-teal-200 bg-teal-50' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {isCompleted ? <CheckSquare className="w-5 h-5" /> : index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{step.title}</h3>
                          <p className="text-gray-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                      <Button
                        variant={isActive ? 'default' : 'outline'}
                        disabled={!isActive}
                        onClick={() => {
                          if (!isCompleted) {
                            setCompletedSections(prev => [...prev, step.id]);
                          }
                        }}
                        className={isActive ? 'bg-teal-600 hover:bg-teal-700' : ''}
                      >
                        {isCompleted ? 'Completed' : 'Start Step'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const faqData = [
    {
      question: "What makes KGOB's exit planning different?",
      answer: "Our structured 5-meeting process ensures comprehensive coverage of all exit planning dimensions - financial, business, and personal readiness. We combine CPA expertise with specialized exit planning knowledge."
    },
    {
      question: "How long does the exit planning process take?",
      answer: "The initial assessment typically takes 5-8 weeks with meetings scheduled bi-weekly. Implementation timelines vary but most successful exits require 3-5 years of preparation."
    },
    {
      question: "What if I'm not ready to exit for several years?",
      answer: "Perfect! Earlier planning leads to better outcomes. We'll help you identify value-building activities and create a timeline that maximizes your business value and personal readiness."
    },
    {
      question: "Do you help with business valuation?",
      answer: "Yes, business valuation is integrated into our exit planning process. We provide both preliminary estimates and formal valuations depending on your needs."
    },
    {
      question: "What about tax planning for the exit?",
      answer: "As CPAs, tax optimization is central to our exit planning approach. We structure transactions to minimize tax impact while achieving your financial goals."
    }
  ];

  const [expandedFAQ, setExpandedFAQ] = useState(null);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <Target className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl font-bold mb-4">Interactive Exit Planning Center</h1>
          <p className="text-xl opacity-90 mb-6">
            Guided tools and assessments to help you plan your successful business exit
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm opacity-80">Guided Steps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm opacity-80">Calculators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm opacity-80">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Process Guide</TabsTrigger>
          <TabsTrigger value="calculator">Calculators</TabsTrigger>
          <TabsTrigger value="quiz">Readiness Quiz</TabsTrigger>
          <TabsTrigger value="faq">Q&A</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderGuidedProcess()}
        </TabsContent>

        <TabsContent value="calculator">
          {renderCalculator()}
        </TabsContent>

        <TabsContent value="quiz">
          {renderQuiz()}
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Card key={index} className="cursor-pointer" onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{faq.question}</h3>
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`} />
                      </div>
                      {expandedFAQ === index && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact Section */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Exit Planning Journey?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Schedule a consultation with our expert team to discuss your specific situation and create a customized exit strategy.
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-3 mr-4">
            Schedule Free Consultation
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3">
            Download Complete Guide
          </Button>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400">
              Kohari Gonzalez CPAs & Advisors | San Antonio, Texas
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Certified Exit Planning Advisors | Licensed CPAs
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const guidedSteps = [
  {
    id: 'stakeholders',
    title: 'Step 1: Identify Your Stakeholders',
    description: 'Who will be affected by your exit decisions?',
    interactive: true
  },
  {
    id: 'financial',
    title: 'Step 2: Calculate Your Wealth Gap', 
    description: 'Determine if your business value meets your financial needs',
    interactive: true
  },
  {
    id: 'business',
    title: 'Step 3: Assess Business Readiness',
    description: 'Evaluate your business independence and transferability',
    interactive: true
  },
  {
    id: 'personal',
    title: 'Step 4: Define Your Personal Vision',
    description: 'Plan your life and identity after the business',
    interactive: true
  },
  {
    id: 'action',
    title: 'Step 5: Create Your Action Plan',
    description: 'Prioritize and schedule your exit preparation activities',
    interactive: true
  }
];

export default InteractiveExitPlanning;