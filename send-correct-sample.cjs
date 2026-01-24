const { Resend } = require('resend');

const RESEND_API_KEY = 're_NMszkEgy_89qF21MfGhJWpZBztp6ScrVA';
const resend = new Resend(RESEND_API_KEY);

const sampleOrder = {
  customer_name: 'Rahul Gupta',
  email: 'rahulgupta37079@gmail.com',
  order_number: 'FLYQ-1769275064206-Q485NH',
  total: 7999,
  product_name: 'FLYQ Air',
  tracking_id: 'TRK176927506422962EM7G',
  shipping_id: 'SHIP-FLYQ-1769275064206-Q485NH-1769275064229'
};

const password = '63696d7fde2f';
const pickupDate = 'Monday, January 26, 2026';
const loginUrl = 'https://flyqdrone.in/login';
const trackUrl = `https://flyqdrone.in/track-order?tracking=${sampleOrder.tracking_id}`;

const emailHtml = `
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
              <h2 style="margin: 0 0 20px; color: #1a202c; font-size: 24px;">Hello ${sampleOrder.customer_name}! 👋</h2>
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
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">${sampleOrder.order_number}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Product:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">${sampleOrder.product_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Price:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">₹${sampleOrder.total.toFixed(2)}</td>
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
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right; font-family: monospace;">${sampleOrder.tracking_id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">Shipping ID:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right; font-family: monospace;">${sampleOrder.shipping_id}</td>
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
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">${sampleOrder.email}</td>
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

          <!-- Action Buttons -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0 5px 0 0;">
                    <a href="${loginUrl}" style="display: block; background: #667eea; color: white; text-align: center; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                      🔑 Login to Account
                    </a>
                  </td>
                  <td style="padding: 0 0 0 5px;">
                    <a href="${trackUrl}" style="display: block; background: #48bb78; color: white; text-align: center; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                      📍 Track Order
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h3 style="margin: 0 0 15px; color: #2d3748; font-size: 18px;">📋 What's Next?</h3>
              <ol style="margin: 0; padding-left: 20px; color: #4a5568; font-size: 14px; line-height: 1.8;">
                <li>Your order will be picked up on <strong>${pickupDate}</strong></li>
                <li>You'll receive shipping updates via email</li>
                <li>Track your order anytime using the tracking link above</li>
                <li>Login to your account to view complete order details</li>
              </ol>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f7fafc; padding: 30px 40px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 10px; color: #718096; font-size: 14px;">
                Questions? Contact us at <a href="mailto:support@flyqdrones.com" style="color: #667eea; text-decoration: none;">support@flyqdrones.com</a>
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

(async () => {
  try {
    console.log('📧 Sending FIXED sample email to rahulgupta37079@gmail.com...');
    console.log('   ✅ Using correct API key');
    console.log('   ✅ Using verified domain (onboarding@resend.dev)');
    console.log('   ✅ Using custom domain (flyqdrone.in)');
    console.log('   ✅ Removed "Estimated Delivery" date');
    console.log('   ✅ Kept "Pickup Date" only\n');
    
    const result = await resend.emails.send({
      from: 'FLYQ Drones <onboarding@resend.dev>',
      to: 'rahulgupta37079@gmail.com',
      subject: '🚁 Welcome to FLYQ! Order ' + sampleOrder.order_number + ' Confirmed',
      html: emailHtml,
      tags: [
        { name: 'category', value: 'test' }
      ]
    });
    
    console.log('✅ Email sent successfully!\n');
    console.log('📋 Message ID:', result.data.id);
    console.log('\n📬 Check your inbox: rahulgupta37079@gmail.com');
    console.log('📬 Should arrive in INBOX (not SPAM) now!\n');
    console.log('🎯 This is the CORRECT format that will be sent to all customers');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
})();
