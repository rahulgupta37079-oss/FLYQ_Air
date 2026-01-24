import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

const customerPortalRouter = new Hono<{ Bindings: Bindings }>()

// Customer Credentials Page
customerPortalRouter.get('/customer-credentials', async (c) => {
  try {
    // Get all recent orders with customer details
    const orders = await c.env.DB.prepare(`
      SELECT 
        o.id,
        o.order_number,
        o.tracking_id,
        o.total,
        o.status,
        o.payment_id as transaction_id,
        o.payment_status,
        o.shipping_status,
        o.created_at,
        u.name,
        u.email,
        u.phone,
        u.address,
        oi.product_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.created_at > datetime('now', '-24 hours')
      ORDER BY o.created_at DESC
    `).all()

    // Load customer passwords from static JSON
    const customerDataUrl = '/static/customer-import-data.json'
    
    const totalRevenue = orders.results.reduce((sum: number, o: any) => sum + o.total, 0)

    return c.html(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Customer Credentials | FLYQ Drones</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="min-h-screen py-12 px-4">
          <!-- Header -->
          <div class="max-w-7xl mx-auto mb-8">
            <div class="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl shadow-xl p-8 text-white">
              <h1 class="text-4xl font-bold mb-2">
                <i class="fas fa-users mr-3"></i>
                Customer Credentials & Order Details
              </h1>
              <p class="text-blue-100">Complete list of all imported customers with login credentials and tracking information</p>
              <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-white/20 rounded-lg p-4">
                  <div class="text-3xl font-bold">${orders.results.length}</div>
                  <div class="text-sm text-blue-100">Total Orders</div>
                </div>
                <div class="bg-white/20 rounded-lg p-4">
                  <div class="text-3xl font-bold">${orders.results.length}</div>
                  <div class="text-sm text-blue-100">Total Customers</div>
                </div>
                <div class="bg-white/20 rounded-lg p-4">
                  <div class="text-3xl font-bold">₹${totalRevenue.toLocaleString('en-IN')}</div>
                  <div class="text-sm text-blue-100">Total Revenue</div>
                </div>
                <div class="bg-white/20 rounded-lg p-4">
                  <div class="text-3xl font-bold">100%</div>
                  <div class="text-sm text-blue-100">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer Cards -->
          <div class="max-w-7xl mx-auto">
            <div id="customerCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${orders.results.map((order: any, index: number) => `
                  <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all" data-email="${order.email}" data-transaction="${order.transaction_id}">
                    <!-- Card Header -->
                    <div class="bg-gradient-to-r from-blue-500 to-cyan-400 p-4 text-white">
                      <div class="flex items-center justify-between">
                        <div class="text-lg font-bold">#${index + 1}</div>
                        <div class="flex gap-2">
                          ${order.payment_status === 'paid' ? '<span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full"><i class="fas fa-check mr-1"></i>Paid</span>' : ''}
                          ${order.status === 'confirmed' ? '<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full"><i class="fas fa-check-circle mr-1"></i>Confirmed</span>' : ''}
                        </div>
                      </div>
                      <div class="mt-2">
                        <h3 class="text-xl font-bold truncate">${order.name}</h3>
                        <p class="text-blue-100 text-sm truncate">${order.email}</p>
                      </div>
                    </div>

                    <!-- Card Body -->
                    <div class="p-6 space-y-4">
                      <!-- Login Credentials -->
                      <div class="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                        <div class="flex items-center mb-2">
                          <i class="fas fa-key text-yellow-600 mr-2"></i>
                          <h4 class="font-bold text-yellow-800">Login Credentials</h4>
                        </div>
                        <div class="space-y-2 text-sm">
                          <div>
                            <span class="text-gray-600">Email:</span>
                            <div class="font-mono bg-white px-2 py-1 rounded mt-1 text-xs break-all">${order.email}</div>
                          </div>
                          <div>
                            <span class="text-gray-600">Password:</span>
                            <div class="password-field font-mono bg-white px-2 py-1 rounded mt-1 font-bold text-green-600">
                              <i class="fas fa-spinner fa-spin"></i> Loading...
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Order Details -->
                      <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                          <span class="text-gray-600">Product:</span>
                          <span class="font-semibold text-gray-800">${order.product_name}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-gray-600">Price:</span>
                          <span class="font-bold text-green-600">₹${order.total.toLocaleString('en-IN')}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-gray-600">Phone:</span>
                          <span class="font-semibold">${order.phone}</span>
                        </div>
                      </div>

                      <!-- Order Number -->
                      <div class="bg-blue-50 rounded-lg p-3">
                        <div class="text-xs text-blue-600 mb-1">ORDER NUMBER</div>
                        <div class="font-mono text-sm font-bold text-blue-800 break-all">${order.order_number}</div>
                      </div>

                      <!-- Tracking ID -->
                      <div class="bg-cyan-50 rounded-lg p-3">
                        <div class="text-xs text-cyan-600 mb-1">TRACKING ID</div>
                        <div class="font-mono text-sm font-bold text-cyan-800 break-all">${order.tracking_id}</div>
                      </div>

                      <!-- Shipping Info -->
                      <div class="border-t pt-3">
                        <div class="flex items-center justify-between text-sm">
                          <span class="text-gray-600">
                            <i class="fas fa-truck mr-1"></i>
                            Shipping:
                          </span>
                          <span class="font-semibold text-orange-600">${order.shipping_status}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm mt-2">
                          <span class="text-gray-600">
                            <i class="fas fa-calendar mr-1"></i>
                            Pickup:
                          </span>
                          <span class="font-semibold text-blue-600">Monday, Jan 27</span>
                        </div>
                      </div>

                      <!-- Actions -->
                      <div class="flex gap-2 pt-3 border-t">
                        <a href="/track-order?tracking=${order.tracking_id}" 
                           class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg text-sm font-semibold transition-all">
                          <i class="fas fa-search-location mr-1"></i>
                          Track
                        </a>
                        <button onclick="copyCredentials(this)"
                                class="copy-btn flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg text-sm font-semibold transition-all">
                          <i class="fas fa-copy mr-1"></i>
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
            </div>
          </div>

          <!-- Download Section -->
          <div class="max-w-7xl mx-auto mt-8">
            <div class="bg-white rounded-xl shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                <i class="fas fa-download mr-2"></i>
                Download Options
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/FLYQ_Orders_Export_2026-01-24.xlsx" download 
                   class="bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg font-semibold transition-all">
                  <i class="fas fa-file-excel mr-2"></i>
                  Download Excel Report
                </a>
                <button onclick="printCredentials()" 
                        class="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-all">
                  <i class="fas fa-print mr-2"></i>
                  Print All Credentials
                </button>
                <button onclick="copyAllCredentials()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold transition-all">
                  <i class="fas fa-copy mr-2"></i>
                  Copy All Credentials
                </button>
              </div>
            </div>
          </div>
        </div>

        <script>
          let customerData = {};

          // Load customer data with passwords
          fetch('/static/customer-import-data.json')
            .then(res => res.json())
            .then(data => {
              customerData = data.customersWithEmail.reduce((acc, c) => {
                acc[c.email] = c;
                return acc;
              }, {});
              
              // Update password fields
              document.querySelectorAll('[data-email]').forEach(card => {
                const email = card.getAttribute('data-email');
                const customer = customerData[email];
                const passwordField = card.querySelector('.password-field');
                
                if (customer && passwordField) {
                  passwordField.textContent = customer.password;
                }
              });
            });

          function copyCredentials(button) {
            const card = button.closest('[data-email]');
            const email = card.getAttribute('data-email');
            const customer = customerData[email];
            
            if (customer) {
              const text = 'Email: ' + email + '\\nPassword: ' + customer.password + '\\nLogin: https://abf76357.flyq-air.pages.dev/login';
              navigator.clipboard.writeText(text).then(() => {
                button.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
                setTimeout(() => {
                  button.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
                }, 2000);
              });
            }
          }

          function copyAllCredentials() {
            // This would copy all credentials
            alert('Feature coming soon!');
          }

          function printCredentials() {
            window.print();
          }
        </script>
      </body>
      </html>
    `)
  } catch (error: any) {
    return c.html(`<h1>Error</h1><p>${error.message}</p>`)
  }
})

export default customerPortalRouter
