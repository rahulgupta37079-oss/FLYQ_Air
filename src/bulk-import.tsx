import { Hono } from 'hono'
import { Resend } from 'resend'
import bcrypt from 'bcryptjs'

type Bindings = {
  DB: D1Database
  RESEND_API_KEY: string
}

const bulkImportRouter = new Hono<{ Bindings: Bindings }>()

// Bulk import customers with orders
bulkImportRouter.post('/api/admin/bulk-import-customers', async (c) => {
  try {
    const { customers, useOldPricing } = await c.req.json()
    
    if (!customers || !Array.isArray(customers)) {
      return c.json({ error: 'customers array is required' }, 400)
    }

    const results = {
      success: [],
      failed: [],
      totalProcessed: 0,
      accountsCreated: 0,
      ordersCreated: 0,
      emailsSent: 0
    }

    const resend = new Resend(c.env.RESEND_API_KEY)

    for (const customer of customers) {
      results.totalProcessed++
      
      try {
        // 1. Check if user already exists
        const existingUser = await c.env.DB.prepare(
          'SELECT id FROM users WHERE email = ?'
        ).bind(customer.email).first()

        let userId
        
        if (existingUser) {
          userId = existingUser.id
        } else {
          // 2. Create user account
          const passwordHash = await bcrypt.hash(customer.password, 10)
          
          const userResult = await c.env.DB.prepare(`
            INSERT INTO users (email, password_hash, name, phone, address, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `).bind(
            customer.email,
            passwordHash,
            customer.name,
            customer.mobile,
            customer.address
          ).run()

          userId = userResult.meta.last_row_id
          results.accountsCreated++
        }

        // 3. Generate order number
        const orderNumber = `FLYQ-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        
        // Determine pricing
        let productPrice = customer.productPrice
        if (useOldPricing) {
          productPrice = customer.productName === 'FLYQ Air' ? 4999 : 8999
        }

        // 4. Create order
        const orderResult = await c.env.DB.prepare(`
          INSERT INTO orders (
            user_id, order_number, status, total, subtotal, 
            payment_id, payment_status, payment_method,
            shipping_address, created_at, updated_at
          )
          VALUES (?, ?, 'confirmed', ?, ?, ?, 'paid', 'manual', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `).bind(
          userId,
          orderNumber,
          productPrice,
          productPrice,
          customer.transactionId,
          customer.address
        ).run()

        const orderId = orderResult.meta.last_row_id

        // 5. Get product ID
        const product = await c.env.DB.prepare(
          'SELECT id FROM products WHERE name = ?'
        ).bind(customer.productName).first()

        if (product) {
          // 6. Create order item
          await c.env.DB.prepare(`
            INSERT INTO order_items (
              order_id, product_id, quantity, price, product_name, created_at
            )
            VALUES (?, ?, 1, ?, ?, CURRENT_TIMESTAMP)
          `).bind(
            orderId,
            product.id,
            productPrice,
            customer.productName
          ).run()
        }

        results.ordersCreated++

        // 7. Generate shipping ID and tracking number
        const timestamp = Date.now()
        const shippingId = `SHIP-${orderNumber}-${timestamp}`
        const trackingId = `TRK${timestamp}${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        
        // Calculate next Monday
        const today = new Date()
        const daysUntilMonday = (8 - today.getDay()) % 7 || 7
        const estimatedDelivery = new Date(today)
        estimatedDelivery.setDate(today.getDate() + daysUntilMonday)
        const deliveryDate = estimatedDelivery.toISOString().split('T')[0]

        // 8. Update order with shipping info
        await c.env.DB.prepare(`
          UPDATE orders 
          SET shipping_id = ?,
              tracking_id = ?,
              shipping_status = 'pending',
              shipping_carrier = 'FLYQ Express',
              estimated_delivery = ?,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(shippingId, trackingId, deliveryDate, orderId).run()

        // 9. Add shipping update
        await c.env.DB.prepare(`
          INSERT INTO shipping_updates (order_id, tracking_id, status, location, message, updated_by)
          VALUES (?, ?, 'pending', 'FLYQ Warehouse', 'Order confirmed and ready for shipment', 'System')
        `).bind(orderId, trackingId).run()

        // 10. Send confirmation email
        const deliveryDateFormatted = estimatedDelivery.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })

        const trackingUrl = `https://abf76357.flyq-air.pages.dev/track-order?tracking=${trackingId}`

        try {
          await resend.emails.send({
            from: 'FLYQ Drones <orders@flyqdrones.com>',
            to: [customer.email],
            subject: `Welcome to FLYQ! Order Confirmed - ${orderNumber}`,
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
                  .footer { background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 14px; }
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
                    <p style="font-size: 16px;">Hi <strong>${customer.name}</strong>,</p>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                      Thank you for your purchase! Your order has been confirmed and your <strong>${customer.productName}</strong> 
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
                        <span style="color: #111827; font-weight: 700;">${customer.productName}</span>
                      </div>
                      <div class="info-row">
                        <span style="color: #6b7280; font-weight: 600;">Price:</span>
                        <span style="color: #111827; font-weight: 700;">₹${productPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div class="info-row" style="border-bottom: none;">
                        <span style="color: #6b7280; font-weight: 600;">Quantity:</span>
                        <span style="color: #111827; font-weight: 700;">1</span>
                      </div>
                    </div>

                    <div class="alert">
                      <p style="margin: 0; color: #92400e; font-weight: 600;">📅 Pickup Scheduled</p>
                      <p style="margin: 8px 0 0 0; color: #78350f; font-size: 14px;">
                        Your order will be picked up by our delivery partner on <strong>Monday</strong>. 
                        You'll receive updates as your order progresses.
                      </p>
                    </div>

                    <div style="text-align: center;">
                      <a href="${trackingUrl}" class="btn">Track Your Order</a>
                    </div>

                    <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 24px 0;">
                      <h3 style="color: #0EA5E9; margin: 0 0 12px 0;">🔐 Your Account Details</h3>
                      <p style="margin: 0; color: #374151; font-size: 14px;">
                        We've created an account for you. You can login anytime to track your orders.
                      </p>
                      <div style="margin-top: 12px;">
                        <p style="margin: 4px 0;"><strong>Login URL:</strong> <a href="https://abf76357.flyq-air.pages.dev/login">https://abf76357.flyq-air.pages.dev/login</a></p>
                        <p style="margin: 4px 0;"><strong>Email:</strong> ${customer.email}</p>
                        <p style="margin: 4px 0;"><strong>Password:</strong> <code style="background: #fef3c7; padding: 4px 8px; border-radius: 4px;">${customer.password}</code></p>
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
        }

        results.success.push({
          email: customer.email,
          name: customer.name,
          orderId,
          orderNumber,
          trackingId,
          userId
        })

      } catch (error: any) {
        results.failed.push({
          email: customer.email,
          error: error.message,
          step: 'processing'
        })
      }
    }

    return c.json({
      success: true,
      results,
      message: `Processed ${results.totalProcessed} customers. Created ${results.accountsCreated} accounts, ${results.ordersCreated} orders, sent ${results.emailsSent} emails.`
    })

  } catch (error: any) {
    return c.json({
      error: 'Bulk import failed',
      message: error.message
    }, 500)
  }
})

export default bulkImportRouter
