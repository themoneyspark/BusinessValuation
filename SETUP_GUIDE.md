# KGOB Setup & Deployment Guide

## 🚀 Complete Setup Instructions

This guide provides step-by-step instructions for setting up, running, and deploying the KGOB Business Valuation Dashboard.

---

## 🛠️ **QUICK START (5 Minutes)**

### **Prerequisites**
- **Node.js** 18+ and **Yarn** package manager
- **Python** 3.8+ with **pip**
- **MongoDB** (local or cloud instance)
- **Git** for version control

### **1. Clone Repository**
```bash
git clone https://github.com/yourusername/kgob-business-valuation-dashboard.git
cd kgob-business-valuation-dashboard
```

### **2. Frontend Setup**
```bash
cd frontend
yarn install                    # Install all React dependencies
yarn start                      # Start development server (http://localhost:3000)
```

### **3. Backend Setup**
```bash
cd backend
pip install -r requirements.txt # Install Python dependencies
uvicorn server:app --reload     # Start FastAPI server (http://localhost:8001)
```

### **4. Access Application**
- **Dashboard:** http://localhost:3000
- **API Docs:** http://localhost:8001/docs
- **Default User:** Sara Gonzalez (Sara PLLC)
- **Test Tiers:** Use dropdown to switch between Free/Buyer/Subscriber

---

## ⚙️ **DETAILED CONFIGURATION**

### **Environment Variables**
**File:** `/backend/.env`

```bash
# 🔧 CRITICAL CONFIGURATION
MONGO_URL=mongodb://localhost:27017/kgob_valuation
DB_NAME=kgob_valuation
REACT_APP_BACKEND_URL=http://localhost:8001

# 🔮 FUTURE ASK SARA INTEGRATION
ASK_SARA_API_KEY=your-sara-api-key
ASK_SARA_BASE_URL=/api/ask-sara
ASK_SARA_MODEL=sara-business-advisor

# 📧 EMAIL CONFIGURATION (Optional)
EMAIL_SERVICE_API_KEY=your-email-key
CONTACT_EMAIL=support@kgob.cpa

# 🔒 SECURITY (Production)
JWT_SECRET_KEY=your-secret-key
CORS_ORIGINS=["http://localhost:3000", "https://yourdomain.com"]
```

### **Frontend Configuration**
**File:** `/frontend/.env`

```bash
# 🌐 FRONTEND ENVIRONMENT
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_ENVIRONMENT=development
REACT_APP_COMPANY_NAME=Kohari Gonzalez CPAs & Advisors
REACT_APP_CONTACT_PHONE=1-844-599-3355
REACT_APP_CONTACT_EMAIL=support@kgob.cpa
```

---

## 🎯 **FEATURE ACTIVATION GUIDE**

### **Tier System Configuration**
**Location:** `/frontend/src/data/mock.js`

```javascript
// 🔒 USER TIER CONFIGURATION
export const userData = {
  name: "Sara Gonzalez",
  firstName: "Sara", 
  company: "Sara PLLC",
  tier: "Free", // "Free", "Buyer", "Subscriber"
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e2cd?w=150&h=150&fit=crop&crop=face",
  notifications: 3
};

// Different data for each tier
export const quickStats = {
  Free: {
    businessValue: "--",        // Locked content
    overallScore: "--",
    exitReadiness: "--"
  },
  Subscriber: {
    businessValue: "$1.4M - $1.8M",  // Full access content
    overallScore: "85/100", 
    exitReadiness: "78%"
  }
};
```

### **Knowledge Base Access Control**
**Location:** `/frontend/src/components/knowledgebase/KnowledgeBase.jsx` Lines 40-120

```javascript
// 🔒 TIER ACCESS CONFIGURATION
if (userTier === 'Free') {
  return <CompletelyLockedScreen />; // Strong paywall
}
if (userTier === 'Buyer') {
  return <LimitedAccessScreen />;    // Upgrade prompts
}
// Subscriber gets full access to all tools
```

---

## 🧠 **BUSINESS INTELLIGENCE CONFIGURATION**

### **Industry Benchmarks Setup**
**Location:** `/frontend/src/utils/businessIntelligenceEngine.js` Lines 30-115

```javascript
// 🏢 CUSTOMIZE INDUSTRY BENCHMARKS
const industryBenchmarks = {
  "your-industry": {
    typicalMultiples: { low: 2.0, average: 3.0, high: 4.5 },
    profitMarginBenchmarks: { low: 5, average: 12, high: 20 },
    ownerCentricityTarget: 75,
    customerConcentrationLimit: 25,
    keySuccessFactors: [
      "Your industry-specific factor 1",
      "Your industry-specific factor 2"
    ]
  }
};
```

### **Ask Sara Integration Setup**
**Location:** `/frontend/src/utils/aiIntegrationLayer.js`

```javascript
// 🤖 ASK SARA CONFIGURATION
import { enableAskSaraEnhancement } from './utils/aiIntegrationLayer';

// Activate Ask Sara AI (when API available)
enableAskSaraEnhancement({
  apiKey: 'your-sara-api-key',
  baseURL: '/api/ask-sara',
  maxTokens: 2000
});

// Integration points in components:
// - PersonalizedRecommendationEngine.jsx Lines 200-250
// - BusinessValueTracker.jsx Lines 300-350
// - All Phase components for enhanced guidance
```

---

## 🎨 **UI CUSTOMIZATION**

### **KGOB Branding Updates**
**File:** `/frontend/src/index.css` Lines 90-120

```css
/* 🎨 CUSTOMIZE KGOB COLORS */
:root {
  --primary-teal: #17a2b8;      /* Main KGOB teal */
  --secondary-navy: #1e3a8a;    /* Professional navy */
  --success-green: #10b981;     /* Success indicators */
  --warning-yellow: #f59e0b;    /* Warning states */
}

/* Custom Utility Classes */
.w-60 { width: 15rem; }         /* Logo area width */
.w-70 { width: 17.5rem; }       /* Sidebar width */ 
.h-18 { height: 4.5rem; }       /* Header height */
.ml-70 { margin-left: 17.5rem; } /* Content left margin */
.text-navy-900 { color: #1e3a8a; } /* KGOB navy color */
```

### **Logo Configuration**
**Location:** `/frontend/public/kgob-logo.png` + component fallbacks

```jsx
// 🎨 LOGO SYSTEM CONFIGURATION
<img 
  src="/kgob-logo.png"
  alt="KGOB Logo"
  className="h-12 w-auto object-contain"
  onError={(e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'flex';
  }}
/>
<div className="hidden w-12 h-12 bg-teal-500 rounded-lg items-center justify-center">
  <span className="text-white font-bold text-lg">KG</span>
</div>
```

---

## 🚀 **DEPLOYMENT OPTIONS**

### **1. Local Development**
```bash
# Start both servers
cd frontend && yarn start     # React dev server (Port 3000)
cd backend && uvicorn server:app --reload  # FastAPI server (Port 8001)
```

### **2. Production Build**
```bash
# Frontend production build
cd frontend
yarn build                    # Creates optimized build in /build directory

# Backend production
cd backend  
uvicorn server:app --host 0.0.0.0 --port 8001 # Production FastAPI
```

### **3. Docker Deployment** (If Configured)
```bash
docker-compose up --build     # Build and run both frontend + backend
```

### **4. Cloud Deployment Options**
- **Vercel/Netlify:** Frontend deployment (React build)
- **Heroku/Railway:** Full-stack deployment
- **AWS/Google Cloud:** Enterprise deployment
- **MongoDB Atlas:** Cloud database option

---

## 📊 **DATABASE SETUP**

### **MongoDB Configuration**
**Default Connection:** `mongodb://localhost:27017/kgob_valuation`

```javascript
// 🗄️ DATABASE MODELS - Location: /backend/server.py Lines 20-40
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

// Future: Business assessment models, user profiles, exit plans
```

### **Sample Data Population**
**Location:** `/frontend/src/data/mock.js`

- **User Data:** Sara Gonzalez sample profile
- **Business Metrics:** Tier-specific sample data
- **Assessment Content:** Sample responses and progress
- **Industry News:** Sample industry articles

---

## 🔧 **TROUBLESHOOTING**

### **Common Issues & Solutions**

#### **Frontend Won't Start**
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
yarn start
```

#### **Backend API Errors**
```bash
# Check Python dependencies
pip install --upgrade -r requirements.txt
uvicorn server:app --reload --log-level debug
```

#### **Database Connection Issues**
```bash
# Verify MongoDB is running
mongo --eval "db.adminCommand('ismaster')"

# Check connection string in .env
MONGO_URL=mongodb://localhost:27017/kgob_valuation
```

#### **Logo Display Issues**
- Check `/frontend/public/kgob-logo.png` file exists
- Verify image file is not corrupted
- Fallback "KG" logo should display automatically

---

## 📱 **MOBILE & RESPONSIVE TESTING**

### **Responsive Breakpoints**
```css
/* 🎨 RESPONSIVE DESIGN TESTING */

/* Desktop (1920px) */
- Full sidebar navigation
- 4-column stats grid  
- Side-by-side assessment layout

/* Tablet (768px) */ 
- Collapsible sidebar
- 2-column stats grid
- Stacked content modules

/* Mobile (390px) */
- Hidden sidebar (hamburger menu)
- Single column layout
- Vertically stacked everything
```

### **Testing Commands**
```bash
# Test different screen sizes
yarn start    # Then use browser dev tools to test responsive design

# Lighthouse audit (performance, accessibility, SEO)  
yarn build && npx lighthouse http://localhost:3000 --view
```

---

## 🎯 **BUSINESS LOGIC TESTING**

### **Algorithm Testing**
**Location:** Create test files in `/frontend/src/utils/__tests__/`

```javascript
// 🧪 BUSINESS INTELLIGENCE TESTING
import { businessAnalyzer } from '../businessIntelligenceEngine';

// Test business valuation calculation
const testBusinessData = {
  revenue: 2500000,
  profitMargin: 12,
  ownerCentricityScore: 45,
  topCustomerPercentage: 35,
  industry: 'professional-services'
};

const analysis = await businessAnalyzer.analyzeBusinessForExitPlanning(testBusinessData);
console.log('Business value estimate:', analysis.estimatedValue);
console.log('Exit readiness score:', analysis.exitReadinessScore);
console.log('Recommendations:', analysis.recommendations);
```

### **ROI Calculation Verification**
```javascript
// 🧪 ROI ALGORITHM TESTING
const roiTest = businessAnalyzer.calculateManagementImprovementROI(testBusinessData, 2300000);
console.log('Management hire ROI:', roiTest.roi + '%');
console.log('Expected value increase:', '$' + roiTest.valueIncrease.toLocaleString());
console.log('Payback period:', roiTest.paybackPeriod + ' months');
```

---

## 📈 **PERFORMANCE OPTIMIZATION**

### **Frontend Performance**
- **Code Splitting:** Lazy load Knowledge Base components
- **Image Optimization:** Optimize KGOB logo and assets
- **Bundle Analysis:** `yarn build && yarn analyze`

### **Backend Performance**  
- **Database Indexing:** Add indexes for user queries and assessments
- **Caching:** Cache industry benchmarks and calculation results
- **API Optimization:** Async/await patterns for database operations

---

## 🔮 **FUTURE ENHANCEMENTS**

### **Ask Sara AI Integration Roadmap**
1. **Phase 1:** Enable Ask Sara API integration in `aiIntegrationLayer.js`
2. **Phase 2:** Add natural language enhancement to recommendations  
3. **Phase 3:** Implement conversational business Q&A
4. **Phase 4:** Add voice interface for assessments

### **Business Features Roadmap**
1. **Client Portal:** Multi-user access with advisor/client roles
2. **Document Management:** Upload and analysis of actual business documents
3. **Progress Tracking:** Long-term progress monitoring and reporting
4. **Integration APIs:** Connect to accounting software and CRM systems

---

## 📞 **SUPPORT & CONTACT**

### **Technical Support**
- **Documentation:** This guide + in-code comments
- **Business Logic:** See BUSINESS_INTELLIGENCE_GUIDE.md
- **UI Components:** See UI_COMPONENT_GUIDE.md
- **Feature Locations:** See FEATURE_GUIDE.md

### **KGOB Business Contact**
- **Address:** 2740 East WT Harris Blvd, Suite 200, Charlotte, NC 28213
- **Phone:** 1-844-599-3355
- **Email:** support@kgob.cpa

---

## ✅ **DEPLOYMENT CHECKLIST**

### **Pre-Deployment Verification**
- [ ] All tests pass (`yarn test`)
- [ ] Production build works (`yarn build`)
- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] KGOB logo displays correctly
- [ ] Contact information updated
- [ ] Tier access control working

### **Production Deployment Steps**
1. **Build production frontend:** `yarn build`
2. **Configure production environment variables**
3. **Setup production MongoDB instance**
4. **Deploy FastAPI backend to production server**
5. **Deploy React build to web server/CDN**
6. **Test complete application functionality**
7. **Verify tier-based access control**
8. **Test business intelligence calculations**

### **Post-Deployment Testing**
- [ ] All tiers work correctly (Free locked, Subscriber full access)
- [ ] Business calculations accurate
- [ ] Contact forms and CTAs functional  
- [ ] Mobile responsiveness verified
- [ ] Performance acceptable (load times <3 seconds)

---

*Your KGOB Business Valuation Dashboard is now ready for professional deployment and client use!*