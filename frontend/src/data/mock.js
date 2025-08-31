// Mock data for KGOB Business Valuation Dashboard
// User: Sara Gonzalez, Company: Sara PLLC

export const userData = {
  name: "Sara Gonzalez",
  firstName: "Sara",
  company: "Sara PLLC",
  tier: "Free", // Free, Buyer, Subscriber
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e2cd?w=150&h=150&fit=crop&crop=face",
  notifications: 3
};

export const quickStats = {
  Free: {
    businessValue: "--",
    overallScore: "--", 
    exitReadiness: "--",
    lastActivity: "3 days ago"
  },
  Buyer: {
    businessValue: "$1.2M - $1.6M",
    overallScore: "78/100",
    exitReadiness: "65%",
    lastActivity: "3 days ago"
  },
  Subscriber: {
    businessValue: "$1.4M - $1.8M",
    overallScore: "85/100",
    exitReadiness: "78%",
    lastActivity: "1 day ago"
  }
};

export const businessQuotes = [
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Warren Buffett"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Tony Robbins"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  }
];

export const industryNews = [
  {
    headline: "Small Business Valuations Rise 12% in Q3 2024",
    source: "Business Valuation Weekly",
    time: "2 hours ago",
    id: 1
  },
  {
    headline: "New Tax Implications for Business Sales in 2025",
    source: "CPA Journal",
    time: "5 hours ago", 
    id: 2
  },
  {
    headline: "Market Trends: Professional Services M&A Activity",
    source: "M&A Today",
    time: "1 day ago",
    id: 3
  },
  {
    headline: "Building Business Value Through Digital Transformation",
    source: "Forbes",
    time: "2 days ago",
    id: 4
  },
  {
    headline: "Exit Planning Strategies for 2025",
    source: "Exit Planning Institute",
    time: "3 days ago",
    id: 5
  }
];

export const scoreDrivers = [
  { name: "Monopoly Control", score: 85, color: "green" },
  { name: "Time Freedom", score: 65, color: "yellow" },
  { name: "Growth Potential", score: 78, color: "yellow" },
  { name: "Cash Flow", score: 92, color: "green" },
  { name: "Recurring Revenue", score: 45, color: "red" },
  { name: "Customer Satisfaction", score: 88, color: "green" },
  { name: "Team Systems", score: 72, color: "yellow" },
  { name: "Owner Dependency", score: 58, color: "yellow" }
];

export const askSaraHistory = [
  {
    question: "How can I improve my business valuation?",
    answer: "Focus on increasing recurring revenue, reducing owner dependency, and improving operational systems. These are key value drivers for professional service firms.",
    timestamp: "2 days ago"
  },
  {
    question: "What's the best exit strategy for my type of business?",
    answer: "For a professional services firm like yours, strategic acquisition by a larger firm or management buyout are common successful exit strategies.",
    timestamp: "1 week ago"
  }
];

export const goals = [
  {
    id: 1,
    name: "Increase Recurring Revenue",
    progress: 65,
    dueDate: "Dec 2024",
    category: "Revenue"
  },
  {
    id: 2,  
    name: "Implement Management Systems",
    progress: 40,
    dueDate: "Jan 2025",
    category: "Operations"
  },
  {
    id: 3,
    name: "Reduce Owner Dependency",
    progress: 25,
    dueDate: "Mar 2025", 
    category: "Systems"
  }
];

export const growthActions = [
  {
    id: 1,
    priority: 1,
    action: "Document key client relationships and processes",
    completed: false,
    impact: "High"
  },
  {
    id: 2,
    priority: 2,
    action: "Hire and train senior associate",
    completed: true,
    impact: "High"
  },
  {
    id: 3,
    priority: 3,
    action: "Implement client portal system",
    completed: false,
    impact: "Medium"
  }
];

export const resources = [
  {
    id: 1,
    title: "Business Valuation Checklist",
    type: "Checklist",
    category: "Valuation",
    downloadUrl: "#"
  },
  {
    id: 2,
    title: "Exit Planning Template",
    type: "Template", 
    category: "Planning",
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "Due Diligence Guide",
    type: "Guide",
    category: "Process",
    downloadUrl: "#"
  },
  {
    id: 4,
    title: "Financial Reporting Standards",
    type: "Guide",
    category: "Finance", 
    downloadUrl: "#"
  }
];

export const kpiData = {
  monthlyRevenue: [120000, 135000, 142000, 138000, 155000, 160000],
  clientRetention: [92, 94, 91, 95, 93, 96],
  profitMargin: [28, 32, 30, 34, 31, 35],
  activeClients: [45, 47, 44, 49, 51, 52]
};