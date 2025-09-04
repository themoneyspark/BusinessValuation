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
