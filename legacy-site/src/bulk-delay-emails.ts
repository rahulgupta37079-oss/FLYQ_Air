/**
 * Bulk Delay Email Sender API
 * 
 * This endpoint sends transit delay notification emails to all customers
 * with tracking IDs. It uses the RESEND_API_KEY from Cloudflare environment.
 * 
 * POST /api/admin/send-bulk-delay-emails
 * 
 * Body: {
 *   "orders": [
 *     {
 *       "order_number": "FLYQ-1234567890123-ABCDEF",
 *       "tracking_id": "TRK1234567890123ABCD1234",
 *       "customer_name": "John Doe",
 *       "customer_email": "john@example.com"
 *     },
 *     // ... more orders
 *   ],
 *   "dry_run": false  // Set to true to test without sending
 * }
 */

import { Hono } from 'hono';
import { Resend } from 'resend';

const bulkDelayEmailsRouter = new Hono();

// Email template generator
function generateDelayEmailHTML(order: any) {
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
  `.trim();
}

// Plain text version
function generateDelayEmailText(order: any) {
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

// Main endpoint
bulkDelayEmailsRouter.post('/api/admin/send-bulk-delay-emails', async (c) => {
  try {
    const { orders, dry_run } = await c.req.json();
    
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return c.json({ 
        error: 'No orders provided. Please send an array of orders in the request body.' 
      }, 400);
    }

    const resendApiKey = c.env?.RESEND_API_KEY;
    
    if (!resendApiKey) {
      return c.json({ 
        error: 'RESEND_API_KEY not configured in environment' 
      }, 500);
    }

    const resend = new Resend(resendApiKey);
    
    if (dry_run) {
      return c.json({
        message: 'DRY RUN MODE - No emails sent',
        orders_count: orders.length,
        preview: orders.slice(0, 3).map(o => ({
          order_number: o.order_number,
          tracking_id: o.tracking_id,
          customer_name: o.customer_name,
          customer_email: o.customer_email
        }))
      });
    }

    // Send emails
    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (const order of orders) {
      try {
        const emailHTML = generateDelayEmailHTML(order);
        const emailText = generateDelayEmailText(order);
        
        const result = await resend.emails.send({
          from: 'FLYQ Drones <noreply@flyqdrone.in>',
          to: order.customer_email,
          subject: '📦 Your FLYQ Drone Has Shipped - Track Your Order',
          html: emailHTML,
          text: emailText,
          tags: [
            { name: 'campaign', value: 'transit-delay-notification' },
            { name: 'order_id', value: order.order_number }
          ]
        });
        
        successCount++;
        results.push({
          order_number: order.order_number,
          email: order.customer_email,
          status: 'sent',
          email_id: result.data?.id
        });
        
        // Rate limit: 100ms between emails
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error: any) {
        errorCount++;
        results.push({
          order_number: order.order_number,
          email: order.customer_email,
          status: 'failed',
          error: error.message
        });
      }
    }

    return c.json({
      success: true,
      total_orders: orders.length,
      sent_successfully: successCount,
      failed: errorCount,
      results: results
    });

  } catch (error: any) {
    return c.json({ 
      error: 'Failed to send emails',
      message: error.message 
    }, 500);
  }
});

export default bulkDelayEmailsRouter;
