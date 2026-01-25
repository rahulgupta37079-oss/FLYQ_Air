import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'

type Bindings = {
  DB: D1Database
}

const customerProfileRouter = new Hono<{ Bindings: Bindings }>()

// Helper to get current user
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

// Profile Page
customerProfileRouter.get('/account/profile', async (c) => {
  const user = await getCurrentUser(c)
  
  if (!user) {
    return c.redirect('/login?redirect=/account/profile')
  }

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Profile | FLYQ Drones</title>
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
            <i class="fas fa-user-circle mr-3"></i>
            My Profile
          </h1>
          <p class="text-blue-100 text-lg mt-2">Manage your personal information</p>
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
                <a href="/account/orders" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold">
                  <i class="fas fa-shopping-bag w-6"></i>Orders
                </a>
                <a href="/account/profile" class="flex items-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-semibold">
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

          <!-- Profile Form -->
          <div class="md:col-span-3">
            <div id="alert" class="mb-6 hidden">
              <div class="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div class="flex items-center">
                  <i class="fas fa-check-circle text-green-600 text-2xl mr-3"></i>
                  <p id="alert-message" class="text-green-800 font-semibold"></p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8">
              <h2 class="text-2xl font-bold mb-6">Personal Information</h2>
              
              <form id="profileForm" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="name" value="${user.name || ''}" 
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" value="${user.email || ''}" disabled
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed">
                    <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" id="phone" value="${user.phone || ''}" 
                         class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                         placeholder="+91 1234567890">
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Shipping Address</label>
                  <textarea id="address" rows="3" 
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your complete shipping address">${user.address || ''}</textarea>
                </div>

                <div class="grid md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input type="text" id="city" value="${user.city || ''}" 
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                           placeholder="City">
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">State</label>
                    <input type="text" id="state" value="${user.state || ''}" 
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                           placeholder="State">
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                    <input type="text" id="pincode" value="${user.pincode || ''}" 
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                           placeholder="000000">
                  </div>
                </div>

                <div class="flex gap-4 pt-6">
                  <button type="submit" 
                          class="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition">
                    <i class="fas fa-save mr-2"></i>Save Changes
                  </button>
                  <button type="button" onclick="window.location.reload()" 
                          class="px-8 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition">
                    <i class="fas fa-undo mr-2"></i>Reset
                  </button>
                </div>
              </form>
            </div>

            <!-- Password Change -->
            <div class="bg-white rounded-xl shadow-lg p-8 mt-8">
              <h2 class="text-2xl font-bold mb-6">Change Password</h2>
              
              <form id="passwordForm" class="space-y-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                  <input type="password" id="currentPassword" 
                         class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <input type="password" id="newPassword" 
                         class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <p class="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <input type="password" id="confirmPassword" 
                         class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>

                <button type="submit" 
                        class="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition">
                  <i class="fas fa-key mr-2"></i>Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Profile Form
        document.getElementById('profileForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value
          };

          try {
            const response = await fetch('/api/account/update-profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.success) {
              showAlert('Profile updated successfully!');
            } else {
              alert('Error: ' + data.message);
            }
          } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update profile');
          }
        });

        // Password Form
        document.getElementById('passwordForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const newPassword = document.getElementById('newPassword').value;
          const confirmPassword = document.getElementById('confirmPassword').value;

          if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
          }

          if (newPassword.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
          }

          const formData = {
            currentPassword: document.getElementById('currentPassword').value,
            newPassword: newPassword
          };

          try {
            const response = await fetch('/api/account/change-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.success) {
              showAlert('Password updated successfully!');
              document.getElementById('passwordForm').reset();
            } else {
              alert('Error: ' + data.message);
            }
          } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update password');
          }
        });

        function showAlert(message) {
          const alert = document.getElementById('alert');
          const alertMessage = document.getElementById('alert-message');
          alertMessage.textContent = message;
          alert.classList.remove('hidden');
          setTimeout(() => alert.classList.add('hidden'), 5000);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      </script>
    </body>
    </html>
  `)
})

// API: Update Profile
customerProfileRouter.post('/api/account/update-profile', async (c) => {
  const user = await getCurrentUser(c)
  
  if (!user) {
    return c.json({ success: false, message: 'Not authenticated' }, 401)
  }

  try {
    const body = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE users 
      SET name = ?, phone = ?, address = ?, city = ?, state = ?, pincode = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(
      body.name,
      body.phone,
      body.address,
      body.city,
      body.state,
      body.pincode,
      user.id
    ).run()

    // Log profile edit for admin
    await c.env.DB.prepare(`
      INSERT INTO user_activity_log (user_id, activity_type, details, created_at)
      VALUES (?, 'profile_update', ?, datetime('now'))
    `).bind(user.id, JSON.stringify({ fields: Object.keys(body) })).run().catch(() => {})

    return c.json({ success: true, message: 'Profile updated successfully' })
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500)
  }
})

// API: Change Password
customerProfileRouter.post('/api/account/change-password', async (c) => {
  const user = await getCurrentUser(c)
  
  if (!user) {
    return c.json({ success: false, message: 'Not authenticated' }, 401)
  }

  try {
    const body = await c.req.json()
    const bcrypt = require('bcryptjs')
    
    // Verify current password
    const isValid = await bcrypt.compare(body.currentPassword, user.password_hash)
    if (!isValid) {
      return c.json({ success: false, message: 'Current password is incorrect' }, 400)
    }

    // Hash new password
    const newHash = await bcrypt.hash(body.newPassword, 10)
    
    await c.env.DB.prepare(`
      UPDATE users 
      SET password_hash = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(newHash, user.id).run()

    // Log password change
    await c.env.DB.prepare(`
      INSERT INTO user_activity_log (user_id, activity_type, details, created_at)
      VALUES (?, 'password_change', '{}', datetime('now'))
    `).bind(user.id).run().catch(() => {})

    return c.json({ success: true, message: 'Password updated successfully' })
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500)
  }
})

export default customerProfileRouter
