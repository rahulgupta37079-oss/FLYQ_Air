import { Hono } from 'hono'
import { getCurrentUser } from './lib/auth'

type Bindings = {
  DB: D1Database
}

const invoiceRouter = new Hono<{ Bindings: Bindings }>()

// Generate Invoice HTML
function generateInvoiceHTML(order: any, user: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice - ${order.order_number}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: Arial, sans-serif; 
      padding: 40px;
      color: #333;
      line-height: 1.6;
    }
    .invoice-container { 
      max-width: 800px; 
      margin: 0 auto;
      background: white;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #0EA5E9;
    }
    .company-info h1 {
      color: #0EA5E9;
      font-size: 32px;
      margin-bottom: 5px;
    }
    .company-info p {
      color: #666;
      font-size: 14px;
    }
    .invoice-title {
      text-align: right;
    }
    .invoice-title h2 {
      font-size: 36px;
      color: #0EA5E9;
      margin-bottom: 5px;
    }
    .invoice-title p {
      color: #666;
      font-size: 14px;
    }
    .details-section {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }
    .details-box {
      width: 48%;
    }
    .details-box h3 {
      color: #0EA5E9;
      font-size: 14px;
      text-transform: uppercase;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .details-box p {
      margin-bottom: 5px;
      font-size: 14px;
    }
    .details-box strong {
      display: inline-block;
      width: 120px;
      color: #666;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    th {
      background: #0EA5E9;
      color: white;
      padding: 12px;
      text-align: left;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 600;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 14px;
    }
    tr:last-child td {
      border-bottom: none;
    }
    .text-right { text-align: right; }
    .totals {
      margin-left: auto;
      width: 300px;
    }
    .totals table {
      margin-bottom: 0;
    }
    .totals td {
      padding: 8px;
      border-bottom: 1px solid #e5e7eb;
    }
    .totals tr:last-child td {
      border-top: 2px solid #0EA5E9;
      border-bottom: none;
      font-weight: bold;
      font-size: 18px;
      padding-top: 12px;
    }
    .footer {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    .footer p { margin-bottom: 5px; }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .status-paid { background: #dcfce7; color: #16a34a; }
    .status-pending { background: #fef3c7; color: #ca8a04; }
    .notes {
      background: #f9fafb;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
      font-size: 13px;
      color: #666;
    }
    @media print {
      body { padding: 0; }
      .invoice-container { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        <h1>FLYQ DRONES</h1>
        <p>ESP32-S3 Programmable Drones</p>
        <p>Email: info@passion3dworld.com</p>
        <p>WhatsApp: +91 9137361474</p>
      </div>
      <div class="invoice-title">
        <h2>INVOICE</h2>
        <p><strong>Invoice #:</strong> ${order.order_number}</p>
        <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString('en-IN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
        <p>
          <span class="status-badge ${order.payment_status === 'paid' ? 'status-paid' : 'status-pending'}">
            ${order.payment_status.toUpperCase()}
          </span>
        </p>
      </div>
    </div>

    <!-- Details Section -->
    <div class="details-section">
      <!-- Bill To -->
      <div class="details-box">
        <h3>Bill To</h3>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone || 'N/A'}</p>
        <p><strong>Address:</strong> ${order.shipping_address || user.address || 'N/A'}</p>
      </div>

      <!-- Order Details -->
      <div class="details-box">
        <h3>Order Details</h3>
        <p><strong>Order Number:</strong> ${order.order_number}</p>
        <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString('en-IN')}</p>
        <p><strong>Payment Status:</strong> ${order.payment_status}</p>
        ${order.payment_id ? `<p><strong>Transaction ID:</strong> ${order.payment_id}</p>` : ''}
        ${order.tracking_id ? `<p><strong>Tracking ID:</strong> ${order.tracking_id}</p>` : ''}
      </div>
    </div>

    <!-- Items Table -->
    <table>
      <thead>
        <tr>
          <th>Item Description</th>
          <th class="text-right">Quantity</th>
          <th class="text-right">Unit Price</th>
          <th class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>${order.product_name}</strong>
            <br>
            <span style="font-size: 12px; color: #666;">
              ESP32-S3 Programmable Drone with Wi-Fi Control
            </span>
          </td>
          <td class="text-right">${order.quantity || 1}</td>
          <td class="text-right">₹${(order.item_price || order.total).toLocaleString('en-IN')}</td>
          <td class="text-right">₹${order.total.toLocaleString('en-IN')}</td>
        </tr>
      </tbody>
    </table>

    <!-- Totals -->
    <div class="totals">
      <table>
        <tr>
          <td>Subtotal:</td>
          <td class="text-right">₹${(order.subtotal || order.total).toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td>Tax (GST ${order.tax ? '18%' : '0%'}):</td>
          <td class="text-right">₹${(order.tax || 0).toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td>Shipping:</td>
          <td class="text-right">₹${(order.shipping || 0).toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td>Total Amount:</td>
          <td class="text-right">₹${order.total.toLocaleString('en-IN')}</td>
        </tr>
      </table>
    </div>

    <!-- Notes -->
    ${order.shipping_status ? `
    <div class="notes">
      <strong>Shipping Information:</strong><br>
      Status: ${order.shipping_status.toUpperCase()}<br>
      ${order.estimated_delivery ? `Estimated Delivery: ${new Date(order.estimated_delivery).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}<br>` : ''}
      ${order.tracking_id ? `Tracking: ${order.tracking_id}` : ''}
    </div>
    ` : ''}

    <div class="notes" style="margin-top: 10px;">
      <strong>Terms & Conditions:</strong><br>
      • Payment is due upon receipt of this invoice.<br>
      • Please retain this invoice for your records.<br>
      • For support, contact us at info@passion3dworld.com or WhatsApp +91 9137361474.<br>
      • Return policy: 7 days from delivery date with original packaging.
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>Thank you for your business!</strong></p>
      <p>FLYQ Drones - Empowering Innovation Through Flight</p>
      <p>© ${new Date().getFullYear()} FLYQ Drones. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `
}

// Get Invoice (HTML version for now, can be converted to PDF)
invoiceRouter.get('/api/orders/:id/invoice', async (c) => {
  const user = await getCurrentUser(c)
  
  if (!user) {
    return c.json({ success: false, message: 'Not authenticated' }, 401)
  }

  try {
    const orderId = c.req.param('id')
    
    // Get order with items
    const order = await c.env.DB.prepare(`
      SELECT 
        o.*,
        oi.product_name,
        oi.price as item_price,
        oi.quantity
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = ? AND o.user_id = ?
    `).bind(orderId, user.id).first()

    if (!order) {
      return c.json({ success: false, message: 'Order not found' }, 404)
    }

    // Generate HTML invoice
    const html = generateInvoiceHTML(order, user)

    // Return HTML that can be printed or saved as PDF
    return c.html(html, 200, {
      'Content-Type': 'text/html',
      'Content-Disposition': `inline; filename="FLYQ-Invoice-${order.order_number}.html"`
    })
  } catch (error: any) {
    console.error('Invoice generation error:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// Alternative: Download as HTML file
invoiceRouter.get('/api/orders/:id/invoice/download', async (c) => {
  const user = await getCurrentUser(c)
  
  if (!user) {
    return c.json({ success: false, message: 'Not authenticated' }, 401)
  }

  try {
    const orderId = c.req.param('id')
    
    const order = await c.env.DB.prepare(`
      SELECT 
        o.*,
        oi.product_name,
        oi.price as item_price,
        oi.quantity
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = ? AND o.user_id = ?
    `).bind(orderId, user.id).first()

    if (!order) {
      return c.json({ success: false, message: 'Order not found' }, 404)
    }

    const html = generateInvoiceHTML(order, user)

    return c.html(html, 200, {
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="FLYQ-Invoice-${order.order_number}.html"`
    })
  } catch (error: any) {
    console.error('Invoice download error:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

export default invoiceRouter
