# KGOB Algorithm Quick Reference Index

## 🔍 **FIND ANY ALGORITHM INSTANTLY**

Quick reference index for locating any business intelligence algorithm, calculation, or logic in the KGOB system.

---

## 💰 **VALUATION ALGORITHMS**

| Algorithm | File | Lines | Input | Output |
|-----------|------|-------|-------|--------|
| **Primary Business Valuation** | `businessIntelligenceEngine.js` | 400-450 | Revenue, Profit Margin, Industry | Estimated business value |
| **Owner Centricity Impact** | `businessIntelligenceEngine.js` | 460-480 | Owner Centricity Score (0-100) | Value multiplier (0.8-1.2x) |
| **Customer Risk Impact** | `businessIntelligenceEngine.js` | 485-500 | Top Customer % | Risk multiplier (0.75-1.1x) |
| **Industry Multiple Selector** | `businessIntelligenceEngine.js` | 420-430 | Industry type | EBITDA multiple range |

### **Primary Valuation Formula**
```
Business Value = EBITDA × Industry Multiple × Owner Centricity Multiplier × Customer Risk Multiplier
```

---

## 📊 **ROI CALCULATION ALGORITHMS**

| ROI Calculator | File | Lines | Investment Type | ROI Formula |
|----------------|------|-------|-----------------|-------------|
| **Management Hire ROI** | `businessIntelligenceEngine.js` | 200-240 | GM/COO Hire | (Value Increase - Annual Cost) ÷ Annual Cost |
| **Customer Diversification ROI** | `businessIntelligenceEngine.js` | 250-280 | Marketing Investment | (Risk Premium + Stability Bonus) ÷ Investment |
| **Process Documentation ROI** | Generated recommendation | N/A | Documentation Cost | (Efficiency Gains + Value Premium) ÷ Cost |
| **Technology Upgrade ROI** | `BusinessValueTracker.jsx` | 200-250 | System Investment | (Efficiency + Competitive Advantage) ÷ Investment |

### **ROI Calculation Examples**
```javascript
// 🔥 MANAGEMENT HIRE ROI EXAMPLE
Current Business Value: $2,300,000
Owner Centricity Score: 45/100 (high dependency)
Annual GM Cost: $150,000

Value Increase Calculation:
- Base increase: $2,300,000 × 0.15 = $345,000
- Dependency bonus: $2,300,000 × ((85-45)/100) × 0.25 = $230,000  
- Total increase: $575,000

ROI = ($575,000 - $150,000) ÷ $150,000 = 283% ROI
```

---

## 🎯 **ASSESSMENT SCORING ALGORITHMS**

| Assessment | File | Lines | Questions | Scoring Method |
|------------|------|-------|-----------|----------------|
| **Exit Readiness Score** | `businessIntelligenceEngine.js` | 300-350 | Multi-dimensional | Weighted average across 4 factors |
| **Owner Centricity Score** | `Phase3OwnerCentricity.jsx` | 200-250 | 20 questions, 5 areas | Weighted by functional area importance |
| **Business Baseline** | `EnhancedPhase1.jsx` | 400-600 | 127 questions | 8 categories with different weights |
| **Customer Risk Score** | `businessIntelligenceEngine.js` | 240-290 | Portfolio analysis | 4-factor weighted calculation |
| **Financial Readiness** | `Phase2FinancialCalculators.jsx` | 300-400 | Financial metrics | Monte Carlo simulation ready |

### **Exit Readiness Scoring Formula**
```javascript
// 🎯 WEIGHTED EXIT READINESS CALCULATION
Exit Readiness = (Financial × 30%) + (Business × 35%) + (Personal × 20%) + (Market × 15%)

Factor Breakdown:
- Financial: Wealth gap, cash flow, financial controls
- Business: Owner centricity, management depth, customer risk  
- Personal: Identity planning, lifestyle goals, family readiness
- Market: Industry conditions, competitive position, timing
```

---

## 🏭 **INDUSTRY-SPECIFIC ALGORITHMS**

| Industry | Benchmark File Lines | Key Factors | Typical Multiples |
|----------|-------------------|-------------|------------------|
| **Professional Services** | 30-50 | Client relationships, recurring revenue | 2.5-4.5x EBITDA |
| **Manufacturing** | 55-75 | Operational efficiency, quality systems | 3.0-6.5x EBITDA |
| **Retail** | 80-95 | Brand strength, location, inventory | 1.5-4.0x EBITDA |
| **Technology** | 100-115 | IP, scaling, recurring revenue | 3.0-8.0x EBITDA |

### **Industry Detection Algorithm**
```javascript
// 🏢 SMART INDUSTRY CLASSIFICATION - Lines 420-450
determineIndustry(businessData) {
  const keywords = businessData.industry?.toLowerCase() || '';
  
  if (keywords.includes('professional|consulting|accounting')) return 'professional-services';
  if (keywords.includes('manufacturing|production')) return 'manufacturing';
  if (keywords.includes('retail|store')) return 'retail';
  if (keywords.includes('technology|software')) return 'technology';
  
  return 'general'; // Default with conservative assumptions
}
```

---

## ⏰ **TIMELINE & PLANNING ALGORITHMS**

| Timeline Calculator | File | Lines | Factors | Output |
|-------------------|------|-------|---------|---------|
| **Optimal Exit Timeline** | `businessIntelligenceEngine.js` | 350-390 | Owner dependency, financials, wealth gap | Recommended years + milestones |
| **Improvement Timeline** | `BusinessValueTracker.jsx` | 250-300 | Selected improvements | Implementation sequence |
| **Milestone Generator** | `businessIntelligenceEngine.js` | 395-420 | Business condition, goals | 90-day, 6-month, annual goals |

### **Timeline Calculation Logic**
```javascript
// ⏰ EXIT TIMELINE OPTIMIZATION
Base Timeline: 2 years

Adjustments:
+ Owner Centricity < 60: +2 years (management development needed)
+ Owner Centricity < 75: +1 year (management strengthening needed)  
+ Profit Margin < 10%: +1 year (financial improvement needed)
+ Wealth Gap > $500K: +1 year (value building or lifestyle adjustment needed)

Maximum Timeline: 7 years (practical limit for exit planning)
```

---

## 🎮 **INTERACTIVE UI ALGORITHMS**

| Interactive Feature | File | Lines | User Input | Real-Time Output |
|-------------------|------|-------|------------|------------------|
| **Business Data Form** | `PersonalizedRecommendationEngine.jsx` | 100-150 | Revenue, margins, scores | Instant analysis update |
| **Improvement Selector** | `BusinessValueTracker.jsx` | 200-350 | Checkboxes for improvements | Real-time value projection |
| **Assessment Progress** | All Phase components | Various | Question responses | Progress bars and scoring |
| **Tier Demonstration** | `QuickStats.jsx` | 30-80 | Tier selection | Different data display |

### **Real-Time Calculation Pattern**
```javascript
// 🎮 REAL-TIME UI UPDATE PATTERN
useEffect(() => {
  // 1. Detect user input changes
  // 2. Call business intelligence engine
  // 3. Update UI immediately  
  // 4. Show loading states during calculation
  calculateAndUpdateUI();
}, [userBusinessData, selectedOptions]);
```

---

## 🔍 **SEARCH & FILTERING ALGORITHMS**

| Search Feature | File | Lines | Search Targets | Algorithm |
|---------------|------|-------|----------------|-----------|
| **Content Search** | `KnowledgeBase.jsx` | 150-170 | Title, tags, content | Text matching with toLowerCase() |
| **Category Filter** | `CategoryFilter.jsx` | 50-80 | Category selection | Tier-filtered content display |
| **Tier Content Filter** | `knowledgeBaseMock.js` | 200-250 | User tier level | Hierarchical access control |

---

## 📞 **CONTACT & CTA ALGORITHMS**

| CTA Type | Location | Trigger Logic | Target Action |
|----------|----------|---------------|---------------|
| **Consultation Booking** | Free tier components | userTier === 'Free' | Phone: 1-844-599-3355 |
| **Tier Upgrade** | Buyer tier components | userTier === 'Buyer' | Subscription upgrade |
| **Feature Unlock** | Locked content | Feature access denied | Tier upgrade or consultation |
| **Professional Service** | All components footers | Always visible | KGOB contact and credentialing |

---

## 🚀 **PERFORMANCE ALGORITHMS**

### **Optimization Techniques**
- **Lazy Loading:** Knowledge Base components load on demand
- **Memoization:** Expensive calculations cached with useMemo
- **Debounced Updates:** Real-time calculations debounced to prevent excessive re-renders
- **Progressive Enhancement:** Basic functionality first, enhanced features layer on top

### **Performance Monitoring**
```javascript
// 📊 PERFORMANCE TRACKING POINTS
// 1. Component mount times
// 2. Calculation response times  
// 3. User interaction latency
// 4. Memory usage during assessments
```

---

## 📋 **QUICK ALGORITHM REFERENCE**

### **"I Need To..."**
| Need | Go To File | Specific Function/Lines |
|------|-----------|-------------------------|
| **Calculate business value** | `businessIntelligenceEngine.js` | `estimateCurrentBusinessValue()` Lines 400-450 |
| **Generate recommendations** | `businessIntelligenceEngine.js` | `generateRecommendations()` Lines 120-180 |
| **Score owner centricity** | `businessIntelligenceEngine.js` | `scoreOperationalIndependence()` Lines 180-220 |
| **Calculate ROI** | `businessIntelligenceEngine.js` | `calculateManagementImprovementROI()` Lines 200-240 |
| **Determine exit timeline** | `businessIntelligenceEngine.js` | `calculateOptimalTimeline()` Lines 350-390 |
| **Assess customer risk** | `businessIntelligenceEngine.js` | `scoreCustomerPortfolio()` Lines 240-290 |
| **Enable Ask Sara** | `aiIntegrationLayer.js` | `enableAskSaraIntegration()` Lines 15-30 |
| **Add new industry** | `businessIntelligenceEngine.js` | `loadIndustryBenchmarks()` Lines 30-115 |

### **"I Want To Modify..."**
| Modification | File Location | What To Change |
|-------------|---------------|----------------|
| **Industry benchmarks** | `businessIntelligenceEngine.js` Lines 30-115 | Add new industry object |
| **Valuation multiples** | Industry benchmark `typicalMultiples` | Adjust low/average/high ranges |
| **ROI calculations** | ROI calculator functions Lines 200-280 | Modify calculation formulas |
| **Assessment questions** | Phase component files | Add/modify question objects |
| **UI colors** | `/frontend/src/index.css` Lines 90-120 | Update CSS custom properties |
| **Contact information** | Search "Charlotte, NC" globally | Replace with new contact info |

---

*This algorithm index provides instant access to any calculation, logic, or business rule in the KGOB system.*