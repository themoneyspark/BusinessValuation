// KGOB Meeting #2: Financial Readiness & Wealth Gap Analysis
// Interactive content based on ExpressWL 4.1 Excel tools

export const meeting2Content = {
  title: "Meeting #2: Financial Readiness & Wealth Gap Analysis", 
  description: "Analyze your financial position and determine what you need from your business exit",
  duration: "90 minutes",
  objectives: [
    "Calculate your true discretionary cash flow",
    "Determine your wealth gap between current assets and needed proceeds",
    "Understand how lenders evaluate your business", 
    "Model different exit scenarios and their financial impact"
  ],

  // Cash Flow Normalization Calculator (from Excel tool)
  cashFlowCalculator: {
    title: "Discretionary Cash Flow Normalization Calculator",
    description: "Calculate your business's true cash generation capability by adjusting for owner-specific expenses",
    inputs: [
      {
        category: "Base Financial Information",
        fields: [
          {
            id: "net_income",
            label: "Net Income (from tax return)",
            type: "currency",
            required: true,
            helpText: "Use bottom line net income from most recent tax return"
          },
          {
            id: "depreciation",
            label: "Depreciation & Amortization",
            type: "currency", 
            required: true,
            helpText: "Add back non-cash depreciation and amortization expenses"
          },
          {
            id: "interest_expense",
            label: "Interest Expense", 
            type: "currency",
            required: true,
            helpText: "Interest expense that may not transfer to new owner"
          }
        ]
      },
      {
        category: "Owner-Specific Adjustments",
        fields: [
          {
            id: "owner_excess_salary",
            label: "Excess Owner Compensation",
            type: "currency",
            required: false,
            helpText: "Amount above market rate for your position (will increase cash flow)"
          },
          {
            id: "personal_expenses",
            label: "Personal Expenses Through Business",
            type: "currency", 
            required: false,
            helpText: "Personal expenses paid by business (cars, meals, travel, etc.)"
          },
          {
            id: "family_payroll",
            label: "Excess Family Member Payroll",
            type: "currency",
            required: false,
            helpText: "Above-market compensation for family members"
          },
          {
            id: "discretionary_expenses",
            label: "Other Discretionary Expenses",
            type: "currency",
            required: false,
            helpText: "Non-essential business expenses that could be eliminated"
          }
        ]
      },
      {
        category: "Replacement Costs",
        fields: [
          {
            id: "replacement_management",
            label: "Cost to Replace Owner/Management",
            type: "currency",
            required: false,
            helpText: "Market-rate salary to replace your functions"
          },
          {
            id: "additional_benefits",
            label: "Additional Employee Benefits",
            type: "currency",
            required: false,
            helpText: "Benefits new owner might need to provide"
          }
        ]
      }
    ],
    calculations: {
      adjustedCashFlow: "Net Income + Depreciation + Interest + Owner Adjustments - Replacement Costs",
      cashFlowMultiple: "Adjusted Cash Flow × Industry Multiple",
      qualityScore: "Based on consistency, growth trends, and risk factors"
    }
  },

  // Seller's Sanity Check Calculator  
  sellersCheck: {
    title: "Seller's Sanity Check: Can You Afford to Exit?",
    description: "Determine if your business value will support your post-exit lifestyle goals",
    personalFinancials: [
      {
        id: "current_salary",
        label: "Current Salary/Distributions from Business",
        type: "currency",
        required: true
      },
      {
        id: "spouse_income",
        label: "Spouse's Income (if applicable)",
        type: "currency", 
        required: false
      },
      {
        id: "current_expenses",
        label: "Current Annual Living Expenses",
        type: "currency",
        required: true,
        helpText: "Total personal/family expenses per year"
      },
      {
        id: "desired_retirement_income", 
        label: "Desired Post-Exit Annual Income",
        type: "currency",
        required: true,
        helpText: "What you want to live on after exiting"
      },
      {
        id: "retirement_assets",
        label: "Current Retirement Assets",
        type: "currency",
        required: true,
        helpText: "401k, IRAs, other retirement savings"
      },
      {
        id: "other_assets",
        label: "Other Personal Assets",
        type: "currency",
        required: false,
        helpText: "Real estate, investments, cash savings"
      },
      {
        id: "annual_expenses_post_exit",
        label: "Expected Post-Exit Annual Expenses",
        type: "currency",
        required: true
      }
    ],
    scenarioModeling: [
      {
        scenario: "Conservative (4% withdrawal rate)",
        multiplier: 25,
        description: "Based on traditional retirement planning (4% safe withdrawal rate)"
      },
      {
        scenario: "Moderate (5% withdrawal rate)",
        multiplier: 20, 
        description: "Slightly more aggressive withdrawal rate"
      },
      {
        scenario: "Aggressive (6% withdrawal rate)",
        multiplier: 16.67,
        description: "Higher risk approach requiring careful investment management"
      }
    ]
  },

  // Triangulating Distance to Goal (Advanced Analysis)
  distanceToGoal: {
    title: "Triangulating Distance to Your Exit Goal",
    description: "Advanced analysis comparing your exit timeline, financial needs, and current business value",
    factors: [
      {
        category: "Timeline Pressure",
        weight: 0.3,
        assessments: [
          "How urgent is your exit need?",
          "Can you delay exit if business value is insufficient?", 
          "Are there external factors forcing timeline?",
          "How flexible are your exit date requirements?"
        ]
      },
      {
        category: "Financial Gap",
        weight: 0.4,
        assessments: [
          "Size of wealth gap (needed vs. projected proceeds)",
          "Ability to reduce post-exit lifestyle expenses",
          "Alternative income sources available",
          "Spouse income and asset contributions"
        ]
      },
      {
        category: "Business Value Enhancement Potential", 
        weight: 0.3,
        assessments: [
          "How much can business value be improved?",
          "Time required for value enhancement initiatives",
          "Market conditions and timing factors",
          "Owner's willingness to invest in improvements"
        ]
      }
    ],
    outcomes: [
      {
        status: "Green Light",
        criteria: "Timeline flexible, small/no wealth gap, business value adequate",
        recommendation: "Proceed with exit planning - excellent position"
      },
      {
        status: "Yellow Caution",
        criteria: "Some challenges in one or two areas",
        recommendation: "Address specific gaps before proceeding - very achievable"
      },
      {
        status: "Red Stop", 
        criteria: "Significant challenges in multiple areas",
        recommendation: "Focus on value building and timeline extension before exit"
      }
    ]
  },

  // Interactive Financial Readiness Quiz
  financialQuiz: [
    {
      id: 1,
      question: "What percentage of your current lifestyle expenses come from business income?",
      options: [
        { text: "Less than 50%", score: 4 },
        { text: "50-75%", score: 3 },
        { text: "75-90%", score: 2 },
        { text: "More than 90%", score: 1 }
      ],
      explanation: "Lower dependence on business income provides more flexibility in exit negotiations and reduces financial pressure.",
      category: "Income Dependency"
    },
    {
      id: 2,
      question: "How would you rate the quality and consistency of your business financial records?", 
      options: [
        { text: "Professionally audited and very consistent", score: 4 },
        { text: "Compiled statements, generally consistent", score: 3 },
        { text: "Internal statements, some inconsistencies", score: 2 },
        { text: "Minimal records, significant gaps", score: 1 }
      ],
      explanation: "High-quality financial records are essential for obtaining maximum business value and credibility with potential buyers.",
      category: "Financial Documentation"
    },
    {
      id: 3,
      question: "If your business income stopped today, how long could you maintain your current lifestyle?",
      options: [
        { text: "More than 5 years", score: 4 },
        { text: "2-5 years", score: 3 },
        { text: "6 months - 2 years", score: 2 },
        { text: "Less than 6 months", score: 1 }
      ],
      explanation: "Greater financial independence provides negotiating power and reduces pressure to accept suboptimal exit terms.",
      category: "Financial Independence"
    }
  ]
};