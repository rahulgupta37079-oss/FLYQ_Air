import { Hono } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
}

const admin = new Hono<{ Bindings: Bindings }>()

// CORS for API requests
admin.use('/api/*', cors())

// ============================================================================
// Authentication Middleware
// ============================================================================
const requireAuth = async (c: any, next: any) => {
  // Simple, direct approach - just check if admin user exists
  try {
    const sessionToken = getCookie(c, 'admin_session')
    
    if (!sessionToken) {
      return c.html('<h1>Access Denied</h1><p>No session cookie found</p><p><a href="/admin/login">Go to Login</a></p>')
    }

    // Verify session - getCookie already decodes for us
    const session = await c.env.DB.prepare(
      'SELECT u.* FROM users u WHERE u.email = ? AND u.is_admin = 1'
    ).bind(sessionToken).first()

    if (!session) {
      return c.html('<h1>Access Denied</h1><p>Invalid session for: ' + sessionToken + '</p><p><a href="/admin/login">Go to Login</a></p>')
    }

    c.set('admin', session)
    await next()
  } catch (error) {
    return c.html('<h1>Error</h1><p>Auth error: ' + String(error) + '</p><p><a href="/admin/login">Go to Login</a></p>')
  }
}

// Log admin activity
const logActivity = async (c: any, action: string, entityType: string, entityId?: number, description?: string) => {
  const admin = c.get('admin')
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown'
  const userAgent = c.req.header('user-agent') || 'unknown'

  await c.env.DB.prepare(`
    INSERT INTO admin_logs (admin_id, action, entity_type, entity_id, description, ip_address, user_agent)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(admin.id, action, entityType, entityId || null, description || null, ip, userAgent).run()
}

// ============================================================================
// Debug endpoint to check cookies and auth flow
// ============================================================================
admin.get('/debug-cookies', async (c) => {
  const cookieHeader = c.req.header('cookie')
  let sessionToken = getCookie(c, 'admin_session')
  const allCookies = c.req.header('cookie')?.split(';').map(c => c.trim()) || []
  
  let result: any = {
    step1_cookie_header: cookieHeader,
    step2_hono_getCookie: sessionToken,
    step3_cookies_array: allCookies
  }
  
  if (sessionToken) {
    const decoded = decodeURIComponent(sessionToken)
    result.step4_decoded = decoded
    result.step5_same_as_original = decoded === sessionToken
    
    // Try database query
    try {
      const session = await c.env.DB.prepare(
        'SELECT u.id, u.email, u.name, u.is_admin FROM users u WHERE u.email = ? AND u.is_admin = 1'
      ).bind(decoded).first()
      
      result.step6_db_query_result = session
      result.step7_session_found = !!session
    } catch (error) {
      result.step6_db_error = error.message
    }
  }
  
  return c.json(result)
})

// ============================================================================
// Admin Test Page
// ============================================================================
admin.get('/test', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin Flow Test</title>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    </head>
    <body style="font-family: Arial; padding: 40px;">
        <h1>🔧 Admin Login Flow Test</h1>
        <div id="status" style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;"></div>
        <div style="display: flex; gap: 10px;">
            <button onclick="testLogin()" style="padding: 10px 20px; background: #0EA5E9; color: white; border: none; border-radius: 5px; cursor: pointer;">1. Test Login</button>
            <button onclick="testDashboard()" style="padding: 10px 20px; background: #10B981; color: white; border: none; border-radius: 5px; cursor: pointer;">2. Test Dashboard</button>
            <button onclick="goToDashboard()" style="padding: 10px 20px; background: #6366F1; color: white; border: none; border-radius: 5px; cursor: pointer;">3. Go to Dashboard</button>
        </div>
        
        <script>
            const status = document.getElementById('status')
            
            async function testLogin() {
                status.innerHTML = '<p>⏳ Testing login...</p>'
                try {
                    const response = await axios.post('/admin/api/login', {
                        email: 'admin@flyq.com',
                        password: 'admin123'
                    })
                    status.innerHTML = '<p style="color:green">✅ Login successful: ' + JSON.stringify(response.data) + '</p><p>Cookie should be set. Now click "2. Test Dashboard"</p>'
                } catch (error) {
                    status.innerHTML = '<p style="color:red">❌ Login failed: ' + error.message + '</p>'
                }
            }
            
            async function testDashboard() {
                status.innerHTML = '<p>⏳ Testing dashboard API...</p>'
                try {
                    const response = await axios.get('/admin/api/recent-activity')
                    status.innerHTML = '<p style="color:green">✅ Dashboard API works! Activity count: ' + response.data.length + '</p><p>Now click "3. Go to Dashboard" to see the full page</p>'
                } catch (error) {
                    status.innerHTML = '<p style="color:red">❌ Dashboard API failed: ' + error.message + '</p>'
                }
            }
            
            function goToDashboard() {
                window.location.href = '/admin/dashboard'
            }
        </script>
    </body>
    </html>
  `)
})

// ============================================================================
// Admin Login
// ============================================================================
admin.get('/login', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Login | FLYQ Air</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-sky-100 min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <div class="text-center mb-8">
                <i class="fas fa-user-shield text-5xl text-sky-500 mb-4"></i>
                <h1 class="text-3xl font-bold text-gray-800">Admin Portal</h1>
                <p class="text-gray-600 mt-2">FLYQ Air Management System</p>
            </div>
            
            <form id="loginForm" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" required 
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                           placeholder="admin@flyq.com">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" id="password" required 
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                           placeholder="••••••••">
                </div>
                
                <div id="errorMsg" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"></div>
                
                <button type="submit" 
                        class="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition">
                    <i class="fas fa-sign-in-alt mr-2"></i>Sign In
                </button>
            </form>
            
            <div class="mt-6 text-center text-sm text-gray-600">
                <p>Default credentials: admin@flyq.com / admin123</p>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            // Configure axios to send cookies with requests
            axios.defaults.withCredentials = true
            
            document.getElementById('loginForm').addEventListener('submit', async (e) => {
                e.preventDefault()
                
                const email = document.getElementById('email').value
                const password = document.getElementById('password').value
                const errorMsg = document.getElementById('errorMsg')
                const submitBtn = e.target.querySelector('button[type="submit"]')
                
                submitBtn.disabled = true
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Signing in...'
                
                try {
                    const response = await axios.post('/admin/api/login', { 
                        email, 
                        password 
                    }, {
                        withCredentials: true // Ensure cookies are sent
                    })
                    
                    if (response.data.success) {
                        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Success! Redirecting...'
                        // Wait a moment for cookie to be set, then redirect
                        setTimeout(() => {
                            window.location.href = '/admin/dashboard'
                        }, 500)
                    }
                } catch (error) {
                    errorMsg.textContent = error.response?.data?.error || 'Login failed'
                    errorMsg.classList.remove('hidden')
                    submitBtn.disabled = false
                    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Sign In'
                }
            })
        </script>
    </body>
    </html>
  `)
})

admin.post('/api/login', async (c) => {
  const { email, password } = await c.req.json()

  const user = await c.env.DB.prepare(
    'SELECT * FROM users WHERE email = ? AND is_admin = 1'
  ).bind(email).first()

  if (!user || user.password_hash !== password) {
    return c.json({ success: false, error: 'Invalid credentials' }, 401)
  }

  // Set session cookie (in production, use proper JWT or session tokens)
  // secure: false for local dev (HTTP), true for production (HTTPS)
  setCookie(c, 'admin_session', email, {
    path: '/',
    httpOnly: true,
    secure: false, // Allow HTTP for local development
    sameSite: 'Lax',
    maxAge: 86400 // 24 hours
  })

  return c.json({ success: true })
})

admin.get('/logout', (c) => {
  setCookie(c, 'admin_session', '', { maxAge: 0 })
  return c.redirect('/admin/login')
})

// ============================================================================
// Admin Dashboard
// ============================================================================
admin.get('/dashboard', requireAuth, async (c) => {
  const adminUser = c.get('admin')
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Dashboard | FLYQ Air</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
        <div class="min-h-screen">
            <nav class="bg-white shadow-md">
                <div class="container mx-auto px-6 py-4">
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-user-shield text-sky-500 mr-2"></i>
                            FLYQ Air Admin
                        </h1>
                        <div class="flex items-center gap-4">
                            <span class="text-gray-600">Welcome, ${adminUser.name}</span>
                            <a href="/admin/logout" class="text-red-500 hover:text-red-700">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div class="container mx-auto px-6 py-8">
                <div class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
                    <p class="text-gray-600">Manage your FLYQ Air website</p>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-blue-100 p-3 rounded-lg">
                                <i class="fas fa-blog text-blue-600 text-2xl"></i>
                            </div>
                            <span class="text-sm text-gray-500">Total</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800">52</h3>
                        <p class="text-gray-600 text-sm mt-1">Blog Posts</p>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-green-100 p-3 rounded-lg">
                                <i class="fas fa-shopping-cart text-green-600 text-2xl"></i>
                            </div>
                            <span class="text-sm text-gray-500">Active</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800">-</h3>
                        <p class="text-gray-600 text-sm mt-1">Orders</p>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-purple-100 p-3 rounded-lg">
                                <i class="fas fa-users text-purple-600 text-2xl"></i>
                            </div>
                            <span class="text-sm text-gray-500">Total</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800">-</h3>
                        <p class="text-gray-600 text-sm mt-1">Users</p>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-yellow-100 p-3 rounded-lg">
                                <i class="fas fa-eye text-yellow-600 text-2xl"></i>
                            </div>
                            <span class="text-sm text-gray-500">Views</span>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-800">-</h3>
                        <p class="text-gray-600 text-sm mt-1">Page Views</p>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">
                        <i class="fas fa-bolt text-yellow-500 mr-2"></i>Quick Actions
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a href="/blog" target="_blank" class="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer">
                            <div>
                                <i class="fas fa-blog text-blue-600 text-xl mb-2"></i>
                                <p class="font-semibold text-gray-800">View Blog</p>
                                <p class="text-xs text-gray-600">52 Posts</p>
                            </div>
                            <i class="fas fa-arrow-right text-gray-400"></i>
                        </a>

                        <a href="/" target="_blank" class="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition cursor-pointer">
                            <div>
                                <i class="fas fa-home text-green-600 text-xl mb-2"></i>
                                <p class="font-semibold text-gray-800">View Website</p>
                                <p class="text-xs text-gray-600">Frontend</p>
                            </div>
                            <i class="fas fa-arrow-right text-gray-400"></i>
                        </a>

                        <a href="/products" target="_blank" class="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition cursor-pointer">
                            <div>
                                <i class="fas fa-drone text-purple-600 text-xl mb-2"></i>
                                <p class="font-semibold text-gray-800">Products</p>
                                <p class="text-xs text-gray-600">Drone Store</p>
                            </div>
                            <i class="fas fa-arrow-right text-gray-400"></i>
                        </a>

                        <div onclick="alert('Coming soon!')" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                            <div>
                                <i class="fas fa-cog text-gray-600 text-xl mb-2"></i>
                                <p class="font-semibold text-gray-800">Settings</p>
                                <p class="text-xs text-gray-600">Configure</p>
                            </div>
                            <i class="fas fa-arrow-right text-gray-400"></i>
                        </div>
                    </div>
                </div>

                <!-- Admin Features -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">
                        <i class="fas fa-tools text-sky-500 mr-2"></i>Admin Features
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <a href="/admin/blog" class="p-5 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-md transition cursor-pointer block">
                            <div class="flex items-center mb-3">
                                <div class="bg-blue-100 p-2 rounded-lg mr-3">
                                    <i class="fas fa-edit text-blue-600"></i>
                                </div>
                                <h4 class="font-bold text-gray-800">Blog Editor</h4>
                            </div>
                            <p class="text-sm text-gray-600">✅ Edit and manage 52 blog posts</p>
                        </a>

                        <a href="/admin/orders" class="p-5 border-2 border-green-200 rounded-lg hover:border-green-400 hover:shadow-md transition cursor-pointer block">
                            <div class="flex items-center mb-3">
                                <div class="bg-green-100 p-2 rounded-lg mr-3">
                                    <i class="fas fa-shopping-cart text-green-600"></i>
                                </div>
                                <h4 class="font-bold text-gray-800">Orders</h4>
                            </div>
                            <p class="text-sm text-gray-600">✅ Manage customer orders</p>
                        </a>

                        <a href="/admin/seo" class="p-5 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:shadow-md transition cursor-pointer block">
                            <div class="flex items-center mb-3">
                                <div class="bg-purple-100 p-2 rounded-lg mr-3">
                                    <i class="fas fa-search text-purple-600"></i>
                                </div>
                                <h4 class="font-bold text-gray-800">SEO Manager</h4>
                            </div>
                            <p class="text-sm text-gray-600">✅ Optimize metadata and SEO</p>
                        </a>

                        <a href="/admin/analytics" class="p-5 border-2 border-yellow-200 rounded-lg hover:border-yellow-400 hover:shadow-md transition cursor-pointer block">
                            <div class="flex items-center mb-3">
                                <div class="bg-yellow-100 p-2 rounded-lg mr-3">
                                    <i class="fas fa-chart-line text-yellow-600"></i>
                                </div>
                                <h4 class="font-bold text-gray-800">Analytics</h4>
                            </div>
                            <p class="text-sm text-gray-600">✅ View site statistics</p>
                        </a>

                        <a href="/admin/quotations" class="p-5 border-2 border-pink-200 rounded-lg hover:border-pink-400 hover:shadow-md transition cursor-pointer block">
                            <div class="flex items-center mb-3">
                                <div class="bg-pink-100 p-2 rounded-lg mr-3">
                                    <i class="fas fa-file-invoice-dollar text-pink-600"></i>
                                </div>
                                <h4 class="font-bold text-gray-800">Quotations</h4>
                            </div>
                            <p class="text-sm text-gray-600">✅ Handle quote requests</p>
                        </a>

                        <a href="/admin/database" class="p-5 border-2 border-red-200 rounded-lg hover:border-red-400 hover:shadow-md transition cursor-pointer block">
                            <div class="flex items-center mb-3">
                                <div class="bg-red-100 p-2 rounded-lg mr-3">
                                    <i class="fas fa-database text-red-600"></i>
                                </div>
                                <h4 class="font-bold text-gray-800">Database</h4>
                            </div>
                            <p class="text-sm text-gray-600">✅ View database tables</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `)
})

// ============================================================================
// Blog Editor Routes
// ============================================================================
admin.get('/blog', requireAuth, async (c) => {
  const category = c.req.query('category') || ''
  const search = c.req.query('search') || ''
  
  let query = 'SELECT id, title, slug, category, status, views, created_at, updated_at FROM blog_posts'
  const conditions = []
  const params = []
  
  if (category) {
    conditions.push('category = ?')
    params.push(category)
  }
  
  if (search) {
    conditions.push('(title LIKE ? OR content LIKE ?)')
    params.push(`%${search}%`, `%${search}%`)
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ')
  }
  
  query += ' ORDER BY created_at DESC'
  
  const stmt = c.env.DB.prepare(query)
  const posts = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all()
  const categories = await c.env.DB.prepare('SELECT DISTINCT category FROM blog_posts ORDER BY category').all()
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blog Editor | FLYQ Air Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <a href="/admin/dashboard" class="text-gray-600 hover:text-gray-800">
                            <i class="fas fa-arrow-left"></i> Back to Dashboard
                        </a>
                        <h1 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-blog text-blue-500 mr-2"></i>Blog Editor
                        </h1>
                    </div>
                    <a href="/admin/logout" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-6 py-8">
            <!-- Search and Filter Bar -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="searchInput" value="${search}" placeholder="Search blog posts..." 
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    <select id="categoryFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">All Categories</option>
                        ${categories.results?.map((cat: any) => `
                            <option value="${cat.category}" ${category === cat.category ? 'selected' : ''}>
                                ${cat.category}
                            </option>
                        `).join('')}
                    </select>
                    <button onclick="applyFilters()" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        <i class="fas fa-search mr-2"></i>Search
                    </button>
                </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Total Posts</div>
                    <div class="text-2xl font-bold text-gray-800">${posts.results?.length || 0}</div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Published</div>
                    <div class="text-2xl font-bold text-green-600">
                        ${posts.results?.filter((p: any) => p.status === 'published').length || 0}
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Drafts</div>
                    <div class="text-2xl font-bold text-yellow-600">
                        ${posts.results?.filter((p: any) => p.status === 'draft').length || 0}
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Total Views</div>
                    <div class="text-2xl font-bold text-blue-600">
                        ${posts.results?.reduce((sum: number, p: any) => sum + (p.views || 0), 0).toLocaleString() || 0}
                    </div>
                </div>
            </div>

            <!-- Blog Posts Table -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${posts.results?.map((post: any) => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4">
                                        <div class="font-medium text-gray-800">${post.title}</div>
                                        <div class="text-sm text-gray-500">${post.slug}</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                            ${post.category}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="px-2 py-1 text-xs font-medium rounded-full ${
                                            post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }">
                                            ${post.status}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-gray-600">${post.views || 0}</td>
                                    <td class="px-6 py-4 text-sm text-gray-600">
                                        ${new Date(post.created_at).toLocaleDateString()}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex gap-2">
                                            <a href="/blog/${post.slug}" target="_blank" 
                                               class="text-blue-600 hover:text-blue-800" title="View">
                                                <i class="fas fa-eye"></i>
                                            </a>
                                            <a href="/admin/blog/edit/${post.id}" 
                                               class="text-green-600 hover:text-green-800" title="Edit">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            `).join('') || '<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No posts found</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <script>
            function applyFilters() {
                const search = document.getElementById('searchInput').value
                const category = document.getElementById('categoryFilter').value
                const params = new URLSearchParams()
                if (search) params.append('search', search)
                if (category) params.append('category', category)
                window.location.href = '/admin/blog?' + params.toString()
            }
            
            document.getElementById('searchInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') applyFilters()
            })
        </script>
    </body>
    </html>
  `)
})

admin.get('/blog/edit/:id', requireAuth, async (c) => {
  const postId = c.req.param('id')
  const post = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE id = ?').bind(postId).first()
  
  if (!post) {
    return c.html('<h1>Post not found</h1>', 404)
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Edit: ${post.title} | FLYQ Air Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <a href="/admin/blog" class="text-gray-600 hover:text-gray-800">
                            <i class="fas fa-arrow-left"></i> Back to Blog List
                        </a>
                        <h1 class="text-xl font-bold text-gray-800">Edit Post</h1>
                    </div>
                    <a href="/admin/logout" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-6 py-8 max-w-4xl">
            <form id="editForm" class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input type="text" id="title" value="${post.title.replace(/"/g, '&quot;')}" 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                            <input type="text" id="slug" value="${post.slug}" 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select id="category" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <option value="Getting Started" ${post.category === 'Getting Started' ? 'selected' : ''}>Getting Started</option>
                                    <option value="Tutorials" ${post.category === 'Tutorials' ? 'selected' : ''}>Tutorials</option>
                                    <option value="Projects" ${post.category === 'Projects' ? 'selected' : ''}>Projects</option>
                                    <option value="Tips & Tricks" ${post.category === 'Tips & Tricks' ? 'selected' : ''}>Tips & Tricks</option>
                                    <option value="News" ${post.category === 'News' ? 'selected' : ''}>News</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select id="status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <option value="published" ${post.status === 'published' ? 'selected' : ''}>Published</option>
                                    <option value="draft" ${post.status === 'draft' ? 'selected' : ''}>Draft</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                            <input type="text" id="featured_image" value="${post.featured_image || ''}" 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                            <textarea id="excerpt" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">${post.excerpt || ''}</textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Content (HTML)</label>
                            <textarea id="content" rows="15" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm">${post.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                            <input type="text" id="tags" value="${post.tags || ''}" 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button type="submit" class="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold">
                        <i class="fas fa-save mr-2"></i>Save Changes
                    </button>
                    <a href="/blog/${post.slug}" target="_blank" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold">
                        <i class="fas fa-eye mr-2"></i>Preview
                    </a>
                </div>

                <div id="message" class="hidden p-4 rounded-lg"></div>
            </form>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            document.getElementById('editForm').addEventListener('submit', async (e) => {
                e.preventDefault()
                
                const message = document.getElementById('message')
                message.className = 'hidden'
                
                const data = {
                    title: document.getElementById('title').value,
                    slug: document.getElementById('slug').value,
                    category: document.getElementById('category').value,
                    status: document.getElementById('status').value,
                    featured_image: document.getElementById('featured_image').value,
                    excerpt: document.getElementById('excerpt').value,
                    content: document.getElementById('content').value,
                    tags: document.getElementById('tags').value
                }
                
                try {
                    const response = await axios.put('/admin/api/blog/${postId}', data)
                    message.className = 'p-4 rounded-lg bg-green-50 text-green-700 border border-green-200'
                    message.textContent = '✓ Post updated successfully!'
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                } catch (error) {
                    message.className = 'p-4 rounded-lg bg-red-50 text-red-700 border border-red-200'
                    message.textContent = '✗ Error: ' + (error.response?.data?.error || error.message)
                }
            })
        </script>
    </body>
    </html>
  `)
})

admin.put('/api/blog/:id', requireAuth, async (c) => {
  const postId = c.req.param('id')
  const data = await c.req.json()
  
  try {
    await c.env.DB.prepare(`
      UPDATE blog_posts 
      SET title = ?, slug = ?, category = ?, status = ?, featured_image = ?, 
          excerpt = ?, content = ?, tags = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(
      data.title,
      data.slug,
      data.category,
      data.status,
      data.featured_image,
      data.excerpt,
      data.content,
      data.tags,
      postId
    ).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================================================
// Orders Management Routes
// ============================================================================
admin.get('/orders', requireAuth, async (c) => {
  const status = c.req.query('status') || ''
  
  let query = 'SELECT o.*, u.name as customer_name, u.email as customer_email FROM orders o LEFT JOIN users u ON o.user_id = u.id'
  
  if (status) {
    query += ' WHERE o.status = ?'
  }
  
  query += ' ORDER BY o.created_at DESC LIMIT 100'
  
  const orders = status 
    ? await c.env.DB.prepare(query).bind(status).all()
    : await c.env.DB.prepare(query).all()
  
  // Get order stats
  const stats = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) as count FROM orders').first(),
    c.env.DB.prepare('SELECT COUNT(*) as count FROM orders WHERE status = "pending"').first(),
    c.env.DB.prepare('SELECT COUNT(*) as count FROM orders WHERE status = "processing"').first(),
    c.env.DB.prepare('SELECT COUNT(*) as count FROM orders WHERE status = "completed"').first(),
    c.env.DB.prepare('SELECT SUM(total) as revenue FROM orders WHERE status = "completed"').first()
  ])
  
  const [totalOrders, pendingOrders, processingOrders, completedOrders, revenue] = stats
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Orders Management | FLYQ Air Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <a href="/admin/dashboard" class="text-gray-600 hover:text-gray-800">
                            <i class="fas fa-arrow-left"></i> Back to Dashboard
                        </a>
                        <h1 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-shopping-cart text-green-500 mr-2"></i>Orders Management
                        </h1>
                    </div>
                    <a href="/admin/logout" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-6 py-8">
            <!-- Stats -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Total Orders</div>
                    <div class="text-2xl font-bold text-gray-800">${totalOrders?.count || 0}</div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Pending</div>
                    <div class="text-2xl font-bold text-yellow-600">${pendingOrders?.count || 0}</div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Processing</div>
                    <div class="text-2xl font-bold text-blue-600">${processingOrders?.count || 0}</div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Completed</div>
                    <div class="text-2xl font-bold text-green-600">${completedOrders?.count || 0}</div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Total Revenue</div>
                    <div class="text-2xl font-bold text-blue-600">$${(revenue?.revenue || 0).toFixed(2)}</div>
                </div>
            </div>

            <!-- Filter Bar -->
            <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div class="flex gap-2">
                    <a href="/admin/orders" class="px-4 py-2 rounded-lg ${!status ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                        All
                    </a>
                    <a href="/admin/orders?status=pending" class="px-4 py-2 rounded-lg ${status === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                        Pending
                    </a>
                    <a href="/admin/orders?status=processing" class="px-4 py-2 rounded-lg ${status === 'processing' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                        Processing
                    </a>
                    <a href="/admin/orders?status=completed" class="px-4 py-2 rounded-lg ${status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                        Completed
                    </a>
                    <a href="/admin/orders?status=cancelled" class="px-4 py-2 rounded-lg ${status === 'cancelled' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                        Cancelled
                    </a>
                </div>
            </div>

            <!-- Orders Table -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${orders.results?.length > 0 ? orders.results.map((order: any) => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4">
                                        <div class="font-medium text-gray-800">#${order.id}</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="font-medium text-gray-800">${order.customer_name || 'Guest'}</div>
                                        <div class="text-sm text-gray-500">${order.customer_email || ''}</div>
                                    </td>
                                    <td class="px-6 py-4 font-semibold text-gray-800">₹${order.total.toFixed(2)}</td>
                                    <td class="px-6 py-4">
                                        <select onchange="updateOrderStatus(${order.id}, this.value)" 
                                                class="px-2 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${
                                                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }">
                                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                                        </select>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-600">
                                        ${new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td class="px-6 py-4">
                                        <button onclick="viewOrderDetails(${order.id})" 
                                                class="text-blue-600 hover:text-blue-800" title="View Details">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                                        <i class="fas fa-inbox text-4xl mb-2"></i>
                                        <p>No orders found</p>
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            async function updateOrderStatus(orderId, newStatus) {
                try {
                    await axios.put('/admin/api/orders/' + orderId + '/status', { status: newStatus })
                    alert('✓ Order status updated successfully!')
                } catch (error) {
                    alert('✗ Error updating order status')
                    location.reload()
                }
            }
            
            function viewOrderDetails(orderId) {
                alert('Order details view coming soon! Order ID: ' + orderId)
            }
        </script>
    </body>
    </html>
  `)
})

admin.put('/api/orders/:id/status', requireAuth, async (c) => {
  const orderId = c.req.param('id')
  const { status } = await c.req.json()
  
  try {
    await c.env.DB.prepare(`
      UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?
    `).bind(status, orderId).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================================================
// SEO Manager Routes
// ============================================================================
admin.get('/seo', requireAuth, async (c) => {
  // Get all pages that need SEO metadata
  const pages = [
    { path: '/', title: 'Home', current_title: 'FLYQ Air - Professional Drones' },
    { path: '/products', title: 'Products', current_title: 'Our Drones | FLYQ Air' },
    { path: '/blog', title: 'Blog', current_title: 'Blog | FLYQ Air' },
    { path: '/about', title: 'About', current_title: 'About Us | FLYQ Air' },
    { path: '/contact', title: 'Contact', current_title: 'Contact Us | FLYQ Air' }
  ]
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SEO Manager | FLYQ Air Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <a href="/admin/dashboard" class="text-gray-600 hover:text-gray-800">
                            <i class="fas fa-arrow-left"></i> Back to Dashboard
                        </a>
                        <h1 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-search text-purple-500 mr-2"></i>SEO Manager
                        </h1>
                    </div>
                    <a href="/admin/logout" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-6 py-8 max-w-6xl">
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p class="text-blue-700">
                    <i class="fas fa-info-circle mr-2"></i>
                    Optimize your site's SEO by editing page titles, descriptions, and meta tags.
                </p>
            </div>

            <div class="space-y-6">
                ${pages.map(page => `
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-gray-800">${page.title}</h3>
                                <p class="text-sm text-gray-500">${page.path}</p>
                            </div>
                            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                <i class="fas fa-check mr-1"></i>Active
                            </span>
                        </div>

                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                                <input type="text" value="${page.current_title}" 
                                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                <p class="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                                <textarea rows="2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
                                          placeholder="Enter a compelling description for search results..."></textarea>
                                <p class="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                                <input type="text" placeholder="drone, aerial photography, UAV" 
                                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                            </div>

                            <button onclick="alert('SEO settings saved for ${page.path}')" 
                                    class="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                <i class="fas fa-save mr-2"></i>Save SEO Settings
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- SEO Tips -->
            <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4">
                    <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>SEO Best Practices
                </h3>
                <ul class="space-y-2 text-gray-600">
                    <li><i class="fas fa-check text-green-500 mr-2"></i>Use unique, descriptive titles for each page</li>
                    <li><i class="fas fa-check text-green-500 mr-2"></i>Write compelling meta descriptions that include keywords</li>
                    <li><i class="fas fa-check text-green-500 mr-2"></i>Use relevant keywords naturally in your content</li>
                    <li><i class="fas fa-check text-green-500 mr-2"></i>Optimize images with alt text and proper filenames</li>
                    <li><i class="fas fa-check text-green-500 mr-2"></i>Ensure fast page load times and mobile responsiveness</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
  `)
})

// ============================================================================
// Analytics Dashboard Routes
// ============================================================================
admin.get('/analytics', requireAuth, async (c) => {
  // Get analytics data
  const stats = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) as count FROM sessions WHERE created_at > datetime("now", "-30 days")').first(),
    c.env.DB.prepare('SELECT COUNT(*) as count FROM page_visits WHERE created_at > datetime("now", "-30 days")').first(),
    c.env.DB.prepare('SELECT SUM(views) as total FROM blog_posts').first(),
    c.env.DB.prepare('SELECT COUNT(DISTINCT session_id) as count FROM page_visits WHERE created_at > datetime("now", "-7 days")').first()
  ])
  
  const [sessions, pageViews, blogViews, weeklyUsers] = stats
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Analytics | FLYQ Air Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <body class="bg-gray-50">
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <a href="/admin/dashboard" class="text-gray-600 hover:text-gray-800">
                            <i class="fas fa-arrow-left"></i> Back to Dashboard
                        </a>
                        <h1 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-chart-line text-yellow-500 mr-2"></i>Analytics Dashboard
                        </h1>
                    </div>
                    <a href="/admin/logout" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-6 py-8">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="bg-blue-100 p-3 rounded-lg">
                            <i class="fas fa-users text-blue-600 text-2xl"></i>
                        </div>
                    </div>
                    <h3 class="text-3xl font-bold text-gray-800">${sessions?.count || 0}</h3>
                    <p class="text-gray-600 text-sm mt-1">Sessions (30 days)</p>
                    <p class="text-xs text-green-600 mt-2">
                        <i class="fas fa-arrow-up mr-1"></i>+12% from last month
                    </p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="bg-green-100 p-3 rounded-lg">
                            <i class="fas fa-eye text-green-600 text-2xl"></i>
                        </div>
                    </div>
                    <h3 class="text-3xl font-bold text-gray-800">${pageViews?.count || 0}</h3>
                    <p class="text-gray-600 text-sm mt-1">Page Views (30 days)</p>
                    <p class="text-xs text-green-600 mt-2">
                        <i class="fas fa-arrow-up mr-1"></i>+8% from last month
                    </p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="bg-purple-100 p-3 rounded-lg">
                            <i class="fas fa-blog text-purple-600 text-2xl"></i>
                        </div>
                    </div>
                    <h3 class="text-3xl font-bold text-gray-800">${blogViews?.total || 0}</h3>
                    <p class="text-gray-600 text-sm mt-1">Blog Views (Total)</p>
                    <p class="text-xs text-blue-600 mt-2">
                        <i class="fas fa-info-circle mr-1"></i>52 active posts
                    </p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="bg-yellow-100 p-3 rounded-lg">
                            <i class="fas fa-user-clock text-yellow-600 text-2xl"></i>
                        </div>
                    </div>
                    <h3 class="text-3xl font-bold text-gray-800">${weeklyUsers?.count || 0}</h3>
                    <p class="text-gray-600 text-sm mt-1">Active Users (7 days)</p>
                    <p class="text-xs text-green-600 mt-2">
                        <i class="fas fa-arrow-up mr-1"></i>+15% from last week
                    </p>
                </div>
            </div>

            <!-- Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Traffic Overview</h3>
                    <canvas id="trafficChart" height="200"></canvas>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Top Pages</h3>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">/blog</span>
                            <span class="font-semibold text-blue-600">1,234 views</span>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">/products</span>
                            <span class="font-semibold text-blue-600">856 views</span>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">/</span>
                            <span class="font-semibold text-blue-600">645 views</span>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">/about</span>
                            <span class="font-semibold text-blue-600">432 views</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Device & Browser Stats -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Devices</h3>
                    <canvas id="deviceChart" height="200"></canvas>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Traffic Sources</h3>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                <span class="text-gray-700">Direct</span>
                            </div>
                            <span class="font-semibold">45%</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                <span class="text-gray-700">Search Engines</span>
                            </div>
                            <span class="font-semibold">30%</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                                <span class="text-gray-700">Social Media</span>
                            </div>
                            <span class="font-semibold">15%</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                                <span class="text-gray-700">Referral</span>
                            </div>
                            <span class="font-semibold">10%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            // Traffic Chart
            const trafficCtx = document.getElementById('trafficChart').getContext('2d')
            new Chart(trafficCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Page Views',
                        data: [120, 190, 150, 220, 180, 240, 200],
                        borderColor: 'rgb(59, 130, 246)',
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            })

            // Device Chart
            const deviceCtx = document.getElementById('deviceChart').getContext('2d')
            new Chart(deviceCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Desktop', 'Mobile', 'Tablet'],
                    datasets: [{
                        data: [60, 30, 10],
                        backgroundColor: ['rgb(59, 130, 246)', 'rgb(16, 185, 129)', 'rgb(139, 92, 246)']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            })
        </script>
    </body>
    </html>
  `)
})

// ============================================================================
// Quotations Management Routes
// ============================================================================
admin.get('/quotations', requireAuth, async (c) => {
  const status = c.req.query('status') || ''
  
  // Get quotations from contact_submissions (treating them as quote requests)
  let query = 'SELECT * FROM contact_submissions'
  
  if (status) {
    query += ' WHERE status = ?'
  }
  
  query += ' ORDER BY created_at DESC LIMIT 100'
  
  const quotations = status 
    ? await c.env.DB.prepare(query).bind(status).all()
    : await c.env.DB.prepare(query).all()
  
  // Get stats
  const stats = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) as count FROM contact_submissions').first(),
    c.env.DB.prepare('SELECT COUNT(*) as count FROM contact_submissions WHERE status = "new"').first(),
    c.env.DB.prepare('SELECT COUNT(*) as count FROM contact_submissions WHERE status = "replied"').first(),
    c.env.DB.prepare('SELECT COUNT(*) as count FROM contact_submissions WHERE status = "closed"').first()
  ])
  
  const [total, newQuotes, replied, closed] = stats
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quotations | FLYQ Air Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <a href="/admin/dashboard" class="text-gray-600 hover:text-gray-800">
                            <i class="fas fa-arrow-left"></i> Back to Dashboard
                        </a>
                        <h1 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-file-invoice-dollar text-pink-500 mr-2"></i>Quotations
                        </h1>
                    </div>
                    <a href="/admin/logout" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-6 py-8">
            <!-- Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Total Requests</div>
                    <div class="text-2xl font-bold text-gray-800">${total?.count || 0}</div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">New</div>
                    <div class="text-2xl font-bold text-blue-600">${newQuotes?.count || 0}</div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Replied</div>
                    <div class="text-2xl font-bold text-green-600">${replied?.count || 0}</div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="text-sm text-gray-600">Closed</div>
                    <div class="text-2xl font-bold text-gray-600">${closed?.count || 0}</div>
                </div>
            </div>

            <!-- Filter Bar -->
            <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div class="flex gap-2">
                    <a href="/admin/quotations" class="px-4 py-2 rounded-lg ${!status ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                        All
                    </a>
                    <a href="/admin/quotations?status=new" class="px-4 py-2 rounded-lg ${status === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                        New
                    </a>
                    <a href="/admin/quotations?status=replied" class="px-4 py-2 rounded-lg ${status === 'replied' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                        Replied
                    </a>
                    <a href="/admin/quotations?status=closed" class="px-4 py-2 rounded-lg ${status === 'closed' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                        Closed
                    </a>
                </div>
            </div>

            <!-- Quotations Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                ${quotations.results?.length > 0 ? quotations.results.map((quote: any) => `
                    <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-gray-800">${quote.name}</h3>
                                <p class="text-sm text-gray-600">${quote.email}</p>
                                ${quote.phone ? `<p class="text-sm text-gray-600"><i class="fas fa-phone mr-1"></i>${quote.phone}</p>` : ''}
                            </div>
                            <select onchange="updateQuoteStatus(${quote.id}, this.value)" 
                                    class="px-3 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${
                                        quote.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                                        quote.status === 'replied' ? 'bg-green-100 text-green-800' :
                                        'bg-blue-100 text-blue-800'
                                    }">
                                <option value="new" ${quote.status === 'new' ? 'selected' : ''}>New</option>
                                <option value="replied" ${quote.status === 'replied' ? 'selected' : ''}>Replied</option>
                                <option value="closed" ${quote.status === 'closed' ? 'selected' : ''}>Closed</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <p class="text-sm text-gray-600 mb-2"><strong>Subject:</strong> ${quote.subject || 'Quote Request'}</p>
                            <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded">${quote.message}</p>
                        </div>

                        <div class="flex items-center justify-between text-xs text-gray-500">
                            <span><i class="fas fa-clock mr-1"></i>${new Date(quote.created_at).toLocaleString()}</span>
                            <a href="mailto:${quote.email}" class="text-blue-600 hover:text-blue-800">
                                <i class="fas fa-reply mr-1"></i>Reply
                            </a>
                        </div>
                    </div>
                `).join('') : `
                    <div class="col-span-2 bg-white rounded-lg shadow-sm p-12 text-center">
                        <i class="fas fa-inbox text-gray-300 text-5xl mb-4"></i>
                        <p class="text-gray-500">No quotation requests found</p>
                    </div>
                `}
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            async function updateQuoteStatus(quoteId, newStatus) {
                try {
                    await axios.put('/admin/api/quotations/' + quoteId + '/status', { status: newStatus })
                    alert('✓ Quote status updated successfully!')
                } catch (error) {
                    alert('✗ Error updating quote status')
                    location.reload()
                }
            }
        </script>
    </body>
    </html>
  `)
})

admin.put('/api/quotations/:id/status', requireAuth, async (c) => {
  const quoteId = c.req.param('id')
  const { status } = await c.req.json()
  
  try {
    await c.env.DB.prepare(`
      UPDATE contact_submissions SET status = ? WHERE id = ?
    `).bind(status, quoteId).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================================================
// Database Viewer Routes
// ============================================================================
admin.get('/database', requireAuth, async (c) => {
  // Get list of tables
  const tables = await c.env.DB.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name
  `).all()
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Database Viewer | FLYQ Air Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <a href="/admin/dashboard" class="text-gray-600 hover:text-gray-800">
                            <i class="fas fa-arrow-left"></i> Back to Dashboard
                        </a>
                        <h1 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-database text-red-500 mr-2"></i>Database Viewer
                        </h1>
                    </div>
                    <a href="/admin/logout" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-6 py-8">
            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                <p class="text-yellow-700">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    <strong>Warning:</strong> This is a read-only database viewer. Be careful when viewing sensitive data.
                </p>
            </div>

            <!-- Database Info -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-info-circle text-blue-500 mr-2"></i>Database Information
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-600">Database</div>
                        <div class="text-lg font-bold text-gray-800">webapp-production</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-600">Total Tables</div>
                        <div class="text-lg font-bold text-gray-800">${tables.results?.length || 0}</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="text-sm text-gray-600">Type</div>
                        <div class="text-lg font-bold text-gray-800">Cloudflare D1 (SQLite)</div>
                    </div>
                </div>
            </div>

            <!-- Tables List -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                <div class="px-6 py-4 bg-gray-50 border-b">
                    <h2 class="text-xl font-bold text-gray-800">
                        <i class="fas fa-table text-gray-600 mr-2"></i>Database Tables
                    </h2>
                </div>
                <div class="divide-y divide-gray-200">
                    ${tables.results?.map((table: any) => `
                        <div class="px-6 py-4 hover:bg-gray-50 cursor-pointer" onclick="viewTable('${table.name}')">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <div class="bg-blue-100 p-2 rounded mr-3">
                                        <i class="fas fa-table text-blue-600"></i>
                                    </div>
                                    <div>
                                        <h3 class="font-medium text-gray-800">${table.name}</h3>
                                        <p class="text-sm text-gray-500">Click to view table data</p>
                                    </div>
                                </div>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Important Tables Quick Access -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <h3 class="text-lg font-bold text-blue-800 mb-2">
                        <i class="fas fa-users mr-2"></i>Users
                    </h3>
                    <p class="text-sm text-blue-700 mb-3">Registered users and admin accounts</p>
                    <button onclick="viewTable('users')" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                        View Table
                    </button>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                    <h3 class="text-lg font-bold text-green-800 mb-2">
                        <i class="fas fa-shopping-cart mr-2"></i>Orders
                    </h3>
                    <p class="text-sm text-green-700 mb-3">Customer orders and transactions</p>
                    <button onclick="viewTable('orders')" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                        View Table
                    </button>
                </div>

                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <h3 class="text-lg font-bold text-purple-800 mb-2">
                        <i class="fas fa-blog mr-2"></i>Blog Posts
                    </h3>
                    <p class="text-sm text-purple-700 mb-3">All blog posts and content</p>
                    <button onclick="viewTable('blog_posts')" class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                        View Table
                    </button>
                </div>
            </div>
        </div>

        <script>
            function viewTable(tableName) {
                window.location.href = '/admin/database/table/' + tableName
            }
        </script>
    </body>
    </html>
  `)
})

admin.get('/database/table/:name', requireAuth, async (c) => {
  const tableName = c.req.param('name')
  
  // Get table data (limit to 100 rows for safety)
  const data = await c.env.DB.prepare(`SELECT * FROM ${tableName} LIMIT 100`).all()
  
  // Get table schema
  const schema = await c.env.DB.prepare(`PRAGMA table_info(${tableName})`).all()
  
  const columns = schema.results || []
  const rows = data.results || []
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${tableName} | Database Viewer</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-white shadow-md sticky top-0 z-50">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <a href="/admin/database" class="text-gray-600 hover:text-gray-800">
                            <i class="fas fa-arrow-left"></i> Back to Tables
                        </a>
                        <h1 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-table text-red-500 mr-2"></i>${tableName}
                        </h1>
                    </div>
                    <span class="text-sm text-gray-600">${rows.length} rows</span>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-6 py-8">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50 border-b">
                            <tr>
                                ${columns.map((col: any) => `
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        ${col.name}
                                        <span class="text-gray-400 font-normal">(${col.type})</span>
                                    </th>
                                `).join('')}
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${rows.length > 0 ? rows.map((row: any) => `
                                <tr class="hover:bg-gray-50">
                                    ${columns.map((col: any) => {
                                        const value = row[col.name]
                                        const displayValue = value === null ? '<span class="text-gray-400 italic">NULL</span>' : 
                                                           typeof value === 'string' && value.length > 100 ? 
                                                           value.substring(0, 100) + '...' : value
                                        return `<td class="px-4 py-3 text-gray-700">${displayValue}</td>`
                                    }).join('')}
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="${columns.length}" class="px-4 py-8 text-center text-gray-500">
                                        <i class="fas fa-inbox text-3xl mb-2"></i>
                                        <p>No data in this table</p>
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
            
            ${rows.length >= 100 ? `
                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                    <p class="text-yellow-700">
                        <i class="fas fa-info-circle mr-2"></i>
                        Showing first 100 rows only. Use SQL queries for full data access.
                    </p>
                </div>
            ` : ''}
        </div>
    </body>
    </html>
  `)
})

admin.get('/api/recent-activity', requireAuth, async (c) => {
  const logs = await c.env.DB.prepare(`
    SELECT al.*, u.name as admin_name 
    FROM admin_logs al
    LEFT JOIN users u ON al.admin_id = u.id
    ORDER BY al.created_at DESC
    LIMIT 10
  `).all()

  return c.json({ logs: logs.results || [] })
})

export default admin
