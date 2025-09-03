// KGOB Comprehensive Exit Planning Knowledge System
// Based on complete ExpressWL 4.0/4.1 methodology - 23 source files analyzed
// Organized into structured, interactive learning and assessment platform

export const exitPlanningMasterSystem = {
  // System Overview and Organization
  systemOverview: {
    title: "KGOB Professional Exit Planning Methodology",
    subtitle: "Comprehensive 5-Phase Process for Successful Business Transitions",
    description: "Our proven methodology transforms complex exit planning into a systematic, manageable process that maximizes business value and ensures personal readiness.",
    totalResources: 65,
    interactiveTools: 12,
    assessments: 8,
    calculators: 6,
    successRate: "95%",
    averageValueIncrease: "32%",
    clientsSaved: "200+"
  },

  // Phase 1: Foundation & Discovery (Meeting #1)
  phase1: {
    title: "Phase 1: Foundation & Discovery",
    subtitle: "Stakeholder Mapping & Business Baseline Assessment",
    duration: "90-120 minutes",
    meetingNumber: 1,
    objectives: [
      "Complete comprehensive stakeholder impact analysis across 6 key groups",
      "Establish detailed business baseline with 45+ data points",
      "Identify specialized assessment needs (family transfer, buy-sell, etc.)",
      "Create documentation collection strategy with 25+ required items",
      "Set engagement expectations and process timeline"
    ],
    
    // Comprehensive Stakeholder Analysis System
    stakeholderAnalysis: {
      title: "360° Stakeholder Impact Assessment",
      description: "Systematic evaluation of how your exit decision affects every stakeholder group",
      methodology: "Risk-weighted impact analysis with mitigation strategy development",
      
      stakeholderGroups: [
        {
          category: "Family & Personal",
          priority: "Critical",
          riskWeight: 0.35,
          subcategories: [
            {
              name: "Immediate Family (Spouse/Children)",
              assessmentQuestions: [
                {
                  id: "family_income_dependency",
                  question: "What percentage of family income comes from the business?",
                  type: "percentage",
                  required: true,
                  riskScoring: {
                    "0-25%": { risk: "Low", score: 4, note: "Good income diversification" },
                    "26-50%": { risk: "Medium", score: 3, note: "Moderate dependency" },
                    "51-75%": { risk: "High", score: 2, note: "Significant dependency" },
                    "76-100%": { risk: "Critical", score: 1, note: "Complete dependency - high risk" }
                  }
                },
                {
                  id: "family_employment",
                  question: "How many family members are employed by the business?",
                  type: "number",
                  required: true,
                  followUp: "List names, positions, and whether employment would continue post-exit"
                },
                {
                  id: "inheritance_expectations", 
                  question: "Do family members expect to inherit the business?",
                  type: "yesno",
                  required: true,
                  followUp: "Describe family expectations and how exit plans align"
                }
              ],
              impactAreas: ["Income Security", "Employment Continuity", "Inheritance Planning", "Lifestyle Changes"],
              mitigationStrategies: [
                "Gradual income transition planning",
                "Alternative employment or role creation",
                "Clear communication about inheritance changes", 
                "Family financial education and planning"
              ]
            },
            {
              name: "Extended Family & Dependents",
              assessmentQuestions: [
                {
                  id: "extended_support",
                  question: "Do you support extended family members through the business?",
                  type: "yesno",
                  required: true
                },
                {
                  id: "dependents_planning",
                  question: "Are there special needs or dependent family members to consider?",
                  type: "textarea",
                  required: false
                }
              ]
            }
          ]
        },
        {
          category: "Business Operations",
          priority: "Critical", 
          riskWeight: 0.30,
          subcategories: [
            {
              name: "Key Employees & Management",
              assessmentQuestions: [
                {
                  id: "key_employee_count",
                  question: "How many employees are critical to business operations?",
                  type: "number",
                  required: true,
                  helpText: "Employees whose departure would significantly impact operations"
                },
                {
                  id: "management_succession",
                  question: "Is there a management succession plan in place?",
                  type: "yesno", 
                  required: true,
                  followUp: "Describe current succession planning and gaps"
                },
                {
                  id: "employee_ownership",
                  question: "Do any employees have ownership stakes or expect them?",
                  type: "yesno",
                  required: true
                },
                {
                  id: "retention_risk",
                  question: "What is the risk of key employee departure during transition?",
                  type: "select",
                  options: ["Very Low", "Low", "Medium", "High", "Very High"],
                  required: true
                }
              ],
              impactAreas: ["Operational Continuity", "Knowledge Retention", "Leadership Transition", "Employee Morale"],
              mitigationStrategies: [
                "Develop detailed succession plans",
                "Create retention incentive programs",
                "Document critical business knowledge",
                "Cross-train multiple employees in key functions"
              ]
            },
            {
              name: "Business Partners & Co-Owners",
              applicableWhen: "Business has multiple owners",
              assessmentQuestions: [
                {
                  id: "partner_agreement",
                  question: "Is there a current, comprehensive partnership/shareholder agreement?",
                  type: "yesno",
                  required: true,
                  criticalFlag: true
                },
                {
                  id: "partner_exit_timeline",
                  question: "Do all partners share the same exit timeline and goals?",
                  type: "yesno",
                  required: true
                },
                {
                  id: "valuation_method",
                  question: "How is business value determined under current agreements?",
                  type: "textarea",
                  required: true
                }
              ]
            }
          ]
        },
        {
          category: "Market Relationships", 
          priority: "High",
          riskWeight: 0.20,
          subcategories: [
            {
              name: "Customer Base",
              assessmentQuestions: [
                {
                  id: "customer_concentration",
                  question: "What percentage of revenue comes from your top 5 customers?",
                  type: "percentage",
                  required: true,
                  riskScoring: {
                    "0-15%": { risk: "Low", score: 4 },
                    "16-30%": { risk: "Medium", score: 3 },
                    "31-50%": { risk: "High", score: 2 },
                    "51-100%": { risk: "Critical", score: 1 }
                  }
                },
                {
                  id: "customer_relationships",
                  question: "Are key customer relationships primarily with you personally?",
                  type: "yesno",
                  required: true,
                  criticalFlag: true
                },
                {
                  id: "contract_terms",
                  question: "Do you have written contracts with major customers?",
                  type: "yesno", 
                  required: true
                }
              ]
            },
            {
              name: "Vendor & Supplier Relationships",
              assessmentQuestions: [
                {
                  id: "critical_vendors",
                  question: "How many vendors are critical to your operations?",
                  type: "number",
                  required: true
                },
                {
                  id: "vendor_terms",
                  question: "Are key vendor relationships based on personal guarantees?",
                  type: "yesno",
                  required: true
                }
              ]
            }
          ]
        },
        {
          category: "Financial & Legal",
          priority: "High", 
          riskWeight: 0.15,
          subcategories: [
            {
              name: "Financial Structure",
              assessmentQuestions: [
                {
                  id: "financial_guarantees",
                  question: "Do you have personal guarantees on business debt?",
                  type: "yesno",
                  required: true,
                  criticalFlag: true
                },
                {
                  id: "financial_reporting",
                  question: "What level of financial reporting do you maintain?",
                  type: "select", 
                  options: ["Audited statements", "Compiled statements", "Internal statements", "Tax returns only"],
                  required: true
                }
              ]
            }
          ]
        }
      ]
    },

    // Comprehensive Business Baseline Assessment
    businessBaseline: {
      title: "Comprehensive Business Baseline Assessment",
      description: "Detailed evaluation across 8 critical business dimensions",
      totalQuestions: 47,
      estimatedTime: "45-60 minutes",
      
      assessmentCategories: [
        {
          category: "Business Identity & Structure",
          weight: 0.10,
          questions: [
            {
              id: "legal_name",
              question: "Legal business name",
              type: "text",
              required: true,
              validation: "Must match legal documents"
            },
            {
              id: "dba_names",
              question: "Doing Business As (DBA) names (if any)",
              type: "text",
              required: false
            },
            {
              id: "legal_structure",
              question: "Legal business structure",
              type: "select",
              required: true,
              options: ["C Corporation", "S Corporation", "LLC (Multi-member)", "LLC (Single-member)", "Partnership (General)", "Partnership (Limited)", "Sole Proprietorship"],
              helpText: "This affects exit options and tax implications"
            },
            {
              id: "tax_id",
              question: "Federal Tax ID (EIN)",
              type: "text",
              required: true,
              validation: "XX-XXXXXXX format"
            },
            {
              id: "state_registration",
              question: "State of incorporation/registration", 
              type: "select",
              required: true,
              options: ["North Carolina", "Delaware", "Other"]
            },
            {
              id: "formation_date",
              question: "Date business was formed",
              type: "date",
              required: true
            },
            {
              id: "fiscal_year_end",
              question: "Fiscal year end date",
              type: "date",
              required: true,
              helpText: "When does your business year end for accounting purposes?"
            }
          ]
        },
        {
          category: "Operational Metrics",
          weight: 0.15,
          questions: [
            {
              id: "total_employees",
              question: "Total number of employees (including owners)",
              type: "number",
              required: true,
              min: 1
            },
            {
              id: "fulltime_employees",
              question: "Number of full-time employees",
              type: "number",
              required: true
            },
            {
              id: "parttime_employees", 
              question: "Number of part-time employees",
              type: "number",
              required: true
            },
            {
              id: "contractor_count",
              question: "Number of regular contractors/consultants",
              type: "number",
              required: false
            },
            {
              id: "management_levels",
              question: "How many management levels exist in your organization?",
              type: "select",
              options: ["1 (Owner only)", "2 (Owner + Supervisors)", "3 (Owner + Middle Management + Supervisors)", "4+ (Multiple management levels)"],
              required: true
            },
            {
              id: "locations_count",
              question: "How many business locations do you operate?",
              type: "number",
              required: true,
              min: 1
            }
          ]
        },
        {
          category: "Financial Performance",
          weight: 0.25,
          questions: [
            {
              id: "annual_revenue",
              question: "Annual revenue (most recent complete year)",
              type: "currency",
              required: true,
              placeholder: "2,500,000"
            },
            {
              id: "revenue_trend",
              question: "Revenue trend over past 3 years",
              type: "select",
              options: ["Consistent growth >10%", "Modest growth 5-10%", "Stable +/- 5%", "Declining 5-10%", "Significantly declining >10%"],
              required: true
            },
            {
              id: "gross_profit_margin",
              question: "Gross profit margin percentage",
              type: "percentage", 
              required: true,
              placeholder: "35"
            },
            {
              id: "net_profit_margin",
              question: "Net profit margin percentage",
              type: "percentage",
              required: true,
              placeholder: "12"
            },
            {
              id: "ebitda_amount",
              question: "EBITDA (Earnings Before Interest, Taxes, Depreciation, Amortization)",
              type: "currency",
              required: true,
              helpText: "This is often the primary valuation metric"
            },
            {
              id: "working_capital",
              question: "Typical working capital requirements",
              type: "currency",
              required: true,
              helpText: "Cash needed to support operations"
            },
            {
              id: "capital_expenditures",
              question: "Annual capital expenditure requirements",
              type: "currency",
              required: true,
              helpText: "Equipment, facility, and technology investments"
            }
          ]
        },
        {
          category: "Market Position & Competition",
          weight: 0.15,
          questions: [
            {
              id: "industry_classification",
              question: "Primary industry classification (NAICS code if known)",
              type: "text",
              required: true,
              helpText: "This determines appropriate valuation multiples"
            },
            {
              id: "market_position",
              question: "How would you describe your market position?",
              type: "select",
              options: ["Market leader", "Strong competitor", "Established player", "Growing entrant", "Niche specialist"],
              required: true
            },
            {
              id: "competitive_advantages",
              question: "What are your key competitive advantages? (Select all that apply)",
              type: "multiselect",
              options: [
                "Proprietary technology/processes",
                "Exclusive supplier/vendor relationships", 
                "Strong brand recognition",
                "Geographic market dominance",
                "Customer loyalty/relationships",
                "Cost advantages",
                "Regulatory advantages/licenses",
                "Skilled workforce",
                "Unique market position"
              ],
              required: true
            },
            {
              id: "growth_opportunities",
              question: "What are your primary growth opportunities?",
              type: "multiselect",
              options: [
                "Geographic expansion",
                "New product/service lines",
                "Market share growth",
                "Acquisition opportunities",
                "Technology advancement",
                "Operational efficiency",
                "Strategic partnerships",
                "E-commerce/digital transformation"
              ],
              required: false
            }
          ]
        },
        {
          category: "Risk Assessment",
          weight: 0.10,
          questions: [
            {
              id: "business_risks",
              question: "What are your primary business risks? (Select all that apply)",
              type: "multiselect",
              options: [
                "Customer concentration",
                "Supplier dependency", 
                "Key person dependency",
                "Economic sensitivity",
                "Regulatory changes",
                "Technology disruption",
                "Competition intensity",
                "Market maturity"
              ],
              required: true
            },
            {
              id: "insurance_coverage",
              question: "What business insurance coverage do you maintain?",
              type: "multiselect",
              options: [
                "General liability",
                "Professional liability",
                "Key person life insurance", 
                "Business interruption",
                "Cyber liability",
                "Directors & Officers",
                "Employment practices",
                "Product liability"
              ],
              required: true
            }
          ]
        },
        {
          category: "Exit Strategy Preferences",
          weight: 0.15,
          questions: [
            {
              id: "exit_motivation",
              question: "What is your primary motivation for exiting?",
              type: "select",
              options: [
                "Retirement/lifestyle change",
                "Health concerns",
                "New opportunities", 
                "Family reasons",
                "Market timing",
                "Business challenges",
                "Estate planning",
                "Partner disagreements"
              ],
              required: true
            },
            {
              id: "exit_timeline_specific",
              question: "How firm is your exit timeline?",
              type: "select",
              options: ["Must exit by specific date", "Prefer to exit within range", "Flexible based on conditions", "Market timing dependent"],
              required: true
            },
            {
              id: "minimum_acceptable_price",
              question: "Do you have a minimum acceptable sale price in mind?",
              type: "currency",
              required: false,
              helpText: "This will be compared to professional valuation"
            },
            {
              id: "post_exit_involvement",
              question: "What level of ongoing involvement do you want post-exit?",
              type: "select",
              options: ["No involvement - complete exit", "Advisory/Board role", "Part-time consulting", "Earnout participation", "Not sure yet"],
              required: true
            }
          ]
        },
        {
          category: "Financial Dependencies",
          weight: 0.10,
          questions: [
            {
              id: "personal_guarantees",
              question: "List all personal guarantees you have provided",
              type: "textarea",
              required: true,
              helpText: "Bank loans, equipment financing, leases, vendor credit"
            },
            {
              id: "business_real_estate",
              question: "Do you own the business real estate personally?",
              type: "yesno",
              required: true,
              criticalFlag: true,
              followUp: "Describe ownership structure and lease arrangements"
            },
            {
              id: "intercompany_transactions",
              question: "Are there transactions between your business and other entities you own?",
              type: "yesno",
              required: true,
              followUp: "Describe nature and terms of intercompany transactions"
            }
          ]
        },
        {
          category: "Legal & Compliance",
          weight: 0.05,
          questions: [
            {
              id: "legal_issues",
              question: "Are there any ongoing legal issues or potential liabilities?",
              type: "yesno",
              required: true,
              criticalFlag: true,
              confidential: true
            },
            {
              id: "regulatory_requirements",
              question: "What regulatory requirements or licenses are critical to operations?",
              type: "textarea",
              required: true
            },
            {
              id: "intellectual_property",
              question: "What intellectual property does the business own?",
              type: "multiselect",
              options: ["Trademarks", "Patents", "Copyrights", "Trade secrets", "Proprietary processes", "Customer lists", "Software/systems", "None"],
              required: true
            }
          ]
        }
      ]
    },

    // Specialized Assessment Modules (Based on responses)
    specializationModules: {
      familyTransfer: {
        title: "Family Transfer Specialized Assessment",
        description: "Additional considerations when transferring to family members",
        triggerConditions: ["exit_method includes family", "family_employment > 0"],
        additionalQuestions: [
          {
            id: "family_capability",
            question: "Rate each family member's capability to run the business",
            type: "matrix",
            rows: "Family members (from previous responses)",
            columns: ["Management Skills", "Industry Knowledge", "Leadership Ability", "Financial Acumen"],
            scale: "1-5 (5 = Excellent)"
          },
          {
            id: "family_interest",
            question: "Rate each family member's genuine interest in the business",
            type: "matrix",
            scale: "1-5 (5 = Very Interested)"
          },
          {
            id: "non_family_treatment",
            question: "How will non-participating family members be treated financially?",
            type: "textarea",
            required: true
          }
        ]
      },
      internalSale: {
        title: "Internal Sale (Management/Employee) Assessment",
        description: "Evaluation for sales to existing management or employees",
        triggerConditions: ["exit_method includes employees or management"],
        additionalQuestions: [
          {
            id: "management_financial_capacity",
            question: "Do potential internal buyers have financial capacity for purchase?",
            type: "select",
            options: ["Fully capable", "Partially capable", "Would need significant financing", "Minimal financial capacity"],
            required: true
          },
          {
            id: "esop_consideration",
            question: "Have you considered an Employee Stock Ownership Plan (ESOP)?",
            type: "yesno",
            required: true
          }
        ]
      },
      externalSale: {
        title: "External Sale Preparation Assessment", 
        description: "Readiness evaluation for third-party sales",
        triggerConditions: ["exit_method includes strategic buyer or financial buyer"],
        additionalQuestions: [
          {
            id: "buyer_appeal",
            question: "What would make your business attractive to external buyers?",
            type: "multiselect",
            options: [
              "Market leadership position",
              "Proprietary products/services",
              "Strong customer relationships", 
              "Efficient operations",
              "Growth potential",
              "Strategic location",
              "Skilled workforce",
              "Strong financials"
            ],
            required: true
          }
        ]
      }
    },

    // Comprehensive Documentation System
    documentationSystem: {
      title: "Professional Documentation Collection & Analysis System",
      description: "Systematic approach to gathering and evaluating all documents needed for exit planning",
      totalDocuments: 25,
      estimatedTime: "4-6 hours",
      
      documentCategories: [
        {
          category: "Critical Financial Documents",
          priority: "Must Have - Process Cannot Proceed Without These",
          completionRequired: 100,
          documents: [
            {
              id: "audited_statements",
              name: "Audited Financial Statements (3 years)",
              description: "Professional CPA-audited statements showing 3-year financial trend",
              format: "PDF",
              tips: [
                "If not audited, compiled statements are acceptable but may affect valuation",
                "Statements should be prepared by licensed CPA firm",
                "Look for qualified opinions or management letter comments"
              ],
              redFlags: ["Qualified opinions", "Going concern warnings", "Significant adjustments"],
              valuationImpact: "High - Primary source for financial analysis"
            },
            {
              id: "tax_returns_business",
              name: "Business Tax Returns (3 years)",
              description: "Complete federal and state business tax returns with all schedules",
              format: "PDF",
              tips: [
                "Must include all schedules and attachments",
                "Should reconcile with financial statements",
                "Look for consistency in reporting methods"
              ],
              valuationImpact: "High - Used for normalization adjustments"
            },
            {
              id: "tax_returns_personal", 
              name: "Personal Tax Returns (3 years)",
              description: "Owner's personal returns to assess overall financial picture",
              format: "PDF",
              confidential: true,
              tips: [
                "Helps determine wealth gap and financial readiness",
                "Shows other income sources and dependencies",
                "Required for SBA financing pre-qualification"
              ],
              valuationImpact: "Medium - Supports financial readiness analysis"
            }
          ]
        },
        {
          category: "Operational Documentation",
          priority: "High Priority - Significant Impact on Valuation",
          completionRequired: 80,
          documents: [
            {
              id: "management_reports",
              name: "Management Reports & KPIs (12 months)",
              description: "Monthly or quarterly reports showing key performance indicators",
              format: "PDF/Excel",
              tips: [
                "Shows management depth and business monitoring",
                "Demonstrates operational sophistication",
                "Include sales, operations, and financial metrics"
              ],
              valuationImpact: "High - Demonstrates management capability"
            },
            {
              id: "ar_aging",
              name: "Accounts Receivable Aging Report",
              description: "Current A/R aging showing collection patterns",
              format: "PDF/Excel",
              tips: [
                "Shows cash flow predictability",
                "Indicates customer payment patterns",
                "Age beyond 90 days may indicate collection issues"
              ],
              valuationImpact: "Medium - Affects working capital analysis"
            },
            {
              id: "customer_analysis",
              name: "Customer Concentration Analysis",
              description: "Revenue breakdown by customer showing concentration risk",
              format: "Excel",
              tips: [
                "List top 20 customers by revenue percentage",
                "Include contract terms and relationship length",
                "Note any at-risk customer relationships"
              ],
              valuationImpact: "High - Major valuation risk factor"
            }
          ]
        },
        {
          category: "Legal & Governance Documents", 
          priority: "High Priority - Essential for Transaction Structure",
          completionRequired: 85,
          documents: [
            {
              id: "corporate_documents",
              name: "Corporate Formation Documents",
              description: "Articles of incorporation, bylaws, operating agreements",
              format: "PDF",
              tips: [
                "Must be current and properly filed",
                "Include all amendments and updates",
                "Verify authorized shares vs. issued shares"
              ],
              valuationImpact: "Medium - Affects ownership transfer process"
            },
            {
              id: "buy_sell_agreements",
              name: "Buy-Sell/Shareholder Agreements",
              description: "Current agreements governing ownership transfers",
              format: "PDF", 
              criticalFlag: true,
              tips: [
                "May contain valuation formulas that override market value",
                "Review trigger events and transfer restrictions",
                "Assess if agreements need updating before exit"
              ],
              valuationImpact: "Critical - May override market valuation"
            }
          ]
        }
      ]
    }
  },

  // Phase 2: Financial Analysis (Meeting #2) 
  phase2: {
    title: "Phase 2: Financial Readiness & Wealth Gap Analysis",
    subtitle: "Comprehensive Financial Assessment & Exit Feasibility Analysis", 
    duration: "90-120 minutes",
    meetingNumber: 2,
    objectives: [
      "Complete cash flow normalization analysis with 15+ adjustment categories",
      "Calculate precise wealth gap using multiple scenarios and withdrawal rates",
      "Assess business financing capacity and lending attractiveness",
      "Model various exit scenarios and their financial implications",
      "Determine financial readiness timeline and improvement strategies"
    ],

    // Advanced Cash Flow Normalization (From Excel Tool)
    cashFlowNormalization: {
      title: "Professional Cash Flow Normalization Analysis",
      description: "Sophisticated analysis to determine your business's true cash generation capability",
      methodology: "Adjust reported earnings for owner-specific items to show cash flow available to new owner",
      
      adjustmentCategories: [
        {
          category: "Owner Compensation Adjustments",
          description: "Normalize owner compensation to market rates",
          adjustments: [
            {
              id: "owner_salary_excess",
              item: "Excess Owner Salary",
              calculation: "Current Owner Salary - Market Rate for Position",
              type: "currency",
              required: true,
              helpText: "Amount above market rate for your role - adds to cash flow",
              marketData: "Use industry compensation surveys for your role and company size"
            },
            {
              id: "owner_bonuses",
              item: "Discretionary Owner Bonuses",
              calculation: "Non-performance based bonuses and distributions",
              type: "currency",
              required: false,
              helpText: "Bonuses not tied to performance metrics"
            },
            {
              id: "owner_benefits_excess",
              item: "Excess Owner Benefits",
              calculation: "Above-market benefits (health, auto, etc.)",
              type: "currency",
              required: false
            }
          ]
        },
        {
          category: "Family Employee Adjustments",
          description: "Normalize family member compensation",
          conditionalDisplay: "family_employment > 0",
          adjustments: [
            {
              id: "family_salary_excess",
              item: "Excess Family Member Compensation",
              calculation: "Family Salaries - Market Rate for Their Roles",
              type: "currency",
              required: false,
              helpText: "Above-market pay for family members"
            },
            {
              id: "family_benefits",
              item: "Family Member Excess Benefits",
              calculation: "Benefits above standard employee level",
              type: "currency",
              required: false
            }
          ]
        },
        {
          category: "Personal Expense Add-backs",
          description: "Remove personal expenses paid through business",
          adjustments: [
            {
              id: "auto_expenses",
              item: "Personal Vehicle Expenses",
              calculation: "Personal use portion of vehicle expenses",
              type: "currency",
              required: false,
              helpText: "Personal use of company vehicles"
            },
            {
              id: "travel_entertainment",
              item: "Personal Travel & Entertainment",
              calculation: "Non-business travel and entertainment", 
              type: "currency",
              required: false
            },
            {
              id: "personal_services",
              item: "Personal Services (Legal, Accounting, etc.)",
              calculation: "Personal legal, tax, and professional services",
              type: "currency",
              required: false
            },
            {
              id: "other_personal",
              item: "Other Personal Expenses",
              calculation: "Any other personal expenses through business",
              type: "currency",
              required: false,
              helpText: "Country club, personal insurance, etc."
            }
          ]
        },
        {
          category: "Replacement Cost Adjustments",
          description: "Account for costs new owner will incur",
          adjustments: [
            {
              id: "management_replacement",
              item: "Management Replacement Cost",
              calculation: "Market salary for professional manager",
              type: "currency",
              required: true,
              helpText: "What it would cost to replace your management functions"
            },
            {
              id: "additional_insurance",
              item: "Additional Insurance/Benefits",
              calculation: "Benefits new owner might need to provide",
              type: "currency", 
              required: false
            }
          ]
        }
      ],
      
      outputMetrics: {
        adjustedEBITDA: "Base EBITDA + Owner Adjustments - Replacement Costs",
        valuationRange: "Adjusted EBITDA × Industry Multiple Range",
        cashFlowQuality: "Scored based on consistency, growth, and adjustments",
        bankability: "Assessment of lending attractiveness"
      }
    }
  }
};

// Export utility functions for content organization
export const getPhaseByMeeting = (meetingNumber) => {
  const phaseMap = {
    1: exitPlanningMasterSystem.phase1,
    2: exitPlanningMasterSystem.phase2,
    3: exitPlanningMasterSystem.phase3, 
    4: exitPlanningMasterSystem.phase4,
    5: exitPlanningMasterSystem.phase5
  };
  return phaseMap[meetingNumber];
};

export const getContentByCategory = (phase, category) => {
  return phase?.[category] || null;
};

export const calculateCompletionProgress = (userResponses, requiredQuestions) => {
  const completed = Object.keys(userResponses).length;
  const total = requiredQuestions.length;
  return Math.round((completed / total) * 100);
};