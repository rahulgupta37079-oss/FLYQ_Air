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
    shortDesc: 'AI-powered camera drone with gesture control',
    features: ['HD 720p Camera', 'Gesture Control', 'Object Tracking', 'AI Processing', 'Autonomous Flight'],
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

// Docs placeholder
app.get('/docs', (c) => {
  const content = `
    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6 max-w-4xl text-center">
            <i class="fas fa-book text-sky-500 text-6xl mb-6"></i>
            <h1 class="text-5xl font-black mb-6">Documentation</h1>
            <p class="text-xl text-gray-600 mb-8">
                Comprehensive guides and tutorials for FLYQ drones
            </p>
            <p class="text-gray-600 mb-8">
                Access to full documentation and curriculum will be available after purchase and registration.
            </p>
            <a href="https://github.com/passion3d/flyq-air" class="btn-primary text-white px-8 py-4 rounded-full font-bold inline-flex items-center">
                <i class="fab fa-github mr-2"></i>
                View on GitHub
            </a>
        </div>
    </div>
  `;

  return c.html(renderPage('Documentation', content));
});

export default app
