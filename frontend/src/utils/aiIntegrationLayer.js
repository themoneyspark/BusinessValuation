// KGOB AI Integration Layer - "Ask Sara" AI Enhancement System
// Designed for easy integration with "Ask Sara" AI assistant when enhanced features are needed

export class AIIntegrationLayer {
  constructor() {
    this.enabled = false;
    this.provider = null;
    this.apiKey = null;
    this.baseURL = null;
  }

  // Enable Ask Sara AI Integration (Future Enhancement)
  enableAskSaraIntegration(config) {
    this.enabled = true;
    this.provider = 'ask-sara';
    this.model = config.model || 'sara-business-advisor';
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL || '/api/ask-sara';
    this.maxTokens = config.maxTokens || 2000;
    this.temperature = config.temperature || 0.7;
  }

  // Enable External AI Providers (Backup Options)
  enableExternalAI(provider, config) {
    this.enabled = true;
    this.provider = provider;
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL;
    this.model = config.model;
  }

  // Main AI Enhancement Function with Ask Sara
  async enhanceRecommendationsWithSara(businessData, ruleBasedRecommendations) {
    if (!this.enabled) {
      return ruleBasedRecommendations; // Return rule-based recommendations as-is
    }

    try {
      const prompt = this.buildSaraPrompt(businessData, ruleBasedRecommendations);
      const saraResponse = await this.callSaraService(prompt);
      return this.combineRuleBasedAndSara(ruleBasedRecommendations, saraResponse);
    } catch (error) {
      console.warn('Ask Sara enhancement failed, using rule-based recommendations:', error);
      return ruleBasedRecommendations; // Graceful fallback
    }
  }

  buildSaraPrompt(businessData, recommendations) {
    return `
      Hello Sara, I need your expertise as a senior CPA and exit planning advisor.
      
      Business Owner Profile:
      - Industry: ${businessData.industry}
      - Annual Revenue: $${businessData.revenue?.toLocaleString()}
      - Profit Margin: ${businessData.profitMargin}%
      - Employees: ${businessData.employees}
      - Owner Centricity Score: ${businessData.ownerCentricityScore}/100
      - Top Customer Concentration: ${businessData.topCustomerPercentage}%
      
      Our analysis suggests these recommendations:
      ${recommendations.map(r => `
        ${r.priority}. ${r.action}
        - Why: ${r.reasoning}
        - Expected Impact: ${r.impact}
        - Timeline: ${r.timeline}
      `).join('\n')}
      
      Sara, please enhance these recommendations with:
      1. Your professional insights and implementation strategies
      2. Industry-specific considerations for ${businessData.industry}
      3. Potential challenges and how to overcome them
      4. Encouraging guidance to help the owner succeed
      5. Specific next steps they should take this week
      
      Please respond in your warm, professional, and encouraging tone as their trusted advisor.
    `;
  }

  async callSaraService(prompt) {
    // Future Ask Sara API integration
    const response = await fetch(`${this.baseURL}/enhance-recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        businessContext: true,
        advisorRole: 'exit-planning-cpa',
        maxTokens: this.maxTokens,
        temperature: this.temperature
      })
    });

    if (!response.ok) {
      throw new Error(`Ask Sara API call failed: ${response.status}`);
    }

    const data = await response.json();
    return data.enhancedRecommendations;
  }

  combineRuleBasedAndSara(ruleBasedRecs, saraEnhancedRecs) {
    // Combine sophisticated rule-based calculations with Sara's insights
    return ruleBasedRecs.map((rec, index) => {
      const saraEnhancement = saraEnhancedRecs[index] || {};
      return {
        ...rec,
        saraInsights: saraEnhancement.professionalInsights || '',
        implementationStrategy: saraEnhancement.implementationStrategy || [],
        potentialChallenges: saraEnhancement.potentialChallenges || [],
        encouragingGuidance: saraEnhancement.encouragingGuidance || '',
        weeklyNextSteps: saraEnhancement.weeklyNextSteps || [],
        saraEnhanced: true
      };
    });
  }

  // Configuration Management
  getConfiguration() {
    return {
      enabled: this.enabled,
      provider: this.provider,
      model: this.model,
      aiAssistant: 'Ask Sara',
      hasApiKey: !!this.apiKey
    };
  }

  disable() {
    this.enabled = false;
    this.provider = null;
    this.apiKey = null;
  }
}

// Singleton instance for global use
export const saraAI = new AIIntegrationLayer();

// Ask Sara Integration Helper Functions
export const enableAskSaraEnhancement = (config = {}) => {
  saraAI.enableAskSaraIntegration({
    apiKey: config.apiKey || 'sara-business-advisor-key',
    maxTokens: 2000,
    temperature: 0.7,
    ...config
  });
  return saraAI.getConfiguration();
};

export const configureEmergentSaraIntegration = (emergentKey) => {
  // Future: Integrate Ask Sara with Emergent Universal Key when available
  saraAI.enableExternalAI('emergent-sara', {
    apiKey: emergentKey,
    baseURL: '/api/emergent-sara',
    model: 'sara-business-advisor'
  });
  return saraAI.getConfiguration();
};

// Usage Example:
// const analysis = await businessAnalyzer.analyzeBusinessForExitPlanning(userData);
// const saraEnhanced = await saraAI.enhanceRecommendationsWithSara(userData, analysis.recommendations);