# KGOB Admin Dashboard

A comprehensive administration interface for business valuation platform with advanced profile management features.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ with Yarn
- Python 3.11+
- MongoDB 5.0+

### Setup Instructions

1. **Frontend Setup**
   ```bash
   cd frontend
   yarn install
   cp .env.example .env
   # Update REACT_APP_BACKEND_URL in .env
   yarn start
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   # Update MONGO_URL and other variables in .env
   python server.py
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8001
   - Login: Sara / Sara@1025

## 📋 Features

✅ **Advanced Profile Management**
- Profile picture upload with chunked uploads
- Google Authenticator 2FA integration  
- Comprehensive activity logging
- Enhanced security features

✅ **Complete Admin Dashboard**
- User management (10 detailed profiles)
- Billing & revenue tracking with Stripe integration
- Support ticket management
- Report management with PDF uploads
- AI usage analytics and controls
- Role and permission management
- System health monitoring

✅ **Professional UI/UX**
- Desktop-first design (1440px+)
- KohariGonzalez branding with teal accent
- Data-dense, professional interface
- Responsive components with Shadcn UI

## 📖 Documentation

See the `/documentation` folder for comprehensive project documentation:
- `PROJECT_EXPORT_README.md` - Complete project overview
- `EXPORT_FILE_INVENTORY.md` - Detailed file inventory
- `test_result.md` - Testing results and protocols

## 🔧 Tech Stack

- **Frontend**: React 19, Shadcn UI, Tailwind CSS
- **Backend**: FastAPI (Python), Motor (async MongoDB)
- **Database**: MongoDB
- **File Storage**: Local filesystem with organized structure
- **Authentication**: Admin login with 2FA support

## 🛡️ Security Features

- File upload validation and chunked uploads
- Google Authenticator 2FA integration
- Activity logging and audit trails
- Role-based access control
- Secure session management

## 📞 Support

For setup assistance or questions, refer to the documentation in the `/documentation` folder.

---

**Export Date**: January 2025  
**Status**: Production Ready ✅
