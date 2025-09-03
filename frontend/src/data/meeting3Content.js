// KGOB Meeting #3: Business Readiness & Owner Centricity
// Interactive content based on ExpressWL 4.1 Management Succession tools

export const meeting3Content = {
  title: "Meeting #3: Business Readiness & Management Depth Assessment",
  description: "Evaluate your business's ability to operate successfully without your daily involvement",
  duration: "90 minutes", 
  objectives: [
    "Assess your business's dependence on your personal involvement",
    "Evaluate management team depth and capabilities",
    "Identify succession planning needs and gaps",
    "Create development plans for key personnel"
  ],

  // Owner Centricity Assessment (Interactive Web Version)
  ownerCentricityAssessment: {
    title: "Owner Centricity Assessment: How Dependent Is Your Business on You?",
    description: "Comprehensive evaluation of owner dependency across all business functions",
    categories: [
      {
        name: "Sales & Marketing",
        weight: 0.25,
        questions: [
          {
            id: "sales_relationships",
            question: "Who maintains the primary relationships with your top 10 customers?",
            options: [
              { text: "Dedicated sales team members", score: 4 },
              { text: "Mix of owner and sales team", score: 3 },
              { text: "Primarily the owner with some help", score: 2 },
              { text: "Almost entirely the owner", score: 1 }
            ]
          },
          {
            id: "sales_process",
            question: "How documented and systematized are your sales processes?",
            options: [
              { text: "Fully documented with clear procedures", score: 4 },
              { text: "Mostly documented with some gaps", score: 3 },
              { text: "Basic documentation, relies on experience", score: 2 },
              { text: "Mostly in the owner's head", score: 1 }
            ]
          },
          {
            id: "marketing_decisions",
            question: "Who makes marketing strategy and budget decisions?",
            options: [
              { text: "Marketing manager/team with clear authority", score: 4 },
              { text: "Marketing team with owner approval", score: 3 },
              { text: "Owner with marketing team input", score: 2 },
              { text: "Owner makes all marketing decisions", score: 1 }
            ]
          }
        ]
      },
      {
        name: "Operations & Production",
        weight: 0.25,
        questions: [
          {
            id: "daily_operations",
            question: "Who manages daily operations when you're away?",
            options: [
              { text: "Operations manager handles everything", score: 4 },
              { text: "Strong manager with occasional owner check-ins", score: 3 },
              { text: "Manager handles routine, owner handles problems", score: 2 },
              { text: "Operations suffer when owner is away", score: 1 }
            ]
          },
          {
            id: "quality_control",
            question: "How are quality standards maintained and monitored?",
            options: [
              { text: "Systematic quality management by team", score: 4 },
              { text: "Good systems with owner oversight", score: 3 },
              { text: "Basic systems, owner involvement required", score: 2 },
              { text: "Quality depends on owner presence", score: 1 }
            ]
          },
          {
            id: "vendor_relationships",
            question: "Who manages key vendor and supplier relationships?",
            options: [
              { text: "Purchasing manager with established relationships", score: 4 },
              { text: "Team manager with owner as backup", score: 3 },
              { text: "Owner primary, team member secondary", score: 2 },
              { text: "Owner maintains all key vendor relationships", score: 1 }
            ]
          }
        ]
      },
      {
        name: "Financial Management",
        weight: 0.2,
        questions: [
          {
            id: "financial_reporting",
            question: "Who prepares and analyzes your monthly financial reports?",
            options: [
              { text: "CFO/Controller produces comprehensive reports", score: 4 },
              { text: "Bookkeeper with owner review and analysis", score: 3 },
              { text: "Owner compiles and analyzes most reports", score: 2 },
              { text: "Owner handles most financial management", score: 1 }
            ]
          },
          {
            id: "cash_management",
            question: "Who makes decisions about cash management and investments?",
            options: [
              { text: "Financial manager with established guidelines", score: 4 },
              { text: "Team makes routine decisions, owner handles major ones", score: 3 },
              { text: "Owner makes most financial decisions", score: 2 },
              { text: "All financial decisions require owner approval", score: 1 }
            ]
          }
        ]
      },
      {
        name: "Strategic Decision Making",
        weight: 0.3,
        questions: [
          {
            id: "strategic_planning",
            question: "Who participates in strategic planning and major decisions?",
            options: [
              { text: "Strong management team leads strategic planning", score: 4 },
              { text: "Management team participates, owner guides", score: 3 },
              { text: "Owner leads with some management input", score: 2 },
              { text: "Owner makes all strategic decisions alone", score: 1 }
            ]
          },
          {
            id: "problem_solving",
            question: "When major problems arise, who typically solves them?",
            options: [
              { text: "Management team resolves most issues independently", score: 4 },
              { text: "Management handles routine, escalates complex issues", score: 3 },
              { text: "Owner involved in most problem resolution", score: 2 },
              { text: "All problems come directly to owner", score: 1 }
            ]
          },
          {
            id: "external_relationships",
            question: "Who manages relationships with banks, lawyers, accountants?",
            options: [
              { text: "Designated team members manage each relationship", score: 4 },
              { text: "Team members involved, owner maintains primary contact", score: 3 },
              { text: "Owner primary contact with team support", score: 2 },
              { text: "Owner maintains all external professional relationships", score: 1 }
            ]
          }
        ]
      }
    ],
    scoring: {
      excellent: { min: 85, max: 100, description: "Your business demonstrates excellent independence from owner involvement. This significantly enhances business value." },
      good: { min: 70, max: 84, description: "Good management systems with some areas for improvement. Moderate impact on business value." },
      developing: { min: 55, max: 69, description: "Significant owner dependency that should be addressed before exit. May impact valuation." },
      concerning: { min: 0, max: 54, description: "High owner dependency that will significantly impact business value and exit options." }
    }
  },

  // Management Succession Planning Tool
  managementSuccession: {
    title: "Management Succession Planning & Development",
    description: "Identify, develop, and prepare key employees for increased responsibilities",
    keyPositions: [
      {
        role: "General Manager/CEO",
        responsibilities: ["Overall business strategy", "Major decision making", "External relationships", "Team leadership"],
        currentHolder: "",
        potentialSuccessors: [],
        developmentNeeds: [],
        timelineToReady: ""
      },
      {
        role: "Sales Manager", 
        responsibilities: ["Customer relationships", "Sales strategy", "Team management", "Revenue growth"],
        currentHolder: "",
        potentialSuccessors: [],
        developmentNeeds: [],
        timelineToReady: ""
      },
      {
        role: "Operations Manager",
        responsibilities: ["Daily operations", "Quality control", "Process improvement", "Vendor management"],
        currentHolder: "",
        potentialSuccessors: [],
        developmentNeeds: [],
        timelineToReady: ""
      },
      {
        role: "Financial Manager",
        responsibilities: ["Financial reporting", "Cash management", "Budgeting", "Banking relationships"],
        currentHolder: "",
        potentialSuccessors: [],
        developmentNeeds: [],
        timelineToReady: ""
      }
    ]
  },

  // Business Readiness Scorecard
  businessReadinessQuiz: [
    {
      id: 1,
      question: "How many weeks could your business operate successfully without your involvement?",
      options: [
        { text: "12+ weeks without issues", score: 4 },
        { text: "6-12 weeks with minor issues", score: 3 },
        { text: "2-6 weeks before problems", score: 2 },
        { text: "Less than 2 weeks", score: 1 }
      ],
      explanation: "Businesses that can operate independently command higher valuations and have more exit options.",
      category: "Owner Independence"
    },
    {
      id: 2,
      question: "What percentage of your revenue comes from customers you personally manage?",
      options: [
        { text: "Less than 25%", score: 4 },
        { text: "25-50%", score: 3 },
        { text: "50-75%", score: 2 },
        { text: "More than 75%", score: 1 }
      ],
      explanation: "Lower owner dependency in customer relationships reduces business risk and increases transferability.",
      category: "Customer Relationships"
    },
    {
      id: 3,
      question: "How would you rate your management team's decision-making capabilities?",
      options: [
        { text: "Makes excellent decisions independently", score: 4 },
        { text: "Makes good decisions with minimal guidance", score: 3 },
        { text: "Needs regular guidance but capable", score: 2 },
        { text: "Requires constant supervision", score: 1 }
      ],
      explanation: "Strong management decision-making capabilities are essential for business continuity and value.",
      category: "Management Capability"
    }
  ],

  // Value Enhancement Opportunities 
  valueEnhancement: {
    title: "Business Value Enhancement Opportunities",
    description: "Specific actions to reduce owner dependency and increase business value",
    strategies: [
      {
        category: "Management Development",
        opportunities: [
          {
            action: "Hire or promote a General Manager/COO",
            impact: "High",
            timeline: "6-12 months",
            valueIncrease: "15-25%",
            description: "Reduces owner dependency in daily operations"
          },
          {
            action: "Implement management team training program",
            impact: "Medium",
            timeline: "3-6 months", 
            valueIncrease: "5-10%",
            description: "Increases management capability and confidence"
          },
          {
            action: "Create succession plans for key positions",
            impact: "Medium",
            timeline: "2-4 months",
            valueIncrease: "5-10%", 
            description: "Demonstrates business continuity planning"
          }
        ]
      },
      {
        category: "Systems & Processes",
        opportunities: [
          {
            action: "Document all critical business processes",
            impact: "Medium",
            timeline: "3-6 months",
            valueIncrease: "10-15%",
            description: "Reduces key person risk and enables scaling"
          },
          {
            action: "Implement management reporting dashboard",
            impact: "Medium", 
            timeline: "2-3 months",
            valueIncrease: "5-10%",
            description: "Shows professional management and control systems"
          }
        ]
      },
      {
        category: "Customer Relationships",
        opportunities: [
          {
            action: "Transfer key customer relationships to team",
            impact: "High",
            timeline: "6-12 months",
            valueIncrease: "10-20%",
            description: "Reduces customer concentration risk"
          },
          {
            action: "Implement customer relationship management system",
            impact: "Medium",
            timeline: "2-4 months", 
            valueIncrease: "5-10%",
            description: "Systematizes customer management and reduces dependency"
          }
        ]
      }
    ]
  }
};