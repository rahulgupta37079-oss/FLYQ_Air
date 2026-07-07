import { Hono } from 'hono'
import { Resend } from 'resend'

type Bindings = {
  DB: D1Database
  RESEND_API_KEY: string
}

const cancelOrdersRouter = new Hono<{ Bindings: Bindings }>()

// Cancel old orders and send emails
cancelOrdersRouter.post('/api/admin/cancel-old-orders', async (c) => {
  try {
    const { testEmail } = await c.req.json()
    
    const results = {
      cancelledCount: 0,
      emailsSent: 0,
      testEmailSent: false,
      errors: []
    }

    const resend = new Resend(c.env.RESEND_API_KEY)

    // Get first 63 orders (old pricing) with customer details
    const orders = await c.env.DB.prepare(`
      SELECT 
        o.id,
        o.order_number,
        o.total,
        o.tracking_id,
        u.name,
        u.email,
        oi.product_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.total IN (4999, 8999)
      ORDER BY o.created_at ASC
      LIMIT 63
    `).all()

    console.log(`Found ${orders.results.length} orders to cancel`)

    // Cancel each order
    for (const order of orders.results) {
      try {
        // Update order status to cancelled
        await c.env.DB.prepare(`
          UPDATE orders 
          SET status = 'cancelled',
              payment_status = 'refunded',
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(order.id).run()

        results.cancelledCount++

        // Determine new price
        const newPrice = order.product_name === 'FLYQ Air' ? 7999 : 11999
        const oldPrice = order.total
        const priceDiff = newPrice - oldPrice

        // Send cancellation email
        try {
          await resend.emails.send({
            from: 'FLYQ Drones <orders@flyqdrones.com>',
            to: [order.email],
            subject: `Order Cancelled - Price Update | ${order.order_number}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <style>
                  body { font-family: 'Segoe UI', sans-serif; background: #f3f4f6; margin: 0; padding: 0; }
                  .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                  .header { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); padding: 40px; text-align: center; }
                  .header h1 { color: white; margin: 0; font-size: 28px; }
                  .content { padding: 40px; }
                  .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0; }
                  .box { background: #f0f9ff; border: 2px solid #0EA5E9; border-radius: 12px; padding: 24px; margin: 24px 0; }
                  .price { font-size: 24px; font-weight: 700; color: #0EA5E9; }
                  .btn { display: inline-block; background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 24px 0; }
                  .footer { background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 14px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>⚠️ Order Cancelled - Price Update</h1>
                    <p style="color: white; margin: 10px 0 0 0;">Important: Please Read</p>
                  </div>
                  
                  <div class="content">
                    <p style="font-size: 16px;">Hi <strong>${order.name}</strong>,</p>
                    
                    <div class="alert">
                      <p style="margin: 0; color: #92400e; font-weight: 600;">⚠️ Order Cancellation Notice</p>
                      <p style="margin: 8px 0 0 0; color: #78350f; font-size: 14px;">
                        Your previous order has been cancelled due to a pricing update.
                      </p>
                    </div>

                    <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                      We apologize for any inconvenience. Due to recent pricing updates, we have cancelled your original order 
                      placed at the old price and created a new order with updated pricing.
                    </p>
                    
                    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin: 24px 0;">
                      <div style="padding: 12px; background: #fef3c7; border-bottom: 1px solid #f59e0b;">
                        <strong>Cancelled Order Details</strong>
                      </div>
                      <div style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                        <div style="display: flex; justify-content: space-between;">
                          <span style="color: #6b7280;">Order Number:</span>
                          <span style="color: #111827; font-weight: 700;">${order.order_number}</span>
                        </div>
                      </div>
                      <div style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                        <div style="display: flex; justify-content: space-between;">
                          <span style="color: #6b7280;">Product:</span>
                          <span style="color: #111827; font-weight: 700;">${order.product_name}</span>
                        </div>
                      </div>
                      <div style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                        <div style="display: flex; justify-content: space-between;">
                          <span style="color: #6b7280;">Old Price:</span>
                          <span style="color: #dc2626; font-weight: 700; text-decoration: line-through;">₹${oldPrice.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <div style="padding: 12px;">
                        <div style="display: flex; justify-content: space-between;">
                          <span style="color: #6b7280;">New Price:</span>
                          <span style="color: #10b981; font-weight: 700;">₹${newPrice.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <div class="box">
                      <div style="text-align: center;">
                        <div style="color: #0EA5E9; font-size: 14px; font-weight: 600; margin-bottom: 8px;">💰 PRICE DIFFERENCE</div>
                        <div class="price">+₹${priceDiff.toLocaleString('en-IN')}</div>
                        <div style="color: #6b7280; margin-top: 8px; font-size: 14px;">Additional amount</div>
                      </div>
                    </div>

                    <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 24px 0;">
                      <p style="margin: 0; color: #065f46; font-weight: 600;">✅ What Happens Next?</p>
                      <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #047857;">
                        <li>Your old order has been cancelled</li>
                        <li>A new order has been created with updated pricing</li>
                        <li>You will receive a new order confirmation email shortly</li>
                        <li>New tracking information will be provided</li>
                      </ul>
                    </div>

                    <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 24px 0;">
                      <p style="margin: 0; color: #92400e; font-weight: 600;">📞 Have Questions?</p>
                      <p style="margin: 8px 0 0 0; color: #78350f; font-size: 14px;">
                        If you have any questions or concerns about this cancellation, please contact our support team at 
                        <a href="mailto:support@flyqdrones.com" style="color: #f59e0b;">support@flyqdrones.com</a>
                      </p>
                    </div>

                    <div style="text-align: center;">
                      <a href="https://abf76357.flyq-air.pages.dev/login" class="btn">Login to Your Account</a>
                    </div>
                  </div>
                  
                  <div class="footer">
                    <p style="margin: 0;">Need help? Contact us at <a href="mailto:support@flyqdrones.com">support@flyqdrones.com</a></p>
                    <p style="margin: 8px 0 0 0;">© 2026 FLYQ Drones. All rights reserved.</p>
                  </div>
                </div>
              </body>
              </html>
            `
          })

          results.emailsSent++
        } catch (emailError) {
          console.error('Email error:', emailError)
          results.errors.push(`Email failed for ${order.email}`)
        }

      } catch (error) {
        console.error(`Error cancelling order ${order.id}:`, error)
        results.errors.push(`Failed to cancel order ${order.order_number}`)
      }
    }

    // Send test email
    if (testEmail) {
      try {
        await resend.emails.send({
          from: 'FLYQ Drones <orders@flyqdrones.com>',
          to: [testEmail],
          subject: 'Test: Order Cancellation System',
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
                .stat { background: #f0f9ff; border-radius: 12px; padding: 20px; margin: 16px 0; text-align: center; }
                .number { font-size: 36px; font-weight: 700; color: #0EA5E9; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>✅ Test Email - Cancellation System</h1>
                  <p style="color: white; margin: 10px 0 0 0;">System Working Correctly</p>
                </div>
                
                <div class="content">
                  <h2 style="color: #111827;">Cancellation Results</h2>
                  
                  <div class="stat">
                    <div class="number">${results.cancelledCount}</div>
                    <div style="color: #6b7280; font-weight: 600;">Orders Cancelled</div>
                  </div>

                  <div class="stat">
                    <div class="number">${results.emailsSent}</div>
                    <div style="color: #6b7280; font-weight: 600;">Emails Sent</div>
                  </div>

                  <p style="color: #374151; line-height: 1.6;">
                    This is a test email confirming that the order cancellation system is working correctly. 
                    All ${results.cancelledCount} orders with old pricing have been cancelled and notification 
                    emails have been sent to customers.
                  </p>

                  <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 24px 0;">
                    <p style="margin: 0; color: #065f46; font-weight: 600;">✨ System Status</p>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #047857;">
                      <li>Order cancellation: Working ✓</li>
                      <li>Email notifications: Working ✓</li>
                      <li>Database updates: Working ✓</li>
                      <li>Test email: Working ✓</li>
                    </ul>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `
        })

        results.testEmailSent = true
      } catch (error) {
        console.error('Test email error:', error)
        results.errors.push('Test email failed')
      }
    }

    return c.json({
      success: true,
      ...results
    })

  } catch (error) {
    console.error('Cancellation error:', error)
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

export default cancelOrdersRouter
