import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

const ordersRouter = new Hono<{ Bindings: Bindings }>()

// List all orders
ordersRouter.get('/', async (c) => {
  const status = c.req.query('status') || 'all'
  const page = parseInt(c.req.query('page') || '1')
  const limit = 20
  const offset = (page - 1) * limit

  let query = `
    SELECT o.*, u.name as customer_name, u.email as customer_email 
    FROM orders o 
    LEFT JOIN users u ON o.user_id = u.id
  `
  let countQuery = 'SELECT COUNT(*) as total FROM orders'
  
  if (status !== 'all') {
    query += ' WHERE o.status = ?'
    countQuery += ' WHERE status = ?'
  }
  
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'

  const ordersPromise = status !== 'all' 
    ? c.env.DB.prepare(query).bind(status, limit, offset).all()
    : c.env.DB.prepare(query).bind(limit, offset).all()

  const countPromise = status !== 'all'
    ? c.env.DB.prepare(countQuery).bind(status).first()
    : c.env.DB.prepare(countQuery).first()

  const [orders, count] = await Promise.all([ordersPromise, countPromise])
  const totalPages = Math.ceil((count?.total || 0) / limit)

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Orders Management | FLYQ Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        ${renderAdminSidebar('orders')}
        
        <div class="ml-64 p-8">
            <div class="mb-8 flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">Orders Management</h1>
                    <p class="text-gray-600 mt-2">Manage customer orders and fulfillment</p>
                </div>
                <a href="/admin/orders/new" class="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition">
                    <i class="fas fa-plus mr-2"></i>New Order
                </a>
            </div>

            <!-- Filter Tabs -->
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div class="flex space-x-2">
                    ${['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => `
                        <a href="/admin/orders?status=${s}" 
                           class="px-4 py-2 rounded-lg ${status === s ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition">
                            ${s.charAt(0).toUpperCase() + s.slice(1)}
                        </a>
                    `).join('')}
                </div>
            </div>

            <!-- Orders Table -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order #</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Payment</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${orders.results?.length ? orders.results.map((order: any) => `
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4">
                                    <span class="font-mono text-sm font-semibold text-gray-800">${order.order_number}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <div>
                                        <p class="font-medium text-gray-800">${order.customer_name}</p>
                                        <p class="text-sm text-gray-500">${order.customer_email}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-600">
                                    ${new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td class="px-6 py-4 font-semibold text-gray-800">
                                    ₹${order.total.toFixed(2)}
                                </td>
                                <td class="px-6 py-4">
                                    ${getPaymentBadge(order.payment_status)}
                                </td>
                                <td class="px-6 py-4">
                                    ${getOrderStatusBadge(order.status)}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <a href="/admin/orders/${order.id}" class="text-sky-600 hover:text-sky-800">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                        <a href="/admin/orders/${order.id}/edit" class="text-blue-600 hover:text-blue-800">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <button onclick="printOrder(${order.id})" class="text-gray-600 hover:text-gray-800">
                                            <i class="fas fa-print"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                                    <i class="fas fa-inbox text-4xl mb-4 block"></i>
                                    <p>No orders found</p>
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            ${totalPages > 1 ? `
            <div class="mt-6 flex justify-center space-x-2">
                ${page > 1 ? `<a href="?status=${status}&page=${page - 1}" class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Previous</a>` : ''}
                ${Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => `
                    <a href="?status=${status}&page=${p}" class="px-4 py-2 ${p === page ? 'bg-sky-600 text-white' : 'bg-white border border-gray-300'} rounded-lg hover:bg-sky-700 hover:text-white">${p}</a>
                `).join('')}
                ${page < totalPages ? `<a href="?status=${status}&page=${page + 1}" class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Next</a>` : ''}
            </div>
            ` : ''}
        </div>

        <script>
            function printOrder(orderId) {
                window.open(\`/admin/orders/\${orderId}/print\`, '_blank')
            }
        </script>
    </body>
    </html>
  `)
})

// View single order
ordersRouter.get('/:id', async (c) => {
  const orderId = c.req.param('id')
  
  const order = await c.env.DB.prepare('SELECT * FROM orders WHERE id = ?').bind(orderId).first()
  
  if (!order) {
    return c.html('<h1>Order not found</h1>', 404)
  }

  const items = await c.env.DB.prepare('SELECT * FROM order_items WHERE order_id = ?').bind(orderId).all()

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order ${order.order_number} | FLYQ Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        ${renderAdminSidebar('orders')}
        
        <div class="ml-64 p-8">
            <div class="mb-8 flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">Order ${order.order_number}</h1>
                    <p class="text-gray-600 mt-2">${new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div class="flex space-x-3">
                    <button onclick="window.print()" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                        <i class="fas fa-print mr-2"></i>Print
                    </button>
                    <a href="/admin/orders/${order.id}/edit" class="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700">
                        <i class="fas fa-edit mr-2"></i>Edit
                    </a>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Order Details -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Items -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
                        <table class="w-full">
                            <thead class="border-b">
                                <tr>
                                    <th class="text-left py-2">Product</th>
                                    <th class="text-right py-2">Qty</th>
                                    <th class="text-right py-2">Price</th>
                                    <th class="text-right py-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${items.results.map((item: any) => `
                                    <tr class="border-b">
                                        <td class="py-3">
                                            <p class="font-medium">${item.product_name}</p>
                                        </td>
                                        <td class="text-right">${item.quantity}</td>
                                        <td class="text-right">₹${item.price.toFixed(2)}</td>
                                        <td class="text-right font-semibold">₹${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                            <tfoot class="font-semibold">
                                <tr><td colspan="3" class="text-right py-2">Subtotal:</td><td class="text-right">₹${order.subtotal.toFixed(2)}</td></tr>
                                <tr><td colspan="3" class="text-right py-2">Tax:</td><td class="text-right">₹${order.tax.toFixed(2)}</td></tr>
                                <tr><td colspan="3" class="text-right py-2">Shipping:</td><td class="text-right">₹${(order.shipping || 0).toFixed(2)}</td></tr>
                                ${(order.discount || 0) > 0 ? `<tr><td colspan="3" class="text-right py-2 text-green-600">Discount:</td><td class="text-right text-green-600">-₹${order.discount.toFixed(2)}</td></tr>` : ''}
                                <tr class="text-lg border-t"><td colspan="3" class="text-right py-2">Total:</td><td class="text-right">₹${order.total.toFixed(2)}</td></tr>
                            </tfoot>
                        </table>
                    </div>

                    <!-- Shipping Address -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
                        <p class="text-gray-700 whitespace-pre-line">${order.shipping_address}</p>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Customer Info -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Customer</h2>
                        <div class="space-y-2">
                            <p class="font-medium text-gray-800">${order.customer_name}</p>
                            <p class="text-gray-600">${order.customer_email}</p>
                            ${order.customer_phone ? `<p class="text-gray-600">${order.customer_phone}</p>` : ''}
                        </div>
                    </div>

                    <!-- Order Status -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Status</h2>
                        <div class="space-y-3">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                                ${getOrderStatusBadge(order.status)}
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                                ${getPaymentBadge(order.payment_status)}
                            </div>
                            ${order.payment_method ? `
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <p class="text-gray-700">${order.payment_method}</p>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Tracking -->
                    ${order.tracking_number ? `
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Tracking</h2>
                        <div class="space-y-2">
                            <p class="text-sm text-gray-600">Tracking Number</p>
                            <p class="font-mono font-semibold">${order.tracking_number}</p>
                            ${order.shipping_carrier ? `<p class="text-sm text-gray-600 mt-2">Carrier: ${order.shipping_carrier}</p>` : ''}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    </body>
    </html>
  `)
})

// Helper functions
function getOrderStatusBadge(status: string) {
  const colors: any = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'processing': 'bg-purple-100 text-purple-800',
    'shipped': 'bg-indigo-100 text-indigo-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  }
  
  return `<span class="px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`
}

function getPaymentBadge(status: string) {
  const colors: any = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'paid': 'bg-green-100 text-green-800',
    'failed': 'bg-red-100 text-red-800',
    'refunded': 'bg-gray-100 text-gray-800'
  }
  
  return `<span class="px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`
}

function renderAdminSidebar(activePage: string) {
  // Same sidebar as admin.tsx
  return '<div class="fixed left-0 top-0 h-full w-64 bg-gray-900"></div>'
}

export default ordersRouter
