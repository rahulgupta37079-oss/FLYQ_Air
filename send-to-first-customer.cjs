const { Resend } = require('resend');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const RESEND_API_KEY = 're_4HUjptkC_7SVRK3pcyzJ6tERhEM1ySY4q';
const resend = new Resend(RESEND_API_KEY);

// Find the SQLite database file
const wranglerDir = path.join(__dirname, '.wrangler/state/v3/d1/miniflare-D1DatabaseObject');
const files = fs.readdirSync(wranglerDir);
const dbFile = files.find(f => f.endsWith('.sqlite'));
const dbPath = path.join(wranglerDir, dbFile);

console.log('📧 SENDING EMAIL TO FIRST CUSTOMER (CHIRAG)\n');
console.log('Database:', dbPath, '\n');

const db = new Database(dbPath);

// Get the FIRST customer order
const order = db.prepare(`
  SELECT 
    o.id,
    o.order_number,
    o.total,
    o.shipping_id,
    o.tracking_id,
    o.estimated_delivery,
    u.id as user_id,
    u.name as customer_name,
    u.email,
    u.phone,
    oi.product_name,
    oi.price
  FROM orders o
  JOIN users u ON o.user_id = u.id
  LEFT JOIN order_items oi ON o.id = oi.order_id
  WHERE o.status = 'confirmed'
  ORDER BY o.id
  LIMIT 1
`).get();

console.log('👤 Customer Details:');
console.log('   Name:', order.customer_name);
console.log('   Email:', order.email);
console.log('   Order:', order.order_number);
console.log('   Product:', order.product_name);
console.log('   Price: ₹' + order.total);
console.log('   Tracking:', order.tracking_id);
console.log('');

// Helper function to generate password
function generatePassword(email, userId) {
  const hash = require('crypto').createHash('md5').update(email + userId).digest('hex');
  return hash.substring(0, 12);
}

const password = generatePassword(order.email, order.user_id);
console.log('🔑 Password:', password);
console.log('');

// Email template
function createWelcomeEmail(order, password) {
  const pickupDate = 'Monday, January 26, 2026';
  const loginUrl = 'https://flyqdrone.in/login';
  const trackUrl = `https://flyqdrone.in/track-order?tracking=${order.tracking_id}`;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FLYQ Drones!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: white; font-size: 32px; font-weight: bold;">🚁 FLYQ Drones</h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 18px;">Welcome to the Future of Flight!</p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1a202c; font-size: 24px;">Hello ${order.customer_name}! 👋</h2>
              <p style="margin: 0 0 20px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Thank you for choosing FLYQ! We're thrilled to have you as part of our drone community. 
                Your order has been confirmed and we've created your personal account.
              </p>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: #f7fafc; border-left: 4px solid #667eea; padding: 20px; border-radius: 8px;">
                <h3 style="margin: 0 0 15px; color: #2d3748; font-size: 18px;">📦 Order Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Order Number:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">${order.order_number}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Product:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">${order.product_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Price:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">₹${order.total.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Status:</td>
                    <td style="padding: 8px 0; text-align: right;"><span style="background: #48bb78; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">CONFIRMED & PAID</span></td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Shipping Info -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: #edf2f7; border-left: 4px solid #4299e1; padding: 20px; border-radius: 8px;">
                <h3 style="margin: 0 0 15px; color: #2d3748; font-size: 18px;">🚚 Shipping Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Tracking ID:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right; font-family: monospace;">${order.tracking_id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Shipping ID:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right; font-family: monospace;">${order.shipping_id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Pickup Date:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">${pickupDate}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Login Credentials -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: #fef5e7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px;">
                <h3 style="margin: 0 0 15px; color: #2d3748; font-size: 18px;">🔐 Your Login Credentials</h3>
                <p style="margin: 0 0 15px; color: #718096; font-size: 14px;">Use these credentials to track your order and manage your account:</p>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Email:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">${order.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Password:</td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="color: #2d3748; font-size: 16px; font-weight: 700; font-family: 'Courier New', monospace; background: white; padding: 12px 20px; border-radius: 6px; display: inline-block; border: 2px solid #f59e0b;">${password}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Plain Text URLs -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 20px; border-radius: 8px;">
                <h3 style="margin: 0 0 15px; color: #2d3748; font-size: 18px;">🔗 Access Your Account</h3>
                <p style="margin: 0 0 10px; color: #718096; font-size: 14px;">Copy and paste these URLs into your browser:</p>
                
                <div style="margin: 15px 0;">
                  <p style="margin: 0 0 5px; color: #718096; font-size: 13px; font-weight: 600;">Login Page:</p>
                  <p style="margin: 0; padding: 10px; background: white; border-radius: 4px; font-family: monospace; font-size: 12px; color: #0284c7; word-break: break-all;">${loginUrl}</p>
                </div>
                
                <div style="margin: 15px 0;">
                  <p style="margin: 0 0 5px; color: #718096; font-size: 13px; font-weight: 600;">Track Your Order:</p>
                  <p style="margin: 0; padding: 10px; background: white; border-radius: 4px; font-family: monospace; font-size: 12px; color: #0284c7; word-break: break-all;">${trackUrl}</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h3 style="margin: 0 0 15px; color: #2d3748; font-size: 18px;">📋 What's Next?</h3>
              <ol style="margin: 0; padding-left: 20px; color: #4a5568; font-size: 14px; line-height: 1.8;">
                <li>Your order will be picked up on <strong>${pickupDate}</strong></li>
                <li>You'll receive shipping updates via email</li>
                <li>Copy the tracking URL above and paste it in your browser</li>
                <li>Use your email and password to login to your account</li>
              </ol>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f7fafc; padding: 30px 40px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 10px; color: #718096; font-size: 14px;">
                Questions? Contact us at support@flyqdrones.com
              </p>
              <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                © 2026 FLYQ Drones. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Send email
async function sendTestEmail() {
  console.log('📤 Sending email...\n');
  
  try {
    const result = await resend.emails.send({
      from: 'FLYQ Drones <orders@flyqdrone.in>',
      to: order.email,
      subject: `Welcome to FLYQ! Order ${order.order_number} Confirmed 🚁`,
      html: createWelcomeEmail(order, password),
      tags: [
        { name: 'category', value: 'welcome' },
        { name: 'order_id', value: order.order_number }
      ]
    });
    
    console.log('✅ EMAIL SENT SUCCESSFULLY!\n');
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (result.data) {
      console.log('\n📧 Message ID:', result.data.id);
    }
    
    console.log('\n═══════════════════════════════════════════════════');
    console.log('📋 SUMMARY');
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ Email sent to:', order.email);
    console.log('👤 Customer:', order.customer_name);
    console.log('📦 Order:', order.order_number);
    console.log('🔑 Password:', password);
    console.log('🔗 Login:', 'https://flyqdrone.in/login');
    console.log('🔗 Track:', `https://flyqdrone.in/track-order?tracking=${order.tracking_id}`);
    console.log('═══════════════════════════════════════════════════\n');
    
    console.log('✅ Check customer email:', order.email);
    console.log('✅ Check Resend dashboard: https://resend.com/emails');
    console.log('\nℹ️  If this works, we can send to all 63 customers!');
    
  } catch (error) {
    console.error('❌ ERROR SENDING EMAIL\n');
    console.error('Message:', error.message);
    console.error('Status:', error.statusCode);
    console.error('Full Error:', JSON.stringify(error, null, 2));
    
    if (error.statusCode === 422) {
      console.error('\n⚠️  422 Error - Possible causes:');
      console.error('   - Daily/monthly quota exceeded');
      console.error('   - Invalid email format');
      console.error('   - Domain not verified');
    }
    if (error.statusCode === 403) {
      console.error('\n⚠️  403 Error - Domain not verified or API key restricted');
    }
  } finally {
    db.close();
  }
}

sendTestEmail();
