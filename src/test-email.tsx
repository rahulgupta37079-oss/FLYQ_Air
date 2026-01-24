import { Hono } from 'hono'
import { Resend } from 'resend'

type Bindings = {
  RESEND_API_KEY: string
}

const testEmailRouter = new Hono<{ Bindings: Bindings }>()

// Send test email
testEmailRouter.post('/api/admin/send-test-email', async (c) => {
  try {
    const { to, subject, orderNumber, customerName, productName, price, trackingId, password } = await c.req.json()
    
    const resend = new Resend(c.env.RESEND_API_KEY)

    // Calculate next Monday
    const today = new Date()
    const daysUntilMonday = (8 - today.getDay()) % 7 || 7
    const pickupDate = new Date(today)
    pickupDate.setDate(today.getDate() + daysUntilMonday)
    const pickupDateFormatted = pickupDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })

    const result = await resend.emails.send({
      from: 'FLYQ Drones <orders@flyqdrones.com>',
      to: [to],
      subject: subject || 'FLYQ Test Email',
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
              <p style="font-size: 16px;">Hi <strong>${customerName}</strong>,</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                Thank you for your purchase! Your order has been confirmed and your <strong>${productName}</strong> 
                will be shipped to you soon. 🎉
              </p>
              
              <div class="box">
                <div style="text-align: center;">
                  <div style="color: #0EA5E9; font-size: 14px; font-weight: 600; margin-bottom: 8px;">📦 ORDER NUMBER</div>
                  <div class="highlight">${orderNumber}</div>
                </div>
              </div>

              <div class="box">
                <div style="text-align: center;">
                  <div style="color: #0EA5E9; font-size: 14px; font-weight: 600; margin-bottom: 8px;">🔍 TRACKING ID</div>
                  <div class="highlight">${trackingId}</div>
                  <div style="color: #6b7280; margin-top: 8px; font-size: 14px;">Carrier: FLYQ Express</div>
                </div>
              </div>
              
              <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin: 24px 0;">
                <div class="info-row">
                  <span style="color: #6b7280; font-weight: 600;">Product:</span>
                  <span style="color: #111827; font-weight: 700;">${productName}</span>
                </div>
                <div class="info-row">
                  <span style="color: #6b7280; font-weight: 600;">Price:</span>
                  <span style="color: #111827; font-weight: 700;">₹${price.toLocaleString('en-IN')}</span>
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
                <a href="https://abf76357.flyq-air.pages.dev/track-order?tracking=${trackingId}" class="btn">Track Your Order</a>
              </div>

              <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 24px 0;">
                <h3 style="color: #0EA5E9; margin: 0 0 12px 0;">🔐 Your Account Details</h3>
                <p style="margin: 0; color: #374151; font-size: 14px;">
                  We've created an account for you. You can login anytime to track your orders.
                </p>
                <div style="margin-top: 12px;">
                  <p style="margin: 4px 0;"><strong>Login URL:</strong> <a href="https://abf76357.flyq-air.pages.dev/login">https://abf76357.flyq-air.pages.dev/login</a></p>
                  <p style="margin: 4px 0;"><strong>Email:</strong> ${to}</p>
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

    return c.json({
      success: true,
      messageId: result.id,
      subject: subject,
      to: to
    })

  } catch (error: any) {
    console.error('Test email error:', error)
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

export default testEmailRouter
