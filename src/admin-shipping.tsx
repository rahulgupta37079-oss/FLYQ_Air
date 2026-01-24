import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

const adminShippingRouter = new Hono<{ Bindings: Bindings }>()

// Bulk Shipping Generation UI
adminShippingRouter.get('/shipping/bulk', async (c) => {
  // Get all paid orders without shipping
  const ordersResult = await c.env.DB.prepare(`
    SELECT 
      o.id,
      o.order_number,
      o.customer_name,
      o.customer_email,
      o.customer_phone,
      o.total,
      o.payment_status,
      o.shipping_id,
      o.tracking_id,
      o.created_at
    FROM orders o
    WHERE o.payment_status = 'paid'
    AND o.shipping_id IS NULL
    ORDER BY o.created_at DESC
    LIMIT 100
  `).all()

  const orders = ordersResult.results || []

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bulk Shipping Generation | FLYQ Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          .gradient-bg { background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); }
          .processing { animation: spin 1s linear infinite; }
          @keyframes spin { 100% { transform: rotate(360deg); } }
        </style>
    </head>
    <body class="bg-gray-50">
        <nav class="gradient-bg text-white py-4 shadow-lg">
            <div class="container mx-auto px-4 flex items-center justify-between">
                <a href="/admin" class="text-2xl font-bold">
                    <i class="fas fa-shipping-fast mr-2"></i>FLYQ Admin - Bulk Shipping
                </a>
                <a href="/admin" class="hover:text-blue-200">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Admin
                </a>
            </div>
        </nav>

        <div class="container mx-auto px-4 py-8 max-w-7xl">
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Pending Shipping</p>
                            <p class="text-3xl font-bold text-sky-600">${orders.length}</p>
                        </div>
                        <div class="bg-sky-100 p-3 rounded-lg">
                            <i class="fas fa-box text-sky-600 text-2xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Selected</p>
                            <p class="text-3xl font-bold text-blue-600" id="selectedCount">0</p>
                        </div>
                        <div class="bg-blue-100 p-3 rounded-lg">
                            <i class="fas fa-check-square text-blue-600 text-2xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Processed</p>
                            <p class="text-3xl font-bold text-green-600" id="processedCount">0</p>
                        </div>
                        <div class="bg-green-100 p-3 rounded-lg">
                            <i class="fas fa-check-circle text-green-600 text-2xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm">Failed</p>
                            <p class="text-3xl font-bold text-red-600" id="failedCount">0</p>
                        </div>
                        <div class="bg-red-100 p-3 rounded-lg">
                            <i class="fas fa-exclamation-circle text-red-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions Bar -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <button onclick="selectAll()" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                            <i class="fas fa-check-double mr-2"></i>Select All
                        </button>
                        <button onclick="deselectAll()" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                            <i class="fas fa-times mr-2"></i>Deselect All
                        </button>
                    </div>

                    <div class="flex items-center gap-4">
                        <button 
                            id="generateBtn"
                            onclick="generateBulkShipping()" 
                            class="gradient-bg text-white px-6 py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled
                        >
                            <i class="fas fa-shipping-fast mr-2"></i>Generate Shipping IDs
                        </button>
                        <button 
                            id="emailBtn"
                            onclick="sendBulkEmails()" 
                            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled
                        >
                            <i class="fas fa-envelope mr-2"></i>Send Emails
                        </button>
                        <button 
                            id="smsBtn"
                            onclick="sendBulkSMS()" 
                            class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled
                        >
                            <i class="fas fa-sms mr-2"></i>Send SMS
                        </button>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div id="progressBar" class="mt-4 hidden">
                    <div class="bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div id="progressFill" class="gradient-bg h-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                    <p id="progressText" class="text-sm text-gray-600 mt-2 text-center"></p>
                </div>
            </div>

            <!-- Orders Table -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="px-4 py-4 text-left">
                                <input type="checkbox" id="selectAllCheckbox" onchange="toggleAll(this)" class="w-5 h-5 rounded border-gray-300">
                            </th>
                            <th class="px-4 py-4 text-left text-sm font-semibold text-gray-700">Order</th>
                            <th class="px-4 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                            <th class="px-4 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                            <th class="px-4 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                            <th class="px-4 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th class="px-4 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${orders.length > 0 ? orders.map((order: any) => `
                            <tr class="hover:bg-gray-50 transition" id="row-${order.id}">
                                <td class="px-4 py-4">
                                    <input type="checkbox" value="${order.id}" class="order-checkbox w-5 h-5 rounded border-gray-300" onchange="updateSelection()">
                                </td>
                                <td class="px-4 py-4">
                                    <p class="font-mono font-semibold text-gray-800">${order.order_number}</p>
                                </td>
                                <td class="px-4 py-4">
                                    <p class="font-medium text-gray-800">${order.customer_name}</p>
                                    <p class="text-sm text-gray-500">${order.customer_email}</p>
                                </td>
                                <td class="px-4 py-4 text-sm text-gray-600">
                                    ${order.customer_phone || 'N/A'}
                                </td>
                                <td class="px-4 py-4 font-semibold text-gray-800">
                                    ₹${order.total.toFixed(2)}
                                </td>
                                <td class="px-4 py-4 text-sm text-gray-600">
                                    ${new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td class="px-4 py-4">
                                    <span id="status-${order.id}" class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                        Pending
                                    </span>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                                    <i class="fas fa-check-circle text-4xl mb-4 block text-green-500"></i>
                                    <p class="text-lg font-semibold">All caught up!</p>
                                    <p class="text-sm">No pending orders need shipping generation</p>
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>

            <!-- Results Panel -->
            <div id="resultsPanel" class="mt-6 hidden">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">
                        <i class="fas fa-clipboard-check mr-2 text-green-600"></i>Processing Results
                    </h3>
                    <div id="resultsContent" class="space-y-2 max-h-96 overflow-y-auto"></div>
                </div>
            </div>
        </div>

        <script>
            let selectedOrders = new Set();

            function updateSelection() {
                selectedOrders.clear();
                document.querySelectorAll('.order-checkbox:checked').forEach(cb => {
                    selectedOrders.add(cb.value);
                });
                
                document.getElementById('selectedCount').textContent = selectedOrders.size;
                document.getElementById('generateBtn').disabled = selectedOrders.size === 0;
                document.getElementById('emailBtn').disabled = selectedOrders.size === 0;
                document.getElementById('smsBtn').disabled = selectedOrders.size === 0;
            }

            function toggleAll(checkbox) {
                document.querySelectorAll('.order-checkbox').forEach(cb => {
                    cb.checked = checkbox.checked;
                });
                updateSelection();
            }

            function selectAll() {
                document.querySelectorAll('.order-checkbox').forEach(cb => cb.checked = true);
                document.getElementById('selectAllCheckbox').checked = true;
                updateSelection();
            }

            function deselectAll() {
                document.querySelectorAll('.order-checkbox').forEach(cb => cb.checked = false);
                document.getElementById('selectAllCheckbox').checked = false;
                updateSelection();
            }

            async function generateBulkShipping() {
                if (selectedOrders.size === 0) return;
                
                const btn = document.getElementById('generateBtn');
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
                
                showProgress();
                clearResults();
                
                let processed = 0;
                let failed = 0;
                
                for (const orderId of selectedOrders) {
                    try {
                        const response = await fetch(\`/api/admin/orders/\${orderId}/generate-shipping\`, {
                            method: 'POST'
                        });
                        const data = await response.json();
                        
                        if (data.success) {
                            processed++;
                            updateOrderStatus(orderId, 'success', data.tracking_id);
                            addResult(orderId, 'success', \`Generated: \${data.tracking_id}\`);
                        } else {
                            failed++;
                            updateOrderStatus(orderId, 'error', data.error);
                            addResult(orderId, 'error', data.error);
                        }
                    } catch (error) {
                        failed++;
                        updateOrderStatus(orderId, 'error', error.message);
                        addResult(orderId, 'error', error.message);
                    }
                    
                    updateProgress((processed + failed), selectedOrders.size);
                }
                
                document.getElementById('processedCount').textContent = processed;
                document.getElementById('failedCount').textContent = failed;
                
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-shipping-fast mr-2"></i>Generate Shipping IDs';
                
                setTimeout(() => hideProgress(), 2000);
            }

            async function sendBulkEmails() {
                if (selectedOrders.size === 0) return;
                
                const btn = document.getElementById('emailBtn');
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                
                showProgress();
                clearResults();
                
                let sent = 0;
                let failed = 0;
                
                for (const orderId of selectedOrders) {
                    try {
                        const response = await fetch(\`/api/admin/orders/\${orderId}/send-tracking-email\`, {
                            method: 'POST'
                        });
                        const data = await response.json();
                        
                        if (data.success) {
                            sent++;
                            addResult(orderId, 'success', 'Email sent');
                        } else {
                            failed++;
                            addResult(orderId, 'error', data.error);
                        }
                    } catch (error) {
                        failed++;
                        addResult(orderId, 'error', error.message);
                    }
                    
                    updateProgress((sent + failed), selectedOrders.size);
                }
                
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-envelope mr-2"></i>Send Emails';
                
                alert(\`Emails sent: \${sent}, Failed: \${failed}\`);
                setTimeout(() => hideProgress(), 2000);
            }

            async function sendBulkSMS() {
                if (selectedOrders.size === 0) return;
                
                const btn = document.getElementById('smsBtn');
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                
                showProgress();
                clearResults();
                
                let sent = 0;
                let failed = 0;
                
                for (const orderId of selectedOrders) {
                    try {
                        const response = await fetch(\`/api/admin/orders/\${orderId}/send-tracking-sms\`, {
                            method: 'POST'
                        });
                        const data = await response.json();
                        
                        if (data.success) {
                            sent++;
                            addResult(orderId, 'success', 'SMS sent');
                        } else {
                            failed++;
                            addResult(orderId, 'error', data.error);
                        }
                    } catch (error) {
                        failed++;
                        addResult(orderId, 'error', error.message);
                    }
                    
                    updateProgress((sent + failed), selectedOrders.size);
                }
                
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-sms mr-2"></i>Send SMS';
                
                alert(\`SMS sent: \${sent}, Failed: \${failed}\`);
                setTimeout(() => hideProgress(), 2000);
            }

            function showProgress() {
                document.getElementById('progressBar').classList.remove('hidden');
                document.getElementById('resultsPanel').classList.remove('hidden');
            }

            function hideProgress() {
                document.getElementById('progressBar').classList.add('hidden');
            }

            function updateProgress(current, total) {
                const percent = Math.round((current / total) * 100);
                document.getElementById('progressFill').style.width = percent + '%';
                document.getElementById('progressText').textContent = \`Processing \${current} of \${total} orders...\`;
            }

            function updateOrderStatus(orderId, status, message) {
                const statusEl = document.getElementById(\`status-\${orderId}\`);
                if (status === 'success') {
                    statusEl.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800';
                    statusEl.textContent = 'Generated';
                } else {
                    statusEl.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800';
                    statusEl.textContent = 'Failed';
                }
            }

            function clearResults() {
                document.getElementById('resultsContent').innerHTML = '';
                document.getElementById('processedCount').textContent = '0';
                document.getElementById('failedCount').textContent = '0';
            }

            function addResult(orderId, type, message) {
                const resultsContent = document.getElementById('resultsContent');
                const icon = type === 'success' ? 'fa-check-circle text-green-600' : 'fa-exclamation-circle text-red-600';
                const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
                
                const resultItem = document.createElement('div');
                resultItem.className = \`flex items-start gap-3 p-3 rounded-lg \${bgColor}\`;
                resultItem.innerHTML = \`
                    <i class="fas \${icon} mt-1"></i>
                    <div class="flex-1">
                        <p class="font-semibold text-sm">Order #\${orderId}</p>
                        <p class="text-xs text-gray-600">\${message}</p>
                    </div>
                \`;
                resultsContent.appendChild(resultItem);
            }
        </script>
    </body>
    </html>
  `)
})

export default adminShippingRouter
