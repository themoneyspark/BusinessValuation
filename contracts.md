# KGOB Admin Dashboard - API Contracts & Backend Requirements

## Overview
This document outlines the backend API contracts and requirements for the enhanced KGOB Admin Dashboard with critical CPA workflow features.

---

## 🔄 PHASE 1: HIGH PRIORITY FEATURES

### 1. Report Management Module

#### API Endpoints Required:
```
POST /api/reports/upload
- Multipart file upload for PDF reports
- Fields: file, businessEntity, reportType, assignedUserId, accessOverride, notes
- Response: { reportId, uploadStatus, assignedTo }

GET /api/reports
- Query params: status, type, assignedTo, businessEntity
- Response: Array of report objects with metadata

PUT /api/reports/{reportId}/assign
- Body: { userId, accessOverride }
- Response: Updated report object

DELETE /api/reports/{reportId}
- Soft delete with audit trail

GET /api/reports/{reportId}/download
- Secure file download with access control
- Log download event for tracking
```

#### Database Schema:
```javascript
// reports collection
{
  _id: ObjectId,
  fileName: String,
  originalFileName: String,
  businessEntity: String,
  reportType: String, // "Business Scorecard", "PREScore Analysis", etc.
  assignedUserId: ObjectId,
  assignedUserEmail: String,
  uploadedBy: ObjectId,
  uploadDate: Date,
  fileSize: Number,
  filePath: String, // S3 or local storage path
  status: String, // "pending", "delivered", "failed"
  accessOverride: Boolean,
  deliveryDate: Date,
  downloadCount: Number,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Business Logic:
- File validation (PDF only, max size limits)
- User assignment with email notifications
- Access control based on subscription tiers
- Download tracking and audit logging
- Automatic status updates based on user access

---

### 2. Role & Permission Management

#### API Endpoints Required:
```
GET /api/roles/permissions
- Response: All available permissions with descriptions

PUT /api/team/{memberId}/permissions
- Body: { permissions: { viewFinancials: true, manageUsers: false, ... } }
- Response: Updated team member object

POST /api/impersonation/start
- Body: { targetUserId, reason }
- Response: { sessionToken, expiresAt }

POST /api/impersonation/end
- Body: { sessionId }
- Response: { success: true }

GET /api/audit/impersonation
- Response: Impersonation history with details
```

#### Database Schema:
```javascript
// team_members collection (enhanced)
{
  _id: ObjectId,
  name: String,
  email: String,
  role: String,
  department: String,
  permissions: {
    viewFinancials: Boolean,
    manageUsers: Boolean,
    uploadReports: Boolean,
    impersonateUsers: Boolean,
    manageAI: Boolean,
    auditLogs: Boolean,
    systemSettings: Boolean
  },
  status: String,
  lastImpersonation: Date,
  createdAt: Date,
  updatedAt: Date
}

// impersonation_sessions collection
{
  _id: ObjectId,
  adminUserId: ObjectId,
  targetUserId: ObjectId,
  sessionToken: String,
  startTime: Date,
  endTime: Date,
  reason: String,
  ipAddress: String,
  actions: Array // Track actions performed during impersonation
}
```

#### Business Logic:
- Role-based permission validation middleware
- Impersonation session management with timeouts
- Audit logging for all permission changes
- Hierarchical permission inheritance
- Security controls for sensitive operations

---

### 3. AI Management Dashboard

#### API Endpoints Required:
```
GET /api/ai/usage/stats
- Response: { totalQueries, activeSessions, costThisMonth, resetDate }

GET /api/ai/usage/users
- Query params: tier, period
- Response: Array of user usage objects

POST /api/ai/credits/inject
- Body: { userId, creditAmount, reason }
- Response: Updated user limits

POST /api/ai/usage/reset
- Body: { userId } or { resetAll: true }
- Response: Reset confirmation

GET /api/ai/queries/popular
- Response: Most frequent queries with categories

GET /api/ai/analytics
- Response: Detailed usage analytics and trends
```

#### Database Schema:
```javascript
// ai_usage collection
{
  _id: ObjectId,
  userId: ObjectId,
  month: String, // "2024-12"
  monthlyLimit: Number,
  used: Number,
  remaining: Number,
  queries: [{
    query: String,
    timestamp: Date,
    category: String,
    responseTime: Number,
    tokens: Number
  }],
  lastQuery: Date,
  resetDate: Date,
  injectedCredits: Number,
  injectionHistory: [{
    amount: Number,
    reason: String,
    injectedBy: ObjectId,
    date: Date
  }]
}

// ai_analytics collection
{
  _id: ObjectId,
  date: Date,
  totalQueries: Number,
  uniqueUsers: Number,
  topQueries: Array,
  avgResponseTime: Number,
  costPerQuery: Number,
  peakUsageHour: Number
}
```

#### Business Logic:
- Monthly usage tracking and automatic resets
- Tier-based limit enforcement
- Credit injection with audit trails
- Query categorization and analytics
- Cost tracking and optimization

---

## 📊 EXISTING FEATURES ENHANCEMENTS

### Enhanced Billing Management

#### New API Endpoints:
```
GET /api/billing/customer/{customerId}/history
- Response: Complete billing history grouped by type

GET /api/billing/payment-methods/{customerId}
- Response: Stored payment methods with last 4 digits

POST /api/billing/subscription/cancel
- Body: { customerId, subscriptionId, reason }

POST /api/billing/payment/retry
- Body: { transactionId }
```

#### Enhanced Database Schema:
```javascript
// billing_transactions collection (enhanced)
{
  // ... existing fields
  billingPeriod: String, // "January 2025", "Q1 2025"
  subscriptionId: String,
  cardLast4: String,
  cardBrand: String,
  planType: String, // "subscription" | "one-time"
  tax: Number,
  discount: Number,
  total: Number,
  description: String
}
```

---

## 🔒 SECURITY & MIDDLEWARE REQUIREMENTS

### Authentication & Authorization
```javascript
// Permission middleware
const requirePermission = (permission) => {
  return async (req, res, next) => {
    const user = await getAuthenticatedUser(req);
    if (!user.permissions[permission]) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Usage examples:
app.post('/api/reports/upload', requirePermission('uploadReports'), uploadReport);
app.get('/api/billing/*', requirePermission('viewFinancials'), getBillingData);
```

### Audit Logging
```javascript
// audit_logs collection
{
  _id: ObjectId,
  timestamp: Date,
  userId: ObjectId,
  userEmail: String,
  action: String,
  resource: String,
  resourceId: String,
  details: String,
  ipAddress: String,
  userAgent: String,
  category: String, // "Security", "Content Management", etc.
  metadata: Object // Additional context data
}
```

---

## 📁 FILE MANAGEMENT REQUIREMENTS

### Report Upload & Storage
```javascript
// File upload configuration
const multer = require('multer');
const upload = multer({
  dest: 'uploads/reports/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    cb(null, file.mimetype === 'application/pdf');
  }
});

// File storage strategy
// Option 1: Local storage with structured paths
// /uploads/reports/{year}/{month}/{userId}/{reportId}.pdf

// Option 2: AWS S3 integration
// Bucket: kgob-reports
// Path: reports/{year}/{month}/{userId}/{reportId}.pdf
```

### File Access Control
- Signed URLs for secure downloads
- User permission validation before file access
- Download tracking and analytics
- Virus scanning for uploaded files

---

## 📈 ANALYTICS & REPORTING

### Data Aggregation Requirements
```javascript
// Daily aggregation for analytics
{
  date: Date,
  metrics: {
    newUsers: Number,
    reportsUploaded: Number,
    aiQueriesProcessed: Number,
    revenue: Number,
    supportTicketsCreated: Number,
    impersonationSessions: Number
  }
}
```

### Real-time Metrics
- WebSocket connections for live dashboard updates
- Redis caching for frequently accessed metrics
- Background jobs for data aggregation

---

## 🔄 INTEGRATION REQUIREMENTS

### Email Notifications (Resend)
```javascript
// Report assignment notifications
const notifyReportAssignment = {
  to: user.email,
  subject: `New ${reportType} Available - ${businessEntity}`,
  template: 'report-assignment',
  data: {
    userName: user.name,
    businessEntity,
    reportType,
    downloadUrl: generateSecureDownloadUrl(reportId)
  }
};
```

### Payment Processing (Stripe)
- Enhanced webhook handling for subscription events
- Payment method storage with tokenization
- Failed payment retry logic
- Subscription lifecycle management

---

## 📋 IMPLEMENTATION PRIORITIES

### Phase 1 (Critical - Week 1)
1. Report Management API endpoints
2. File upload and storage system
3. Basic role permissions middleware
4. Enhanced billing history endpoints

### Phase 2 (High Priority - Week 2)
1. User impersonation system
2. AI usage tracking and management
3. Comprehensive audit logging
4. Permission management interface APIs

### Phase 3 (Medium Priority - Week 3)
1. Advanced analytics endpoints
2. Real-time dashboard updates
3. Batch operations for data management
4. Performance optimization

---

## 🧪 TESTING REQUIREMENTS

### Unit Tests
- File upload validation
- Permission middleware
- AI usage calculations
- Billing calculations

### Integration Tests
- End-to-end report workflow
- User impersonation sessions
- Payment processing flows
- Email notification delivery

### Security Tests
- Permission bypass attempts
- File access control
- Input validation
- SQL injection prevention

---

## 📊 MONITORING & PERFORMANCE

### Key Metrics to Track
- File upload success rates
- API response times
- Permission check performance
- AI usage accuracy
- Database query optimization

### Error Handling
- Comprehensive error logging
- User-friendly error messages
- Fallback mechanisms for critical operations
- Automated error alerting

---

This contract provides the complete backend foundation needed to support all the enhanced admin dashboard features while maintaining security, performance, and scalability standards.