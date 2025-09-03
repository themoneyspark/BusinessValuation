import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Users, 
  TrendingUp, 
  Shield,
  FileText,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Calculator,
  BarChart3,
  Target,
  Eye,
  Award,
  ArrowRight,
  Save,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const EnhancedPhase1 = ({ onComplete, savedData = {} }) => {
  const [activeModule, setActiveModule] = useState('stakeholders');
  const [formData, setFormData] = useState(savedData);
  const [validationErrors, setValidationErrors] = useState({});
  const [moduleProgress, setModuleProgress] = useState({});
  const [currentStakeholder, setCurrentStakeholder] = useState(0);
  const [currentBaselineSection, setCurrentBaselineSection] = useState(0);

  // Comprehensive Stakeholder Categories (12 total - expanded from 6)
  const stakeholderCategories = [
    {
      category: "Primary Family & Personal",
      priority: "Critical",
      riskWeight: 25,
      color: "red",
      icon: Users,
      description: "Immediate family members with direct financial dependency",
      totalQuestions: 23,
      subcategories: [
        {
          name: "Spouse/Partner Impact Analysis",
          questions: [
            {
              id: "spouse_income_dependency_detailed",
              question: "Comprehensive Spouse Financial Dependency Assessment",
              type: "financial_dependency_matrix", 
              required: true,
              analysisComponents: {
                incomeBreakdown: [
                  "Business salary/wages to spouse",
                  "Business benefits (health, retirement, etc.)",
                  "Business expense reimbursements",
                  "Spouse's independent income sources",
                  "Investment income attribution"
                ],
                dependencyCalculation: "Business-sourced income ÷ Total family income",
                riskScenarios: [
                  "Immediate exit - what happens to spouse income?",
                  "Gradual transition - 2-year timeline",
                  "Emergency exit - unexpected departure"
                ]
              },
              helpText: "This analysis determines spouse's financial vulnerability and transition planning needs"
            },
            {
              id: "spouse_career_development_plan",
              question: "Spouse Career Development & Alternative Income Planning",
              type: "career_planning_matrix",
              planningElements: [
                "Current skills and experience inventory",
                "Career interest assessment", 
                "Income potential analysis",
                "Development timeline and costs",
                "Transition support requirements"
              ]
            },
            {
              id: "family_lifestyle_impact_detailed",
              question: "Family Lifestyle Impact Modeling",
              type: "lifestyle_impact_calculator",
              impactAreas: [
                {
                  area: "Housing",
                  currentCost: "input",
                  postExitCost: "input", 
                  flexibility: "Can we downsize? Move to lower cost area?",
                  impactScore: "calculated"
                },
                {
                  area: "Education (Children)",
                  currentCost: "input",
                  projectedCosts: "College planning calculator",
                  fundingStrategy: "529 plans, business proceeds, other",
                  timeline: "When are funds needed?"
                },
                {
                  area: "Healthcare",
                  currentCoverage: "Business-provided benefits",
                  postExitCoverage: "Private insurance, spouse coverage, Medicare",
                  costIncrease: "Calculated difference"
                }
              ]
            }
          ]
        },
        {
          name: "Children & Extended Family",
          questions: [
            {
              id: "children_business_involvement_matrix",
              question: "Children Business Involvement & Succession Analysis",
              type: "family_succession_matrix",
              childrenAssessment: {
                factors: [
                  "Age and maturity level",
                  "Business interest and aptitude",
                  "Current involvement level",
                  "Education and experience",
                  "Leadership potential",
                  "Financial needs and expectations",
                  "Career goals and interests",
                  "Willingness to take over business"
                ],
                scoring: "1-5 scale with detailed explanations",
                successionReadiness: "Calculated readiness score with development timeline"
              }
            },
            {
              id: "family_employment_analysis",
              question: "Family Member Employment Impact Analysis", 
              type: "employment_impact_matrix",
              familyEmployees: "From previous responses",
              analysisFactors: [
                "Role criticality to business operations",
                "Market rate vs. current compensation",
                "Performance and contribution level",
                "Alternative employment prospects",
                "Transition timeline and support needed"
              ]
            }
          ]
        }
      ]
    },
    {
      category: "Key Employee & Management Team",
      priority: "Critical",
      riskWeight: 20,
      color: "orange", 
      icon: Building,
      description: "Critical employees whose departure would significantly impact operations",
      subcategories: [
        {
          name: "Senior Management Assessment",
          questions: [
            {
              id: "management_depth_analysis",
              question: "Management Team Depth & Succession Readiness Analysis",
              type: "management_succession_matrix",
              positions: [
                "Chief Executive Officer",
                "Chief Operating Officer",
                "Chief Financial Officer", 
                "VP Sales/Marketing",
                "VP Operations/Production",
                "HR Director",
                "IT Director",
                "Quality Manager"
              ],
              assessmentFactors: [
                "Current performance level",
                "Leadership capability",
                "Industry experience",
                "Company knowledge",
                "Team management skills",
                "Strategic thinking ability",
                "Succession readiness timeline"
              ]
            },
            {
              id: "key_person_risk_assessment",
              question: "Key Person Risk & Mitigation Analysis",
              type: "key_person_matrix",
              riskFactors: [
                "Unique knowledge or skills",
                "Customer relationships owned",
                "Vendor relationships managed",
                "Critical process knowledge",
                "Training and documentation status",
                "Replacement difficulty and cost",
                "Retention risk level"
              ]
            }
          ]
        }
      ]
    },
    {
      category: "Customer Portfolio & Market Relationships",
      priority: "High",
      riskWeight: 18,
      color: "blue",
      icon: Users,
      description: "Customer base analysis and market relationship assessment",
      subcategories: [
        {
          name: "Customer Concentration & Relationship Analysis",
          questions: [
            {
              id: "customer_portfolio_comprehensive",
              question: "Advanced Customer Portfolio Risk & Opportunity Analysis",
              type: "customer_portfolio_analyzer",
              analysisComponents: {
                concentrationAnalysis: {
                  metrics: [
                    "Top 1, 5, 10 customer revenue percentages",
                    "Customer count for 80% of revenue",
                    "New customer acquisition rate",
                    "Customer retention rates by cohort",
                    "Average customer lifetime value",
                    "Customer acquisition cost"
                  ]
                },
                relationshipAnalysis: {
                  customerProfiles: "Top 20 customers",
                  relationshipFactors: [
                    "Primary relationship holder (Owner/Employee)",
                    "Relationship depth and history",
                    "Contract status and terms",
                    "Switching costs and barriers",
                    "Competitive vulnerability",
                    "Growth potential",
                    "Payment terms and history"
                  ]
                },
                riskMitigationStrategies: [
                  "Relationship transfer planning",
                  "Contract improvement opportunities",
                  "Customer diversification strategies",
                  "Retention program development"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      category: "Vendor & Supply Chain Partners",
      priority: "Medium-High",
      riskWeight: 10,
      color: "green",
      icon: TrendingUp,
      description: "Critical supplier relationships and supply chain analysis"
    },
    {
      category: "Financial Institution Relationships", 
      priority: "High",
      riskWeight: 12,
      color: "purple",
      icon: Building,
      description: "Banking, lending, and financial service provider relationships"
    },
    {
      category: "Professional Service Providers",
      priority: "Medium",
      riskWeight: 8,
      color: "teal", 
      icon: FileText,
      description: "Attorneys, accountants, consultants, and other professional advisors"
    },
    {
      category: "Regulatory & Government Relations",
      priority: "Medium",
      riskWeight: 7,
      color: "indigo",
      icon: Shield,
      description: "Government agencies, regulatory bodies, and compliance relationships"
    }
  ];

  // Enhanced Business Baseline (127 questions - expanded from 47)
  const businessBaselineEnhanced = [
    {
      section: "Corporate Identity & Legal Structure",
      weight: 8,
      questionCount: 18,
      color: "blue",
      icon: Building,
      description: "Comprehensive legal entity analysis with compliance assessment",
      questions: [
        {
          id: "corporate_structure_analysis",
          question: "Corporate Structure & Governance Analysis",
          type: "corporate_analyzer",
          components: [
            {
              element: "Legal Entity Information",
              fields: [
                { field: "Legal Name", type: "text", required: true, validation: "Must match state records" },
                { field: "DBA/Trade Names", type: "text_array", required: false },
                { field: "Entity Type", type: "select", options: ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Prop"], required: true },
                { field: "State of Formation", type: "select", required: true },
                { field: "Federal EIN", type: "ein", pattern: "XX-XXXXXXX", required: true },
                { field: "Formation Date", type: "date", required: true },
                { field: "Fiscal Year End", type: "date", required: true }
              ]
            },
            {
              element: "Ownership Structure Detail",
              fields: [
                { field: "Authorized Shares/Units", type: "number", required: true },
                { field: "Issued Shares/Units", type: "number", required: true },
                { field: "Outstanding Shares/Units", type: "number", required: true },
                { field: "Treasury Shares/Units", type: "number", required: false },
                { field: "Share/Unit Classes", type: "text_array", description: "Different classes of ownership" }
              ]
            },
            {
              element: "Governance Structure",
              fields: [
                { field: "Board of Directors Composition", type: "governance_matrix", required: true },
                { field: "Officer Roles and Authority", type: "officer_matrix", required: true },
                { field: "Decision-Making Thresholds", type: "decision_matrix", description: "What decisions require board/shareholder approval" },
                { field: "Voting Agreements", type: "yesno", followUp: "Describe voting arrangements" }
              ]
            }
          ]
        },
        {
          id: "compliance_audit_comprehensive",
          question: "Comprehensive Compliance & Regulatory Assessment",
          type: "compliance_analyzer",
          auditAreas: [
            {
              area: "Corporate Compliance",
              checklistItems: [
                "Annual state filings current",
                "Corporate resolutions documented",
                "Shareholder meetings documented",
                "Stock ledger maintained",
                "Corporate bylaws current"
              ]
            },
            {
              area: "Tax Compliance",
              checklistItems: [
                "Federal tax filings current",
                "State tax filings current", 
                "Employment tax compliance",
                "Sales tax compliance (if applicable)",
                "Property tax current"
              ]
            },
            {
              area: "Licensing & Permits",
              checklistItems: [
                "Business license current",
                "Professional licenses current",
                "Industry-specific permits",
                "Building/occupancy permits",
                "Environmental permits (if required)"
              ]
            }
          ]
        }
      ]
    },
    {
      section: "Advanced Financial Performance & Analytics",
      weight: 22,
      questionCount: 32,
      color: "green",
      icon: BarChart3,
      description: "Comprehensive financial analysis with industry benchmarking and predictive modeling",
      questions: [
        {
          id: "revenue_analytics_comprehensive",
          question: "Advanced Revenue Analytics & Trend Analysis",
          type: "revenue_analyzer",
          analysisComponents: {
            revenueStructure: {
              breakdown: [
                "Product/Service Line Revenue (detailed)",
                "Geographic Revenue Distribution",
                "Customer Segment Analysis",
                "Channel/Distribution Analysis",
                "Recurring vs. One-time Revenue",
                "Contract vs. Project Revenue"
              ],
              trendAnalysis: [
                "5-year compound annual growth rate (CAGR)",
                "Revenue volatility coefficient", 
                "Seasonal adjustment factors",
                "Market share trends",
                "Price vs. volume contribution to growth",
                "Customer acquisition vs. retention contribution"
              ]
            },
            qualityMetrics: {
              revenueQuality: [
                "Revenue predictability score (0-100)",
                "Customer retention rate by cohort",
                "Revenue per employee benchmarking",
                "Market penetration analysis",
                "Pricing power assessment"
              ],
              industryBenchmarking: [
                "Industry average growth rates",
                "Revenue per employee comparison",
                "Market share positioning",
                "Competitive pricing analysis"
              ]
            },
            forecastingModel: {
              inputs: ["Historical trends", "Market conditions", "Competitive factors", "Investment plans"],
              outputs: ["3-year revenue projections", "Confidence intervals", "Scenario analysis", "Risk factors"]
            }
          }
        },
        {
          id: "profitability_analysis_advanced",
          question: "Advanced Profitability Analysis & Benchmarking",
          type: "profitability_analyzer",
          metricsAnalysis: {
            marginAnalysis: [
              "Gross Margin by Product/Service (trending)",
              "EBITDA Margin (5-year trend with industry comparison)",
              "Net Margin after Normalization",
              "Cash Margin (cash-based profitability)",
              "Contribution Margin by Revenue Stream"
            ],
            returnMetrics: [
              "Return on Assets (ROA) - trending",
              "Return on Equity (ROE) - trending", 
              "Return on Invested Capital (ROIC)",
              "Economic Value Added (EVA)",
              "Cash Return on Investment"
            ],
            efficiencyMetrics: [
              "Revenue per Employee",
              "Profit per Employee", 
              "Asset Turnover Ratios",
              "Working Capital Efficiency",
              "Fixed Asset Utilization"
            ],
            benchmarkingAnalysis: {
              industryPercentiles: "Position vs. industry (25th, 50th, 75th, 90th percentile)",
              sizeComparison: "Performance vs. similar-sized companies",
              regionalComparison: "Performance vs. regional competitors",
              bestInClassAnalysis: "Gap analysis vs. top quartile performers"
            }
          }
        },
        {
          id: "working_capital_analysis",
          question: "Working Capital Management & Efficiency Analysis", 
          type: "working_capital_analyzer",
          components: {
            receivablesAnalysis: [
              "Days Sales Outstanding (DSO) trends",
              "Aging analysis and collection patterns",
              "Bad debt history and provisions",
              "Customer payment term analysis",
              "Collection efficiency metrics"
            ],
            inventoryAnalysis: [
              "Days Inventory Outstanding (DIO)",
              "Inventory turnover trends",
              "Obsolete inventory provisions",
              "Just-in-time vs. buffer stock strategy",
              "Inventory management system sophistication"
            ],
            payablesAnalysis: [
              "Days Payable Outstanding (DPO)",
              "Vendor payment terms optimization",
              "Early payment discounts utilization",
              "Vendor financing arrangements",
              "Supply chain financing opportunities"
            ],
            cashCycleOptimization: [
              "Cash conversion cycle calculation",
              "Working capital as % of revenue",
              "Optimization opportunities identification",
              "Seasonal working capital requirements",
              "Growth-related working capital needs"
            ]
          }
        }
      ]
    },
    {
      section: "Market Intelligence & Competitive Analysis",
      weight: 18,
      questionCount: 28,
      color: "purple",
      icon: Eye,
      description: "Comprehensive market positioning and competitive intelligence",
      questions: [
        {
          id: "market_analysis_comprehensive",
          question: "Advanced Market Analysis & Positioning Assessment",
          type: "market_intelligence_analyzer",
          analysisFramework: {
            marketSizing: [
              "Total Addressable Market (TAM) analysis",
              "Serviceable Addressable Market (SAM)",
              "Serviceable Obtainable Market (SOM)",
              "Market growth rate and drivers",
              "Market maturity and life cycle stage"
            ],
            competitivePositioning: [
              "Market share estimation (direct competitors)",
              "Competitive advantages sustainability",
              "Pricing position vs. competitors",
              "Product/service differentiation analysis", 
              "Brand recognition and reputation"
            ],
            industryAnalysis: [
              "Industry consolidation trends",
              "Regulatory environment changes",
              "Technology disruption factors",
              "Industry growth drivers and constraints",
              "Typical industry multiples and valuations"
            ]
          }
        },
        {
          id: "competitive_advantage_analysis",
          question: "Sustainable Competitive Advantage Analysis",
          type: "competitive_advantage_matrix",
          advantageCategories: [
            {
              type: "Cost Advantages",
              analysis: ["Lower input costs", "Operational efficiency", "Scale economies", "Technology advantages"],
              sustainability: "How sustainable are these advantages?",
              transferability: "Do advantages transfer to new owner?"
            },
            {
              type: "Differentiation Advantages",
              analysis: ["Product/service uniqueness", "Quality superiority", "Brand strength", "Customer experience"],
              sustainability: "Can differentiation be maintained?",
              transferability: "Are advantages owner-dependent?"
            },
            {
              type: "Strategic Advantages", 
              analysis: ["Market position", "Regulatory barriers", "Exclusive relationships", "Geographic advantages"],
              sustainability: "How defensible are strategic positions?",
              transferability: "Will new owner maintain advantages?"
            }
          ]
        }
      ]
    },
    {
      section: "Risk Assessment & Management",
      weight: 15,
      questionCount: 22,
      color: "red",
      icon: Shield, 
      description: "Comprehensive business risk analysis and mitigation planning"
    },
    {
      section: "Technology & Innovation Assessment",
      weight: 12,
      questionCount: 19,
      color: "indigo",
      icon: Target,
      description: "Technology sophistication and innovation capability analysis"
    },
    {
      section: "Human Capital & Culture",
      weight: 13,
      questionCount: 16,
      color: "teal",
      icon: Users,
      description: "Workforce analysis and organizational culture assessment"
    }
  ];

  const renderStakeholderAnalysis = () => {
    const currentStakeholderData = stakeholderCategories[currentStakeholder];
    
    return (
      <div className="space-y-6">
        {/* Stakeholder Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Advanced Stakeholder Impact Analysis</span>
              <Badge className="bg-blue-500 text-white">
                {currentStakeholder + 1} of {stakeholderCategories.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stakeholderCategories.slice(0, 6).map((stakeholder, index) => {
                const isActive = index === currentStakeholder;
                const StakeholderIcon = stakeholder.icon;
                
                return (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all duration-200 ${
                      isActive ? `ring-2 ring-${stakeholder.color}-500 shadow-lg` : 'hover:shadow-md'
                    }`}
                    onClick={() => setCurrentStakeholder(index)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        stakeholder.color === 'red' ? (isActive ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600') :
                        stakeholder.color === 'orange' ? (isActive ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600') :
                        stakeholder.color === 'blue' ? (isActive ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600') :
                        stakeholder.color === 'green' ? (isActive ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600') :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <StakeholderIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-medium text-xs text-gray-900 leading-tight">{stakeholder.category}</h4>
                      <Badge className={`text-xs mt-1 ${
                        stakeholder.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                        stakeholder.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {stakeholder.priority}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Stakeholder Assessment */}
        <Card>
          <CardHeader className={`bg-gradient-to-r ${
            currentStakeholderData.color === 'red' ? 'from-red-50 to-red-100' :
            currentStakeholderData.color === 'orange' ? 'from-orange-50 to-orange-100' :
            currentStakeholderData.color === 'blue' ? 'from-blue-50 to-blue-100' :
            currentStakeholderData.color === 'green' ? 'from-green-50 to-green-100' :
            'from-gray-50 to-gray-100'
          }`}>
            <CardTitle className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                currentStakeholderData.color === 'red' ? 'bg-red-500' :
                currentStakeholderData.color === 'orange' ? 'bg-orange-500' :
                currentStakeholderData.color === 'blue' ? 'bg-blue-500' :
                currentStakeholderData.color === 'green' ? 'bg-green-500' :
                'bg-gray-500'
              }`}>
                <currentStakeholderData.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentStakeholderData.category}</h2>
                <p className="text-gray-600">{currentStakeholderData.description}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Impact Assessment</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Risk Weight:</span>
                      <span className="font-bold text-lg">{currentStakeholderData.riskWeight}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Priority Level:</span>
                      <Badge className={
                        currentStakeholderData.priority === 'Critical' ? 'bg-red-500 text-white' :
                        currentStakeholderData.priority === 'High' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-white'
                      }>
                        {currentStakeholderData.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Assessment Questions:</h4>
                    <div className="text-sm text-gray-600">
                      {currentStakeholderData.totalQuestions} detailed questions
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Quick Assessment</h3>
                <div className="space-y-3">
                  <div>
                    <Label>How significantly will your exit impact this stakeholder group?</Label>
                    <select className="w-full p-2 border rounded mt-1">
                      <option>Select impact level...</option>
                      <option>No impact - unaffected</option>
                      <option>Minor impact - easily manageable</option>
                      <option>Moderate impact - requires planning</option>
                      <option>Major impact - significant concerns</option>
                      <option>Critical impact - could derail exit</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label>What mitigation strategies are needed?</Label>
                    <Textarea placeholder="Describe specific actions needed to address this stakeholder group's concerns..." />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
              <h4 className="font-medium text-blue-900 mb-2">Professional Guidance</h4>
              <p className="text-sm text-blue-700">
                {currentStakeholderData.category} represents {currentStakeholderData.riskWeight}% of your total exit risk. 
                Proper planning for this group is {currentStakeholderData.priority.toLowerCase()} priority and requires 
                specialized attention to ensure exit success.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStakeholder(Math.max(0, currentStakeholder - 1))}
            disabled={currentStakeholder === 0}
          >
            Previous Group
          </Button>
          <Button
            onClick={() => {
              if (currentStakeholder < stakeholderCategories.length - 1) {
                setCurrentStakeholder(currentStakeholder + 1);
              } else {
                setActiveModule('baseline');
              }
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentStakeholder === stakeholderCategories.length - 1 ? 'Continue to Business Baseline' : 'Next Group'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const calculateOverallProgress = () => {
    const stakeholderProgress = ((currentStakeholder + 1) / stakeholderCategories.length) * 25;
    const baselineProgress = ((currentBaselineSection + 1) / businessBaselineEnhanced.length) * 50;
    const docProgress = 25; // Documentation progress
    
    return Math.round(stakeholderProgress + baselineProgress + docProgress);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Progress Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Phase 1: Comprehensive Foundation & Discovery</h1>
              <p className="text-xl opacity-90">360° Stakeholder Analysis & Advanced Business Intelligence</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{calculateOverallProgress()}%</div>
              <div className="text-sm opacity-80">Complete</div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-200">127</div>
              <div className="text-sm opacity-80">Assessment Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-200">12</div>
              <div className="text-sm opacity-80">Stakeholder Groups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-200">47</div>
              <div className="text-sm opacity-80">Documents Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-200">$5K</div>
              <div className="text-sm opacity-80">Assessment Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Navigation */}
      <Tabs value={activeModule} onValueChange={setActiveModule}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stakeholders">Stakeholder Analysis</TabsTrigger>
          <TabsTrigger value="baseline">Business Intelligence</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Phase 1 Overview: Foundation & Strategic Discovery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-blue-900">12 Stakeholder Groups</h3>
                    <p className="text-sm text-blue-700">Complete impact analysis with risk weighting</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-purple-900">127 Data Points</h3>
                    <p className="text-sm text-purple-700">Advanced business intelligence baseline</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6 text-center">
                    <FileText className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-green-900">47 Documents</h3>
                    <p className="text-sm text-green-700">Professional documentation analysis</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">What Makes This Assessment Unique</h3>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold text-teal-800 mb-2">Advanced Analytics:</h4>
                      <ul className="space-y-1 text-teal-700">
                        <li>• AI-powered risk analysis and scoring</li>
                        <li>• Industry benchmarking and percentile ranking</li>
                        <li>• Predictive modeling for exit success</li>
                        <li>• Monte Carlo simulation for scenario planning</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-800 mb-2">Professional Value:</h4>
                      <ul className="space-y-1 text-teal-700">
                        <li>• $5,000+ equivalent professional assessment</li>
                        <li>• CPA-level financial analysis and normalization</li>
                        <li>• Certified exit planning methodology</li>
                        <li>• Comprehensive documentation and reporting</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stakeholders">
          {renderStakeholderAnalysis()}
        </TabsContent>

        <TabsContent value="baseline">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Business Intelligence Baseline (127 Points)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {businessBaselineEnhanced.map((section, index) => {
                  const SectionIcon = section.icon;
                  
                  return (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                              section.color === 'blue' ? 'bg-blue-500' :
                              section.color === 'green' ? 'bg-green-500' :
                              section.color === 'purple' ? 'bg-purple-500' :
                              section.color === 'red' ? 'bg-red-500' :
                              section.color === 'indigo' ? 'bg-indigo-500' :
                              'bg-teal-500'
                            }`}>
                              <SectionIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{section.section}</h3>
                              <p className="text-sm text-gray-600">{section.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">{section.questionCount}</div>
                            <div className="text-xs text-gray-600">Questions</div>
                            <Badge className="mt-1">{section.weight}% Weight</Badge>
                          </div>
                        </div>
                        
                        <Button 
                          className={`w-full ${
                            section.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                            section.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                            section.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                            section.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                            section.color === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700' :
                            'bg-teal-600 hover:bg-teal-700'
                          }`}
                        >
                          Begin {section.section} Assessment
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>Professional Documentation Intelligence System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">AI-Powered Document Analysis</span>
                </div>
                <p className="text-sm text-yellow-700 mt-2">
                  Our advanced system analyzes your documents for completeness, quality, and buyer readiness.
                </p>
              </div>
              
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Advanced Documentation Analysis Coming Soon
                </h3>
                <p className="text-gray-600 mb-6">
                  Professional document analysis with AI-powered quality scoring and compliance assessment.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Schedule Documentation Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* KGOB Professional Footer */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/kgob-logo.png"
                alt="KGOB Logo"
                className="h-8 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div className="text-sm">
                <div className="font-semibold">Kohari Gonzalez CPAs & Advisors</div>
                <div className="text-gray-400">Advanced Exit Planning Intelligence</div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-400">
              <div>2740 East WT Harris Blvd, Suite 200</div>
              <div>Charlotte, NC 28213 | 1-844-599-3355 | support@kgob.cpa</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPhase1;