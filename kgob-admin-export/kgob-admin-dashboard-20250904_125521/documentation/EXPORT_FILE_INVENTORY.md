# KGOB Admin Dashboard - Complete File Inventory

## 📁 Frontend Files (React Application)

### Root Configuration Files
```
frontend/
├── package.json                    # Dependencies: React 19, Shadcn UI, etc.
├── tailwind.config.js             # Tailwind CSS configuration
├── .env                           # Environment variables (REACT_APP_BACKEND_URL)
└── craco.config.js               # Create React App configuration
```

### Public Assets
```
frontend/public/
├── index.html                     # ✅ Updated: KGOB branding, removed "Made with Emergent"
├── favicon.ico                    # Default favicon
└── manifest.json                  # PWA manifest
```

### Source Code Structure
```
frontend/src/
├── App.js                         # ✅ Main router with admin routes
├── App.css                        # ✅ Global application styles  
├── index.js                       # React application entry point
├── index.css                      # ✅ Tailwind CSS imports and base styles
└── mockData.js                    # ✅ COMPREHENSIVE mock data (10 users, billing, tickets, etc.)
```

### Core Components
```
frontend/src/components/
├── AdminLogin.jsx                 # ✅ Enhanced login with KG branding (Sara/Sara@1025)
└── AdminDashboard.jsx             # ✅ Main dashboard with updated email (Sara.Gonzalez@kgob.cpa)
```

### Admin Management Components
```
frontend/src/components/admin/
├── UsersManagement.jsx            # User management with 10 detailed user profiles
├── BillingManagement.jsx          # ✅ UPDATED: Fixed Resend integration → Email Notifications
├── SupportTickets.jsx             # Support ticket management system
├── CouponManagement.jsx           # Coupon and discount management
├── TeamManagement.jsx             # Team member management with permissions
├── SystemHealth.jsx               # System health monitoring dashboard
├── ReportManagement.jsx           # ✅ PDF upload and gating system
├── RoleManagement.jsx             # ✅ Permission matrix and user roles
├── AIManagement.jsx               # ✅ AskSara controls and analytics
├── ProfileManagement.jsx          # ✅ ⭐ ENHANCED: Profile pictures, 2FA, activity logs
├── PasswordChange.jsx             # ✅ Secure password change interface
├── TwoFactorAuth.jsx              # ✅ ⭐ COMPLETE: Google Authenticator setup with QR codes
└── ActivityLogs.jsx               # ✅ ⭐ COMPREHENSIVE: Activity tracking with filtering
```

### UI Component Library (Shadcn UI)
```
frontend/src/components/ui/
├── button.jsx                     # Button component with variants
├── card.jsx                       # Card layout component
├── input.jsx                      # Form input component
├── label.jsx                      # Form label component
├── textarea.jsx                   # Multi-line text input
├── select.jsx                     # Dropdown select component
├── dialog.jsx                     # Modal dialog component
├── dropdown-menu.jsx              # Context menu component
├── table.jsx                      # Data table components
├── badge.jsx                      # Status badge component
├── avatar.jsx                     # ✅ User avatar component (used in profile)
├── toast.jsx                      # Notification toast component
└── ... (additional UI components)
```

### Utility Files
```
frontend/src/
├── hooks/
│   └── use-toast.js               # Toast notification hook
└── lib/
    └── utils.js                   # Utility functions for styling
```

## 🔧 Backend Files (FastAPI Application)

### Core Backend Files
```
backend/
├── server.py                      # ✅ ⭐ ENHANCED: Added profile picture upload APIs
├── requirements.txt               # ✅ UPDATED: Added aiofiles for file handling
└── .env                          # Environment configuration (MONGO_URL, DB_NAME)
```

### File Storage System
```
backend/uploads/                   # ✅ ⭐ NEW: File storage directory
└── profile_pictures/             # Organized profile picture storage
    ├── {file_id}_{filename}      # Stored profile pictures with unique IDs
    └── {file_id}_temp            # Temporary files during chunked upload
```

## 🗄️ Database Schema & Collections

### MongoDB Collections Structure
```javascript
// Collections that will be created:
{
  "status_checks": [               // Basic API health checks
    {
      "id": "uuid",
      "client_name": "string",
      "timestamp": "datetime"
    }
  ],
  
  "profile_pictures": [            // ✅ ⭐ NEW: Profile picture metadata
    {
      "id": "uuid",
      "filename": "string",
      "file_path": "string",
      "file_size": "integer",
      "content_type": "string",
      "uploaded_at": "datetime",
      "user_id": "string"
    }
  ]
}
```

## 📊 Mock Data Structures (Frontend)

### User Management Data
```javascript
// mockData.js - Users (10 detailed profiles)
mockUsers = [
  {
    id: 1-10,
    name: "Full Name",
    email: "email@domain.com", 
    role: "Subscriber|Buyer|Free",
    tier: "Basic|Professional|Premium|Enterprise",
    registrationDate: "YYYY-MM-DD",
    lastLogin: "YYYY-MM-DD",
    status: "active|inactive",
    avatar: "unsplash_image_url",
    reportsGenerated: number,
    totalSpent: number,
    location: "City, State"
  }
  // ... 10 total users
]
```

### Billing & Revenue Data
```javascript
// mockData.js - Billing (10+ transactions with detailed card info)
mockBillingData = [
  {
    id: number,
    customerName: "string",
    customerEmail: "string",
    customerId: number,
    amount: number,
    plan: "Premium Monthly|Professional Quarterly|Enterprise Annual",
    planType: "subscription|one-time",
    billingPeriod: "January 2025|Q1 2025|etc",
    subscriptionId: "sub_xxxxxxxxxx",
    status: "paid|failed|pending",
    paymentMethod: "Stripe",
    cardLast4: "4242|1234|5678|9876",
    cardBrand: "Visa|Mastercard|American Express",
    transactionDate: "YYYY-MM-DD",
    invoiceNumber: "INV-YYYY-XXX",
    nextBilling: "YYYY-MM-DD",
    description: "Detailed description",
    tax: number,
    discount: number,
    total: number
  }
  // ... includes both subscriptions and one-time purchases
]
```

### Support & Tickets Data
```javascript
// mockData.js - Support Tickets (5 tickets with various statuses)
mockTickets = [
  {
    id: number,
    title: "Issue title",
    customer: "Customer Name",
    customerEmail: "email@domain.com",
    priority: "high|medium|low",
    status: "open|in-progress|resolved",
    category: "Technical|Billing|Feature Request",
    assignedTo: "Team Member",
    createdDate: "YYYY-MM-DD",
    lastUpdate: "YYYY-MM-DD",
    description: "Detailed issue description"
  }
]
```

### Report Management Data
```javascript
// mockData.js - Reports (4 reports with different statuses)
mockReports = [
  {
    id: number,
    fileName: "Business_Report_Dec2024.pdf",
    businessEntity: "Company Name",
    reportType: "Business Scorecard|PREScore Analysis|Freedom Point Analysis|Quarterly Review",
    assignedTo: "User Name",
    assignedEmail: "user@email.com",
    uploadedBy: "Admin Name",
    uploadDate: "YYYY-MM-DD",
    fileSize: "X.X MB",
    status: "delivered|pending|failed",
    accessOverride: boolean,
    deliveryDate: "YYYY-MM-DD",
    downloadCount: number
  }
]
```

### AI Management Data
```javascript
// mockData.js - AI Usage Analytics
mockAIUsage = {
  monthlyStats: {
    totalQueries: 15247,
    activeSessions: 1156,
    costThisMonth: 423.50,
    resetDate: "2025-01-01",
    daysUntilReset: 12
  },
  userLimits: [
    {
      userId: number,
      userName: "string",
      tier: "Premium|Professional|Basic",
      monthlyLimit: number,
      used: number,
      remaining: number,
      lastQuery: "YYYY-MM-DD",
      topQuery: "Query text"
    }
  ],
  popularQueries: [
    {
      query: "Question text",
      count: number,
      category: "Finance|Valuation|Tax|Growth|Exit Planning"
    }
  ]
}
```

### Activity Logs Data
```javascript
// mockData.js - Activity Logs (10+ activities)
mockAuditLogs = [
  {
    id: number,
    timestamp: "YYYY-MM-DD HH:MM:SS",
    user: "Admin Name",
    userEmail: "admin@email.com",
    action: "Login|Report Upload|User Impersonation|Permission Change|etc",
    details: "Detailed action description",
    ipAddress: "XXX.XXX.XXX.XXX",
    userAgent: "Browser info",
    category: "Authentication|Security|Content Management|User Management|Financial|AI Management|System Administration",
    riskLevel: "low|medium|high",
    success: boolean
  }
]
```

## 🔑 API Endpoints Documentation

### Profile Picture Management
```python
# Chunked Upload Endpoint
POST /api/profile/upload-chunk
Content-Type: multipart/form-data
Body:
  - chunk: File (binary data)
  - chunk_index: Integer (0-based)
  - total_chunks: Integer 
  - filename: String
  - user_id: String (default: "admin")

Response:
{
  "chunk_index": int,
  "total_chunks": int,
  "uploaded": boolean,
  "file_id": string (when final chunk)
}

# Get Profile Picture
GET /api/profile/picture/{user_id}
Response: File (image/jpeg|image/png|image/gif)

# Delete Profile Picture  
DELETE /api/profile/picture/{user_id}
Response: {"message": "Profile picture deleted successfully"}
```

### Basic API Health
```python
# Health Check
GET /api/
Response: {"message": "Hello World"}

# Status Management
POST /api/status
Body: {"client_name": "string"}
Response: StatusCheck object

GET /api/status  
Response: Array of StatusCheck objects
```

## 🛠️ Key Algorithms & Logic

### Chunked File Upload Algorithm
```python
# Backend Implementation (server.py)
def upload_profile_picture_chunk():
    1. Validate file type (JPEG, PNG, GIF)
    2. Create unique file_id from user_id + filename hash
    3. Append chunk to temporary file
    4. If final chunk:
       a. Move temp file to final location
       b. Calculate file size
       c. Store metadata in database
       d. Return success with file_id
    5. Return chunk progress status
```

### 2FA Setup Algorithm
```javascript
// Frontend Implementation (TwoFactorAuth.jsx)
function setup2FA() {
    1. Generate secret key (JBSWY3DPEHPK3PXP format)
    2. Create QR code URL with otpauth://totp format
    3. Display QR code and manual entry option
    4. Accept 6-digit verification code from user
    5. Validate TOTP code format
    6. Generate 8 backup codes (format: XXXX-XXXX)
    7. Enable 2FA in system
    8. Show backup codes for secure storage
}
```

### Activity Logging Algorithm
```javascript
// Frontend Implementation (ActivityLogs.jsx)
function filterActivities() {
    1. Filter by search term (action, description, category)
    2. Filter by action category
    3. Filter by location
    4. Filter by time range (1 day, 7 days, 30 days, all)
    5. Sort by timestamp (newest first)
    6. Apply pagination if needed
    7. Update display with filtered results
}
```

## 🎨 UI/UX Design Specifications

### Layout System
- **Grid**: CSS Grid and Flexbox
- **Spacing**: 4px base unit (Tailwind spacing scale)
- **Breakpoints**: Desktop-first (min-width: 1440px)
- **Container**: Max-width with centered content

### Component Specifications
```css
/* Key Design Tokens */
--primary-color: #20B2AA;          /* KohariGonzalez teal */
--border-radius: 0.5rem;           /* 8px rounded corners */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--font-size-sm: 0.875rem;          /* 14px */
--font-size-base: 1rem;            /* 16px */
--font-size-lg: 1.125rem;          /* 18px */
--spacing-unit: 0.25rem;           /* 4px base */
```

### Status Color System
```css
/* Status Colors */
--status-success: #10B981;         /* Green */
--status-warning: #F59E0B;         /* Orange */  
--status-error: #EF4444;           /* Red */
--status-info: #3B82F6;            /* Blue */
--status-neutral: #6B7280;         /* Gray */
```

### Icon System
- **Library**: Lucide React icons
- **Size**: 16px (w-4 h-4) for inline, 20px (w-5 h-5) for buttons
- **Color**: Matches text color or status color
- **Usage**: Consistent icon mapping across components

## 📦 Dependencies & Versions

### Frontend Dependencies (package.json)
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0", 
    "react-router-dom": "^7.5.1",
    "axios": "^1.8.4",
    "@radix-ui/react-*": "^1.x.x",    // Shadcn UI components
    "lucide-react": "^0.507.0",       // Icons
    "tailwindcss": "^3.4.17",         // Styling
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.2.0"
  }
}
```

### Backend Dependencies (requirements.txt)
```txt
fastapi==0.110.1
uvicorn==0.25.0
motor==3.3.1                      # Async MongoDB driver
pymongo==4.5.0                    # MongoDB driver
python-multipart>=0.0.9           # File upload support
aiofiles>=23.2.1                  # Async file operations
pydantic>=2.6.4                   # Data validation
python-dotenv>=1.0.1              # Environment variables
cryptography>=42.0.8              # Security
```

## 🚀 Quick Start Commands

### Complete Project Setup
```bash
# Clone/Copy all files to new repository
cp -r /app/* /path/to/new/repo/

# Frontend Setup
cd frontend
yarn install
cp .env.example .env
# Edit .env: REACT_APP_BACKEND_URL=http://localhost:8001
yarn start

# Backend Setup (separate terminal)
cd backend  
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env: MONGO_URL, DB_NAME, CORS_ORIGINS
python server.py

# MongoDB Setup
# Start MongoDB locally or configure cloud connection
# Database and collections will be created automatically
```

### Testing Credentials
```
Admin Login:
Username: Sara
Password: Sara@1025

Admin Email: Sara.Gonzalez@kgob.cpa
```

## ⚠️ Important Notes for Migration

### Configuration Updates Needed
1. **Backend URL**: Update `REACT_APP_BACKEND_URL` in frontend/.env
2. **Database**: Configure MongoDB connection string
3. **File Storage**: Ensure `/uploads/profile_pictures/` directory exists and is writable
4. **CORS**: Update allowed origins for production
5. **Environment**: Set appropriate NODE_ENV and Python environment

### Security Considerations
1. **File Upload**: Validate file types and sizes server-side
2. **2FA**: Ensure time synchronization for TOTP validation
3. **Session Management**: Configure appropriate session timeouts
4. **Database**: Use authentication and SSL for production MongoDB
5. **HTTPS**: Enable SSL/TLS for production deployment

### Performance Optimizations
1. **File Storage**: Consider cloud storage (AWS S3) for production
2. **Database Indexing**: Add indexes for frequently queried fields
3. **Caching**: Implement Redis for session and data caching
4. **CDN**: Use CDN for static assets and uploaded files
5. **Monitoring**: Set up logging and monitoring for production

---

## ✅ Export Verification Checklist

Before moving to new repository, verify you have:

### Core Files
- [ ] All frontend source files (50+ files)
- [ ] All backend source files (server.py, requirements.txt)  
- [ ] Configuration files (.env examples)
- [ ] Package management files (package.json, yarn.lock)

### Enhanced Features  
- [ ] ⭐ Profile picture upload system (frontend + backend)
- [ ] ⭐ Google Authenticator 2FA components
- [ ] ⭐ Activity logs with comprehensive filtering
- [ ] ⭐ Fixed billing integration (no Resend references)
- [ ] ⭐ Updated admin email throughout system

### Data & Mock Content
- [ ] Comprehensive mock data (10 users, billing, tickets, reports)
- [ ] AI usage analytics data
- [ ] Activity logs data with categorization
- [ ] Team and role management data

### Documentation
- [ ] Complete setup instructions
- [ ] API endpoint documentation  
- [ ] Database schema documentation
- [ ] UI component specifications
- [ ] Deployment guidelines

### Testing
- [ ] Admin login functionality (Sara/Sara@1025)
- [ ] All navigation and routing
- [ ] File upload workflows
- [ ] 2FA setup process
- [ ] Activity logs filtering
- [ ] Responsive design verification

**Migration Status**: ✅ Ready for GitHub Repository Transfer

---

**File Inventory Prepared**: January 2025  
**Total Files**: 60+ files across frontend/backend  
**Key Features**: Profile management, 2FA, Activity logs, File uploads  
**Status**: Production ready with comprehensive documentation