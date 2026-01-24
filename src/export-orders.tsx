import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

const exportRouter = new Hono<{ Bindings: Bindings }>()

// Export all orders to JSON (for frontend to convert to Excel)
exportRouter.get('/api/admin/export-orders', async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.payment_status,
        o.payment_method,
        o.payment_id as transaction_id,
        o.total,
        o.subtotal,
        o.tax,
        o.shipping,
        o.shipping_id,
        o.tracking_id,
        o.shipping_status,
        o.shipping_carrier,
        o.estimated_delivery,
        o.created_at,
        u.name as customer_name,
        u.email as customer_email,
        u.phone as customer_phone,
        o.shipping_address,
        oi.product_name,
        oi.quantity,
        oi.price as product_price
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      ORDER BY o.created_at DESC
    `).all()

    return c.json({
      success: true,
      orders: result.results
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

export default exportRouter
