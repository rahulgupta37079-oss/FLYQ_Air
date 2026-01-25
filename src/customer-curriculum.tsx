import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'

type Bindings = {
  DB: D1Database
}

const customerCurriculumRouter = new Hono<{ Bindings: Bindings }>()

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

// Curriculum Page
customerCurriculumRouter.get('/account/curriculum', async (c) => {
  const user = await getCurrentUser(c)
  
  if (!user) {
    return c.redirect('/login?redirect=/account/curriculum')
  }

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Learning Resources | FLYQ Drones</title>
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
            <i class="fas fa-graduation-cap mr-3"></i>
            Learning Resources
          </h1>
          <p class="text-blue-100 text-lg mt-2">Master your FLYQ Drone with our comprehensive curriculum</p>
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
                <a href="/account/profile" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold">
                  <i class="fas fa-user w-6"></i>Profile
                </a>
                <a href="/account/curriculum" class="flex items-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-semibold">
                  <i class="fas fa-graduation-cap w-6"></i>Curriculum
                </a>
                <a href="/" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold">
                  <i class="fas fa-home w-6"></i>Home
                </a>
              </nav>
            </div>
          </div>

          <!-- Curriculum Content -->
          <div class="md:col-span-3 space-y-8">
            <!-- Getting Started -->
            <div class="bg-white rounded-xl shadow-lg p-8">
              <div class="flex items-center mb-6">
                <div class="bg-blue-100 rounded-full p-4 mr-4">
                  <i class="fas fa-rocket text-blue-600 text-2xl"></i>
                </div>
                <div>
                  <h2 class="text-2xl font-bold">Getting Started</h2>
                  <p class="text-gray-600">Essential guides to begin your journey</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <a href="/resources/unboxing-guide" class="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition">
                  <i class="fas fa-box-open text-blue-600 text-xl mb-2"></i>
                  <h3 class="font-bold mb-1">Unboxing & Setup</h3>
                  <p class="text-sm text-gray-600">Learn how to set up your drone</p>
                </a>

                <a href="/resources/first-flight" class="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition">
                  <i class="fas fa-plane-departure text-green-600 text-xl mb-2"></i>
                  <h3 class="font-bold mb-1">First Flight Guide</h3>
                  <p class="text-sm text-gray-600">Safety tips and flight basics</p>
                </a>

                <a href="/resources/wifi-setup" class="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition">
                  <i class="fas fa-wifi text-purple-600 text-xl mb-2"></i>
                  <h3 class="font-bold mb-1">Wi-Fi Connection</h3>
                  <p class="text-sm text-gray-600">Connect to your smartphone</p>
                </a>

                <a href="/resources/troubleshooting" class="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition">
                  <i class="fas fa-tools text-orange-600 text-xl mb-2"></i>
                  <h3 class="font-bold mb-1">Troubleshooting</h3>
                  <p class="text-sm text-gray-600">Common issues and solutions</p>
                </a>
              </div>
            </div>

            <!-- Programming -->
            <div class="bg-white rounded-xl shadow-lg p-8">
              <div class="flex items-center mb-6">
                <div class="bg-green-100 rounded-full p-4 mr-4">
                  <i class="fas fa-code text-green-600 text-2xl"></i>
                </div>
                <div>
                  <h2 class="text-2xl font-bold">Programming</h2>
                  <p class="text-gray-600">Learn to code your drone</p>
                </div>
              </div>

              <div class="space-y-4">
                <a href="/resources/python-basics" class="block border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:shadow-lg transition">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="font-bold text-lg mb-1">Python Programming</h3>
                      <p class="text-sm text-gray-600">Control your drone with Python</p>
                    </div>
                    <i class="fab fa-python text-4xl text-yellow-600"></i>
                  </div>
                </a>

                <a href="/resources/arduino-basics" class="block border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:shadow-lg transition">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="font-bold text-lg mb-1">Arduino IDE</h3>
                      <p class="text-sm text-gray-600">Program using Arduino framework</p>
                    </div>
                    <i class="fas fa-microchip text-4xl text-blue-600"></i>
                  </div>
                </a>

                <a href="/resources/api-reference" class="block border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:shadow-lg transition">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="font-bold text-lg mb-1">API Reference</h3>
                      <p class="text-sm text-gray-600">Complete API documentation</p>
                    </div>
                    <i class="fas fa-book text-4xl text-purple-600"></i>
                  </div>
                </a>
              </div>
            </div>

            <!-- Video Tutorials -->
            <div class="bg-white rounded-xl shadow-lg p-8">
              <div class="flex items-center mb-6">
                <div class="bg-red-100 rounded-full p-4 mr-4">
                  <i class="fas fa-play-circle text-red-600 text-2xl"></i>
                </div>
                <div>
                  <h2 class="text-2xl font-bold">Video Tutorials</h2>
                  <p class="text-gray-600">Watch and learn</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-red-500 hover:shadow-lg transition cursor-pointer">
                  <div class="bg-gray-200 rounded-lg mb-3 h-32 flex items-center justify-center">
                    <i class="fas fa-video text-4xl text-gray-400"></i>
                  </div>
                  <h3 class="font-bold mb-1">Assembly Tutorial</h3>
                  <p class="text-sm text-gray-600">15 min video guide</p>
                </div>

                <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-red-500 hover:shadow-lg transition cursor-pointer">
                  <div class="bg-gray-200 rounded-lg mb-3 h-32 flex items-center justify-center">
                    <i class="fas fa-video text-4xl text-gray-400"></i>
                  </div>
                  <h3 class="font-bold mb-1">Programming Basics</h3>
                  <p class="text-sm text-gray-600">20 min tutorial</p>
                </div>
              </div>
            </div>

            <!-- Community -->
            <div class="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-lg p-8 text-white">
              <h2 class="text-3xl font-bold mb-4">
                <i class="fas fa-users mr-2"></i>Join Our Community
              </h2>
              <p class="text-purple-100 mb-6">Connect with other FLYQ pilots, share your projects, and get help from experts!</p>
              <div class="flex gap-4">
                <a href="https://wa.me/919137361474" target="_blank" class="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                  <i class="fab fa-whatsapp mr-2"></i>WhatsApp Support
                </a>
                <a href="mailto:info@passion3dworld.com" class="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
                  <i class="fas fa-envelope mr-2"></i>Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `)
})

export default customerCurriculumRouter
