import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
  TWILIO_ACCOUNT_SID?: string
  TWILIO_AUTH_TOKEN?: string
  TWILIO_PHONE_NUMBER?: string
  AWS_SNS_REGION?: string
  AWS_SNS_ACCESS_KEY?: string
  AWS_SNS_SECRET_KEY?: string
}

const smsRouter = new Hono<{ Bindings: Bindings }>()

// SMS provider interface
interface SMSProvider {
  sendSMS(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }>
}

// Twilio SMS Provider
class TwilioProvider implements SMSProvider {
  constructor(
    private accountSid: string,
    private authToken: string,
    private fromNumber: string
  ) {}

  async sendSMS(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`
      
      const body = new URLSearchParams({
        To: to,
        From: this.fromNumber,
        Body: message
      })

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${this.accountSid}:${this.authToken}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, messageId: data.sid }
      } else {
        return { success: false, error: data.message || 'Twilio API error' }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// AWS SNS SMS Provider
class SNSProvider implements SMSProvider {
  constructor(
    private region: string,
    private accessKey: string,
    private secretKey: string
  ) {}

  async sendSMS(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    // Note: AWS SNS requires AWS SDK which is not available in Cloudflare Workers
    // This is a placeholder - use Twilio instead or implement via AWS API Gateway
    return {
      success: false,
      error: 'AWS SNS not available in Cloudflare Workers. Use Twilio or API Gateway.'
    }
  }
}

// Mock SMS Provider for testing
class MockSMSProvider implements SMSProvider {
  async sendSMS(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    console.log(`[MOCK SMS] To: ${to}`)
    console.log(`[MOCK SMS] Message: ${message}`)
    return { success: true, messageId: 'mock-' + Date.now() }
  }
}

// Get SMS provider based on configuration
function getSMSProvider(env: Bindings): SMSProvider {
  // Try Twilio first
  if (env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_PHONE_NUMBER) {
    return new TwilioProvider(
      env.TWILIO_ACCOUNT_SID,
      env.TWILIO_AUTH_TOKEN,
      env.TWILIO_PHONE_NUMBER
    )
  }
  
  // Fallback to mock for development
  return new MockSMSProvider()
}

// Send SMS notification for shipping update
smsRouter.post('/api/admin/orders/:id/send-tracking-sms', async (c) => {
  const orderId = c.req.param('id')
  
  const order = await c.env.DB.prepare(`
    SELECT 
      o.order_number,
      o.tracking_id,
      o.shipping_carrier,
      o.shipping_status,
      o.estimated_delivery,
      u.phone,
      u.name
    FROM orders o
    JOIN users u ON o.user_id = u.id
    WHERE o.id = ?
  `).bind(orderId).first()
  
  if (!order) {
    return c.json({ error: 'Order not found' }, 404)
  }
  
  if (!order.phone) {
    return c.json({ error: 'Customer phone number not available' }, 400)
  }
  
  if (!order.tracking_id) {
    return c.json({ error: 'No tracking ID generated yet' }, 400)
  }

  const provider = getSMSProvider(c.env)
  
  // Format phone number (ensure it starts with country code)
  let phoneNumber = order.phone.replace(/\D/g, '')
  if (phoneNumber.length === 10) {
    phoneNumber = '+91' + phoneNumber // Default to India
  } else if (!phoneNumber.startsWith('+')) {
    phoneNumber = '+' + phoneNumber
  }

  const deliveryDate = order.estimated_delivery 
    ? new Date(order.estimated_delivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : 'TBD'

  const statusMessages: Record<string, string> = {
    'pending': `🚁 FLYQ Drones: Your order ${order.order_number} is ready for pickup on Monday! Track: ${order.tracking_id}`,
    'picked_up': `📦 FLYQ Drones: Your order ${order.tracking_id} has been picked up by ${order.shipping_carrier}. Delivery: ${deliveryDate}`,
    'in_transit': `✈️ FLYQ Drones: Your order ${order.tracking_id} is in transit. Expected delivery: ${deliveryDate}`,
    'out_for_delivery': `🚗 FLYQ Drones: Your order ${order.tracking_id} is out for delivery today! Please be available.`,
    'delivered': `✅ FLYQ Drones: Your order ${order.tracking_id} has been delivered! Enjoy your FLYQ drone! 🎉`
  }

  const message = statusMessages[order.shipping_status] || `FLYQ Drones: Track your order ${order.tracking_id} at flyq-air.pages.dev/track-order`

  const result = await provider.sendSMS(phoneNumber, message)

  if (result.success) {
    // Log SMS in database
    await c.env.DB.prepare(`
      INSERT INTO shipping_updates (order_id, tracking_id, status, message, updated_by)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      orderId,
      order.tracking_id,
      'sms_sent',
      `SMS sent to ${phoneNumber}: ${message}`,
      'System'
    ).run()

    return c.json({
      success: true,
      message: 'SMS sent successfully',
      messageId: result.messageId,
      to: phoneNumber
    })
  } else {
    return c.json({
      success: false,
      error: result.error
    }, 500)
  }
})

// Send bulk SMS notifications
smsRouter.post('/api/admin/orders/bulk-sms', async (c) => {
  const { orderIds, message: customMessage } = await c.req.json()
  
  if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
    return c.json({ error: 'orderIds array is required' }, 400)
  }

  const provider = getSMSProvider(c.env)
  const results = []

  for (const orderId of orderIds) {
    const order = await c.env.DB.prepare(`
      SELECT 
        o.order_number,
        o.tracking_id,
        o.shipping_status,
        u.phone,
        u.name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `).bind(orderId).first()

    if (!order || !order.phone) {
      results.push({ orderId, success: false, error: 'No phone number' })
      continue
    }

    let phoneNumber = order.phone.replace(/\D/g, '')
    if (phoneNumber.length === 10) {
      phoneNumber = '+91' + phoneNumber
    } else if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+' + phoneNumber
    }

    const message = customMessage || `FLYQ Drones: Track order ${order.tracking_id} at flyq-air.pages.dev/track-order`
    
    const result = await provider.sendSMS(phoneNumber, message)
    results.push({ orderId, success: result.success, messageId: result.messageId, error: result.error })

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  const successCount = results.filter(r => r.success).length
  
  return c.json({
    success: true,
    totalSent: successCount,
    totalFailed: results.length - successCount,
    results
  })
})

// Test SMS configuration
smsRouter.post('/api/admin/test-sms', async (c) => {
  const { phoneNumber, message } = await c.req.json()
  
  if (!phoneNumber) {
    return c.json({ error: 'phoneNumber is required' }, 400)
  }

  const provider = getSMSProvider(c.env)
  const testMessage = message || 'Test message from FLYQ Drones! 🚁 Your SMS notifications are working!'

  const result = await provider.sendSMS(phoneNumber, testMessage)

  return c.json({
    success: result.success,
    messageId: result.messageId,
    error: result.error,
    provider: c.env.TWILIO_ACCOUNT_SID ? 'Twilio' : 'Mock (Development)'
  })
})

export default smsRouter
