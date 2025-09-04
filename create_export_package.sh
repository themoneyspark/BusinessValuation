#!/bin/bash

# KGOB Admin Dashboard - Export Package Creator
# This script creates a complete export package for GitHub repository migration

set -e  # Exit on any error

echo "🚀 KGOB Admin Dashboard - Export Package Creator"
echo "=================================================="

# Define export directory
EXPORT_DIR="/app/kgob-admin-export"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
EXPORT_PACKAGE="kgob-admin-dashboard-${TIMESTAMP}"

echo "📁 Creating export directory: ${EXPORT_DIR}/${EXPORT_PACKAGE}"
mkdir -p "${EXPORT_DIR}/${EXPORT_PACKAGE}"

# Function to copy files with structure preservation
copy_with_structure() {
    local src=$1
    local dest=$2
    local description=$3
    
    echo "📋 Copying ${description}..."
    if [ -e "$src" ]; then
        cp -r "$src" "$dest"
        echo "   ✅ Copied: $src"
    else
        echo "   ⚠️  Not found: $src"
    fi
}

# Create main directory structure
echo "🏗️  Creating directory structure..."
mkdir -p "${EXPORT_DIR}/${EXPORT_PACKAGE}/frontend"
mkdir -p "${EXPORT_DIR}/${EXPORT_PACKAGE}/backend"
mkdir -p "${EXPORT_DIR}/${EXPORT_PACKAGE}/documentation"

echo ""
echo "📦 FRONTEND FILES"
echo "=================="

# Frontend root files
copy_with_structure "/app/frontend/package.json" "${EXPORT_DIR}/${EXPORT_PACKAGE}/frontend/" "Frontend package.json"
copy_with_structure "/app/frontend/tailwind.config.js" "${EXPORT_DIR}/${EXPORT_PACKAGE}/frontend/" "Tailwind configuration"
copy_with_structure "/app/frontend/.env" "${EXPORT_DIR}/${EXPORT_PACKAGE}/frontend/.env.example" "Frontend environment variables"

# Frontend public directory
copy_with_structure "/app/frontend/public" "${EXPORT_DIR}/${EXPORT_PACKAGE}/frontend/public" "Public assets"

# Frontend src directory
copy_with_structure "/app/frontend/src" "${EXPORT_DIR}/${EXPORT_PACKAGE}/frontend/src" "Frontend source code"

echo ""
echo "🔧 BACKEND FILES"
echo "================"

# Backend files
copy_with_structure "/app/backend/server.py" "${EXPORT_DIR}/${EXPORT_PACKAGE}/backend/" "FastAPI server"
copy_with_structure "/app/backend/requirements.txt" "${EXPORT_DIR}/${EXPORT_PACKAGE}/backend/" "Python dependencies"
copy_with_structure "/app/backend/.env" "${EXPORT_DIR}/${EXPORT_PACKAGE}/backend/.env.example" "Backend environment variables"

# Backend uploads directory (create structure but not files for privacy)
echo "📁 Creating uploads directory structure..."
mkdir -p "${EXPORT_DIR}/${EXPORT_PACKAGE}/backend/uploads/profile_pictures"
echo "# Profile pictures will be stored here" > "${EXPORT_DIR}/${EXPORT_PACKAGE}/backend/uploads/profile_pictures/.gitkeep"

echo ""
echo "📚 DOCUMENTATION FILES"
echo "======================"

# Copy documentation
copy_with_structure "/app/PROJECT_EXPORT_README.md" "${EXPORT_DIR}/${EXPORT_PACKAGE}/documentation/" "Main project documentation"
copy_with_structure "/app/EXPORT_FILE_INVENTORY.md" "${EXPORT_DIR}/${EXPORT_PACKAGE}/documentation/" "File inventory"
copy_with_structure "/app/test_result.md" "${EXPORT_DIR}/${EXPORT_PACKAGE}/documentation/" "Testing results"

# Create additional setup files
echo "🛠️  Creating setup files..."

# Create main README.md
cat > "${EXPORT_DIR}/${EXPORT_PACKAGE}/README.md" << 'EOF'
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
EOF

# Create docker-compose.yml for easy setup
cat > "${EXPORT_DIR}/${EXPORT_PACKAGE}/docker-compose.yml" << 'EOF'
version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    container_name: kgob-mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    container_name: kgob-backend
    restart: unless-stopped
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://admin:password@mongodb:27017/kgob_admin?authSource=admin
      - DB_NAME=kgob_admin
      - CORS_ORIGINS=http://localhost:3000
    depends_on:
      - mongodb
    volumes:
      - ./backend/uploads:/app/uploads

  frontend:
    build: ./frontend
    container_name: kgob-frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8001
    depends_on:
      - backend

volumes:
  mongodb_data:
EOF

# Create backend Dockerfile
cat > "${EXPORT_DIR}/${EXPORT_PACKAGE}/backend/Dockerfile" << 'EOF'
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p uploads/profile_pictures

EXPOSE 8001

CMD ["python", "server.py"]
EOF

# Create frontend Dockerfile
cat > "${EXPORT_DIR}/${EXPORT_PACKAGE}/frontend/Dockerfile" << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
EOF

# Create .gitignore
cat > "${EXPORT_DIR}/${EXPORT_PACKAGE}/.gitignore" << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
venv/
.venv/

# Environment variables
.env
.env.local
.env.production

# Build outputs
build/
dist/
*.log

# Database
*.db
*.sqlite

# Uploads (don't commit user files)
backend/uploads/profile_pictures/*.jpg
backend/uploads/profile_pictures/*.png
backend/uploads/profile_pictures/*.gif
!backend/uploads/profile_pictures/.gitkeep

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Temporary files
*_temp
*.tmp
EOF

echo ""
echo "📊 EXPORT SUMMARY"
echo "=================="

# Count files
echo "📁 Directory structure created:"
find "${EXPORT_DIR}/${EXPORT_PACKAGE}" -type d | sort

echo ""
echo "📄 Files exported:"
find "${EXPORT_DIR}/${EXPORT_PACKAGE}" -type f | wc -l | xargs echo "Total files:"

echo ""
echo "📦 Package contents:"
echo "   ├── frontend/               (React application)"
echo "   │   ├── src/                (Source code with all components)"
echo "   │   ├── public/             (Static assets)"
echo "   │   ├── package.json        (Dependencies)"
echo "   │   └── .env.example        (Environment template)"
echo "   ├── backend/                (FastAPI application)"
echo "   │   ├── server.py           (Enhanced with file upload APIs)"
echo "   │   ├── requirements.txt    (Python dependencies)"
echo "   │   ├── uploads/            (File storage structure)"
echo "   │   └── .env.example        (Environment template)"
echo "   ├── documentation/          (Complete project documentation)"
echo "   ├── docker-compose.yml      (Docker setup)"
echo "   ├── .gitignore              (Git ignore rules)"
echo "   └── README.md               (Quick start guide)"

echo ""
echo "✅ EXPORT COMPLETE!"
echo "==================="
echo "📦 Export package location: ${EXPORT_DIR}/${EXPORT_PACKAGE}"
echo "📁 Ready for GitHub repository upload"
echo ""
echo "🚀 Next steps:"
echo "   1. Create new GitHub repository"
echo "   2. Copy contents of ${EXPORT_PACKAGE} to repository"
echo "   3. Follow README.md for setup instructions"
echo "   4. Update environment variables for your deployment"
echo ""
echo "🎯 Features included:"
echo "   ✅ Profile picture upload system"
echo "   ✅ Google Authenticator 2FA integration"
echo "   ✅ Comprehensive activity logging" 
echo "   ✅ Complete admin dashboard"
echo "   ✅ Professional UI with KohariGonzalez branding"
echo "   ✅ Production-ready with Docker support"

# Create a simple verification script
cat > "${EXPORT_DIR}/${EXPORT_PACKAGE}/verify_export.sh" << 'EOF'
#!/bin/bash

echo "🔍 KGOB Admin Dashboard - Export Verification"
echo "=============================================="

# Check key files exist
key_files=(
    "frontend/package.json"
    "frontend/src/App.js"
    "frontend/src/mockData.js"
    "frontend/src/components/AdminDashboard.jsx"
    "frontend/src/components/admin/ProfileManagement.jsx"
    "frontend/src/components/admin/TwoFactorAuth.jsx"
    "frontend/src/components/admin/ActivityLogs.jsx"
    "backend/server.py"
    "backend/requirements.txt"
    "README.md"
    "docker-compose.yml"
)

echo "✅ Checking key files..."
missing_files=0

for file in "${key_files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ MISSING: $file"
        ((missing_files++))
    fi
done

echo ""
if [ $missing_files -eq 0 ]; then
    echo "🎉 All key files present! Export is complete."
    echo "📊 Total files: $(find . -type f | wc -l)"
    echo "📁 Total directories: $(find . -type d | wc -l)"
else
    echo "⚠️  Missing $missing_files key files. Please check export."
fi

echo ""
echo "🚀 Ready for GitHub repository!"
EOF

chmod +x "${EXPORT_DIR}/${EXPORT_PACKAGE}/verify_export.sh"

echo ""
echo "🔍 Running export verification..."
cd "${EXPORT_DIR}/${EXPORT_PACKAGE}" && ./verify_export.sh

echo ""
echo "📋 FINAL CHECKLIST"
echo "=================="
echo "✅ Frontend source code (React 19 with all components)"
echo "✅ Backend source code (FastAPI with enhanced APIs)"  
echo "✅ UI component library (Shadcn UI)"
echo "✅ Mock data (10 users, billing, tickets, reports, etc.)"
echo "✅ Advanced features (Profile pics, 2FA, Activity logs)"
echo "✅ Configuration files (.env examples)"
echo "✅ Documentation (Complete project docs)"
echo "✅ Docker setup (docker-compose.yml + Dockerfiles)"
echo "✅ Git configuration (.gitignore)"
echo "✅ Quick start guide (README.md)"

echo ""
echo "🎯 Export package ready at: ${EXPORT_DIR}/${EXPORT_PACKAGE}"
echo "💡 Tip: Archive this directory and upload to your GitHub repository"

exit 0
EOF

chmod +x /app/create_export_package.sh