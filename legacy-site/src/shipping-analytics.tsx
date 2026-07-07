import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

const analyticsShippingRouter = new Hono<{ Bindings: Bindings }>()

// Shipping Analytics Dashboard
analyticsShippingRouter.get('/analytics', async (c) => {
  // Get shipping statistics
  const stats = await c.env.DB.prepare(`
    SELECT 
      COUNT(*) as total_orders,
      COUNT(CASE WHEN shipping_id IS NOT NULL THEN 1 END) as orders_with_shipping,
      COUNT(CASE WHEN shipping_status = 'pending' THEN 1 END) as pending,
      COUNT(CASE WHEN shipping_status = 'picked_up' THEN 1 END) as picked_up,
      COUNT(CASE WHEN shipping_status = 'in_transit' THEN 1 END) as in_transit,
      COUNT(CASE WHEN shipping_status = 'delivered' THEN 1 END) as delivered,
      AVG(CASE 
        WHEN delivered_at IS NOT NULL AND shipped_at IS NOT NULL 
        THEN (julianday(delivered_at) - julianday(shipped_at)) 
      END) as avg_delivery_days
    FROM orders
    WHERE payment_status = 'paid'
  `).first()

  // Daily shipping volume (last 30 days)
  const dailyVolume = await c.env.DB.prepare(`
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as count
    FROM orders
    WHERE payment_status = 'paid'
    AND created_at >= DATE('now', '-30 days')
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `).all()

  // Carrier performance
  const carrierStats = await c.env.DB.prepare(`
    SELECT 
      shipping_carrier,
      COUNT(*) as shipments,
      COUNT(CASE WHEN shipping_status = 'delivered' THEN 1 END) as delivered,
      AVG(CASE 
        WHEN delivered_at IS NOT NULL AND shipped_at IS NOT NULL 
        THEN (julianday(delivered_at) - julianday(shipped_at)) 
      END) as avg_days
    FROM orders
    WHERE shipping_carrier IS NOT NULL
    GROUP BY shipping_carrier
  `).all()

  // Recent shipping activities
  const recentActivities = await c.env.DB.prepare(`
    SELECT 
      su.tracking_id,
      su.status,
      su.location,
      su.message,
      su.created_at,
      o.order_number
    FROM shipping_updates su
    JOIN orders o ON su.order_id = o.id
    ORDER BY su.created_at DESC
    LIMIT 20
  `).all()

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shipping Analytics | FLYQ Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          .gradient-bg { background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); }
        </style>
    </head>
    <body class="bg-gray-50">
        <nav class="gradient-bg text-white py-4 shadow-lg">
            <div class="container mx-auto px-4 flex items-center justify-between">
                <a href="/admin" class="text-2xl font-bold">
                    <i class="fas fa-chart-line mr-2"></i>FLYQ Admin - Shipping Analytics
                </a>
                <div class="flex gap-4">
                    <a href="/admin/shipping/bulk" class="hover:text-blue-200">
                        <i class="fas fa-shipping-fast mr-2"></i>Bulk Shipping
                    </a>
                    <a href="/admin" class="hover:text-blue-200">
                        <i class="fas fa-arrow-left mr-2"></i>Dashboard
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-4 py-8 max-w-7xl">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-blue-100 text-sm mb-2">Total Orders</p>
                            <p class="text-4xl font-bold">${stats?.total_orders || 0}</p>
                        </div>
                        <div class="bg-white bg-opacity-20 p-4 rounded-lg">
                            <i class="fas fa-shopping-cart text-3xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-green-100 text-sm mb-2">Delivered</p>
                            <p class="text-4xl font-bold">${stats?.delivered || 0}</p>
                            <p class="text-green-100 text-xs mt-1">${stats?.total_orders > 0 ? Math.round((stats?.delivered / stats?.total_orders) * 100) : 0}% success rate</p>
                        </div>
                        <div class="bg-white bg-opacity-20 p-4 rounded-lg">
                            <i class="fas fa-check-circle text-3xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-orange-100 text-sm mb-2">In Transit</p>
                            <p class="text-4xl font-bold">${(stats?.picked_up || 0) + (stats?.in_transit || 0)}</p>
                            <p class="text-orange-100 text-xs mt-1">Active shipments</p>
                        </div>
                        <div class="bg-white bg-opacity-20 p-4 rounded-lg">
                            <i class="fas fa-truck text-3xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-purple-100 text-sm mb-2">Avg Delivery Time</p>
                            <p class="text-4xl font-bold">${stats?.avg_delivery_days ? stats.avg_delivery_days.toFixed(1) : '0'}</p>
                            <p class="text-purple-100 text-xs mt-1">days</p>
                        </div>
                        <div class="bg-white bg-opacity-20 p-4 rounded-lg">
                            <i class="fas fa-clock text-3xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <!-- Shipping Volume Chart -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">
                        <i class="fas fa-chart-area text-sky-600 mr-2"></i>Shipping Volume (Last 30 Days)
                    </h3>
                    <canvas id="volumeChart" height="250"></canvas>
                </div>

                <!-- Status Distribution -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">
                        <i class="fas fa-chart-pie text-sky-600 mr-2"></i>Order Status Distribution
                    </h3>
                    <canvas id="statusChart" height="250"></canvas>
                </div>
            </div>

            <!-- Carrier Performance -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-shipping-fast text-sky-600 mr-2"></i>Carrier Performance
                </h3>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b">
                            <tr>
                                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Carrier</th>
                                <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Total Shipments</th>
                                <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Delivered</th>
                                <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Success Rate</th>
                                <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Avg Delivery Time</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${carrierStats?.results && carrierStats.results.length > 0 ? carrierStats.results.map((carrier: any) => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4">
                                        <span class="font-semibold text-gray-800">${carrier.shipping_carrier}</span>
                                    </td>
                                    <td class="px-6 py-4 text-center text-gray-700">${carrier.shipments}</td>
                                    <td class="px-6 py-4 text-center text-gray-700">${carrier.delivered}</td>
                                    <td class="px-6 py-4 text-center">
                                        <span class="px-3 py-1 rounded-full text-xs font-semibold ${(carrier.delivered / carrier.shipments) > 0.8 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                                            ${Math.round((carrier.delivered / carrier.shipments) * 100)}%
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-center text-gray-700">
                                        ${carrier.avg_days ? carrier.avg_days.toFixed(1) + ' days' : 'N/A'}
                                    </td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="5" class="px-6 py-8 text-center text-gray-500">No carrier data available</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Recent Activities -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-history text-sky-600 mr-2"></i>Recent Shipping Activities
                </h3>
                <div class="space-y-3 max-h-96 overflow-y-auto">
                    ${recentActivities?.results && recentActivities.results.length > 0 ? recentActivities.results.map((activity: any) => `
                        <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <div class="flex-shrink-0">
                                <div class="bg-sky-100 p-3 rounded-full">
                                    <i class="fas ${getActivityIcon(activity.status)} text-sky-600"></i>
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="font-semibold text-gray-800">${activity.order_number}</span>
                                    <span class="text-xs text-gray-500">${formatTimestamp(activity.created_at)}</span>
                                </div>
                                <p class="text-sm text-gray-700 mb-1">
                                    <span class="font-medium capitalize">${activity.status.replace('_', ' ')}</span>
                                    ${activity.location ? ` - ${activity.location}` : ''}
                                </p>
                                <p class="text-xs text-gray-600">${activity.message}</p>
                            </div>
                        </div>
                    `).join('') : `
                        <p class="text-center text-gray-500 py-8">No recent activities</p>
                    `}
                </div>
            </div>
        </div>

        <script>
            // Volume Chart
            const volumeCtx = document.getElementById('volumeChart').getContext('2d');
            const volumeData = ${JSON.stringify(dailyVolume?.results || [])};
            
            new Chart(volumeCtx, {
                type: 'line',
                data: {
                    labels: volumeData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
                    datasets: [{
                        label: 'Orders',
                        data: volumeData.map(d => d.count),
                        borderColor: '#0EA5E9',
                        backgroundColor: 'rgba(14, 165, 233, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 }
                        }
                    }
                }
            });

            // Status Chart
            const statusCtx = document.getElementById('statusChart').getContext('2d');
            const statusData = {
                pending: ${stats?.pending || 0},
                picked_up: ${stats?.picked_up || 0},
                in_transit: ${stats?.in_transit || 0},
                delivered: ${stats?.delivered || 0}
            };

            new Chart(statusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Pending', 'Picked Up', 'In Transit', 'Delivered'],
                    datasets: [{
                        data: Object.values(statusData),
                        backgroundColor: ['#FCD34D', '#60A5FA', '#F97316', '#10B981'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });

            function formatTimestamp(timestamp) {
                const date = new Date(timestamp);
                const now = new Date();
                const diffMs = now - date;
                const diffMins = Math.floor(diffMs / 60000);
                
                if (diffMins < 60) return \`\${diffMins} min ago\`;
                if (diffMins < 1440) return \`\${Math.floor(diffMins / 60)} hr ago\`;
                return date.toLocaleDateString();
            }
        </script>
    </body>
    </html>
  `)
})

function getActivityIcon(status: string): string {
  const icons: Record<string, string> = {
    'pending': 'fa-box',
    'picked_up': 'fa-truck-loading',
    'in_transit': 'fa-truck',
    'out_for_delivery': 'fa-shipping-fast',
    'delivered': 'fa-check-circle',
    'sms_sent': 'fa-sms'
  }
  return icons[status] || 'fa-info-circle'
}

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString()
}

export default analyticsShippingRouter
