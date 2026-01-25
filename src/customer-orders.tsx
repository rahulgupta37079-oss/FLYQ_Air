import { Hono } from 'hono'
import { getCurrentUser } from './lib/auth'

type Bindings = {
  DB: D1Database
}

const customerOrdersRouter = new Hono<{ Bindings: Bindings }>()

// Orders List Page
customerOrdersRouter.get('/account/orders', async (c) => {
  const user = await getCurrentUser(c)
  
  if (!user) {
    return c.redirect('/login?redirect=/account/orders')
  }

  const orders = await c.env.DB.prepare(`
    SELECT 
      o.*,
      oi.product_name,
      oi.price as item_price,
      oi.quantity
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `).bind(user.id).all()

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Orders | FLYQ Drones</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div class="container mx-auto px-6 max-w-7xl">
          <a href="/account" class="text-blue-100 hover:text-white mb-4 inline-block">
            <i class="fas fa-arrow-left mr-2"></i>Back to Dashboard
          </a>
          <h1 class="text-5xl font-black">
            <i class="fas fa-shopping-bag mr-3"></i>
            My Orders
          </h1>
          <p class="text-blue-100 text-lg mt-2">${orders.results.length} order${orders.results.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      <div class="container mx-auto px-6 max-w-7xl py-12">
        <div class="grid md:grid-cols-4 gap-8">
          <!-- Sidebar -->
          <div class="md:col-span-1">
            <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <nav class="space-y-2">
                <a href="/account" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold">
                  <i class="fas fa-home w-6"></i>Dashboard
                </a>
                <a href="/account/orders" class="flex items-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-semibold">
                  <i class="fas fa-shopping-bag w-6"></i>Orders
                </a>
                <a href="/account/profile" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold">
                  <i class="fas fa-user w-6"></i>Profile
                </a>
                <a href="/account/curriculum" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold">
                  <i class="fas fa-graduation-cap w-6"></i>Curriculum
                </a>
                <a href="/" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold">
                  <i class="fas fa-home w-6"></i>Home
                </a>
              </nav>
            </div>
          </div>

          <!-- Orders List -->
          <div class="md:col-span-3">
            ${orders.results.length > 0 ? `
              <div class="space-y-6">
                ${orders.results.map((order: any) => `
                  <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                    <!-- Order Header -->
                    <div class="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-6">
                      <div class="flex justify-between items-start">
                        <div>
                          <div class="text-sm text-blue-100 mb-1">ORDER NUMBER</div>
                          <div class="text-2xl font-bold">${order.order_number}</div>
                          <div class="text-sm text-blue-100 mt-2">
                            <i class="fas fa-calendar mr-2"></i>
                            ${new Date(order.created_at).toLocaleDateString('en-IN', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-3xl font-black">₹${order.total.toLocaleString('en-IN')}</div>
                          <div class="mt-2">
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              order.payment_status === 'paid' ? 'bg-green-500' :
                              order.payment_status === 'pending' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }">
                              ${order.payment_status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Order Body -->
                    <div class="p-6">
                      <div class="grid md:grid-cols-2 gap-6 mb-6">
                        <!-- Product Info -->
                        <div>
                          <h3 class="text-lg font-bold text-gray-800 mb-3">Product Details</h3>
                          <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                              <span class="text-gray-600">Product:</span>
                              <span class="font-semibold">${order.product_name}</span>
                            </div>
                            <div class="flex justify-between">
                              <span class="text-gray-600">Quantity:</span>
                              <span class="font-semibold">${order.quantity || 1}</span>
                            </div>
                            <div class="flex justify-between">
                              <span class="text-gray-600">Unit Price:</span>
                              <span class="font-semibold">₹${order.item_price ? order.item_price.toLocaleString('en-IN') : order.total.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>

                        <!-- Shipping Info -->
                        <div>
                          <h3 class="text-lg font-bold text-gray-800 mb-3">Shipping Details</h3>
                          <div class="space-y-2 text-sm">
                            ${order.tracking_id ? `
                              <div>
                                <div class="text-gray-600 mb-1">Tracking ID:</div>
                                <div class="font-mono text-xs bg-gray-100 p-2 rounded">${order.tracking_id}</div>
                              </div>
                            ` : ''}
                            <div class="flex justify-between">
                              <span class="text-gray-600">Status:</span>
                              <span class="font-semibold ${
                                order.shipping_status === 'delivered' ? 'text-green-600' :
                                order.shipping_status === 'shipped' ? 'text-blue-600' :
                                order.shipping_status === 'pending' ? 'text-yellow-600' :
                                'text-gray-600'
                              }">
                                ${order.shipping_status ? order.shipping_status.toUpperCase() : 'PENDING'}
                              </span>
                            </div>
                            ${order.estimated_delivery ? `
                              <div class="flex justify-between">
                                <span class="text-gray-600">Estimated Delivery:</span>
                                <span class="font-semibold">${new Date(order.estimated_delivery).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                            ` : ''}
                            ${order.shipping_address ? `
                              <div>
                                <div class="text-gray-600 mb-1">Delivery Address:</div>
                                <div class="text-gray-800">${order.shipping_address}</div>
                              </div>
                            ` : ''}
                          </div>
                        </div>
                      </div>

                      <!-- Actions -->
                      <div class="flex gap-3 pt-4 border-t border-gray-200">
                        <a href="/account/orders/${order.id}" 
                           class="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                          <i class="fas fa-eye mr-2"></i>View Details
                        </a>
                        ${order.tracking_id ? `
                          <a href="/track-order?tracking=${order.tracking_id}" 
                             class="flex-1 bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                            <i class="fas fa-search-location mr-2"></i>Track Order
                          </a>
                        ` : ''}
                        <button onclick="downloadInvoice('${order.id}')" 
                                class="flex-1 bg-gray-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-700 transition">
                          <i class="fas fa-download mr-2"></i>Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="bg-white rounded-xl shadow-lg p-12 text-center">
                <i class="fas fa-shopping-cart text-8xl text-gray-300 mb-6"></i>
                <h2 class="text-3xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
                <p class="text-gray-600 text-lg mb-8">Start shopping to see your orders here!</p>
                <a href="/" class="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition">
                  <i class="fas fa-shopping-bag mr-2"></i>Browse Products
                </a>
              </div>
            `}
          </div>
        </div>
      </div>

      <script>
        async function downloadInvoice(orderId) {
          try {
            const response = await fetch(\`/api/orders/\${orderId}/invoice\`, {
              method: 'GET'
            });
            
            if (response.ok) {
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = \`FLYQ-Invoice-\${orderId}.pdf\`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            } else {
              alert('Invoice generation is being prepared. Please try again in a moment.');
            }
          } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download invoice');
          }
        }
      </script>
    </body>
    </html>
  `)
})

// Single Order Detail Page
customerOrdersRouter.get('/account/orders/:id', async (c) => {
  const user = await getCurrentUser(c)
  
  if (!user) {
    return c.redirect('/login?redirect=/account/orders')
  }

  const orderId = c.req.param('id')
  
  const order = await c.env.DB.prepare(`
    SELECT 
      o.*,
      oi.product_name,
      oi.price as item_price,
      oi.quantity,
      u.name as user_name,
      u.email as user_email,
      u.phone as user_phone,
      u.address as user_address
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN users u ON o.user_id = u.id
    WHERE o.id = ? AND o.user_id = ?
  `).bind(orderId, user.id).first()

  if (!order) {
    return c.html('<h1>Order Not Found</h1>', 404)
  }

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Details | FLYQ Drones</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div class="container mx-auto px-6 max-w-5xl">
          <a href="/account/orders" class="text-blue-100 hover:text-white mb-4 inline-block">
            <i class="fas fa-arrow-left mr-2"></i>Back to Orders
          </a>
          <h1 class="text-4xl font-black mb-2">Order Details</h1>
          <p class="text-blue-100">${order.order_number}</p>
        </div>
      </div>

      <div class="container mx-auto px-6 max-w-5xl py-12">
        <!-- Order Status -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Order Status</h2>
            <button onclick="downloadInvoice('${order.id}')" 
                    class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              <i class="fas fa-download mr-2"></i>Download Invoice
            </button>
          </div>

          <div class="grid md:grid-cols-4 gap-4">
            <div class="text-center p-4 rounded-lg ${order.status === 'confirmed' || order.status === 'paid' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-100' : 'bg-gray-100'}">
              <i class="fas fa-check-circle text-3xl ${order.status === 'confirmed' || order.status === 'paid' || order.status === 'shipped' || order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'} mb-2"></i>
              <div class="font-bold">Confirmed</div>
            </div>
            <div class="text-center p-4 rounded-lg ${order.payment_status === 'paid' ? 'bg-green-100' : 'bg-gray-100'}">
              <i class="fas fa-money-bill-wave text-3xl ${order.payment_status === 'paid' ? 'text-green-600' : 'text-gray-400'} mb-2"></i>
              <div class="font-bold">Paid</div>
            </div>
            <div class="text-center p-4 rounded-lg ${order.shipping_status === 'shipped' || order.shipping_status === 'delivered' ? 'bg-green-100' : 'bg-gray-100'}">
              <i class="fas fa-shipping-fast text-3xl ${order.shipping_status === 'shipped' || order.shipping_status === 'delivered' ? 'text-green-600' : 'text-gray-400'} mb-2"></i>
              <div class="font-bold">Shipped</div>
            </div>
            <div class="text-center p-4 rounded-lg ${order.shipping_status === 'delivered' ? 'bg-green-100' : 'bg-gray-100'}">
              <i class="fas fa-check-double text-3xl ${order.shipping_status === 'delivered' ? 'text-green-600' : 'text-gray-400'} mb-2"></i>
              <div class="font-bold">Delivered</div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Order Information -->
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6">Order Information</h2>
            <div class="space-y-4">
              <div>
                <div class="text-sm text-gray-600 mb-1">Order Number</div>
                <div class="font-mono font-bold">${order.order_number}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600 mb-1">Order Date</div>
                <div class="font-semibold">${new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600 mb-1">Payment Status</div>
                <span class="inline-block px-3 py-1 rounded-full text-sm font-bold ${
                  order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                  order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }">
                  ${order.payment_status.toUpperCase()}
                </span>
              </div>
              ${order.payment_id ? `
                <div>
                  <div class="text-sm text-gray-600 mb-1">Transaction ID</div>
                  <div class="font-mono text-sm bg-gray-100 p-2 rounded">${order.payment_id}</div>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Shipping Information -->
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6">Shipping Information</h2>
            <div class="space-y-4">
              ${order.tracking_id ? `
                <div>
                  <div class="text-sm text-gray-600 mb-1">Tracking ID</div>
                  <div class="font-mono text-sm bg-blue-50 p-3 rounded mb-2">${order.tracking_id}</div>
                  <a href="/track-order?tracking=${order.tracking_id}" 
                     class="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    <i class="fas fa-search-location mr-1"></i>Track this order
                  </a>
                </div>
              ` : ''}
              <div>
                <div class="text-sm text-gray-600 mb-1">Shipping Status</div>
                <span class="inline-block px-3 py-1 rounded-full text-sm font-bold ${
                  order.shipping_status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.shipping_status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  order.shipping_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }">
                  ${order.shipping_status ? order.shipping_status.toUpperCase() : 'PENDING'}
                </span>
              </div>
              ${order.estimated_delivery ? `
                <div>
                  <div class="text-sm text-gray-600 mb-1">Estimated Delivery</div>
                  <div class="font-semibold">${new Date(order.estimated_delivery).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              ` : ''}
              ${order.shipping_address || order.user_address ? `
                <div>
                  <div class="text-sm text-gray-600 mb-1">Delivery Address</div>
                  <div class="text-gray-800">${order.shipping_address || order.user_address}</div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Product Details -->
        <div class="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 class="text-2xl font-bold mb-6">Product Details</h2>
          <div class="border-2 border-gray-200 rounded-lg p-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">${order.product_name}</h3>
                <div class="text-sm text-gray-600">Quantity: ${order.quantity || 1}</div>
                <div class="text-sm text-gray-600">Unit Price: ₹${order.item_price ? order.item_price.toLocaleString('en-IN') : order.total.toLocaleString('en-IN')}</div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-blue-600">₹${order.total.toLocaleString('en-IN')}</div>
                <div class="text-sm text-gray-600">Total Amount</div>
              </div>
            </div>
          </div>

          <!-- Price Breakdown -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="space-y-2 max-w-md ml-auto">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal:</span>
                <span class="font-semibold">₹${(order.subtotal || order.total).toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax:</span>
                <span class="font-semibold">₹${(order.tax || 0).toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping:</span>
                <span class="font-semibold">₹${(order.shipping || 0).toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between pt-2 border-t-2 border-gray-300">
                <span class="text-lg font-bold">Total:</span>
                <span class="text-2xl font-bold text-blue-600">₹${order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Support -->
        <div class="bg-blue-50 rounded-xl p-8 mt-8 text-center">
          <h3 class="text-xl font-bold text-gray-800 mb-2">Need Help?</h3>
          <p class="text-gray-600 mb-4">Contact our support team for any questions about your order</p>
          <div class="flex justify-center gap-4">
            <a href="mailto:info@passion3dworld.com" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              <i class="fas fa-envelope mr-2"></i>Email Support
            </a>
            <a href="https://wa.me/919137361474" target="_blank" class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              <i class="fab fa-whatsapp mr-2"></i>WhatsApp
            </a>
          </div>
        </div>
      </div>

      <script>
        async function downloadInvoice(orderId) {
          try {
            const response = await fetch(\`/api/orders/\${orderId}/invoice\`, {
              method: 'GET'
            });
            
            if (response.ok) {
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = \`FLYQ-Invoice-\${orderId}.pdf\`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            } else {
              alert('Invoice generation is being prepared. Please try again in a moment.');
            }
          } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download invoice');
          }
        }
      </script>
    </body>
    </html>
  `)
})

export default customerOrdersRouter
