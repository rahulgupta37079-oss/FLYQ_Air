import { Hono } from 'hono'
import { Resend } from 'resend'

type Bindings = {
  DB: D1Database
  RESEND_API_KEY: string
}

const resendEmailsRouter = new Hono<{ Bindings: Bindings }>()

// Resend confirmation emails to all active customers
resendEmailsRouter.post('/api/admin/resend-confirmation-emails', async (c) => {
  try {
    const results = {
      emailsSent: 0,
      customersNotified: 0,
      errors: []
    }

    const resend = new Resend(c.env.RESEND_API_KEY)

    // Get all active orders with current pricing
    const orders = await c.env.DB.prepare(`
      SELECT 
        o.id,
        o.order_number,
        o.tracking_id,
        o.total,
        o.estimated_delivery,
        u.name,
        u.email,
        oi.product_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.status = 'confirmed' 
        AND o.payment_status = 'paid'
        AND o.total IN (7999, 11999)
      ORDER BY o.created_at DESC
    `).all()

    console.log(`Sending emails to ${orders.results.length} customers`)

    // Load customer passwords
    const customerData = await fetch('http://localhost:3000/static/customer-import-data.json').then(r => r.json())
    const passwordMap = {}
    customerData.customersWithEmail.forEach(c => {
      passwordMap[c.email] = c.password
    })

    // Set pickup date to January 27, 2026
    const pickupDateFormatted = "Monday, January 27, 2026"


    // Send email to each customer
    for (const order of orders.results) {
      try {
        const password = passwordMap[order.email] || 'Check your previous email'

        await resend.emails.send({
          from: 'FLYQ Drones <orders@flyqdrones.com>',
          to: [order.email],
          subject: `Order Confirmed - ${order.order_number} | FLYQ Drones`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: 'Segoe UI', sans-serif; background: #f3f4f6; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); padding: 40px; text-align: center; }
                .header h1 { color: white; margin: 0; font-size: 28px; }
                .content { padding: 40px; }
                .box { background: #f0f9ff; border: 2px solid #0EA5E9; border-radius: 12px; padding: 24px; margin: 24px 0; }
                .highlight { font-size: 20px; font-weight: 700; color: #0EA5E9; font-family: monospace; }
                .info-row { display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid #e5e7eb; }
                .btn { display: inline-block; background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 24px 0; }
                .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🚁 Welcome to FLYQ Drones!</h1>
                  <p style="color: white; margin: 10px 0 0 0;">Your Order is Confirmed</p>
                </div>
                
                <div class="content">
                  <p style="font-size: 16px;">Hi <strong>${order.name}</strong>,</p>
                  
                  <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                    Thank you for your purchase! Your order has been confirmed and your <strong>${order.product_name}</strong> 
                    will be shipped to you soon. 🎉
                  </p>
                  
                  <div class="box">
                    <div style="text-align: center;">
                      <div style="color: #0EA5E9; font-size: 14px; font-weight: 600; margin-bottom: 8px;">📦 ORDER NUMBER</div>
                      <div class="highlight">${order.order_number}</div>
                    </div>
                  </div>

                  <div class="box">
                    <div style="text-align: center;">
                      <div style="color: #0EA5E9; font-size: 14px; font-weight: 600; margin-bottom: 8px;">🔍 TRACKING ID</div>
                      <div class="highlight">${order.tracking_id}</div>
                      <div style="color: #6b7280; margin-top: 8px; font-size: 14px;">Carrier: FLYQ Express</div>
                    </div>
                  </div>
                  
                  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin: 24px 0;">
                    <div class="info-row">
                      <span style="color: #6b7280; font-weight: 600;">Product:</span>
                      <span style="color: #111827; font-weight: 700;">${order.product_name}</span>
                    </div>
                    <div class="info-row">
                      <span style="color: #6b7280; font-weight: 600;">Price:</span>
                      <span style="color: #111827; font-weight: 700;">₹${order.total.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="info-row" style="border-bottom: none;">
                      <span style="color: #6b7280; font-weight: 600;">Quantity:</span>
                      <span style="color: #111827; font-weight: 700;">1</span>
                    </div>
                  </div>

                  <div class="alert">
                    <p style="margin: 0; color: #92400e; font-weight: 600;">📅 Pickup Scheduled</p>
                    <p style="margin: 8px 0 0 0; color: #78350f; font-size: 14px;">
                      Your order will be picked up on <strong>${pickupDateFormatted}</strong>. 
                      You'll receive updates as your order progresses.
                    </p>
                  </div>

                  <div style="text-align: center;">
                    <a href="https://abf76357.flyq-air.pages.dev/track-order?tracking=${order.tracking_id}" class="btn">Track Your Order</a>
                  </div>

                  <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 24px 0;">
                    <h3 style="color: #0EA5E9; margin: 0 0 12px 0;">🔐 Your Account Details</h3>
                    <p style="margin: 0; color: #374151; font-size: 14px;">
                      We've created an account for you. You can login anytime to track your orders.
                    </p>
                    <div style="margin-top: 12px;">
                      <p style="margin: 4px 0;"><strong>Login URL:</strong> <a href="https://abf76357.flyq-air.pages.dev/login">https://abf76357.flyq-air.pages.dev/login</a></p>
                      <p style="margin: 4px 0;"><strong>Email:</strong> ${order.email}</p>
                      <p style="margin: 4px 0;"><strong>Password:</strong> <code style="background: #fef3c7; padding: 4px 8px; border-radius: 4px;">${password}</code></p>
                    </div>
                  </div>

                  <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981;">
                    <p style="margin: 0; color: #065f46; font-weight: 600;">✨ What's Next?</p>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #047857;">
                      <li>Track your order using the tracking ID above</li>
                      <li>Login to your account to view order history</li>
                      <li>Check your email for shipping updates</li>
                      <li>Contact us if you have any questions</li>
                    </ul>
                  </div>
                </div>
                
                <div style="background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 14px;">
                  <p style="margin: 0;">Need help? Contact us at <a href="mailto:support@flyqdrones.com">support@flyqdrones.com</a></p>
                  <p style="margin: 8px 0 0 0;">© 2026 FLYQ Drones. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
          `
        })

        results.emailsSent++
        results.customersNotified++
      } catch (error) {
        console.error(`Email error for ${order.email}:`, error)
        results.errors.push(`Failed to send to ${order.email}`)
      }
    }

    return c.json({
      success: true,
      ...results
    })

  } catch (error) {
    console.error('Resend error:', error)
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

// Send pricing correction email to specific customer
resendEmailsRouter.post('/api/admin/send-pricing-correction/:orderId', async (c) => {
  try {
    const orderId = c.req.param('orderId')
    const resend = new Resend(c.env.RESEND_API_KEY)

    // Get order details
    const order = await c.env.DB.prepare(`
      SELECT 
        o.*,
        u.name,
        u.email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `).bind(orderId).first()

    if (!order) {
      return c.json({ success: false, error: 'Order not found' }, 404)
    }

    // Get order items
    const items = await c.env.DB.prepare(`
      SELECT * FROM order_items WHERE order_id = ?
    `).bind(orderId).all()

    await resend.emails.send({
      from: 'FLYQ Drones <orders@flyqdrones.com>',
      to: [order.email],
      subject: `Important: Pricing Update for Order ${order.order_number} | FLYQ Drones`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', sans-serif; background: #f3f4f6; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .content { padding: 40px; }
            .box { background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 24px; margin: 24px 0; }
            .highlight { font-size: 20px; font-weight: 700; color: #059669; font-family: monospace; }
            .info-row { display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .savings-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0; }
            .old-price { text-decoration: line-through; color: #dc2626; }
            .new-price { color: #10b981; font-size: 24px; font-weight: 700; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Great News - Price Reduced!</h1>
              <p style="color: white; margin: 10px 0 0 0;">Your Invoice Has Been Updated</p>
            </div>
            
            <div class="content">
              <p style="font-size: 16px;">Dear <strong>${order.name}</strong>,</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                We're pleased to inform you that we've corrected the pricing on your order <strong>${order.order_number}</strong>. 
                You'll be happy to know that your order total has been <strong>reduced</strong>! 🎉
              </p>

              <div class="box">
                <div style="text-align: center;">
                  <div style="color: #059669; font-size: 14px; font-weight: 600; margin-bottom: 8px;">📦 ORDER NUMBER</div>
                  <div class="highlight">${order.order_number}</div>
                </div>
              </div>

              <div class="savings-box">
                <div style="font-size: 18px; font-weight: 600; color: #92400e; margin-bottom: 16px;">💰 Updated Pricing</div>
                <div style="margin: 16px 0;">
                  <div style="font-size: 16px; color: #78350f; margin-bottom: 8px;">Previous Total:</div>
                  <div class="old-price" style="font-size: 20px;">₹23,596.70</div>
                </div>
                <div style="margin: 16px 0;">
                  <div style="font-size: 16px; color: #065f46; margin-bottom: 8px;">New Total:</div>
                  <div class="new-price">₹${order.total.toLocaleString('en-IN')}</div>
                </div>
                <div style="background: white; padding: 12px; border-radius: 8px; margin-top: 16px;">
                  <div style="font-size: 20px; font-weight: 700; color: #10b981;">You Save: ₹${(23596.70 - order.total).toFixed(2)}</div>
                </div>
              </div>

              <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #0EA5E9;">
                <h3 style="color: #0EA5E9; margin: 0 0 12px 0;">📋 Updated Order Summary</h3>
                <div style="margin-top: 12px;">
                  <div class="info-row" style="border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280;">Subtotal (incl. 18% GST):</span>
                    <span style="font-weight: 600;">₹${order.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div class="info-row" style="border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280;">Shipping:</span>
                    <span style="font-weight: 600;">₹${order.shipping.toLocaleString('en-IN')}</span>
                  </div>
                  <div class="info-row" style="border-bottom: none; background: #ecfdf5; margin: 8px -12px -12px -12px; padding: 16px 12px; border-radius: 0 0 8px 8px;">
                    <span style="color: #065f46; font-size: 18px; font-weight: 700;">Total Amount:</span>
                    <span style="color: #10b981; font-size: 18px; font-weight: 700;">₹${order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 24px 0;">
                <p style="margin: 0; color: #92400e; font-weight: 600;">ℹ️ What Changed?</p>
                <p style="margin: 8px 0 0 0; color: #78350f; font-size: 14px;">
                  We updated our pricing structure to include GST (18%) within the product prices. 
                  Your previous invoice had GST calculated separately, which we've now corrected. 
                  This results in a <strong>lower total price</strong> for you!
                </p>
              </div>

              <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #065f46; font-weight: 600;">✨ Order Status</p>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #047857;">
                  <li>Your order is confirmed and will ship as scheduled</li>
                  <li>Tracking ID: <strong>${order.tracking_id}</strong></li>
                  <li>Pickup Schedule: <strong>January 27, 2026</strong></li>
                  <li>No action needed from your side</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 32px 0;">
                <a href="https://flyqdrone.in/customer/orders" 
                   style="display: inline-block; background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                  View Your Orders
                </a>
              </div>
            </div>
            
            <div style="background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 14px;">
              <p style="margin: 0;">Questions? Contact us at <a href="mailto:support@flyqdrones.com">support@flyqdrones.com</a></p>
              <p style="margin: 8px 0 0 0;">📞 WhatsApp: <a href="https://wa.me/919137361474">+91 91373 61474</a></p>
              <p style="margin: 8px 0 0 0;">© 2026 FLYQ Drones. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    return c.json({
      success: true,
      message: `Pricing correction email sent to ${order.email}`,
      order: {
        id: order.id,
        order_number: order.order_number,
        customer: order.name,
        email: order.email,
        old_total: 23596.70,
        new_total: order.total,
        savings: (23596.70 - order.total).toFixed(2)
      }
    })

  } catch (error) {
    console.error('Email error:', error)
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

// Send order cancellation and replacement email
resendEmailsRouter.post('/api/admin/send-order-replacement/:orderId', async (c) => {
  try {
    const orderId = c.req.param('orderId')
    const resend = new Resend(c.env.RESEND_API_KEY)

    // Get order details
    const order = await c.env.DB.prepare(`
      SELECT 
        o.*,
        u.name,
        u.email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `).bind(orderId).first()

    if (!order) {
      return c.json({ success: false, error: 'Order not found' }, 404)
    }

    // Get order items
    const items = await c.env.DB.prepare(`
      SELECT * FROM order_items WHERE order_id = ?
    `).bind(orderId).all()

    await resend.emails.send({
      from: 'FLYQ Drones <orders@flyqdrones.com>',
      to: [order.email],
      subject: `Important Update: Previous Order Cancelled & Replaced with Better Pricing | FLYQ Drones`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', sans-serif; background: #f3f4f6; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); padding: 40px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .content { padding: 40px; }
            .box { background: #f0f9ff; border: 2px solid #0EA5E9; border-radius: 12px; padding: 24px; margin: 24px 0; }
            .highlight { font-size: 20px; font-weight: 700; color: #0EA5E9; font-family: monospace; }
            .cancelled-box { background: #fee2e2; border: 2px solid #dc2626; border-radius: 12px; padding: 24px; margin: 24px 0; }
            .savings-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0; }
            .old-price { text-decoration: line-through; color: #dc2626; }
            .new-price { color: #10b981; font-size: 24px; font-weight: 700; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔄 Important Order Update</h1>
              <p style="color: white; margin: 10px 0 0 0;">Previous Order Cancelled - New Order with Better Pricing!</p>
            </div>
            
            <div class="content">
              <p style="font-size: 16px;">Dear <strong>${order.name}</strong>,</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                We're writing to inform you about an important update regarding your order. Due to a pricing policy 
                change, we have <strong>cancelled your previous order</strong> and created a <strong>new order with 
                significantly reduced pricing</strong>. 🎉
              </p>

              <div class="cancelled-box">
                <div style="text-align: center;">
                  <div style="color: #dc2626; font-size: 18px; font-weight: 700; margin-bottom: 12px;">❌ PREVIOUS ORDER CANCELLED</div>
                  <div style="color: #7f1d1d; font-size: 14px; margin-bottom: 8px;">
                    Due to incorrect GST calculation
                  </div>
                  <div class="old-price" style="font-size: 22px; font-weight: 700;">
                    Total was: ₹23,596.70
                  </div>
                  <div style="color: #991b1b; font-size: 12px; margin-top: 8px; font-style: italic;">
                    (GST was incorrectly added separately)
                  </div>
                </div>
              </div>

              <div style="text-align: center; margin: 24px 0;">
                <div style="font-size: 32px; color: #0EA5E9;">⬇️</div>
                <div style="font-size: 16px; font-weight: 600; color: #6b7280; margin: 8px 0;">REPLACED WITH</div>
              </div>

              <div class="box">
                <div style="text-align: center;">
                  <div style="color: #0EA5E9; font-size: 14px; font-weight: 600; margin-bottom: 8px;">✅ NEW ORDER NUMBER</div>
                  <div class="highlight">${order.order_number}</div>
                </div>
              </div>

              <div class="savings-box">
                <div style="font-size: 18px; font-weight: 600; color: #92400e; margin-bottom: 16px;">💰 New Pricing with GST Included</div>
                <div style="margin: 16px 0;">
                  <div style="font-size: 16px; color: #78350f; margin-bottom: 8px;">Previous Order Total:</div>
                  <div class="old-price" style="font-size: 20px;">₹23,596.70</div>
                </div>
                <div style="margin: 16px 0;">
                  <div style="font-size: 16px; color: #065f46; margin-bottom: 8px;">New Order Total:</div>
                  <div class="new-price">₹${order.total.toLocaleString('en-IN')}</div>
                </div>
                <div style="background: white; padding: 12px; border-radius: 8px; margin-top: 16px;">
                  <div style="font-size: 20px; font-weight: 700; color: #10b981;">You Save: ₹${(23596.70 - order.total).toFixed(2)}</div>
                </div>
              </div>

              <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #0EA5E9;">
                <h3 style="color: #0EA5E9; margin: 0 0 12px 0;">📋 New Order Summary</h3>
                <div style="margin-top: 12px;">
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280;">Subtotal (incl. 18% GST):</span>
                    <span style="font-weight: 600;">₹${order.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280;">Shipping:</span>
                    <span style="font-weight: 600;">₹${order.shipping.toLocaleString('en-IN')}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 16px 0; background: #ecfdf5; margin: 8px -12px -12px -12px; padding: 16px 12px; border-radius: 0 0 8px 8px;">
                    <span style="color: #065f46; font-size: 18px; font-weight: 700;">Total Amount:</span>
                    <span style="color: #10b981; font-size: 18px; font-weight: 700;">₹${order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 24px 0;">
                <p style="margin: 0; color: #92400e; font-weight: 600;">ℹ️ Why This Change?</p>
                <p style="margin: 8px 0 0 0; color: #78350f; font-size: 14px;">
                  We discovered that GST (18%) was being calculated separately on top of product prices, 
                  which was incorrect. We've now updated our system to include GST within the product prices 
                  themselves, as per standard practice. This results in a <strong>lower total price</strong> for you!
                </p>
                <p style="margin: 8px 0 0 0; color: #78350f; font-size: 14px;">
                  To ensure you get the benefit of this corrected pricing, we cancelled the previous order 
                  and created this new order automatically.
                </p>
              </div>

              <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #065f46; font-weight: 600;">✨ New Order Status</p>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #047857;">
                  <li>Your new order is confirmed and will ship as scheduled</li>
                  <li>New Tracking ID: <strong>${order.tracking_id}</strong></li>
                  <li>Pickup Schedule: <strong>January 27, 2026</strong></li>
                  <li>Same products, same quality, better price!</li>
                  <li>No action needed from your side</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 32px 0;">
                <a href="https://flyqdrone.in/customer/orders" 
                   style="display: inline-block; background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                  View Your New Order
                </a>
              </div>

              <div style="background: #dbeafe; padding: 16px; border-radius: 8px; margin: 24px 0;">
                <p style="margin: 0; color: #1e40af; font-weight: 600;">💡 Quick Summary</p>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #1e3a8a; font-size: 14px;">
                  <li>Previous order: Cancelled due to pricing error</li>
                  <li>New order: Created with correct GST-inclusive pricing</li>
                  <li>Your savings: ₹3,563.68</li>
                  <li>New order number: ${order.order_number}</li>
                  <li>Delivery timeline: Unchanged (Pickup: January 27, 2026)</li>
                </ul>
              </div>
            </div>
            
            <div style="background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 14px;">
              <p style="margin: 0;">Questions? Contact us at <a href="mailto:support@flyqdrones.com">support@flyqdrones.com</a></p>
              <p style="margin: 8px 0 0 0;">📞 WhatsApp: <a href="https://wa.me/919137361474">+91 91373 61474</a></p>
              <p style="margin: 8px 0 0 0;">© 2026 FLYQ Drones. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    return c.json({
      success: true,
      message: `Order replacement email sent to ${order.email}`,
      order: {
        id: order.id,
        order_number: order.order_number,
        customer: order.name,
        email: order.email,
        old_total: 23596.70,
        new_total: order.total,
        savings: (23596.70 - order.total).toFixed(2)
      }
    })

  } catch (error) {
    console.error('Email error:', error)
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

export default resendEmailsRouter
