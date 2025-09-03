// KGOB Meetings #2-#5 Detailed Content System
// Based on comprehensive analysis of ExpressWL Excel tools and methodology

export const meetings2to5Content = {

  // MEETING #2: FINANCIAL READINESS & WEALTH GAP ANALYSIS
  meeting2: {
    title: "Meeting #2: Financial Readiness & Wealth Gap Analysis",
    subtitle: "Advanced Financial Assessment & Exit Feasibility Modeling",
    duration: "120 minutes",
    prerequisites: ["Completed Meeting #1", "Financial documents submitted"],
    objectives: [
      "Complete professional cash flow normalization with 25+ adjustments",
      "Calculate precise wealth gap using multiple withdrawal rate scenarios",
      "Assess business creditworthiness and financing attractiveness to buyers",
      "Model 5+ different exit scenarios and their financial outcomes",
      "Determine optimal exit timing from financial perspective"
    ],

    // Seller's Sanity Check (Advanced Calculator)
    sellersCheck: {
      title: "Advanced Seller's Financial Feasibility Analysis",
      description: "Comprehensive analysis determining if your business proceeds can support your desired lifestyle",
      
      personalFinancialInventory: [
        {
          category: "Current Income Sources",
          fields: [
            {
              id: "business_salary",
              label: "Current Business Salary/Draws",
              type: "currency",
              required: true,
              helpText: "Include all compensation from business"
            },
            {
              id: "business_benefits_value", 
              label: "Value of Business-Paid Benefits",
              type: "currency",
              required: true,
              helpText: "Health insurance, auto, other benefits"
            },
            {
              id: "spouse_income",
              label: "Spouse Income (if applicable)",
              type: "currency",
              required: false
            },
            {
              id: "other_income",
              label: "Other Income Sources", 
              type: "currency",
              required: false,
              helpText: "Rental, investments, part-time work"
            }
          ]
        },
        {
          category: "Current Asset Position",
          fields: [
            {
              id: "retirement_401k",
              label: "401(k)/403(b) Balance",
              type: "currency", 
              required: true
            },
            {
              id: "retirement_ira",
              label: "IRA/Roth IRA Balance",
              type: "currency",
              required: true
            },
            {
              id: "investment_accounts",
              label: "Taxable Investment Accounts",
              type: "currency",
              required: true
            },
            {
              id: "cash_savings",
              label: "Cash & Cash Equivalents",
              type: "currency",
              required: true
            },
            {
              id: "home_equity",
              label: "Primary Residence Net Equity",
              type: "currency",
              required: true
            },
            {
              id: "investment_real_estate",
              label: "Investment Real Estate Net Equity",
              type: "currency", 
              required: false
            },
            {
              id: "other_assets",
              label: "Other Significant Assets",
              type: "currency",
              required: false,
              helpText: "Collections, boats, jewelry, other businesses"
            }
          ]
        },
        {
          category: "Current Debt Obligations",
          fields: [
            {
              id: "home_mortgage",
              label: "Home Mortgage Balance",
              type: "currency",
              required: true
            },
            {
              id: "other_real_estate_debt",
              label: "Other Real Estate Debt",
              type: "currency",
              required: false
            },
            {
              id: "personal_loans",
              label: "Personal Loans (auto, boat, etc.)",
              type: "currency",
              required: false
            },
            {
              id: "credit_card_debt",
              label: "Credit Card Debt",
              type: "currency", 
              required: false
            }
          ]
        },
        {
          category: "Post-Exit Lifestyle Planning",
          fields: [
            {
              id: "housing_expenses",
              label: "Annual Housing Expenses",
              type: "currency",
              required: true,
              helpText: "Mortgage/rent, taxes, insurance, utilities, maintenance"
            },
            {
              id: "lifestyle_expenses",
              label: "Annual Lifestyle Expenses", 
              type: "currency",
              required: true,
              helpText: "Food, clothing, entertainment, personal care"
            },
            {
              id: "healthcare_insurance",
              label: "Annual Healthcare & Insurance",
              type: "currency",
              required: true,
              helpText: "Health insurance premiums, out-of-pocket costs"
            },
            {
              id: "travel_recreation_budget",
              label: "Annual Travel & Recreation",
              type: "currency",
              required: false
            },
            {
              id: "family_support_obligations",
              label: "Family Support Obligations",
              type: "currency",
              required: false,
              helpText: "Support for children, parents, other family"
            },
            {
              id: "charitable_giving_planned",
              label: "Planned Annual Charitable Giving",
              type: "currency",
              required: false
            },
            {
              id: "contingency_buffer",
              label: "Emergency/Contingency Buffer",
              type: "currency",
              required: true,
              helpText: "Extra funds for unexpected expenses or emergencies"
            }
          ]
        }
      ],

      scenarioModeling: [
        {
          name: "Conservative Scenario (4% withdrawal)",
          description: "Traditional safe withdrawal rate for retirement planning",
          withdrawalRate: 0.04,
          riskLevel: "Low",
          suitability: "Risk-averse investors, uncertain market conditions"
        },
        {
          name: "Balanced Scenario (5% withdrawal)",
          description: "Moderate approach balancing growth and security",
          withdrawalRate: 0.05, 
          riskLevel: "Medium",
          suitability: "Balanced investors with moderate risk tolerance"
        },
        {
          name: "Growth Scenario (6% withdrawal)",
          description: "Aggressive approach requiring active investment management",
          withdrawalRate: 0.06,
          riskLevel: "High",
          suitability: "Experienced investors comfortable with market volatility"
        }
      ]
    },

    // Triangulating Distance to Goal (Strategic Analysis)
    distanceToGoal: {
      title: "Strategic Exit Timing & Feasibility Analysis",
      description: "Multi-factor analysis determining optimal exit timing and strategy",
      
      analysisFactors: [
        {
          factor: "Financial Readiness",
          weight: 0.40,
          subfactors: [
            {
              name: "Wealth Gap Size",
              weight: 0.30,
              scoring: {
                "No gap - proceeds exceed needs by 25%+": 4,
                "Small gap - within 10% of needs": 3,
                "Moderate gap - 10-25% short": 2,
                "Large gap - more than 25% short": 1
              }
            },
            {
              name: "Current Asset Security",
              weight: 0.25,
              scoring: {
                "5+ years expenses in liquid assets": 4,
                "2-5 years expenses in liquid assets": 3,
                "1-2 years expenses in liquid assets": 2,
                "Less than 1 year expenses": 1
              }
            },
            {
              name: "Income Flexibility", 
              weight: 0.25,
              scoring: {
                "Multiple income sources, low business dependence": 4,
                "Some other income, moderate business dependence": 3,
                "Limited other income, high business dependence": 2,
                "Complete business income dependence": 1
              }
            },
            {
              name: "Debt Obligations",
              weight: 0.20,
              scoring: {
                "Minimal debt, strong credit position": 4,
                "Manageable debt levels": 3,
                "Moderate debt requiring attention": 2,
                "High debt creating exit pressure": 1
              }
            }
          ]
        },
        {
          factor: "Business Value Enhancement Potential",
          weight: 0.35,
          subfactors: [
            {
              name: "Owner Dependency Reduction", 
              weight: 0.35,
              scoring: {
                "Low dependency - business runs independently": 4,
                "Moderate dependency - some improvement possible": 3,
                "High dependency - significant improvement potential": 2, 
                "Critical dependency - major work required": 1
              }
            },
            {
              name: "Financial Performance Optimization",
              weight: 0.25,
              scoring: {
                "Strong performance - limited improvement potential": 4,
                "Good performance - some optimization possible": 3,
                "Average performance - significant improvement potential": 2,
                "Poor performance - major improvement required": 1
              }
            },
            {
              name: "Market Position Strengthening",
              weight: 0.25,
              scoring: {
                "Market leader - strong position": 4,
                "Strong position - some growth potential": 3, 
                "Average position - significant improvement possible": 2,
                "Weak position - major improvement required": 1
              }
            },
            {
              name: "Operational Efficiency Gains",
              weight: 0.15,
              scoring: {
                "Highly efficient - minimal improvement potential": 4,
                "Efficient - some optimization possible": 3,
                "Average efficiency - good improvement potential": 2,
                "Inefficient - major improvement opportunity": 1
              }
            }
          ]
        },
        {
          factor: "Timeline Flexibility",
          weight: 0.25, 
          subfactors: [
            {
              name: "Personal Timeline Pressure",
              weight: 0.40,
              scoring: {
                "No pressure - completely flexible timing": 4,
                "Low pressure - prefer certain timeframe": 3,
                "Moderate pressure - somewhat time sensitive": 2,
                "High pressure - must exit by specific date": 1
              }
            },
            {
              name: "Market Timing Factors",
              weight: 0.30,
              scoring: {
                "Excellent market conditions for exit": 4,
                "Good market conditions": 3,
                "Average market conditions": 2,
                "Poor market conditions for exit": 1
              }
            },
            {
              name: "Health & Age Considerations",
              weight: 0.30,
              scoring: {
                "No health/age pressures": 4,
                "Minor considerations": 3,
                "Moderate time sensitivity": 2,
                "Urgent health/age factors": 1
              }
            }
          ]
        }
      ],
      
      strategicRecommendations: {
        greenLight: {
          criteria: "Score 85+",
          recommendation: "Proceed with exit planning - excellent position",
          actions: ["Optimize exit timing", "Maximize transaction terms", "Plan tax strategies"]
        },
        yellowCaution: {
          criteria: "Score 65-84",
          recommendation: "Address specific gaps before proceeding",
          actions: ["Focus on identified weakness areas", "Set 6-18 month improvement timeline", "Monitor progress monthly"]
        },
        redStop: {
          criteria: "Score below 65",
          recommendation: "Significant preparation required before exit",
          actions: ["Implement comprehensive value improvement plan", "Extend timeline 2-5 years", "Focus on fundamental business strengthening"]
        }
      }
    }
  },

  // MEETING #3: BUSINESS READINESS & MANAGEMENT ASSESSMENT
  meeting3: {
    title: "Meeting #3: Business Readiness & Management Assessment",
    subtitle: "Owner Centricity Analysis & Management Succession Planning",
    duration: "90-120 minutes",
    prerequisites: ["Financial analysis completed", "Owner Centricity Quiz completed"],
    objectives: [
      "Complete comprehensive Owner Centricity assessment across 8 business functions",
      "Evaluate management team depth and succession readiness",
      "Identify specific value enhancement opportunities and ROI projections", 
      "Create management development and succession timeline",
      "Assess business transferability and buyer attractiveness"
    ],

    // Comprehensive Owner Centricity Assessment (Based on Excel Tool)
    ownerCentricityAssessment: {
      title: "Professional Owner Centricity Analysis",
      description: "Detailed evaluation of business dependency on owner involvement across 8 critical functions",
      scoringMethodology: "Weighted scoring system with industry benchmarks and best practices",
      
      functionalAreas: [
        {
          area: "Sales & Customer Management",
          weight: 0.25,
          description: "Customer relationships, sales process, and revenue generation",
          questions: [
            {
              id: "customer_relationships_primary",
              question: "Who maintains primary relationships with your top 10 customers?",
              type: "matrix",
              customers: "Top 10 customers by revenue",
              options: ["Owner exclusively", "Owner primary, team backup", "Team primary, owner backup", "Team exclusively"],
              scoring: [1, 2, 3, 4]
            },
            {
              id: "sales_process_documentation",
              question: "How documented and systematized is your sales process?",
              type: "detailed_select",
              options: [
                {
                  text: "Fully documented CRM system with standardized processes",
                  score: 4,
                  description: "Complete sales playbook, documented processes, CRM tracking"
                },
                {
                  text: "Good documentation with minor gaps",
                  score: 3,
                  description: "Most processes documented, some informal procedures"
                },
                {
                  text: "Basic documentation, relies heavily on experience", 
                  score: 2,
                  description: "Minimal documentation, experienced-based selling"
                },
                {
                  text: "Mostly undocumented, owner-dependent",
                  score: 1,
                  description: "Little documentation, success depends on owner knowledge"
                }
              ]
            },
            {
              id: "new_customer_acquisition",
              question: "Who is responsible for new customer acquisition?",
              type: "detailed_select",
              options: [
                { text: "Dedicated sales team with proven track record", score: 4 },
                { text: "Sales team with owner oversight", score: 3 },
                { text: "Owner primary with team support", score: 2 },
                { text: "Owner handles all new customer development", score: 1 }
              ]
            }
          ],
          improvementOpportunities: [
            {
              opportunity: "Implement comprehensive CRM system",
              impact: "High", 
              timeline: "3-6 months",
              investmentRequired: "$10,000-$50,000",
              valueIncrease: "10-15%",
              description: "Systematize customer relationships and reduce owner dependency"
            },
            {
              opportunity: "Develop sales team capabilities",
              impact: "High",
              timeline: "6-12 months", 
              investmentRequired: "$50,000-$150,000",
              valueIncrease: "15-25%",
              description: "Train existing team or hire experienced sales professionals"
            }
          ]
        },
        {
          area: "Operations & Production",
          weight: 0.20,
          description: "Daily operations, quality control, and production management",
          questions: [
            {
              id: "operations_management",
              question: "Who manages daily operations when you're away for extended periods?",
              type: "detailed_select",
              options: [
                { text: "Operations manager handles everything smoothly", score: 4 },
                { text: "Manager handles most things, occasional owner consultation", score: 3 },
                { text: "Manager handles routine, owner required for problems", score: 2 },
                { text: "Operations struggle significantly when owner absent", score: 1 }
              ]
            },
            {
              id: "quality_control_systems",
              question: "How are quality standards maintained and monitored?",
              type: "detailed_select",
              options: [
                { text: "Systematic quality management with documented procedures", score: 4 },
                { text: "Good systems with regular owner oversight", score: 3 },
                { text: "Basic systems requiring owner involvement", score: 2 },
                { text: "Quality control depends primarily on owner presence", score: 1 }
              ]
            },
            {
              id: "vendor_management",
              question: "Who manages key vendor and supplier relationships?",
              type: "detailed_select",
              options: [
                { text: "Purchasing manager with established vendor relationships", score: 4 },
                { text: "Team manages routine, owner handles strategic vendors", score: 3 },
                { text: "Owner primary contact with team support", score: 2 },
                { text: "Owner maintains all critical vendor relationships", score: 1 }
              ]
            }
          ]
        },
        {
          area: "Financial Management & Controls",
          weight: 0.20,
          description: "Financial reporting, cash management, and fiscal controls",
          questions: [
            {
              id: "financial_reporting_responsibility",
              question: "Who prepares and analyzes monthly financial reports?",
              type: "detailed_select",
              options: [
                { text: "CFO/Controller produces comprehensive management reports", score: 4 },
                { text: "Bookkeeper prepares, owner analyzes and interprets", score: 3 },
                { text: "Owner compiles and analyzes most financial information", score: 2 },
                { text: "Owner handles most financial management personally", score: 1 }
              ]
            },
            {
              id: "cash_management_decisions",
              question: "Who makes cash management and investment decisions?",
              type: "detailed_select",
              options: [
                { text: "Financial manager with established policies and limits", score: 4 },
                { text: "Team makes routine decisions, owner approves major ones", score: 3 },
                { text: "Owner makes most significant financial decisions", score: 2 },
                { text: "All financial decisions require owner approval", score: 1 }
              ]
            },
            {
              id: "banking_relationships",
              question: "Who maintains banking and credit relationships?",
              type: "detailed_select", 
              options: [
                { text: "CFO/Manager maintains all banking relationships", score: 4 },
                { text: "Team manages routine, owner handles strategic banking", score: 3 },
                { text: "Owner primary contact with team backup", score: 2 },
                { text: "Owner exclusively manages all banking relationships", score: 1 }
              ]
            }
          ]
        },
        {
          area: "Strategic Decision Making",
          weight: 0.25,
          description: "Strategic planning, major decisions, and business direction",
          questions: [
            {
              id: "strategic_planning_involvement",
              question: "Who participates in strategic planning and major business decisions?",
              type: "detailed_select",
              options: [
                { text: "Management team leads strategic planning process", score: 4 },
                { text: "Management team participates actively, owner guides direction", score: 3 },
                { text: "Owner leads planning with management input", score: 2 },
                { text: "Owner makes all strategic decisions with minimal input", score: 1 }
              ]
            },
            {
              id: "problem_solving_authority",
              question: "When significant operational problems arise, who resolves them?",
              type: "detailed_select",
              options: [
                { text: "Management team resolves most issues independently", score: 4 },
                { text: "Management handles routine issues, escalates complex problems", score: 3 },
                { text: "Owner involved in resolving most significant problems", score: 2 },
                { text: "All significant problems come directly to owner", score: 1 }
              ]
            }
          ]
        },
        {
          area: "External Relationships",
          weight: 0.10,
          description: "Professional relationships with advisors, regulators, and industry contacts",
          questions: [
            {
              id: "professional_relationships",
              question: "Who manages relationships with attorneys, accountants, bankers, and consultants?",
              type: "detailed_select",
              options: [
                { text: "Designated managers maintain each professional relationship", score: 4 },
                { text: "Team involved, owner maintains primary contact", score: 3 },
                { text: "Owner primary contact with team support", score: 2 },
                { text: "Owner exclusively manages all professional relationships", score: 1 }
              ]
            }
          ]
        }
      ],

      scoringAndAnalysis: {
        excellentRange: { min: 85, max: 100, valueMultiple: 1.2, description: "Business demonstrates exceptional independence" },
        goodRange: { min: 70, max: 84, valueMultiple: 1.1, description: "Strong business systems with minor dependencies" },
        averageRange: { min: 55, max: 69, valueMultiple: 1.0, description: "Moderate owner dependency affecting value" },
        concerningRange: { min: 40, max: 54, valueMultiple: 0.85, description: "High owner dependency significantly impacting value" },
        criticalRange: { min: 0, max: 39, valueMultiple: 0.7, description: "Critical owner dependency severely limiting exit options" }
      }
    }
  },

  // MEETING #4: PERSONAL READINESS & VISION DEVELOPMENT
  meeting4: {
    title: "Meeting #4: Personal Readiness & Life After Business Planning",
    subtitle: "Identity Transition, Purpose Development & Lifestyle Design",
    duration: "120 minutes",
    prerequisites: ["Business assessment completed", "Financial analysis reviewed"],
    objectives: [
      "Complete comprehensive personal vision development across 7 life dimensions",
      "Address identity transition from business owner to next life phase",
      "Design detailed post-exit lifestyle and activity plans",
      "Ensure personal goals align with business exit strategy and timeline",
      "Create personal development and preparation action items"
    ],

    // Comprehensive Personal Vision Development (Based on Excel Tool)
    personalVisionSystem: {
      title: "Life After Business: Comprehensive Vision Development",
      description: "Systematic approach to designing your ideal post-business life across all dimensions",
      
      visionDimensions: [
        {
          dimension: "Financial Security & Lifestyle",
          priority: "Critical",
          weight: 0.25,
          assessmentAreas: [
            {
              area: "Income Requirements Analysis",
              questions: [
                {
                  id: "lifestyle_maintenance",
                  question: "Do you want to maintain, increase, or decrease your current lifestyle?",
                  type: "select",
                  options: ["Significantly increase (25%+)", "Moderately increase (10-25%)", "Maintain current level", "Moderately decrease (10-25%)", "Significantly decrease (25%+)"],
                  required: true
                },
                {
                  id: "geographic_lifestyle",
                  question: "Where do you plan to live and what are the cost implications?",
                  type: "select",
                  options: ["Same location - same costs", "Different location - lower costs", "Different location - similar costs", "Different location - higher costs", "Multiple locations - higher costs"],
                  required: true
                },
                {
                  id: "major_lifestyle_changes",
                  question: "What major lifestyle changes do you anticipate?",
                  type: "multiselect",
                  options: ["More travel", "New home/location", "More family time", "New hobbies/interests", "Educational pursuits", "Volunteer work", "New business ventures", "Increased charitable giving"],
                  required: true
                }
              ]
            },
            {
              area: "Financial Risk Tolerance Assessment",
              questions: [
                {
                  id: "investment_approach",
                  question: "What investment approach aligns with your personality and needs?",
                  type: "select",
                  options: [
                    "Very conservative - preserve capital above all",
                    "Conservative - modest growth with capital protection", 
                    "Moderate - balanced growth and security",
                    "Growth-oriented - accept volatility for higher returns",
                    "Aggressive - maximize long-term returns"
                  ],
                  required: true
                },
                {
                  id: "spending_flexibility",
                  question: "How flexible are you with spending if investment returns are poor?",
                  type: "select",
                  options: ["Very flexible - can cut expenses significantly", "Somewhat flexible - minor adjustments possible", "Limited flexibility - fixed lifestyle needs", "No flexibility - must maintain current spending"],
                  required: true
                }
              ]
            }
          ]
        },
        {
          dimension: "Activity & Engagement",
          priority: "High",
          weight: 0.20,
          assessmentAreas: [
            {
              area: "Work & Business Involvement",
              questions: [
                {
                  id: "work_involvement_desired",
                  question: "What level of work involvement do you want post-exit?",
                  type: "select",
                  options: [
                    "Complete retirement - no work involvement",
                    "Occasional consulting - very part-time",
                    "Regular consulting/advisory roles",
                    "Part-time work in same industry",
                    "Board positions with other companies",
                    "Start new business or venture",
                    "Teach/mentor others"
                  ],
                  required: true
                },
                {
                  id: "intellectual_stimulation",
                  question: "What will provide intellectual stimulation and challenge?",
                  type: "multiselect",
                  options: ["Continued learning/education", "Teaching others", "Writing/speaking", "Consulting work", "Investment management", "Volunteer leadership", "Creative pursuits", "Sports/competition"],
                  required: true
                }
              ]
            },
            {
              area: "Social & Community Engagement",
              questions: [
                {
                  id: "social_needs",
                  question: "How important is maintaining your current social and professional network?",
                  type: "select",
                  options: ["Extremely important - want to maintain all connections", "Very important - maintain most connections", "Moderately important - maintain key relationships", "Somewhat important - quality over quantity", "Not important - ready for completely new social circle"],
                  required: true
                },
                {
                  id: "community_involvement",
                  question: "What level of community involvement appeals to you?",
                  type: "select", 
                  options: ["Very active - leadership roles", "Active - regular participation", "Moderate - selective involvement", "Minimal - occasional participation", "None - focus on personal interests"],
                  required: true
                }
              ]
            }
          ]
        },
        {
          dimension: "Identity & Purpose",
          priority: "Critical",
          weight: 0.25, 
          assessmentAreas: [
            {
              area: "Identity Transition Planning",
              questions: [
                {
                  id: "identity_concerns",
                  question: "How concerned are you about losing your identity as a business owner?",
                  type: "select",
                  options: ["Very concerned - major worry", "Somewhat concerned", "Moderately concerned", "Slightly concerned", "Not concerned - ready for change"],
                  required: true
                },
                {
                  id: "new_identity_vision",
                  question: "How do you want to be known and introduced after selling your business?",
                  type: "textarea",
                  required: true,
                  helpText: "Think about how you want to introduce yourself at social events, networking, etc."
                },
                {
                  id: "skills_transfer",
                  question: "Which business skills do you want to continue using?",
                  type: "multiselect",
                  options: ["Leadership and management", "Strategic thinking", "Problem solving", "Relationship building", "Financial analysis", "Industry expertise", "Teaching/mentoring", "Innovation/creativity"],
                  required: true
                }
              ]
            },
            {
              area: "Purpose & Meaning Development",
              questions: [
                {
                  id: "life_purpose_post_business",
                  question: "What will give your life primary meaning and purpose after the business?",
                  type: "textarea", 
                  required: true,
                  helpText: "Think deeply about what will motivate and fulfill you long-term"
                },
                {
                  id: "legacy_priorities",
                  question: "What legacy do you want to create beyond business success?",
                  type: "multiselect",
                  options: ["Family wealth and security", "Community impact", "Industry advancement", "Educational contributions", "Charitable causes", "Environmental stewardship", "Mentoring next generation", "Cultural contributions"],
                  required: true
                }
              ]
            }
          ]
        },
        {
          dimension: "Health & Wellness",
          priority: "High",
          weight: 0.15,
          assessmentAreas: [
            {
              area: "Physical Health Planning",
              questions: [
                {
                  id: "health_goals",
                  question: "What health and fitness goals do you have for your post-business life?",
                  type: "multiselect",
                  options: ["Improve fitness level", "Address health issues", "Reduce stress", "More active lifestyle", "Better nutrition", "Regular medical care", "Mental health focus", "Preventive care"],
                  required: true
                },
                {
                  id: "healthcare_planning",
                  question: "How will you handle healthcare coverage post-exit?",
                  type: "select",
                  options: ["Medicare eligible", "Spouse's coverage", "Private insurance", "ACA marketplace", "Not sure yet"],
                  required: true
                }
              ]
            }
          ]
        },
        {
          dimension: "Relationships & Family",
          priority: "High", 
          weight: 0.15,
          assessmentAreas: [
            {
              area: "Family Relationship Goals",
              questions: [
                {
                  id: "family_time_priorities",
                  question: "How do you want to change your family time and relationships?",
                  type: "textarea",
                  required: true,
                  helpText: "Consider spouse, children, grandchildren, extended family"
                },
                {
                  id: "family_activities",
                  question: "What family activities are most important to you?",
                  type: "multiselect",
                  options: ["Daily time with spouse", "Regular time with children", "Active grandparent role", "Family travel", "Family traditions", "Extended family relationships", "Family business involvement"],
                  required: true
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // MEETING #5: ACTION PLANNING & IMPLEMENTATION
  meeting5: {
    title: "Meeting #5: Comprehensive Action Planning & Implementation Strategy", 
    subtitle: "SMART Goal Development, Priority Matrix, & Implementation Roadmap",
    duration: "120 minutes",
    prerequisites: ["All assessments completed", "Personal vision finalized"],
    objectives: [
      "Transform all assessment findings into specific, actionable SMART goals",
      "Create priority matrix balancing impact, urgency, resources, and complexity",
      "Develop detailed implementation timeline with 90-day, 6-month, annual, and multi-year milestones",
      "Assign clear accountability and resource requirements for each action item",
      "Establish monitoring, reporting, and adjustment processes for ongoing success"
    ],

    // Advanced SMART Goals Development System
    smartGoalsSystem: {
      title: "SMART Goals Development & Implementation Framework",
      description: "Transform exit planning objectives into specific, measurable, achievable, relevant, time-bound goals",
      
      goalCategories: [
        {
          category: "Business Value Enhancement Goals",
          priority: "Critical",
          typicalGoals: [
            {
              template: "Reduce Owner Centricity",
              smartFramework: {
                specific: "Reduce owner centricity score from [current] to [target] by developing management team capabilities",
                measurable: "Owner Centricity Assessment score improvement",
                achievable: "Based on management team development and process documentation",
                relevant: "Directly impacts business value and exit options",
                timeBound: "[12-24] month timeline with quarterly milestones"
              },
              implementation: {
                "90DayActions": ["Hire operations manager", "Begin management training program", "Document critical processes"],
                "6MonthMilestones": ["New manager fully trained", "50% of processes documented", "Owner involvement reduced 30%"],
                "AnnualTargets": ["Owner centricity score improved by 20 points", "Management team operates independently", "Documented succession plans complete"]
              }
            },
            {
              template: "Increase Financial Performance",
              smartFramework: {
                specific: "Increase EBITDA from $[current] to $[target] through [specific strategies]",
                measurable: "EBITDA growth percentage and absolute dollars",
                achievable: "Based on market analysis and operational improvements",
                relevant: "Directly increases business valuation",
                timeBound: "[timeline] with quarterly progress reviews"
              }
            }
          ]
        },
        {
          category: "Personal Readiness Goals",
          priority: "High",
          typicalGoals: [
            {
              template: "Develop Post-Exit Identity",
              smartFramework: {
                specific: "Establish new professional identity through [specific activities]",
                measurable: "Completion of identity development milestones",
                achievable: "Based on personal interests and capabilities", 
                relevant: "Essential for successful life transition",
                timeBound: "Begin 12-18 months before exit"
              }
            },
            {
              template: "Build Financial Security",
              smartFramework: {
                specific: "Achieve financial independence with $[amount] in exit proceeds plus $[amount] in personal assets",
                measurable: "Total asset accumulation and income replacement capability",
                achievable: "Based on business value improvement and personal savings",
                relevant: "Enables confident exit without financial stress",
                timeBound: "Target exit date of [date]"
              }
            }
          ]
        }
      ]
    },

    // Advanced Priority Matrix System
    priorityMatrixSystem: {
      title: "Multi-Criteria Priority Matrix & Resource Allocation",
      description: "Sophisticated prioritization system balancing impact, urgency, resources, and risk",
      
      evaluationCriteria: [
        {
          criterion: "Business Value Impact",
          weight: 0.35,
          description: "How much will this action increase business value?",
          scale: {
            4: "Major value increase (15%+ business value improvement)",
            3: "Moderate value increase (5-15% improvement)", 
            2: "Minor value increase (1-5% improvement)",
            1: "Minimal value impact (<1% improvement)"
          }
        },
        {
          criterion: "Urgency & Timeline Sensitivity",
          weight: 0.25,
          description: "How time-sensitive is this action?",
          scale: {
            4: "Must complete in next 90 days - critical timing",
            3: "Should complete within 6 months - important timing",
            2: "Should complete within 1 year - moderate timing",
            1: "Can wait longer than 1 year - flexible timing"
          }
        },
        {
          criterion: "Resource Investment Required",
          weight: 0.20,
          description: "What level of resources (time, money, effort) is required?",
          scale: {
            4: "Minimal resources - easy to implement",
            3: "Moderate resources - manageable investment",
            2: "Significant resources - substantial investment", 
            1: "Major resources - very large investment"
          }
        },
        {
          criterion: "Implementation Complexity & Risk",
          weight: 0.20,
          description: "How complex and risky is implementation?",
          scale: {
            4: "Low complexity - straightforward implementation",
            3: "Moderate complexity - manageable challenges",
            2: "High complexity - significant challenges", 
            1: "Very high complexity - major implementation risks"
          }
        }
      ],

      priorityCategories: [
        {
          category: "Priority 1: Critical & Immediate (Score 13-16)",
          timeline: "Next 90 days",
          description: "High impact, urgent, manageable complexity - must start immediately",
          color: "red",
          resourceAllocation: "50% of available resources",
          managementLevel: "Direct owner oversight required"
        },
        {
          category: "Priority 2: Important & Near-term (Score 10-12)", 
          timeline: "Next 3-6 months",
          description: "Good impact, moderate urgency - important for success",
          color: "orange",
          resourceAllocation: "30% of available resources", 
          managementLevel: "Delegable with owner involvement"
        },
        {
          category: "Priority 3: Valuable & Medium-term (Score 7-9)",
          timeline: "6-18 months",
          description: "Moderate impact, important for long-term success",
          color: "yellow",
          resourceAllocation: "15% of available resources",
          managementLevel: "Fully delegable"
        },
        {
          category: "Priority 4: Future Considerations (Score 4-6)",
          timeline: "18+ months or conditional",
          description: "Lower immediate impact - future planning",
          color: "green", 
          resourceAllocation: "5% of available resources",
          managementLevel: "Monitor and reassess quarterly"
        }
      ]
    }
  }
};

// Comprehensive calculation and analysis functions
export const calculateOwnerCentricityScore = (responses) => {
  let totalScore = 0;
  let maxScore = 0;
  
  meetings2to5Content.meeting3.ownerCentricityAssessment.functionalAreas.forEach(area => {
    area.questions.forEach(question => {
      const response = responses[question.id];
      if (response) {
        totalScore += response.score * area.weight;
        maxScore += 4 * area.weight;
      }
    });
  });
  
  return Math.round((totalScore / maxScore) * 100);
};

export const generatePersonalizedRecommendations = (assessmentScores, userGoals) => {
  // Generate customized recommendations based on assessment results
  const recommendations = [];
  
  // Business readiness recommendations
  if (assessmentScores.ownerCentricity < 70) {
    recommendations.push({
      category: "Management Development",
      priority: "High",
      action: "Develop management team to reduce owner dependency",
      timeline: "6-12 months",
      expectedImpact: "15-25% value increase"
    });
  }
  
  // Personal readiness recommendations
  if (assessmentScores.personalReadiness < 80) {
    recommendations.push({
      category: "Personal Development", 
      priority: "High",
      action: "Complete personal vision and identity transition planning",
      timeline: "3-6 months",
      expectedImpact: "Improved exit satisfaction and success"
    });
  }
  
  return recommendations;
};