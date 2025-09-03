// KGOB Meeting #1: Stakeholder Assessment & Business Baseline
// Interactive content based on ExpressWL 4.0 system

export const meeting1Content = {
  title: "Meeting #1: Stakeholder Assessment & Business Baseline",
  description: "Identify stakeholders and establish comprehensive business baseline data",
  duration: "90 minutes",
  objectives: [
    "Map all stakeholders affected by your exit decision",
    "Complete comprehensive business baseline assessment", 
    "Establish documentation requirements",
    "Set expectations for the exit planning process"
  ],
  
  // Interactive Stakeholder Mapping Tool
  stakeholderMapping: {
    title: "Interactive Stakeholder Impact Assessment",
    description: "Identify and assess how your exit decision will impact each stakeholder group",
    stakeholderTypes: [
      {
        category: "Family Members",
        questions: [
          "Who in your family depends on business income?",
          "Are family members employed by the business?", 
          "Who would inherit or receive business ownership?",
          "How would your exit affect family lifestyle and security?"
        ],
        impactAreas: ["Financial Security", "Employment", "Lifestyle", "Inheritance"],
        riskLevel: "high"
      },
      {
        category: "Key Employees", 
        questions: [
          "Who are your most critical employees?",
          "Which employees have institutional knowledge?",
          "Who could potentially become internal buyers?",
          "How would your exit affect employee job security?"
        ],
        impactAreas: ["Job Security", "Leadership Roles", "Equity Participation", "Career Development"],
        riskLevel: "high"
      },
      {
        category: "Business Partners",
        questions: [
          "Do you have business partners or co-owners?",
          "Are there existing buy-sell agreements?",
          "How are ownership transfers handled?",
          "What are partners' exit timeline expectations?"
        ],
        impactAreas: ["Ownership Control", "Decision Making", "Buy-Sell Triggers", "Valuation Methods"],
        riskLevel: "critical"
      },
      {
        category: "Major Customers",
        questions: [
          "Which customers represent >10% of revenue?",
          "Are there personal relationships with key customers?",
          "Could customers be lost during transition?",
          "Are customer contracts transferable?"
        ],
        impactAreas: ["Revenue Continuity", "Contract Terms", "Relationship Management", "Competitive Risk"],
        riskLevel: "medium"
      },
      {
        category: "Key Vendors",
        questions: [
          "Who are your critical suppliers or vendors?",
          "Are there personal guarantees on vendor agreements?",
          "Could vendor relationships be disrupted?",
          "Are there exclusive supplier arrangements?"
        ],
        impactAreas: ["Supply Chain", "Cost Structure", "Exclusive Arrangements", "Credit Terms"],
        riskLevel: "medium"
      },
      {
        category: "Community & Others",
        questions: [
          "What is your role in the local business community?",
          "Are there community obligations or commitments?",
          "How would your exit affect local employment?",
          "Are there charitable or civic commitments?"
        ],
        impactAreas: ["Community Impact", "Reputation", "Civic Roles", "Employment Effects"],
        riskLevel: "low"
      }
    ]
  },

  // Business Baseline Interactive Assessment
  businessBaseline: {
    title: "Comprehensive Business Baseline Assessment",
    description: "Complete evaluation of your business fundamentals and operational characteristics",
    sections: [
      {
        category: "Business Overview",
        questions: [
          {
            id: "business_name",
            question: "Legal business name and DBA (if different)",
            type: "text",
            required: true,
            placeholder: "ABC Corporation DBA ABC Services"
          },
          {
            id: "business_structure", 
            question: "Legal business structure",
            type: "select",
            required: true,
            options: ["C Corporation", "S Corporation", "LLC", "Partnership", "Sole Proprietorship", "Other"]
          },
          {
            id: "formation_date",
            question: "Date business was formed",
            type: "date",
            required: true
          },
          {
            id: "employees_total",
            question: "Total number of employees (including owners)",
            type: "number",
            required: true,
            min: 1
          },
          {
            id: "employees_fulltime",
            question: "Number of full-time employees",
            type: "number", 
            required: true
          }
        ]
      },
      {
        category: "Financial Performance",
        questions: [
          {
            id: "revenue_current",
            question: "Current annual revenue (most recent complete year)",
            type: "currency",
            required: true,
            placeholder: "2500000"
          },
          {
            id: "revenue_growth",
            question: "Average annual revenue growth over past 3 years",
            type: "percentage",
            required: true,
            placeholder: "15"
          },
          {
            id: "profit_margin",
            question: "Net profit margin (percentage)",
            type: "percentage",
            required: true,
            placeholder: "12"
          },
          {
            id: "ebitda",
            question: "EBITDA (Earnings Before Interest, Taxes, Depreciation, Amortization)",
            type: "currency",
            required: true,
            placeholder: "500000"
          }
        ]
      },
      {
        category: "Ownership Structure",
        questions: [
          {
            id: "ownership_percentage",
            question: "Your ownership percentage",
            type: "percentage", 
            required: true,
            placeholder: "100"
          },
          {
            id: "other_owners",
            question: "Are there other owners?",
            type: "yesno",
            required: true,
            followUp: {
              condition: "yes",
              questions: [
                {
                  id: "other_owners_details",
                  question: "Please list other owners and their ownership percentages",
                  type: "textarea",
                  placeholder: "John Smith - 25%, Mary Jones - 15%"
                }
              ]
            }
          },
          {
            id: "buy_sell_agreement",
            question: "Do you have a current buy-sell agreement?",
            type: "yesno",
            required: true
          }
        ]
      },
      {
        category: "Exit Strategy Preferences",
        questions: [
          {
            id: "preferred_exit_method",
            question: "What is your preferred exit method?",
            type: "select",
            required: true,
            options: [
              "Sale to family member",
              "Sale to employees (ESOP or management buyout)", 
              "Sale to third party (strategic buyer)",
              "Sale to financial buyer (private equity)",
              "Merger with another company",
              "Initial public offering (IPO)",
              "Liquidation",
              "Not sure yet"
            ]
          },
          {
            id: "exit_timeline",
            question: "When do you plan to exit?",
            type: "select", 
            required: true,
            options: [
              "Within 2 years",
              "2-5 years", 
              "5-10 years",
              "10+ years",
              "No specific timeline"
            ]
          },
          {
            id: "exit_goals",
            question: "What are your primary goals for exiting? (select all that apply)",
            type: "multiselect",
            required: true,
            options: [
              "Maximize sale proceeds",
              "Ensure business continuity", 
              "Protect employee jobs",
              "Maintain family control",
              "Minimize tax impact",
              "Quick/easy transaction",
              "Maintain company culture",
              "Personal freedom/retirement"
            ]
          }
        ]
      }
    ]
  },

  // Documentation Checklist with Interactive Progress Tracking
  documentationChecklist: {
    title: "Exit Planning Documentation Checklist",
    description: "Comprehensive list of documents needed for successful exit planning",
    categories: [
      {
        name: "Financial Documents (Required)",
        priority: "critical",
        items: [
          {
            item: "Audited financial statements (3 years)",
            description: "Professional audited statements showing 3-year trend",
            tips: "If not audited, compiled statements are acceptable but may affect valuation",
            required: true
          },
          {
            item: "Business tax returns (3 years)",
            description: "Complete business tax returns including all schedules",
            tips: "Returns should match financial statements",
            required: true
          },
          {
            item: "Personal tax returns (3 years)",
            description: "Owner's personal returns to assess overall financial picture", 
            tips: "Helps determine wealth gap and financial readiness",
            required: true
          },
          {
            item: "Management reports and KPIs",
            description: "Monthly/quarterly reports showing key performance indicators",
            tips: "Shows management depth and business monitoring capabilities",
            required: true
          },
          {
            item: "Accounts receivable aging report",
            description: "Current A/R aging to assess collection quality",
            tips: "Indicates cash flow predictability",
            required: true
          },
          {
            item: "Accounts payable summary", 
            description: "Current A/P summary showing vendor relationships",
            tips: "Shows working capital management",
            required: true
          }
        ]
      },
      {
        name: "Legal & Operational Documents",
        priority: "high",
        items: [
          {
            item: "Articles of incorporation/organization",
            description: "Founding documents establishing the business entity",
            tips: "Must be current and properly filed",
            required: true
          },
          {
            item: "Buy-sell agreements",
            description: "Existing agreements between owners regarding ownership transfers",
            tips: "Critical for valuation and transfer terms",
            required: true
          },
          {
            item: "Key employee agreements",
            description: "Employment contracts for critical personnel",
            tips: "Includes non-compete, compensation, and retention terms",
            required: false
          },
          {
            item: "Major customer contracts",
            description: "Contracts with customers representing >10% of revenue",
            tips: "Assess transferability and relationship risk",
            required: false
          },
          {
            item: "Key vendor agreements",
            description: "Contracts with critical suppliers",
            tips: "Evaluate supply chain risks and dependencies",
            required: false
          },
          {
            item: "Insurance policies",
            description: "All business insurance policies including key-man coverage",
            tips: "Shows risk management and protection levels",
            required: false
          }
        ]
      },
      {
        name: "Strategic & Planning Documents", 
        priority: "medium",
        items: [
          {
            item: "Current business plan",
            description: "Most recent strategic business plan",
            tips: "Shows forward-thinking and strategic planning capability",
            required: false
          },
          {
            item: "Market analysis or industry reports",
            description: "Third-party analysis of your market/industry",
            tips: "Validates market position and growth potential",
            required: false
          },
          {
            item: "Competitive analysis",
            description: "Analysis of key competitors and market position",
            tips: "Shows competitive advantages and threats",
            required: false
          },
          {
            item: "Previous business valuations",
            description: "Any prior professional valuations",
            tips: "Provides baseline for current valuation discussions",
            required: false
          }
        ]
      }
    ]
  },

  // Specialized Assessment Modules
  specializationModules: [
    {
      id: "family_transfer",
      title: "Family Transfer Considerations",
      description: "Special considerations when transferring business to family members",
      applicableWhen: "Planning transfer to children, spouse, or other family",
      keyQuestions: [
        "Which family members are interested in the business?",
        "What is their current involvement and capability level?",
        "How will non-participating family members be treated?",
        "What are the tax implications of family transfers?",
        "How will you maintain family harmony during transition?"
      ]
    },
    {
      id: "internal_sale",
      title: "Internal Sale to Employees",
      description: "Assessment for sales to management teams or employee stock ownership plans (ESOPs)",
      applicableWhen: "Considering sale to existing management or all employees",
      keyQuestions: [
        "Which employees have the capability to lead?",
        "Do potential buyers have access to financing?",
        "Is there sufficient management depth?",
        "What seller financing might be required?",
        "How will remaining employees be affected?"
      ]
    },
    {
      id: "external_sale",
      title: "External Sale Preparation",
      description: "Readiness assessment for third-party sales (strategic or financial buyers)",
      applicableWhen: "Planning sale to outside strategic or financial buyers",
      keyQuestions: [
        "What makes your business attractive to buyers?",
        "Are your financial records buyer-ready?",
        "How dependent is the business on your involvement?",
        "What are your key competitive advantages?",
        "Are there any deal-breaker issues to resolve?"
      ]
    },
    {
      id: "buy_sell_triggers",
      title: "Buy-Sell Agreement Analysis",
      description: "Review and analysis of existing buy-sell agreement terms",
      applicableWhen: "Business has existing buy-sell agreements or multiple owners",
      keyQuestions: [
        "What events trigger buy-sell provisions?",
        "How is the business valued under current agreement?",
        "Are the valuation methods current and fair?",
        "Do all parties understand the agreement terms?",
        "When was the agreement last updated?"
      ]
    },
    {
      id: "additional_owners",
      title: "Multiple Owner Considerations",
      description: "Special planning needed when multiple owners are involved",
      applicableWhen: "Business has multiple owners with different exit goals",
      keyQuestions: [
        "Do all owners share the same exit timeline?",
        "How are ownership transfer decisions made?",
        "Are there drag-along or tag-along rights?",
        "How are disagreements resolved?",
        "What happens if one owner wants to exit early?"
      ]
    }
  ],

  // Interactive Knowledge Quiz for Meeting #1
  knowledgeQuiz: [
    {
      id: 1,
      question: "What percentage of business owners who plan their exit achieve their financial goals?",
      options: [
        { text: "Less than 25%", correct: false },
        { text: "About 50%", correct: false },
        { text: "75% or more", correct: true },
        { text: "Nearly 100%", correct: false }
      ],
      explanation: "Research shows that business owners who engage in formal exit planning are 3x more likely to achieve their goals, with success rates exceeding 75%.",
      category: "Exit Planning Benefits"
    },
    {
      id: 2, 
      question: "Which stakeholder group typically has the highest impact risk during a business exit?",
      options: [
        { text: "Customers", correct: false },
        { text: "Family members", correct: true },
        { text: "Vendors", correct: false },
        { text: "Community", correct: false }
      ],
      explanation: "Family members often have the highest risk exposure as they may depend on business income, employment, and future inheritance while having limited control over business decisions.",
      category: "Stakeholder Analysis"
    },
    {
      id: 3,
      question: "What is the most important factor in maintaining business value during owner transition?",
      options: [
        { text: "Keeping the same location", correct: false },
        { text: "Maintaining product prices", correct: false },
        { text: "Management team depth", correct: true },
        { text: "Having the most assets", correct: false }
      ],
      explanation: "A capable management team reduces owner dependency and demonstrates to buyers that the business can operate successfully without the current owner.",
      category: "Business Readiness"
    }
  ],

  // Meeting Agenda Template
  meetingAgenda: {
    title: "Meeting #1 Agenda: Stakeholder Assessment & Business Baseline",
    sections: [
      {
        title: "Welcome & Process Overview (15 minutes)",
        activities: [
          "Review engagement objectives and timeline",
          "Confirm client expectations and commitment level",
          "Outline the 5-meeting framework",
          "Answer initial questions about the process"
        ]
      },
      {
        title: "Stakeholder Mapping Exercise (30 minutes)",
        activities: [
          "Identify all stakeholder groups",
          "Assess impact level for each group",
          "Discuss potential conflicts or challenges",
          "Prioritize stakeholder communication needs"
        ]
      },
      {
        title: "Business Baseline Assessment (35 minutes)",
        activities: [
          "Complete business overview questionnaire",
          "Review financial performance trends",
          "Assess ownership structure and agreements",
          "Identify preliminary exit strategy preferences"
        ]
      },
      {
        title: "Documentation Requirements & Next Steps (10 minutes)",
        activities: [
          "Review documentation checklist",
          "Establish timeline for document collection",
          "Schedule Meeting #2: Financial Readiness",
          "Assign homework: complete documentation checklist"
        ]
      }
    ]
  },

  // Homework Assignment for Meeting #1
  homework: {
    title: "Meeting #1 Homework: Documentation Collection",
    description: "Gather the essential documents needed for comprehensive exit planning analysis",
    deadline: "Before Meeting #2 (typically 2 weeks)",
    priority: "high",
    estimatedTime: "3-4 hours",
    instructions: [
      "Gather all documents from the provided checklist",
      "Organize documents by category (financial, legal, strategic)",
      "Make copies of originals - never send originals",
      "If any documents are missing, note what you need to obtain",
      "Contact your KGOB advisor with questions or if you need extensions"
    ]
  }
};

export const getMeeting1Progress = (completedSections) => {
  const totalSections = 4; // stakeholder mapping, business baseline, documentation review, next steps
  const completed = completedSections.length;
  return Math.round((completed / totalSections) * 100);
};