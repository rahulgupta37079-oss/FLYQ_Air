import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'

type Bindings = {
  DB: D1Database
}

const customerAccountRouter = new Hono<{ Bindings: Bindings }>()

// Helper to get current user from session
async function getCurrentUser(c: any) {
  const sessionId = getCookie(c, 'session_id')
  if (!sessionId) return null

  try {
    const session = await c.env.DB.prepare('SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime("now")').bind(sessionId).first()
    if (!session) return null

    const user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(session.user_id).first()
    return user
  } catch (error) {
    return null
  }
}

// Account Dashboard
customerAccountRouter.get('/account', async (c) => {
  const user = await getCurrentUser(c)
  
  if (!user) {
    return c.redirect('/login?redirect=/account')
  }

  // Get user's orders
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

  const totalOrders = orders.results.length
  const totalSpent = orders.results.reduce((sum: number, order: any) => sum + order.total, 0)

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Account | FLYQ Drones</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20">
        <div class="container mx-auto px-6 max-w-7xl">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-5xl font-black mb-2">
                <i class="fas fa-user-circle mr-3"></i>
                My Account
              </h1>
              <p class="text-blue-100 text-lg">Welcome back, ${user.name}!</p>
            </div>
            <button onclick="logout()" class="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition">
              <i class="fas fa-sign-out-alt mr-2"></i>Logout
            </button>
          </div>

          <!-- Stats Cards -->
          <div class="grid md:grid-cols-3 gap-6 mt-8">
            <div class="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div class="text-4xl font-black mb-2">${totalOrders}</div>
              <div class="text-blue-100">Total Orders</div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div class="text-4xl font-black mb-2">₹${totalSpent.toLocaleString('en-IN')}</div>
              <div class="text-blue-100">Total Spent</div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div class="text-4xl font-black mb-2">${user.email ? '✓' : '✗'}</div>
              <div class="text-blue-100">Email Verified</div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-6 max-w-7xl py-12">
        <div class="grid md:grid-cols-4 gap-8">
          <!-- Sidebar -->
          <div class="md:col-span-1">
            <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <nav class="space-y-2">
                <a href="/account" class="flex items-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-semibold">
                  <i class="fas fa-home w-6"></i>Dashboard
                </a>
                <a href="/account/orders" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold">
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

          <!-- Main Content -->
          <div class="md:col-span-3">
            <!-- Recent Orders -->
            <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-black">
                  <i class="fas fa-shopping-bag text-blue-600 mr-2"></i>
                  Recent Orders
                </h2>
                <a href="/account/orders" class="text-blue-600 hover:text-blue-700 font-semibold">
                  View All <i class="fas fa-arrow-right ml-1"></i>
                </a>
              </div>

              ${orders.results.length > 0 ? `
                <div class="space-y-4">
                  ${orders.results.slice(0, 3).map((order: any) => `
                    <div class="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition">
                      <div class="flex justify-between items-start mb-4">
                        <div>
                          <div class="font-bold text-lg">${order.order_number}</div>
                          <div class="text-sm text-gray-600">${new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                        <div class="text-right">
                          <div class="font-bold text-2xl text-blue-600">₹${order.total.toLocaleString('en-IN')}</div>
                          <span class="inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }">
                            ${order.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div class="text-sm">
                          <span class="text-gray-600">Product:</span>
                          <span class="font-semibold ml-2">${order.product_name}</span>
                        </div>
                        <div class="flex gap-2">
                          ${order.tracking_id ? `
                            <a href="/track-order?tracking=${order.tracking_id}" 
                               class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                              <i class="fas fa-search-location mr-1"></i>Track
                            </a>
                          ` : ''}
                          <a href="/account/orders/${order.id}" 
                             class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition">
                            <i class="fas fa-eye mr-1"></i>Details
                          </a>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="text-center py-12">
                  <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                  <p class="text-gray-600 text-lg mb-4">No orders yet</p>
                  <a href="/" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                    <i class="fas fa-shopping-bag mr-2"></i>Start Shopping
                  </a>
                </div>
              `}
            </div>

            <!-- Quick Actions -->
            <div class="grid md:grid-cols-2 gap-6">
              <a href="/account/profile" class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition group">
                <i class="fas fa-user-edit text-4xl text-blue-600 mb-4 group-hover:scale-110 transition-transform"></i>
                <h3 class="text-xl font-bold mb-2">Edit Profile</h3>
                <p class="text-gray-600">Update your personal information and shipping address</p>
              </a>
              
              <a href="/account/curriculum" class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition group">
                <i class="fas fa-graduation-cap text-4xl text-green-600 mb-4 group-hover:scale-110 transition-transform"></i>
                <h3 class="text-xl font-bold mb-2">Learning Resources</h3>
                <p class="text-gray-600">Access tutorials, guides, and programming curriculum</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <script>
        async function logout() {
          try {
            const response = await fetch('/api/auth/logout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            if (data.success) {
              window.location.href = data.redirect;
            }
          } catch (error) {
            console.error('Logout error:', error);
            alert('Logout failed');
          }
        }
      </script>
    </body>
    </html>
  `)
})

export default customerAccountRouter
