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
            
            /* Floating Action Buttons */
            .floating-btn {
                position: fixed;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transition: all 0.3s ease;
                z-index: 1000;
                cursor: pointer;
            }
            
            .floating-btn:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 20px rgba(0,0,0,0.25);
            }
            
            #whatsapp-btn {
                bottom: 30px;
                right: 30px;
                background: #25D366;
                color: white;
            }
            
            #back-to-top {
                bottom: 100px;
                right: 30px;
                background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%);
                color: white;
                opacity: 0;
                pointer-events: none;
            }
            
            #back-to-top.show {
                opacity: 1;
                pointer-events: all;
            }
            
            /* Search Modal */
            #search-modal {
                backdrop-filter: blur(5px);
            }
            
            .search-result-item {
                transition: all 0.2s ease;
            }
            
            .search-result-item:hover {
                background: linear-gradient(to right, #f0f9ff, #e0f2fe);
                transform: translateX(5px);
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
                        <a href="/manual" class="text-gray-700 hover:text-sky-500 font-semibold">Manual</a>
                        <a href="/docs" class="text-gray-700 hover:text-sky-500 font-semibold">Docs</a>
                        <a href="/about" class="text-gray-700 hover:text-sky-500 font-semibold">About</a>
                        <a href="/contact" class="text-gray-700 hover:text-sky-500 font-semibold">Contact</a>
                        
                        <button onclick="openSearch()" class="text-gray-700 hover:text-sky-500">
                            <i class="fas fa-search text-xl"></i>
                        </button>
                        
                        ${includeCart ? `
                        <a href="/cart" class="relative">
                            <i class="fas fa-shopping-cart text-2xl text-gray-700 hover:text-sky-500"></i>
                            <span id="cart-count" class="cart-badge hidden">0</span>
                        </a>
                        ` : ''}
                        <div id="auth-buttons">
                            <a href="/login" class="text-sky-500 hover:text-sky-600 font-semibold">Login</a>
                            <a href="/register" class="btn-primary text-white px-6 py-2 rounded-full font-bold">Sign Up</a>
                        </div>
                        <div id="user-menu" class="hidden relative">
                            <button id="user-menu-button" class="flex items-center space-x-2 text-gray-700 hover:text-sky-500 font-semibold">
                                <i class="fas fa-user-circle text-2xl"></i>
                                <span id="user-name">Account</span>
                                <i class="fas fa-chevron-down text-sm"></i>
                            </button>
                            <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border-2 border-gray-200 py-2">
                                <a href="/account" class="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                                    <i class="fas fa-user mr-2"></i>My Account
                                </a>
                                <a href="/account/orders" class="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                                    <i class="fas fa-shopping-bag mr-2"></i>My Orders
                                </a>
                                <a href="/account/curriculum" class="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600">
                                    <i class="fas fa-book mr-2"></i>Curriculum
                                </a>
                                <hr class="my-2">
                                <button onclick="logout()" class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                                    <i class="fas fa-sign-out-alt mr-2"></i>Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    <button id="mobile-menu-btn" class="md:hidden text-2xl text-gray-700">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <!-- Mobile Menu -->
                <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 space-y-4">
                    <a href="/" class="block text-gray-700 hover:text-sky-500 font-semibold">Home</a>
                    <a href="/products" class="block text-gray-700 hover:text-sky-500 font-semibold">Products</a>
                    <a href="/manual" class="block text-gray-700 hover:text-sky-500 font-semibold">Manual</a>
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
        <!-- Floating Action Buttons -->
        <a href="https://wa.me/919137361474" target="_blank" id="whatsapp-btn" class="floating-btn" title="Chat on WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
        
        <button id="back-to-top" class="floating-btn" onclick="scrollToTop()" title="Back to top">
            <i class="fas fa-arrow-up"></i>
        </button>

        <!-- Search Modal -->
        <div id="search-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
            <div class="bg-white rounded-3xl p-8 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-3xl font-bold">Search</h2>
                    <button onclick="closeSearch()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <input type="text" id="search-input" 
                       placeholder="Search for products, pages, or documentation..." 
                       class="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none text-lg mb-6"
                       onkeyup="performSearch(this.value)">
                
                <div id="search-results" class="space-y-4">
                    <div class="text-center text-gray-500 py-8">
                        <i class="fas fa-search text-4xl mb-4"></i>
                        <p>Start typing to search...</p>
                    </div>
                </div>
            </div>
        </div>

        <footer class="bg-gray-900 text-white py-16 mt-20">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-5 gap-8 mb-12">
                    <!-- Brand Section -->
                    <div class="md:col-span-2">
                        <div class="flex items-center space-x-3 mb-4">
                            <i class="fas fa-drone text-sky-500 text-3xl"></i>
                            <span class="text-2xl font-black gradient-text">FLYQ</span>
                        </div>
                        <p class="text-gray-400 mb-6">Premium programmable drones for makers, developers, and educators. Open-source hardware and software for the next generation of drone innovation.</p>
                        
                        <!-- Social Links -->
                        <div class="flex space-x-4">
                            <a href="https://github.com/passion3d/flyq-air" target="_blank" class="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="https://wa.me/919137361474" target="_blank" class="w-10 h-10 bg-gray-800 hover:bg-green-500 rounded-full flex items-center justify-center transition">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                            <a href="mailto:info@passion3dworld.com" class="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a href="https://passion3dworld.com" target="_blank" class="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition">
                                <i class="fas fa-globe"></i>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Products -->
                    <div>
                        <h4 class="font-bold mb-4 text-sky-400 text-lg">Products</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/products/flyq-air" class="hover:text-white transition">FLYQ Air</a></li>
                            <li><a href="/products/flyq-vision" class="hover:text-white transition">FLYQ Vision</a></li>
                            <li><a href="/products" class="hover:text-white transition">All Products</a></li>
                            <li><a href="/cart" class="hover:text-white transition">Shopping Cart</a></li>
                        </ul>
                    </div>
                    
                    <!-- Resources -->
                    <div>
                        <h4 class="font-bold mb-4 text-sky-400 text-lg">Resources</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/manual" class="hover:text-white transition">User Manual</a></li>
                            <li><a href="/curriculum" class="hover:text-white transition">Curriculum</a></li>
                            <li><a href="/docs" class="hover:text-white transition">Documentation</a></li>
                            <li><a href="https://github.com/passion3d/flyq-air" target="_blank" class="hover:text-white transition">GitHub</a></li>
                            <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
                        </ul>
                    </div>
                    
                    <!-- Company & Support -->
                    <div>
                        <h4 class="font-bold mb-4 text-sky-400 text-lg">Company</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/about" class="hover:text-white transition">About Us</a></li>
                            <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
                            <li><a href="/account" class="hover:text-white transition">My Account</a></li>
                            <li><a href="https://passion3dworld.com" target="_blank" class="hover:text-white transition">Official Store</a></li>
                        </ul>
                        
                        <h4 class="font-bold mb-4 mt-6 text-sky-400 text-lg">Legal</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/privacy" class="hover:text-white transition">Privacy Policy</a></li>
                            <li><a href="/terms" class="hover:text-white transition">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Contact Info Bar -->
                <div class="border-t border-b border-gray-800 py-6 mb-8">
                    <div class="grid md:grid-cols-3 gap-6 text-center md:text-left">
                        <div class="flex items-center justify-center md:justify-start">
                            <i class="fas fa-envelope text-sky-500 mr-3"></i>
                            <div>
                                <div class="text-xs text-gray-500 uppercase">Email Us</div>
                                <a href="mailto:info@passion3dworld.com" class="text-gray-300 hover:text-sky-400 transition">info@passion3dworld.com</a>
                            </div>
                        </div>
                        <div class="flex items-center justify-center md:justify-start">
                            <i class="fas fa-phone text-sky-500 mr-3"></i>
                            <div>
                                <div class="text-xs text-gray-500 uppercase">Call Us</div>
                                <a href="tel:+919137361474" class="text-gray-300 hover:text-sky-400 transition">+91 9137361474</a>
                            </div>
                        </div>
                        <div class="flex items-center justify-center md:justify-start">
                            <i class="fas fa-map-marker-alt text-sky-500 mr-3"></i>
                            <div>
                                <div class="text-xs text-gray-500 uppercase">Location</div>
                                <div class="text-gray-300">Mumbai, India</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Copyright -->
                <div class="text-center text-gray-400 text-sm">
                    <p class="mb-2">&copy; 2025 FLYQ by Passion3D World. All rights reserved.</p>
                    <p class="text-xs text-gray-500">Open-source hardware and software for drone education and innovation.</p>
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

            // Authentication check and user menu
            async function checkAuth() {
                try {
                    const response = await fetch('/api/auth/status');
                    const data = await response.json();
                    
                    const authButtons = document.getElementById('auth-buttons');
                    const userMenu = document.getElementById('user-menu');
                    const userName = document.getElementById('user-name');
                    
                    if (data.authenticated && data.user) {
                        // User is logged in - show user menu
                        authButtons.classList.add('hidden');
                        userMenu.classList.remove('hidden');
                        if (userName) {
                            userName.textContent = data.user.name.split(' ')[0]; // First name only
                        }
                    } else {
                        // User not logged in - show login/signup buttons
                        authButtons.classList.remove('hidden');
                        userMenu.classList.add('hidden');
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                }
            }

            // User menu dropdown toggle
            const userMenuButton = document.getElementById('user-menu-button');
            const userDropdown = document.getElementById('user-dropdown');
            if (userMenuButton && userDropdown) {
                userMenuButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    userDropdown.classList.toggle('hidden');
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', () => {
                    userDropdown.classList.add('hidden');
                });
                
                userDropdown.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }

            // Logout function
            async function logout() {
                try {
                    const response = await fetch('/api/auth/logout', {
                        method: 'POST'
                    });
                    const data = await response.json();
                    
                    if (data.success) {
                        window.location.href = '/';
                    }
                } catch (error) {
                    console.error('Logout failed:', error);
                    window.location.href = '/';
                }
            }

            // Check authentication on page load
            document.addEventListener('DOMContentLoaded', checkAuth);

            // Back to top button
            const backToTop = document.getElementById('back-to-top');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });

            function scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            // Search functionality
            const searchData = [
                { title: 'FLYQ Air', url: '/products/flyq-air', type: 'Product', description: 'Programmable ESP32-S3 quadcopter drone' },
                { title: 'FLYQ Vision', url: '/products/flyq-vision', type: 'Product', description: 'AI-powered camera drone with computer vision' },
                { title: 'Products', url: '/products', type: 'Page', description: 'Browse all drone products' },
                { title: 'User Manual', url: '/manual', type: 'Documentation', description: 'Complete hardware and software guide' },
                { title: 'Contact Us', url: '/contact', type: 'Page', description: 'Get in touch with our team' },
                { title: 'About', url: '/about', type: 'Page', description: 'Learn about FLYQ drones' },
                { title: 'Documentation', url: '/docs', type: 'Documentation', description: 'Technical documentation' },
                { title: 'Shopping Cart', url: '/cart', type: 'Page', description: 'View your cart' },
                { title: 'Curriculum', url: '/curriculum', type: 'Education', description: '8-week drone programming course' },
                { title: 'Login', url: '/login', type: 'Account', description: 'Sign in to your account' },
                { title: 'Register', url: '/register', type: 'Account', description: 'Create a new account' }
            ];

            function openSearch() {
                document.getElementById('search-modal').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('search-input').focus();
                }, 100);
            }

            function closeSearch() {
                document.getElementById('search-modal').classList.add('hidden');
                document.getElementById('search-input').value = '';
                document.getElementById('search-results').innerHTML = \`
                    <div class="text-center text-gray-500 py-8">
                        <i class="fas fa-search text-4xl mb-4"></i>
                        <p>Start typing to search...</p>
                    </div>
                \`;
            }

            // Close search on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeSearch();
                }
            });

            // Close search when clicking outside
            const searchModal = document.getElementById('search-modal');
            if (searchModal) {
                searchModal.addEventListener('click', (e) => {
                    if (e.target.id === 'search-modal') {
                        closeSearch();
                    }
                });
            }

            function performSearch(query) {
                const resultsDiv = document.getElementById('search-results');
                
                if (!query || query.trim().length < 2) {
                    resultsDiv.innerHTML = \`
                        <div class="text-center text-gray-500 py-8">
                            <i class="fas fa-search text-4xl mb-4"></i>
                            <p>Start typing to search...</p>
                        </div>
                    \`;
                    return;
                }

                const results = searchData.filter(item => 
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.description.toLowerCase().includes(query.toLowerCase())
                );

                if (results.length === 0) {
                    resultsDiv.innerHTML = \`
                        <div class="text-center text-gray-500 py-8">
                            <i class="fas fa-search-minus text-4xl mb-4"></i>
                            <p>No results found for "\${query}"</p>
                            <p class="text-sm mt-2">Try different keywords</p>
                        </div>
                    \`;
                    return;
                }

                resultsDiv.innerHTML = results.map(item => \`
                    <a href="\${item.url}" class="search-result-item block p-4 border-2 border-gray-200 rounded-xl hover:border-sky-500">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <span class="text-xs px-2 py-1 bg-sky-100 text-sky-700 rounded-full font-bold">\${item.type}</span>
                                    <h3 class="font-bold text-lg">\${item.title}</h3>
                                </div>
                                <p class="text-gray-600 text-sm">\${item.description}</p>
                            </div>
                            <i class="fas fa-arrow-right text-sky-500 ml-4 mt-2"></i>
                        </div>
                    </a>
                \`).join('');
            }
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

        <!-- FAQ Section -->
        <section class="py-20 bg-white">
            <div class="container mx-auto px-6 max-w-4xl">
                <div class="text-center mb-12">
                    <h2 class="text-5xl font-black mb-6">Frequently Asked <span class="gradient-text">Questions</span></h2>
                    <p class="text-xl text-gray-600">Everything you need to know about FLYQ drones</p>
                </div>

                <div class="space-y-4">
                    <div class="border-2 border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFAQ(1)" class="w-full text-left p-6 hover:bg-gray-50 transition flex justify-between items-center">
                            <span class="font-bold text-lg">What programming languages can I use?</span>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-1"></i>
                        </button>
                        <div id="faq-content-1" class="hidden p-6 pt-0 text-gray-600">
                            FLYQ Air supports MicroPython, Arduino C/C++, and ESP-IDF. You can choose the language that best fits your skill level and project requirements.
                        </div>
                    </div>

                    <div class="border-2 border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFAQ(2)" class="w-full text-left p-6 hover:bg-gray-50 transition flex justify-between items-center">
                            <span class="font-bold text-lg">Do I need prior drone experience?</span>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-2"></i>
                        </button>
                        <div id="faq-content-2" class="hidden p-6 pt-0 text-gray-600">
                            No prior experience needed! We provide a complete 8-week curriculum that takes you from basics to advanced autonomous flight programming.
                        </div>
                    </div>

                    <div class="border-2 border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFAQ(3)" class="w-full text-left p-6 hover:bg-gray-50 transition flex justify-between items-center">
                            <span class="font-bold text-lg">What's included in the kit?</span>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-3"></i>
                        </button>
                        <div id="faq-content-3" class="hidden p-6 pt-0 text-gray-600">
                            Complete assembled quadcopter, ESP32-S3 flight controller, battery, charger, propeller guards, comprehensive manual, and access to our online curriculum.
                        </div>
                    </div>

                    <div class="border-2 border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFAQ(4)" class="w-full text-left p-6 hover:bg-gray-50 transition flex justify-between items-center">
                            <span class="font-bold text-lg">How long does shipping take?</span>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-4"></i>
                        </button>
                        <div id="faq-content-4" class="hidden p-6 pt-0 text-gray-600">
                            We ship within India via courier services. Delivery typically takes 3-7 business days depending on your location.
                        </div>
                    </div>

                    <div class="border-2 border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFAQ(5)" class="w-full text-left p-6 hover:bg-gray-50 transition flex justify-between items-center">
                            <span class="font-bold text-lg">What warranty and support do you offer?</span>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-5"></i>
                        </button>
                        <div id="faq-content-5" class="hidden p-6 pt-0 text-gray-600">
                            6-month hardware warranty on manufacturing defects. We provide email and WhatsApp support, plus an active GitHub community for troubleshooting.
                        </div>
                    </div>

                    <div class="border-2 border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFAQ(6)" class="w-full text-left p-6 hover:bg-gray-50 transition flex justify-between items-center">
                            <span class="font-bold text-lg">Can I use it for educational workshops?</span>
                            <i class="fas fa-chevron-down transition-transform" id="faq-icon-6"></i>
                        </button>
                        <div id="faq-content-6" class="hidden p-6 pt-0 text-gray-600">
                            Absolutely! We offer bulk discounts for educational institutions. Contact us for special pricing and dedicated support for classroom use.
                        </div>
                    </div>
                </div>

                <div class="text-center mt-12">
                    <p class="text-gray-600 mb-4">Still have questions?</p>
                    <a href="/contact" class="btn-primary text-white px-8 py-3 rounded-full font-bold inline-block">
                        Contact Support
                    </a>
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <section class="py-20 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
            <div class="container mx-auto px-6 max-w-4xl text-center">
                <i class="fas fa-envelope-open-text text-6xl mb-6 opacity-80"></i>
                <h2 class="text-5xl font-black mb-6">Stay Updated</h2>
                <p class="text-xl mb-8 opacity-90">
                    Get the latest drone tutorials, project ideas, and product updates delivered to your inbox
                </p>

                <div id="newsletter-success" class="hidden mb-6 bg-green-500 text-white p-4 rounded-xl">
                    <i class="fas fa-check-circle mr-2"></i>
                    <span>Thank you for subscribing!</span>
                </div>
                <div id="newsletter-error" class="hidden mb-6 bg-red-500 text-white p-4 rounded-xl">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    <span id="newsletter-error-text">Something went wrong. Please try again.</span>
                </div>

                <form id="newsletter-form" class="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
                    <input type="email" id="newsletter-email" placeholder="Enter your email" 
                           class="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/50" required>
                    <button type="submit" class="bg-white text-sky-600 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition">
                        Subscribe
                    </button>
                </form>

                <p class="text-sm mt-6 opacity-75">
                    We respect your privacy. Unsubscribe at any time.
                </p>

                <script>
                    document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
                        e.preventDefault();
                        
                        const email = document.getElementById('newsletter-email').value;
                        const successDiv = document.getElementById('newsletter-success');
                        const errorDiv = document.getElementById('newsletter-error');
                        const submitBtn = e.target.querySelector('button[type="submit"]');
                        
                        successDiv.classList.add('hidden');
                        errorDiv.classList.add('hidden');
                        
                        submitBtn.disabled = true;
                        submitBtn.textContent = 'Subscribing...';
                        
                        try {
                            const response = await fetch('/api/newsletter/subscribe', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email })
                            });
                            
                            const data = await response.json();
                            
                            if (data.success) {
                                successDiv.classList.remove('hidden');
                                e.target.reset();
                            } else {
                                document.getElementById('newsletter-error-text').textContent = data.message;
                                errorDiv.classList.remove('hidden');
                            }
                        } catch (error) {
                            errorDiv.classList.remove('hidden');
                        } finally {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Subscribe';
                        }
                    });

                    function toggleFAQ(id) {
                        const content = document.getElementById('faq-content-' + id);
                        const icon = document.getElementById('faq-icon-' + id);
                        
                        content.classList.toggle('hidden');
                        icon.classList.toggle('rotate-180');
                    }
                </script>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="py-20 bg-gray-50">
            <div class="container mx-auto px-6">
                <div class="text-center mb-12">
                    <h2 class="text-5xl font-black mb-6">What Our <span class="gradient-text">Community</span> Says</h2>
                    <p class="text-xl text-gray-600">Join hundreds of makers and developers building with FLYQ</p>
                </div>

                <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div class="bg-white p-8 rounded-3xl shadow-lg">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                        </div>
                        <p class="text-gray-700 mb-4">
                            "The curriculum is outstanding! Went from zero drone knowledge to building autonomous navigation systems in 8 weeks."
                        </p>
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                P
                            </div>
                            <div>
                                <div class="font-bold">Priya Sharma</div>
                                <div class="text-sm text-gray-500">Computer Science Student</div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-8 rounded-3xl shadow-lg">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                        </div>
                        <p class="text-gray-700 mb-4">
                            "Perfect for my robotics workshop! The ESP32-S3 platform is powerful and the documentation is comprehensive."
                        </p>
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                R
                            </div>
                            <div>
                                <div class="font-bold">Rajesh Kumar</div>
                                <div class="text-sm text-gray-500">Robotics Instructor</div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-8 rounded-3xl shadow-lg">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                            <i class="fas fa-star text-yellow-400 text-xl"></i>
                        </div>
                        <p class="text-gray-700 mb-4">
                            "Open-source hardware and software is a game-changer. I've customized everything for my research project!"
                        </p>
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                A
                            </div>
                            <div>
                                <div class="font-bold">Anita Desai</div>
                                <div class="text-sm text-gray-500">PhD Researcher</div>
                            </div>
                        </div>
                    </div>
                </div>
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

                <div id="error-message" class="hidden mb-4 p-4 bg-red-100 text-red-700 rounded-xl"></div>
                <div id="success-message" class="hidden mb-4 p-4 bg-green-100 text-green-700 rounded-xl"></div>

                <form id="loginForm" class="space-y-6">
                    <div>
                        <label class="block text-sm font-bold mb-2">Email</label>
                        <input type="email" id="email" name="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="your@email.com" required>
                    </div>

                    <div>
                        <label class="block text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password" name="password" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="••••••••" required>
                    </div>

                    <div class="flex items-center justify-between text-sm">
                        <label class="flex items-center">
                            <input type="checkbox" id="remember" class="mr-2">
                            <span>Remember me</span>
                        </label>
                        <a href="/forgot-password" class="text-sky-500 hover:text-sky-600 font-semibold">Forgot password?</a>
                    </div>

                    <button type="submit" class="w-full btn-primary text-white px-8 py-4 rounded-full font-bold text-lg">
                        Sign In
                    </button>
                </form>

                <script>
                    document.getElementById('loginForm').addEventListener('submit', async (e) => {
                        e.preventDefault();
                        
                        const email = document.getElementById('email').value;
                        const password = document.getElementById('password').value;
                        const errorDiv = document.getElementById('error-message');
                        const successDiv = document.getElementById('success-message');
                        
                        // Hide previous messages
                        errorDiv.classList.add('hidden');
                        successDiv.classList.add('hidden');
                        
                        try {
                            const response = await fetch('/api/auth/login', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email, password })
                            });
                            
                            const data = await response.json();
                            
                            if (data.success) {
                                successDiv.textContent = data.message || 'Login successful! Redirecting...';
                                successDiv.classList.remove('hidden');
                                setTimeout(() => {
                                    window.location.href = data.redirect || '/account';
                                }, 1000);
                            } else {
                                errorDiv.textContent = data.message;
                                errorDiv.classList.remove('hidden');
                            }
                        } catch (error) {
                            errorDiv.textContent = 'Login failed. Please try again.';
                            errorDiv.classList.remove('hidden');
                        }
                    });
                </script>

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

                <div id="error-message" class="hidden mb-4 p-4 bg-red-100 text-red-700 rounded-xl"></div>
                
                <form id="registerForm" class="space-y-6">
                    <div>
                        <label class="block text-sm font-bold mb-2">Full Name</label>
                        <input type="text" id="name" name="name" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="John Doe" required>
                    </div>

                    <div>
                        <label class="block text-sm font-bold mb-2">Email</label>
                        <input type="email" id="email" name="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="your@email.com" required>
                    </div>

                    <div>
                        <label class="block text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password" name="password" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="••••••••" required>
                    </div>

                    <div>
                        <label class="block text-sm font-bold mb-2">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="••••••••" required>
                    </div>

                    <button type="submit" class="w-full btn-primary text-white px-8 py-4 rounded-full font-bold text-lg">
                        Create Account
                    </button>
                </form>

                <script>
                    document.getElementById('registerForm').addEventListener('submit', async (e) => {
                        e.preventDefault();
                        
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const password = document.getElementById('password').value;
                        const confirmPassword = document.getElementById('confirmPassword').value;
                        const errorDiv = document.getElementById('error-message');
                        
                        try {
                            const response = await fetch('/api/auth/register', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name, email, password, confirmPassword })
                            });
                            
                            const data = await response.json();
                            
                            if (data.success) {
                                window.location.href = data.redirect || '/account';
                            } else {
                                errorDiv.textContent = data.message;
                                errorDiv.classList.remove('hidden');
                            }
                        } catch (error) {
                            errorDiv.textContent = 'Registration failed. Please try again.';
                            errorDiv.classList.remove('hidden');
                        }
                    });
                </script>

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
// Manual page - Complete Technical Guide
app.get('/manual', (c) => {
  const content = `
    <div class="pt-20 pb-20 bg-gray-50">
        <!-- Hero Banner with Image -->
        <section class="bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 text-white py-16">
            <div class="container mx-auto px-6">
                <div class="max-w-6xl mx-auto">
                    <!-- Banner Image -->
                    <div class="mb-8">
                        <img src="https://circuitdigest.com/sites/default/files/Litewing%20Wiki%20Banner-01.png" 
                             alt="FLYQ ESP32-S3 Drone Banner" 
                             class="w-full rounded-2xl shadow-2xl">
                    </div>
                    
                    <h1 class="text-6xl font-black mb-4">FLYQ - ESP32-S3 Based Programmable Drone</h1>
                    <p class="text-2xl mb-6 text-sky-100">
                        For Makers, Developers, and Educators
                    </p>
                    <p class="text-lg text-white/90 max-w-4xl leading-relaxed">
                        FLYQ is a fully programmable nano drone platform built around the powerful ESP32-S3 microcontroller. 
                        Designed specifically for education, research, and hobbyist development, FLYQ combines professional-grade 
                        hardware with an accessible programming interface. Whether you're learning robotics, developing autonomous 
                        systems, or teaching drone technology, FLYQ provides the perfect platform.
                    </p>
                </div>
            </div>
        </section>

        <!-- Video Demo Section -->
        <section class="py-12 bg-white">
            <div class="container mx-auto px-6 max-w-4xl">
                <div class="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl aspect-video flex items-center justify-center">
                    <div class="text-white text-center p-8">
                        <i class="fas fa-play-circle text-6xl mb-4 text-sky-400"></i>
                        <p class="text-xl">Demo Video Available</p>
                        <p class="text-sm text-gray-400 mt-2">Watch FLYQ in action on our YouTube channel</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Introduction -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-6 max-w-6xl">
                <div class="prose prose-lg max-w-none">
                    <h2 class="text-4xl font-black mb-6">Introduction to FLYQ</h2>
                    <p class="text-lg text-gray-700 leading-relaxed mb-4">
                        FLYQ represents the next generation of educational drone platforms. Built on the ESP32-S3 dual-core processor, 
                        it offers unparalleled flexibility for programming in multiple environments including Arduino IDE, Python, and 
                        ESP-IDF. The platform is fully compatible with CrazyFlie firmware and SDK, allowing access to a vast ecosystem 
                        of existing code, libraries, and community projects.
                    </p>
                    <p class="text-lg text-gray-700 leading-relaxed mb-4">
                        Unlike traditional drones that require expensive radio controllers, FLYQ uses WiFi for control and programming. 
                        This means you can fly it using any smartphone, tablet, or computer with a web browser. The built-in web interface 
                        provides real-time telemetry, motor testing, IMU calibration, and flight control - all without installing any apps.
                    </p>
                    <p class="text-lg text-gray-700 leading-relaxed">
                        The hardware is designed with education in mind. All design files, schematics, and firmware are available, 
                        making FLYQ perfect for learning embedded systems, control theory, and robotics. The modular PCB-based frame 
                        eliminates the need for 3D printed parts, while the 24-pin expansion header allows adding sensors and modules 
                        for advanced projects.
                    </p>
                </div>
            </div>
        </section>

        <!-- Specifications -->
        <section id="specifications" class="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-12">Technical Specifications</h2>
                
                <!-- Specs and Modules Overview Image -->
                <div class="mb-12">
                    <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-Image-with-Specs-and-Modules.png" 
                         alt="FLYQ Specifications and Modules Overview" 
                         class="w-full rounded-2xl shadow-2xl">
                </div>
                
                <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-sky-200">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gradient-to-r from-sky-500 to-blue-600">
                                <th class="text-left p-6 text-white text-xl font-bold">Component</th>
                                <th class="text-left p-6 text-white text-xl font-bold">Specification</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Microcontroller</td>
                                <td class="p-6 text-gray-700">ESP32-S3 Dual-Core Xtensa LX7 @ 240MHz</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Memory</td>
                                <td class="p-6 text-gray-700">512KB SRAM, 4MB Flash, 8MB PSRAM (Vision only)</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">IMU Sensor</td>
                                <td class="p-6 text-gray-700">MPU6050 6-axis (3-axis Gyroscope + 3-axis Accelerometer)</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Motors</td>
                                <td class="p-6 text-gray-700">4x 716 Brushless Coreless Motors (38,000 RPM max)</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Propellers</td>
                                <td class="p-6 text-gray-700">45mm diameter (2x CW + 2x CCW), Spare set included</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Battery</td>
                                <td class="p-6 text-gray-700">3.7V 600mAh LiPo (Air) / 800mAh (Vision)</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Charging</td>
                                <td class="p-6 text-gray-700">USB-C, TP4056 charge controller, 45-60 min charge time</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Connectivity</td>
                                <td class="p-6 text-gray-700">WiFi 802.11 b/g/n (2.4GHz), Bluetooth 5.0 LE</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Programming</td>
                                <td class="p-6 text-gray-700">USB-C (CH340K UART), Arduino IDE, Python, ESP-IDF</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Flight Time</td>
                                <td class="p-6 text-gray-700">8-10 minutes (depends on flying style)</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Range</td>
                                <td class="p-6 text-gray-700">50m WiFi (line of sight)</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Weight</td>
                                <td class="p-6 text-gray-700">35g (Air) / 38g (Vision) with battery</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Dimensions</td>
                                <td class="p-6 text-gray-700">92mm x 92mm x 20mm (motor to motor)</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Expansion</td>
                                <td class="p-6 text-gray-700">24-pin header (I²C, SPI, UART, GPIO, ADC, DAC, PWM)</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Indicators</td>
                                <td class="p-6 text-gray-700">Power LED (Red), Status LED (Blue), Charging LED (Green/Red)</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Camera</td>
                                <td class="p-6 text-gray-700">HD 720p @ 30fps (Vision model only)</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="p-6 font-bold text-gray-800">Optional Sensors</td>
                                <td class="p-6 text-gray-700">VL53L1X ToF, MS5611 Barometer, PMW3901 Optical Flow</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Basic Hardware Overview -->
        <section id="hardware" class="py-20 bg-white">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-16">Basic Hardware Overview</h2>

                <!-- ESP32-S3 MCU -->
                <div class="mb-16">
                    <div class="bg-gradient-to-br from-blue-50 to-sky-50 p-10 rounded-3xl border-2 border-blue-200">
                        <!-- ESP32-S3 Module Image -->
                        <div class="mb-6">
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/ESP32-S3-Module.png" 
                                 alt="ESP32-S3 Module Closeup" 
                                 class="w-full max-w-2xl mx-auto rounded-xl shadow-lg">
                        </div>
                        
                        <h3 class="text-3xl font-bold mb-6 text-blue-800">
                            <i class="fas fa-brain mr-3"></i>ESP32-S3 Microcontroller
                        </h3>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            At the heart of FLYQ is the ESP32-S3, a powerful dual-core processor specifically designed for IoT and 
                            embedded applications. With two Xtensa LX7 cores running at up to 240MHz, the ESP32-S3 provides more than 
                            enough processing power for flight control, sensor fusion, and wireless communication simultaneously.
                        </p>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-blue-700">Processing Power</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Dual-core 32-bit Xtensa LX7 CPU</li>
                                    <li>• Up to 240 MHz clock frequency</li>
                                    <li>• Hardware FPU for fast calculations</li>
                                    <li>• Vector instructions for AI acceleration</li>
                                    <li>• Ultra-low-power coprocessor</li>
                                </ul>
                            </div>
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-blue-700">Wireless Capabilities</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• WiFi 802.11 b/g/n (2.4GHz)</li>
                                    <li>• Bluetooth 5.0 with LE</li>
                                    <li>• Long range Bluetooth mode</li>
                                    <li>• Integrated antenna with U.FL option</li>
                                    <li>• WPA2/WPA3 security support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MPU6050 IMU -->
                <div class="mb-16">
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-3xl border-2 border-green-200">
                        <!-- MPU6050 Image -->
                        <div class="mb-6">
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-MPU6050-Close-Up.png" 
                                 alt="MPU6050 IMU Sensor Closeup" 
                                 class="w-full max-w-2xl mx-auto rounded-xl shadow-lg">
                        </div>
                        
                        <h3 class="text-3xl font-bold mb-6 text-green-800">
                            <i class="fas fa-compass mr-3"></i>MPU6050 6-Axis IMU
                        </h3>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            The MPU6050 is a 6-axis motion tracking device that combines a 3-axis gyroscope and 3-axis accelerometer 
                            on the same silicon die. This sensor is critical for stable flight, providing real-time orientation data 
                            that the flight controller uses to maintain balance and respond to control inputs.
                        </p>
                        <div class="grid md:grid-cols-3 gap-6">
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-green-700">Gyroscope</h4>
                                <ul class="space-y-2 text-gray-700 text-sm">
                                    <li>• 3-axis angular velocity</li>
                                    <li>• ±250, ±500, ±1000, ±2000°/s</li>
                                    <li>• 16-bit ADC resolution</li>
                                    <li>• Internal temperature sensor</li>
                                </ul>
                            </div>
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-green-700">Accelerometer</h4>
                                <ul class="space-y-2 text-gray-700 text-sm">
                                    <li>• 3-axis linear acceleration</li>
                                    <li>• ±2g, ±4g, ±8g, ±16g ranges</li>
                                    <li>• 16-bit ADC resolution</li>
                                    <li>• Low-pass filter included</li>
                                </ul>
                            </div>
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-green-700">Interface</h4>
                                <ul class="space-y-2 text-gray-700 text-sm">
                                    <li>• I²C communication (400kHz)</li>
                                    <li>• Digital Motion Processor (DMP)</li>
                                    <li>• Hardware FIFO buffer</li>
                                    <li>• Interrupt output pin</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- USB Programming Interface -->
                <div class="mb-16">
                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-10 rounded-3xl border-2 border-purple-200">
                        <!-- CH340 and Programming Circuit Image -->
                        <div class="mb-6">
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Close-up-ch340-2n7002DW-area-LiteWing.png" 
                                 alt="CH340 USB-UART Bridge and Auto-Reset Circuit" 
                                 class="w-full max-w-2xl mx-auto rounded-xl shadow-lg">
                        </div>
                        
                        <h3 class="text-3xl font-bold mb-6 text-purple-800">
                            <i class="fas fa-usb mr-3"></i>USB-C Programming Interface
                        </h3>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            FLYQ uses a USB-C connector for both programming and charging. The CH340K USB-to-UART bridge provides 
                            reliable communication with your computer, supporting automatic bootloader activation for seamless firmware 
                            uploads. No need to press reset buttons - just click upload in your IDE.
                        </p>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-purple-700">Features</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• USB-C connector (reversible)</li>
                                    <li>• CH340K UART bridge IC</li>
                                    <li>• Auto-reset circuit (DTR/RTS)</li>
                                    <li>• USB 2.0 Full Speed (12 Mbps)</li>
                                    <li>• Cross-platform driver support</li>
                                </ul>
                            </div>
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-purple-700">Compatible Software</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Arduino IDE (ESP32 boards)</li>
                                    <li>• ESP-IDF (official framework)</li>
                                    <li>• PlatformIO IDE</li>
                                    <li>• Wrangler (flashing tool)</li>
                                    <li>• Serial monitors & debuggers</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PCB Frame Design -->
                <div class="mb-16">
                    <div class="bg-gradient-to-br from-orange-50 to-amber-50 p-10 rounded-3xl border-2 border-orange-200">
                        <!-- PCB Frame Closeup Image -->
                        <div class="mb-6">
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Drone-PCB-Closeup-and-Starp-Hole.png" 
                                 alt="FLYQ PCB Frame and Strap Mounting Holes" 
                                 class="w-full max-w-2xl mx-auto rounded-xl shadow-lg">
                        </div>
                        
                        <h3 class="text-3xl font-bold mb-6 text-orange-800">
                            <i class="fas fa-layer-group mr-3"></i>PCB Frame & Mechanical Design
                        </h3>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            FLYQ uses a 4-layer PCB as its main frame, eliminating the need for 3D printed or carbon fiber parts. 
                            This approach makes the drone more durable, easier to manufacture, and keeps costs down. The PCB itself 
                            contains all the electronics, with motor mounts integrated directly into the board.
                        </p>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-orange-700">PCB Construction</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• 4-layer FR4 PCB (1.6mm thick)</li>
                                    <li>• ENIG surface finish (gold plating)</li>
                                    <li>• 92mm x 92mm main board</li>
                                    <li>• Integrated motor mounting pads</li>
                                    <li>• Through-hole vias for strength</li>
                                </ul>
                            </div>
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-orange-700">Advantages</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• No 3D printing required</li>
                                    <li>• More durable than plastic frames</li>
                                    <li>• Integrated electronics and structure</li>
                                    <li>• Easy to repair (replace board)</li>
                                    <li>• Professional appearance</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Power Management -->
                <div class="mb-16">
                    <div class="bg-gradient-to-br from-yellow-50 to-amber-50 p-10 rounded-3xl border-2 border-yellow-200">
                        <!-- Power Management Components Image -->
                        <div class="mb-6">
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/tp4056-ldo-and-USB-Connector.png" 
                                 alt="TP4056 Battery Charger, LDO Regulator, and USB-C Connector" 
                                 class="w-full max-w-2xl mx-auto rounded-xl shadow-lg">
                        </div>
                        
                        <h3 class="text-3xl font-bold mb-6 text-yellow-800">
                            <i class="fas fa-battery-full mr-3"></i>Power Management System
                        </h3>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            FLYQ's power system is designed for safety and convenience. The TP4056 charge controller handles LiPo 
                            battery charging with automatic termination and protection. A low-dropout regulator (LDO) provides clean 
                            3.3V power to the ESP32 and sensors, while the motors run directly from battery voltage for maximum efficiency.
                        </p>
                        <div class="grid md:grid-cols-3 gap-6">
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-yellow-700">Battery Charging</h4>
                                <ul class="space-y-2 text-gray-700 text-sm">
                                    <li>• TP4056 charge controller</li>
                                    <li>• 500mA charging current</li>
                                    <li>• 4.2V charge termination</li>
                                    <li>• Over-charge protection</li>
                                    <li>• Charge status LED</li>
                                </ul>
                            </div>
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-yellow-700">Voltage Regulation</h4>
                                <ul class="space-y-2 text-gray-700 text-sm">
                                    <li>• 3.3V LDO regulator</li>
                                    <li>• 600mA output current</li>
                                    <li>• Low dropout (300mV)</li>
                                    <li>• Powers MCU & sensors</li>
                                    <li>• Thermal shutdown protection</li>
                                </ul>
                            </div>
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-yellow-700">Battery Protection</h4>
                                <ul class="space-y-2 text-gray-700 text-sm">
                                    <li>• Over-discharge protection</li>
                                    <li>• Short-circuit protection</li>
                                    <li>• Over-current protection</li>
                                    <li>• Temperature monitoring</li>
                                    <li>• Power switch included</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Motor Drivers -->
                <div class="mb-16">
                    <div class="bg-gradient-to-br from-red-50 to-pink-50 p-10 rounded-3xl border-2 border-red-200">
                        <!-- Motor Driver Image -->
                        <div class="mb-6">
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-Motor-Driver.png" 
                                 alt="MOSFET-Based Motor Driver Circuit" 
                                 class="w-full max-w-2xl mx-auto rounded-xl shadow-lg">
                        </div>
                        
                        <h3 class="text-3xl font-bold mb-6 text-red-800">
                            <i class="fas fa-fan mr-3"></i>Motor Driver System
                        </h3>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            Each of the four motors is controlled by a dedicated MOSFET-based driver circuit. These drivers receive 
                            PWM signals from the ESP32 and modulate the motor power accordingly. The brushless coreless motors provide 
                            excellent thrust-to-weight ratio while maintaining efficiency for longer flight times.
                        </p>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-red-700">Driver Specifications</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• 4x independent motor channels</li>
                                    <li>• N-channel MOSFET switching</li>
                                    <li>• PWM frequency: 8kHz</li>
                                    <li>• Direct battery voltage output</li>
                                    <li>• Flyback diode protection</li>
                                </ul>
                            </div>
                            <div class="bg-white p-6 rounded-xl shadow">
                                <h4 class="font-bold text-lg mb-3 text-red-700">Motor Specifications</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• 716 brushless coreless type</li>
                                    <li>• Operating voltage: 3.7V</li>
                                    <li>• Max RPM: 38,000</li>
                                    <li>• Thrust: ~3.5g per motor</li>
                                    <li>• Current: ~1A per motor (max)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Status LEDs -->
                <div class="mb-16">
                    <div class="bg-gradient-to-br from-indigo-50 to-purple-50 p-10 rounded-3xl border-2 border-indigo-200">
                        <!-- Status LEDs Image -->
                        <div class="mb-6">
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LEDs-close-Up-shots.png" 
                                 alt="Status LEDs Closeup - Power, WiFi, and Charging Indicators" 
                                 class="w-full max-w-2xl mx-auto rounded-xl shadow-lg">
                        </div>
                        
                        <h3 class="text-3xl font-bold mb-6 text-indigo-800">
                            <i class="fas fa-lightbulb mr-3"></i>Status & Debugging Indicators
                        </h3>
                        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                            FLYQ includes three status LEDs to provide visual feedback about the drone's operational state. These 
                            indicators help with debugging, show charging status, and confirm that the drone is ready to fly.
                        </p>
                        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <table class="w-full">
                                <thead>
                                    <tr class="bg-indigo-600 text-white">
                                        <th class="p-4 text-left">LED</th>
                                        <th class="p-4 text-left">Color</th>
                                        <th class="p-4 text-left">Status</th>
                                        <th class="p-4 text-left">Meaning</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    <tr class="hover:bg-gray-50">
                                        <td class="p-4 font-bold">Power LED</td>
                                        <td class="p-4"><span class="inline-block w-4 h-4 rounded-full bg-red-500"></span> Red</td>
                                        <td class="p-4">ON</td>
                                        <td class="p-4">Drone is powered on</td>
                                    </tr>
                                    <tr class="hover:bg-gray-50">
                                        <td class="p-4 font-bold">Status LED</td>
                                        <td class="p-4"><span class="inline-block w-4 h-4 rounded-full bg-blue-500"></span> Blue</td>
                                        <td class="p-4">Slow Blink</td>
                                        <td class="p-4">Waiting for WiFi connection</td>
                                    </tr>
                                    <tr class="hover:bg-gray-50">
                                        <td class="p-4 font-bold">Status LED</td>
                                        <td class="p-4"><span class="inline-block w-4 h-4 rounded-full bg-blue-500"></span> Blue</td>
                                        <td class="p-4">Fast Blink</td>
                                        <td class="p-4">Connected to WiFi</td>
                                    </tr>
                                    <tr class="hover:bg-gray-50">
                                        <td class="p-4 font-bold">Status LED</td>
                                        <td class="p-4"><span class="inline-block w-4 h-4 rounded-full bg-blue-500"></span> Blue</td>
                                        <td class="p-4">Solid ON</td>
                                        <td class="p-4">Ready to fly / Armed</td>
                                    </tr>
                                    <tr class="hover:bg-gray-50">
                                        <td class="p-4 font-bold">Charge LED</td>
                                        <td class="p-4"><span class="inline-block w-4 h-4 rounded-full bg-red-500"></span> Red</td>
                                        <td class="p-4">ON</td>
                                        <td class="p-4">Battery charging</td>
                                    </tr>
                                    <tr class="hover:bg-gray-50">
                                        <td class="p-4 font-bold">Charge LED</td>
                                        <td class="p-4"><span class="inline-block w-4 h-4 rounded-full bg-green-500"></span> Green</td>
                                        <td class="p-4">ON</td>
                                        <td class="p-4">Charging complete</td>
                                    </tr>
                                    <tr class="hover:bg-gray-50">
                                        <td class="p-4 font-bold">Charge LED</td>
                                        <td class="p-4">-</td>
                                        <td class="p-4">OFF</td>
                                        <td class="p-4">Not charging / No USB power</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Buzzer -->
                <div class="mb-16">
                    <div class="bg-gradient-to-br from-cyan-50 to-blue-50 p-10 rounded-3xl border-2 border-cyan-200">
                        <!-- Buzzer Connector Image -->
                        <div class="mb-6">
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Audio-Connector.png" 
                                 alt="Optional Piezo Buzzer Connector" 
                                 class="w-full max-w-2xl mx-auto rounded-xl shadow-lg">
                        </div>
                        
                        <h3 class="text-3xl font-bold mb-6 text-cyan-800">
                            <i class="fas fa-volume-up mr-3"></i>Audio Buzzer (Optional)
                        </h3>
                        <p class="text-lg text-gray-700 leading-relaxed">
                            FLYQ includes a connector for an optional piezo buzzer. This can be used for audio feedback during 
                            flight operations, such as low battery warnings, successful calibration, or flight mode changes. The 
                            buzzer is controlled via a GPIO pin and supports different tones and patterns.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Assembly & Affordability -->
        <section id="assembly" class="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-16">Easy Assembly & Affordable</h2>
                
                <!-- Assembly Overview Image -->\n                <div class="mb-12">
                    <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Lite-Wing-Mechanical-Parts.png" 
                         alt="FLYQ Unassembled with Mechanical Parts" 
                         class="w-full rounded-2xl shadow-2xl">
                </div>
                
                <div class="bg-white p-10 rounded-3xl shadow-2xl mb-12">
                    <div class="prose prose-lg max-w-none">
                        <p class="text-lg text-gray-700 leading-relaxed mb-6">
                            FLYQ is designed for quick and easy assembly. Unlike traditional drones that require complex 3D printed 
                            frames or carbon fiber cutting, FLYQ arrives with the main PCB board pre-assembled. All you need to do 
                            is attach the propellers and connect the battery - you can be flying in under 5 minutes!
                        </p>
                        <p class="text-lg text-gray-700 leading-relaxed mb-6">
                            The PCB-based design eliminates many common assembly issues. There's no need to worry about motor 
                            alignment, wire routing, or structural integrity. Everything is integrated into the professionally 
                            manufactured board, tested before shipping.
                        </p>
                    </div>
                </div>

                <!-- Propeller Guide -->
                <div class="bg-gradient-to-br from-blue-50 to-sky-50 p-10 rounded-3xl border-2 border-blue-200 mb-12">
                    <h3 class="text-3xl font-bold mb-6 text-blue-800">Propeller Installation</h3>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="text-xl font-bold mb-4 text-blue-700">Clockwise (CW) Propellers</h4>
                            <ul class="space-y-3 text-gray-700">
                                <li>• Install on Front-Right and Rear-Left motors</li>
                                <li>• These propellers have no markings or special indicators</li>
                                <li>• Rotate clockwise when viewed from above</li>
                                <li>• Push down firmly and twist slightly to secure</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold mb-4 text-blue-700">Counter-Clockwise (CCW) Propellers</h4>
                            <ul class="space-y-3 text-gray-700">
                                <li>• Install on Front-Left and Rear-Right motors</li>
                                <li>• Usually marked with a red dot or "B" label</li>
                                <li>• Rotate counter-clockwise when viewed from above</li>
                                <li>• Push down firmly and twist slightly to secure</li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-8 p-6 bg-yellow-100 rounded-xl border-2 border-yellow-400">
                        <p class="text-gray-800">
                            <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                            <strong>Important:</strong> Installing propellers incorrectly will prevent the drone from flying properly. 
                            Always double-check that CW propellers are on the correct motors before your first flight.
                        </p>
                    </div>
                </div>

                <!-- Battery Guide -->
                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 p-10 rounded-3xl border-2 border-yellow-200">
                    <h3 class="text-3xl font-bold mb-6 text-yellow-800">Battery Selection & Care</h3>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="text-xl font-bold mb-4 text-yellow-700">Recommended Batteries</h4>
                            <ul class="space-y-3 text-gray-700">
                                <li>• <strong>FLYQ Air:</strong> 3.7V 600mAh LiPo (included)</li>
                                <li>• <strong>FLYQ Vision:</strong> 3.7V 800mAh LiPo (included)</li>
                                <li>• JST-PH 2.0 connector (2-pin)</li>
                                <li>• Maximum dimensions: 50mm x 30mm x 8mm</li>
                                <li>• Weight: 15-20g</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold mb-4 text-yellow-700">Battery Safety</h4>
                            <ul class="space-y-3 text-gray-700">
                                <li>• Never discharge below 3.0V per cell</li>
                                <li>• Store at 3.7-3.8V for long-term</li>
                                <li>• Don't leave plugged in when not flying</li>
                                <li>• Replace if battery becomes puffy or damaged</li>
                                <li>• Charge in a fire-safe location</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        <!-- WiFi-Based Smart Control & Expansion -->
        <section id="wifi-control" class="py-20 bg-white">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-16">WiFi-Based Smart Control & Expansion</h2>
                
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-10 rounded-3xl border-2 border-purple-200 mb-12">
                    <!-- WiFi Control Illustration -->
                    <div class="mb-6">
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-Wireless-Communication-Illustration-app-cfclient-python-code.png" 
                             alt="FLYQ WiFi Control - Web App, CFclient, and Python SDK" 
                             class="w-full rounded-xl shadow-lg">
                    </div>
                    
                    <h3 class="text-3xl font-bold mb-6 text-purple-800">
                        <i class="fas fa-wifi mr-3"></i>No Radio Controller Required
                    </h3>
                    <p class="text-lg text-gray-700 leading-relaxed mb-6">
                        FLYQ breaks away from traditional drone design by using WiFi for control instead of expensive radio controllers. 
                        The ESP32-S3's built-in WiFi creates a wireless access point that you can connect to from any device - smartphone, 
                        tablet, laptop, or desktop computer. A built-in web interface provides real-time control and telemetry.
                    </p>
                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h4 class="font-bold text-lg mb-3 text-purple-700">Web Interface Features</h4>
                            <ul class="space-y-2 text-gray-700 text-sm">
                                <li>• Real-time flight control</li>
                                <li>• Live telemetry data display</li>
                                <li>• IMU calibration tools</li>
                                <li>• Motor testing interface</li>
                                <li>• PID tuning parameters</li>
                                <li>• Battery voltage monitor</li>
                            </ul>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h4 class="font-bold text-lg mb-3 text-purple-700">Control Methods</h4>
                            <ul class="space-y-2 text-gray-700 text-sm">
                                <li>• Web-based gamepad interface</li>
                                <li>• Keyboard controls (WASD)</li>
                                <li>• Virtual joysticks (mobile)</li>
                                <li>• Physical gamepad support</li>
                                <li>• Python SDK (CrazyFlie compatible)</li>
                                <li>• Custom UDP/TCP protocols</li>
                            </ul>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h4 class="font-bold text-lg mb-3 text-purple-700">Connectivity</h4>
                            <ul class="space-y-2 text-gray-700 text-sm">
                                <li>• WiFi 802.11 b/g/n</li>
                                <li>• Access Point mode (default)</li>
                                <li>• Station mode (connect to router)</li>
                                <li>• Range: ~30-50 meters</li>
                                <li>• Multiple device connections</li>
                                <li>• OTA firmware updates</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Expansion Header -->
                <div class="bg-gradient-to-br from-cyan-50 to-blue-50 p-10 rounded-3xl border-2 border-cyan-200">
                    <h3 class="text-3xl font-bold mb-6 text-cyan-800">
                        <i class="fas fa-plug mr-3"></i>24-Pin Expansion Header
                    </h3>
                    <p class="text-lg text-gray-700 leading-relaxed mb-6">
                        FLYQ includes a comprehensive 24-pin expansion header that provides access to all major interfaces of the ESP32-S3. 
                        This allows you to add external sensors, cameras, displays, and other modules to create advanced drone applications.
                    </p>
                    
                    <!-- Pinout Diagram Image -->
                    <div class="mb-6">
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Pinout-Diagram-LiteWing.png" 
                             alt="FLYQ 24-Pin Expansion Header Pinout Diagram" 
                             class="w-full rounded-xl shadow-lg">
                    </div>
                    
                    <!-- Pinout Table -->
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-cyan-600 text-white">
                                    <th class="p-3 text-left">Pin #</th>
                                    <th class="p-3 text-left">Function</th>
                                    <th class="p-3 text-left">Description</th>
                                    <th class="p-3 text-left">Notes</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr class="hover:bg-gray-50">
                                    <td class="p-3 font-bold">1-2</td>
                                    <td class="p-3 font-mono text-xs">3.3V / GND</td>
                                    <td class="p-3">Power supply</td>
                                    <td class="p-3 text-xs">Max 500mA total</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="p-3 font-bold">3-4</td>
                                    <td class="p-3 font-mono text-xs">SDA / SCL</td>
                                    <td class="p-3">I²C Bus (shared with IMU)</td>
                                    <td class="p-3 text-xs">GPIO21, GPIO22</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="p-3 font-bold">5-8</td>
                                    <td class="p-3 font-mono text-xs">MOSI/MISO/SCK/CS</td>
                                    <td class="p-3">SPI Bus</td>
                                    <td class="p-3 text-xs">GPIO35,GPIO37,GPIO36,GPIO34</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="p-3 font-bold">9-10</td>
                                    <td class="p-3 font-mono text-xs">TX / RX</td>
                                    <td class="p-3">UART2 (Serial)</td>
                                    <td class="p-3 text-xs">GPIO17, GPIO18</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="p-3 font-bold">11-14</td>
                                    <td class="p-3 font-mono text-xs">GPIO</td>
                                    <td class="p-3">General Purpose I/O</td>
                                    <td class="p-3 text-xs">Digital I/O, PWM capable</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="p-3 font-bold">15-16</td>
                                    <td class="p-3 font-mono text-xs">ADC1 / ADC2</td>
                                    <td class="p-3">Analog Inputs</td>
                                    <td class="p-3 text-xs">12-bit, 0-3.3V range</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="p-3 font-bold">17-18</td>
                                    <td class="p-3 font-mono text-xs">VBAT / GND</td>
                                    <td class="p-3">Battery voltage output</td>
                                    <td class="p-3 text-xs">3.0-4.2V, Max 500mA</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="p-3 font-bold">19-24</td>
                                    <td class="p-3 font-mono text-xs">Reserved</td>
                                    <td class="p-3">Future expansion</td>
                                    <td class="p-3 text-xs">Camera interface pins</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h4 class="font-bold text-lg mb-3 text-cyan-700">Compatible Modules</h4>
                            <ul class="space-y-2 text-gray-700 text-sm">
                                <li>• LIDAR distance sensors (I²C/UART)</li>
                                <li>• Optical flow sensors (SPI)</li>
                                <li>• GPS modules (UART)</li>
                                <li>• Barometric altimeters (I²C)</li>
                                <li>• Camera modules (for Vision model)</li>
                                <li>• OLED/LCD displays (I²C/SPI)</li>
                            </ul>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h4 class="font-bold text-lg mb-3 text-cyan-700">Applications</h4>
                            <ul class="space-y-2 text-gray-700 text-sm">
                                <li>• Autonomous navigation projects</li>
                                <li>• Computer vision experiments</li>
                                <li>• Multi-sensor fusion research</li>
                                <li>• Environmental monitoring</li>
                                <li>• Indoor positioning systems</li>
                                <li>• Swarm robotics applications</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Optional Assisted Flight Modules -->
        <section id="modules" class="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-16">Optional Modules for Assisted Flight Control</h2>
                
                <div class="grid md:grid-cols-2 gap-8 mb-12">
                    <div class="bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-3xl border-2 border-blue-200">
                        <h3 class="text-2xl font-bold mb-4 text-blue-800">
                            <i class="fas fa-expand-arrows-alt mr-2"></i>Optical Flow Sensor Module
                        </h3>
                        <p class="text-gray-700 mb-4 leading-relaxed">
                            Add precise position hold and horizontal velocity control with an optical flow sensor. This module tracks 
                            the drone's movement relative to the ground, enabling stable hovering without GPS.
                        </p>
                        <ul class="space-y-2 text-gray-700 text-sm">
                            <li>• <strong>Sensor:</strong> PMW3901 optical flow sensor</li>
                            <li>• <strong>Interface:</strong> SPI</li>
                            <li>• <strong>Range:</strong> 0.08m to 30m altitude</li>
                            <li>• <strong>Use Case:</strong> Indoor hovering, position hold</li>
                        </ul>
                    </div>

                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border-2 border-purple-200">
                        <h3 class="text-2xl font-bold mb-4 text-purple-800">
                            <i class="fas fa-arrows-alt-v mr-2"></i>LIDAR Altitude Sensor Module
                        </h3>
                        <p class="text-gray-700 mb-4 leading-relaxed">
                            Upgrade to precise altitude control with a LIDAR distance sensor. Maintain exact height above ground 
                            regardless of barometric pressure changes.
                        </p>
                        <ul class="space-y-2 text-gray-700 text-sm">
                            <li>• <strong>Sensor:</strong> VL53L1X Time-of-Flight LIDAR</li>
                            <li>• <strong>Interface:</strong> I²C</li>
                            <li>• <strong>Range:</strong> 0.04m to 4m with 1mm resolution</li>
                            <li>• <strong>Use Case:</strong> Altitude hold, terrain following</li>
                        </ul>
                    </div>

                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border-2 border-green-200">
                        <h3 class="text-2xl font-bold mb-4 text-green-800">
                            <i class="fas fa-satellite mr-2"></i>GPS Navigation Module
                        </h3>
                        <p class="text-gray-700 mb-4 leading-relaxed">
                            Enable outdoor autonomous missions with a GPS module. Set waypoints, return-to-home, and position hold 
                            using satellite navigation.
                        </p>
                        <ul class="space-y-2 text-gray-700 text-sm">
                            <li>• <strong>Module:</strong> NEO-M8N GPS</li>
                            <li>• <strong>Interface:</strong> UART</li>
                            <li>• <strong>Accuracy:</strong> 2.5m CEP (horizontal)</li>
                            <li>• <strong>Use Case:</strong> Outdoor navigation, waypoint missions</li>
                        </ul>
                    </div>

                    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-3xl border-2 border-yellow-200">
                        <h3 class="text-2xl font-bold mb-4 text-yellow-800">
                            <i class="fas fa-compress-arrows-alt mr-2"></i>Barometric Pressure Sensor
                        </h3>
                        <p class="text-gray-700 mb-4 leading-relaxed">
                            Improve altitude estimation with a barometric pressure sensor. Combine with the IMU for more accurate 
                            height measurements in varying conditions.
                        </p>
                        <ul class="space-y-2 text-gray-700 text-sm">
                            <li>• <strong>Sensor:</strong> BMP280 or MS5611</li>
                            <li>• <strong>Interface:</strong> I²C or SPI</li>
                            <li>• <strong>Resolution:</strong> 0.18m altitude resolution</li>
                            <li>• <strong>Use Case:</strong> Altitude estimation, vertical velocity</li>
                        </ul>
                    </div>
                </div>

                <div class="bg-blue-100 border-2 border-blue-300 rounded-2xl p-8">
                    <p class="text-gray-800 text-lg">
                        <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                        <strong>Note:</strong> All optional modules connect to the 24-pin expansion header and require additional 
                        firmware configuration. Software libraries and example code are available in the FLYQ documentation.
                    </p>
                </div>
            </div>
        </section>

        <!-- Getting Started / Packaging -->
        <section id="getting-started" class="py-20 bg-white">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-16">Getting Started</h2>
                
                <div class="bg-gradient-to-br from-sky-50 to-blue-50 p-10 rounded-3xl border-2 border-sky-200 mb-12">
                    <!-- Propeller Images Grid -->\n                    <div class="grid md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-Propellers.png" 
                                 alt="FLYQ Propellers Set" 
                                 class="w-full rounded-xl shadow-lg mb-2">
                            <p class="text-sm text-center text-gray-600">Propellers Included</p>
                        </div>
                        <div>
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Properller-Blades-Litewing.png" 
                                 alt="Propeller Blade Closeup" 
                                 class="w-full rounded-xl shadow-lg mb-2">
                            <p class="text-sm text-center text-gray-600">Blade Details</p>
                        </div>
                        <div>
                            <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Propeller-Installation-Markings-LiteWing.png" 
                                 alt="PCB Markings for Propeller Installation" 
                                 class="w-full rounded-xl shadow-lg mb-2">
                            <p class="text-sm text-center text-gray-600">Installation Markings</p>
                        </div>
                    </div>
                    
                    <!-- Propeller Direction Diagram -->\n                    <div class="mb-8">
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Direction-and-Propeller-Marking.png" 
                             alt="Propeller Direction and Marking Guide" 
                             class="w-full max-w-3xl mx-auto rounded-xl shadow-lg">
                    </div>
                    
                    <h3 class="text-3xl font-bold mb-6 text-sky-800">
                        <i class="fas fa-box-open mr-3"></i>What's in the Box
                    </h3>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="text-xl font-bold mb-4 text-sky-700">FLYQ Air Package</h4>
                            <ul class="space-y-3 text-gray-700">
                                <li>• 1x FLYQ Air PCB frame (fully assembled)</li>
                                <li>• 1x 3.7V 600mAh LiPo battery</li>
                                <li>• 4x 45mm propellers (2 CW + 2 CCW)</li>
                                <li>• 4x Spare propellers</li>
                                <li>• 1x USB-C cable (programming & charging)</li>
                                <li>• Quick start guide</li>
                                <li>• Safety manual</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold mb-4 text-sky-700">FLYQ Vision Package</h4>
                            <ul class="space-y-3 text-gray-700">
                                <li>• 1x FLYQ Vision PCB frame (fully assembled)</li>
                                <li>• 1x 3.7V 800mAh LiPo battery</li>
                                <li>• 1x Camera module (pre-installed)</li>
                                <li>• 4x 45mm propellers (2 CW + 2 CCW)</li>
                                <li>• 4x Spare propellers</li>
                                <li>• 1x USB-C cable (programming & charging)</li>
                                <li>• Quick start guide + Advanced programming guide</li>
                                <li>• Safety manual</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Quick Start Steps -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-3xl border-2 border-green-200">
                    <h3 class="text-3xl font-bold mb-6 text-green-800">
                        <i class="fas fa-rocket mr-3"></i>Quick Start Guide (5 Minutes)
                    </h3>
                    <div class="space-y-6">
                        <div class="flex items-start gap-4">
                            <div class="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-green-700">Charge the Battery</h4>
                                <p class="text-gray-700">Connect the USB-C cable and charge until the green LED lights up (about 45 minutes for full charge).</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-green-700">Install Propellers</h4>
                                <p class="text-gray-700">Attach CW propellers to front-right and rear-left motors, CCW propellers (marked) to front-left and rear-right motors.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-green-700">Connect Battery</h4>
                                <p class="text-gray-700">Plug in the battery JST connector. The power LED should turn red, and the blue status LED should blink slowly.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">4</div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-green-700">Connect to WiFi</h4>
                                <p class="text-gray-700">Look for "FLYQ-XXXX" WiFi network on your device. Connect using password: <code class="bg-gray-200 px-2 py-1 rounded">flyq1234</code></p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">5</div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-green-700">Open Web Interface</h4>
                                <p class="text-gray-700">Open browser and go to <code class="bg-gray-200 px-2 py-1 rounded">http://192.168.4.1</code> to access the control interface.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">6</div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-green-700">Calibrate & Fly!</h4>
                                <p class="text-gray-700">Perform IMU calibration through the web interface, then arm the motors and take off!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Development & Programming -->
        <section id="development" class="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-16">Development & Programming</h2>
                
                <div class="bg-gradient-to-br from-indigo-50 to-purple-50 p-10 rounded-3xl border-2 border-indigo-200 mb-12">
                    <h3 class="text-3xl font-bold mb-6 text-indigo-800">
                        <i class="fas fa-code mr-3"></i>Firmware Stack & Architecture
                    </h3>
                    <p class="text-lg text-gray-700 leading-relaxed mb-6">
                        FLYQ runs on ESP-Drone firmware, which is based on the popular CrazyFlie open-source project. This means 
                        your FLYQ is compatible with thousands of existing code examples, Python libraries, and community projects.
                    </p>
                    <div class="grid md:grid-cols-3 gap-6 mb-8">
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h4 class="font-bold text-lg mb-3 text-indigo-700">Firmware Base</h4>
                            <ul class="space-y-2 text-gray-700 text-sm">
                                <li>• ESP-Drone (ESP32-S3)</li>
                                <li>• FreeRTOS real-time OS</li>
                                <li>• CrazyFlie compatible</li>
                                <li>• WiFi UDP/TCP control</li>
                                <li>• Web-based interface</li>
                            </ul>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h4 class="font-bold text-lg mb-3 text-indigo-700">Control Algorithms</h4>
                            <ul class="space-y-2 text-gray-700 text-sm">
                                <li>• PID stabilization loops</li>
                                <li>• Complementary filter (IMU)</li>
                                <li>• Kalman filter (sensor fusion)</li>
                                <li>• Motor mixing algorithms</li>
                                <li>• Altitude estimator</li>
                            </ul>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h4 class="font-bold text-lg mb-3 text-indigo-700">Communication</h4>
                            <ul class="space-y-2 text-gray-700 text-sm">
                                <li>• CRTP protocol (CrazyFlie)</li>
                                <li>• UDP/TCP packets</li>
                                <li>• HTTP REST API</li>
                                <li>• WebSocket streaming</li>
                                <li>• MAVLink support (optional)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Programming Options -->
                <div class="grid md:grid-cols-2 gap-8 mb-12">
                    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl border-2 border-blue-200">
                        <h3 class="text-2xl font-bold mb-4 text-blue-800">
                            <i class="fab fa-python mr-2"></i>Python Programming (CrazyFlie SDK)
                        </h3>
                        <p class="text-gray-700 mb-4 leading-relaxed">
                            Use the official CrazyFlie Python library to control FLYQ from your computer. Write autonomous flight 
                            scripts, log telemetry data, and develop AI-powered drone applications.
                        </p>
                        <div class="bg-white p-4 rounded-xl mb-4">
                            <code class="text-sm text-gray-800 block">
                                pip install cflib<br/>
                                # Connect to FLYQ via WiFi<br/>
                                # Run autonomous missions<br/>
                                # Access full sensor data
                            </code>
                        </div>
                        <ul class="space-y-2 text-gray-700 text-sm">
                            <li>• Compatible with existing CrazyFlie code</li>
                            <li>• Access to thousands of examples</li>
                            <li>• Perfect for research & education</li>
                        </ul>
                    </div>

                    <div class="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-3xl border-2 border-teal-200">
                        <h3 class="text-2xl font-bold mb-4 text-teal-800">
                            <i class="fas fa-microchip mr-2"></i>Arduino IDE Programming
                        </h3>
                        <p class="text-gray-700 mb-4 leading-relaxed">
                            Modify the firmware directly using Arduino IDE. Customize flight algorithms, add new features, or integrate 
                            additional sensors using the familiar Arduino environment.
                        </p>
                        <div class="bg-white p-4 rounded-xl mb-4">
                            <code class="text-sm text-gray-800 block">
                                // ESP32 Arduino Core<br/>
                                // Modify PID parameters<br/>
                                // Add custom flight modes<br/>
                                // Integrate sensors via I²C/SPI
                            </code>
                        </div>
                        <ul class="space-y-2 text-gray-700 text-sm">
                            <li>• Easy firmware customization</li>
                            <li>• Access to ESP32 libraries</li>
                            <li>• Perfect for makers & hobbyists</li>
                        </ul>
                    </div>

                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border-2 border-purple-200">
                        <h3 class="text-2xl font-bold mb-4 text-purple-800">
                            <i class="fas fa-terminal mr-2"></i>ESP-IDF Framework
                        </h3>
                        <p class="text-gray-700 mb-4 leading-relaxed">
                            For advanced development, use Espressif's official ESP-IDF framework. Get full access to ESP32-S3 hardware 
                            features, optimize performance, and build professional-grade applications.
                        </p>
                        <div class="bg-white p-4 rounded-xl mb-4">
                            <code class="text-sm text-gray-800 block">
                                idf.py build<br/>
                                idf.py flash<br/>
                                # Professional development<br/>
                                # Maximum performance
                            </code>
                        </div>
                        <ul class="space-y-2 text-gray-700 text-sm">
                            <li>• Professional-grade development</li>
                            <li>• Full hardware access</li>
                            <li>• Maximum performance optimization</li>
                        </ul>
                    </div>

                    <div class="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl border-2 border-orange-200">
                        <h3 class="text-2xl font-bold mb-4 text-orange-800">
                            <i class="fas fa-globe mr-2"></i>Web Interface Customization
                        </h3>
                        <p class="text-gray-700 mb-4 leading-relaxed">
                            Customize the built-in web interface to add your own controls, data visualizations, and features. 
                            The web server runs on the ESP32 and serves HTML/CSS/JavaScript.
                        </p>
                        <div class="bg-white p-4 rounded-xl mb-4">
                            <code class="text-sm text-gray-800 block">
                                // Modify HTML/CSS/JS<br/>
                                // Add custom visualizations<br/>
                                // Create mission planners<br/>
                                // Build flight simulators
                            </code>
                        </div>
                        <ul class="space-y-2 text-gray-700 text-sm">
                            <li>• No app installation needed</li>
                            <li>• Cross-platform compatibility</li>
                            <li>• Easy to share and demonstrate</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Hardware Design Files Section -->
        <section id="hardware-design" class="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-16">Hardware Design Files</h2>
                
                <!-- PCB Image -->\n                <div class="mb-12">
                    <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/PCB-LiteWing.png" 
                         alt="FLYQ PCB Design - Top and Bottom Views" 
                         class="w-full rounded-2xl shadow-2xl">
                </div>
                
                <div class="bg-white p-10 rounded-3xl shadow-2xl mb-12">
                    <div class="prose prose-lg max-w-none">
                        <p class="text-lg text-gray-700 leading-relaxed mb-6">
                            FLYQ's complete hardware design files are available for educational purposes, modification, and custom builds. 
                            The design includes schematics, PCB layouts, bill of materials (BOM), and 3D models.
                        </p>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <!-- GitHub Links -->
                        <div class="bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-2xl border-2 border-blue-200">
                            <h3 class="text-2xl font-bold mb-4 text-blue-800">
                                <i class="fab fa-github mr-2"></i>Firmware & Software
                            </h3>
                            <p class="text-gray-700 mb-4">Complete firmware source code, development tools, and programming examples</p>
                            <ul class="space-y-2 text-gray-700">
                                <li>• ESP-Drone firmware (CrazyFlie compatible)</li>
                                <li>• Arduino examples and libraries</li>
                                <li>• Python SDK integration code</li>
                                <li>• Web interface source code</li>
                            </ul>
                        </div>
                        
                        <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                            <h3 class="text-2xl font-bold mb-4 text-purple-800">
                                <i class="fas fa-file-code mr-2"></i>Hardware Files
                            </h3>
                            <p class="text-gray-700 mb-4">Complete PCB design files and manufacturing data</p>
                            <ul class="space-y-2 text-gray-700">
                                <li>• KiCad schematic files</li>
                                <li>• PCB layout (Gerber files)</li>
                                <li>• Bill of Materials (BOM)</li>
                                <li>• Assembly drawings</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Circuit Diagram Explanation Section -->
        <section id="circuit-diagrams" class="py-20 bg-white">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-16">Complete Circuit Diagram Explanation</h2>
                
                <p class="text-lg text-gray-700 text-center mb-12 max-w-4xl mx-auto">
                    Understanding the electronics behind FLYQ helps you modify, troubleshoot, and build upon the platform. 
                    Below are detailed schematics of each major subsystem.
                </p>
                
                <!-- USB Input, Power Path Control, and 3.3V LDO -->
                <div class="mb-12">
                    <div class="bg-gradient-to-br from-blue-50 to-sky-50 p-8 rounded-3xl border-2 border-blue-200">
                        <h3 class="text-3xl font-bold mb-6 text-blue-800">1. USB Input, Power Path Control & 3.3V LDO</h3>
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-USB-Input-Power-Path-Control-3-3V-LDO.png" 
                             alt="USB Input, Power Path Control, and 3.3V LDO Schematic" 
                             class="w-full rounded-xl shadow-lg mb-4">
                        <p class="text-gray-700">
                            The USB-C connector provides both programming interface and battery charging. The power path control circuit 
                            automatically switches between USB power and battery power. The 3.3V LDO regulator (AP2112K) provides clean, 
                            regulated power to the ESP32-S3 and sensors.
                        </p>
                    </div>
                </div>

                <!-- Battery Charger (TP4056) -->
                <div class="mb-12">
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border-2 border-green-200">
                        <h3 class="text-3xl font-bold mb-6 text-green-800">2. Battery Charger (TP4056)</h3>
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-Battery-Charger.png" 
                             alt="TP4056 Battery Charger Schematic" 
                             class="w-full rounded-xl shadow-lg mb-4">
                        <p class="text-gray-700">
                            The TP4056 is a complete constant-current/constant-voltage linear charger for single-cell lithium-ion batteries. 
                            It charges at 500mA and includes automatic charge termination, thermal regulation, and status indication LEDs.
                        </p>
                    </div>
                </div>

                <!-- Battery Monitoring and On/Off Switch -->
                <div class="mb-12">
                    <div class="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-3xl border-2 border-yellow-200">
                        <h3 class="text-3xl font-bold mb-6 text-yellow-800">3. Battery Monitoring & On/Off Switch</h3>
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-of-Battery-Monitoring-On-Off-Switch.png" 
                             alt="Battery Monitoring and Power Switch Schematic" 
                             class="w-full rounded-xl shadow-lg mb-4">
                        <p class="text-gray-700">
                            A voltage divider network allows the ESP32 to monitor battery voltage through an ADC pin. The power switch 
                            controls battery connection, and includes protection against over-discharge and short circuits.
                        </p>
                    </div>
                </div>

                <!-- USB-UART Bridge / Programming Circuit -->
                <div class="mb-12">
                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border-2 border-purple-200">
                        <h3 class="text-3xl font-bold mb-6 text-purple-800">4. USB-UART Bridge & Programming Circuit</h3>
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-USB-UART-Bridge-Programming-Circuit_1.png" 
                             alt="CH340 USB-UART Bridge and Auto-Reset Circuit Schematic" 
                             class="w-full rounded-xl shadow-lg mb-4">
                        <p class="text-gray-700">
                            The CH340K USB-to-UART bridge chip converts USB signals to serial UART for programming the ESP32-S3. The 
                            auto-reset circuit uses DTR and RTS signals to automatically put the ESP32 into bootloader mode when uploading 
                            firmware, eliminating the need to manually press reset buttons.
                        </p>
                    </div>
                </div>

                <!-- ESP32-S3 SoC -->
                <div class="mb-12">
                    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl border-2 border-blue-200">
                        <h3 class="text-3xl font-bold mb-6 text-blue-800">5. ESP32-S3 System-on-Chip</h3>
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-ESP32-S3-SoC.png" 
                             alt="ESP32-S3 SoC Connections Schematic" 
                             class="w-full rounded-xl shadow-lg mb-4">
                        <p class="text-gray-700">
                            The ESP32-S3 module includes the microcontroller, flash memory, PSRAM (Vision model), antenna, and necessary 
                            passive components. Pin connections show UART for programming, I²C for sensors, GPIO for motor control, 
                            and the expansion header connections.
                        </p>
                    </div>
                </div>

                <!-- MPU6050 IMU -->
                <div class="mb-12">
                    <div class="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-3xl border-2 border-green-200">
                        <h3 class="text-3xl font-bold mb-6 text-green-800">6. MPU6050 IMU Sensor</h3>
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/MPU6050-IMU-Schematics.png" 
                             alt="MPU6050 6-Axis IMU Schematic" 
                             class="w-full rounded-xl shadow-lg mb-4">
                        <p class="text-gray-700">
                            The MPU6050 connects to the ESP32-S3 via I²C interface (SDA and SCL lines). Pull-up resistors ensure reliable 
                            communication. The interrupt pin can be used for motion detection and data-ready signaling. Decoupling 
                            capacitors filter power supply noise for accurate measurements.
                        </p>
                    </div>
                </div>

                <!-- Motor Drivers -->
                <div class="mb-12">
                    <div class="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-3xl border-2 border-red-200">
                        <h3 class="text-3xl font-bold mb-6 text-red-800">7. Motor Driver Circuits</h3>
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Moyor-Drivers-Schematics.png" 
                             alt="MOSFET-Based Motor Driver Schematics" 
                             class="w-full rounded-xl shadow-lg mb-4">
                        <p class="text-gray-700">
                            Four independent N-channel MOSFET drivers control the brushless coreless motors. Each motor receives PWM 
                            signals from the ESP32 GPIO pins. Gate resistors limit switching speed to reduce EMI. Flyback diodes protect 
                            against voltage spikes when motors are de-energized.
                        </p>
                    </div>
                </div>

                <!-- Status LEDs -->
                <div class="mb-12">
                    <div class="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl border-2 border-indigo-200">
                        <h3 class="text-3xl font-bold mb-6 text-indigo-800">8. Status LED Indicators</h3>
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-Status-LED.png" 
                             alt="Status LED Circuit Schematic" 
                             class="w-full rounded-xl shadow-lg mb-4">
                        <p class="text-gray-700">
                            Three LEDs provide visual feedback: Power LED (always on when powered), Status LED (WiFi and flight status, 
                            controlled by ESP32 GPIO), and Charge LED (controlled by TP4056 charge status pins). Current-limiting 
                            resistors prevent LED damage.
                        </p>
                    </div>
                </div>

                <!-- Expansion Connector -->
                <div class="mb-12">
                    <div class="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-3xl border-2 border-cyan-200">
                        <h3 class="text-3xl font-bold mb-6 text-cyan-800">9. Expansion Connector Pinout</h3>
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-of-Expansion-Connector.png" 
                             alt="24-Pin Expansion Header Schematic" 
                             class="w-full rounded-xl shadow-lg mb-4">
                        <p class="text-gray-700">
                            The 24-pin expansion header breaks out ESP32-S3 pins for adding external sensors and modules. Includes power 
                            (3.3V and VBAT), I²C, SPI, UART, GPIO, and ADC pins. ESD protection diodes safeguard the ESP32 from 
                            electrostatic discharge through external connections.
                        </p>
                    </div>
                </div>

                <!-- Expansion Modules Solderpad -->
                <div class="mb-12">
                    <div class="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-3xl border-2 border-pink-200">
                        <h3 class="text-3xl font-bold mb-6 text-pink-800">10. Expansion Module Breakout</h3>
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-Expansion-Modules.png" 
                             alt="Expansion Module Solderpad Schematic" 
                             class="w-full rounded-xl shadow-lg mb-4">
                        <p class="text-gray-700">
                            Additional solder pads on the bottom of the PCB allow direct soldering of small modules (like optical flow 
                            sensors or LIDAR). These pads connect to the same expansion pins but provide a more compact mounting option 
                            for integrated builds.
                        </p>
                    </div>
                </div>

                <!-- Summary Box -->
                <div class="bg-gradient-to-br from-sky-50 to-blue-50 p-10 rounded-3xl border-2 border-sky-200">
                    <h3 class="text-3xl font-bold mb-6 text-sky-800">
                        <i class="fas fa-graduation-cap mr-3"></i>Learning from the Design
                    </h3>
                    <p class="text-lg text-gray-700 leading-relaxed mb-6">
                        These schematics provide a complete reference for understanding embedded systems design, power management, 
                        motor control, sensor integration, and wireless communication. Students and developers can use these diagrams to:
                    </p>
                    <ul class="space-y-3 text-gray-700 text-lg">
                        <li>• <strong>Learn PCB design principles</strong> - component placement, routing, power distribution</li>
                        <li>• <strong>Understand flight controller architecture</strong> - sensors, processors, actuators</li>
                        <li>• <strong>Modify and customize</strong> - add features, change components, optimize performance</li>
                        <li>• <strong>Troubleshoot hardware issues</strong> - trace signals, measure voltages, identify problems</li>
                        <li>• <strong>Design your own drones</strong> - use FLYQ as a reference for new projects</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Flight Troubleshooting -->
        <section id="troubleshooting" class="py-20 bg-white">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-16">Flight Troubleshooting</h2>
                
                <!-- Correct/Incorrect Propeller Placement Image -->\n                <div class="mb-12">
                    <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Correct-Incorrect-Propeller-Placement.png" 
                         alt="Correct vs Incorrect Propeller Placement" 
                         class="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl">
                    <p class="text-center text-gray-600 mt-4 text-lg">Always verify propeller orientation before flight!</p>
                </div>
                
                <div class="space-y-6">
                    <!-- Problem 1 -->
                    <div class="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-3xl border-2 border-red-200">
                        <h3 class="text-2xl font-bold mb-3 text-red-800">
                            <i class="fas fa-exclamation-triangle mr-2"></i>Drone Won't Take Off / Motors Spin Unevenly
                        </h3>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-bold text-lg mb-2 text-red-700">Possible Causes:</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Propellers installed incorrectly (CW/CCW)</li>
                                    <li>• IMU not calibrated</li>
                                    <li>• Battery voltage too low</li>
                                    <li>• Motor connections loose</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-2 text-red-700">Solutions:</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Double-check propeller orientation</li>
                                    <li>• Perform IMU calibration in web interface</li>
                                    <li>• Charge battery to 4.2V (full)</li>
                                    <li>• Inspect motor solder joints</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Problem 2 -->
                    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-3xl border-2 border-yellow-200">
                        <h3 class="text-2xl font-bold mb-3 text-yellow-800">
                            <i class="fas fa-wifi mr-2"></i>Cannot Connect to WiFi Network
                        </h3>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-bold text-lg mb-2 text-yellow-700">Possible Causes:</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• WiFi network not visible</li>
                                    <li>• Wrong password</li>
                                    <li>• ESP32 not powered</li>
                                    <li>• Firmware issue</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-2 text-yellow-700">Solutions:</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Look for "FLYQ-XXXX" network name</li>
                                    <li>• Default password: flyq1234</li>
                                    <li>• Check battery connection and power LED</li>
                                    <li>• Reflash firmware via USB</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Problem 3 -->
                    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl border-2 border-blue-200">
                        <h3 class="text-2xl font-bold mb-3 text-blue-800">
                            <i class="fas fa-spin fa-spinner mr-2"></i>Drone Drifts During Flight
                        </h3>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-bold text-lg mb-2 text-blue-700">Possible Causes:</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• IMU calibration needed</li>
                                    <li>• PID values not tuned</li>
                                    <li>• Wind or air currents</li>
                                    <li>• Motor power imbalance</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-2 text-blue-700">Solutions:</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Recalibrate IMU on level surface</li>
                                    <li>• Adjust PID settings in web interface</li>
                                    <li>• Fly indoors or in calm conditions</li>
                                    <li>• Test individual motor thrust</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Problem 4 -->
                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border-2 border-purple-200">
                        <h3 class="text-2xl font-bold mb-3 text-purple-800">
                            <i class="fas fa-battery-quarter mr-2"></i>Short Flight Time
                        </h3>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-bold text-lg mb-2 text-purple-700">Possible Causes:</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Battery not fully charged</li>
                                    <li>• Battery degradation/age</li>
                                    <li>• Heavy payload or modifications</li>
                                    <li>• Aggressive flying style</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-2 text-purple-700">Solutions:</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Charge to 4.2V before flying</li>
                                    <li>• Replace old battery (>200 cycles)</li>
                                    <li>• Remove unnecessary weight</li>
                                    <li>• Use smoother control inputs</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Problem 5 -->
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border-2 border-green-200">
                        <h3 class="text-2xl font-bold mb-3 text-green-800">
                            <i class="fas fa-plug mr-2"></i>Not Charging / Charge LED Not Working
                        </h3>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-bold text-lg mb-2 text-green-700">Possible Causes:</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• USB cable not connected properly</li>
                                    <li>• Battery connector loose</li>
                                    <li>• Charge controller issue</li>
                                    <li>• Battery protection activated</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-2 text-green-700">Solutions:</h4>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Try different USB cable/adapter</li>
                                    <li>• Reseat battery connector</li>
                                    <li>• Check for damaged components</li>
                                    <li>• Replace battery if swollen</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-12 bg-orange-100 border-2 border-orange-300 rounded-2xl p-8">
                    <p class="text-gray-800 text-lg">
                        <i class="fas fa-life-ring text-orange-600 mr-2"></i>
                        <strong>Still Need Help?</strong> Contact our support team at 
                        <a href="mailto:info@passion3dworld.com" class="text-blue-600 underline">info@passion3dworld.com</a> or 
                        call <a href="tel:+919137361474" class="text-blue-600 underline">+91 9137361474</a>. 
                        Include your order number and a description of the issue.
                    </p>
                </div>
            </div>
        </section>

        <!-- Contact & Support -->
        <section id="support" class="py-20 bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 text-white">
            <div class="container mx-auto px-6 max-w-7xl">
                <h2 class="text-5xl font-black text-center mb-16">Contact, Support & Where to Buy</h2>
                
                <div class="grid md:grid-cols-3 gap-8 mb-12">
                    <!-- Contact Info -->
                    <div class="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border-2 border-white/20">
                        <h3 class="text-2xl font-bold mb-6">
                            <i class="fas fa-envelope mr-2"></i>Get in Touch
                        </h3>
                        <div class="space-y-4">
                            <div>
                                <p class="text-sky-200 mb-1">Email Support:</p>
                                <a href="mailto:info@passion3dworld.com" class="text-white text-lg hover:text-sky-300">
                                    info@passion3dworld.com
                                </a>
                            </div>
                            <div>
                                <p class="text-sky-200 mb-1">Phone Support:</p>
                                <a href="tel:+919137361474" class="text-white text-lg hover:text-sky-300">
                                    +91 9137361474
                                </a>
                            </div>
                            <div>
                                <p class="text-sky-200 mb-1">Business Hours:</p>
                                <p class="text-white">Monday - Saturday</p>
                                <p class="text-white">10:00 AM - 6:00 PM IST</p>
                            </div>
                        </div>
                    </div>

                    <!-- Documentation -->
                    <div class="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border-2 border-white/20">
                        <h3 class="text-2xl font-bold mb-6">
                            <i class="fas fa-book mr-2"></i>Documentation
                        </h3>
                        <ul class="space-y-3">
                            <li>
                                <a href="/docs" class="text-white hover:text-sky-300 flex items-center">
                                    <i class="fas fa-arrow-right mr-2 text-sm"></i>
                                    Complete Technical Documentation
                                </a>
                            </li>
                            <li>
                                <a href="/docs#arduino" class="text-white hover:text-sky-300 flex items-center">
                                    <i class="fas fa-arrow-right mr-2 text-sm"></i>
                                    Arduino Programming Tutorials
                                </a>
                            </li>
                            <li>
                                <a href="/docs#python" class="text-white hover:text-sky-300 flex items-center">
                                    <i class="fas fa-arrow-right mr-2 text-sm"></i>
                                    Python SDK Documentation
                                </a>
                            </li>
                            <li>
                                <a href="/docs#esp-idf" class="text-white hover:text-sky-300 flex items-center">
                                    <i class="fas fa-arrow-right mr-2 text-sm"></i>
                                    ESP-IDF Advanced Guide
                                </a>
                            </li>
                            <li>
                                <a href="/docs#examples" class="text-white hover:text-sky-300 flex items-center">
                                    <i class="fas fa-arrow-right mr-2 text-sm"></i>
                                    Project Ideas & Examples
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Where to Buy -->
                    <div class="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border-2 border-white/20">
                        <h3 class="text-2xl font-bold mb-6">
                            <i class="fas fa-shopping-cart mr-2"></i>Where to Buy
                        </h3>
                        <div class="space-y-4">
                            <div>
                                <p class="text-sky-200 mb-2">Official Store:</p>
                                <a href="/products" class="inline-block bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-sky-100 transition">
                                    Shop FLYQ Drones
                                </a>
                            </div>
                            <div class="pt-4 border-t border-white/20">
                                <p class="text-sm text-sky-200 mb-2">Available Models:</p>
                                <ul class="space-y-2 text-sm">
                                    <li>• FLYQ Air - ₹7,500</li>
                                    <li>• FLYQ Vision - ₹9,500</li>
                                    <li>• Educational Kits (10 units)</li>
                                    <li>• Expansion Modules</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Community & Resources -->
                <div class="bg-white/10 backdrop-blur-lg p-10 rounded-3xl border-2 border-white/20">
                    <h3 class="text-3xl font-bold mb-6 text-center">Community & Resources</h3>
                    <div class="grid md:grid-cols-4 gap-6 text-center">
                        <div>
                            <i class="fab fa-github text-5xl mb-3"></i>
                            <h4 class="font-bold mb-2">GitHub</h4>
                            <p class="text-sm text-sky-200">Open source firmware, examples, and libraries</p>
                        </div>
                        <div>
                            <i class="fab fa-youtube text-5xl mb-3"></i>
                            <h4 class="font-bold mb-2">YouTube</h4>
                            <p class="text-sm text-sky-200">Video tutorials, demos, and project showcases</p>
                        </div>
                        <div>
                            <i class="fas fa-comments text-5xl mb-3"></i>
                            <h4 class="font-bold mb-2">Forum</h4>
                            <p class="text-sm text-sky-200">Community discussions and technical support</p>
                        </div>
                        <div>
                            <i class="fas fa-graduation-cap text-5xl mb-3"></i>
                            <h4 class="font-bold mb-2">Education</h4>
                            <p class="text-sm text-sky-200">Curriculum materials for schools and workshops</p>
                        </div>
                    </div>
                </div>

                <!-- Warranty Info -->
                <div class="mt-12 bg-yellow-500/20 backdrop-blur-lg border-2 border-yellow-400/50 rounded-2xl p-8">
                    <h3 class="text-2xl font-bold mb-4 text-yellow-200">
                        <i class="fas fa-shield-alt mr-2"></i>Warranty & Returns
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                            <p class="mb-2"><strong>6-Month Limited Warranty</strong></p>
                            <p class="text-sky-100">
                                All FLYQ products come with a 6-month warranty covering manufacturing defects. This includes 
                                PCB assembly, motor functionality, and electronic components.
                            </p>
                        </div>
                        <div>
                            <p class="mb-2"><strong>30-Day Return Policy</strong></p>
                            <p class="text-sky-100">
                                Not satisfied? Return your FLYQ within 30 days for a full refund. Product must be in original 
                                condition with all accessories and packaging.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  `;
  return c.html(renderPage('FLYQ Manual - Complete Technical Guide', content));
})

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
                <div class="grid md:grid-cols-2 gap-8 mt-12">
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
                    
                    <div id="contact-error" class="hidden mb-4 p-4 bg-red-100 text-red-700 rounded-xl"></div>
                    <div id="contact-success" class="hidden mb-4 p-4 bg-green-100 text-green-700 rounded-xl"></div>
                    
                    <form id="contactForm" class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold mb-2">Name *</label>
                            <input type="text" id="contact-name" name="name" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">Email *</label>
                            <input type="email" id="contact-email" name="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2">Message *</label>
                            <textarea rows="4" id="contact-message" name="message" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none" required></textarea>
                        </div>
                        <button type="submit" class="w-full btn-primary text-white px-8 py-4 rounded-full font-bold">
                            Send Message
                        </button>
                    </form>

                    <script>
                        document.getElementById('contactForm').addEventListener('submit', async (e) => {
                            e.preventDefault();
                            
                            const name = document.getElementById('contact-name').value;
                            const email = document.getElementById('contact-email').value;
                            const message = document.getElementById('contact-message').value;
                            const errorDiv = document.getElementById('contact-error');
                            const successDiv = document.getElementById('contact-success');
                            const submitBtn = e.target.querySelector('button[type="submit"]');
                            
                            // Hide previous messages
                            errorDiv.classList.add('hidden');
                            successDiv.classList.add('hidden');
                            
                            // Disable button
                            submitBtn.disabled = true;
                            submitBtn.textContent = 'Sending...';
                            
                            try {
                                const response = await fetch('/api/contact/submit', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name, email, message })
                                });
                                
                                const data = await response.json();
                                
                                if (data.success) {
                                    successDiv.textContent = data.message || 'Message sent successfully! We will get back to you soon.';
                                    successDiv.classList.remove('hidden');
                                    e.target.reset();
                                } else {
                                    errorDiv.textContent = data.message || 'Failed to send message. Please try again.';
                                    errorDiv.classList.remove('hidden');
                                }
                            } catch (error) {
                                errorDiv.textContent = 'Failed to send message. Please try again.';
                                errorDiv.classList.remove('hidden');
                            } finally {
                                submitBtn.disabled = false;
                                submitBtn.textContent = 'Send Message';
                            }
                        });
                    </script>
                </div>

                <div>
                    <div class="bg-white rounded-3xl p-8 shadow-lg mb-6">
                        <h3 class="text-2xl font-bold mb-6">Contact Info</h3>
                        <div class="space-y-4">
                            <div class="flex items-start">
                                <i class="fas fa-envelope text-sky-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-bold">Email</div>
                                    <a href="mailto:info@passion3dworld.com" class="text-sky-600 hover:text-sky-700">info@passion3dworld.com</a>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-phone text-sky-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-bold">Phone</div>
                                    <a href="tel:+919137361474" class="text-sky-600 hover:text-sky-700">+91 9137361474</a>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <i class="fab fa-whatsapp text-sky-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-bold">WhatsApp</div>
                                    <a href="https://wa.me/919137361474" target="_blank" class="text-sky-600 hover:text-sky-700">+91 9137361474</a>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-map-marker-alt text-sky-500 text-xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-bold">Address</div>
                                    <div class="text-gray-600">Mumbai, India</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-8 text-white">
                        <h3 class="text-2xl font-bold mb-4">Need Help?</h3>
                        <p class="mb-6">Check out our documentation and community forums</p>
                        <a href="https://github.com/passion3d/flyq-air" target="_blank" class="inline-block bg-white text-sky-600 px-6 py-3 rounded-full font-bold hover:shadow-lg transition">
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
        <section class="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20">
            <div class="container mx-auto px-6 text-center">
                <i class="fas fa-book-open text-sky-400 text-7xl mb-6 animate-pulse"></i>
                <h1 class="text-7xl font-black mb-6">
                    <span class="text-sky-400">Complete</span> Documentation
                </h1>
                <p class="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                    Everything you need to know about FLYQ Air & FLYQ Vision<br/>
                    From unboxing to autonomous flight programming
                </p>
                <div class="flex justify-center gap-4 flex-wrap">
                    <span class="bg-sky-500/20 border-2 border-sky-400 text-sky-300 px-6 py-2 rounded-full font-bold">
                        <i class="fas fa-box mr-2"></i>Hardware Guides
                    </span>
                    <span class="bg-sky-500/20 border-2 border-sky-400 text-sky-300 px-6 py-2 rounded-full font-bold">
                        <i class="fas fa-code mr-2"></i>Programming Tutorials
                    </span>
                    <span class="bg-sky-500/20 border-2 border-sky-400 text-sky-300 px-6 py-2 rounded-full font-bold">
                        <i class="fas fa-plane mr-2"></i>Flight Training
                    </span>
                </div>
            </div>
        </section>

        <!-- Contact Information Banner -->
        <section class="bg-sky-500 text-white py-8">
            <div class="container mx-auto px-6">
                <div class="flex flex-wrap justify-center items-center gap-8 text-center md:text-left">
                    <div class="flex items-center">
                        <i class="fas fa-envelope text-3xl mr-3"></i>
                        <div>
                            <p class="text-sm opacity-80">Email Us</p>
                            <a href="mailto:info@passion3dworld.com" class="text-xl font-bold hover:underline">info@passion3dworld.com</a>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-phone text-3xl mr-3"></i>
                        <div>
                            <p class="text-sm opacity-80">Call Us</p>
                            <a href="tel:+919137361474" class="text-xl font-bold hover:underline">+91 9137361474</a>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <i class="fab fa-whatsapp text-3xl mr-3"></i>
                        <div>
                            <p class="text-sm opacity-80">WhatsApp</p>
                            <a href="https://wa.me/919137361474" target="_blank" class="text-xl font-bold hover:underline">Chat Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Table of Contents -->
        <section class="py-12 bg-gradient-to-br from-gray-50 to-white">
            <div class="container mx-auto px-6 max-w-6xl">
                <h2 class="text-4xl font-black mb-8 text-center">
                    <i class="fas fa-list text-sky-500 mr-3"></i>
                    <span class="text-sky-500">Quick</span> Navigation
                </h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <a href="#quick-start" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-rocket text-sky-500 text-4xl mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">Quick Start Guide</h3>
                        <p class="text-gray-600 text-sm">Get flying in 30 minutes</p>
                    </a>
                    <a href="#hardware" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-microchip text-sky-500 text-4xl mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">Hardware Overview</h3>
                        <p class="text-gray-600 text-sm">Components & specifications</p>
                    </a>
                    <a href="#programming" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-code text-sky-500 text-4xl mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">Programming Guide</h3>
                        <p class="text-gray-600 text-sm">Arduino, Python, ESP-IDF</p>
                    </a>
                    <a href="#firmware" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-download text-sky-500 text-4xl mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">Firmware Setup</h3>
                        <p class="text-gray-600 text-sm">Installation & configuration</p>
                    </a>
                    <a href="#flight-manual" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-plane text-sky-500 text-4xl mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">Flight Manual</h3>
                        <p class="text-gray-600 text-sm">Safety, calibration & flying</p>
                    </a>
                    <a href="#troubleshooting" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-wrench text-sky-500 text-4xl mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">Troubleshooting</h3>
                        <p class="text-gray-600 text-sm">Common issues & solutions</p>
                    </a>
                    <a href="#api-reference" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-book text-sky-500 text-4xl mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">API Reference</h3>
                        <p class="text-gray-600 text-sm">Complete function library</p>
                    </a>
                    <a href="#projects" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-lightbulb text-sky-500 text-4xl mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">Project Ideas</h3>
                        <p class="text-gray-600 text-sm">Inspiration & examples</p>
                    </a>
                    <a href="#support" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-sky-500">
                        <i class="fas fa-life-ring text-sky-500 text-4xl mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">Support & Community</h3>
                        <p class="text-gray-600 text-sm">Get help & connect</p>
                    </a>
                </div>
            </div>
        </section>

        <!-- Quick Access Resources -->
        <section class="py-16 bg-white" id="resources">
            <div class="container mx-auto px-6">
                <h2 class="text-5xl font-black mb-12 text-center">
                    <span class="text-sky-500">Essential</span> Resources
                </h2>
                <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <a href="https://github.com/passion3d/flyq-air" target="_blank" class="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                        <i class="fab fa-github text-sky-400 text-6xl mb-4"></i>
                        <h3 class="text-2xl font-bold mb-3">GitHub Repository</h3>
                        <p class="text-gray-300 mb-4 text-sm">
                            • Open-source hardware designs<br/>
                            • Firmware source code<br/>
                            • Circuit schematics<br/>
                            • 3D printable parts
                        </p>
                        <span class="text-sky-400 font-bold text-sm">View on GitHub →</span>
                    </a>

                    <a href="https://passion3dworld.com" target="_blank" class="bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                        <i class="fas fa-store text-white text-6xl mb-4"></i>
                        <h3 class="text-2xl font-bold mb-3">Official Store</h3>
                        <p class="text-orange-50 mb-4 text-sm">
                            • Authorized dealer<br/>
                            • Original products<br/>
                            • India-wide shipping<br/>
                            • Technical support
                        </p>
                        <span class="text-white font-bold text-sm">Visit Store →</span>
                    </a>

                    <a href="https://wa.me/919137361474" target="_blank" class="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                        <i class="fab fa-whatsapp text-white text-6xl mb-4"></i>
                        <h3 class="text-2xl font-bold mb-3">WhatsApp Support</h3>
                        <p class="text-green-50 mb-4 text-sm">
                            • Instant chat support<br/>
                            • Community group<br/>
                            • Quick troubleshooting<br/>
                            • +91 9137361474
                        </p>
                        <span class="text-white font-bold text-sm">Chat Now →</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- Getting Started Guide -->
        <section class="py-20 bg-gradient-to-br from-gray-50 to-white" id="quick-start">
            <div class="container mx-auto px-6 max-w-6xl">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        <i class="fas fa-rocket text-sky-500 mr-3"></i>
                        <span class="text-sky-500">Quick Start</span> Guide
                    </h2>
                    <p class="text-2xl text-gray-600 max-w-3xl mx-auto">
                        From unboxing to your first flight in 30 minutes
                    </p>
                </div>

                <div class="space-y-8">
                    <!-- Step 1: Unboxing -->
                    <div class="bg-white p-10 rounded-3xl shadow-xl border-l-8 border-sky-500 transform hover:scale-[1.02] transition">
                        <div class="flex items-start">
                            <span class="bg-gradient-to-br from-sky-500 to-blue-600 text-white text-3xl font-black w-16 h-16 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">1</span>
                            <div class="flex-1">
                                <h3 class="text-3xl font-black mb-4 text-gray-900">
                                    <i class="fas fa-box-open text-sky-500 mr-2"></i>
                                    Unbox Your FLYQ Drone
                                </h3>
                                <p class="text-lg text-gray-700 mb-4">
                                    Carefully open your FLYQ package and verify all components are present:
                                </p>
                                <div class="grid md:grid-cols-2 gap-4 ml-6">
                                    <ul class="space-y-2 text-gray-700">
                                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>1x</strong> Assembled drone frame with PCB</li>
                                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>4x</strong> Coreless DC motors (720 type)</li>
                                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>4x</strong> Propellers (2 CW + 2 CCW)</li>
                                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>2x</strong> Spare propellers</li>
                                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>1x</strong> 3.7V LiPo battery (600mAh)</li>
                                    </ul>
                                    <ul class="space-y-2 text-gray-700">
                                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>1x</strong> USB-C charging cable</li>
                                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>4x</strong> Propeller guards (optional)</li>
                                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>1x</strong> Screwdriver tool</li>
                                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>1x</strong> Quick start guide</li>
                                        <li><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>1x</strong> Safety card</li>
                                    </ul>
                                </div>
                                <div class="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                                    <p class="text-yellow-800">
                                        <i class="fas fa-exclamation-triangle mr-2"></i>
                                        <strong>Important:</strong> Keep propellers away from motors until you're ready to fly. Store battery safely at room temperature.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: Charge Battery -->
                    <div class="bg-white p-10 rounded-3xl shadow-xl border-l-8 border-sky-500 transform hover:scale-[1.02] transition">
                        <div class="flex items-start">
                            <span class="bg-gradient-to-br from-sky-500 to-blue-600 text-white text-3xl font-black w-16 h-16 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">2</span>
                            <div class="flex-1">
                                <h3 class="text-3xl font-black mb-4 text-gray-900">
                                    <i class="fas fa-battery-full text-sky-500 mr-2"></i>
                                    Charge the Battery
                                </h3>
                                <p class="text-lg text-gray-700 mb-4">
                                    Before your first flight, fully charge the LiPo battery:
                                </p>
                                <ol class="space-y-3 ml-6 text-gray-700 text-lg">
                                    <li><strong>1.</strong> Connect USB-C cable to the battery charging port</li>
                                    <li><strong>2.</strong> Plug into 5V USB power source (computer, phone charger, power bank)</li>
                                    <li><strong>3.</strong> LED indicator will turn RED while charging</li>
                                    <li><strong>4.</strong> LED turns GREEN when fully charged (~45 minutes)</li>
                                    <li><strong>5.</strong> Disconnect once complete to preserve battery life</li>
                                </ol>
                                <div class="mt-6 grid md:grid-cols-2 gap-4">
                                    <div class="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                                        <p class="text-red-800 font-bold mb-2">
                                            <i class="fas fa-times-circle mr-2"></i>DON'T:
                                        </p>
                                        <ul class="text-sm text-red-700 space-y-1">
                                            <li>• Use fast chargers (>5V)</li>
                                            <li>• Leave unattended while charging</li>
                                            <li>• Charge damaged battery</li>
                                            <li>• Overcharge beyond 4.2V</li>
                                        </ul>
                                    </div>
                                    <div class="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                                        <p class="text-green-800 font-bold mb-2">
                                            <i class="fas fa-check-circle mr-2"></i>DO:
                                        </p>
                                        <ul class="text-sm text-green-700 space-y-1">
                                            <li>• Use 5V 1A USB charger</li>
                                            <li>• Charge on fireproof surface</li>
                                            <li>• Monitor during charging</li>
                                            <li>• Store at 50% if not flying</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Install Software -->
                    <div class="bg-white p-10 rounded-3xl shadow-xl border-l-8 border-sky-500 transform hover:scale-[1.02] transition">
                        <div class="flex items-start">
                            <span class="bg-gradient-to-br from-sky-500 to-blue-600 text-white text-3xl font-black w-16 h-16 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">3</span>
                            <div class="flex-1">
                                <h3 class="text-3xl font-black mb-4 text-gray-900">
                                    <i class="fas fa-laptop-code text-sky-500 mr-2"></i>
                                    Install Development Tools
                                </h3>
                                <p class="text-lg text-gray-700 mb-6">
                                    Choose your preferred programming environment:
                                </p>

                                <!-- Arduino IDE -->
                                <div class="mb-8 p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-200">
                                    <h4 class="text-2xl font-bold mb-3 text-teal-700">
                                        <i class="fas fa-code mr-2"></i>Option 1: Arduino IDE (Recommended for Beginners)
                                    </h4>
                                    <p class="text-gray-700 mb-4">Easy-to-use IDE with extensive libraries</p>
                                    <ol class="space-y-2 ml-6 text-gray-700">
                                        <li><strong>1.</strong> Download from <a href="https://arduino.cc/downloads" target="_blank" class="text-sky-600 underline">arduino.cc/downloads</a></li>
                                        <li><strong>2.</strong> Install ESP32 board support: Tools → Board → Boards Manager → Search "ESP32"</li>
                                        <li><strong>3.</strong> Select board: ESP32S3 Dev Module</li>
                                        <li><strong>4.</strong> Install FLYQ library from GitHub</li>
                                        <li><strong>5.</strong> Open Examples → FLYQ → BasicFlight</li>
                                    </ol>
                                </div>

                                <!-- Python SDK -->
                                <div class="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
                                    <h4 class="text-2xl font-bold mb-3 text-blue-700">
                                        <i class="fab fa-python mr-2"></i>Option 2: Python SDK (For Autonomous Flight)
                                    </h4>
                                    <p class="text-gray-700 mb-4">Crazyflie-compatible Python library</p>
                                    <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                                        <div>$ pip install cflib</div>
                                        <div>$ pip install flyq-python</div>
                                        <div class="text-gray-500"># Verify installation</div>
                                        <div>$ python -c "import cflib; print('Success!')"</div>
                                    </div>
                                </div>

                                <!-- ESP-IDF -->
                                <div class="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                                    <h4 class="text-2xl font-bold mb-3 text-purple-700">
                                        <i class="fas fa-terminal mr-2"></i>Option 3: ESP-IDF (Advanced Firmware Development)
                                    </h4>
                                    <p class="text-gray-700 mb-4">Professional development framework</p>
                                    <ol class="space-y-2 ml-6 text-gray-700">
                                        <li><strong>1.</strong> Follow <a href="https://docs.espressif.com/projects/esp-idf/en/latest/esp32s3/get-started/" target="_blank" class="text-sky-600 underline">ESP-IDF setup guide</a></li>
                                        <li><strong>2.</strong> Clone FLYQ firmware: <code class="bg-gray-200 px-2 py-1 rounded">git clone https://github.com/passion3d/flyq-firmware</code></li>
                                        <li><strong>3.</strong> Configure project: <code class="bg-gray-200 px-2 py-1 rounded">idf.py menuconfig</code></li>
                                        <li><strong>4.</strong> Build & flash: <code class="bg-gray-200 px-2 py-1 rounded">idf.py build flash</code></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: Connect & Calibrate -->
                    <div class="bg-white p-10 rounded-3xl shadow-xl border-l-8 border-sky-500 transform hover:scale-[1.02] transition">
                        <div class="flex items-start">
                            <span class="bg-gradient-to-br from-sky-500 to-blue-600 text-white text-3xl font-black w-16 h-16 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">4</span>
                            <div class="flex-1">
                                <h3 class="text-3xl font-black mb-4 text-gray-900">
                                    <i class="fas fa-wifi text-sky-500 mr-2"></i>
                                    Connect & Calibrate
                                </h3>
                                <p class="text-lg text-gray-700 mb-6">
                                    Establish connection and calibrate sensors:
                                </p>

                                <div class="space-y-6">
                                    <div class="border-2 border-gray-200 rounded-2xl p-6">
                                        <h4 class="text-xl font-bold mb-3 text-gray-800">
                                            <i class="fas fa-signal text-green-500 mr-2"></i>Wi-Fi Connection
                                        </h4>
                                        <ol class="space-y-2 ml-6 text-gray-700">
                                            <li><strong>1.</strong> Power on drone by connecting battery</li>
                                            <li><strong>2.</strong> Wait for LED to blink blue (AP mode)</li>
                                            <li><strong>3.</strong> On your device, connect to Wi-Fi: <code class="bg-gray-200 px-2 py-1 rounded">FLYQ-XXXX</code></li>
                                            <li><strong>4.</strong> Default password: <code class="bg-gray-200 px-2 py-1 rounded">flyq1234</code></li>
                                            <li><strong>5.</strong> Open browser to: <code class="bg-gray-200 px-2 py-1 rounded">http://192.168.4.1</code></li>
                                        </ol>
                                    </div>

                                    <div class="border-2 border-gray-200 rounded-2xl p-6">
                                        <h4 class="text-xl font-bold mb-3 text-gray-800">
                                            <i class="fas fa-compass text-blue-500 mr-2"></i>IMU Calibration (Critical!)
                                        </h4>
                                        <ol class="space-y-2 ml-6 text-gray-700">
                                            <li><strong>1.</strong> Place drone on flat, level surface</li>
                                            <li><strong>2.</strong> In web interface, click "Calibrate IMU"</li>
                                            <li><strong>3.</strong> Keep drone perfectly still for 10 seconds</li>
                                            <li><strong>4.</strong> LED will turn solid green when complete</li>
                                            <li><strong>5.</strong> Recalibrate if LED blinks red (failed)</li>
                                        </ol>
                                        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                                            <p class="text-blue-800 text-sm">
                                                <i class="fas fa-info-circle mr-2"></i>
                                                <strong>Tip:</strong> Calibrate IMU before every flight session for best stability
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 5: First Flight -->
                    <div class="bg-gradient-to-br from-sky-500 to-blue-600 text-white p-10 rounded-3xl shadow-2xl border-l-8 border-white transform hover:scale-[1.02] transition">
                        <div class="flex items-start">
                            <span class="bg-white text-sky-600 text-3xl font-black w-16 h-16 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">5</span>
                            <div class="flex-1">
                                <h3 class="text-4xl font-black mb-4">
                                    <i class="fas fa-plane mr-2"></i>
                                    Your First Flight! 🚀
                                </h3>
                                <p class="text-xl mb-6 opacity-90">
                                    Ready for takeoff? Follow these safety steps:
                                </p>

                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 class="text-xl font-bold mb-3">Pre-Flight Checklist:</h4>
                                        <ul class="space-y-2">
                                            <li><i class="fas fa-check mr-2"></i>Battery fully charged</li>
                                            <li><i class="fas fa-check mr-2"></i>Propellers secured correctly</li>
                                            <li><i class="fas fa-check mr-2"></i>IMU calibrated</li>
                                            <li><i class="fas fa-check mr-2"></i>Clear 3m radius around drone</li>
                                            <li><i class="fas fa-check mr-2"></i>Indoors, no wind</li>
                                            <li><i class="fas fa-check mr-2"></i>Propeller guards installed</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 class="text-xl font-bold mb-3">Flight Controls:</h4>
                                        <ul class="space-y-2">
                                            <li><strong>Throttle (Up/Down):</strong> W/S keys</li>
                                            <li><strong>Yaw (Rotate):</strong> A/D keys</li>
                                            <li><strong>Pitch (Forward/Back):</strong> ↑/↓ arrows</li>
                                            <li><strong>Roll (Left/Right):</strong> ←/→ arrows</li>
                                            <li><strong>Emergency Stop:</strong> SPACE key</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="mt-6 p-6 bg-white/10 backdrop-blur rounded-2xl border-2 border-white/30">
                                    <h4 class="text-2xl font-bold mb-3">
                                        <i class="fas fa-video mr-2"></i>Watch First Flight Tutorial
                                    </h4>
                                    <p class="mb-4 opacity-90">
                                        Follow along with our step-by-step video guide for a successful maiden flight
                                    </p>
                                    <a href="https://www.youtube.com/watch?v=example" target="_blank" class="bg-white text-sky-600 px-8 py-3 rounded-full font-bold inline-flex items-center hover:shadow-xl transition">
                                        <i class="fab fa-youtube mr-2 text-red-500"></i>
                                        Watch on YouTube
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 6: Start Learning -->
                    <div class="bg-white p-10 rounded-3xl shadow-xl border-l-8 border-green-500 transform hover:scale-[1.02] transition">
                        <div class="flex items-start">
                            <span class="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-3xl font-black w-16 h-16 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">6</span>
                            <div class="flex-1">
                                <h3 class="text-3xl font-black mb-4 text-gray-900">
                                    <i class="fas fa-graduation-cap text-green-500 mr-2"></i>
                                    Begin Your Learning Journey
                                </h3>
                                <p class="text-lg text-gray-700 mb-6">
                                    Congratulations on your first flight! Now continue learning with our comprehensive documentation and project ideas below.
                                </p>

                                <div class="grid md:grid-cols-3 gap-6">
                                    <div class="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-2xl border-2 border-sky-200">
                                        <div class="text-4xl font-black text-sky-600 mb-2">
                                            <i class="fas fa-code"></i>
                                        </div>
                                        <h4 class="font-bold text-lg mb-2 text-gray-800">Programming Tutorials</h4>
                                        <p class="text-gray-600 text-sm">
                                            Arduino, Python, and ESP-IDF examples with step-by-step guides
                                        </p>
                                    </div>

                                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                                        <div class="text-4xl font-black text-purple-600 mb-2">
                                            <i class="fas fa-wrench"></i>
                                        </div>
                                        <h4 class="font-bold text-lg mb-2 text-gray-800">Hardware & Troubleshooting</h4>
                                        <p class="text-gray-600 text-sm">
                                            Complete hardware specs, firmware flashing, and problem solutions
                                        </p>
                                    </div>

                                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                                        <div class="text-4xl font-black text-green-600 mb-2">
                                            <i class="fas fa-lightbulb"></i>
                                        </div>
                                        <h4 class="font-bold text-lg mb-2 text-gray-800">Project Ideas</h4>
                                        <p class="text-gray-600 text-sm">
                                            Beginner to advanced projects with examples and inspiration
                                        </p>
                                    </div>
                                </div>

                                <div class="mt-8 text-center">
                                    <a href="#programming" class="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg inline-flex items-center hover:shadow-2xl transition transform hover:scale-105">
                                        <i class="fas fa-arrow-down mr-3"></i>
                                        Continue to Programming Tutorials
                                        <i class="fas fa-arrow-down ml-3"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Banner -->
                <div class="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-3xl text-center shadow-2xl">
                    <i class="fas fa-check-circle text-6xl mb-4"></i>
                    <h3 class="text-3xl font-black mb-3">You're All Set! 🎉</h3>
                    <p class="text-xl opacity-90 max-w-2xl mx-auto">
                        Your FLYQ drone is ready to fly. Start with basic flights, then progress to autonomous missions. Join our community for support!
                    </p>
                </div>
            </div>
        </section>

        <!-- Hardware Overview - Comprehensive Technical Documentation -->
        <section class="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white" id="hardware">
            <div class="container mx-auto px-6 max-w-7xl">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        <i class="fas fa-microchip text-sky-400 mr-3"></i>
                        <span class="text-sky-400">Hardware</span> Architecture
                    </h2>
                    <p class="text-2xl text-gray-300 max-w-4xl mx-auto">
                        Complete technical reference for FLYQ Air & FLYQ Vision drone hardware
                    </p>
                </div>

                <!-- ESP32-S3 Processor Details -->
                <div class="mb-16 bg-white/10 backdrop-blur rounded-3xl p-10 border-2 border-sky-400/30">
                    <h3 class="text-4xl font-black mb-8 text-sky-300">
                        <i class="fas fa-brain mr-3"></i>ESP32-S3 Processor
                    </h3>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="text-2xl font-bold mb-4 text-sky-200">Core Specifications</h4>
                            <ul class="space-y-3 text-gray-200">
                                <li><i class="fas fa-check text-green-400 mr-2"></i><strong>Dual-Core Xtensa LX7:</strong> 240MHz max frequency</li>
                                <li><i class="fas fa-check text-green-400 mr-2"></i><strong>SRAM:</strong> 512KB on-chip memory</li>
                                <li><i class="fas fa-check text-green-400 mr-2"></i><strong>Flash:</strong> 4MB external flash</li>
                                <li><i class="fas fa-check text-green-400 mr-2"></i><strong>PSRAM:</strong> 8MB (FLYQ Vision only)</li>
                                <li><i class="fas fa-check text-green-400 mr-2"></i><strong>FPU:</strong> Single-precision floating point unit</li>
                                <li><i class="fas fa-check text-green-400 mr-2"></i><strong>Vector Instructions:</strong> AI acceleration support</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold mb-4 text-sky-200">Wireless Connectivity</h4>
                            <ul class="space-y-3 text-gray-200">
                                <li><i class="fas fa-wifi text-sky-400 mr-2"></i><strong>Wi-Fi 802.11 b/g/n:</strong> 2.4GHz, up to 150Mbps</li>
                                <li><i class="fas fa-bluetooth text-blue-400 mr-2"></i><strong>Bluetooth 5.0 LE:</strong> Long range mode</li>
                                <li><i class="fas fa-signal text-green-400 mr-2"></i><strong>Range:</strong> Up to 50m (line of sight)</li>
                                <li><i class="fas fa-lock text-yellow-400 mr-2"></i><strong>Security:</strong> WPA2/WPA3, AES encryption</li>
                                <li><i class="fas fa-antenna text-purple-400 mr-2"></i><strong>Antenna:</strong> PCB trace antenna + U.FL connector</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Complete Specifications Tables -->
                <div class="grid md:grid-cols-2 gap-8">
                    <!-- FLYQ Air Complete Specs -->
                    <div class="bg-white/10 backdrop-blur rounded-3xl p-8 border-2 border-sky-400/30">
                        <div class="flex items-center mb-6">
                            <div class="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-4 mr-4">
                                <i class="fas fa-plane text-3xl"></i>
                            </div>
                            <div>
                                <h3 class="text-3xl font-black text-sky-300">FLYQ Air</h3>
                                <p class="text-gray-300">Basic Programmable Drone</p>
                            </div>
                        </div>
                        
                        <div class="space-y-6">
                            <div>
                                <h4 class="text-xl font-bold mb-3 text-sky-200 border-b border-sky-400/30 pb-2">
                                    <i class="fas fa-microchip mr-2"></i>Processor & Memory
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">CPU</td>
                                            <td class="py-2 text-gray-200">ESP32-S3 Dual-Core Xtensa LX7 @ 240MHz</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">SRAM</td>
                                            <td class="py-2 text-gray-200">512KB on-chip</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Flash</td>
                                            <td class="py-2 text-gray-200">4MB external</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Architecture</td>
                                            <td class="py-2 text-gray-200">32-bit with FPU</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-sky-200 border-b border-sky-400/30 pb-2">
                                    <i class="fas fa-wifi mr-2"></i>Connectivity
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Wi-Fi</td>
                                            <td class="py-2 text-gray-200">802.11 b/g/n 2.4GHz</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Bluetooth</td>
                                            <td class="py-2 text-gray-200">BLE 5.0 Long Range</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Range</td>
                                            <td class="py-2 text-gray-200">50m (open space)</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">USB</td>
                                            <td class="py-2 text-gray-200">Type-C (data + charging)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-sky-200 border-b border-sky-400/30 pb-2">
                                    <i class="fas fa-compass mr-2"></i>Sensors & IMU
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">IMU</td>
                                            <td class="py-2 text-gray-200">MPU6050 6-axis (Gyro + Accel)</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Gyroscope</td>
                                            <td class="py-2 text-gray-200">±250/500/1000/2000 °/s</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Accelerometer</td>
                                            <td class="py-2 text-gray-200">±2/4/8/16 g</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Sample Rate</td>
                                            <td class="py-2 text-gray-200">1kHz max</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-sky-200 border-b border-sky-400/30 pb-2">
                                    <i class="fas fa-cog mr-2"></i>Motor System
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Motors</td>
                                            <td class="py-2 text-gray-200">4x 720 coreless DC motors</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Max RPM</td>
                                            <td class="py-2 text-gray-200">38,000 RPM</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Voltage</td>
                                            <td class="py-2 text-gray-200">3.7V nominal</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Control</td>
                                            <td class="py-2 text-gray-200">PWM via MOSFET H-bridge</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-sky-200 border-b border-sky-400/30 pb-2">
                                    <i class="fas fa-battery-three-quarters mr-2"></i>Power System
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Battery</td>
                                            <td class="py-2 text-gray-200">1S LiPo 3.7V 600mAh</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Flight Time</td>
                                            <td class="py-2 text-gray-200">8-10 minutes</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Charge Time</td>
                                            <td class="py-2 text-gray-200">~45 minutes (5V 1A)</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Protection</td>
                                            <td class="py-2 text-gray-200">Over-charge, over-discharge</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-sky-200 border-b border-sky-400/30 pb-2">
                                    <i class="fas fa-ruler mr-2"></i>Physical Dimensions
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Size</td>
                                            <td class="py-2 text-gray-200">92 x 92 x 20mm</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Weight</td>
                                            <td class="py-2 text-gray-200">~45g (w/o battery)</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Propellers</td>
                                            <td class="py-2 text-gray-200">4 x 45mm diameter</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Frame</td>
                                            <td class="py-2 text-gray-200">Lightweight plastic + PCB</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-sky-200 border-b border-sky-400/30 pb-2">
                                    <i class="fas fa-plug mr-2"></i>Expansion I/O
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Connector</td>
                                            <td class="py-2 text-gray-200">24-pin 2.54mm header</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">GPIO</td>
                                            <td class="py-2 text-gray-200">18 available pins</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">I2C</td>
                                            <td class="py-2 text-gray-200">1x bus (sensors)</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">SPI</td>
                                            <td class="py-2 text-gray-200">1x bus (expansion modules)</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">UART</td>
                                            <td class="py-2 text-gray-200">2x serial ports</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">ADC</td>
                                            <td class="py-2 text-gray-200">6x channels, 12-bit</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- FLYQ Vision Complete Specs -->
                    <div class="bg-white/10 backdrop-blur rounded-3xl p-8 border-2 border-purple-400/30">
                        <div class="flex items-center mb-6">
                            <div class="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 mr-4">
                                <i class="fas fa-camera text-3xl"></i>
                            </div>
                            <div>
                                <h3 class="text-3xl font-black text-purple-300">FLYQ Vision</h3>
                                <p class="text-gray-300">Camera & Vision AI Drone</p>
                            </div>
                        </div>
                        
                        <div class="space-y-6">
                            <div>
                                <h4 class="text-xl font-bold mb-3 text-purple-200 border-b border-purple-400/30 pb-2">
                                    <i class="fas fa-camera mr-2"></i>Camera Module
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Sensor</td>
                                            <td class="py-2 text-gray-200">OV2640 2MP CMOS</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Resolution</td>
                                            <td class="py-2 text-gray-200">1280 x 720 (HD 720p)</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Frame Rate</td>
                                            <td class="py-2 text-gray-200">30 FPS</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">FOV</td>
                                            <td class="py-2 text-gray-200">120° wide angle</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Streaming</td>
                                            <td class="py-2 text-gray-200">Real-time Wi-Fi MJPEG</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-purple-200 border-b border-purple-400/30 pb-2">
                                    <i class="fas fa-brain mr-2"></i>Vision Processing
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">PSRAM</td>
                                            <td class="py-2 text-gray-200">8MB for frame buffers</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">AI Accelerator</td>
                                            <td class="py-2 text-gray-200">Vector instructions</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Gesture Recognition</td>
                                            <td class="py-2 text-gray-200">Hand tracking, poses</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Latency</td>
                                            <td class="py-2 text-gray-200">< 200ms streaming</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-purple-200 border-b border-purple-400/30 pb-2">
                                    <i class="fas fa-microchip mr-2"></i>Enhanced Processor
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">CPU</td>
                                            <td class="py-2 text-gray-200">ESP32-S3 Dual-Core @ 240MHz</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">SRAM</td>
                                            <td class="py-2 text-gray-200">512KB on-chip</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">PSRAM</td>
                                            <td class="py-2 text-gray-200">8MB external</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Flash</td>
                                            <td class="py-2 text-gray-200">4MB SPI flash</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-purple-200 border-b border-purple-400/30 pb-2">
                                    <i class="fas fa-hand-paper mr-2"></i>Gesture Control Features
                                </h4>
                                <ul class="space-y-2 text-gray-200 text-sm">
                                    <li><i class="fas fa-check text-green-400 mr-2"></i>Takeoff/landing hand gestures</li>
                                    <li><i class="fas fa-check text-green-400 mr-2"></i>Direction control with hand movements</li>
                                    <li><i class="fas fa-check text-green-400 mr-2"></i>Photo/video capture triggers</li>
                                    <li><i class="fas fa-check text-green-400 mr-2"></i>Follow-me mode via hand tracking</li>
                                    <li><i class="fas fa-check text-green-400 mr-2"></i>Emergency stop gesture</li>
                                </ul>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-purple-200 border-b border-purple-400/30 pb-2">
                                    <i class="fas fa-wifi mr-2"></i>Enhanced Connectivity
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Wi-Fi</td>
                                            <td class="py-2 text-gray-200">802.11 b/g/n dual antenna</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Video Streaming</td>
                                            <td class="py-2 text-gray-200">HD 720p @ 30fps</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Range</td>
                                            <td class="py-2 text-gray-200">50m with video</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Protocols</td>
                                            <td class="py-2 text-gray-200">UDP, WebSocket, RTSP</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-purple-200 border-b border-purple-400/30 pb-2">
                                    <i class="fas fa-code mr-2"></i>SDK & Programming
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Arduino IDE</td>
                                            <td class="py-2 text-gray-200">✓ Full support + camera libs</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Python SDK</td>
                                            <td class="py-2 text-gray-200">✓ OpenCV integration</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">ESP-IDF</td>
                                            <td class="py-2 text-gray-200">✓ Advanced firmware</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Mobile App</td>
                                            <td class="py-2 text-gray-200">iOS & Android (WebRTC)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 class="text-xl font-bold mb-3 text-purple-200 border-b border-purple-400/30 pb-2">
                                    <i class="fas fa-battery-three-quarters mr-2"></i>Power & Performance
                                </h4>
                                <table class="w-full text-left text-sm">
                                    <tbody class="space-y-2">
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Battery</td>
                                            <td class="py-2 text-gray-200">1S LiPo 3.7V 600mAh</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Flight Time</td>
                                            <td class="py-2 text-gray-200">7-9 min (with camera)</td>
                                        </tr>
                                        <tr class="border-b border-gray-700/50">
                                            <td class="py-2 font-semibold text-gray-300">Weight</td>
                                            <td class="py-2 text-gray-200">~52g (w/ camera)</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 font-semibold text-gray-300">Power Draw</td>
                                            <td class="py-2 text-gray-200">Higher due to camera</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Support -->
                <div class="mt-16 bg-gradient-to-r from-sky-500 to-blue-600 p-8 rounded-3xl text-center">
                    <h3 class="text-3xl font-black mb-4">Need Hardware Support?</h3>
                    <p class="text-xl mb-6 opacity-90">Our technical team is here to help with any hardware questions</p>
                    <div class="flex justify-center gap-6 flex-wrap">
                        <a href="mailto:info@passion3dworld.com" class="bg-white text-sky-600 px-8 py-3 rounded-full font-bold inline-flex items-center hover:shadow-xl transition">
                            <i class="fas fa-envelope mr-2"></i>
                            info@passion3dworld.com
                        </a>
                        <a href="tel:+919137361474" class="bg-white text-sky-600 px-8 py-3 rounded-full font-bold inline-flex items-center hover:shadow-xl transition">
                            <i class="fas fa-phone mr-2"></i>
                            +91 9137361474
                        </a>
                        <a href="https://wa.me/919137361474" target="_blank" class="bg-green-500 text-white px-8 py-3 rounded-full font-bold inline-flex items-center hover:shadow-xl transition">
                            <i class="fab fa-whatsapp mr-2"></i>
                            WhatsApp Support
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- FLYQ Design Philosophy - Inspired by Professional Drone Engineering -->
        <section class="py-20 bg-gradient-to-br from-white to-blue-50">
            <div class="container mx-auto px-6 max-w-7xl">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        <i class="fas fa-lightbulb text-yellow-500 mr-3"></i>
                        <span class="text-sky-500">Design</span> Philosophy
                    </h2>
                    <p class="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Professional drone engineering made accessible for education and development
                    </p>
                </div>

                <!-- Easy Assembly & Affordable -->
                <div class="mb-20 bg-white p-12 rounded-3xl shadow-2xl border-4 border-sky-100">
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div class="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold mb-6">
                                <i class="fas fa-check-circle mr-2"></i>Beginner Friendly
                            </div>
                            <h3 class="text-4xl font-black mb-6 text-gray-800">
                                Easy Assembly &<br/>
                                <span class="text-sky-500">Affordable Pricing</span>
                            </h3>
                            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                                FLYQ drones are designed with education in mind. Unlike expensive commercial drones, 
                                FLYQ provides professional-grade hardware at student-friendly prices. All components 
                                are clearly labeled, and assembly takes just 30 minutes with our step-by-step guide.
                            </p>
                            <div class="space-y-4">
                                <div class="flex items-start">
                                    <i class="fas fa-tools text-sky-500 text-2xl mr-4 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-lg mb-1">Modular Design</h4>
                                        <p class="text-gray-600">Snap-together components with clear markings - no soldering required for basic assembly</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-rupee-sign text-green-500 text-2xl mr-4 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-lg mb-1">Budget-Friendly</h4>
                                        <p class="text-gray-600">Starting at ₹8,999 - 10x cheaper than commercial alternatives like DJI Tello</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-book-open text-orange-500 text-2xl mr-4 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-lg mb-1">Complete Documentation</h4>
                                        <p class="text-gray-600">Video tutorials, illustrated guides, and 24/7 community support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="bg-gradient-to-br from-sky-500 to-blue-600 p-8 rounded-2xl text-white">
                                <h4 class="text-2xl font-bold mb-6">What's Included</h4>
                                <ul class="space-y-3">
                                    <li class="flex items-center"><i class="fas fa-check mr-3 text-green-300"></i>Pre-assembled flight controller PCB</li>
                                    <li class="flex items-center"><i class="fas fa-check mr-3 text-green-300"></i>4x Brushless motors (pre-mounted)</li>
                                    <li class="flex items-center"><i class="fas fa-check mr-3 text-green-300"></i>4x Propellers with spare set</li>
                                    <li class="flex items-center"><i class="fas fa-check mr-3 text-green-300"></i>LiPo battery with charger</li>
                                    <li class="flex items-center"><i class="fas fa-check mr-3 text-green-300"></i>USB-C cable for programming</li>
                                    <li class="flex items-center"><i class="fas fa-check mr-3 text-green-300"></i>Frame kit (pre-cut carbon fiber)</li>
                                    <li class="flex items-center"><i class="fas fa-check mr-3 text-green-300"></i>Quick start guide & stickers</li>
                                </ul>
                                <div class="mt-8 pt-6 border-t border-white/30">
                                    <p class="text-sm opacity-90">
                                        <i class="fas fa-clock mr-2"></i>
                                        <strong>Assembly Time:</strong> 30 minutes for beginners
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- WiFi-Based Smart Control -->
                <div class="mb-20 bg-gradient-to-br from-purple-50 to-pink-50 p-12 rounded-3xl border-4 border-purple-200">
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <div class="order-2 md:order-1">
                            <div class="bg-white p-8 rounded-2xl shadow-lg">
                                <h4 class="text-2xl font-bold mb-6 text-purple-600">
                                    <i class="fas fa-mobile-alt mr-2"></i>Control Methods
                                </h4>
                                <div class="space-y-4">
                                    <div class="bg-gradient-to-r from-blue-500 to-sky-500 p-4 rounded-xl text-white">
                                        <h5 class="font-bold mb-2"><i class="fas fa-wifi mr-2"></i>Web-Based Controller</h5>
                                        <p class="text-sm opacity-90">Control from any device with a web browser - no app installation required</p>
                                    </div>
                                    <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl text-white">
                                        <h5 class="font-bold mb-2"><i class="fab fa-python mr-2"></i>Python Scripts</h5>
                                        <p class="text-sm opacity-90">Write autonomous flight programs using CrazyFlie Python API</p>
                                    </div>
                                    <div class="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl text-white">
                                        <h5 class="font-bold mb-2"><i class="fas fa-gamepad mr-2"></i>Joystick/Controller</h5>
                                        <p class="text-sm opacity-90">Connect any USB gamepad for manual flight control</p>
                                    </div>
                                    <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl text-white">
                                        <h5 class="font-bold mb-2"><i class="fas fa-code mr-2"></i>Custom Applications</h5>
                                        <p class="text-sm opacity-90">Build your own control apps using WebSocket API</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order-1 md:order-2">
                            <div class="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold mb-6">
                                <i class="fas fa-wifi mr-2"></i>No Radio Controller Required
                            </div>
                            <h3 class="text-4xl font-black mb-6 text-gray-800">
                                WiFi-Based<br/>
                                <span class="text-purple-600">Smart Control</span>
                            </h3>
                            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                                FLYQ uses WiFi for control - eliminating the need for expensive radio transmitters. 
                                Connect your smartphone, tablet, or laptop to the drone's WiFi hotspot and control 
                                it through a web interface or Python scripts.
                            </p>
                            <div class="space-y-4">
                                <div class="flex items-start">
                                    <i class="fas fa-bolt text-yellow-500 text-2xl mr-4 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-lg mb-1">Low Latency</h4>
                                        <p class="text-gray-600">20-30ms response time - fast enough for manual flight and real-time control</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-signal text-blue-500 text-2xl mr-4 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-lg mb-1">50m Range</h4>
                                        <p class="text-gray-600">Reliable 2.4GHz WiFi connection up to 50 meters (line of sight)</p>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-video text-red-500 text-2xl mr-4 mt-1"></i>
                                    <div>
                                        <h4 class="font-bold text-lg mb-1">Live Video Streaming</h4>
                                        <p class="text-gray-600">FLYQ Vision streams 720p video @ 30fps directly to your device (WiFi Vision model only)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Expansion & Compatibility -->
                <div class="mb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12 rounded-3xl">
                    <h3 class="text-4xl font-black mb-8 text-center">
                        <i class="fas fa-puzzle-piece text-sky-400 mr-3"></i>
                        <span class="text-sky-400">Expansion</span> & Compatibility
                    </h3>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-12">
                        <!-- Expansion Pins -->
                        <div class="bg-white/10 backdrop-blur p-8 rounded-2xl border-2 border-sky-400/30">
                            <h4 class="text-2xl font-bold mb-6 text-sky-300">
                                <i class="fas fa-plug mr-2"></i>24-Pin Expansion Header
                            </h4>
                            <p class="text-gray-300 mb-6">
                                FLYQ features a professional expansion connector supporting multiple communication protocols:
                            </p>
                            <div class="space-y-3">
                                <div class="flex items-center">
                                    <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">I²C</span>
                                    <span class="text-gray-200">2x I²C buses for sensors (barometer, ToF, compass)</span>
                                </div>
                                <div class="flex items-center">
                                    <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">SPI</span>
                                    <span class="text-gray-200">High-speed SPI for displays, SD cards, optical flow</span>
                                </div>
                                <div class="flex items-center">
                                    <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">UART</span>
                                    <span class="text-gray-200">2x UART for GPS, telemetry, external MCU</span>
                                </div>
                                <div class="flex items-center">
                                    <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">GPIO</span>
                                    <span class="text-gray-200">10x GPIO pins with PWM, ADC, DAC support</span>
                                </div>
                                <div class="flex items-center">
                                    <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">POWER</span>
                                    <span class="text-gray-200">5V & 3.3V regulated power (500mA max)</span>
                                </div>
                            </div>
                        </div>

                        <!-- Compatible Sensors -->
                        <div class="bg-white/10 backdrop-blur p-8 rounded-2xl border-2 border-green-400/30">
                            <h4 class="text-2xl font-bold mb-6 text-green-300">
                                <i class="fas fa-microchip mr-2"></i>Compatible Sensors & Modules
                            </h4>
                            <p class="text-gray-300 mb-6">
                                Expand your FLYQ with professional-grade sensors:
                            </p>
                            <div class="space-y-4">
                                <div>
                                    <h5 class="font-bold text-sky-300 mb-2">Altitude & Position</h5>
                                    <ul class="text-sm text-gray-200 space-y-1 ml-4">
                                        <li>• VL53L1X ToF sensor (accurate height hold)</li>
                                        <li>• MS5611 barometer (altitude measurement)</li>
                                        <li>• PMW3901 optical flow (position lock indoors)</li>
                                        <li>• GPS module (outdoor navigation)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 class="font-bold text-sky-300 mb-2">Vision & Display</h5>
                                    <ul class="text-sm text-gray-200 space-y-1 ml-4">
                                        <li>• ESP32-CAM (additional camera angles)</li>
                                        <li>• OLED displays (status information)</li>
                                        <li>• WS2812 LED strips (visual effects)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 class="font-bold text-sky-300 mb-2">Environmental</h5>
                                    <ul class="text-sm text-gray-200 space-y-1 ml-4">
                                        <li>• BME280 (temperature, humidity, pressure)</li>
                                        <li>• Air quality sensors (gas detection)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- CrazyFlie Compatibility -->
                    <div class="bg-gradient-to-br from-yellow-500 to-orange-600 p-8 rounded-2xl">
                        <div class="flex items-center mb-6">
                            <i class="fab fa-python text-6xl mr-6"></i>
                            <div>
                                <h4 class="text-3xl font-black">CrazyFlie Python API Compatible</h4>
                                <p class="text-lg opacity-90">Use existing CrazyFlie Python scripts with FLYQ</p>
                            </div>
                        </div>
                        <div class="grid md:grid-cols-3 gap-6">
                            <div class="bg-white/20 backdrop-blur p-4 rounded-xl">
                                <h5 class="font-bold mb-2"><i class="fas fa-code mr-2"></i>Same API</h5>
                                <p class="text-sm opacity-90">Compatible with CrazyFlie Python library - no code changes needed</p>
                            </div>
                            <div class="bg-white/20 backdrop-blur p-4 rounded-xl">
                                <h5 class="font-bold mb-2"><i class="fas fa-rocket mr-2"></i>Autonomous Flight</h5>
                                <p class="text-sm opacity-90">Run waypoint navigation, formations, and advanced maneuvers</p>
                            </div>
                            <div class="bg-white/20 backdrop-blur p-4 rounded-xl">
                                <h5 class="font-bold mb-2"><i class="fas fa-users mr-2"></i>Large Community</h5>
                                <p class="text-sm opacity-90">Access thousands of example projects and tutorials</p>
                            </div>
                        </div>
                    </div>
                </div>

        <!-- Programming Tutorials - Comprehensive Guide -->
        <section class="py-20 bg-gradient-to-br from-white to-gray-50" id="programming">
            <div class="container mx-auto px-6 max-w-7xl">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        <i class="fas fa-code text-sky-500 mr-3"></i>
                        <span class="text-sky-500">Programming</span> Tutorials
                    </h2>
                    <p class="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Complete guides for Arduino, Python, and ESP-IDF development
                    </p>
                </div>

                <!-- Arduino IDE Tutorial -->
                <div class="mb-20 bg-gradient-to-br from-teal-50 to-cyan-50 p-12 rounded-3xl border-4 border-teal-200">
                    <div class="flex items-center mb-8">
                        <div class="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-6 mr-6">
                            <i class="fas fa-code text-white text-5xl"></i>
                        </div>
                        <div>
                            <h3 class="text-5xl font-black text-teal-700 mb-2">Arduino IDE Tutorial</h3>
                            <p class="text-2xl text-gray-700">Perfect for beginners • Rapid prototyping • Extensive libraries</p>
                        </div>
                    </div>

                    <!-- Arduino Setup -->
                    <div class="mb-10 bg-white p-8 rounded-2xl shadow-lg">
                        <h4 class="text-3xl font-bold mb-6 text-gray-800">
                            <i class="fas fa-download mr-3 text-teal-500"></i>Setup & Installation
                        </h4>
                        <ol class="space-y-4 text-lg text-gray-700">
                            <li class="flex items-start">
                                <span class="bg-teal-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</span>
                                <div>
                                    <strong>Download Arduino IDE:</strong> Visit <a href="https://arduino.cc/downloads" target="_blank" class="text-teal-600 underline">arduino.cc/downloads</a> and download for your OS (Windows/Mac/Linux)
                                </div>
                            </li>
                            <li class="flex items-start">
                                <span class="bg-teal-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</span>
                                <div>
                                    <strong>Install ESP32 Board Support:</strong>
                                    <ul class="ml-6 mt-2 space-y-1 text-gray-600">
                                        <li>• Open Arduino IDE → File → Preferences</li>
                                        <li>• Add board manager URL: <code class="bg-gray-200 px-2 py-1 rounded text-sm">https://espressif.github.io/arduino-esp32/package_esp32_index.json</code></li>
                                        <li>• Tools → Board → Boards Manager → Search "ESP32" → Install</li>
                                    </ul>
                                </div>
                            </li>
                            <li class="flex items-start">
                                <span class="bg-teal-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</span>
                                <div>
                                    <strong>Select Board:</strong> Tools → Board → ESP32 Arduino → ESP32S3 Dev Module
                                </div>
                            </li>
                            <li class="flex items-start">
                                <span class="bg-teal-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</span>
                                <div>
                                    <strong>Connect Drone:</strong> USB-C cable → Tools → Port → Select COM port (e.g., COM3, /dev/ttyUSB0)
                                </div>
                            </li>
                        </ol>
                    </div>

                    <!-- Arduino Example 1: Blink LED -->
                    <div class="mb-10 bg-white p-8 rounded-2xl shadow-lg">
                        <h4 class="text-3xl font-bold mb-6 text-gray-800">
                            <i class="fas fa-lightbulb mr-3 text-yellow-500"></i>Example 1: Blink LED
                        </h4>
                        <p class="text-lg text-gray-700 mb-4">Simple program to blink the onboard LED. Perfect first test!</p>
                        <div class="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
<pre>// FLYQ Air - Blink LED Example
#define LED_PIN 2  // Onboard LED on GPIO2

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
  Serial.println("FLYQ Air - LED Blink Test");
}

void loop() {
  digitalWrite(LED_PIN, HIGH);   // Turn LED on
  Serial.println("LED ON");
  delay(1000);                    // Wait 1 second
  
  digitalWrite(LED_PIN, LOW);    // Turn LED off
  Serial.println("LED OFF");
  delay(1000);                    // Wait 1 second
}</pre>
                        </div>
                        <div class="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p class="text-blue-800">
                                <i class="fas fa-info-circle mr-2"></i>
                                <strong>Upload:</strong> Click the Upload button (→) in Arduino IDE. LED should blink once upload completes!
                            </p>
                        </div>
                    </div>

                    <!-- Arduino Example 2: Read IMU -->
                    <div class="mb-10 bg-white p-8 rounded-2xl shadow-lg">
                        <h4 class="text-3xl font-bold mb-6 text-gray-800">
                            <i class="fas fa-compass mr-3 text-blue-500"></i>Example 2: Read IMU Sensor
                        </h4>
                        <p class="text-lg text-gray-700 mb-4">Read gyroscope and accelerometer data from MPU6050 IMU</p>
                        <div class="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
<pre>// FLYQ Air - IMU Reader
#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu;

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);  // SDA=21, SCL=22
  
  Serial.println("Initializing IMU...");
  mpu.initialize();
  
  if (mpu.testConnection()) {
    Serial.println("MPU6050 connected!");
  } else {
    Serial.println("MPU6050 connection failed!");
  }
}

void loop() {
  // Read accelerometer (in g)
  int16_t ax, ay, az;
  mpu.getAcceleration(&ax, &ay, &az);
  
  // Read gyroscope (in degrees/sec)
  int16_t gx, gy, gz;
  mpu.getRotation(&gx, &gy, &gz);
  
  // Print values
  Serial.print("Accel: ");
  Serial.print(ax/16384.0); Serial.print("g, ");
  Serial.print(ay/16384.0); Serial.print("g, ");
  Serial.print(az/16384.0); Serial.println("g");
  
  Serial.print("Gyro: ");
  Serial.print(gx/131.0); Serial.print("°/s, ");
  Serial.print(gy/131.0); Serial.print("°/s, ");
  Serial.print(gz/131.0); Serial.println("°/s");
  
  delay(100);
}</pre>
                        </div>
                        <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
                            <p class="text-yellow-800">
                                <i class="fas fa-exclamation-triangle mr-2"></i>
                                <strong>Library Required:</strong> Install "MPU6050" library via Library Manager (Sketch → Include Library → Manage Libraries)
                            </p>
                        </div>
                    </div>

                    <!-- Arduino Example 3: Motor Control -->
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h4 class="text-3xl font-bold mb-6 text-gray-800">
                            <i class="fas fa-cog mr-3 text-purple-500"></i>Example 3: Basic Motor Control
                        </h4>
                        <p class="text-lg text-gray-700 mb-4">Control motor speed using PWM signals</p>
                        <div class="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
<pre>// FLYQ Air - Motor Control
#define MOTOR1_PIN 25  // Front-left motor
#define MOTOR2_PIN 26  // Front-right motor  
#define MOTOR3_PIN 27  // Rear-left motor
#define MOTOR4_PIN 33  // Rear-right motor

// PWM settings
const int freq = 20000;      // 20 kHz
const int resolution = 8;     // 8-bit (0-255)

void setup() {
  Serial.begin(115200);
  
  // Configure PWM channels
  ledcSetup(0, freq, resolution);
  ledcSetup(1, freq, resolution);
  ledcSetup(2, freq, resolution);
  ledcSetup(3, freq, resolution);
  
  // Attach pins to channels
  ledcAttachPin(MOTOR1_PIN, 0);
  ledcAttachPin(MOTOR2_PIN, 1);
  ledcAttachPin(MOTOR3_PIN, 2);
  ledcAttachPin(MOTOR4_PIN, 3);
  
  Serial.println("Motor control ready!");
}

void setMotorSpeed(int motor, int speed) {
  // Speed: 0-255
  ledcWrite(motor, speed);
}

void loop() {
  // Gradual speed test
  for(int speed = 0; speed <= 255; speed += 5) {
    setMotorSpeed(0, speed);  // Motor 1
    setMotorSpeed(1, speed);  // Motor 2
    setMotorSpeed(2, speed);  // Motor 3
    setMotorSpeed(3, speed);  // Motor 4
    
    Serial.print("Speed: ");
    Serial.println(speed);
    delay(100);
  }
  
  // Stop motors
  for(int i = 0; i < 4; i++) {
    setMotorSpeed(i, 0);
  }
  
  delay(2000);
}</pre>
                        </div>
                        <div class="mt-4 p-4 bg-red-50 rounded-lg">
                            <p class="text-red-800">
                                <i class="fas fa-exclamation-circle mr-2"></i>
                                <strong>Safety Warning:</strong> Remove propellers before testing motors! Never test with propellers attached to bench.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Python SDK Tutorial -->
                <div class="mb-20 bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-3xl border-4 border-blue-200">
                    <div class="flex items-center mb-8">
                        <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 mr-6">
                            <i class="fab fa-python text-white text-5xl"></i>
                        </div>
                        <div>
                            <h3 class="text-5xl font-black text-blue-700 mb-2">Python SDK Tutorial</h3>
                            <p class="text-2xl text-gray-700">Autonomous flight • Advanced missions • Crazyflie-compatible</p>
                        </div>
                    </div>

                    <!-- Python Setup -->
                    <div class="mb-10 bg-white p-8 rounded-2xl shadow-lg">
                        <h4 class="text-3xl font-bold mb-6 text-gray-800">
                            <i class="fas fa-download mr-3 text-blue-500"></i>Setup & Installation
                        </h4>
                        <div class="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm mb-4">
<pre># Install Python 3.8+ (check version)
python --version

# Install cflib (Crazyflie library)
pip install cflib

# Install additional dependencies
pip install numpy matplotlib

# Verify installation
python -c "import cflib; print('cflib version:', cflib.__version__)"</pre>
                        </div>
                    </div>

                    <!-- Python Example 1: Connect -->
                    <div class="mb-10 bg-white p-8 rounded-2xl shadow-lg">
                        <h4 class="text-3xl font-bold mb-6 text-gray-800">
                            <i class="fas fa-wifi mr-3 text-green-500"></i>Example 1: Connect to Drone
                        </h4>
                        <div class="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
<pre># connect_drone.py
import cflib.crtp
from cflib.crazyflie import Crazyflie
import time

# Initialize drivers
cflib.crtp.init_drivers()

# URI of the drone (radio://0/80/2M/E7E7E7E7E7)
URI = 'radio://0/80/2M'

def connected(link_uri):
    print(f'Connected to {link_uri}')

def disconnected(link_uri):
    print(f'Disconnected from {link_uri}')

def connection_failed(link_uri, msg):
    print(f'Connection failed: {msg}')

# Create Crazyflie object
cf = Crazyflie()

# Add callbacks
cf.connected.add_callback(connected)
cf.disconnected.add_callback(disconnected)
cf.connection_failed.add_callback(connection_failed)

print('Connecting to drone...')
cf.open_link(URI)

# Keep connection alive
time.sleep(5)

# Disconnect
cf.close_link()
print('Connection closed')</pre>
                        </div>
                    </div>

                    <!-- Python Example 2: Autonomous Flight -->
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h4 class="text-3xl font-bold mb-6 text-gray-800">
                            <i class="fas fa-plane mr-3 text-blue-500"></i>Example 2: Autonomous Flight
                        </h4>
                        <div class="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
<pre># autonomous_flight.py
import cflib.crtp
from cflib.crazyflie import Crazyflie
from cflib.crazyflie.syncCrazyflie import SyncCrazyflie
from cflib.positioning.motion_commander import MotionCommander
import time

cflib.crtp.init_drivers()
URI = 'radio://0/80/2M'

def simple_flight():
    with SyncCrazyflie(URI, cf=Crazyflie(rw_cache='./cache')) as scf:
        with MotionCommander(scf) as mc:
            print('Taking off...')
            time.sleep(1)
            
            print('Moving forward 0.5m')
            mc.forward(0.5)
            time.sleep(1)
            
            print('Moving left 0.5m')
            mc.left(0.5)
            time.sleep(1)
            
            print('Moving back 0.5m')
            mc.back(0.5)
            time.sleep(1)
            
            print('Moving right 0.5m')
            mc.right(0.5)
            time.sleep(1)
            
            print('Turning 360°')
            mc.turn_right(360)
            time.sleep(1)
            
            print('Landing...')
            # MotionCommander auto-lands on exit

if __name__ == '__main__':
    simple_flight()
    print('Flight complete!')</pre>
                        </div>
                        <div class="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p class="text-blue-800">
                                <i class="fas fa-info-circle mr-2"></i>
                                <strong>Run:</strong> <code class="bg-gray-200 px-2 py-1 rounded">python autonomous_flight.py</code>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- ESP-IDF Tutorial -->
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-12 rounded-3xl border-4 border-purple-200">
                    <div class="flex items-center mb-8">
                        <div class="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 mr-6">
                            <i class="fas fa-terminal text-white text-5xl"></i>
                        </div>
                        <div>
                            <h3 class="text-5xl font-black text-purple-700 mb-2">ESP-IDF Tutorial</h3>
                            <p class="text-2xl text-gray-700">Professional firmware • RTOS • Advanced features</p>
                        </div>
                    </div>

                    <!-- ESP-IDF Setup -->
                    <div class="mb-10 bg-white p-8 rounded-2xl shadow-lg">
                        <h4 class="text-3xl font-bold mb-6 text-gray-800">
                            <i class="fas fa-download mr-3 text-purple-500"></i>Setup & Installation
                        </h4>
                        <div class="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
<pre># Linux/macOS
# Install prerequisites
sudo apt-get install git wget flex bison gperf python3 python3-pip \\
  python3-setuptools cmake ninja-build ccache libffi-dev libssl-dev \\
  dfu-util libusb-1.0-0

# Download ESP-IDF
mkdir -p ~/esp
cd ~/esp
git clone --recursive https://github.com/espressif/esp-idf.git

# Install tools
cd ~/esp/esp-idf
./install.sh esp32s3

# Setup environment (add to ~/.bashrc)
. $HOME/esp/esp-idf/export.sh

# Verify installation
idf.py --version</pre>
                        </div>
                    </div>

                    <!-- ESP-IDF Example -->
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h4 class="text-3xl font-bold mb-6 text-gray-800">
                            <i class="fas fa-code mr-3 text-purple-500"></i>Example: FreeRTOS Task
                        </h4>
                        <div class="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
<pre>// main.c - FreeRTOS Task Example
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"

#define LED_PIN GPIO_NUM_2

void blink_task(void *pvParameter) {
    gpio_set_direction(LED_PIN, GPIO_MODE_OUTPUT);
    
    while(1) {
        gpio_set_level(LED_PIN, 1);
        printf("LED ON\\n");
        vTaskDelay(1000 / portTICK_PERIOD_MS);
        
        gpio_set_level(LED_PIN, 0);
        printf("LED OFF\\n");
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

void app_main(void) {
    printf("FLYQ Air - FreeRTOS Example\\n");
    xTaskCreate(&blink_task, "blink_task", 2048, NULL, 5, NULL);
}</pre>
                        </div>
                        <div class="mt-4 p-4 bg-purple-50 rounded-lg">
                            <p class="text-purple-800">
                                <i class="fas fa-terminal mr-2"></i>
                                <strong>Build & Flash:</strong> <code class="bg-gray-200 px-2 py-1 rounded">idf.py build flash monitor</code>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Firmware Flashing Guide -->
        <section class="py-20 bg-gradient-to-br from-orange-50 to-red-50" id="firmware">
            <div class="container mx-auto px-6 max-w-7xl">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        <i class="fas fa-download text-orange-500 mr-3"></i>
                        <span class="text-orange-500">Firmware</span> Flashing Guide
                    </h2>
                    <p class="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Step-by-step guide to flash firmware on your FLYQ drone
                    </p>
                </div>

                <div class="bg-white p-12 rounded-3xl shadow-2xl">
                    <div class="space-y-10">
                        <!-- Method 1: Arduino IDE -->
                        <div class="border-l-4 border-orange-500 pl-8">
                            <h3 class="text-4xl font-bold mb-6 text-gray-800">
                                Method 1: Arduino IDE (Easiest)
                            </h3>
                            <ol class="space-y-4 text-lg text-gray-700">
                                <li class="flex items-start">
                                    <span class="bg-orange-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">1</span>
                                    <div>
                                        <strong>Connect drone via USB-C</strong>
                                        <p class="text-gray-600 mt-1">Connect your FLYQ to computer. LED should turn on.</p>
                                    </div>
                                </li>
                                <li class="flex items-start">
                                    <span class="bg-orange-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">2</span>
                                    <div>
                                        <strong>Select board and port</strong>
                                        <ul class="text-gray-600 mt-1 ml-4">
                                            <li>• Tools → Board → ESP32S3 Dev Module</li>
                                            <li>• Tools → Port → COM3 (or /dev/ttyUSB0)</li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="flex items-start">
                                    <span class="bg-orange-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">3</span>
                                    <div>
                                        <strong>Open example sketch</strong>
                                        <p class="text-gray-600 mt-1">File → Examples → FLYQ → BasicFlight</p>
                                    </div>
                                </li>
                                <li class="flex items-start">
                                    <span class="bg-orange-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">4</span>
                                    <div>
                                        <strong>Click Upload (→)</strong>
                                        <p class="text-gray-600 mt-1">Wait for "Done uploading" message</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <!-- Method 2: esptool -->
                        <div class="border-l-4 border-blue-500 pl-8">
                            <h3 class="text-4xl font-bold mb-6 text-gray-800">
                                Method 2: esptool (Advanced)
                            </h3>
                            <div class="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm">
<pre># Install esptool
pip install esptool

# Download firmware.bin from GitHub releases
wget https://github.com/passion3d/flyq-firmware/releases/latest/download/firmware.bin

# Flash firmware
esptool.py --chip esp32s3 --port /dev/ttyUSB0 write_flash 0x0 firmware.bin

# Verify
esptool.py --chip esp32s3 --port /dev/ttyUSB0 verify_flash 0x0 firmware.bin</pre>
                            </div>
                        </div>

                        <!-- Troubleshooting -->
                        <div class="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6">
                            <h4 class="text-2xl font-bold mb-4 text-yellow-800">
                                <i class="fas fa-exclamation-triangle mr-2"></i>Common Issues
                            </h4>
                            <ul class="space-y-2 text-gray-700">
                                <li><strong>Port not found:</strong> Install CH340/CP210x USB drivers</li>
                                <li><strong>Failed to connect:</strong> Hold BOOT button while connecting USB</li>
                                <li><strong>Timeout error:</strong> Try different USB cable or port</li>
                                <li><strong>Permission denied:</strong> Run <code class="bg-gray-200 px-2 py-1 rounded">sudo usermod -a -G dialout $USER</code> (Linux)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Flight Manual with Safety -->
        <section class="py-20 bg-gradient-to-br from-green-50 to-emerald-50" id="flight-manual">
            <div class="container mx-auto px-6 max-w-7xl">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        <i class="fas fa-plane text-green-500 mr-3"></i>
                        <span class="text-green-500">Flight</span> Manual
                    </h2>
                    <p class="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Complete safety procedures and flight operations guide
                    </p>
                </div>

                <!-- Safety First -->
                <div class="mb-12 bg-red-500 text-white p-10 rounded-3xl">
                    <h3 class="text-5xl font-black mb-6 flex items-center">
                        <i class="fas fa-exclamation-triangle mr-4"></i>
                        Safety First!
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6 text-lg">
                        <div>
                            <h4 class="text-2xl font-bold mb-3">❌ Never:</h4>
                            <ul class="space-y-2">
                                <li>• Fly near people, animals, or buildings</li>
                                <li>• Fly outdoors in wind or rain</li>
                                <li>• Touch spinning propellers</li>
                                <li>• Fly with damaged propellers</li>
                                <li>• Leave battery charging unattended</li>
                                <li>• Fly with low battery warning</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold mb-3">✅ Always:</h4>
                            <ul class="space-y-2">
                                <li>• Inspect drone before flight</li>
                                <li>• Use propeller guards indoors</li>
                                <li>• Keep clear 3m safety zone</li>
                                <li>• Calibrate IMU before flying</li>
                                <li>• Have emergency stop ready</li>
                                <li>• Land with 20% battery remaining</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Pre-Flight Checklist -->
                <div class="mb-12 bg-white p-10 rounded-3xl shadow-xl">
                    <h3 class="text-4xl font-bold mb-8 text-gray-800">
                        <i class="fas fa-clipboard-check text-green-500 mr-3"></i>
                        Pre-Flight Checklist
                    </h3>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div>
                            <h4 class="text-xl font-bold mb-4 text-green-600">Hardware Check</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li><input type="checkbox" class="mr-2"> Battery fully charged</li>
                                <li><input type="checkbox" class="mr-2"> Propellers secure (correct direction)</li>
                                <li><input type="checkbox" class="mr-2"> Frame intact, no cracks</li>
                                <li><input type="checkbox" class="mr-2"> Motors spin freely</li>
                                <li><input type="checkbox" class="mr-2"> Propeller guards attached</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold mb-4 text-blue-600">Software Check</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li><input type="checkbox" class="mr-2"> Wi-Fi connection stable</li>
                                <li><input type="checkbox" class="mr-2"> IMU calibrated</li>
                                <li><input type="checkbox" class="mr-2"> Control app responsive</li>
                                <li><input type="checkbox" class="mr-2"> Firmware up to date</li>
                                <li><input type="checkbox" class="mr-2"> Emergency stop tested</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold mb-4 text-purple-600">Environment Check</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li><input type="checkbox" class="mr-2"> Indoor or calm weather</li>
                                <li><input type="checkbox" class="mr-2"> 3m clear radius</li>
                                <li><input type="checkbox" class="mr-2"> No obstacles overhead</li>
                                <li><input type="checkbox" class="mr-2"> Good lighting</li>
                                <li><input type="checkbox" class="mr-2"> No people/pets nearby</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Flight Procedures -->
                <div class="bg-white p-10 rounded-3xl shadow-xl">
                    <h3 class="text-4xl font-bold mb-8 text-gray-800">
                        <i class="fas fa-helicopter text-blue-500 mr-3"></i>
                        Flight Procedures
                    </h3>
                    <div class="space-y-8">
                        <div>
                            <h4 class="text-2xl font-bold mb-4 text-gray-800">Takeoff</h4>
                            <ol class="space-y-2 text-gray-700 ml-6">
                                <li><strong>1.</strong> Place drone on flat surface</li>
                                <li><strong>2.</strong> Power on drone, wait for solid LED</li>
                                <li><strong>3.</strong> Connect controller/app</li>
                                <li><strong>4.</strong> Arm motors (throttle down + yaw right)</li>
                                <li><strong>5.</strong> Gradually increase throttle to hover</li>
                            </ol>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold mb-4 text-gray-800">In-Flight</h4>
                            <ul class="space-y-2 text-gray-700 ml-6">
                                <li>• Maintain visual line of sight</li>
                                <li>• Keep within 50m range</li>
                                <li>• Monitor battery level</li>
                                <li>• Smooth control inputs</li>
                                <li>• Stay below 3m altitude indoors</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold mb-4 text-gray-800">Landing</h4>
                            <ol class="space-y-2 text-gray-700 ml-6">
                                <li><strong>1.</strong> Position over landing zone</li>
                                <li><strong>2.</strong> Gradually reduce throttle</li>
                                <li><strong>3.</strong> Keep level during descent</li>
                                <li><strong>4.</strong> Cut throttle when touching ground</li>
                                <li><strong>5.</strong> Disarm motors immediately</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Troubleshooting Database -->
        <section class="py-20 bg-gradient-to-br from-gray-100 to-white" id="troubleshooting">
            <div class="container mx-auto px-6 max-w-7xl">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        <i class="fas fa-wrench text-red-500 mr-3"></i>
                        <span class="text-red-500">Troubleshooting</span> Guide
                    </h2>
                    <p class="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Solutions to common issues and problems
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                    <!-- Hardware Issues -->
                    <div class="bg-white p-8 rounded-3xl shadow-xl">
                        <h3 class="text-3xl font-bold mb-6 text-red-600">
                            <i class="fas fa-tools mr-2"></i>Hardware Issues
                        </h3>
                        <div class="space-y-6">
                            <div class="border-b pb-4">
                                <h4 class="font-bold text-lg mb-2">Drone won't power on</h4>
                                <ul class="text-gray-700 space-y-1 ml-4">
                                    <li>• Check battery charge level</li>
                                    <li>• Verify battery connection</li>
                                    <li>• Try different battery</li>
                                    <li>• Check power switch</li>
                                </ul>
                            </div>
                            <div class="border-b pb-4">
                                <h4 class="font-bold text-lg mb-2">Motors not spinning</h4>
                                <ul class="text-gray-700 space-y-1 ml-4">
                                    <li>• Check propeller installation</li>
                                    <li>• Verify motor connections</li>
                                    <li>• Test with motor control code</li>
                                    <li>• Check MOSFET drivers</li>
                                </ul>
                            </div>
                            <div class="border-b pb-4">
                                <h4 class="font-bold text-lg mb-2">Unstable flight/drifting</h4>
                                <ul class="text-gray-700 space-y-1 ml-4">
                                    <li>• Recalibrate IMU on flat surface</li>
                                    <li>• Check propeller balance</li>
                                    <li>• Verify motor speeds are equal</li>
                                    <li>• Tune PID parameters</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-2">Battery not charging</h4>
                                <ul class="text-gray-700 space-y-1 ml-4">
                                    <li>• Try different USB cable</li>
                                    <li>• Use 5V 1A charger</li>
                                    <li>• Check charging LED</li>
                                    <li>• Battery may be dead (< 3.0V)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Software Issues -->
                    <div class="bg-white p-8 rounded-3xl shadow-xl">
                        <h3 class="text-3xl font-bold mb-6 text-blue-600">
                            <i class="fas fa-laptop-code mr-2"></i>Software Issues
                        </h3>
                        <div class="space-y-6">
                            <div class="border-b pb-4">
                                <h4 class="font-bold text-lg mb-2">Can't connect to Wi-Fi</h4>
                                <ul class="text-gray-700 space-y-1 ml-4">
                                    <li>• Wait 30s after power on</li>
                                    <li>• Check SSID: FLYQ-XXXX</li>
                                    <li>• Default password: flyq1234</li>
                                    <li>• Reset Wi-Fi in firmware</li>
                                </ul>
                            </div>
                            <div class="border-b pb-4">
                                <h4 class="font-bold text-lg mb-2">Upload failed in Arduino</h4>
                                <ul class="text-gray-700 space-y-1 ml-4">
                                    <li>• Hold BOOT button during upload</li>
                                    <li>• Select correct COM port</li>
                                    <li>• Install CH340 USB drivers</li>
                                    <li>• Reduce upload speed: 115200</li>
                                </ul>
                            </div>
                            <div class="border-b pb-4">
                                <h4 class="font-bold text-lg mb-2">IMU calibration fails</h4>
                                <ul class="text-gray-700 space-y-1 ml-4">
                                    <li>• Place on perfectly flat surface</li>
                                    <li>• Keep absolutely still during cal</li>
                                    <li>• No vibration or movement</li>
                                    <li>• Retry 3 times if needed</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-2">Python script errors</h4>
                                <ul class="text-gray-700 space-y-1 ml-4">
                                    <li>• Check cflib version: pip install --upgrade cflib</li>
                                    <li>• Verify URI format: radio://0/80/2M</li>
                                    <li>• Check Crazyradio dongle connection</li>
                                    <li>• Run as administrator (Windows)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Support -->
                <div class="mt-12 bg-gradient-to-r from-sky-500 to-blue-600 text-white p-10 rounded-3xl text-center">
                    <h3 class="text-4xl font-black mb-4">Still Need Help?</h3>
                    <p class="text-xl mb-8">Our technical support team is ready to assist you</p>
                    <div class="flex justify-center gap-6 flex-wrap">
                        <a href="mailto:info@passion3dworld.com" class="bg-white text-sky-600 px-8 py-4 rounded-full font-bold inline-flex items-center hover:shadow-2xl transition">
                            <i class="fas fa-envelope mr-2"></i>
                            info@passion3dworld.com
                        </a>
                        <a href="tel:+919137361474" class="bg-white text-sky-600 px-8 py-4 rounded-full font-bold inline-flex items-center hover:shadow-2xl transition">
                            <i class="fas fa-phone mr-2"></i>
                            +91 9137361474
                        </a>
                        <a href="https://wa.me/919137361474" target="_blank" class="bg-green-500 text-white px-8 py-4 rounded-full font-bold inline-flex items-center hover:shadow-2xl transition">
                            <i class="fab fa-whatsapp mr-2"></i>
                            WhatsApp Support
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- API Reference -->
        <section class="py-20 bg-gradient-to-br from-indigo-50 to-purple-50" id="api-reference">
            <div class="container mx-auto px-6 max-w-7xl">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        <i class="fas fa-book text-indigo-500 mr-3"></i>
                        <span class="text-indigo-500">API</span> Reference
                    </h2>
                    <p class="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Complete function library documentation
                    </p>
                </div>

                <!-- Arduino API -->
                <div class="mb-12 bg-white p-10 rounded-3xl shadow-xl">
                    <h3 class="text-4xl font-bold mb-8 text-gray-800">
                        <i class="fas fa-code text-teal-500 mr-3"></i>
                        Arduino API
                    </h3>
                    <div class="space-y-6 font-mono text-sm">
                        <div class="border-l-4 border-teal-500 pl-6 bg-gray-50 p-4 rounded">
                            <h4 class="text-lg font-bold text-gray-800 mb-2">FLYQ.init()</h4>
                            <p class="text-gray-700 mb-2">Initialize FLYQ drone system</p>
                            <p class="text-gray-600"><strong>Returns:</strong> bool - true if successful</p>
                            <div class="mt-2 bg-gray-900 text-green-400 p-3 rounded">
<pre>FLYQ.init(); // Initialize all sensors and motors</pre>
                            </div>
                        </div>

                        <div class="border-l-4 border-teal-500 pl-6 bg-gray-50 p-4 rounded">
                            <h4 class="text-lg font-bold text-gray-800 mb-2">FLYQ.calibrateIMU()</h4>
                            <p class="text-gray-700 mb-2">Calibrate IMU on flat surface</p>
                            <p class="text-gray-600"><strong>Returns:</strong> bool - true if successful</p>
                        </div>

                        <div class="border-l-4 border-teal-500 pl-6 bg-gray-50 p-4 rounded">
                            <h4 class="text-lg font-bold text-gray-800 mb-2">FLYQ.setMotorSpeed(motor, speed)</h4>
                            <p class="text-gray-700 mb-2">Set individual motor speed</p>
                            <p class="text-gray-600"><strong>Parameters:</strong> motor (0-3), speed (0-255)</p>
                            <div class="mt-2 bg-gray-900 text-green-400 p-3 rounded">
<pre>FLYQ.setMotorSpeed(0, 150); // Motor 1 at 60% speed</pre>
                            </div>
                        </div>

                        <div class="border-l-4 border-teal-500 pl-6 bg-gray-50 p-4 rounded">
                            <h4 class="text-lg font-bold text-gray-800 mb-2">FLYQ.setThrottle(value)</h4>
                            <p class="text-gray-700 mb-2">Set all motors to same speed</p>
                            <p class="text-gray-600"><strong>Parameters:</strong> value (0-255)</p>
                        </div>

                        <div class="border-l-4 border-teal-500 pl-6 bg-gray-50 p-4 rounded">
                            <h4 class="text-lg font-bold text-gray-800 mb-2">FLYQ.getIMU()</h4>
                            <p class="text-gray-700 mb-2">Get IMU sensor data</p>
                            <p class="text-gray-600"><strong>Returns:</strong> IMUData struct with gyro and accel</p>
                            <div class="mt-2 bg-gray-900 text-green-400 p-3 rounded">
<pre>IMUData data = FLYQ.getIMU();
Serial.print("Gyro X: "); Serial.println(data.gyro.x);</pre>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Python API -->
                <div class="bg-white p-10 rounded-3xl shadow-xl">
                    <h3 class="text-4xl font-bold mb-8 text-gray-800">
                        <i class="fab fa-python text-blue-500 mr-3"></i>
                        Python API (cflib)
                    </h3>
                    <div class="space-y-6 font-mono text-sm">
                        <div class="border-l-4 border-blue-500 pl-6 bg-gray-50 p-4 rounded">
                            <h4 class="text-lg font-bold text-gray-800 mb-2">MotionCommander.take_off(height)</h4>
                            <p class="text-gray-700 mb-2">Take off to specified height</p>
                            <p class="text-gray-600"><strong>Parameters:</strong> height (meters, default 0.3)</p>
                            <div class="mt-2 bg-gray-900 text-green-400 p-3 rounded">
<pre>mc.take_off(0.5) # Take off to 0.5m</pre>
                            </div>
                        </div>

                        <div class="border-l-4 border-blue-500 pl-6 bg-gray-50 p-4 rounded">
                            <h4 class="text-lg font-bold text-gray-800 mb-2">MotionCommander.forward(distance)</h4>
                            <p class="text-gray-700 mb-2">Fly forward specified distance</p>
                            <p class="text-gray-600"><strong>Parameters:</strong> distance (meters)</p>
                        </div>

                        <div class="border-l-4 border-blue-500 pl-6 bg-gray-50 p-4 rounded">
                            <h4 class="text-lg font-bold text-gray-800 mb-2">MotionCommander.turn_right(angle)</h4>
                            <p class="text-gray-700 mb-2">Turn right by angle in degrees</p>
                            <p class="text-gray-600"><strong>Parameters:</strong> angle (degrees, 0-360)</p>
                            <div class="mt-2 bg-gray-900 text-green-400 p-3 rounded">
<pre>mc.turn_right(90) # Turn 90° right</pre>
                            </div>
                        </div>

                        <div class="border-l-4 border-blue-500 pl-6 bg-gray-50 p-4 rounded">
                            <h4 class="text-lg font-bold text-gray-800 mb-2">MotionCommander.land()</h4>
                            <p class="text-gray-700 mb-2">Land drone at current position</p>
                            <p class="text-gray-600"><strong>Returns:</strong> None</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Project Ideas -->
        <section class="py-20 bg-gradient-to-br from-yellow-50 to-orange-50" id="projects">
            <div class="container mx-auto px-6 max-w-7xl">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        <i class="fas fa-lightbulb text-yellow-500 mr-3"></i>
                        <span class="text-yellow-500">Project</span> Ideas
                    </h2>
                    <p class="text-2xl text-gray-600 max-w-4xl mx-auto">
                        Inspiration and examples for your drone projects
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Beginner Projects -->
                    <div class="bg-white p-8 rounded-3xl shadow-xl">
                        <div class="bg-green-500 text-white text-center py-2 rounded-t-2xl -mx-8 -mt-8 mb-6">
                            <h3 class="text-2xl font-bold">BEGINNER</h3>
                        </div>
                        <div class="space-y-6">
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-gray-800">LED Patterns</h4>
                                <p class="text-gray-600 text-sm mb-2">Create custom LED light shows synchronized with flight</p>
                                <span class="text-xs text-green-600 font-semibold">Arduino • 1 hour</span>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-gray-800">Basic Obstacle Avoidance</h4>
                                <p class="text-gray-600 text-sm mb-2">Use ToF sensor to detect and avoid obstacles</p>
                                <span class="text-xs text-green-600 font-semibold">Arduino • 2 hours</span>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-gray-800">Altitude Hold</h4>
                                <p class="text-gray-600 text-sm mb-2">Implement barometer-based altitude stabilization</p>
                                <span class="text-xs text-green-600 font-semibold">Arduino • 3 hours</span>
                            </div>
                        </div>
                    </div>

                    <!-- Intermediate Projects -->
                    <div class="bg-white p-8 rounded-3xl shadow-xl">
                        <div class="bg-orange-500 text-white text-center py-2 rounded-t-2xl -mx-8 -mt-8 mb-6">
                            <h3 class="text-2xl font-bold">INTERMEDIATE</h3>
                        </div>
                        <div class="space-y-6">
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-gray-800">Waypoint Navigation</h4>
                                <p class="text-gray-600 text-sm mb-2">Program autonomous flight to GPS waypoints</p>
                                <span class="text-xs text-orange-600 font-semibold">Python • 1 day</span>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-gray-800">Follow Me Mode</h4>
                                <p class="text-gray-600 text-sm mb-2">Track and follow a moving target automatically</p>
                                <span class="text-xs text-orange-600 font-semibold">Python • 2 days</span>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-gray-800">Swarm Control</h4>
                                <p class="text-gray-600 text-sm mb-2">Coordinate multiple drones in formation flight</p>
                                <span class="text-xs text-orange-600 font-semibold">Python • 3 days</span>
                            </div>
                        </div>
                    </div>

                    <!-- Advanced Projects -->
                    <div class="bg-white p-8 rounded-3xl shadow-xl">
                        <div class="bg-red-500 text-white text-center py-2 rounded-t-2xl -mx-8 -mt-8 mb-6">
                            <h3 class="text-2xl font-bold">ADVANCED</h3>
                        </div>
                        <div class="space-y-6">
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-gray-800">SLAM Mapping</h4>
                                <p class="text-gray-600 text-sm mb-2">Build 3D maps using camera and sensors</p>
                                <span class="text-xs text-red-600 font-semibold">ESP-IDF • 1 week</span>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-gray-800">Computer Vision Landing</h4>
                                <p class="text-gray-600 text-sm mb-2">Precision landing on visual markers</p>
                                <span class="text-xs text-red-600 font-semibold">Python + OpenCV • 1 week</span>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold mb-2 text-gray-800">AI Object Detection</h4>
                                <p class="text-gray-600 text-sm mb-2">Real-time object recognition and tracking</p>
                                <span class="text-xs text-red-600 font-semibold">TensorFlow Lite • 2 weeks</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Example Project Showcase -->
                <div class="mt-16 bg-gradient-to-r from-purple-500 to-pink-600 text-white p-12 rounded-3xl">
                    <h3 class="text-4xl font-black mb-6 text-center">Featured Project: Autonomous Room Mapper</h3>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="text-2xl font-bold mb-4">Overview</h4>
                            <p class="text-lg mb-4">
                                Program your FLYQ to autonomously navigate a room, avoiding obstacles and creating a 2D floor plan map.
                            </p>
                            <h4 class="text-2xl font-bold mb-4">What You'll Learn</h4>
                            <ul class="space-y-2">
                                <li>• Sensor fusion (ToF + IMU)</li>
                                <li>• Path planning algorithms</li>
                                <li>• Real-time mapping</li>
                                <li>• Data visualization</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold mb-4">Requirements</h4>
                            <ul class="space-y-2">
                                <li>• FLYQ Air + ToF sensor</li>
                                <li>• Python with matplotlib</li>
                                <li>• 3x3m clear space</li>
                                <li>• 2-3 hours</li>
                            </ul>
                            <div class="mt-6">
                                <a href="https://github.com/passion3d/flyq-projects" target="_blank" class="bg-white text-purple-600 px-8 py-4 rounded-full font-bold inline-flex items-center hover:shadow-2xl transition">
                                    <i class="fab fa-github mr-2"></i>
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Community & Support -->
        <section class="py-16 bg-gray-900 text-white" id="support">
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

                    <a href="https://wa.me/919137361474" target="_blank" class="bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition">
                        <i class="fab fa-whatsapp text-4xl mb-3 text-green-400"></i>
                        <h3 class="font-bold text-lg mb-2">WhatsApp</h3>
                        <p class="text-gray-400 text-sm">+91 9137361474</p>
                    </a>

                    <a href="mailto:info@passion3dworld.com" class="bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition">
                        <i class="fas fa-envelope text-4xl mb-3 text-sky-400"></i>
                        <h3 class="font-bold text-lg mb-2">Email Us</h3>
                        <p class="text-gray-400 text-sm">info@passion3dworld.com</p>
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
                    <a href="/login" class="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-sky-600 transition inline-flex items-center">
                        <i class="fas fa-sign-in-alt mr-2"></i>
                        Login for Curriculum
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

// ==================== NEWSLETTER API ====================

// Subscribe to newsletter
app.post('/api/newsletter/subscribe', async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      return c.json({ success: false, message: 'Email is required' }, 400);
    }

    if (!isValidEmail(email)) {
      return c.json({ success: false, message: 'Invalid email address' }, 400);
    }

    if (!isDatabaseAvailable(c)) {
      return c.json({ success: false, message: 'Service temporarily unavailable' }, 503);
    }

    // @ts-ignore - DB binding
    const db = c.env?.DB;
    
    // Check if already subscribed
    const existing = await db.prepare('SELECT id FROM newsletter_subscriptions WHERE email = ?')
      .bind(email.toLowerCase()).first();
    
    if (existing) {
      return c.json({ success: false, message: 'This email is already subscribed!' }, 400);
    }

    // Add to newsletter
    await db.prepare(`
      INSERT INTO newsletter_subscriptions (email)
      VALUES (?)
    `).bind(email.toLowerCase()).run();

    return c.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return c.json({ success: false, message: 'Failed to subscribe. Please try again.' }, 500);
  }
});

// ==================== CONTACT FORM API ====================

// Submit contact form
app.post('/api/contact/submit', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return c.json({ success: false, message: 'All fields are required' }, 400);
    }

    if (!isValidEmail(email)) {
      return c.json({ success: false, message: 'Invalid email address' }, 400);
    }

    if (name.length < 2 || name.length > 100) {
      return c.json({ success: false, message: 'Name must be 2-100 characters' }, 400);
    }

    if (message.length < 10 || message.length > 2000) {
      return c.json({ success: false, message: 'Message must be 10-2000 characters' }, 400);
    }

    if (!isDatabaseAvailable(c)) {
      return c.json({ success: false, message: 'Service temporarily unavailable' }, 503);
    }

    // @ts-ignore - DB binding
    const db = c.env?.DB;
    
    await db.prepare(`
      INSERT INTO contact_submissions (name, email, message)
      VALUES (?, ?, ?)
    `).bind(sanitizeInput(name), email.toLowerCase(), sanitizeInput(message)).run();

    return c.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    return c.json({ success: false, message: 'Failed to submit. Please try again.' }, 500);
  }
});

// Get all contact submissions (admin only)
app.get('/api/contact/submissions', async (c) => {
  try {
    const user = await getCurrentUser(c);
    if (!user) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    // Check if user is admin
    // @ts-ignore - DB binding
    const db = c.env?.DB;
    const adminCheck: any = await db.prepare('SELECT is_admin FROM users WHERE id = ?').bind(user.id).first();
    
    if (!adminCheck || !adminCheck.is_admin) {
      return c.json({ success: false, message: 'Access denied' }, 403);
    }

    const submissions = await db.prepare(`
      SELECT id, name, email, message, status, created_at
      FROM contact_submissions
      ORDER BY created_at DESC
    `).all();

    return c.json({ success: true, submissions: submissions.results || [] });

  } catch (error) {
    console.error('Get submissions error:', error);
    return c.json({ success: false, message: 'Failed to load submissions' }, 500);
  }
});

// Update contact submission status (admin only)
app.post('/api/contact/update-status', async (c) => {
  try {
    const user = await getCurrentUser(c);
    if (!user) {
      return c.json({ success: false, message: 'Unauthorized' }, 401);
    }

    // Check if user is admin
    // @ts-ignore - DB binding
    const db = c.env?.DB;
    const adminCheck: any = await db.prepare('SELECT is_admin FROM users WHERE id = ?').bind(user.id).first();
    
    if (!adminCheck || !adminCheck.is_admin) {
      return c.json({ success: false, message: 'Access denied' }, 403);
    }

    const { id, status } = await c.req.json();
    
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return c.json({ success: false, message: 'Invalid status' }, 400);
    }

    await db.prepare('UPDATE contact_submissions SET status = ? WHERE id = ?').bind(status, id).run();

    return c.json({ success: true, message: 'Status updated' });

  } catch (error) {
    console.error('Update status error:', error);
    return c.json({ success: false, message: 'Failed to update status' }, 500);
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

// Admin Dashboard - Database Viewer
app.get('/admin/dashboard', async (c) => {
  try {
    const user = await getCurrentUser(c);
    
    if (!user) {
      return c.html('<h1>Access Denied</h1><p>Please login first</p>', 403);
    }

    if (!isDatabaseAvailable(c)) {
      return c.html('<h1>Database Not Available</h1>', 503);
    }

    // Check if user is admin
    const adminCheck = await c.env.DB.prepare('SELECT is_admin FROM users WHERE id = ?').bind(user.id).first();
    if (!adminCheck || adminCheck.is_admin !== 1) {
      return c.html('<h1>Access Denied</h1><p>Admin access only</p>', 403);
    }

    // Get all users
    const usersResult = await c.env.DB.prepare('SELECT id, email, name, is_admin, created_at FROM users ORDER BY created_at DESC').all();
    
    // Get all orders with user info
    const ordersResult = await c.env.DB.prepare(`
      SELECT o.*, u.email, u.name 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC 
      LIMIT 50
    `).all();
    
    // Get all sessions
    const sessionsResult = await c.env.DB.prepare(`
      SELECT s.*, u.email 
      FROM sessions s 
      JOIN users u ON s.user_id = u.id 
      WHERE s.expires_at > datetime('now') 
      ORDER BY s.created_at DESC
    `).all();

    // Get contact submissions
    const contactsResult = await c.env.DB.prepare(`
      SELECT * FROM contact_submissions 
      ORDER BY created_at DESC 
      LIMIT 50
    `).all();
    
    const newContactsCount = contactsResult.results?.filter((c: any) => c.status === 'new').length || 0;

    const content = `
      <div class="pt-32 pb-20 bg-gray-50">
        <div class="container mx-auto px-6 max-w-7xl">
          <h1 class="text-5xl font-black mb-12">Admin Dashboard</h1>
          
          <!-- Statistics Cards -->
          <div class="grid md:grid-cols-5 gap-6 mb-12">
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <div class="text-4xl font-black text-sky-500 mb-2">${usersResult.results?.length || 0}</div>
              <div class="text-gray-600">Total Users</div>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <div class="text-4xl font-black text-green-500 mb-2">${ordersResult.results?.length || 0}</div>
              <div class="text-gray-600">Total Orders</div>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <div class="text-4xl font-black text-blue-500 mb-2">${sessionsResult.results?.length || 0}</div>
              <div class="text-gray-600">Active Sessions</div>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <div class="text-4xl font-black text-orange-500 mb-2">${contactsResult.results?.length || 0}</div>
              <div class="text-gray-600">Contact Messages</div>
              ${newContactsCount > 0 ? `<div class="text-xs text-red-600 font-bold mt-1">${newContactsCount} new</div>` : ''}
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-lg">
              <div class="text-4xl font-black text-purple-500 mb-2">₹${ordersResult.results?.reduce((sum: number, o: any) => sum + (o.total || 0), 0) || 0}</div>
              <div class="text-gray-600">Total Revenue</div>
            </div>
          </div>

          <!-- Users Table -->
          <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 class="text-3xl font-bold mb-6">Registered Users</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">ID</th>
                    <th class="text-left py-3 px-4">Name</th>
                    <th class="text-left py-3 px-4">Email</th>
                    <th class="text-left py-3 px-4">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  ${usersResult.results?.map((u: any) => `
                    <tr class="border-b hover:bg-gray-50">
                      <td class="py-3 px-4">${u.id}</td>
                      <td class="py-3 px-4 font-semibold">${u.name}</td>
                      <td class="py-3 px-4">${u.email}</td>
                      <td class="py-3 px-4">${new Date(u.created_at).toLocaleString()}</td>
                    </tr>
                  `).join('') || '<tr><td colspan="4" class="py-8 text-center text-gray-500">No users yet</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Orders Table -->
          <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 class="text-3xl font-bold mb-6">Recent Orders</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">Order #</th>
                    <th class="text-left py-3 px-4">Customer</th>
                    <th class="text-left py-3 px-4">Email</th>
                    <th class="text-left py-3 px-4">Total</th>
                    <th class="text-left py-3 px-4">Status</th>
                    <th class="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${ordersResult.results?.map((o: any) => `
                    <tr class="border-b hover:bg-gray-50">
                      <td class="py-3 px-4 font-mono text-sm">#${o.id}</td>
                      <td class="py-3 px-4 font-semibold">${o.name}</td>
                      <td class="py-3 px-4">${o.email}</td>
                      <td class="py-3 px-4 font-bold text-green-600">₹${o.total}</td>
                      <td class="py-3 px-4">
                        <span class="px-3 py-1 rounded-full text-sm ${
                          o.status === 'completed' ? 'bg-green-100 text-green-800' :
                          o.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }">${o.status}</span>
                      </td>
                      <td class="py-3 px-4">${new Date(o.created_at).toLocaleString()}</td>
                    </tr>
                  `).join('') || '<tr><td colspan="6" class="py-8 text-center text-gray-500">No orders yet</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Contact Form Submissions -->
          <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 class="text-3xl font-bold mb-6">Contact Form Submissions</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">ID</th>
                    <th class="text-left py-3 px-4">Name</th>
                    <th class="text-left py-3 px-4">Email</th>
                    <th class="text-left py-3 px-4">Message</th>
                    <th class="text-left py-3 px-4">Status</th>
                    <th class="text-left py-3 px-4">Date</th>
                    <th class="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${contactsResult.results?.map((contact: any) => `
                    <tr class="border-b hover:bg-gray-50" id="contact-${contact.id}">
                      <td class="py-3 px-4">#${contact.id}</td>
                      <td class="py-3 px-4 font-semibold">${contact.name}</td>
                      <td class="py-3 px-4">
                        <a href="mailto:${contact.email}" class="text-sky-500 hover:underline">${contact.email}</a>
                      </td>
                      <td class="py-3 px-4 max-w-md">
                        <div class="text-sm">${contact.message.length > 100 ? contact.message.substring(0, 100) + '...' : contact.message}</div>
                      </td>
                      <td class="py-3 px-4">
                        <select onchange="updateContactStatus(${contact.id}, this.value)" 
                                class="px-3 py-1 rounded-full text-sm font-bold border-2 ${
                                  contact.status === 'new' ? 'bg-red-100 text-red-800 border-red-300' :
                                  contact.status === 'read' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                                  contact.status === 'replied' ? 'bg-green-100 text-green-800 border-green-300' :
                                  'bg-gray-100 text-gray-800 border-gray-300'
                                }">
                          <option value="new" ${contact.status === 'new' ? 'selected' : ''}>New</option>
                          <option value="read" ${contact.status === 'read' ? 'selected' : ''}>Read</option>
                          <option value="replied" ${contact.status === 'replied' ? 'selected' : ''}>Replied</option>
                          <option value="archived" ${contact.status === 'archived' ? 'selected' : ''}>Archived</option>
                        </select>
                      </td>
                      <td class="py-3 px-4 text-sm">${new Date(contact.created_at).toLocaleString()}</td>
                      <td class="py-3 px-4">
                        <button onclick="viewContactDetails(${contact.id}, '${contact.name.replace(/'/g, "\\'")}', '${contact.email}', \`${contact.message.replace(/`/g, '\\`')}\`, '${contact.created_at}')" 
                                class="text-sky-500 hover:text-sky-700">
                          <i class="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  `).join('') || '<tr><td colspan="7" class="py-8 text-center text-gray-500">No contact submissions yet</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Active Sessions -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-3xl font-bold mb-6">Active Sessions</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">User Email</th>
                    <th class="text-left py-3 px-4">Session ID</th>
                    <th class="text-left py-3 px-4">Expires</th>
                  </tr>
                </thead>
                <tbody>
                  ${sessionsResult.results?.map((s: any) => `
                    <tr class="border-b hover:bg-gray-50">
                      <td class="py-3 px-4">${s.email}</td>
                      <td class="py-3 px-4 font-mono text-sm">${s.id ? (s.id.length > 20 ? s.id.substring(0, 20) + '...' : s.id) : 'N/A'}</td>
                      <td class="py-3 px-4">${new Date(s.expires_at).toLocaleString()}</td>
                    </tr>
                  `).join('') || '<tr><td colspan="3" class="py-8 text-center text-gray-500">No active sessions</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-8 text-center">
            <a href="/" class="btn-primary text-white px-8 py-3 rounded-full inline-block">Back to Home</a>
          </div>
        </div>
      </div>

      <script>
        async function updateContactStatus(id, status) {
          try {
            const response = await fetch('/api/contact/update-status', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id, status })
            });
            
            const data = await response.json();
            if (data.success) {
              // Update the row styling
              const select = document.querySelector('#contact-' + id + ' select');
              select.className = 'px-3 py-1 rounded-full text-sm font-bold border-2 ' + 
                (status === 'new' ? 'bg-red-100 text-red-800 border-red-300' :
                 status === 'read' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                 status === 'replied' ? 'bg-green-100 text-green-800 border-green-300' :
                 'bg-gray-100 text-gray-800 border-gray-300');
            } else {
              alert('Failed to update status');
            }
          } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update status');
          }
        }

        function viewContactDetails(id, name, email, message, date) {
          const modal = document.createElement('div');
          modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
          modal.innerHTML = \`
            <div class="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div class="flex justify-between items-start mb-6">
                <h2 class="text-3xl font-bold">Contact Details #\${id}</h2>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                  <i class="fas fa-times text-2xl"></i>
                </button>
              </div>
              
              <div class="space-y-4">
                <div>
                  <div class="text-sm font-bold text-gray-600 mb-1">Name</div>
                  <div class="text-lg">\${name}</div>
                </div>
                
                <div>
                  <div class="text-sm font-bold text-gray-600 mb-1">Email</div>
                  <a href="mailto:\${email}" class="text-lg text-sky-500 hover:underline">\${email}</a>
                </div>
                
                <div>
                  <div class="text-sm font-bold text-gray-600 mb-1">Submitted</div>
                  <div class="text-lg">\${new Date(date).toLocaleString()}</div>
                </div>
                
                <div>
                  <div class="text-sm font-bold text-gray-600 mb-1">Message</div>
                  <div class="bg-gray-50 p-4 rounded-xl text-gray-800 whitespace-pre-wrap">\${message}</div>
                </div>
              </div>
              
              <div class="mt-6 flex space-x-4">
                <a href="mailto:\${email}?subject=Re: Your FLYQ Inquiry" 
                   class="flex-1 bg-sky-500 text-white px-6 py-3 rounded-full font-bold text-center hover:bg-sky-600 transition">
                  <i class="fas fa-reply mr-2"></i>Reply via Email
                </a>
                <button onclick="this.closest('.fixed').remove()" 
                        class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-300 transition">
                  Close
                </button>
              </div>
            </div>
          \`;
          document.body.appendChild(modal);
          
          // Close on background click
          modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
          });
        }
      </script>
    `;

    return c.html(renderPage('Admin Dashboard', content));
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return c.html('<h1>Error loading dashboard</h1>', 500);
  }
});


export default app
