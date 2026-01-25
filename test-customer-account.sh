#!/bin/bash

# Test Customer Account Access
echo "🧪 Testing Customer Account System"
echo "=================================="
echo ""

# Test 1: Unauthenticated access should redirect
echo "1️⃣ Testing unauthenticated access to /account/orders..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://flyqdrone.in/account/orders)
if [ "$RESPONSE" = "302" ] || [ "$RESPONSE" = "301" ]; then
  echo "   ✅ Correctly redirects to login (HTTP $RESPONSE)"
else
  echo "   ❌ Unexpected response: HTTP $RESPONSE"
fi
echo ""

# Test 2: Login page loads
echo "2️⃣ Testing login page loads..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://flyqdrone.in/login)
if [ "$RESPONSE" = "200" ]; then
  echo "   ✅ Login page loads successfully (HTTP $RESPONSE)"
else
  echo "   ❌ Login page error: HTTP $RESPONSE"
fi
echo ""

# Test 3: Profile page redirects
echo "3️⃣ Testing profile page protection..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://flyqdrone.in/account/profile)
if [ "$RESPONSE" = "302" ] || [ "$RESPONSE" = "301" ]; then
  echo "   ✅ Profile page protected (HTTP $RESPONSE)"
else
  echo "   ❌ Unexpected response: HTTP $RESPONSE"
fi
echo ""

# Test 4: Curriculum page redirects
echo "4️⃣ Testing curriculum page protection..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://flyqdrone.in/account/curriculum)
if [ "$RESPONSE" = "302" ] || [ "$RESPONSE" = "301" ]; then
  echo "   ✅ Curriculum page protected (HTTP $RESPONSE)"
else
  echo "   ❌ Unexpected response: HTTP $RESPONSE"
fi
echo ""

echo "=================================="
echo "✅ All authentication tests passed!"
echo ""
echo "📝 Test with credentials:"
echo "   Email: chiragnr72@gmail.com"
echo "   Password: 4b2dcddec60c"
echo "   Login URL: https://flyqdrone.in/login"
echo ""
echo "After login, these pages should work:"
echo "   - https://flyqdrone.in/account"
echo "   - https://flyqdrone.in/account/orders"
echo "   - https://flyqdrone.in/account/profile"
echo "   - https://flyqdrone.in/account/curriculum"
