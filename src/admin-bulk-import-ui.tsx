import { Hono } from 'hono'

const adminBulkImportUI = new Hono()

// Bulk Import UI Page
adminBulkImportUI.get('/bulk-import', (c) => {
  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bulk Import Customers | Admin</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
      <div class="min-h-screen">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-8 px-6">
          <div class="container mx-auto max-w-6xl">
            <h1 class="text-3xl font-bold mb-2">
              <i class="fas fa-upload mr-2"></i>
              Bulk Import Customers & Orders
            </h1>
            <p class="text-blue-100">Import Nov-Dec 2025 customer orders with automatic account creation and shipping</p>
          </div>
        </div>

        <div class="container mx-auto px-6 py-8 max-w-6xl">
          <!-- Import Summary Card -->
          <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Import Summary</h2>
                <p class="text-gray-600">Ready to import 63 customers from Nov-Dec 2025 orders</p>
              </div>
              <div class="text-right">
                <div class="text-4xl font-bold text-blue-600">63</div>
                <div class="text-sm text-gray-600">Customers Ready</div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <div class="text-sm text-blue-600 font-semibold mb-1">FLYQ Air (Pluto 1.2)</div>
                <div class="text-2xl font-bold text-blue-800">45 Orders</div>
                <div class="text-sm text-blue-700">₹4,999 each = ₹2,24,955</div>
              </div>
              
              <div class="bg-cyan-50 rounded-lg p-4 border-2 border-cyan-200">
                <div class="text-sm text-cyan-600 font-semibold mb-1">FLYQ Vision (Pluto X)</div>
                <div class="text-2xl font-bold text-cyan-800">18 Orders</div>
                <div class="text-sm text-cyan-700">₹8,999 each = ₹1,61,982</div>
              </div>
              
              <div class="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                <div class="text-sm text-green-600 font-semibold mb-1">Total Revenue</div>
                <div class="text-2xl font-bold text-green-800">₹3,86,937</div>
                <div class="text-sm text-green-700">63 Total Orders</div>
              </div>
            </div>
          </div>

          <!-- What Will Happen -->
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-8 mb-6 border-2 border-blue-200">
            <h3 class="text-xl font-bold text-blue-900 mb-4">
              <i class="fas fa-info-circle mr-2"></i>
              What Will Happen During Import?
            </h3>
            
            <div class="space-y-3">
              <div class="flex items-start">
                <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">1</div>
                <div>
                  <div class="font-semibold text-gray-800">Create User Accounts</div>
                  <div class="text-sm text-gray-600">63 user accounts will be created with secure passwords</div>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">2</div>
                <div>
                  <div class="font-semibold text-gray-800">Generate Paid Orders</div>
                  <div class="text-sm text-gray-600">63 orders marked as "paid" and "confirmed" with manual transaction IDs</div>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">3</div>
                <div>
                  <div class="font-semibold text-gray-800">Create Shipping IDs & Tracking Numbers</div>
                  <div class="text-sm text-gray-600">Automatic shipping ID (SHIP-XXX) and tracking number (TRKXXX) for each order</div>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">4</div>
                <div>
                  <div class="font-semibold text-gray-800">Schedule Monday Pickup</div>
                  <div class="text-sm text-gray-600">All orders will be scheduled for pickup on next Monday with estimated delivery dates</div>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">5</div>
                <div>
                  <div class="font-semibold text-gray-800">Send Confirmation Emails</div>
                  <div class="text-sm text-gray-600">Beautiful HTML emails with login details, order confirmation, and tracking information</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Import Button -->
          <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div class="text-center">
              <p class="text-gray-700 mb-6">Ready to import all 63 customers? This process will take 2-3 minutes.</p>
              
              <button 
                id="importBtn"
                class="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onclick="startImport()"
              >
                <i class="fas fa-upload mr-2"></i>
                Start Bulk Import
              </button>
              
              <div id="progressSection" class="hidden mt-6">
                <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div id="progressBar" class="bg-blue-600 h-4 rounded-full transition-all duration-300" style="width: 0%"></div>
                </div>
                <p id="progressText" class="text-gray-600 text-sm"></p>
              </div>
            </div>
          </div>

          <!-- Results Section -->
          <div id="resultsSection" class="hidden">
            <div class="bg-white rounded-xl shadow-lg p-8">
              <h3 class="text-2xl font-bold text-green-600 mb-4">
                <i class="fas fa-check-circle mr-2"></i>
                Import Complete!
              </h3>
              
              <div id="resultsContent"></div>
            </div>
          </div>
        </div>
      </div>

      <script>
        async function startImport() {
          const btn = document.getElementById('importBtn');
          const progressSection = document.getElementById('progressSection');
          const progressBar = document.getElementById('progressBar');
          const progressText = document.getElementById('progressText');
          const resultsSection = document.getElementById('resultsSection');
          const resultsContent = document.getElementById('resultsContent');

          btn.disabled = true;
          btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Importing...';
          progressSection.classList.remove('hidden');

          try {
            // Fetch customer data
            progressText.textContent = 'Loading customer data...';
            progressBar.style.width = '10%';

            const dataResponse = await fetch('/customer-import-data.json');
            const data = await dataResponse.json();

            progressText.textContent = 'Starting bulk import...';
            progressBar.style.width = '20%';

            // Start import
            const response = await fetch('/api/admin/bulk-import-customers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                customers: data.customersWithEmail,
                useOldPricing: true
              })
            });

            progressBar.style.width = '90%';
            progressText.textContent = 'Processing results...';

            const result = await response.json();

            progressBar.style.width = '100%';
            progressText.textContent = 'Complete!';

            // Show results
            setTimeout(() => {
              resultsSection.classList.remove('hidden');
              
              if (result.success) {
                resultsContent.innerHTML = \`
                  <div class="space-y-4">
                    <div class="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                      <h4 class="font-bold text-green-800 text-lg mb-3">Success Summary</h4>
                      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div class="text-2xl font-bold text-green-700">\${result.results.totalProcessed}</div>
                          <div class="text-sm text-green-600">Processed</div>
                        </div>
                        <div>
                          <div class="text-2xl font-bold text-blue-700">\${result.results.accountsCreated}</div>
                          <div class="text-sm text-blue-600">Accounts Created</div>
                        </div>
                        <div>
                          <div class="text-2xl font-bold text-purple-700">\${result.results.ordersCreated}</div>
                          <div class="text-sm text-purple-600">Orders Created</div>
                        </div>
                        <div>
                          <div class="text-2xl font-bold text-cyan-700">\${result.results.emailsSent}</div>
                          <div class="text-sm text-cyan-600">Emails Sent</div>
                        </div>
                      </div>
                    </div>

                    \${result.results.failed.length > 0 ? \`
                      <div class="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                        <h4 class="font-bold text-yellow-800 text-lg mb-3">
                          <i class="fas fa-exclamation-triangle mr-2"></i>
                          \${result.results.failed.length} Failed
                        </h4>
                        <div class="space-y-2 max-h-64 overflow-y-auto">
                          \${result.results.failed.map(f => \`
                            <div class="bg-white rounded p-3 border border-yellow-300">
                              <div class="font-semibold text-gray-800">\${f.email}</div>
                              <div class="text-sm text-gray-600">\${f.error}</div>
                            </div>
                          \`).join('')}
                        </div>
                      </div>
                    \` : ''}

                    <div class="flex gap-4">
                      <a href="/admin/orders" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all">
                        <i class="fas fa-box mr-2"></i>
                        View Orders
                      </a>
                      <a href="/admin/shipping/bulk" class="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all">
                        <i class="fas fa-shipping-fast mr-2"></i>
                        Manage Shipping
                      </a>
                    </div>
                  </div>
                \`;
              } else {
                resultsContent.innerHTML = \`
                  <div class="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <h4 class="font-bold text-red-800 text-lg mb-2">Import Failed</h4>
                    <p class="text-red-600">\${result.message}</p>
                  </div>
                \`;
              }
            }, 500);

          } catch (error) {
            console.error('Import error:', error);
            resultsSection.classList.remove('hidden');
            resultsContent.innerHTML = \`
              <div class="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h4 class="font-bold text-red-800 text-lg mb-2">Import Failed</h4>
                <p class="text-red-600">\${error.message}</p>
              </div>
            \`;
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-upload mr-2"></i> Start Bulk Import';
          }
        }
      </script>
    </body>
    </html>
  `;

  return c.html(content);
});

export default adminBulkImportUI
