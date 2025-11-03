import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Product data (will move to D1 later)
const products = [
  {
    id: 1,
    name: 'FLYQ Air',
    slug: 'flyq-air',
    price: 4999,
    image: 'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
    shortDesc: 'ESP32-S3 powered programmable drone with Wi-Fi control',
    features: ['ESP32-S3 Dual-Core', 'Wi-Fi Control', 'Open Source', '24-pin GPIO', 'Python/Arduino SDK'],
    stock: 50
  },
  {
    id: 2,
    name: 'FLYQ Vision',
    slug: 'flyq-vision',
    price: 7999,
    image: 'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
    shortDesc: 'ESP32-S3 camera drone with HD video streaming',
    features: ['ESP32-S3 Dual-Core', 'HD 720p Camera', 'Gesture Control', 'Wi-Fi Streaming', 'Python/Arduino SDK'],
    stock: 30
  }
]

// Helper function to render base HTML with shared styles
const renderPage = (title: string, content: string, includeCart: boolean = true) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} | FLYQ Drones</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Inter:wght@300;400;600;700;800&display=swap');
            
            :root {
                --sky-blue: #0EA5E9;
                --light-blue: #38BDF8;
                --dark-blue: #0284C7;
            }
            
            body {
                font-family: 'Inter', sans-serif;
            }
            
            h1, h2, h3, h4 {
                font-family: 'Rajdhani', sans-serif;
            }
            
            .gradient-text {
                background: linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%);
                transition: all 0.3s ease;
            }
            
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4);
            }
            
            .product-card {
                transition: all 0.3s ease;
                border: 2px solid rgba(14, 165, 233, 0.2);
            }
            
            .product-card:hover {
                transform: translateY(-8px);
                border-color: rgba(14, 165, 233, 0.6);
                box-shadow: 0 20px 40px rgba(14, 165, 233, 0.3);
            }
            
            .float-animation {
                animation: float 4s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            .cart-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                background: #EF4444;
                color: white;
                border-radius: 9999px;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            }
            
            /* Additional styles for original content sections */
            :root {
                --midnight: #0F172A;
                --silver: #E5E7EB;
                --black: #000000;
                --white: #FFFFFF;
            }
            
            .silver-text {
                color: var(--silver);
            }
            
            .card-hover {
                transition: all 0.3s ease;
                border: 2px solid rgba(14, 165, 233, 0.2);
                background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%);
            }
            
            .card-hover:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(14, 165, 233, 0.3);
                border-color: rgba(14, 165, 233, 0.6);
            }
            
            .section-divider {
                height: 4px;
                background: linear-gradient(90deg, transparent, var(--sky-blue), transparent);
            }
            
            .bg-midnight {
                background-color: var(--midnight);
            }
            
            .bg-black {
                background-color: var(--black);
            }
            
            .text-sky-400 {
                color: #38BDF8;
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="fixed w-full z-50 bg-white shadow-md">
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <a href="/" class="flex items-center space-x-3">
                        <i class="fas fa-drone text-sky-500 text-3xl"></i>
                        <span class="text-3xl font-black gradient-text">FLYQ</span>
                    </a>
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="/" class="text-gray-700 hover:text-sky-500 font-semibold">Home</a>
                        <a href="/products" class="text-gray-700 hover:text-sky-500 font-semibold">Products</a>
                        <a href="/curriculum" class="text-gray-700 hover:text-sky-500 font-semibold">Curriculum</a>
                        <a href="/docs" class="text-gray-700 hover:text-sky-500 font-semibold">Docs</a>
                        <a href="/about" class="text-gray-700 hover:text-sky-500 font-semibold">About</a>
                        <a href="/contact" class="text-gray-700 hover:text-sky-500 font-semibold">Contact</a>
                        ${includeCart ? `
                        <a href="/cart" class="relative">
                            <i class="fas fa-shopping-cart text-2xl text-gray-700 hover:text-sky-500"></i>
                            <span id="cart-count" class="cart-badge hidden">0</span>
                        </a>
                        ` : ''}
                        <a href="/login" class="text-sky-500 hover:text-sky-600 font-semibold">Login</a>
                        <a href="/register" class="btn-primary text-white px-6 py-2 rounded-full font-bold">Sign Up</a>
                    </div>
                    <button id="mobile-menu-btn" class="md:hidden text-2xl text-gray-700">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <!-- Mobile Menu -->
                <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 space-y-4">
                    <a href="/" class="block text-gray-700 hover:text-sky-500 font-semibold">Home</a>
                    <a href="/products" class="block text-gray-700 hover:text-sky-500 font-semibold">Products</a>
                    <a href="/curriculum" class="block text-gray-700 hover:text-sky-500 font-semibold">Curriculum</a>
                    <a href="/docs" class="block text-gray-700 hover:text-sky-500 font-semibold">Docs</a>
                    <a href="/about" class="block text-gray-700 hover:text-sky-500 font-semibold">About</a>
                    <a href="/contact" class="block text-gray-700 hover:text-sky-500 font-semibold">Contact</a>
                    ${includeCart ? `<a href="/cart" class="block text-gray-700 hover:text-sky-500 font-semibold">Cart (<span class="cart-count-mobile">0</span>)</a>` : ''}
                    <a href="/login" class="block text-sky-500 hover:text-sky-600 font-semibold">Login</a>
                    <a href="/register" class="block btn-primary text-white px-6 py-2 rounded-full font-bold text-center">Sign Up</a>
                </div>
            </div>
        </nav>

        ${content}

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12 mt-20">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center space-x-3 mb-4">
                            <i class="fas fa-drone text-sky-500 text-3xl"></i>
                            <span class="text-2xl font-black gradient-text">FLYQ</span>
                        </div>
                        <p class="text-gray-400">Premium programmable drones for makers and developers</p>
                    </div>
                    <div>
                        <h4 class="font-bold mb-4 text-sky-400">Products</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/products/flyq-air" class="hover:text-white">FLYQ Air</a></li>
                            <li><a href="/products/flyq-vision" class="hover:text-white">FLYQ Vision</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-4 text-sky-400">Company</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/about" class="hover:text-white">About Us</a></li>
                            <li><a href="/contact" class="hover:text-white">Contact</a></li>
                            <li><a href="https://github.com/passion3d/flyq-air" class="hover:text-white">GitHub</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-4 text-sky-400">Support</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/docs" class="hover:text-white">Documentation</a></li>
                            <li><a href="https://passion3dworld.com" class="hover:text-white">Store</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 FLYQ. All rights reserved. | <span class="text-sky-400">100% Open Source Hardware</span></p>
                </div>
            </div>
        </footer>

        <script>
            // Mobile menu toggle
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Cart management
            function getCart() {
                const cart = localStorage.getItem('flyq_cart');
                return cart ? JSON.parse(cart) : [];
            }

            function updateCartCount() {
                const cart = getCart();
                const count = cart.reduce((sum, item) => sum + item.quantity, 0);
                const badge = document.getElementById('cart-count');
                const mobileCounts = document.querySelectorAll('.cart-count-mobile');
                
                if (badge) {
                    if (count > 0) {
                        badge.textContent = count;
                        badge.classList.remove('hidden');
                    } else {
                        badge.classList.add('hidden');
                    }
                }
                
                mobileCounts.forEach(el => {
                    el.textContent = count;
                });
            }

            // Initialize cart count on page load
            document.addEventListener('DOMContentLoaded', updateCartCount);
        </script>
    </body>
    </html>
  `;
};

// Homepage
app.get('/', (c) => {
  const content = `
    <div class="pt-20">
        <!-- Hero Section -->
        <section class="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20">
            <div class="container mx-auto px-6">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 class="text-6xl md:text-7xl font-black mb-6">
                            Build. Code. <span class="gradient-text">Fly.</span>
                        </h1>
                        <p class="text-2xl text-gray-300 mb-8">
                            Premium programmable drones powered by ESP32-S3. 
                            Perfect for makers, developers, and educators.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <a href="/products" class="btn-primary text-white px-8 py-4 rounded-full font-bold text-lg inline-flex items-center">
                                <i class="fas fa-shopping-cart mr-2"></i>
                                Shop Now
                            </a>
                            <a href="/products" class="border-2 border-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-500 transition inline-flex items-center">
                                <i class="fas fa-info-circle mr-2"></i>
                                Learn More
                            </a>
                        </div>
                        <div class="mt-12 grid grid-cols-3 gap-6">
                            <div class="text-center">
                                <div class="text-4xl font-black text-sky-400 mb-2">100%</div>
                                <div class="text-sm text-gray-400">Open Source</div>
                            </div>
                            <div class="text-center border-l border-r border-gray-700">
                                <div class="text-4xl font-black text-sky-400 mb-2">Wi-Fi</div>
                                <div class="text-sm text-gray-400">Control</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-black text-sky-400 mb-2">45g</div>
                                <div class="text-sm text-gray-400">Weight</div>
                            </div>
                        </div>
                    </div>
                    <div class="float-animation">
                        <img src="https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15" 
                             alt="FLYQ Drone" 
                             class="w-full h-auto drop-shadow-2xl">
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Products -->
        <section class="py-20">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-5xl font-black mb-4">
                        Our <span class="gradient-text">Products</span>
                    </h2>
                    <p class="text-xl text-gray-600">Choose the perfect drone for your needs</p>
                </div>

                <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    ${products.map(product => `
                        <div class="product-card bg-white rounded-3xl overflow-hidden shadow-lg">
                            <div class="p-8 bg-gradient-to-br from-gray-900 to-gray-800">
                                <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-contain">
                            </div>
                            <div class="p-8">
                                <h3 class="text-3xl font-black mb-2">${product.name}</h3>
                                <p class="text-gray-600 mb-4">${product.shortDesc}</p>
                                <ul class="space-y-2 mb-6">
                                    ${product.features.map(f => `
                                        <li class="flex items-center text-sm text-gray-700">
                                            <i class="fas fa-check text-green-500 mr-2"></i>
                                            ${f}
                                        </li>
                                    `).join('')}
                                </ul>
                                <div class="flex items-center justify-between">
                                    <div>
                                        <span class="text-3xl font-black text-sky-500">₹${product.price.toLocaleString()}</span>
                                        <span class="text-sm text-gray-500 ml-2">(${product.stock} in stock)</span>
                                    </div>
                                    <a href="/products/${product.slug}" class="btn-primary text-white px-6 py-3 rounded-full font-bold">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-20 bg-white">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-5xl font-black mb-4">
                        Why <span class="gradient-text">FLYQ?</span>
                    </h2>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="text-center p-8">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-microchip text-white text-3xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Powerful Hardware</h3>
                        <p class="text-gray-600">ESP32-S3 dual-core processor with Wi-Fi and Bluetooth connectivity</p>
                    </div>

                    <div class="text-center p-8">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-code text-white text-3xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Easy Programming</h3>
                        <p class="text-gray-600">Program with ESP-IDF, Arduino, or Python - your choice</p>
                    </div>

                    <div class="text-center p-8">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-graduation-cap text-white text-3xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Learning Resources</h3>
                        <p class="text-gray-600">Comprehensive curriculum and documentation for all skill levels</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Gallery Section -->
        <section class="py-20 bg-midnight">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-5xl font-black mb-4 text-white">
                        Product <span class="text-sky-400">Gallery</span>
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-6"></div>
                    <p class="text-xl silver-text">FLYQ Air from every angle</p>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden rounded-3xl border-4 border-sky-500 shadow-2xl p-6" style="box-shadow: 0 0 30px rgba(14, 165, 233, 0.3);">
                        <img src="https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15" 
                             alt="FLYQ Air - Hero View" 
                             class="w-full h-80 object-contain hover:scale-110 transition-transform duration-500">
                        <div class="mt-4 text-center">
                            <h3 class="text-xl font-bold text-sky-400">Hero View</h3>
                            <p class="text-sm silver-text">FLYQ Air Drone</p>
                        </div>
                    </div>
                    <div class="bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden rounded-3xl border-4 border-sky-500 shadow-2xl p-6" style="box-shadow: 0 0 30px rgba(14, 165, 233, 0.3);">
                        <img src="https://page.gensparksite.com/v1/base64_upload/e412797020c76e97bdf09d5aa6af13eb" 
                             alt="FLYQ Air - Complete Assembly" 
                             class="w-full h-80 object-contain hover:scale-110 transition-transform duration-500">
                        <div class="mt-4 text-center">
                            <h3 class="text-xl font-bold text-sky-400">Complete Assembly</h3>
                            <p class="text-sm silver-text">Fully assembled drone</p>
                        </div>
                    </div>
                    <div class="bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden rounded-3xl border-4 border-sky-500 shadow-2xl p-6" style="box-shadow: 0 0 30px rgba(14, 165, 233, 0.3);">
                        <img src="https://cdn1.genspark.ai/user-upload-image/gpt_image_edited/fa96ac19-c475-4ebb-97cf-51b21deb187d.png" 
                             alt="Circuit Board" 
                             class="w-full h-80 object-contain hover:scale-110 transition-transform duration-500">
                        <div class="mt-4 text-center">
                            <h3 class="text-xl font-bold text-sky-400">Circuit Board</h3>
                            <p class="text-sm silver-text">ESP32-S2 PCB</p>
                        </div>
                    </div>
                    <div class="bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden rounded-3xl border-4 border-sky-500 shadow-2xl p-6" style="box-shadow: 0 0 30px rgba(14, 165, 233, 0.3);">
                        <img src="https://page.gensparksite.com/v1/base64_upload/7cf111fa8837a58342db2d9bc542a114" 
                             alt="FLYQ Air - All Components" 
                             class="w-full h-80 object-contain hover:scale-110 transition-transform duration-500">
                        <div class="mt-4 text-center">
                            <h3 class="text-xl font-bold text-sky-400">Components Kit</h3>
                            <p class="text-sm silver-text">All parts included</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Partners Section -->
        <section class="py-20 bg-midnight">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-5xl font-black mb-4 text-white">
                        <span class="text-sky-400">Trusted By</span> Industry Leaders
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-6"></div>
                    <p class="text-xl silver-text">Partnering with leading technology and education institutions</p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="card-hover p-8 rounded-3xl text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-store text-white text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-sky-400">Passion 3D World</h3>
                        <p class="text-sm silver-text">Official Authorized Dealer</p>
                    </div>

                    <div class="card-hover p-8 rounded-3xl text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-microchip text-white text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-sky-400">Espressif Systems</h3>
                        <p class="text-sm silver-text">ESP32-S3 Technology Partner</p>
                    </div>

                    <div class="card-hover p-8 rounded-3xl text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-graduation-cap text-white text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-sky-400">Educational Institutions</h3>
                        <p class="text-sm silver-text">Universities & Colleges Worldwide</p>
                    </div>

                    <div class="card-hover p-8 rounded-3xl text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-code text-white text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-sky-400">Open Source Community</h3>
                        <p class="text-sm silver-text">Crazyflie Compatible Ecosystem</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="py-20 bg-black">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-5xl font-black mb-4 text-white">
                        What Our <span class="text-sky-400">Students Say</span>
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-6"></div>
                    <p class="text-xl silver-text">Real experiences from our community</p>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                                <i class="fab fa-whatsapp text-white text-2xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-sky-400">Rahul Sharma</h4>
                                <p class="text-sm silver-text">Engineering Student</p>
                                <div class="flex text-yellow-400 text-sm mt-1">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p class="silver-text italic">"Amazing course! I went from zero knowledge to building my own autonomous drone in 8 weeks. The hands-on sessions were incredibly valuable."</p>
                    </div>

                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                                <i class="fab fa-whatsapp text-white text-2xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-sky-400">Priya Patel</h4>
                                <p class="text-sm silver-text">Robotics Enthusiast</p>
                                <div class="flex text-yellow-400 text-sm mt-1">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p class="silver-text italic">"The ESP32-S3 platform is powerful and the curriculum is well-structured. I love how they teach both hardware and software aspects."</p>
                    </div>

                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
                                <i class="fab fa-whatsapp text-white text-2xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-sky-400">Dr. Amit Kumar</h4>
                                <p class="text-sm silver-text">Professor, IIT</p>
                                <div class="flex text-yellow-400 text-sm mt-1">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p class="silver-text italic">"Excellent platform for teaching robotics and embedded systems. We've integrated FLYQ Air into our curriculum. Students love it!"</p>
                    </div>

                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                                <i class="fab fa-whatsapp text-white text-2xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-sky-400">Sneha Desai</h4>
                                <p class="text-sm silver-text">Software Developer</p>
                                <div class="flex text-yellow-400 text-sm mt-1">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p class="silver-text italic">"The Python SDK makes it so easy to program autonomous missions. I built a gesture-controlled drone as my final project!"</p>
                    </div>

                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                                <i class="fab fa-whatsapp text-white text-2xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-sky-400">Arjun Reddy</h4>
                                <p class="text-sm silver-text">Maker & DIY Enthusiast</p>
                                <div class="flex text-yellow-400 text-sm mt-1">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p class="silver-text italic">"Great value for money! The kit quality is excellent and the documentation is comprehensive. I've learned so much!"</p>
                    </div>

                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                                <i class="fab fa-whatsapp text-white text-2xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-sky-400">Meera Singh</h4>
                                <p class="text-sm silver-text">Research Scholar</p>
                                <div class="flex text-yellow-400 text-sm mt-1">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p class="silver-text italic">"Perfect for research projects! The open-source firmware and expandability make it ideal for experimenting with new algorithms."</p>
                    </div>
                </div>

                <div class="text-center mt-16">
                    <a href="https://wa.me/1234567890" target="_blank" class="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105">
                        <i class="fab fa-whatsapp text-3xl mr-3"></i>
                        Join Our WhatsApp Community
                    </a>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="py-20 bg-midnight">
            <div class="container mx-auto px-6 max-w-4xl">
                <div class="text-center mb-16">
                    <h2 class="text-5xl font-black mb-4 text-white">
                        <span class="text-sky-400">Frequently Asked</span> Questions
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-6"></div>
                    <p class="text-xl silver-text">Everything you need to know about FLYQ Air</p>
                </div>

                <div class="space-y-4">
                    <div class="card-hover p-6 rounded-2xl">
                        <h3 class="text-xl font-bold text-sky-400 mb-3 flex items-center">
                            <i class="fas fa-question-circle mr-3"></i>
                            What programming languages are supported?
                        </h3>
                        <p class="silver-text ml-9">FLYQ Air supports multiple programming options: ESP-IDF (C/C++), Arduino IDE, Python SDK (cflib), and visual programming through Crazyflie Client.</p>
                    </div>

                    <div class="card-hover p-6 rounded-2xl">
                        <h3 class="text-xl font-bold text-sky-400 mb-3 flex items-center">
                            <i class="fas fa-question-circle mr-3"></i>
                            Do I need prior drone experience?
                        </h3>
                        <p class="silver-text ml-9">No prior experience required! Our 8-week curriculum starts from basics and gradually progresses to advanced topics.</p>
                    </div>

                    <div class="card-hover p-6 rounded-2xl">
                        <h3 class="text-xl font-bold text-sky-400 mb-3 flex items-center">
                            <i class="fas fa-question-circle mr-3"></i>
                            What's included in the kit?
                        </h3>
                        <p class="silver-text ml-9">The kit includes: PCB frame with integrated ESP32-S3, 4x motors with propellers, battery, USB-C cable, propeller guards, and all necessary mounting hardware.</p>
                    </div>

                    <div class="card-hover p-6 rounded-2xl">
                        <h3 class="text-xl font-bold text-sky-400 mb-3 flex items-center">
                            <i class="fas fa-question-circle mr-3"></i>
                            How long does the battery last?
                        </h3>
                        <p class="silver-text ml-9">Flight time is approximately 5-7 minutes with the included 650mAh battery. Charging takes 1-2 hours.</p>
                    </div>

                    <div class="card-hover p-6 rounded-2xl">
                        <h3 class="text-xl font-bold text-sky-400 mb-3 flex items-center">
                            <i class="fas fa-question-circle mr-3"></i>
                            Can I add sensors and expand functionality?
                        </h3>
                        <p class="silver-text ml-9">Yes! FLYQ Air features a 24-pin expansion connector supporting I²C, SPI, UART, and GPIO. Compatible sensors include VL53L1X ToF, MS5611 barometer, and PMW3901 optical flow.</p>
                    </div>

                    <div class="card-hover p-6 rounded-2xl">
                        <h3 class="text-xl font-bold text-sky-400 mb-3 flex items-center">
                            <i class="fas fa-question-circle mr-3"></i>
                            Is FLYQ Air open source?
                        </h3>
                        <p class="silver-text ml-9">Yes! Both hardware designs and firmware are 100% open source. Access schematics, PCB files, and code on GitHub.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-5xl font-black mb-6">Ready to Start Flying?</h2>
                <p class="text-2xl mb-8 max-w-2xl mx-auto">
                    Join thousands of makers and developers building amazing projects with FLYQ drones
                </p>
                <a href="/products" class="bg-white text-sky-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition inline-flex items-center">
                    <i class="fas fa-rocket mr-2"></i>
                    Shop Now
                </a>
            </div>
        </section>
    </div>
  `;

  return c.html(renderPage('Home', content));
});

// Products listing page
app.get('/products', (c) => {
  const content = `
    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h1 class="text-6xl font-black mb-4">
                    Our <span class="gradient-text">Products</span>
                </h1>
                <p class="text-xl text-gray-600">Premium programmable drones for every need</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                ${products.map(product => `
                    <div class="product-card bg-white rounded-3xl overflow-hidden shadow-lg">
                        <div class="p-8 bg-gradient-to-br from-gray-900 to-gray-800">
                            <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-contain">
                        </div>
                        <div class="p-8">
                            <div class="flex items-start justify-between mb-4">
                                <div>
                                    <h3 class="text-3xl font-black mb-2">${product.name}</h3>
                                    <p class="text-gray-600">${product.shortDesc}</p>
                                </div>
                                ${product.stock > 0 
                                    ? '<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">In Stock</span>' 
                                    : '<span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">Out of Stock</span>'}
                            </div>
                            <ul class="space-y-2 mb-6">
                                ${product.features.map(f => `
                                    <li class="flex items-center text-sm text-gray-700">
                                        <i class="fas fa-check text-green-500 mr-2"></i>
                                        ${f}
                                    </li>
                                `).join('')}
                            </ul>
                            <div class="border-t pt-6 mt-6">
                                <div class="flex items-center justify-between mb-4">
                                    <span class="text-4xl font-black text-sky-500">₹${product.price.toLocaleString()}</span>
                                    <span class="text-sm text-gray-500">${product.stock} available</span>
                                </div>
                                <div class="flex gap-4">
                                    <a href="/products/${product.slug}" class="flex-1 text-center border-2 border-sky-500 text-sky-500 px-6 py-3 rounded-full font-bold hover:bg-sky-50 transition">
                                        View Details
                                    </a>
                                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')" 
                                            class="flex-1 btn-primary text-white px-6 py-3 rounded-full font-bold ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                                            ${product.stock === 0 ? 'disabled' : ''}>
                                        <i class="fas fa-cart-plus mr-2"></i>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <script>
        function addToCart(id, name, price, image) {
            let cart = JSON.parse(localStorage.getItem('flyq_cart') || '[]');
            
            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ id, name, price, image, quantity: 1 });
            }
            
            localStorage.setItem('flyq_cart', JSON.stringify(cart));
            updateCartCount();
            
            // Show notification
            alert(name + ' added to cart!');
        }
    </script>
  `;

  return c.html(renderPage('Products', content));
});

// Individual product page
app.get('/products/:slug', (c) => {
  const slug = c.req.param('slug');
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return c.html(renderPage('Product Not Found', '<div class="pt-32 pb-20 text-center"><h1 class="text-4xl font-bold">Product not found</h1><p class="mt-4"><a href="/products" class="text-sky-500">Back to products</a></p></div>'));
  }

  const content = `
    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                <!-- Product Image -->
                <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-auto float-animation">
                </div>

                <!-- Product Info -->
                <div>
                    <div class="mb-6">
                        ${product.stock > 0 
                            ? '<span class="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">In Stock</span>' 
                            : '<span class="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold">Out of Stock</span>'}
                    </div>

                    <h1 class="text-5xl font-black mb-4">${product.name}</h1>
                    <p class="text-xl text-gray-600 mb-8">${product.shortDesc}</p>

                    <div class="mb-8">
                        <div class="text-5xl font-black text-sky-500 mb-2">₹${product.price.toLocaleString()}</div>
                        <div class="text-gray-500">${product.stock} units available</div>
                    </div>

                    <div class="bg-gray-50 rounded-2xl p-6 mb-8">
                        <h3 class="font-bold text-lg mb-4">Key Features:</h3>
                        <ul class="space-y-3">
                            ${product.features.map(f => `
                                <li class="flex items-center text-gray-700">
                                    <i class="fas fa-check-circle text-green-500 mr-3 text-xl"></i>
                                    <span>${f}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="flex gap-4">
                        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')" 
                                class="flex-1 btn-primary text-white px-8 py-4 rounded-full font-bold text-lg ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                                ${product.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Add to Cart
                        </button>
                        <button class="border-2 border-sky-500 text-sky-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-50 transition">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>

                    <div class="mt-8 border-t pt-8">
                        <div class="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <i class="fas fa-truck text-sky-500 text-2xl mb-2"></i>
                                <div class="text-sm font-bold">Free Shipping</div>
                                <div class="text-xs text-gray-500">On orders over ₹2000</div>
                            </div>
                            <div>
                                <i class="fas fa-shield-alt text-sky-500 text-2xl mb-2"></i>
                                <div class="text-sm font-bold">Warranty</div>
                                <div class="text-xs text-gray-500">1 Year Coverage</div>
                            </div>
                            <div>
                                <i class="fas fa-headset text-sky-500 text-2xl mb-2"></i>
                                <div class="text-sm font-bold">Support</div>
                                <div class="text-xs text-gray-500">24/7 Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function addToCart(id, name, price, image) {
            let cart = JSON.parse(localStorage.getItem('flyq_cart') || '[]');
            
            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ id, name, price, image, quantity: 1 });
            }
            
            localStorage.setItem('flyq_cart', JSON.stringify(cart));
            updateCartCount();
            
            alert(name + ' added to cart!');
        }
    </script>
  `;

  return c.html(renderPage(product.name, content));
});

// Shopping Cart Page
app.get('/cart', (c) => {
  const content = `
    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6 max-w-6xl">
            <h1 class="text-5xl font-black mb-12">Shopping <span class="gradient-text">Cart</span></h1>

            <div id="cart-container">
                <div class="text-center py-20">
                    <i class="fas fa-shopping-cart text-gray-300 text-6xl mb-4"></i>
                    <p class="text-xl text-gray-500">Loading cart...</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        function loadCart() {
            const cart = JSON.parse(localStorage.getItem('flyq_cart') || '[]');
            const container = document.getElementById('cart-container');

            if (cart.length === 0) {
                container.innerHTML = \`
                    <div class="text-center py-20">
                        <i class="fas fa-shopping-cart text-gray-300 text-6xl mb-4"></i>
                        <p class="text-xl text-gray-500 mb-6">Your cart is empty</p>
                        <a href="/products" class="btn-primary text-white px-8 py-4 rounded-full font-bold inline-flex items-center">
                            <i class="fas fa-arrow-left mr-2"></i>
                            Continue Shopping
                        </a>
                    </div>
                \`;
                return;
            }

            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal > 2000 ? 0 : 100;
            const total = subtotal + shipping;

            container.innerHTML = \`
                <div class="grid lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-4">
                        \${cart.map(item => \`
                            <div class="bg-white rounded-2xl p-6 shadow-md flex gap-6">
                                <img src="\${item.image}" alt="\${item.name}" class="w-32 h-32 object-contain bg-gray-100 rounded-lg">
                                <div class="flex-1">
                                    <h3 class="text-2xl font-bold mb-2">\${item.name}</h3>
                                    <p class="text-xl text-sky-500 font-bold mb-4">₹\${item.price.toLocaleString()}</p>
                                    <div class="flex items-center gap-4">
                                        <button onclick="updateQuantity(\${item.id}, \${item.quantity - 1})" class="w-10 h-10 border-2 border-gray-300 rounded-full hover:border-sky-500 hover:text-sky-500 font-bold">-</button>
                                        <span class="text-xl font-bold">\${item.quantity}</span>
                                        <button onclick="updateQuantity(\${item.id}, \${item.quantity + 1})" class="w-10 h-10 border-2 border-gray-300 rounded-full hover:border-sky-500 hover:text-sky-500 font-bold">+</button>
                                        <button onclick="removeFromCart(\${item.id})" class="ml-auto text-red-500 hover:text-red-700">
                                            <i class="fas fa-trash"></i> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        \`).join('')}
                    </div>

                    <div class="lg:col-span-1">
                        <div class="bg-white rounded-2xl p-6 shadow-md sticky top-24">
                            <h3 class="text-2xl font-bold mb-6">Order Summary</h3>
                            <div class="space-y-4 mb-6">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Subtotal</span>
                                    <span class="font-bold">₹\${subtotal.toLocaleString()}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Shipping</span>
                                    <span class="font-bold">\${shipping === 0 ? 'FREE' : '₹' + shipping}</span>
                                </div>
                                \${subtotal < 2000 ? '<p class="text-sm text-gray-500">Add ₹' + (2000 - subtotal).toLocaleString() + ' more for free shipping!</p>' : ''}
                                <div class="border-t pt-4">
                                    <div class="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span class="text-sky-500">₹\${total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            <button onclick="alert('Checkout coming soon! Please login first.')" class="w-full btn-primary text-white px-8 py-4 rounded-full font-bold text-lg mb-4">
                                <i class="fas fa-lock mr-2"></i>
                                Proceed to Checkout
                            </button>
                            <a href="/products" class="block text-center text-sky-500 hover:text-sky-600 font-semibold">
                                <i class="fas fa-arrow-left mr-2"></i>
                                Continue Shopping
                            </a>
                        </div>
                    </div>
                </div>
            \`;
        }

        function updateQuantity(id, newQuantity) {
            if (newQuantity < 1) {
                removeFromCart(id);
                return;
            }

            let cart = JSON.parse(localStorage.getItem('flyq_cart') || '[]');
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity = newQuantity;
                localStorage.setItem('flyq_cart', JSON.stringify(cart));
                loadCart();
                updateCartCount();
            }
        }

        function removeFromCart(id) {
            let cart = JSON.parse(localStorage.getItem('flyq_cart') || '[]');
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('flyq_cart', JSON.stringify(cart));
            loadCart();
            updateCartCount();
        }

        document.addEventListener('DOMContentLoaded', loadCart);
    </script>
  `;

  return c.html(renderPage('Shopping Cart', content));
});

// Login page (placeholder for Phase 2)
app.get('/login', (c) => {
  const content = `
    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6 max-w-md">
            <div class="bg-white rounded-3xl shadow-2xl p-8">
                <h1 class="text-4xl font-black mb-2 text-center">Welcome Back</h1>
                <p class="text-gray-600 text-center mb-8">Login to access your account</p>

                <form class="space-y-6">
                    <div>
                        <label class="block text-sm font-bold mb-2">Email</label>
                        <input type="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="your@email.com" required>
                    </div>

                    <div>
                        <label class="block text-sm font-bold mb-2">Password</label>
                        <input type="password" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="••••••••" required>
                    </div>

                    <div class="flex items-center justify-between text-sm">
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2">
                            <span>Remember me</span>
                        </label>
                        <a href="#" class="text-sky-500 hover:text-sky-600 font-semibold">Forgot password?</a>
                    </div>

                    <button onclick="alert('Authentication coming in Phase 2! For now, explore the products.')" type="button" class="w-full btn-primary text-white px-8 py-4 rounded-full font-bold text-lg">
                        Sign In
                    </button>
                </form>

                <p class="text-center mt-8 text-gray-600">
                    Don't have an account? <a href="/register" class="text-sky-500 hover:text-sky-600 font-bold">Sign up</a>
                </p>
            </div>
        </div>
    </div>
  `;

  return c.html(renderPage('Login', content, false));
});

// Register page (placeholder for Phase 2)
app.get('/register', (c) => {
  const content = `
    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6 max-w-md">
            <div class="bg-white rounded-3xl shadow-2xl p-8">
                <h1 class="text-4xl font-black mb-2 text-center">Create Account</h1>
                <p class="text-gray-600 text-center mb-8">Join the FLYQ community</p>

                <form class="space-y-6">
                    <div>
                        <label class="block text-sm font-bold mb-2">Full Name</label>
                        <input type="text" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="John Doe" required>
                    </div>

                    <div>
                        <label class="block text-sm font-bold mb-2">Email</label>
                        <input type="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="your@email.com" required>
                    </div>

                    <div>
                        <label class="block text-sm font-bold mb-2">Password</label>
                        <input type="password" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="••••••••" required>
                    </div>

                    <div>
                        <label class="block text-sm font-bold mb-2">Confirm Password</label>
                        <input type="password" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="••••••••" required>
                    </div>

                    <button onclick="alert('Registration coming in Phase 2! For now, explore our products.')" type="button" class="w-full btn-primary text-white px-8 py-4 rounded-full font-bold text-lg">
                        Create Account
                    </button>
                </form>

                <p class="text-center mt-8 text-gray-600">
                    Already have an account? <a href="/login" class="text-sky-500 hover:text-sky-600 font-bold">Sign in</a>
                </p>
            </div>
        </div>
    </div>
  `;

  return c.html(renderPage('Register', content, false));
});

// About page
app.get('/about', (c) => {
  const content = `
    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6 max-w-4xl">
            <h1 class="text-5xl font-black mb-8 text-center">About <span class="gradient-text">FLYQ</span></h1>
            <div class="bg-white rounded-3xl p-8 shadow-lg">
                <p class="text-xl text-gray-700 mb-6">
                    FLYQ is dedicated to making programmable drones accessible to makers, developers, and educators worldwide.
                </p>
                <p class="text-gray-600 mb-6">
                    Our mission is to provide high-quality, open-source hardware that empowers learning and innovation in robotics and autonomous systems.
                </p>
                <div class="grid md:grid-cols-3 gap-8 mt-12">
                    <div class="text-center">
                        <div class="text-4xl font-black text-sky-500 mb-2">100%</div>
                        <div class="text-gray-600">Open Source</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-black text-sky-500 mb-2">1000+</div>
                        <div class="text-gray-600">Happy Customers</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-black text-sky-500 mb-2">24/7</div>
                        <div class="text-gray-600">Support</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;

  return c.html(renderPage('About Us', content));
});

// Contact page
app.get('/contact', (c) => {
  const content = `
    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6 max-w-4xl">
            <h1 class="text-5xl font-black mb-12 text-center">Get in <span class="gradient-text">Touch</span></h1>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="bg-white rounded-3xl p-8 shadow-lg">
                    <h3 class="text-2xl font-bold mb-6">Send us a message</h3>
                    <form class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold mb-2">Name</label>
                            <input type="text" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">Email</label>
                            <input type="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">Message</label>
                            <textarea rows="4" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none"></textarea>
                        </div>
                        <button type="submit" class="w-full btn-primary text-white px-8 py-4 rounded-full font-bold">Send Message</button>
                    </form>
                </div>

                <div>
                    <div class="bg-white rounded-3xl p-8 shadow-lg mb-6">
                        <h3 class="text-2xl font-bold mb-6">Contact Info</h3>
                        <div class="space-y-4">
                            <div class="flex items-start">
                                <i class="fas fa-envelope text-sky-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-bold">Email</div>
                                    <div class="text-gray-600">support@flyq.in</div>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-phone text-sky-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-bold">Phone</div>
                                    <div class="text-gray-600">+91 123 456 7890</div>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-map-marker-alt text-sky-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-bold">Address</div>
                                    <div class="text-gray-600">India</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-8 text-white">
                        <h3 class="text-2xl font-bold mb-4">Need Help?</h3>
                        <p class="mb-6">Check out our documentation and community forums</p>
                        <a href="https://github.com/passion3d/flyq-air" class="inline-block bg-white text-sky-600 px-6 py-3 rounded-full font-bold hover:shadow-lg transition">
                            <i class="fab fa-github mr-2"></i>
                            Visit GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;

  return c.html(renderPage('Contact Us', content));
});

// Curriculum page with authentication protection
app.get('/curriculum', async (c) => {
  // Check if user is logged in
  const user = await getCurrentUser(c);
  
  // If not logged in, redirect to login page
  if (!user) {
    return c.redirect('/login?redirect=/curriculum&message=login_required');
  }
  
  // User is authenticated - show full curriculum
  const content = `
    <div class="pt-20">
        <!-- Hero Section -->
        <section class="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-16">
            <div class="container mx-auto px-6 text-center">
                <h1 class="text-6xl font-black mb-6">
                    <span class="text-sky-400">8-Week Training</span> Curriculum
                </h1>
                <p class="text-2xl text-gray-300 max-w-3xl mx-auto">
                    Master drone development from basics to autonomous flight with our comprehensive curriculum
                </p>
            </div>
        </section>

        <!-- Welcome Message for Authenticated Users -->
        <section class="py-12 bg-green-50 border-y-4 border-green-400">
            <div class="container mx-auto px-6">
                <div class="max-w-4xl mx-auto text-center">
                    <i class="fas fa-check-circle text-green-600 text-5xl mb-4"></i>
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">
                        Welcome to Your Curriculum!
                    </h2>
                    <p class="text-lg text-gray-700">
                        You have full access to the 8-week training program. Follow the sessions below to master drone development.
                    </p>
                </div>
            </div>
        </section>

        <!-- Full Curriculum Content -->
        <section class="py-20 bg-black">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-5xl font-black mb-6 text-white">
                        Curriculum <span class="text-sky-400">Overview</span>
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-6"></div>
                    <p class="text-xl silver-text max-w-3xl mx-auto">30 sessions covering hardware, programming, flight, and autonomous systems</p>
                </div>

                <div class="grid lg:grid-cols-2 gap-6">
                    <!-- Week 1 -->
                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                <span class="text-2xl font-black text-white">1</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-black text-sky-400">Week 1</h3>
                                <p class="silver-text">Introduction & Platform Setup</p>
                            </div>
                        </div>
                        <ul class="space-y-3 silver-text">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 1:</strong> Course kickoff, FLYQ Air overview & applications</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 2:</strong> Hardware overview: PCB, ESP32-S3, key features</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 3:</strong> Circuit schematics & power system</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 4:</strong> Hands-on: Unboxing & component identification</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Week 2 -->
                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                <span class="text-2xl font-black text-white">2</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-black text-sky-400">Week 2</h3>
                                <p class="silver-text">Sensor & Motor Systems</p>
                            </div>
                        </div>
                        <ul class="space-y-3 silver-text">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 5:</strong> IMU (MPU6050) and motion sensing</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 6:</strong> Motor driver circuit: MOSFETs & PWM</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 7:</strong> Pinout & expansion connector</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 8:</strong> Hands-on: Soldering & assembly</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Week 3 -->
                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                <span class="text-2xl font-black text-white">3</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-black text-sky-400">Week 3</h3>
                                <p class="silver-text">Firmware & Programming</p>
                            </div>
                        </div>
                        <ul class="space-y-3 silver-text">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 9:</strong> Firmware architecture: ESP-IDF, RTOS, PID</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 10:</strong> Arduino IDE & ESP-IDF development</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 11:</strong> Python SDK & PC control (cfclient)</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 12:</strong> Live demo: Flashing firmware</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Week 4 -->
                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                <span class="text-2xl font-black text-white">4</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-black text-sky-400">Week 4</h3>
                                <p class="silver-text">Flight Basics & Safety</p>
                            </div>
                        </div>
                        <ul class="space-y-3 silver-text">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 13:</strong> Pre-flight setup & calibration</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 14:</strong> Safety guidelines: Battery & propeller safety</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 15:</strong> First flight procedure & live demo</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 16:</strong> Troubleshooting common issues</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Week 5 -->
                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                <span class="text-2xl font-black text-white">5</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-black text-sky-400">Week 5</h3>
                                <p class="silver-text">Advanced Features & Sensors</p>
                            </div>
                        </div>
                        <ul class="space-y-3 silver-text">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 17:</strong> Optional sensors: ToF, barometer, optical flow</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 18:</strong> Expansion modules & 24-pin connector</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 19:</strong> Assisted flight modes integration</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 20:</strong> Hands-on: Install & test sensors</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Week 6 -->
                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                <span class="text-2xl font-black text-white">6</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-black text-sky-400">Week 6</h3>
                                <p class="silver-text">Autonomous Flight & Control</p>
                            </div>
                        </div>
                        <ul class="space-y-3 silver-text">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 21:</strong> Autonomous behavior with Python (cflib)</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 22:</strong> Telemetry & WiFi control interface</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 23:</strong> Drone programming patterns & missions</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 24:</strong> Live demo: Autonomous flight path</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Week 7 -->
                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                <span class="text-2xl font-black text-white">7</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-black text-sky-400">Week 7</h3>
                                <p class="silver-text">Customization & Expansion</p>
                            </div>
                        </div>
                        <ul class="space-y-3 silver-text">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 25:</strong> Firmware customization: PID tuning</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 26:</strong> Hardware modifications & payloads</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 27:</strong> Advanced features: Vision & gesture control</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 28:</strong> Workshop: Custom project presentations</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Week 8 -->
                    <div class="card-hover p-8 rounded-3xl">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                <span class="text-2xl font-black text-white">8</span>
                            </div>
                            <div>
                                <h3 class="text-2xl font-black text-sky-400">Week 8</h3>
                                <p class="silver-text">Projects & Wrap-Up</p>
                            </div>
                        </div>
                        <ul class="space-y-3 silver-text">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 29:</strong> Project execution & rehearsal</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-sky-400 mt-1 mr-3"></i>
                                <span><strong>Session 30:</strong> Final presentations & course review</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-trophy text-yellow-400 mt-1 mr-3"></i>
                                <span><strong>Certificate:</strong> Course completion certificate</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-users text-green-400 mt-1 mr-3"></i>
                                <span><strong>Community:</strong> Join our alumni network</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="mt-16 text-center">
                    <div class="inline-block bg-gradient-to-r from-sky-500 to-blue-600 p-1 rounded-3xl">
                        <div class="bg-black px-12 py-8 rounded-3xl">
                            <h3 class="text-3xl font-black text-sky-400 mb-4">Course Highlights</h3>
                            <div class="grid md:grid-cols-3 gap-8 text-left">
                                <div>
                                    <i class="fas fa-clock text-sky-400 text-2xl mb-2"></i>
                                    <p class="silver-text"><strong class="text-white">30 Sessions</strong><br>8 weeks of intensive training</p>
                                </div>
                                <div>
                                    <i class="fas fa-hands-helping text-sky-400 text-2xl mb-2"></i>
                                    <p class="silver-text"><strong class="text-white">Hands-on Labs</strong><br>Build & fly your own drone</p>
                                </div>
                                <div>
                                    <i class="fas fa-certificate text-sky-400 text-2xl mb-2"></i>
                                    <p class="silver-text"><strong class="text-white">Certification</strong><br>Industry-recognized certificate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-20 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-5xl font-black mb-6">Ready to Start Learning?</h2>
                <p class="text-2xl mb-8 max-w-2xl mx-auto">
                    Purchase FLYQ Air or FLYQ Vision to get instant access to the complete curriculum
                </p>
                <a href="/products" class="bg-white text-sky-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition inline-flex items-center">
                    <i class="fas fa-shopping-cart mr-2"></i>
                    View Products
                </a>
            </div>
        </section>
    </div>
  `;

  return c.html(renderPage('Curriculum', content));
});

// Documentation page
app.get('/docs', (c) => {
  const content = `
    <div class="pt-20">
        <!-- Hero Section -->
        <section class="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-16">
            <div class="container mx-auto px-6 text-center">
                <i class="fas fa-book text-sky-400 text-6xl mb-6"></i>
                <h1 class="text-6xl font-black mb-6">
                    <span class="text-sky-400">Documentation</span> & Resources
                </h1>
                <p class="text-2xl text-gray-300 max-w-3xl mx-auto">
                    Complete guides and resources for FLYQ Air and FLYQ Vision
                </p>
            </div>
        </section>

        <!-- Quick Links -->
        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <a href="https://github.com/passion3d/flyq-air" target="_blank" class="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fab fa-github text-sky-500 text-5xl mb-4"></i>
                        <h3 class="text-2xl font-bold mb-3">GitHub Repository</h3>
                        <p class="text-gray-600 mb-4">Access open-source hardware designs, firmware code, and schematics</p>
                        <span class="text-sky-500 font-bold">View on GitHub →</span>
                    </a>

                    <a href="/curriculum" class="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-graduation-cap text-sky-500 text-5xl mb-4"></i>
                        <h3 class="text-2xl font-bold mb-3">Training Curriculum</h3>
                        <p class="text-gray-600 mb-4">8-week comprehensive program covering hardware, programming, and flight</p>
                        <span class="text-sky-500 font-bold">View Curriculum →</span>
                    </a>

                    <a href="https://passion3dworld.com" target="_blank" class="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-store text-sky-500 text-5xl mb-4"></i>
                        <h3 class="text-2xl font-bold mb-3">Official Store</h3>
                        <p class="text-gray-600 mb-4">Purchase FLYQ drones from our authorized dealer Passion 3D World</p>
                        <span class="text-sky-500 font-bold">Visit Store →</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- Getting Started -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-6 max-w-4xl">
                <h2 class="text-5xl font-black mb-12 text-center">
                    <span class="text-sky-500">Getting</span> Started
                </h2>

                <div class="space-y-8">
                    <div class="bg-gray-50 p-8 rounded-3xl border-l-4 border-sky-500">
                        <h3 class="text-2xl font-bold mb-4 flex items-center">
                            <span class="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">1</span>
                            Unbox Your Drone
                        </h3>
                        <p class="text-gray-700 ml-13">
                            Carefully unpack your FLYQ drone kit. Verify all components are included: drone frame, motors, propellers, battery, USB-C cable, and propeller guards.
                        </p>
                    </div>

                    <div class="bg-gray-50 p-8 rounded-3xl border-l-4 border-sky-500">
                        <h3 class="text-2xl font-bold mb-4 flex items-center">
                            <span class="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">2</span>
                            Install Development Tools
                        </h3>
                        <ul class="text-gray-700 ml-13 space-y-2">
                            <li>• <strong>Arduino IDE</strong>: For easy programming with Arduino libraries</li>
                            <li>• <strong>ESP-IDF</strong>: For advanced firmware development</li>
                            <li>• <strong>Python & cflib</strong>: For autonomous flight programming</li>
                            <li>• <strong>Crazyflie Client</strong>: For PC-based control</li>
                        </ul>
                    </div>

                    <div class="bg-gray-50 p-8 rounded-3xl border-l-4 border-sky-500">
                        <h3 class="text-2xl font-bold mb-4 flex items-center">
                            <span class="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">3</span>
                            First Flight
                        </h3>
                        <p class="text-gray-700 ml-13">
                            Charge the battery fully, calibrate the IMU sensor, connect via Wi-Fi, and perform your first test flight in a safe indoor environment.
                        </p>
                    </div>

                    <div class="bg-gray-50 p-8 rounded-3xl border-l-4 border-sky-500">
                        <h3 class="text-2xl font-bold mb-4 flex items-center">
                            <span class="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">4</span>
                            Start Learning
                        </h3>
                        <p class="text-gray-700 ml-13">
                            Follow our 8-week curriculum to master drone development from basics to autonomous flight. Access available after purchase and login.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Technical Specifications -->
        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-6 max-w-6xl">
                <h2 class="text-5xl font-black mb-12 text-center">
                    <span class="text-sky-500">Technical</span> Specifications
                </h2>

                <div class="grid md:grid-cols-2 gap-8">
                    <!-- FLYQ Air Specs -->
                    <div class="bg-white p-8 rounded-3xl shadow-lg">
                        <h3 class="text-3xl font-bold mb-6 text-sky-500">FLYQ Air</h3>
                        <table class="w-full text-left">
                            <tbody class="space-y-3">
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Processor</td>
                                    <td class="py-3 text-gray-600">ESP32-S3 Dual-Core 240MHz</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Memory</td>
                                    <td class="py-3 text-gray-600">512KB SRAM</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Connectivity</td>
                                    <td class="py-3 text-gray-600">Wi-Fi, Bluetooth LE</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">IMU</td>
                                    <td class="py-3 text-gray-600">MPU6050 6-axis</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Motors</td>
                                    <td class="py-3 text-gray-600">720 coreless DC (4x)</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Battery</td>
                                    <td class="py-3 text-gray-600">1S LiPo 3.7V</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Weight</td>
                                    <td class="py-3 text-gray-600">~45g (without battery)</td>
                                </tr>
                                <tr>
                                    <td class="py-3 font-bold text-gray-700">GPIO</td>
                                    <td class="py-3 text-gray-600">24-pin expansion</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- FLYQ Vision Specs -->
                    <div class="bg-white p-8 rounded-3xl shadow-lg">
                        <h3 class="text-3xl font-bold mb-6 text-sky-500">FLYQ Vision</h3>
                        <table class="w-full text-left">
                            <tbody class="space-y-3">
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Processor</td>
                                    <td class="py-3 text-gray-600">ESP32-S3 Dual-Core 240MHz</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Camera</td>
                                    <td class="py-3 text-gray-600">HD 720p @ 30fps</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Connectivity</td>
                                    <td class="py-3 text-gray-600">Wi-Fi Streaming</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Controls</td>
                                    <td class="py-3 text-gray-600">Gesture Control</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">FOV</td>
                                    <td class="py-3 text-gray-600">120° Wide Angle</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">Video</td>
                                    <td class="py-3 text-gray-600">Real-time streaming</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-3 font-bold text-gray-700">SDK</td>
                                    <td class="py-3 text-gray-600">Python/Arduino</td>
                                </tr>
                                <tr>
                                    <td class="py-3 font-bold text-gray-700">Range</td>
                                    <td class="py-3 text-gray-600">50m Wi-Fi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

        <!-- Programming Options -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-6 max-w-6xl">
                <h2 class="text-5xl font-black mb-12 text-center">
                    <span class="text-sky-500">Programming</span> Options
                </h2>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-gray-50 p-8 rounded-3xl text-center">
                        <i class="fas fa-code text-sky-500 text-5xl mb-4"></i>
                        <h3 class="text-2xl font-bold mb-3">Arduino IDE</h3>
                        <p class="text-gray-700">
                            Easy-to-use IDE with extensive libraries. Perfect for beginners and rapid prototyping.
                        </p>
                    </div>

                    <div class="bg-gray-50 p-8 rounded-3xl text-center">
                        <i class="fab fa-python text-sky-500 text-5xl mb-4"></i>
                        <h3 class="text-2xl font-bold mb-3">Python SDK</h3>
                        <p class="text-gray-700">
                            cflib Python library for autonomous flight programming and advanced missions.
                        </p>
                    </div>

                    <div class="bg-gray-50 p-8 rounded-3xl text-center">
                        <i class="fas fa-terminal text-sky-500 text-5xl mb-4"></i>
                        <h3 class="text-2xl font-bold mb-3">ESP-IDF</h3>
                        <p class="text-gray-700">
                            Professional development framework for advanced firmware customization.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Community & Support -->
        <section class="py-16 bg-gray-900 text-white">
            <div class="container mx-auto px-6 max-w-4xl text-center">
                <h2 class="text-5xl font-black mb-8">
                    <span class="text-sky-400">Community</span> & Support
                </h2>
                <p class="text-xl text-gray-300 mb-12">
                    Join our growing community of makers, developers, and educators
                </p>

                <div class="grid md:grid-cols-3 gap-6">
                    <a href="https://github.com/passion3d/flyq-air" target="_blank" class="bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition">
                        <i class="fab fa-github text-4xl mb-3 text-sky-400"></i>
                        <h3 class="font-bold text-lg mb-2">GitHub</h3>
                        <p class="text-gray-400 text-sm">Open source code & discussions</p>
                    </a>

                    <a href="https://wa.me/1234567890" target="_blank" class="bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition">
                        <i class="fab fa-whatsapp text-4xl mb-3 text-green-400"></i>
                        <h3 class="font-bold text-lg mb-2">WhatsApp</h3>
                        <p class="text-gray-400 text-sm">Community chat & support</p>
                    </a>

                    <a href="/contact" class="bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition">
                        <i class="fas fa-envelope text-4xl mb-3 text-sky-400"></i>
                        <h3 class="font-bold text-lg mb-2">Contact Us</h3>
                        <p class="text-gray-400 text-sm">Direct support & inquiries</p>
                    </a>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-20 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-5xl font-black mb-6">Ready to Start Building?</h2>
                <p class="text-2xl mb-8 max-w-2xl mx-auto">
                    Get your FLYQ drone and start learning today
                </p>
                <div class="flex justify-center gap-4">
                    <a href="/products" class="bg-white text-sky-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition inline-flex items-center">
                        <i class="fas fa-shopping-cart mr-2"></i>
                        Shop Now
                    </a>
                    <a href="/curriculum" class="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-sky-600 transition inline-flex items-center">
                        <i class="fas fa-graduation-cap mr-2"></i>
                        View Curriculum
                    </a>
                </div>
            </div>
        </section>
    </div>
  `;

  return c.html(renderPage('Documentation', content));
});

// Import auth utilities
import { hashPassword, verifyPassword, createSession, deleteSession, getCurrentUser } from './lib/auth'
import { isValidEmail, isValidPassword, isValidName, sanitizeInput } from './lib/validation'
import { isDatabaseAvailable, createUser, getUserByEmail, createOrder, getOrdersByUserId, getOrderWithItems, updateOrderStatus, grantCurriculumAccess, hasCurriculumAccess } from './lib/db'

// ==================== AUTHENTICATION API ROUTES ====================

// Register API
app.post('/api/auth/register', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, password, confirmPassword } = body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return c.json({ success: false, message: 'All fields are required' }, 400);
    }

    if (password !== confirmPassword) {
      return c.json({ success: false, message: 'Passwords do not match' }, 400);
    }

    if (!isValidEmail(email)) {
      return c.json({ success: false, message: 'Invalid email address' }, 400);
    }

    if (!isValidName(name)) {
      return c.json({ success: false, message: 'Name must be 2-100 characters' }, 400);
    }

    const passwordCheck = isValidPassword(password);
    if (!passwordCheck.valid) {
      return c.json({ success: false, message: passwordCheck.message }, 400);
    }

    // Check if database is available
    if (!isDatabaseAvailable(c)) {
      return c.json({ success: false, message: 'Service temporarily unavailable. Please try again later.' }, 503);
    }

    // Check if user exists
    const existingUser = await getUserByEmail(c, email.toLowerCase());
    if (existingUser) {
      return c.json({ success: false, message: 'Email already registered' }, 400);
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const userId = await createUser(c, email.toLowerCase(), passwordHash, sanitizeInput(name));

    // Create session
    await createSession(c, userId as number);

    return c.json({
      success: true,
      message: 'Registration successful',
      redirect: '/account'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ success: false, message: 'Registration failed. Please try again.' }, 500);
  }
});

// Login API
app.post('/api/auth/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ success: false, message: 'Email and password are required' }, 400);
    }

    if (!isDatabaseAvailable(c)) {
      return c.json({ success: false, message: 'Service temporarily unavailable' }, 503);
    }

    // Get user
    const user: any = await getUserByEmail(c, email.toLowerCase());
    if (!user) {
      return c.json({ success: false, message: 'Invalid email or password' }, 401);
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return c.json({ success: false, message: 'Invalid email or password' }, 401);
    }

    // Create session
    await createSession(c, user.id);

    return c.json({
      success: true,
      message: 'Login successful',
      redirect: '/account'
    });

  } catch (error) {
    console.error('Login error:', error);
    return c.json({ success: false, message: 'Login failed. Please try again.' }, 500);
  }
});

// Logout API
app.post('/api/auth/logout', async (c) => {
  await deleteSession(c);
  return c.json({ success: true, redirect: '/' });
});

// Check auth status API
app.get('/api/auth/status', async (c) => {
  const user = await getCurrentUser(c);
  if (user) {
    return c.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  }
  return c.json({ authenticated: false });
});

// ==================== CHECKOUT & ORDERS API ====================

// Create order API
app.post('/api/orders/create', async (c) => {
  try {
    const user = await getCurrentUser(c);
    if (!user) {
      return c.json({ success: false, message: 'Please login to place an order' }, 401);
    }

    if (!isDatabaseAvailable(c)) {
      return c.json({ success: false, message: 'Service temporarily unavailable' }, 503);
    }

    const body = await c.req.json();
    const { items, shippingAddress } = body;

    if (!items || items.length === 0) {
      return c.json({ success: false, message: 'Cart is empty' }, 400);
    }

    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Create order
    const { orderId, orderNumber } = await createOrder(c, user.id, items, total);

    return c.json({
      success: true,
      orderId,
      orderNumber,
      total,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Create order error:', error);
    return c.json({ success: false, message: 'Failed to create order' }, 500);
  }
});

// Get user orders API
app.get('/api/orders', async (c) => {
  try {
    const user = await getCurrentUser(c);
    if (!user) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    if (!isDatabaseAvailable(c)) {
      return c.json({ orders: [] });
    }

    const orders = await getOrdersByUserId(c, user.id);
    return c.json({ success: true, orders });

  } catch (error) {
    console.error('Get orders error:', error);
    return c.json({ success: false, message: 'Failed to fetch orders' }, 500);
  }
});

// Get single order API
app.get('/api/orders/:id', async (c) => {
  try {
    const user = await getCurrentUser(c);
    if (!user) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const orderId = parseInt(c.req.param('id'));
    const order: any = await getOrderWithItems(c, orderId);

    if (!order || order.user_id !== user.id) {
      return c.json({ success: false, message: 'Order not found' }, 404);
    }

    return c.json({ success: true, order });

  } catch (error) {
    console.error('Get order error:', error);
    return c.json({ success: false, message: 'Failed to fetch order' }, 500);
  }
});

// Razorpay payment verification API (placeholder for now)
app.post('/api/payment/verify', async (c) => {
  try {
    const user = await getCurrentUser(c);
    if (!user) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { orderId, paymentId, razorpayOrderId, razorpaySignature } = body;

    // TODO: Verify Razorpay signature
    // For now, mark order as paid
    if (isDatabaseAvailable(c)) {
      await updateOrderStatus(c, orderId, 'paid', paymentId);

      // Grant curriculum access for products in order
      const order: any = await getOrderWithItems(c, orderId);
      if (order && order.items) {
        for (const item of order.items) {
          await grantCurriculumAccess(c, user.id, item.product_id, orderId);
        }
      }
    }

    return c.json({
      success: true,
      message: 'Payment verified successfully'
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return c.json({ success: false, message: 'Payment verification failed' }, 500);
  }
});

// Check curriculum access API
app.get('/api/curriculum/access/:productId', async (c) => {
  try {
    const user = await getCurrentUser(c);
    if (!user) {
      return c.json({ hasAccess: false, message: 'Please login' }, 401);
    }

    const productId = parseInt(c.req.param('productId'));
    
    if (!isDatabaseAvailable(c)) {
      return c.json({ hasAccess: false, message: 'Service unavailable' }, 503);
    }

    const hasAccess = await hasCurriculumAccess(c, user.id, productId);

    return c.json({ hasAccess });

  } catch (error) {
    console.error('Check access error:', error);
    return c.json({ hasAccess: false, message: 'Error checking access' }, 500);
  }
});

// ==================== PROTECTED PAGES ====================

// Account Dashboard
app.get('/account', async (c) => {
  const user = await getCurrentUser(c);
  
  if (!user) {
    return c.redirect('/login?redirect=/account');
  }

  const orders = isDatabaseAvailable(c) ? await getOrdersByUserId(c, user.id) : [];

  const content = `
    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6 max-w-6xl">
            <div class="mb-8 flex items-center justify-between">
                <div>
                    <h1 class="text-5xl font-black mb-2">My Account</h1>
                    <p class="text-gray-600">Welcome back, ${user.name}!</p>
                </div>
                <button onclick="logout()" class="text-red-500 hover:text-red-700 font-semibold">
                    <i class="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Sidebar -->
                <div class="space-y-4">
                    <a href="/account" class="block bg-sky-500 text-white px-6 py-3 rounded-xl font-bold">
                        <i class="fas fa-user mr-2"></i>Dashboard
                    </a>
                    <a href="/account/orders" class="block bg-white border-2 border-gray-200 px-6 py-3 rounded-xl font-semibold hover:border-sky-500 transition">
                        <i class="fas fa-shopping-bag mr-2"></i>Orders
                    </a>
                    <a href="/account/curriculum" class="block bg-white border-2 border-gray-200 px-6 py-3 rounded-xl font-semibold hover:border-sky-500 transition">
                        <i class="fas fa-book mr-2"></i>Curriculum
                    </a>
                    <a href="/account/profile" class="block bg-white border-2 border-gray-200 px-6 py-3 rounded-xl font-semibold hover:border-sky-500 transition">
                        <i class="fas fa-cog mr-2"></i>Settings
                    </a>
                </div>

                <!-- Main Content -->
                <div class="md:col-span-2">
                    <div class="bg-white rounded-3xl p-8 shadow-lg mb-8">
                        <h2 class="text-2xl font-bold mb-6">Account Overview</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="bg-gray-50 p-6 rounded-2xl">
                                <i class="fas fa-shopping-cart text-sky-500 text-3xl mb-3"></i>
                                <div class="text-3xl font-black mb-1">${orders.length}</div>
                                <div class="text-gray-600">Total Orders</div>
                            </div>
                            <div class="bg-gray-50 p-6 rounded-2xl">
                                <i class="fas fa-book text-green-500 text-3xl mb-3"></i>
                                <div class="text-3xl font-black mb-1">0</div>
                                <div class="text-gray-600">Curriculum Access</div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-3xl p-8 shadow-lg">
                        <h2 class="text-2xl font-bold mb-6">Recent Orders</h2>
                        ${orders.length > 0 ? `
                            <div class="space-y-4">
                                ${orders.slice(0, 3).map((order: any) => `
                                    <div class="border-2 border-gray-200 rounded-xl p-4 hover:border-sky-500 transition">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <div class="font-bold">${order.order_number}</div>
                                                <div class="text-sm text-gray-600">${new Date(order.created_at).toLocaleDateString()}</div>
                                            </div>
                                            <div class="text-right">
                                                <div class="font-bold text-sky-500">₹${order.total.toLocaleString()}</div>
                                                <div class="text-sm">
                                                    <span class="px-3 py-1 rounded-full text-xs font-bold ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                                                        ${order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <p class="text-gray-500 text-center py-8">
                                No orders yet. <a href="/products" class="text-sky-500 hover:underline">Start shopping!</a>
                            </p>
                        `}
                    </div>
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
  `;

  return c.html(renderPage('My Account', content));
});

export default app
