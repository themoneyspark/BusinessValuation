// KGOB Exit Planning Knowledge Base - Branded Content Library
// Based on ExpressWL 4.1 System, customized for Kohari Gonzalez CPAs & Advisors

export const exitPlanningContent = {
  // FREE TIER - Introduction & Basic Concepts
  free: [
    {
      id: 'ep-intro-101',
      title: 'Exit Planning Fundamentals: Your Journey to Success',
      category: 'exit-planning',
      tier: 'Free',
      format: 'guide',
      readTime: '8 min read',
      excerpt: 'Discover the essential framework for successful business exit planning and why 83% of business owners who plan their exit achieve their goals.',
      content: {
        overview: 'Exit planning is not just about selling your business—it\'s about creating a roadmap to achieve your personal and financial goals while maximizing business value.',
        keyPoints: [
          'Understanding the 5-Phase Exit Planning Process',
          'Why 70% of unplanned exits fail to meet owner expectations',
          'The critical importance of stakeholder alignment',
          'How proper planning can increase business value by 20-40%'
        ],
        process: [
          {
            phase: 'Phase 1: Stakeholder Assessment',
            description: 'Identify all parties who will be influenced by your exit decisions',
            duration: 'Meeting #1'
          },
          {
            phase: 'Phase 2: Financial Readiness Review', 
            description: 'Analyze your current financial position and determine your wealth gap',
            duration: 'Meeting #2'
          },
          {
            phase: 'Phase 3: Business Readiness Evaluation',
            description: 'Assess owner dependency and management team capabilities',
            duration: 'Meeting #3'
          }
        ]
      },
      tags: ['exit planning', 'fundamentals', 'business value', 'succession']
    },
    {
      id: 'ep-readiness-check',
      title: 'Exit Readiness Self-Assessment', 
      category: 'exit-planning',
      tier: 'Free',
      format: 'assessment',
      readTime: '10 min',
      excerpt: 'Quick 15-question assessment to evaluate your current exit readiness across key business dimensions.',
      content: {
        introduction: 'This assessment helps you understand where your business stands today and what areas need attention for a successful exit.',
        questions: [
          {
            category: 'Business Independence',
            question: 'Could your business operate successfully for 3+ months without your daily involvement?',
            options: ['Yes, completely', 'Mostly, with occasional check-ins', 'Some areas need me', 'Business depends heavily on me']
          },
          {
            category: 'Financial Performance',
            question: 'Are your financial records audit-ready and consistently maintained?',
            options: ['Yes, professionally maintained', 'Good but some gaps', 'Adequate for operations', 'Needs significant improvement']
          },
          {
            category: 'Management Team',
            question: 'Do you have a management team capable of running daily operations?',
            options: ['Strong team in place', 'Good team, some gaps', 'Limited management depth', 'Heavily dependent on me']
          }
        ],
        scoring: {
          '12-15': 'Excellent - Your business shows strong exit readiness',
          '8-11': 'Good - Some areas need attention before exit',
          '4-7': 'Developing - Significant preparation required',
          '0-3': 'Early Stage - Substantial value-building needed'
        }
      },
      tags: ['assessment', 'readiness', 'self-evaluation']
    }
  ],

  // BUYER TIER - Structured Process & Tools  
  buyer: [
    {
      id: 'ep-communication-guide',
      title: 'Client Communication Mastery: The 5-Meeting Framework',
      category: 'exit-planning',
      tier: 'Buyer', 
      format: 'guide',
      readTime: '15 min read',
      excerpt: 'Professional communication templates and strategies for guiding business owners through the complete exit planning process.',
      content: {
        overview: 'Master the art of client communication during exit planning with our proven 5-meeting framework, including email templates, meeting agendas, and follow-up strategies.',
        meetings: [
          {
            number: 1,
            title: 'Stakeholder Identification & Business Baseline',
            purpose: 'Identify all parties influenced by exit decisions and establish baseline business metrics',
            preparation: 'Send documentation checklist and schedule stakeholder mapping session',
            keyTopics: ['Stakeholder mapping', 'Business baseline assessment', 'Documentation requirements'],
            homework: 'Complete business documentation checklist',
            followUp: 'Confirm receipt of documents and schedule next meeting'
          },
          {
            number: 2, 
            title: 'Financial Readiness & Wealth Gap Analysis',
            purpose: 'Analyze current financial position and calculate wealth gap',
            preparation: 'Review financial documents and prepare initial valuation estimates',
            keyTopics: ['Financial position assessment', 'Wealth gap calculation', 'Funding scenarios'],
            homework: 'Complete Owner Centricity Quiz at www.OwnerCentricity.com',
            followUp: 'Provide wealth gap summary and next steps'
          },
          {
            number: 3,
            title: 'Business Readiness & Management Assessment', 
            purpose: 'Evaluate owner dependency and management team capabilities',
            preparation: 'Review Owner Centricity results and prepare management recommendations',
            keyTopics: ['Owner centricity analysis', 'Management team depth', 'Operational readiness'],
            homework: 'Review Goals, Vision & Priorities preparation document',
            followUp: 'Provide business readiness summary and improvement recommendations'
          },
          {
            number: 4,
            title: 'Personal Readiness & Life After Business',
            purpose: 'Define personal goals, vision, and post-exit identity',
            preparation: 'Prepare vision exercises and goal-setting frameworks',
            keyTopics: ['Personal vision development', 'Identity beyond business', 'Lifestyle planning'],
            homework: 'Finalize personal vision and prioritize goals',
            followUp: 'Document personal readiness assessment'
          },
          {
            number: 5,
            title: 'Action Plan Development & Implementation',
            purpose: 'Create prioritized action plan with timelines and accountabilities', 
            preparation: 'Compile all assessments into comprehensive action plan',
            keyTopics: ['Priority identification', 'Timeline development', 'Resource allocation'],
            homework: 'Begin implementation of top 3 priorities',
            followUp: 'Schedule quarterly check-ins and provide implementation support'
          }
        ],
        emailTemplates: [
          {
            timing: 'Post-Proposal Acceptance',
            subject: 'Starting Your Exit Planning Journey Right',
            template: `Dear {CLIENT_NAME},

Thank you for choosing Kohari Gonzalez to guide you through your exit planning journey. You've made an excellent decision - business owners who properly plan their exit are 3x more likely to achieve their financial goals.

Our proven 5-meeting process will help you create a comprehensive roadmap tailored to your unique situation and goals.

**Your Next Steps:**
1. Complete the attached Business Documentation Checklist
2. Review the enclosed process overview
3. Prepare for Meeting #1: Stakeholder Assessment (scheduled for {DATE})

During our first meeting, we'll identify all stakeholders who will be influenced by your exit decisions and establish your business baseline. This foundation is critical for making informed decisions throughout the process.

I look forward to working with you to create a successful exit strategy that achieves your personal and financial objectives.

Best regards,
{ADVISOR_NAME}
Kohari Gonzalez CPAs & Advisors
{CONTACT_INFO}`
          },
          {
            timing: 'Pre-Meeting #2',
            subject: 'Homework Assignment #2 - Owner Centricity Assessment',
            template: `Dear {CLIENT_NAME},

Following our productive stakeholder assessment meeting, we're ready to evaluate how dependent your business is on your daily involvement - a critical factor in determining business value and exit readiness.

**Please complete the Owner Centricity Assessment at www.OwnerCentricity.com**
- Takes approximately 20 minutes
- Provides valuable insights into management team depth
- Enter my name and email to share results: {ADVISOR_EMAIL}

This assessment will help us understand how to strengthen your management team and reduce owner dependency - two factors that can significantly increase your business value.

In our next meeting (Meeting #2), we'll discuss your financial targets and analyze how a potential buyer or lender would evaluate your business.

Best regards,
{ADVISOR_NAME}
Kohari Gonzalez CPAs & Advisors`
          }
        ]
      },
      tags: ['communication', 'client management', 'process', 'templates']
    },
    {
      id: 'ep-documentation-checklist',
      title: 'Exit Planning Documentation Checklist',
      category: 'exit-planning',
      tier: 'Buyer',
      format: 'checklist',
      downloadCount: 234,
      excerpt: 'Comprehensive checklist of all financial and legal documents needed for effective exit planning.',
      content: {
        categories: [
          {
            name: 'Financial Documents',
            required: true,
            items: [
              'Financial statements (3 years)',
              'Tax returns - business (3 years)',
              'Tax returns - personal (3 years)', 
              'Management reports and KPIs',
              'Accounts receivable aging',
              'Accounts payable summary',
              'Inventory reports',
              'Capital expenditure history'
            ]
          },
          {
            name: 'Legal & Operational',
            required: true,
            items: [
              'Articles of incorporation',
              'Shareholder agreements',
              'Operating agreements',
              'Key employee contracts',
              'Customer contracts (major accounts)',
              'Vendor agreements',
              'Insurance policies',
              'Real estate documents'
            ]
          },
          {
            name: 'Strategic Information',
            required: false,
            items: [
              'Business plan (current)',
              'Market analysis reports',
              'Competitive analysis',
              'SWOT analysis',
              'Growth projections',
              'Succession planning documents'
            ]
          }
        ]
      },
      tags: ['documentation', 'checklist', 'financial', 'legal']
    }
  ],

  // SUBSCRIBER TIER - Complete Professional System
  subscriber: [
    {
      id: 'ep-complete-playbook',
      title: 'Complete ExpressWL Professional Advisor Playbook',
      category: 'exit-planning',
      tier: 'Subscriber',
      format: 'masterclass',
      readTime: '45 min read',
      excerpt: 'The complete step-by-step methodology for conducting professional exit planning engagements using the proven ExpressWL framework.',
      isPremium: true,
      content: {
        introduction: 'This comprehensive playbook provides the complete methodology for conducting high-value exit planning engagements that consistently deliver exceptional results for business owners.',
        modules: [
          {
            title: 'Module 1: Engagement Setup & Client Onboarding',
            lessons: [
              'Proposal development and pricing strategy',
              'Client expectation setting and commitment',
              'Documentation requirements and timeline',
              'Initial stakeholder identification process'
            ]
          },
          {
            title: 'Module 2: The 5-Meeting Framework Deep Dive',
            lessons: [
              'Meeting #1: Stakeholder Assessment & Business Baseline',
              'Meeting #2: Financial Readiness & Wealth Gap Analysis', 
              'Meeting #3: Business Readiness & Owner Centricity',
              'Meeting #4: Personal Readiness & Vision Development',
              'Meeting #5: Action Plan Creation & Implementation'
            ]
          },
          {
            title: 'Module 3: Advanced Assessment Tools',
            lessons: [
              'Business valuation methodologies for exit planning',
              'Owner centricity scoring and improvement strategies',
              'Financial readiness calculation frameworks',
              'Personal vision development techniques'
            ]
          },
          {
            title: 'Module 4: Implementation & Follow-through',
            lessons: [
              'Action plan prioritization methodology',
              'Client accountability systems',
              'Progress tracking and reporting',
              'Ongoing advisory relationship management'
            ]
          }
        ],
        tools: [
          'Complete email template library',
          'Meeting agenda templates',
          'Assessment worksheets',
          'Progress tracking systems',
          'Client presentation materials'
        ],
        outcomes: [
          'Consistently deliver high-value exit planning engagements',
          'Increase client satisfaction and referral rates',
          'Reduce engagement time while improving results',
          'Build recurring advisory relationships',
          'Command premium pricing for exit planning services'
        ]
      },
      tags: ['playbook', 'methodology', 'professional', 'complete system']
    },
    {
      id: 'ep-implementation-tracker',
      title: 'Exit Planning Implementation Tracker & Dashboard',
      category: 'exit-planning',
      tier: 'Subscriber',
      format: 'tool',
      downloadCount: 89,
      isPremium: true,
      excerpt: 'Advanced Excel tool with automated tracking, progress dashboards, and client reporting capabilities.',
      content: {
        description: 'Professional-grade Excel tool that tracks client progress through the entire exit planning process, generates automated reports, and provides visual dashboards for both advisors and clients.',
        features: [
          {
            name: 'Progress Dashboard',
            description: 'Visual overview of client progress across all 5 phases with completion percentages and key milestones'
          },
          {
            name: 'Automated Scoring',
            description: 'Built-in formulas that calculate readiness scores for business, financial, and personal dimensions'
          },
          {
            name: 'Action Item Management',
            description: 'Comprehensive task tracking with assignments, deadlines, and accountability measures'
          },
          {
            name: 'Client Reporting',
            description: 'One-click generation of professional client reports with KGOB branding'
          },
          {
            name: 'Timeline Management', 
            description: 'Dynamic timeline that adjusts based on client progress and priorities'
          }
        ],
        worksheets: [
          'Master Dashboard',
          'Stakeholder Mapping',
          'Financial Analysis',
          'Business Readiness Scorecard',
          'Personal Vision Tracker',
          'Action Plan Manager',
          'Progress Reports',
          'Meeting Notes'
        ],
        benefits: [
          'Reduce administrative time by 60%',
          'Ensure no critical steps are missed',
          'Provide transparent progress tracking',
          'Generate professional client reports instantly',
          'Maintain consistent process across all engagements'
        ]
      },
      tags: ['tracker', 'dashboard', 'automation', 'reporting']
    },
    {
      id: 'ep-debriefing-mastery',
      title: 'Exit Planning Debriefing & Ongoing Advisory Framework',
      category: 'exit-planning',
      tier: 'Subscriber',
      format: 'framework',
      readTime: '20 min read',
      isPremium: true,
      excerpt: 'Master the art of post-assessment debriefing and convert one-time engagements into ongoing advisory relationships.',
      content: {
        overview: 'The debriefing phase is critical for converting exit planning assessments into long-term advisory relationships while ensuring client success.',
        debrief_structure: [
          {
            phase: 'Results Presentation',
            duration: '30 minutes',
            objectives: [
              'Present comprehensive assessment findings',
              'Highlight key strengths and improvement areas',  
              'Quantify the value gap and improvement potential',
              'Build urgency for action while maintaining optimism'
            ],
            materials: [
              'Executive summary report',
              'Visual dashboard of results',
              'Comparison to industry benchmarks',
              'Recommended action priorities'
            ]
          },
          {
            phase: 'Strategic Discussion', 
            duration: '45 minutes',
            objectives: [
              'Align on vision and timeline priorities',
              'Discuss implementation approach options',
              'Address concerns and obstacles',
              'Establish success metrics and milestones'
            ]
          },
          {
            phase: 'Implementation Planning',
            duration: '30 minutes', 
            objectives: [
              'Define immediate next steps (90 days)',
              'Establish ongoing advisory relationship',
              'Set meeting cadence and accountability',
              'Provide implementation resources and tools'
            ]
          }
        ],
        ongoing_advisory: {
          quarterly_meetings: [
            'Progress review against action plan',
            'Business performance analysis',
            'Market condition updates',
            'Strategy adjustments and pivots'
          ],
          value_added_services: [
            'Monthly KPI dashboard reviews',
            'Annual business valuation updates', 
            'Strategic planning facilitation',
            'M&A readiness assessments',
            'Succession planning development'
          ],
          success_metrics: [
            'Business value improvement (target: 20%+ annually)',
            'Owner centricity reduction (target: decrease by 25%)',
            'Management team development milestones',
            'Financial performance improvements'
          ]
        }
      },
      tags: ['debriefing', 'advisory', 'ongoing relationship', 'implementation']
    }
  ]
};

// Utility function to get content by tier and category
export const getExitPlanningContent = (userTier, category = 'exit-planning') => {
  const tierContent = {
    'Free': exitPlanningContent.free,
    'Buyer': [...exitPlanningContent.free, ...exitPlanningContent.buyer],
    'Subscriber': [...exitPlanningContent.free, ...exitPlanningContent.buyer, ...exitPlanningContent.subscriber]
  };
  
  return tierContent[userTier]?.filter(content => content.category === category) || [];
};

export const getContentStats = () => {
  return {
    total: exitPlanningContent.free.length + exitPlanningContent.buyer.length + exitPlanningContent.subscriber.length,
    free: exitPlanningContent.free.length,
    buyer: exitPlanningContent.free.length + exitPlanningContent.buyer.length,
    subscriber: exitPlanningContent.free.length + exitPlanningContent.buyer.length + exitPlanningContent.subscriber.length
  };
};