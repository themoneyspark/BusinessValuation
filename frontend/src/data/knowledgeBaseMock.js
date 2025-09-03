// Knowledge Base Mock Data with Tier-based Access Control

export const categories = [
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial analysis, valuation methods, and reporting',
    icon: 'DollarSign',
    color: 'blue',
    articleCount: {
      total: 25,
      free: 3,
      buyer: 15,
      subscriber: 25
    }
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Business scaling strategies and operational excellence',
    icon: 'TrendingUp', 
    color: 'green',
    articleCount: {
      total: 18,
      free: 2,
      buyer: 10,
      subscriber: 18
    }
  },
  {
    id: 'exit-planning',
    name: 'Exit Planning',
    description: 'Exit strategies, due diligence, and succession planning',
    icon: 'Target',
    color: 'purple',
    articleCount: {
      total: 22,
      free: 2,
      buyer: 12,
      subscriber: 22
    }
  }
];

export const knowledgeBaseArticles = [
  // FREE TIER CONTENT (Appetizer Content)
  {
    id: 1,
    title: 'Business Valuation 101: The Fundamentals',
    excerpt: 'Learn the basic principles of business valuation and why it matters for your company.',
    category: 'finance',
    tier: 'Free',
    format: 'article',
    readTime: '5 min read',
    views: 1247,
    isPopular: true,
    content: 'Full article content about business valuation basics...',
    tags: ['valuation', 'basics', 'fundamentals']
  },
  {
    id: 2,
    title: 'Basic KPI Tracker Template',
    excerpt: 'Simple template to track your most important business metrics.',
    category: 'finance',
    tier: 'Free',
    format: 'template',
    fileSize: '250 KB',
    downloadCount: 892,
    fileUrl: '/kb/templates/basic-kpi-tracker.xlsx',
    tags: ['kpi', 'template', 'metrics']
  },
  {
    id: 3,
    title: 'Exit Planning Timeline: Getting Started',
    excerpt: 'High-level overview of the exit planning process and key milestones.',
    category: 'exit-planning',
    tier: 'Free',
    format: 'guide',
    readTime: '7 min read',
    views: 756,
    content: 'Introduction to exit planning process...',
    tags: ['exit planning', 'timeline', 'basics']
  },

  // BUYER TIER CONTENT
  {
    id: 4,
    title: 'DCF Valuation Model Deep Dive',
    excerpt: 'Comprehensive guide to building and using discounted cash flow models.',
    category: 'finance',
    tier: 'Buyer',
    format: 'guide',
    readTime: '15 min read',
    views: 423,
    isNew: true,
    content: 'Detailed DCF methodology and implementation...',
    tags: ['dcf', 'valuation', 'modeling']
  },
  {
    id: 5,
    title: 'Industry Multiple Analysis Workbook',
    excerpt: 'Interactive Excel workbook for comparing your business to industry standards.',
    category: 'finance', 
    tier: 'Buyer',
    format: 'workbook',
    fileSize: '2.1 MB',
    downloadCount: 234,
    fileUrl: '/kb/workbooks/industry-multiples.xlsx',
    tags: ['multiples', 'industry', 'analysis']
  },
  {
    id: 6,
    title: 'Growth Strategy Framework',
    excerpt: 'Systematic approach to identifying and executing growth opportunities.',
    category: 'growth',
    tier: 'Buyer',
    format: 'framework',
    readTime: '12 min read',
    views: 678,
    content: 'Step-by-step growth framework...',
    tags: ['growth', 'strategy', 'framework']
  },

  // SUBSCRIBER TIER CONTENT  
  {
    id: 7,
    title: 'Advanced Valuation Methods Masterclass',
    excerpt: 'Complete guide covering EBITDA multiples, asset-based, and market approaches.',
    category: 'finance',
    tier: 'Subscriber',
    format: 'masterclass',
    readTime: '25 min read',
    views: 156,
    isPremium: true,
    content: 'Comprehensive valuation methodologies...',
    tags: ['valuation', 'advanced', 'masterclass']
  },
  {
    id: 8,
    title: 'Legal Due Diligence Checklist Pro',
    excerpt: 'Comprehensive 47-point checklist for legal due diligence preparation.',
    category: 'exit-planning',
    tier: 'Subscriber',
    format: 'checklist',
    fileSize: '1.8 MB',
    downloadCount: 89,
    isPremium: true,
    fileUrl: '/kb/checklists/legal-due-diligence-pro.pdf',
    tags: ['legal', 'due diligence', 'checklist']
  },
  {
    id: 9,
    title: 'M&A Financial Model Template',
    excerpt: 'Professional-grade Excel model for merger and acquisition analysis.',
    category: 'exit-planning',
    tier: 'Subscriber', 
    format: 'model',
    fileSize: '3.5 MB',
    downloadCount: 67,
    isPremium: true,
    fileUrl: '/kb/models/ma-financial-model.xlsx',
    tags: ['m&a', 'financial model', 'analysis']
  },
  {
    id: 10,
    title: 'Operational Excellence SOP Library',
    excerpt: 'Complete library of standard operating procedures for business optimization.',
    category: 'growth',
    tier: 'Subscriber',
    format: 'library',
    articleCount: 12,
    downloadCount: 234,
    isPremium: true,
    content: 'Comprehensive SOP collection...',
    tags: ['sop', 'operations', 'procedures']
  }
];

export const getContentByTier = (userTier) => {
  const tierHierarchy = {
    'Free': ['Free'],
    'Buyer': ['Free', 'Buyer'], 
    'Subscriber': ['Free', 'Buyer', 'Subscriber']
  };
  
  return knowledgeBaseArticles.filter(article => 
    tierHierarchy[userTier]?.includes(article.tier)
  );
};

export const getContentByCategory = (category, userTier) => {
  const accessibleContent = getContentByTier(userTier);
  return accessibleContent.filter(article => article.category === category);
};

export const getUpgradePromptData = (userTier, category) => {
  const allContent = knowledgeBaseArticles.filter(article => article.category === category);
  const accessibleContent = getContentByCategory(category, userTier);
  
  const lockedCount = allContent.length - accessibleContent.length;
  const nextTier = userTier === 'Free' ? 'Buyer' : 'Subscriber';
  
  return {
    lockedCount,
    nextTier,
    totalAvailable: allContent.length,
    currentAccess: accessibleContent.length
  };
};