#!/bin/bash

# Test Resend API Key - Send Test Email

echo "🧪 Testing Resend API Key..."
echo "=============================="
echo ""

# Test email payload
TEST_PAYLOAD='{
  "orders": [
    {
      "order_number": "TEST-ORDER-001",
      "tracking_id": "TEST123456789",
      "customer_name": "Test User",
      "customer_email": "csd.ra01@nitk.edu.in"
    }
  ],
  "dry_run": false
}'

echo "Sending test email to: csd.ra01@nitk.edu.in"
echo ""

# Send test email
curl -X POST 'https://flyqdrone.in/api/admin/send-bulk-delay-emails' \
  -H 'Content-Type: application/json' \
  -d "$TEST_PAYLOAD" \
  2>&1 | python3 -m json.tool 2>/dev/null || cat

echo ""
echo "✅ Check the email at: csd.ra01@nitk.edu.in"
echo ""
echo "If successful, you'll see:"
echo "  - 'sent_successfully': 1"
echo "  - 'status': 'sent'"
echo ""
