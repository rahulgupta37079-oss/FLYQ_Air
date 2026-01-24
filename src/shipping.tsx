import { Hono } from 'hono'
import { Resend } from 'resend'

type Bindings = {
  DB: D1Database
  RESEND_API_KEY: string
}

const shippingRouter = new Hono<{ Bindings: Bindings }>()

// Generate shipping and tracking IDs for paid order
shippingRouter.post('/api/admin/orders/:id/generate-shipping', async (c) => {
  const orderId = c.req.param('id')
  
  // Check if order exists and is paid
  const order = await c.env.DB.prepare(`
    SELECT id, order_number, payment_status, shipping_id, tracking_id
    FROM orders 
    WHERE id = ?
  `).bind(orderId).first()
  
  if (!order) {
    return c.json({ error: 'Order not found' }, 404)
  }
  
  if (order.payment_status !== 'paid') {
    return c.json({ error: 'Order must be paid before generating shipping ID' }, 400)
  }
  
  if (order.shipping_id && order.tracking_id) {
    return c.json({ 
      message: 'Shipping already generated',
      shipping_id: order.shipping_id,
      tracking_id: order.tracking_id
    }, 200)
  }
  
  // Generate unique IDs
  const timestamp = Date.now()
  const shippingId = `SHIP-${order.order_number}-${timestamp}`
  const trackingId = `TRK${timestamp}${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  
  // Calculate estimated delivery (Monday of next week)
  const today = new Date()
  const daysUntilMonday = (8 - today.getDay()) % 7 || 7 // Days until next Monday
  const estimatedDelivery = new Date(today)
  estimatedDelivery.setDate(today.getDate() + daysUntilMonday)
  const deliveryDate = estimatedDelivery.toISOString().split('T')[0]
  
  // Update order with shipping information
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
  
  // Add first tracking update
  await c.env.DB.prepare(`
    INSERT INTO shipping_updates (order_id, tracking_id, status, location, message, updated_by)
    VALUES (?, ?, 'pending', 'FLYQ Warehouse', 'Order is being prepared for shipment', 'System')
  `).bind(orderId, trackingId, ).run()
  
  return c.json({
    success: true,
    shipping_id: shippingId,
    tracking_id: trackingId,
    estimated_delivery: deliveryDate,
    message: `Shipping ID and Tracking ID generated. Estimated delivery: ${estimatedDelivery.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
  })
})

// Update shipping status
shippingRouter.post('/api/admin/orders/:id/update-shipping', async (c) => {
  const orderId = c.req.param('id')
  const { status, location, message, carrier } = await c.req.json()
  
  const order = await c.env.DB.prepare(`
    SELECT tracking_id FROM orders WHERE id = ?
  `).bind(orderId).first()
  
  if (!order || !order.tracking_id) {
    return c.json({ error: 'Order not found or no tracking ID' }, 404)
  }
  
  // Update order status
  const updates = ['shipping_status = ?']
  const bindings = [status]
  
  if (carrier) {
    updates.push('shipping_carrier = ?')
    bindings.push(carrier)
  }
  
  if (status === 'delivered') {
    updates.push('delivered_at = CURRENT_TIMESTAMP')
  } else if (status === 'picked_up') {
    updates.push('shipped_at = CURRENT_TIMESTAMP')
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP')
  bindings.push(orderId)
  
  await c.env.DB.prepare(`
    UPDATE orders 
    SET ${updates.join(', ')}
    WHERE id = ?
  `).bind(...bindings).run()
  
  // Add tracking update
  await c.env.DB.prepare(`
    INSERT INTO shipping_updates (order_id, tracking_id, status, location, message, updated_by)
    VALUES (?, ?, ?, ?, ?, 'Admin')
  `).bind(orderId, order.tracking_id, status, location || '', message || '').run()
  
  return c.json({
    success: true,
    message: 'Shipping status updated'
  })
})

// Send tracking email to customer
shippingRouter.post('/api/admin/orders/:id/send-tracking-email', async (c) => {
  const orderId = c.req.param('id')
  
  const order = await c.env.DB.prepare(`
    SELECT 
      o.order_number,
      o.tracking_id,
      o.shipping_carrier,
      o.estimated_delivery,
      o.shipping_status,
      u.email,
      u.name
    FROM orders o
    JOIN users u ON o.user_id = u.id
    WHERE o.id = ?
  `).bind(orderId).first()
  
  if (!order || !order.tracking_id) {
    return c.json({ error: 'Order not found or no tracking ID' }, 404)
  }
  
  const resend = new Resend(c.env.RESEND_API_KEY)
  
  const deliveryDate = new Date(order.estimated_delivery)
  const formattedDate = deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  
  const trackingUrl = `https://flyq-air.pages.dev/track-order?tracking=${order.tracking_id}`
  
  try {
    await resend.emails.send({
      from: 'FLYQ Drones <orders@flyqdrones.com>',
      to: [order.email],
      subject: `Your FLYQ Order is Ready for Pickup! Tracking: ${order.tracking_id}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); padding: 40px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
            .content { padding: 40px; }
            .tracking-box { background: #f0f9ff; border: 2px solid #0EA5E9; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center; }
            .tracking-id { font-size: 24px; font-weight: 700; color: #0EA5E9; font-family: 'Courier New', monospace; margin: 12px 0; }
            .info-row { display: flex; justify-content: space-between; padding: 16px; border-bottom: 1px solid #e5e7eb; }
            .info-label { color: #6b7280; font-weight: 600; }
            .info-value { color: #111827; font-weight: 700; }
            .btn { display: inline-block; background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 24px 0; }
            .footer { background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 14px; }
            .icon { width: 48px; height: 48px; margin: 0 auto 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚁 Your Order is Ready for Pickup!</h1>
            </div>
            
            <div class="content">
              <p>Hi ${order.name},</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                Great news! Your FLYQ drone order <strong>${order.order_number}</strong> has been processed and is ready for shipment. 
                Your order will be picked up by our delivery partner on <strong style="color: #0EA5E9;">${formattedDate}</strong>.
              </p>
              
              <div class="tracking-box">
                <div style="color: #0EA5E9; font-size: 18px; font-weight: 600; margin-bottom: 8px;">📦 Your Tracking Number</div>
                <div class="tracking-id">${order.tracking_id}</div>
                <div style="color: #6b7280; margin-top: 8px;">Carrier: ${order.shipping_carrier}</div>
              </div>
              
              <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin: 24px 0;">
                <div class="info-row">
                  <span class="info-label">Order Number:</span>
                  <span class="info-value">${order.order_number}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Estimated Delivery:</span>
                  <span class="info-value">${formattedDate}</span>
                </div>
                <div class="info-row" style="border-bottom: none;">
                  <span class="info-label">Current Status:</span>
                  <span class="info-value" style="color: #0EA5E9;">Ready for Pickup</span>
                </div>
              </div>
              
              <div style="text-align: center;">
                <a href="${trackingUrl}" class="btn">Track Your Order</a>
              </div>
              
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0;">
                <p style="margin: 0; color: #92400e; font-weight: 600;">📅 Pickup Scheduled</p>
                <p style="margin: 8px 0 0 0; color: #78350f;">Your order will be picked up by our delivery partner on Monday. You'll receive updates as your order moves through our delivery network.</p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
                You can track your order anytime using the tracking number above. We'll send you updates as your order progresses.
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">Questions? Contact us at support@flyqdrones.com</p>
              <p style="margin: 8px 0 0 0;">© 2024 FLYQ Drones. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    })
    
    return c.json({
      success: true,
      message: 'Tracking email sent successfully'
    })
  } catch (error: any) {
    return c.json({
      error: 'Failed to send email',
      details: error.message
    }, 500)
  }
})

// Customer-facing: Track order page
shippingRouter.get('/track-order', async (c) => {
  const trackingId = c.req.query('tracking')
  
  let order = null
  let updates = null
  
  if (trackingId) {
    order = await c.env.DB.prepare(`
      SELECT 
        o.order_number,
        o.tracking_id,
        o.shipping_id,
        o.shipping_carrier,
        o.shipping_status,
        o.estimated_delivery,
        o.shipped_at,
        o.delivered_at,
        o.created_at
      FROM orders o
      WHERE o.tracking_id = ?
    `).bind(trackingId).first()
    
    if (order) {
      const updatesResult = await c.env.DB.prepare(`
        SELECT status, location, message, created_at
        FROM shipping_updates
        WHERE tracking_id = ?
        ORDER BY created_at DESC
      `).bind(trackingId).all()
      
      updates = updatesResult.results
    }
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Track Your Order | FLYQ Drones</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          .gradient-bg {
            background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%);
          }
          .status-timeline {
            position: relative;
          }
          .status-timeline::before {
            content: '';
            position: absolute;
            left: 20px;
            top: 40px;
            bottom: 0;
            width: 2px;
            background: #e5e7eb;
          }
          .status-item {
            position: relative;
            padding-left: 60px;
            padding-bottom: 32px;
          }
          .status-icon {
            position: absolute;
            left: 0;
            top: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <nav class="gradient-bg text-white py-4 shadow-lg">
            <div class="container mx-auto px-4 flex items-center justify-between">
                <a href="/" class="text-2xl font-bold">
                    <i class="fas fa-drone mr-2"></i>FLYQ Drones
                </a>
                <div class="flex space-x-4">
                    <a href="/" class="hover:text-blue-200 transition">Home</a>
                    <a href="/my-orders" class="hover:text-blue-200 transition">My Orders</a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-4 py-12 max-w-4xl">
            <!-- Search Box -->
            <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-map-marker-alt text-sky-500 mr-3"></i>
                    Track Your Order
                </h1>
                
                <form method="GET" action="/track-order" class="flex gap-3">
                    <input 
                        type="text" 
                        name="tracking" 
                        placeholder="Enter your tracking ID (e.g., TRK1234567ABC)"
                        value="${trackingId || ''}"
                        class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:outline-none"
                        required
                    />
                    <button type="submit" class="gradient-bg text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                        <i class="fas fa-search mr-2"></i>Track
                    </button>
                </form>
            </div>

            ${order ? `
                <!-- Order Found -->
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <!-- Order Header -->
                    <div class="gradient-bg text-white p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm opacity-90">Tracking ID</p>
                                <h2 class="text-2xl font-bold font-mono">${order.tracking_id}</h2>
                            </div>
                            <div class="text-right">
                                <p class="text-sm opacity-90">Order Number</p>
                                <p class="text-xl font-semibold">${order.order_number}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Status Summary -->
                    <div class="p-6 border-b">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p class="text-sm text-gray-600 mb-2">Current Status</p>
                                <p class="text-xl font-bold text-sky-600 capitalize">
                                    ${getStatusIcon(order.shipping_status)} ${order.shipping_status.replace('_', ' ')}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600 mb-2">Carrier</p>
                                <p class="text-lg font-semibold text-gray-800">${order.shipping_carrier}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600 mb-2">Estimated Delivery</p>
                                <p class="text-lg font-semibold text-gray-800">
                                    ${order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'TBD'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Tracking Timeline -->
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-6">Tracking History</h3>
                        <div class="status-timeline">
                            ${updates && updates.length > 0 ? updates.map((update: any, idx: number) => `
                                <div class="status-item">
                                    <div class="status-icon ${idx === 0 ? 'bg-sky-500' : 'bg-gray-300'}">
                                        <i class="fas ${getStatusIconClass(update.status)} text-white"></i>
                                    </div>
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-bold text-gray-800 capitalize">${update.status.replace('_', ' ')}</span>
                                            <span class="text-sm text-gray-600">
                                                ${new Date(update.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                        ${update.location ? `<p class="text-sm text-gray-600 mb-1"><i class="fas fa-map-marker-alt mr-2"></i>${update.location}</p>` : ''}
                                        ${update.message ? `<p class="text-gray-700">${update.message}</p>` : ''}
                                    </div>
                                </div>
                            `).join('') : `
                                <p class="text-gray-500 text-center py-8">No tracking updates yet</p>
                            `}
                        </div>
                    </div>

                    <!-- Delivery Alert -->
                    ${order.shipping_status === 'pending' ? `
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <div class="flex items-center">
                            <i class="fas fa-calendar-check text-yellow-600 text-2xl mr-4"></i>
                            <div>
                                <p class="font-bold text-yellow-900">Pickup Scheduled</p>
                                <p class="text-yellow-800">Your order will be picked up on Monday for delivery by ${order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'TBD'}</p>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>

                <!-- Need Help -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Need Help?</h3>
                    <p class="text-gray-600 mb-4">If you have any questions about your order, feel free to contact us.</p>
                    <div class="flex flex-wrap gap-4">
                        <a href="mailto:support@flyqdrones.com" class="flex items-center text-sky-600 hover:text-sky-700">
                            <i class="fas fa-envelope mr-2"></i>
                            support@flyqdrones.com
                        </a>
                        <a href="tel:+911234567890" class="flex items-center text-sky-600 hover:text-sky-700">
                            <i class="fas fa-phone mr-2"></i>
                            +91 123-456-7890
                        </a>
                    </div>
                </div>
            ` : trackingId ? `
                <!-- Order Not Found -->
                <div class="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <i class="fas fa-search text-6xl text-gray-300 mb-6"></i>
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">Tracking ID Not Found</h2>
                    <p class="text-gray-600 mb-6">
                        We couldn't find an order with tracking ID: <strong>${trackingId}</strong>
                    </p>
                    <p class="text-sm text-gray-500 mb-6">
                        Please check your tracking ID and try again. Tracking IDs are case-sensitive.
                    </p>
                    <a href="/track-order" class="gradient-bg text-white px-8 py-3 rounded-lg inline-block hover:shadow-lg transition">
                        Try Again
                    </a>
                </div>
            ` : `
                <!-- Instructions -->
                <div class="bg-white rounded-2xl shadow-lg p-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">How to Track Your Order</h2>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div class="bg-sky-100 text-sky-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                            <div>
                                <p class="font-semibold text-gray-800">Find Your Tracking ID</p>
                                <p class="text-gray-600">Check your order confirmation email for your unique tracking ID (e.g., TRK1234567ABC)</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="bg-sky-100 text-sky-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                            <div>
                                <p class="font-semibold text-gray-800">Enter Tracking ID</p>
                                <p class="text-gray-600">Type your tracking ID in the search box above</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="bg-sky-100 text-sky-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                            <div>
                                <p class="font-semibold text-gray-800">View Real-time Updates</p>
                                <p class="text-gray-600">See the current status and complete tracking history of your order</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}
        </div>
    </body>
    </html>
  `)
})

function getStatusIcon(status: string): string {
  const icons: Record<string, string> = {
    'pending': '📦',
    'picked_up': '🚚',
    'in_transit': '✈️',
    'out_for_delivery': '🚗',
    'delivered': '✅'
  }
  return icons[status] || '📦'
}

function getStatusIconClass(status: string): string {
  const classes: Record<string, string> = {
    'pending': 'fa-box',
    'picked_up': 'fa-truck',
    'in_transit': 'fa-plane',
    'out_for_delivery': 'fa-shipping-fast',
    'delivered': 'fa-check-circle'
  }
  return classes[status] || 'fa-box'
}

export default shippingRouter
