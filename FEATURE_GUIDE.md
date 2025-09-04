# KGOB Feature Location Guide

## 🗺️ Complete Navigation Guide - Find Any Feature Instantly

This guide helps you locate any feature, component, or algorithm in the KGOB Business Valuation Dashboard codebase.

---

## 🎨 **UI & DESIGN COMPONENTS**

### **Main Dashboard Interface**
| Component | File Location | Description |
|-----------|---------------|-------------|
| **KGOB Header** | `/frontend/src/components/TopNavigation.jsx` | Logo, user info, tier switching |
| **Sidebar Navigation** | `/frontend/src/components/Sidebar.jsx` | Tier-based menu with badges |
| **Gradient Stats** | `/frontend/src/components/QuickStats.jsx` | Blue-to-teal gradient metrics cards |
| **Main Dashboard** | `/frontend/src/components/Dashboard.jsx` | Central orchestrator component |
| **Dashboard Tabs** | `/frontend/src/components/DashboardTabs.jsx` | Overview/Submissions/Reports tabs |

### **Dashboard Modules (Tier-Specific Content)**
| Module | File Location | Tier Access | Description |
|--------|---------------|-------------|-------------|
| **Business Quotes** | `/frontend/src/components/modules/BusinessQuotes.jsx` | All Tiers | Inspirational quote carousel |
| **Industry News** | `/frontend/src/components/modules/IndustryNews.jsx` | All Tiers | Industry news feed |
| **Locked Valuation** | `/frontend/src/components/modules/LockedValuation.jsx` | Free Tier | Upgrade conversion prompt |
| **Score Drivers** | `/frontend/src/components/modules/ScoreDrivers.jsx` | Buyer+ | Circular progress indicators |
| **Ask Sara Chat** | `/frontend/src/components/modules/AskSara.jsx` | All Tiers | AI chat interface |
| **Goals Tracker** | `/frontend/src/components/modules/GoalsTracker.jsx` | Subscriber | Goal tracking with progress |
| **Growth Navigator** | `/frontend/src/components/modules/GrowthNavigator.jsx` | Subscriber | Growth recommendations |
| **Resource Library** | `/frontend/src/components/modules/ResourceLibrary.jsx` | Subscriber | Resource management |
| **KPI Explorer** | `/frontend/src/components/modules/KPIExplorer.jsx` | Subscriber | KPI analysis tools |

---

## 🧠 **BUSINESS INTELLIGENCE & ALGORITHMS**

### **Core Intelligence Engine**
| Component | File Location | Description |
|-----------|---------------|-------------|
| **🔥 Main Business Engine** | `/frontend/src/utils/businessIntelligenceEngine.js` | **PRIMARY ALGORITHM** - All business analysis logic |
| **Ask Sara Integration** | `/frontend/src/utils/aiIntegrationLayer.js` | AI enhancement layer for future Ask Sara integration |

### **Business Intelligence Features**
| Feature | Location in businessIntelligenceEngine.js | Lines | Description |
|---------|-------------------------------------------|-------|-------------|
| **Industry Benchmarking** | `loadIndustryBenchmarks()` | 30-90 | Professional Services, Manufacturing, Retail, Technology benchmarks |
| **Business Position Assessment** | `assessCurrentPosition()` | 120-150 | 8-dimension business analysis |
| **ROI Calculators** | `calculateManagementImprovementROI()` | 200-240 | Management hire ROI with value projections |
| **Customer Risk Analysis** | `calculateCustomerImprovementROI()` | 250-280 | Customer concentration risk and mitigation |
| **Exit Readiness Scoring** | `calculateExitReadinessScore()` | 300-330 | Multi-factor readiness assessment |
| **Timeline Optimization** | `calculateOptimalTimeline()` | 350-390 | Exit timeline recommendation engine |
| **Value Enhancement ID** | `identifyValueEnhancements()` | 180-220 | Automated opportunity identification |

### **Algorithm Highlights**
```javascript
// 🔥 KEY ALGORITHMS LOCATION:

// 1. Business Value Estimation (Lines 400-450)
estimateCurrentBusinessValue(businessData) {
  // Industry multiple × EBITDA × risk adjustments
}

// 2. Owner Centricity Multiplier (Lines 460-480) 
getOwnerCentricityMultiplier(score) {
  // Value impact of owner dependency: 80%-120% of base value
}

// 3. ROI Calculation Engine (Lines 200-280)
calculateManagementImprovementROI(businessData, currentValue) {
  // Precise ROI calculations with industry benchmarks
}
```

---

## 📚 **KNOWLEDGE BASE SYSTEM**

### **Main Knowledge Base Components**
| Component | File Location | Description |
|-----------|---------------|-------------|
| **🔥 Knowledge Base Hub** | `/frontend/src/components/knowledgebase/KnowledgeBase.jsx` | Main container with 4 tabs |
| **Exit Planning Center** | `/frontend/src/components/knowledgebase/ExitPlanningCenter.jsx` | 5-Meeting System interface |
| **Personalized Recommendations** | `/frontend/src/components/knowledgebase/PersonalizedRecommendationEngine.jsx` | AI-powered business analysis |
| **Business Value Tracker** | `/frontend/src/components/knowledgebase/BusinessValueTracker.jsx` | Real-time value calculator |
| **Interactive Exit Planning** | `/frontend/src/components/knowledgebase/InteractiveExitPlanning.jsx` | Tools and assessments |

### **5-Meeting System (Complete ExpressWL Digitization)**
| Meeting Phase | File Location | Content Transformed | Description |
|---------------|---------------|---------------------|-------------|
| **Phase 1** | `/frontend/src/components/knowledgebase/EnhancedPhase1.jsx` | 14 PDFs → Interactive forms | Stakeholder analysis & business baseline |
| **Phase 2** | `/frontend/src/components/knowledgebase/Phase2FinancialCalculators.jsx` | 3 Excel tools → Web calculators | Financial readiness & wealth gap |
| **Phase 3** | `/frontend/src/components/knowledgebase/Phase3OwnerCentricity.jsx` | Excel tool → Assessment | Owner centricity & management |
| **Phase 4** | `/frontend/src/components/knowledgebase/Phase4PersonalVision.jsx` | PDF + Excel → Vision builder | Personal readiness & identity |
| **Phase 5** | `/frontend/src/components/knowledgebase/Phase5ActionPlanning.jsx` | Excel + PDF → Action planner | SMART goals & implementation |

### **Content Data Files**
| Content Type | File Location | Source Material |
|--------------|---------------|-----------------|
| **Meeting #1 Content** | `/frontend/src/data/meeting1Content.js` | Business Baseline PDFs, Documentation Checklist |
| **Meeting #2 Content** | `/frontend/src/data/meeting2Content.js` | Cash Flow Excel, Seller's Check Excel, Distance Excel |
| **Meetings #2-#5 Detail** | `/frontend/src/data/detailedMeetings2to5.js` | All Excel tools and methodology |
| **Enhanced Content** | `/frontend/src/data/enhancedExitPlanningContent.js` | 5x expanded methodology |
| **KGOB Content Library** | `/frontend/src/data/kgobContentLibrary.js` | Branded ExpressWL content |
| **Knowledge Base Mock** | `/frontend/src/data/knowledgeBaseMock.js` | Sample content for testing |

---

## 💰 **FINANCIAL CALCULATORS & TOOLS**

### **Advanced Financial Analysis Tools**
| Calculator | Component Location | Algorithm Location | Description |
|------------|-------------------|-------------------|-------------|
| **Wealth Gap Calculator** | `Phase2FinancialCalculators.jsx` Lines 150-250 | `businessIntelligenceEngine.js` | Multi-scenario wealth analysis |
| **Cash Flow Normalization** | `Phase2FinancialCalculators.jsx` Lines 50-150 | Built-in component | 25+ adjustment categories |
| **Business Value Estimator** | `BusinessValueTracker.jsx` Lines 100-150 | `estimateCurrentBusinessValue()` | Real-time value calculation |
| **ROI Improvement Calculator** | `BusinessValueTracker.jsx` Lines 200-300 | `calculateManagementImprovementROI()` | Investment return projections |
| **Exit Readiness Scorer** | `PersonalizedRecommendationEngine.jsx` | `calculateExitReadinessScore()` | Multi-dimensional assessment |

### **Financial Algorithm Details**
```javascript
// 🔥 LOCATION: /frontend/src/utils/businessIntelligenceEngine.js

// Business Value Formula (Lines 400-430)
Business Value = EBITDA × Industry Multiple × Owner Centricity Multiplier × Customer Risk Multiplier

// Owner Centricity Impact (Lines 460-480)
- Score 85+: 120% of base value (20% premium)
- Score 70-84: 110% of base value (10% premium)  
- Score 55-69: 100% of base value (neutral)
- Score 40-54: 90% of base value (10% discount)
- Score <40: 80% of base value (20% discount)

// ROI Calculation (Lines 200-280)
ROI = (Value Increase - Investment Cost) ÷ Investment Cost × 100
```

---

## 🎮 **INTERACTIVE ASSESSMENT TOOLS**

### **Assessment Components**
| Assessment | File Location | Questions | Scoring | Description |
|------------|---------------|-----------|---------|-------------|
| **Business Baseline** | `EnhancedPhase1.jsx` Lines 100-500 | 127 questions | Weighted scoring | Comprehensive business profile |
| **Owner Centricity** | `Phase3OwnerCentricity.jsx` Lines 50-300 | 20 questions | 5 functional areas | Owner dependency analysis |
| **Stakeholder Analysis** | `EnhancedPhase1.jsx` Lines 600-800 | 12 stakeholder groups | Risk-weighted | Impact and mitigation analysis |
| **Personal Vision** | `Phase4PersonalVision.jsx` Lines 50-400 | 4 life dimensions | Completion tracking | Post-exit life planning |
| **Exit Readiness Quiz** | `InteractiveExitPlanning.jsx` Lines 100-200 | 5 questions | 20-point scale | Quick readiness assessment |

### **Assessment Scoring Algorithms**
```javascript
// 🔥 LOCATION: /frontend/src/utils/businessIntelligenceEngine.js

// Exit Readiness Score (Lines 300-330)
Overall Score = (Financial × 30%) + (Business × 35%) + (Personal × 20%) + (Market × 15%)

// Owner Centricity Score (Lines 350-400)  
Weighted Score = Σ(Area Score × Area Weight) for 5 functional areas
```

---

## 🏢 **INDUSTRY-SPECIFIC FEATURES**

### **Industry Configurations**
| Industry | Configuration Location | Benchmarks | Unique Features |
|----------|----------------------|------------|-----------------|
| **Professional Services** | `businessIntelligenceEngine.js` Lines 30-50 | 2.5-4.5x EBITDA multiple | Client relationship focus |
| **Manufacturing** | `businessIntelligenceEngine.js` Lines 55-75 | 3.0-6.5x EBITDA multiple | Operational efficiency focus |
| **Retail** | `businessIntelligenceEngine.js` Lines 80-95 | 1.5-4.0x EBITDA multiple | Brand and location focus |
| **Technology** | `businessIntelligenceEngine.js` Lines 100-115 | 3.0-8.0x EBITDA multiple | IP and scaling focus |

---

## 🔄 **TIER ACCESS CONTROL SYSTEM**

### **Access Control Logic**
| Component | File Location | Access Rules |
|-----------|---------------|--------------|
| **Tier Validation** | `KnowledgeBase.jsx` Lines 40-100 | Free: Locked, Buyer: Limited, Subscriber: Full |
| **Sidebar Menu** | `Sidebar.jsx` Lines 30-80 | Lock icons and badges by tier |
| **Content Filtering** | `knowledgeBaseMock.js` Lines 200-250 | Filter content by tier access |

### **Upgrade Conversion System**
| Component | File Location | Conversion Strategy |
|-----------|---------------|-------------------|
| **Free Tier Lockout** | `KnowledgeBase.jsx` Lines 45-80 | Strong paywall with feature preview |
| **Buyer Tier Prompts** | `KnowledgeBase.jsx` Lines 85-120 | Limited access with upgrade prompts |
| **Locked Content Cards** | `LockedValuation.jsx` | Animated upgrade buttons |

---

## 🎯 **ASK SARA AI INTEGRATION**

### **AI Integration Architecture**  
| Component | File Location | Description |
|-----------|---------------|-------------|
| **AI Integration Layer** | `/frontend/src/utils/aiIntegrationLayer.js` | Ask Sara integration framework |
| **Business Intelligence Bridge** | `businessIntelligenceEngine.js` Lines 155-160 | Connects rules engine to Ask Sara |
| **AI Enhancement Points** | Multiple components | "Ask Sara AI Enhancement Ready" throughout |

### **Future Ask Sara Integration Points**
```javascript
// 🔥 INTEGRATION POINTS:

// 1. Enable Ask Sara (aiIntegrationLayer.js Lines 15-25)
saraAI.enableAskSaraIntegration({
  apiKey: 'your-sara-api-key',
  baseURL: '/api/ask-sara'
});

// 2. Enhanced Recommendations (Lines 50-80)
const enhanced = await saraAI.enhanceRecommendationsWithSara(userData, recommendations);

// 3. Business Analysis Prompts (Lines 90-130)
buildSaraPrompt(businessData, recommendations) // Professional CPA prompts
```

---

## 📊 **DATA & CONTENT MANAGEMENT**

### **Business Data Flow**
| Data Type | Source File | Target Component | Purpose |
|-----------|-------------|------------------|---------|
| **User Data** | `/frontend/src/data/mock.js` | `TopNavigation.jsx`, `Dashboard.jsx` | User profile and tier info |
| **Business Metrics** | `businessIntelligenceEngine.js` | `PersonalizedRecommendationEngine.jsx` | Dynamic business analysis |
| **Industry Benchmarks** | `businessIntelligenceEngine.js` Lines 30-115 | All calculators and assessments | Industry-specific analysis |
| **Assessment Content** | `meeting1-5Content.js` files | Phase components | Interactive form content |

### **Content Transformation Map**
| Original ExpressWL File | Transformed Component | Enhancement |
|------------------------|----------------------|-------------|
| **Business Baseline PDFs (14 files)** | `EnhancedPhase1.jsx` | → 127-point interactive assessment |
| **Cash Flow Excel** | `Phase2FinancialCalculators.jsx` | → Web-based normalization calculator |
| **Seller's Sanity Check Excel** | `Phase2FinancialCalculators.jsx` | → Wealth gap calculator with scenarios |
| **Management Succession Excel** | `Phase3OwnerCentricity.jsx` | → Owner centricity assessment tool |
| **Personal Readiness Excel** | `Phase4PersonalVision.jsx` | → Personal vision development system |
| **Action Items Excel** | `Phase5ActionPlanning.jsx` | → SMART goals generator |

---

## 🛠️ **DEVELOPMENT & CUSTOMIZATION**

### **Key Configuration Files**
| File | Location | Purpose |
|------|----------|---------|
| **Tailwind Config** | `/frontend/tailwind.config.js` | KGOB color scheme and design tokens |
| **Custom CSS** | `/frontend/src/index.css` | Custom utility classes (w-70, h-18, etc.) |
| **Package Config** | `/frontend/package.json` | Dependencies and build scripts |
| **Environment** | `/backend/.env` | Database and API configuration |

### **Styling System**
```css
/* 🎨 KGOB DESIGN TOKENS - Location: /frontend/src/index.css Lines 90-120 */
.w-60 { width: 15rem; }      /* Logo area width */
.w-70 { width: 17.5rem; }    /* Sidebar width */
.h-18 { height: 4.5rem; }    /* Header height */
.ml-70 { margin-left: 17.5rem; } /* Content left margin */
.text-navy-900 { color: #1e3a8a; }  /* KGOB navy color */

/* Teal Brand Colors */
Primary Teal: #17a2b8
Navy Blue: #1e3a8a  
Success Green: #10b981
Warning Yellow: #f59e0b
```

---

## 🔒 **SECURITY & ACCESS CONTROL**

### **Tier-Based Security System**
| Security Feature | Implementation Location | Description |
|-------------------|------------------------|-------------|
| **Frontend Tier Validation** | `KnowledgeBase.jsx` Lines 40-120 | Client-side access control |
| **Backend API Protection** | `/backend/server.py` Lines 30-50 | Server-side validation |
| **Content Filtering** | `knowledgeBaseMock.js` Lines 200-250 | Tier-appropriate content serving |

### **User Data Protection**
```javascript
// 🔒 SECURITY IMPLEMENTATION:

// Tier Validation (KnowledgeBase.jsx Lines 40-45)
if (userTier !== 'Subscriber') {
  return <LockedContent />; // Immediate lockout for non-subscribers
}

// Content Access Control (knowledgeBaseMock.js Lines 220-240)
export const getContentByTier = (userTier) => {
  const tierHierarchy = {
    'Free': ['Free'],
    'Buyer': ['Free', 'Buyer'], 
    'Subscriber': ['Free', 'Buyer', 'Subscriber']
  };
  return articles.filter(article => tierHierarchy[userTier]?.includes(article.tier));
};
```

---

## 📱 **UI/UX COMPONENT LIBRARY**

### **Professional UI Components (35 Total)**
| Component | File Location | Usage | Description |
|-----------|---------------|-------|-------------|
| **Card System** | `/frontend/src/components/ui/card.jsx` | Primary container | Professional card containers |
| **Button System** | `/frontend/src/components/ui/button.jsx` | Actions and navigation | Branded button styles |
| **Form Controls** | `/frontend/src/components/ui/input.jsx`, `textarea.jsx`, `label.jsx` | Data collection | Professional form inputs |
| **Progress Indicators** | `/frontend/src/components/ui/progress.jsx` | Progress tracking | Assessment progress bars |
| **Badge System** | `/frontend/src/components/ui/badge.jsx` | Status indicators | Tier badges, status indicators |
| **Tab Navigation** | `/frontend/src/components/ui/tabs.jsx` | Content organization | Tabbed interface system |

### **Custom KGOB Components**
```jsx
// 🎨 KGOB BRANDED COMPONENTS:

// Gradient Stats Header (QuickStats.jsx Lines 30-80)
<div className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600">
  // Professional metrics display
</div>

// Tier-Based Navigation (Sidebar.jsx Lines 50-120) 
// Lock icons and badges based on user tier

// Professional Logo System (TopNavigation.jsx Lines 15-35)
// KGOB logo with fallback to "KG" text logo
```

---

## 🚀 **DEPLOYMENT & SETUP LOCATIONS**

### **Critical Setup Files**
| File | Location | Purpose |
|------|----------|---------|
| **Frontend Package** | `/frontend/package.json` | Dependencies, scripts, build config |
| **Backend Requirements** | `/backend/requirements.txt` | Python dependencies |
| **Environment Config** | `/backend/.env` | Database URLs, API keys |
| **Docker Config** | Root directory | Container configuration |
| **Build Scripts** | `/frontend/package.json` | Production build commands |

### **Environment Variables**
```bash
# 🔧 CRITICAL ENVIRONMENT VARIABLES - Location: /backend/.env
MONGO_URL=mongodb://localhost:27017/kgob_valuation
DB_NAME=kgob_valuation  
REACT_APP_BACKEND_URL=http://localhost:8001

# Future Ask Sara Integration
ASK_SARA_API_KEY=your-sara-api-key
ASK_SARA_BASE_URL=/api/ask-sara
```

---

## 🎯 **BUSINESS LOGIC LOCATIONS**

### **Key Business Rules**
| Business Rule | File | Lines | Algorithm |
|---------------|------|-------|-----------|
| **Exit Timeline Calculation** | `businessIntelligenceEngine.js` | 350-390 | Base 2 years + owner dependency + financial + wealth gap adjustments |
| **Customer Risk Scoring** | `businessIntelligenceEngine.js` | 250-280 | Concentration percentage impact on value |
| **Management ROI Formula** | `businessIntelligenceEngine.js` | 200-240 | Value increase vs. management investment calculation |
| **Industry Multiple Selection** | `businessIntelligenceEngine.js` | 400-430 | Industry type determines EBITDA multiple range |

### **Tier Access Business Logic**
```javascript
// 🔥 TIER SYSTEM LOCATION: Multiple files

// Main Access Control (KnowledgeBase.jsx Lines 40-120)
Free Tier: Complete lockout → drives consultation bookings
Buyer Tier: Limited access → drives Subscriber upgrades  
Subscriber Tier: Full access → delivers complete value

// Content Filtering (knowledgeBaseMock.js Lines 200-250)
Hierarchical access: Subscriber sees all, Buyer sees Free+Buyer, Free sees only Free
```

---

## 📞 **CONTACT & BRANDING LOCATIONS**

### **KGOB Contact Information Updates**
| Component | File Location | Contact Elements |
|-----------|---------------|------------------|
| **Knowledge Base Footers** | All KB components | Charlotte, NC address, phone, email |
| **Professional Headers** | `ExitPlanningCenter.jsx`, others | Logo + contact info |
| **Upgrade Prompts** | `LockedValuation.jsx`, others | Phone number for consultations |

### **Branding Consistency**
```javascript
// 🎨 KGOB BRANDING STANDARDS:

Address: "2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213"
Phone: "1-844-599-3355"  
Email: "support@kgob.cpa"
Logo: "/kgob-logo.png" with "KG" fallback
Colors: Teal (#17a2b8), Navy (#1e3a8a)
```

---

## 💡 **QUICK FIND REFERENCE**

### **"I Need To Find..."**
| What You're Looking For | Go To File | Specific Location |
|------------------------|------------|-------------------|
| **Main business analysis algorithm** | `businessIntelligenceEngine.js` | `analyzeBusinessForExitPlanning()` method |
| **How tier access works** | `KnowledgeBase.jsx` | Lines 40-120 |
| **Where logos are configured** | `TopNavigation.jsx` | Lines 15-35 |
| **Business value calculation** | `businessIntelligenceEngine.js` | `estimateCurrentBusinessValue()` method |
| **ROI calculation formulas** | `businessIntelligenceEngine.js` | Lines 200-280 |
| **Ask Sara integration setup** | `aiIntegrationLayer.js` | Lines 15-50 |
| **Industry benchmarks** | `businessIntelligenceEngine.js` | `loadIndustryBenchmarks()` method |
| **Assessment scoring** | `businessIntelligenceEngine.js` | Lines 300-400 |
| **UI color scheme** | `/frontend/src/index.css` | Lines 90-120 |
| **Database models** | `/backend/server.py` | Lines 20-40 |

---

*This guide ensures you can locate any feature, algorithm, or design element instantly within the KGOB codebase.*