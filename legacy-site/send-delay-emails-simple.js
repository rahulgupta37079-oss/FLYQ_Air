#!/usr/bin/env node

/**
 * Send Transit Delay Emails to 64 Customers (Simplified Version)
 * 
 * This script sends tracking emails with delay notification to customers.
 * It uses a simplified approach with sample data for demonstration.
 * 
 * Usage: 
 *   - Dry run: DRY_RUN=true node send-delay-emails-simple.js
 *   - Real send: RESEND_API_KEY=your_key node send-delay-emails-simple.js
 */

import { Resend } from 'resend';

// Configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = 'FLYQ Drones <noreply@flyqdrones.com>';
const DRY_RUN = process.env.DRY_RUN === 'true';

console.log('🚀 Transit Delay Email Sender (Simplified)');
console.log('==========================================\n');

if (!RESEND_API_KEY && !DRY_RUN) {
  console.error('❌ Error: RESEND_API_KEY environment variable not set');
  console.log('\nUsage:');
  console.log('  RESEND_API_KEY=your_key node send-delay-emails-simple.js');
  console.log('\nOr for dry run (test without sending):');
  console.log('  DRY_RUN=true node send-delay-emails-simple.js');
  process.exit(1);
}

// Initialize Resend (only if not dry run)
const resend = DRY_RUN ? null : new Resend(RESEND_API_KEY);

// Sample orders data - Replace with your actual 64 orders
// Format: { order_number, tracking_id, customer_name, customer_email }
const SAMPLE_ORDERS = [
  {
    order_number: 'FLYQ-1769360779114-CPFTQP',
    tracking_id: 'TRK1769360779114MZIP0UZ4',
    customer_name: 'Director NITK',
    customer_email: 'csd.ra01@nitk.edu.in'
  },
  // Add your other 63 orders here...
  // You can export this from your database or admin panel
];

// Email template
function generateEmailHTML(order) {
  const deliveryDay = Math.random() < 0.5 ? 7 : 8;
  const deliveryDate = deliveryDay === 7 ? 'February 7, 2026' : 'February 8, 2026';
  const trackingUrl = `https://flyqdrone.in/track/${order.tracking_id}`;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your FLYQ Drone Has Shipped</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px; }
    .delay-notice { background-color: #FFF7ED; border-left: 4px solid #F97316; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .delay-notice h3 { color: #C2410C; margin-top: 0; }
    .info-box { background-color: #F0F9FF; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #E0E0E0; }
    .info-label { font-weight: 600; color: #666; }
    .info-value { color: #333; font-weight: 500; }
    .button { display: inline-block; background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .timeline { margin: 30px 0; }
    .timeline-item { display: flex; gap: 15px; margin-bottom: 20px; }
    .timeline-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: white; font-weight: bold; }
    .timeline-icon.completed { background-color: #10B981; }
    .timeline-icon.current { background-color: #F97316; }
    .timeline-icon.pending { background-color: #D1D5DB; }
    .timeline-content h4 { margin: 0 0 5px 0; color: #333; }
    .timeline-content p { margin: 0; color: #666; font-size: 14px; }
    .support { background-color: #EFF6FF; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
    .support-links { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 15px; }
    .support-link { display: inline-block; padding: 10px 20px; background-color: #0EA5E9; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; }
    .footer { background-color: #F9FAFB; padding: 30px; text-align: center; color: #666; font-size: 14px; }
    @media only screen and (max-width: 600px) {
      .content { padding: 20px; }
      .header { padding: 30px 20px; }
      .info-row { flex-direction: column; }
      .support-links { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📦 Your FLYQ Drone Has Shipped!</h1>
    </div>

    <div class="content">
      <p>Dear ${order.customer_name},</p>
      
      <p>Great news! Your FLYQ drone order has been shipped from our Mumbai facility and is on its way to you.</p>

      <div class="delay-notice">
        <h3>⚠️ Delivery Update</h3>
        <p>Due to increased demand during this season, deliveries are experiencing a slight delay. Your order is now expected to arrive on <strong>${deliveryDate}</strong>.</p>
        <p style="margin-bottom: 0; font-size: 14px; color: #92400E;">We apologize for any inconvenience and appreciate your patience.</p>
      </div>

      <div class="info-box">
        <h3 style="margin-top: 0; color: #0EA5E9;">📋 Order Details</h3>
        <div class="info-row">
          <span class="info-label">Order Number:</span>
          <span class="info-value">${order.order_number}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Tracking ID:</span>
          <span class="info-value" style="font-family: monospace;">${order.tracking_id}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Expected Delivery:</span>
          <span class="info-value" style="color: #F97316; font-weight: 700;">${deliveryDate}</span>
        </div>
        <div class="info-row" style="border-bottom: none;">
          <span class="info-label">Shipped From:</span>
          <span class="info-value">Mumbai, Maharashtra</span>
        </div>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${trackingUrl}" class="button">🚚 Track Your Order</a>
      </div>

      <div class="timeline">
        <h3 style="color: #0EA5E9;">📍 Delivery Timeline</h3>
        
        <div class="timeline-item">
          <div class="timeline-icon completed">✓</div>
          <div class="timeline-content">
            <h4>Order Confirmed</h4>
            <p>Your order has been received</p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-icon completed">✓</div>
          <div class="timeline-content">
            <h4>Picked Up</h4>
            <p>Package collected from Mumbai warehouse</p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-icon current">🚚</div>
          <div class="timeline-content">
            <h4>In Transit - Current</h4>
            <p>Your package is on the way with slight delay</p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-icon pending">○</div>
          <div class="timeline-content">
            <h4>Delivery - Expected ${deliveryDate}</h4>
            <p>Package will arrive at your doorstep</p>
          </div>
        </div>
      </div>

      <p>You can track your order in real-time by clicking the button above or visiting:</p>
      <p style="background-color: #F3F4F6; padding: 12px; border-radius: 6px; font-family: monospace; word-break: break-all; font-size: 14px;">
        <a href="${trackingUrl}" style="color: #0EA5E9; text-decoration: none;">${trackingUrl}</a>
      </p>

      <p>You can also login to your account to view complete order details and invoice:</p>
      <p style="text-align: center;">
        <a href="https://flyqdrone.in/login" style="color: #0EA5E9; text-decoration: none; font-weight: 600;">Login to Your Account →</a>
      </p>

      <div class="support">
        <h3 style="margin-top: 0; color: #0EA5E9;">❓ Need Help?</h3>
        <p>Our support team is here to assist you with any questions about your delivery.</p>
        <div class="support-links">
          <a href="mailto:support@flyqdrones.com" class="support-link">📧 Email Support</a>
          <a href="https://wa.me/919137361474" class="support-link" style="background-color: #10B981;">💬 WhatsApp Chat</a>
        </div>
      </div>

      <p>Thank you for choosing FLYQ Drones! We're excited for you to experience your new drone.</p>
      
      <p style="margin-top: 30px;">
        Best regards,<br>
        <strong>The FLYQ Drones Team</strong>
      </p>
    </div>

    <div class="footer">
      <p><strong>FLYQ Drones</strong></p>
      <p>Mumbai, Maharashtra, India</p>
      <p style="font-size: 12px; color: #999; margin-top: 20px;">
        This email was sent to ${order.customer_email} because you placed an order with FLYQ Drones.<br>
        Please do not reply to this email. For support, contact us at support@flyqdrones.com
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

// Plain text version
function generateEmailText(order) {
  const deliveryDay = Math.random() < 0.5 ? 7 : 8;
  const deliveryDate = deliveryDay === 7 ? 'February 7, 2026' : 'February 8, 2026';
  const trackingUrl = `https://flyqdrone.in/track/${order.tracking_id}`;
  
  return `
Your FLYQ Drone Has Shipped!

Dear ${order.customer_name},

Great news! Your FLYQ drone order has been shipped from our Mumbai facility and is on its way to you.

⚠️ DELIVERY UPDATE
Due to increased demand during this season, deliveries are experiencing a slight delay. Your order is now expected to arrive on ${deliveryDate}.

We apologize for any inconvenience and appreciate your patience.

📋 ORDER DETAILS
Order Number: ${order.order_number}
Tracking ID: ${order.tracking_id}
Expected Delivery: ${deliveryDate}
Shipped From: Mumbai, Maharashtra

🚚 TRACK YOUR ORDER
Visit: ${trackingUrl}

Or login to your account:
https://flyqdrone.in/login

📍 DELIVERY TIMELINE
✓ Order Confirmed - Your order has been received
✓ Picked Up - Package collected from Mumbai warehouse
🚚 In Transit - Your package is on the way (Current)
○ Delivery - Expected ${deliveryDate}

❓ NEED HELP?
Email: support@flyqdrones.com
WhatsApp: +91 91373 61474

Thank you for choosing FLYQ Drones! We're excited for you to experience your new drone.

Best regards,
The FLYQ Drones Team

---
FLYQ Drones
Mumbai, Maharashtra, India
  `.trim();
}

// Main function
async function sendDelayEmails() {
  try {
    const orders = SAMPLE_ORDERS;
    
    if (!orders || orders.length === 0) {
      console.log('⚠️  No orders found in SAMPLE_ORDERS array.');
      console.log('\n💡 Please add your 64 orders to the SAMPLE_ORDERS array in the script.');
      return;
    }
    
    console.log(`✅ Found ${orders.length} orders\n`);
    
    if (DRY_RUN) {
      console.log('🧪 DRY RUN MODE - No emails will be sent\n');
      console.log('Preview of all orders:\n');
      console.log('='.repeat(60));
      
      orders.forEach((order, i) => {
        const deliveryDay = Math.random() < 0.5 ? 7 : 8;
        console.log(`\n${i + 1}. Order ${order.order_number}`);
        console.log(`   To: ${order.customer_email}`);
        console.log(`   Tracking: ${order.tracking_id}`);
        console.log(`   Customer: ${order.customer_name}`);
        console.log(`   Delivery: February ${deliveryDay}, 2026`);
      });
      
      console.log('\n' + '='.repeat(60));
      console.log(`\n📝 Would send ${orders.length} emails total`);
      console.log('\nTo actually send emails, run:');
      console.log('  RESEND_API_KEY=your_key node send-delay-emails-simple.js\n');
      return;
    }
    
    // Send emails
    console.log('📧 Sending emails...\n');
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      
      try {
        const emailHTML = generateEmailHTML(order);
        const emailText = generateEmailText(order);
        
        const result = await resend.emails.send({
          from: FROM_EMAIL,
          to: order.customer_email,
          subject: `📦 Your FLYQ Drone Has Shipped - Track Your Order`,
          html: emailHTML,
          text: emailText,
          tags: [
            { name: 'campaign', value: 'transit-delay-notification' },
            { name: 'order_id', value: order.order_number }
          ]
        });
        
        successCount++;
        console.log(`✅ [${i + 1}/${orders.length}] Sent to ${order.customer_email} (${order.order_number})`);
        
        // Rate limit: Wait 100ms between emails
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        errorCount++;
        console.error(`❌ [${i + 1}/${orders.length}] Failed to send to ${order.customer_email}:`, error.message);
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 EMAIL SENDING SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Orders: ${orders.length}`);
    console.log(`✅ Sent Successfully: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log('='.repeat(60) + '\n');
    
    if (successCount > 0) {
      console.log('🎉 Email campaign completed!');
      console.log('\n📧 Customers can now track their orders at:');
      console.log('   https://flyqdrone.in/track/{TRACKING_ID}\n');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run
sendDelayEmails()
  .then(() => {
    console.log('✅ Script completed\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
