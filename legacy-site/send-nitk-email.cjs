const https = require('https');
const fs = require('fs');

// Load order data
const orderData = JSON.parse(fs.readFileSync('nitk-order-data.json', 'utf8'));
const { customer, order, pricing } = orderData;

// Resend API configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_FZjDVTCE_MwqrhmvZ3m76fE1hQtQ4k6vb';

// Email HTML template
const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NITK Order Confirmation - FLYQ Drones</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: #ffffff; padding: 30px 20px; border: 1px solid #e5e7eb; }
    .welcome { font-size: 18px; color: #0EA5E9; margin-bottom: 15px; font-weight: 600; }
    .info-box { background: #f0f9ff; border-left: 4px solid #0EA5E9; padding: 15px; margin: 20px 0; border-radius: 5px; }
    .credentials-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px; }
    .credentials-box p { margin: 8px 0; font-size: 14px; }
    .credentials-box strong { color: #f59e0b; font-size: 16px; }
    .order-details { background: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e5e7eb; }
    .order-details h3 { color: #0EA5E9; margin-top: 0; font-size: 18px; margin-bottom: 15px; }
    .order-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .order-item:last-child { border-bottom: none; }
    .order-item strong { color: #666; }
    .pricing-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    .pricing-table td { padding: 8px; border-bottom: 1px solid #e5e7eb; }
    .pricing-table tr.total td { border-top: 2px solid #0EA5E9; font-weight: bold; font-size: 18px; color: #0EA5E9; padding-top: 12px; }
    .gst-info { background: #fefce8; padding: 12px; margin: 15px 0; border-radius: 5px; border: 1px solid #fde047; }
    .gst-info h4 { color: #854d0e; margin: 0 0 8px 0; font-size: 14px; }
    .gst-info p { margin: 4px 0; font-size: 13px; color: #713f12; }
    .button { display: inline-block; background: #0EA5E9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 10px 10px 0; font-weight: 600; }
    .button:hover { background: #0284C7; }
    .button-secondary { background: #f59e0b; }
    .button-secondary:hover { background: #d97706; }
    .tracking { background: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0; border-radius: 5px; }
    .tracking h4 { color: #16a34a; margin: 0 0 10px 0; }
    .tracking p { margin: 5px 0; font-size: 14px; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none; }
    .footer p { margin: 5px 0; }
    .support-box { background: #f9fafb; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #e5e7eb; }
    .support-box h4 { color: #0EA5E9; margin: 0 0 10px 0; }
    .support-box p { margin: 5px 0; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚁 FLYQ DRONES</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">ESP32-S3 Programmable Drones</p>
    </div>
    
    <div class="content">
      <p class="welcome">Dear Director NITK,</p>
      
      <p>Thank you for your order! We are excited to confirm your purchase of <strong>2 FLYQ Vision Camera Drones</strong> 
      for National Institute of Technology Karnataka.</p>

      <div class="info-box">
        <p style="margin: 0;"><strong>📦 Order Number:</strong> ${order.orderNumber}</p>
        <p style="margin: 8px 0 0 0;"><strong>📅 Order Date:</strong> 25th January 2026</p>
      </div>

      <!-- Login Credentials -->
      <div class="credentials-box">
        <h4 style="margin: 0 0 12px 0; color: #f59e0b;">🔐 Your Account Login Credentials</h4>
        <p><strong>Login URL:</strong> <a href="https://flyqdrone.in/login" style="color: #0EA5E9;">https://flyqdrone.in/login</a></p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Password:</strong> <span style="background: white; padding: 5px 10px; border-radius: 3px; font-family: monospace; font-size: 16px; font-weight: bold;">${customer.password}</span></p>
        <p style="margin-top: 12px; font-size: 12px; color: #666;">
          <em>Please save these credentials securely. You can change your password after logging in.</em>
        </p>
      </div>

      <div style="text-align: center; margin: 25px 0;">
        <a href="https://flyqdrone.in/login" class="button">🔓 Login to Your Account</a>
        <a href="https://flyqdrone.in/track-order?tracking=${order.trackingId}" class="button button-secondary">📍 Track Your Order</a>
      </div>

      <!-- Order Details -->
      <div class="order-details">
        <h3>📦 Order Details</h3>
        
        <div style="border-bottom: 2px solid #e5e7eb; padding-bottom: 15px; margin-bottom: 15px;">
          <h4 style="color: #333; margin: 0 0 10px 0;">FLYQ Vision - ESP32-S3 Camera Drone</h4>
          <p style="font-size: 13px; color: #666; margin: 5px 0;">✓ HD 720p Camera with Wi-Fi Streaming</p>
          <p style="font-size: 13px; color: #666; margin: 5px 0;">✓ ESP32-S3 Dual-Core Processor</p>
          <p style="font-size: 13px; color: #666; margin: 5px 0;">✓ Gesture Control Technology</p>
          <p style="font-size: 13px; color: #666; margin: 5px 0;">✓ Python & Arduino SDK Support</p>
          <p style="font-size: 13px; color: #666; margin: 5px 0;">✓ Open Source Platform</p>
          <div style="margin-top: 10px;">
            <strong>Quantity:</strong> 2 units<br>
            <strong>Unit Price:</strong> ₹10,999<br>
          </div>
        </div>

        <!-- Pricing Breakdown -->
        <table class="pricing-table">
          <tr>
            <td>Subtotal (2 × ₹10,999)</td>
            <td style="text-align: right;">₹${pricing.subtotal.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td style="color: #16a34a;">Discount (10% Off) 🎉</td>
            <td style="text-align: right; color: #16a34a;">-₹${pricing.discount.toLocaleString('en-IN')}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td><strong>Amount After Discount</strong></td>
            <td style="text-align: right;"><strong>₹${pricing.afterDiscount.toLocaleString('en-IN')}</strong></td>
          </tr>
        </table>

        <!-- GST Breakdown -->
        <div class="gst-info">
          <h4>💰 GST Calculation (18%)</h4>
          <p><strong>Taxable Amount:</strong> ₹${pricing.afterDiscount.toLocaleString('en-IN')}</p>
          <p>CGST @ 9%: ₹${(pricing.gstAmount / 2).toLocaleString('en-IN')}</p>
          <p>SGST @ 9%: ₹${(pricing.gstAmount / 2).toLocaleString('en-IN')}</p>
          <p style="border-top: 1px solid #fde047; margin-top: 8px; padding-top: 8px;">
            <strong>Total GST:</strong> ₹${pricing.gstAmount.toLocaleString('en-IN')}
          </p>
        </div>

        <table class="pricing-table" style="margin-top: 15px;">
          <tr>
            <td>Product Total (with GST)</td>
            <td style="text-align: right;">₹${pricing.totalWithGST.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td>COD Charges (₹199 + 18% GST)</td>
            <td style="text-align: right;">₹${pricing.totalCOD.toLocaleString('en-IN')}</td>
          </tr>
          <tr class="total">
            <td>GRAND TOTAL</td>
            <td style="text-align: right;">₹${Math.round(pricing.grandTotal).toLocaleString('en-IN')}</td>
          </tr>
        </table>

        <p style="font-size: 14px; color: #666; margin-top: 15px; padding: 10px; background: #fef3c7; border-radius: 5px;">
          <strong>💵 Payment Method:</strong> Cash on Delivery (COD)<br>
          <strong>Amount to Pay:</strong> ₹${Math.round(pricing.grandTotal).toLocaleString('en-IN')} to delivery agent
        </p>
      </div>

      <!-- Tracking Information -->
      <div class="tracking">
        <h4>📍 Shipping & Tracking</h4>
        <p><strong>Tracking ID:</strong> ${order.trackingId}</p>
        <p><strong>Carrier:</strong> FLYQ Express</p>
        <p><strong>Status:</strong> Order Confirmed - Processing</p>
        <p><strong>Estimated Delivery:</strong> 1st February 2026</p>
        <p style="margin-top: 10px;">
          <a href="https://flyqdrone.in/track-order?tracking=${order.trackingId}" 
             style="color: #16a34a; text-decoration: underline; font-weight: 600;">
            Track your order in real-time →
          </a>
        </p>
      </div>

      <!-- Shipping Address -->
      <div style="background: #f9fafb; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #e5e7eb;">
        <h4 style="color: #0EA5E9; margin: 0 0 10px 0;">📍 Delivery Address</h4>
        <p style="margin: 0; font-size: 14px;">
          <strong>Director NITK</strong><br>
          National Institute of Technology Karnataka (NITK)<br>
          NH 66, Srinivasnagar Post, Surathkal<br>
          Mangalore, Karnataka - 575 025<br>
          Phone: 7899421596
        </p>
      </div>

      <!-- Account Features -->
      <div style="background: #f0f9ff; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #0EA5E9;">
        <h4 style="color: #0EA5E9; margin: 0 0 12px 0;">🎯 What You Can Do With Your Account</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
          <li>Track your order in real-time</li>
          <li>Download GST invoice anytime</li>
          <li>Access programming tutorials and documentation</li>
          <li>Get firmware updates and SDK resources</li>
          <li>Update delivery information if needed</li>
          <li>Contact support directly from your dashboard</li>
        </ul>
      </div>

      <!-- Invoice Download -->
      <div style="text-align: center; margin: 25px 0; padding: 20px; background: #fefce8; border-radius: 5px; border: 1px solid #fde047;">
        <h4 style="color: #854d0e; margin: 0 0 12px 0;">📄 GST Tax Invoice</h4>
        <p style="margin: 0 0 15px 0; font-size: 14px; color: #713f12;">
          Your GST compliant tax invoice is ready for download
        </p>
        <a href="https://flyqdrone.in/api/orders/127/invoice" class="button" style="background: #f59e0b;">
          📥 Download GST Invoice
        </a>
      </div>

      <!-- Support Box -->
      <div class="support-box">
        <h4>💬 Need Help?</h4>
        <p><strong>Email:</strong> <a href="mailto:info@passion3dworld.com" style="color: #0EA5E9;">info@passion3dworld.com</a></p>
        <p><strong>WhatsApp:</strong> <a href="https://wa.me/919137361474" style="color: #0EA5E9;">+91 9137361474</a></p>
        <p><strong>Support Hours:</strong> Monday - Saturday, 10 AM - 7 PM IST</p>
      </div>

      <!-- Next Steps -->
      <div style="background: #dcfce7; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #16a34a;">
        <h4 style="color: #16a34a; margin: 0 0 10px 0;">✅ What Happens Next?</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #166534;">
          <li>Your order is being prepared for shipment</li>
          <li>You'll receive tracking updates via email and SMS</li>
          <li>Estimated delivery: 1st February 2026</li>
          <li>Pay ₹${Math.round(pricing.grandTotal).toLocaleString('en-IN')} to delivery agent (COD)</li>
          <li>Start coding with your FLYQ Vision drones!</li>
        </ol>
      </div>

      <p style="margin-top: 25px; font-size: 14px; color: #666;">
        Thank you for choosing FLYQ Drones. We're excited to see what you'll build with your ESP32-S3 camera drones!
      </p>

      <p style="margin-top: 15px; font-size: 14px; color: #666;">
        Best regards,<br>
        <strong style="color: #0EA5E9;">The FLYQ Team</strong><br>
        Passion 3D World
      </p>
    </div>

    <div class="footer">
      <p><strong>PASSION 3D WORLD</strong></p>
      <p>GSTIN: 27DHOPG6930D1Z9</p>
      <p>Office No: A321, 3rd Floor, Master Mind 4, Royal Palms</p>
      <p>Goregaon East, Mumbai - 400065, Maharashtra, India</p>
      <p style="margin-top: 10px;">
        <a href="https://flyqdrone.in" style="color: #0EA5E9; text-decoration: none;">flyqdrone.in</a> | 
        <a href="mailto:info@passion3dworld.com" style="color: #0EA5E9; text-decoration: none;">info@passion3dworld.com</a> | 
        <a href="https://wa.me/919137361474" style="color: #0EA5E9; text-decoration: none;">WhatsApp: +91 9137361474</a>
      </p>
      <p style="margin-top: 15px; font-size: 11px; color: #999;">
        © 2026 Passion 3D World. All rights reserved.<br>
        FLYQ Drones - Empowering Innovation Through Flight
      </p>
    </div>
  </div>
</body>
</html>
`;

// Plain text version
const emailText = `
FLYQ DRONES - Order Confirmation

Dear Director NITK,

Thank you for your order! We are excited to confirm your purchase of 2 FLYQ Vision Camera Drones for National Institute of Technology Karnataka.

ORDER DETAILS
Order Number: ${order.orderNumber}
Order Date: 25th January 2026

YOUR LOGIN CREDENTIALS
Login URL: https://flyqdrone.in/login
Email: ${customer.email}
Password: ${customer.password}

Please save these credentials securely. You can change your password after logging in.

PRODUCT DETAILS
FLYQ Vision - ESP32-S3 Camera Drone (Quantity: 2)
- HD 720p Camera with Wi-Fi Streaming
- ESP32-S3 Dual-Core Processor
- Gesture Control Technology
- Python & Arduino SDK Support
- Open Source Platform

PRICING BREAKDOWN
Subtotal (2 × ₹10,999): ₹${pricing.subtotal.toLocaleString('en-IN')}
Discount (10% Off): -₹${pricing.discount.toLocaleString('en-IN')}
Amount After Discount: ₹${pricing.afterDiscount.toLocaleString('en-IN')}

GST CALCULATION (18%)
CGST @ 9%: ₹${(pricing.gstAmount / 2).toLocaleString('en-IN')}
SGST @ 9%: ₹${(pricing.gstAmount / 2).toLocaleString('en-IN')}
Total GST: ₹${pricing.gstAmount.toLocaleString('en-IN')}

Product Total (with GST): ₹${pricing.totalWithGST.toLocaleString('en-IN')}
COD Charges (₹199 + 18% GST): ₹${pricing.totalCOD.toLocaleString('en-IN')}

GRAND TOTAL: ₹${Math.round(pricing.grandTotal).toLocaleString('en-IN')}

PAYMENT METHOD
Cash on Delivery (COD)
Amount to Pay: ₹${Math.round(pricing.grandTotal).toLocaleString('en-IN')} to delivery agent

SHIPPING & TRACKING
Tracking ID: ${order.trackingId}
Carrier: FLYQ Express
Status: Order Confirmed - Processing
Estimated Delivery: 1st February 2026

Track your order: https://flyqdrone.in/track-order?tracking=${order.trackingId}

DELIVERY ADDRESS
Director NITK
National Institute of Technology Karnataka (NITK)
NH 66, Srinivasnagar Post, Surathkal
Mangalore, Karnataka - 575 025
Phone: 7899421596

DOWNLOAD GST INVOICE
https://flyqdrone.in/api/orders/127/invoice

NEED HELP?
Email: info@passion3dworld.com
WhatsApp: +91 9137361474
Support Hours: Monday - Saturday, 10 AM - 7 PM IST

Thank you for choosing FLYQ Drones!

Best regards,
The FLYQ Team
Passion 3D World

PASSION 3D WORLD
GSTIN: 27DHOPG6930D1Z9
Office No: A321, 3rd Floor, Master Mind 4, Royal Palms
Goregaon East, Mumbai - 400065, Maharashtra, India
flyqdrone.in | info@passion3dworld.com | WhatsApp: +91 9137361474
`;

// Send email via Resend API
const emailData = JSON.stringify({
  from: 'FLYQ Drones <orders@flyqdrone.in>',
  to: [customer.email],
  subject: `Order Confirmed - ${order.orderNumber} - FLYQ Vision Drones for NITK`,
  html: emailHTML,
  text: emailText,
  reply_to: 'info@passion3dworld.com'
});

const options = {
  hostname: 'api.resend.com',
  port: 443,
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(emailData)
  }
};

console.log('\n📧 Sending order confirmation email to NITK...\n');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const response = JSON.parse(data);
      console.log('✅ Email sent successfully!');
      console.log(`\nEmail ID: ${response.id}`);
      console.log(`To: ${customer.email}`);
      console.log(`Subject: Order Confirmed - ${order.orderNumber} - FLYQ Vision Drones for NITK`);
      console.log(`\n=== EMAIL CONTENT SUMMARY ===`);
      console.log(`Customer: ${customer.name}`);
      console.log(`Email: ${customer.email}`);
      console.log(`Password: ${customer.password}`);
      console.log(`Login URL: https://flyqdrone.in/login`);
      console.log(`Order Number: ${order.orderNumber}`);
      console.log(`Tracking ID: ${order.trackingId}`);
      console.log(`Total Amount: ₹${Math.round(pricing.grandTotal).toLocaleString('en-IN')}`);
      console.log(`\n✅ Customer can now:`);
      console.log(`   1. Login at https://flyqdrone.in/login`);
      console.log(`   2. Track order at https://flyqdrone.in/track-order?tracking=${order.trackingId}`);
      console.log(`   3. Download invoice at https://flyqdrone.in/api/orders/127/invoice`);
    } else {
      console.error('❌ Failed to send email');
      console.error(`Status Code: ${res.statusCode}`);
      console.error(`Response: ${data}`);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Email sending error:', error.message);
  process.exit(1);
});

req.write(emailData);
req.end();
