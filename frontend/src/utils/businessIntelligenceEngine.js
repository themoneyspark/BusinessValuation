// KGOB Advanced Business Intelligence & Recommendation Engine
// Sophisticated rule-based analysis with future AI integration capability

export class BusinessIntelligenceEngine {
  constructor() {
    this.industryBenchmarks = this.loadIndustryBenchmarks();
    this.valuationModels = this.initializeValuationModels();
    this.aiIntegrationEnabled = false; // Future ChatGPT 5 integration flag
  }

  // Initialize valuation models
  initializeValuationModels() {
    return {
      dcf: {
        name: 'Discounted Cash Flow',
        description: 'Present value of future cash flows',
        applicability: ['technology', 'professional-services', 'manufacturing']
      },
      multiple: {
        name: 'Market Multiple',
        description: 'Valuation based on industry multiples',
        applicability: ['all']
      },
      asset: {
        name: 'Asset-Based',
        description: 'Book value of assets minus liabilities',
        applicability: ['manufacturing', 'retail']
      }
    };
  }

  // Main Analysis Function
  async analyzeBusinessForExitPlanning(businessData) {
    const analysis = {
      currentPosition: this.assessCurrentPosition(businessData),
      industryComparison: this.benchmarkAgainstIndustry(businessData),
      valueEnhancement: this.identifyValueEnhancements(businessData),
      riskAssessment: this.assessRisks(businessData),
      timelineRecommendation: this.calculateOptimalTimeline(businessData),
      financialProjections: this.projectFinancialOutcomes(businessData)
    };

    const recommendations = await this.generateRecommendations(analysis, businessData);
    const actionPlan = this.createActionPlan(recommendations, businessData);

    return {
      analysis,
      recommendations,
      actionPlan,
      estimatedValueImpact: this.calculateTotalValueImpact(recommendations),
      exitReadinessScore: this.calculateExitReadinessScore(analysis)
    };
  }

  // Industry Benchmarking System
  loadIndustryBenchmarks() {
    return {
      "professional-services": {
        typicalMultiples: { low: 2.5, average: 3.5, high: 4.5 },
        profitMarginBenchmarks: { low: 8, average: 15, high: 25 },
        ownerCentricityTarget: 75,
        customerConcentrationLimit: 20,
        managementDepthTarget: 3,
        keySuccessFactors: [
          "Client relationship diversification",
          "Recurring revenue development", 
          "Process documentation",
          "Management team depth"
        ],
        commonChallenges: [
          "High owner dependency",
          "Client concentration risk",
          "Limited scalability",
          "Succession planning gaps"
        ]
      },
      "manufacturing": {
        typicalMultiples: { low: 3.0, average: 4.5, high: 6.5 },
        profitMarginBenchmarks: { low: 6, average: 12, high: 20 },
        ownerCentricityTarget: 80,
        customerConcentrationLimit: 25,
        keySuccessFactors: [
          "Operational efficiency",
          "Quality management systems",
          "Supply chain optimization",
          "Technology integration"
        ]
      },
      "retail": {
        typicalMultiples: { low: 1.5, average: 2.5, high: 4.0 },
        profitMarginBenchmarks: { low: 3, average: 8, high: 15 },
        keySuccessFactors: [
          "Brand strength",
          "Location advantages", 
          "Inventory management",
          "Customer loyalty programs"
        ]
      },
      "technology": {
        typicalMultiples: { low: 3.0, average: 5.0, high: 8.0 },
        profitMarginBenchmarks: { low: 10, average: 20, high: 40 },
        keySuccessFactors: [
          "Intellectual property protection",
          "Recurring revenue models",
          "Scalable technology platform",
          "Technical team retention"
        ]
      }
    };
  }

  // Advanced Business Position Assessment
  assessCurrentPosition(businessData) {
    const industry = this.determineIndustry(businessData);
    const benchmarks = this.industryBenchmarks[industry];
    
    return {
      industry: industry,
      revenuePosition: this.assessRevenuePosition(businessData, benchmarks),
      profitabilityPosition: this.assessProfitability(businessData, benchmarks),
      ownerDependencyLevel: this.assessOwnerDependency(businessData, benchmarks),
      customerRiskLevel: this.assessCustomerRisk(businessData, benchmarks),
      managementStrength: this.assessManagementDepth(businessData, benchmarks),
      competitivePosition: this.assessCompetitivePosition(businessData),
      financialStrength: this.assessFinancialStrength(businessData)
    };
  }

  // Sophisticated Recommendation Generation
  async generateRecommendations(analysis, businessData) {
    const recommendations = [];

    // Owner Centricity Recommendations
    if (analysis.currentPosition.ownerDependencyLevel > 70) {
      const managementRec = this.createManagementRecommendation(businessData, analysis);
      recommendations.push(managementRec);
    }

    // Customer Concentration Recommendations
    if (analysis.currentPosition.customerRiskLevel > 60) {
      const diversificationRec = this.createCustomerDiversificationRecommendation(businessData, analysis);
      recommendations.push(diversificationRec);
    }

    // Profitability Recommendations
    if (analysis.currentPosition.profitabilityPosition < 50) {
      const profitabilityRec = this.createProfitabilityRecommendation(businessData, analysis);
      recommendations.push(profitabilityRec);
    }

    // Management Development Recommendations
    if (analysis.currentPosition.managementStrength < 60) {
      const managementDevRec = this.createManagementDevelopmentRecommendation(businessData, analysis);
      recommendations.push(managementDevRec);
    }

    // Enhanced with Ask Sara AI if available
    if (this.aiIntegrationEnabled) {
      return await this.enhanceRecommendationsWithSara(recommendations, businessData);
    }

    return this.prioritizeRecommendations(recommendations, businessData);
  }

  // Advanced Value Enhancement Identification
  identifyValueEnhancements(businessData) {
    const currentValue = this.estimateCurrentBusinessValue(businessData);
    const enhancements = [];

    // Management Independence Enhancement
    const managementROI = this.calculateManagementImprovementROI(businessData, currentValue);
    if (managementROI.roi > 200) { // 200%+ ROI threshold
      enhancements.push({
        enhancement: "Management Team Development",
        currentValueImpact: managementROI.valueIncrease,
        investmentRequired: managementROI.investment,
        roi: managementROI.roi,
        timeline: managementROI.timeline,
        difficulty: "Medium",
        priority: this.calculatePriority(managementROI.roi, managementROI.difficulty)
      });
    }

    // Financial Performance Enhancement
    const financialROI = this.calculateFinancialImprovementROI(businessData, currentValue);
    if (financialROI.roi > 150) {
      enhancements.push({
        enhancement: "Financial Performance Optimization",
        description: "Improve profit margins and financial controls",
        valueIncrease: financialROI.valueIncrease,
        specificActions: [
          "Implement cost reduction program",
          "Optimize pricing strategy",
          "Improve financial reporting and KPIs",
          "Strengthen cash flow management"
        ]
      });
    }

    // Customer Base Enhancement
    const customerROI = this.calculateCustomerImprovementROI(businessData, currentValue);
    if (customerROI.roi > 100) {
      enhancements.push({
        enhancement: "Customer Portfolio Optimization",
        valueIncrease: customerROI.valueIncrease,
        specificActions: [
          `Reduce top customer dependency from ${businessData.topCustomerPercentage}% to <20%`,
          "Implement customer retention program",
          "Develop new customer acquisition channels",
          "Strengthen customer contracts and terms"
        ]
      });
    }

    return enhancements.sort((a, b) => b.priority - a.priority);
  }

  // Comprehensive ROI Calculators
  calculateManagementImprovementROI(businessData, currentValue) {
    const currentOwnerCentricity = businessData.ownerCentricityScore || 50;
    const targetOwnerCentricity = 85; // Target score
    const improvementFactor = (targetOwnerCentricity - currentOwnerCentricity) / 100;
    
    // Value increase calculation based on reduced owner dependency
    const baseValueIncrease = currentValue * 0.15; // 15% base increase for management
    const ownerDependencyBonus = currentValue * improvementFactor * 0.25; // Bonus for high improvement
    const totalValueIncrease = baseValueIncrease + ownerDependencyBonus;
    
    const annualManagerCost = 150000; // Average GM salary + benefits
    const timeline = 12; // months
    const totalInvestment = (annualManagerCost * timeline) / 12;
    
    return {
      valueIncrease: Math.round(totalValueIncrease),
      investment: totalInvestment,
      roi: Math.round((totalValueIncrease / totalInvestment) * 100),
      timeline: `${timeline} months`,
      difficulty: currentOwnerCentricity < 40 ? "High" : "Medium",
      paybackPeriod: Math.round(totalInvestment / (totalValueIncrease * 0.05)) // 5% annual return assumption
    };
  }

  calculateCustomerImprovementROI(businessData, currentValue) {
    const currentConcentration = businessData.topCustomerPercentage || 30;
    const targetConcentration = 15; // Target <15% for top customer
    const riskReduction = (currentConcentration - targetConcentration) / 100;
    
    // Value increase from reduced customer risk
    const riskPremium = currentValue * riskReduction * 0.20; // 20% premium for low customer risk
    const stabilityBonus = currentValue * 0.10; // 10% bonus for stable customer base
    const totalValueIncrease = riskPremium + stabilityBonus;
    
    const implementationCost = 80000; // Marketing, sales, and business development costs
    const timeline = 18; // months
    
    return {
      valueIncrease: Math.round(totalValueIncrease),
      investment: implementationCost,
      roi: Math.round((totalValueIncrease / implementationCost) * 100),
      timeline: `${timeline} months`,
      riskReduction: `${Math.round(riskReduction * 100)}% risk reduction`
    };
  }

  // Exit Readiness Scoring Algorithm
  calculateExitReadinessScore(analysis) {
    const scores = {
      financial: this.scoreFinancialReadiness(analysis.currentPosition),
      business: this.scoreBusinessReadiness(analysis.currentPosition),
      personal: this.scorePersonalReadiness(analysis.currentPosition),
      market: this.scoreMarketReadiness(analysis.currentPosition)
    };

    // Weighted scoring
    const weights = { financial: 0.3, business: 0.35, personal: 0.2, market: 0.15 };
    const weightedScore = Object.keys(scores).reduce((total, key) => {
      return total + (scores[key] * weights[key]);
    }, 0);

    return {
      overallScore: Math.round(weightedScore),
      breakdown: scores,
      interpretation: this.interpretExitReadinessScore(Math.round(weightedScore)),
      recommendations: this.generateScoreImprovementRecommendations(scores)
    };
  }

  // Future AI Integration Layer
  async enhanceRecommendationsWithAI(recommendations, businessData) {
    if (!this.aiIntegrationEnabled) {
      return recommendations;
    }

    try {
      // Future ChatGPT 5 integration point
      const aiEnhancedRecs = await this.callAIService({
        businessData: businessData,
        recommendations: recommendations,
        prompt: this.buildAIPrompt(businessData, recommendations)
      });

      return this.combineRuleBasedAndAIRecommendations(recommendations, aiEnhancedRecs);
    } catch (error) {
      console.log('AI enhancement unavailable, using rule-based recommendations');
      return recommendations; // Graceful fallback to rule-based
    }
  }

  // AI Integration Configuration (Future)
  enableAIIntegration(config = {}) {
    this.aiIntegrationEnabled = true;
    this.aiConfig = {
      provider: config.provider || 'chatgpt-5', // Future ChatGPT 5
      model: config.model || 'gpt-5',
      maxTokens: config.maxTokens || 2000,
      temperature: config.temperature || 0.7,
      ...config
    };
  }

  buildAIPrompt(businessData, recommendations) {
    return `
      As a senior CPA and exit planning advisor, analyze this business situation and enhance these recommendations:
      
      Business Profile:
      - Industry: ${businessData.industry}
      - Revenue: $${businessData.revenue?.toLocaleString()}
      - Employees: ${businessData.employees}
      - Owner Centricity Score: ${businessData.ownerCentricityScore}/100
      - Profit Margin: ${businessData.profitMargin}%
      
      Current Recommendations:
      ${recommendations.map(r => `- ${r.action}: ${r.reasoning}`).join('\n')}
      
      Please:
      1. Provide additional industry-specific insights
      2. Suggest implementation tactics for each recommendation  
      3. Identify potential obstacles and solutions
      4. Add timing considerations based on market conditions
      
      Response should be professional, encouraging, and actionable for a business owner.
    `;
  }

  // Comprehensive Business Analysis Functions
  assessCurrentPosition(businessData) {
    return {
      revenueStrength: this.scoreRevenuePosition(businessData),
      profitabilityStrength: this.scoreProfitability(businessData),
      operationalIndependence: this.scoreOperationalIndependence(businessData),
      customerPortfolio: this.scoreCustomerPortfolio(businessData),
      managementCapability: this.scoreManagementCapability(businessData),
      financialControls: this.scoreFinancialControls(businessData),
      competitivePosition: this.scoreCompetitivePosition(businessData),
      growthPotential: this.scoreGrowthPotential(businessData)
    };
  }

  // Advanced Scoring Algorithms
  scoreOperationalIndependence(businessData) {
    const ownerCentricity = businessData.ownerCentricityScore || 50;
    const managementDepth = businessData.managementLevels || 1;
    const processDocumentation = businessData.processDocumentation || 30; // %
    
    // Weighted calculation
    const operationalScore = (
      (ownerCentricity * 0.4) +
      (Math.min(managementDepth * 20, 100) * 0.3) +
      (processDocumentation * 0.3)
    );

    return {
      score: Math.round(operationalScore),
      factors: {
        ownerCentricity: { score: ownerCentricity, weight: 40, status: this.getScoreStatus(ownerCentricity) },
        managementDepth: { score: Math.min(managementDepth * 20, 100), weight: 30, status: this.getScoreStatus(Math.min(managementDepth * 20, 100)) },
        processDocumentation: { score: processDocumentation, weight: 30, status: this.getScoreStatus(processDocumentation) }
      },
      recommendations: this.generateOperationalRecommendations(ownerCentricity, managementDepth, processDocumentation)
    };
  }

  scoreCustomerPortfolio(businessData) {
    const topCustomerPct = businessData.topCustomerPercentage || 40;
    const customerCount = businessData.totalCustomers || 50;
    const avgCustomerTenure = businessData.avgCustomerTenure || 3; // years
    const contractedRevenue = businessData.contractedRevenuePercentage || 30;

    // Calculate customer portfolio strength
    const concentrationScore = Math.max(0, 100 - (topCustomerPct * 2)); // Penalize concentration
    const diversityScore = Math.min(100, customerCount * 2); // Reward customer count
    const stabilityScore = Math.min(100, avgCustomerTenure * 20); // Reward tenure
    const contractScore = contractedRevenue; // Reward contracted revenue

    const portfolioScore = (
      concentrationScore * 0.3 +
      diversityScore * 0.2 +
      stabilityScore * 0.25 +
      contractScore * 0.25
    );

    return {
      score: Math.round(portfolioScore),
      factors: {
        concentration: { score: concentrationScore, status: this.getScoreStatus(concentrationScore), risk: topCustomerPct },
        diversity: { score: diversityScore, status: this.getScoreStatus(diversityScore), customerCount },
        stability: { score: stabilityScore, status: this.getScoreStatus(stabilityScore), avgTenure: avgCustomerTenure },
        contractStrength: { score: contractScore, status: this.getScoreStatus(contractScore), contractedPct: contractedRevenue }
      },
      riskLevel: this.calculateCustomerRiskLevel(topCustomerPct, customerCount),
      recommendations: this.generateCustomerRecommendations(topCustomerPct, customerCount, contractedRevenue)
    };
  }

  // Advanced Recommendation Generators
  generateOperationalRecommendations(ownerCentricity, managementDepth, processDoc) {
    const recommendations = [];

    if (ownerCentricity < 70) {
      recommendations.push({
        action: "Reduce Owner Dependency",
        priority: 1,
        impact: "High",
        specifics: [
          ownerCentricity < 50 ? "Hire General Manager/COO immediately" : "Promote senior employee to management role",
          "Document all critical business processes",
          "Cross-train employees in owner-dependent functions",
          "Implement management reporting dashboard"
        ],
        timeline: ownerCentricity < 50 ? "6-12 months" : "3-9 months",
        estimatedCost: ownerCentricity < 50 ? "$120K-180K" : "$40K-80K",
        valueIncrease: `${Math.round((70 - ownerCentricity) * 0.4)}% business value increase`
      });
    }

    if (managementDepth < 3) {
      recommendations.push({
        action: "Develop Management Team Depth",
        priority: 2,
        impact: "Medium-High",
        specifics: [
          "Create management development program",
          "Promote high-performing employees", 
          "Hire experienced middle managers",
          "Implement succession planning for key roles"
        ]
      });
    }

    if (processDoc < 60) {
      recommendations.push({
        action: "Document Critical Business Processes",
        priority: 3,
        impact: "Medium",
        specifics: [
          "Document standard operating procedures (SOPs)",
          "Create training manuals for key positions",
          "Implement quality management system",
          "Document customer and vendor relationship procedures"
        ]
      });
    }

    return recommendations;
  }

  generateCustomerRecommendations(topCustomerPct, customerCount, contractedPct) {
    const recommendations = [];

    if (topCustomerPct > 25) {
      recommendations.push({
        action: "Reduce Customer Concentration Risk",
        priority: 1,
        impact: "High",
        currentRisk: `${topCustomerPct}% revenue concentration`,
        target: "<20% from any single customer",
        specifics: [
          "Develop new customer acquisition strategy",
          "Strengthen relationships with top 10 customers", 
          "Implement customer retention program",
          "Diversify into new market segments or geographic areas"
        ],
        timeline: "12-18 months",
        estimatedValueIncrease: `${Math.round((topCustomerPct - 20) * 0.5)}% business value increase`
      });
    }

    if (contractedPct < 50) {
      recommendations.push({
        action: "Increase Contracted Revenue Base",
        priority: 2,
        impact: "Medium-High",
        currentState: `${contractedPct}% contracted revenue`,
        target: ">70% contracted revenue",
        benefits: [
          "Improved revenue predictability",
          "Higher business valuation multiple",
          "Reduced buyer risk perception",
          "Easier financing for potential buyers"
        ]
      });
    }

    return recommendations;
  }

  // Industry-Specific Analysis
  determineIndustry(businessData) {
    const industry = businessData.industry?.toLowerCase() || '';
    
    if (industry.includes('professional') || industry.includes('consulting') || industry.includes('accounting')) {
      return 'professional-services';
    } else if (industry.includes('manufacturing') || industry.includes('production')) {
      return 'manufacturing';
    } else if (industry.includes('retail') || industry.includes('store')) {
      return 'retail';
    } else if (industry.includes('technology') || industry.includes('software')) {
      return 'technology';
    } else {
      return 'general'; // Default category
    }
  }

  // Exit Timeline Optimization
  calculateOptimalTimeline(businessData) {
    let baseTimeline = 2; // years
    const adjustments = [];

    // Owner Centricity Adjustment
    if (businessData.ownerCentricityScore < 60) {
      baseTimeline += 2;
      adjustments.push({
        factor: "High owner dependency",
        adjustment: "+2 years",
        reasoning: "Need time to develop management independence"
      });
    } else if (businessData.ownerCentricityScore < 75) {
      baseTimeline += 1;
      adjustments.push({
        factor: "Moderate owner dependency", 
        adjustment: "+1 year",
        reasoning: "Need time to strengthen management team"
      });
    }

    // Financial Performance Adjustment
    if (businessData.profitMargin < 10) {
      baseTimeline += 1;
      adjustments.push({
        factor: "Below-average profitability",
        adjustment: "+1 year", 
        reasoning: "Need time to improve financial performance"
      });
    }

    // Wealth Gap Adjustment
    if (businessData.wealthGap > 500000) {
      baseTimeline += 1;
      adjustments.push({
        factor: "Significant wealth gap",
        adjustment: "+1 year",
        reasoning: "Need additional time to build business value"
      });
    }

    return {
      recommendedTimeline: Math.min(baseTimeline, 7), // Cap at 7 years
      adjustments,
      reasoning: this.generateTimelineReasoning(baseTimeline, adjustments),
      milestones: this.generateTimelineMilestones(baseTimeline, businessData)
    };
  }

  // Utility Functions
  getScoreStatus(score) {
    if (score >= 85) return { level: 'Excellent', color: 'green' };
    if (score >= 70) return { level: 'Good', color: 'blue' };
    if (score >= 55) return { level: 'Average', color: 'yellow' };
    if (score >= 40) return { level: 'Below Average', color: 'orange' };
    return { level: 'Poor', color: 'red' };
  }

  estimateCurrentBusinessValue(businessData) {
    const revenue = businessData.revenue || 1000000;
    const profitMargin = (businessData.profitMargin || 10) / 100;
    const ebitda = revenue * profitMargin;
    
    const industry = this.determineIndustry(businessData);
    const benchmarks = this.industryBenchmarks[industry] || this.industryBenchmarks['professional-services'];
    
    const baseMultiple = benchmarks.typicalMultiples.average;
    const ownerCentricityMultiplier = this.getOwnerCentricityMultiplier(businessData.ownerCentricityScore);
    const customerRiskMultiplier = this.getCustomerRiskMultiplier(businessData.topCustomerPercentage);
    
    const adjustedMultiple = baseMultiple * ownerCentricityMultiplier * customerRiskMultiplier;
    
    return Math.round(ebitda * adjustedMultiple);
  }

  getOwnerCentricityMultiplier(score) {
    if (score >= 85) return 1.2;  // 20% premium for low dependency
    if (score >= 70) return 1.1;  // 10% premium  
    if (score >= 55) return 1.0;  // No adjustment
    if (score >= 40) return 0.9;  // 10% discount
    return 0.8;                   // 20% discount for high dependency
  }

  getCustomerRiskMultiplier(topCustomerPct) {
    if (!topCustomerPct || topCustomerPct < 15) return 1.1;  // 10% premium
    if (topCustomerPct < 25) return 1.0;  // No adjustment
    if (topCustomerPct < 40) return 0.95; // 5% discount
    if (topCustomerPct < 60) return 0.85; // 15% discount
    return 0.75; // 25% discount for high concentration
  }
}

// Export singleton instance
export const businessAnalyzer = new BusinessIntelligenceEngine();