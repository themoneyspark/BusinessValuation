// KGOB Meeting #4: Personal Readiness & Life After Business
// Interactive content based on ExpressWL 4.1 Personal Readiness tools

export const meeting4Content = {
  title: "Meeting #4: Personal Readiness & Life After Business",
  description: "Define your personal vision, identity, and purpose beyond business ownership",
  duration: "90 minutes",
  objectives: [
    "Develop clear vision for life after business ownership",
    "Address identity transition from business owner to next phase",
    "Plan activities, interests, and purpose for post-exit life", 
    "Ensure personal goals align with exit strategy and timeline"
  ],

  // Personal Vision Development Tool
  personalVision: {
    title: "Life After Business Vision Builder",
    description: "Interactive tool to help define and prioritize your post-exit life goals",
    visionAreas: [
      {
        category: "Financial Lifestyle",
        icon: "DollarSign",
        questions: [
          {
            id: "income_needs",
            question: "What annual income do you need to live comfortably?",
            type: "currency",
            helpText: "Consider your current expenses and desired lifestyle changes"
          },
          {
            id: "major_purchases",
            question: "Are there major purchases you plan after exiting?",
            type: "multiselect",
            options: ["New home", "Vacation home", "Travel/experiences", "Charitable giving", "Family support", "New business ventures", "Other investments"]
          },
          {
            id: "risk_tolerance",
            question: "How do you feel about investment risk with your exit proceeds?",
            type: "select",
            options: ["Very conservative - preserve capital", "Somewhat conservative - modest growth", "Moderate - balanced approach", "Somewhat aggressive - growth focused", "Very aggressive - maximum returns"]
          }
        ]
      },
      {
        category: "Activity & Engagement", 
        icon: "Target",
        questions: [
          {
            id: "activity_level",
            question: "How active do you want to be in your post-exit life?",
            type: "select",
            options: ["Very active - full schedule of activities", "Active - regular engagement but some downtime", "Moderate - balance of activity and relaxation", "Relaxed - minimal commitments", "Fully retired - leisure focused"]
          },
          {
            id: "work_involvement",
            question: "Do you want any ongoing involvement with work or business?",
            type: "select", 
            options: ["No work involvement - complete retirement", "Consulting/advisory roles", "Part-time work in same field", "Start new business/venture", "Board positions", "Volunteer leadership roles"]
          },
          {
            id: "interests_hobbies",
            question: "What activities or interests do you want to pursue?",
            type: "multiselect",
            options: ["Travel and exploration", "Sports and fitness", "Arts and creativity", "Learning and education", "Volunteering and service", "Family time", "Outdoor activities", "Collecting or investing", "Writing or speaking"]
          }
        ]
      },
      {
        category: "Identity & Purpose",
        icon: "User", 
        questions: [
          {
            id: "identity_beyond_business",
            question: "How do you want to be known after selling your business?",
            type: "textarea",
            helpText: "Think about how you want to introduce yourself and what you want to be remembered for"
          },
          {
            id: "legacy_goals",
            question: "What legacy do you want to leave through your business?",
            type: "multiselect",
            options: ["Employee career development", "Community economic impact", "Family wealth building", "Industry innovation", "Charitable contributions", "Mentoring next generation", "Environmental stewardship"]
          },
          {
            id: "purpose_post_exit",
            question: "What will give your life meaning and purpose after the business?",
            type: "textarea",
            helpText: "Consider what will motivate and fulfill you in your next life phase"
          }
        ]
      },
      {
        category: "Relationships & Family",
        icon: "Users",
        questions: [
          {
            id: "family_time",
            question: "How important is spending more time with family?",
            type: "select",
            options: ["Extremely important - top priority", "Very important - major factor", "Moderately important", "Somewhat important", "Not a major factor"]
          },
          {
            id: "geographic_preferences",
            question: "Do you plan to change where you live?",
            type: "select",
            options: ["Stay in current location", "Move to different city/state", "Move closer to family", "Multiple residences", "Undecided"]
          },
          {
            id: "family_business_roles",
            question: "How do you envision family members' relationship with the business post-exit?",
            type: "textarea",
            helpText: "Consider ongoing family involvement, employment, or ownership"
          }
        ]
      }
    ]
  },

  // Personal Readiness Exercises (Interactive)
  personalReadinessExercises: {
    title: "Personal Readiness Assessment & Planning Exercises",
    description: "Comprehensive exercises to evaluate and plan your personal transition",
    exercises: [
      {
        name: "Identity Transition Exercise",
        description: "Explore how your identity will change from business owner to your next phase",
        steps: [
          {
            step: 1,
            instruction: "List 10 ways you currently introduce yourself or are known",
            example: "I'm the owner of ABC Company, I run a manufacturing business, etc."
          },
          {
            step: 2,
            instruction: "Imagine introducing yourself 2 years after selling. Write 5 different introductions",
            example: "I'm a retired business owner who now focuses on... I'm passionate about... I spend my time..."
          },
          {
            step: 3,
            instruction: "Identify which aspects of your current identity you want to maintain",
            example: "Leadership skills, industry knowledge, business relationships"
          },
          {
            step: 4,
            instruction: "Plan how to maintain those aspects in your post-business life",
            example: "Board positions, consulting, mentoring, speaking"
          }
        ]
      },
      {
        name: "Activity Planning Exercise",
        description: "Design your ideal week and year for life after business",
        steps: [
          {
            step: 1,
            instruction: "Design your ideal typical week - hour by hour schedule",
            categories: ["Work/Business", "Family/Relationships", "Health/Fitness", "Hobbies/Interests", "Learning/Growth", "Service/Giving"]
          },
          {
            step: 2, 
            instruction: "Plan your ideal year - seasonal activities and major goals",
            considerations: ["Travel plans", "Family events", "Personal projects", "Health goals", "Learning objectives"]
          },
          {
            step: 3,
            instruction: "Identify what preparation is needed for these activities",
            example: "Skills to develop, resources to acquire, relationships to build"
          }
        ]
      },
      {
        name: "Purpose Discovery Exercise",
        description: "Identify what will give your life meaning and direction post-exit",
        questions: [
          "What work or activities have given you the most satisfaction in life?",
          "What problems in the world do you wish you could help solve?",
          "What would you regret not doing if you only had 10 years left?",
          "How do you want to be remembered by your family and community?",
          "What unique talents or experiences could you share with others?"
        ],
        reflection: "Based on your answers, what themes emerge about your core values and desired impact?"
      }
    ]
  },

  // Personal Financial Planning Calculator
  personalFinancialCalculator: {
    title: "Personal Financial Readiness Calculator", 
    description: "Calculate your complete financial picture and post-exit income needs",
    sections: [
      {
        category: "Current Financial Position",
        inputs: [
          {
            id: "retirement_accounts",
            label: "Total Retirement Accounts (401k, IRA, etc.)",
            type: "currency"
          },
          {
            id: "investment_accounts", 
            label: "Investment Accounts (non-retirement)",
            type: "currency"
          },
          {
            id: "real_estate_equity",
            label: "Real Estate Equity (home, investment property)",
            type: "currency"
          },
          {
            id: "cash_savings",
            label: "Cash and Cash Equivalents",
            type: "currency"
          },
          {
            id: "other_assets",
            label: "Other Assets (business interests, collections, etc.)",
            type: "currency"
          },
          {
            id: "total_debt",
            label: "Total Personal Debt",
            type: "currency"
          }
        ]
      },
      {
        category: "Post-Exit Lifestyle Planning",
        inputs: [
          {
            id: "housing_costs",
            label: "Annual Housing Costs",
            type: "currency",
            helpText: "Mortgage/rent, taxes, insurance, utilities, maintenance"
          },
          {
            id: "living_expenses",
            label: "Annual Living Expenses",
            type: "currency",
            helpText: "Food, clothing, personal care, entertainment"
          },
          {
            id: "healthcare_costs",
            label: "Annual Healthcare Costs",
            type: "currency", 
            helpText: "Insurance premiums, out-of-pocket medical expenses"
          },
          {
            id: "travel_recreation",
            label: "Annual Travel & Recreation",
            type: "currency"
          },
          {
            id: "family_support",
            label: "Annual Family Support",
            type: "currency",
            helpText: "Support for children, grandchildren, aging parents"
          },
          {
            id: "charitable_giving",
            label: "Annual Charitable Giving",
            type: "currency"
          }
        ]
      }
    ],
    calculations: {
      netWorth: "Total Assets - Total Debt",
      annualNeeds: "Sum of all annual expense categories", 
      capitalNeeded: "Annual Needs ÷ Safe Withdrawal Rate (4%)",
      wealthGap: "Capital Needed - (Net Worth + Business Proceeds)",
      yearsOfSecurity: "(Net Worth + Business Proceeds) ÷ Annual Needs"
    }
  },

  // Knowledge Quiz for Personal Readiness
  personalReadinessQuiz: [
    {
      id: 1,
      question: "What percentage of business owners report being unhappy one year after their exit?",
      options: [
        { text: "25%", correct: false },
        { text: "50%", correct: false },
        { text: "75%", correct: true },
        { text: "90%", correct: false }
      ],
      explanation: "Studies show 75% of business owners experience depression and regret after exiting, primarily due to lack of personal planning.",
      category: "Personal Planning Importance"
    },
    {
      id: 2,
      question: "What is the most common reason business owners struggle after exiting?",
      options: [
        { text: "Not enough money", correct: false },
        { text: "Loss of identity and purpose", correct: true },
        { text: "Family conflicts", correct: false },
        { text: "Buyer's remorse", correct: false }
      ],
      explanation: "The most common struggle is identity transition - going from being the boss to being retired can be very challenging without proper preparation.",
      category: "Identity Transition"
    }
  ]
};