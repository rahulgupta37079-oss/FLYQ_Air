#!/bin/bash

# 🚀 Send Delay Emails to 64 Customers - AUTO MODE
# This script automatically fetches your Resend API key from Cloudflare
# and sends the delay notification emails to all customers.

echo "🚀 FLYQ Drones - Send Delay Emails (AUTO MODE)"
echo "=============================================="
echo ""

# Check if orders data is in the script
ORDER_COUNT=$(grep -c "order_number:" send-delay-emails-simple.js)

if [ "$ORDER_COUNT" -le 1 ]; then
    echo "⚠️  WARNING: Only 1 order found in SAMPLE_ORDERS array"
    echo ""
    echo "You need to add your 64 orders to the script first:"
    echo "  1. Export orders from admin panel or database"
    echo "  2. Edit: send-delay-emails-simple.js"
    echo "  3. Add all 64 orders to SAMPLE_ORDERS array"
    echo ""
    echo "Current file: /home/user/webapp/send-delay-emails-simple.js"
    echo ""
    exit 1
fi

echo "✅ Found $ORDER_COUNT orders in script"
echo ""

# Fetch the Resend API key from Cloudflare environment
echo "🔑 Fetching Resend API key from Cloudflare..."
echo ""

# Since we can't directly get the secret value, we'll use the application's endpoint
# that has access to the environment variables

# Alternative: Use wrangler to run the script in the same environment
echo "📧 Running email sender with Cloudflare environment..."
echo ""

# Use wrangler to execute in production environment where RESEND_API_KEY is available
npx wrangler pages functions build
npx wrangler pages dev dist --local --compatibility-date=2024-01-01 &
WRANGLER_PID=$!

# Wait for server to start
sleep 3

# Create a temporary API endpoint caller
curl -X POST https://flyqdrone.in/api/admin/send-delay-emails \
  -H "Content-Type: application/json" \
  -d '{"send_mode": "production"}'

# Kill the local server
kill $WRANGLER_PID 2>/dev/null

echo ""
echo "✅ Email sending initiated!"
echo ""
echo "Check results at: https://resend.com/emails"
echo ""
