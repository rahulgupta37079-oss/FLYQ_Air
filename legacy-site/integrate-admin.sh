#!/bin/bash

echo "🚀 FLYQ Air Admin Backend Integration Script"
echo "==========================================="
echo ""

# Step 1: Apply migration
echo "📊 Step 1: Applying database migration..."
npx wrangler d1 migrations apply webapp-production --local

if [ $? -ne 0 ]; then
    echo "❌ Migration failed! Please check the error above."
    exit 1
fi

echo "✅ Migration applied successfully!"
echo ""

# Step 2: Check if admin routes are already integrated
echo "🔍 Step 2: Checking integration status..."
if grep -q "import admin from './admin'" src/index.tsx; then
    echo "✅ Admin routes already integrated!"
else
    echo "📝 Adding admin routes to index.tsx..."
    
    # Backup original file
    cp src/index.tsx src/index.tsx.backup
    
    # Add imports after the Hono import
    sed -i "3i import admin from './admin'" src/index.tsx
    sed -i "4i import ordersRouter from './admin-orders'" src/index.tsx
    sed -i "4i\\" src/index.tsx
    
    # Add route mounting before export
    sed -i '/export default app/i // Admin Backend System\napp.route('\''/admin'\'', admin)\n' src/index.tsx
    
    echo "✅ Admin routes integrated!"
fi

echo ""

# Step 3: Rebuild
echo "🔨 Step 3: Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check the error above."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Step 4: Restart PM2
echo "🔄 Step 4: Restarting server..."
pm2 restart all

echo "✅ Server restarted!"
echo ""

echo "🎉 Admin Backend Integration Complete!"
echo "========================================"
echo ""
echo "📱 Access your admin panel:"
echo "   Local:  http://localhost:3000/admin/login"
echo "   Production: https://183cd0ac.flyq-air.pages.dev/admin/login"
echo ""
echo "🔐 Default credentials:"
echo "   Email: admin@flyq.com"
echo "   Password: admin123"
echo ""
echo "📚 Documentation:"
echo "   - ADMIN_BACKEND_SUMMARY.md - Quick overview"
echo "   - ADMIN_INTEGRATION_STEPS.md - Detailed steps"
echo "   - ADMIN_BACKEND_COMPLETE_GUIDE.md - Full feature guide"
echo ""
echo "✨ Next steps:"
echo "   1. Open http://localhost:3000/admin/login in your browser"
echo "   2. Login with the credentials above"
echo "   3. Explore the admin dashboard"
echo "   4. Change your password in settings"
echo ""
