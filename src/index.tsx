import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Main landing page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FLYQ Air - The Programmable Drone</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Inter:wght@300;400;600;700;800&display=swap');
            
            :root {
                --midnight: #0F172A;
                --sky-blue: #0EA5E9;
                --light-blue: #38BDF8;
                --silver: #E5E7EB;
                --black: #000000;
                --white: #FFFFFF;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            html {
                scroll-behavior: smooth;
            }
            
            body {
                font-family: 'Inter', sans-serif;
                overflow-x: hidden;
                background: var(--black);
                color: var(--white);
            }
            
            h1, h2, h3, h4 {
                font-family: 'Rajdhani', sans-serif;
                font-weight: 700;
            }
            
            .hero-gradient {
                background: linear-gradient(135deg, #000000 0%, #0F172A 50%, #000000 100%);
                position: relative;
            }
            
            .hero-gradient::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%);
                pointer-events: none;
            }
            
            .premium-glow {
                text-shadow: 0 0 40px rgba(14, 165, 233, 0.6), 0 0 80px rgba(56, 189, 248, 0.3);
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
            
            .pulse-blue {
                animation: pulse-blue 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            
            @keyframes pulse-blue {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: .6;
                }
            }
            
            .float-animation {
                animation: float 4s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-20px);
                }
            }
            
            .btn-premium {
                box-shadow: 0 0 30px rgba(14, 165, 233, 0.5);
                transition: all 0.3s ease;
                background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%);
            }
            
            .btn-premium:hover {
                box-shadow: 0 0 50px rgba(14, 165, 233, 0.8), 0 0 80px rgba(56, 189, 248, 0.4);
                transform: translateY(-2px);
            }
            
            .gradient-text {
                background: linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .silver-text {
                color: #E5E7EB;
            }
            
            .section-divider {
                height: 2px;
                background: linear-gradient(90deg, transparent, #0EA5E9, transparent);
            }
            
            .metallic-border {
                border: 2px solid;
                border-image: linear-gradient(135deg, #E5E7EB 0%, #0EA5E9 50%, #E5E7EB 100%) 1;
            }
        </style>
    </head>
    <body class="bg-black text-white">
        <!-- Navigation -->
        <nav class="fixed w-full z-50 bg-midnight bg-opacity-95 backdrop-blur-md border-b border-sky-500 shadow-2xl" style="box-shadow: 0 4px 20px rgba(14, 165, 233, 0.2);">
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-drone text-sky-500 text-3xl pulse-blue"></i>
                        <span class="text-3xl font-black gradient-text" style="font-family: 'Rajdhani', sans-serif;">FLYQ Air</span>
                    </div>
                    <div class="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wider">
                        <a href="#features" class="silver-text hover:text-sky-400 transition-colors">Features</a>
                        <a href="#specs" class="silver-text hover:text-sky-400 transition-colors">Specs</a>
                        <a href="#programmable" class="silver-text hover:text-sky-400 transition-colors">Programming</a>
                        <a href="/docs" class="silver-text hover:text-sky-400 transition-colors flex items-center">
                            <i class="fas fa-book mr-2"></i>Docs
                        </a>
                        <a href="#buy" class="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-black">Buy Now</a>
                    </div>
                    <button id="mobileMenuBtn" class="md:hidden text-sky-400 text-2xl">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <!-- Mobile Menu -->
                <div id="mobileMenu" class="hidden md:hidden mt-6 space-y-4 pb-4">
                    <a href="#features" class="block silver-text hover:text-sky-400 transition-colors text-center py-2">Features</a>
                    <a href="#specs" class="block silver-text hover:text-sky-400 transition-colors text-center py-2">Specs</a>
                    <a href="#programmable" class="block silver-text hover:text-sky-400 transition-colors text-center py-2">Programming</a>
                    <a href="/docs" class="block silver-text hover:text-sky-400 transition-colors text-center py-2">
                        <i class="fas fa-book mr-2"></i>Documentation
                    </a>
                    <a href="#buy" class="block bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all text-center font-black">Buy Now</a>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero-gradient min-h-screen flex items-center px-6 relative overflow-hidden">
            <div class="container mx-auto relative z-10 py-32">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div class="text-center lg:text-left">
                        <div class="inline-flex items-center bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-black mb-8 shadow-lg">
                            <i class="fas fa-code mr-2"></i>FULLY PROGRAMMABLE
                        </div>
                        <h1 class="text-8xl lg:text-9xl font-black mb-6 premium-glow leading-none" style="font-family: 'Rajdhani', sans-serif;">
                            FLYQ Air
                        </h1>
                        <p class="text-3xl lg:text-4xl text-sky-400 mb-6 font-bold">
                            The Programmable Drone
                        </p>
                        <p class="text-xl silver-text mb-10 leading-relaxed max-w-2xl">
                            Unleash your creativity with the ESP32-S3 powered open-source drone. 
                            Premium engineering for makers, developers, and educators.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12">
                            <a href="#buy" class="btn-premium text-white px-10 py-5 rounded-xl font-black text-lg inline-flex items-center justify-center">
                                <i class="fas fa-shopping-cart mr-3"></i>
                                Order Now
                            </a>
                            <a href="#features" class="border-2 border-sky-500 text-sky-400 px-10 py-5 rounded-xl font-black text-lg hover:bg-sky-500 hover:text-white transition-all inline-flex items-center justify-center">
                                <i class="fas fa-rocket mr-3"></i>
                                Explore
                            </a>
                        </div>
                        
                        <!-- Stats -->
                        <div class="grid grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0">
                            <div class="text-center">
                                <div class="text-4xl font-black text-sky-400 mb-2">100%</div>
                                <div class="text-xs silver-text uppercase tracking-wide">Open Source</div>
                            </div>
                            <div class="text-center border-l border-r border-sky-500">
                                <div class="text-4xl font-black text-sky-400 mb-2">Wi-Fi</div>
                                <div class="text-xs silver-text uppercase tracking-wide">Control</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-black text-sky-400 mb-2">45g</div>
                                <div class="text-xs silver-text uppercase tracking-wide">Weight</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Hero Image - Full Size -->
                    <div class="relative">
                        <div class="absolute inset-0 bg-sky-500 opacity-15 blur-3xl rounded-full"></div>
                        <div class="relative z-10 float-animation">
                            <img src="https://circuitdigest.com/sites/default/files/Litewing%20Wiki%20Banner-01.png" 
                                 alt="FLYQ Air Drone" 
                                 class="w-full h-auto drop-shadow-2xl rounded-2xl">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-24 px-6 bg-gradient-to-b from-gray-100 to-white text-black">
            <div class="container mx-auto">
                <div class="text-center mb-20">
                    <h2 class="text-6xl font-black mb-6">
                        Why <span class="gradient-text">FLYQ?</span>
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-6"></div>
                    <p class="text-2xl text-gray-600 max-w-3xl mx-auto">Premium engineering meets limitless creativity</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Feature Cards -->
                    <div class="card-hover text-white p-10 rounded-3xl">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <i class="fas fa-microchip text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4 text-sky-400">ESP32-S3 Power</h3>
                        <p class="silver-text leading-relaxed">Dual-core 240MHz with Wi-Fi & Bluetooth. Program in ESP-IDF, Arduino, or Python.</p>
                    </div>
                    
                    <div class="card-hover text-white p-10 rounded-3xl">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <i class="fas fa-code-branch text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4 text-sky-400">Open Source</h3>
                        <p class="silver-text leading-relaxed">Full hardware & firmware access. GitHub repo with schematics & code included.</p>
                    </div>
                    
                    <div class="card-hover text-white p-10 rounded-3xl">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <i class="fas fa-wifi text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4 text-sky-400">Wi-Fi Control</h3>
                        <p class="silver-text leading-relaxed">Control via smartphone or PC. No expensive transmitter needed!</p>
                    </div>
                    
                    <div class="card-hover text-white p-10 rounded-3xl">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <i class="fas fa-plug text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4 text-sky-400">Expandable</h3>
                        <p class="silver-text leading-relaxed">24-pin GPIO. Add sensors for autonomous flight modes.</p>
                    </div>
                    
                    <div class="card-hover text-white p-10 rounded-3xl">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <i class="fas fa-tools text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4 text-sky-400">Easy Build</h3>
                        <p class="silver-text leading-relaxed">All-in-one PCB. No 3D printing. Minimal soldering required.</p>
                    </div>
                    
                    <div class="card-hover text-white p-10 rounded-3xl">
                        <div class="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <i class="fas fa-gem text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4 text-sky-400">Premium Quality</h3>
                        <p class="silver-text leading-relaxed">Professional grade components. Built to last.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Video Section -->
        <section class="py-24 px-6 bg-midnight">
            <div class="container mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        See FLYQ Air In <span class="text-sky-400">Flight</span>
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-6"></div>
                    <p class="text-xl silver-text">Watch FLYQ Air in action</p>
                </div>
                <div class="max-w-5xl mx-auto">
                    <div class="relative rounded-3xl overflow-hidden border-4 border-sky-500 shadow-2xl" style="padding-bottom: 56.25%; box-shadow: 0 0 40px rgba(14, 165, 233, 0.3);">
                        <iframe class="absolute top-0 left-0 w-full h-full" 
                                src="https://www.youtube.com/embed/esmYcBHqBK8" 
                                title="FLYQ Demo" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </section>

        <!-- Programmability Section -->
        <section id="programmable" class="py-24 px-6 bg-black">
            <div class="container mx-auto">
                <div class="text-center mb-20">
                    <h2 class="text-6xl font-black mb-6">
                        <span class="text-sky-400">Code</span> Your Way
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-6"></div>
                    <p class="text-2xl silver-text">Multiple languages, infinite possibilities</p>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h3 class="text-4xl font-black mb-8 text-sky-400">
                            <i class="fas fa-laptop-code mr-4"></i>Programming Freedom
                        </h3>
                        <div class="space-y-6">
                            <div class="flex items-start space-x-5 bg-midnight p-6 rounded-2xl border-l-4 border-sky-500">
                                <div class="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-white font-bold"></i>
                                </div>
                                <div>
                                    <h4 class="text-2xl font-bold mb-2">ESP-IDF Native</h4>
                                    <p class="silver-text">Full IoT Development Framework power</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-5 bg-midnight p-6 rounded-2xl border-l-4 border-sky-500">
                                <div class="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-white font-bold"></i>
                                </div>
                                <div>
                                    <h4 class="text-2xl font-bold mb-2">Arduino IDE</h4>
                                    <p class="silver-text">Beginner-friendly with vast libraries</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-5 bg-midnight p-6 rounded-2xl border-l-4 border-sky-500">
                                <div class="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-white font-bold"></i>
                                </div>
                                <div>
                                    <h4 class="text-2xl font-bold mb-2">Python SDK</h4>
                                    <p class="silver-text">Script autonomous missions & AI</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-5 bg-midnight p-6 rounded-2xl border-l-4 border-sky-500">
                                <div class="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-white font-bold"></i>
                                </div>
                                <div>
                                    <h4 class="text-2xl font-bold mb-2">Crazyflie Compatible</h4>
                                    <p class="silver-text">Works with Crazyflie ecosystem</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-midnight p-8 rounded-3xl border-4 border-sky-500 shadow-2xl" style="box-shadow: 0 0 40px rgba(14, 165, 233, 0.3);">
                        <div class="flex items-center space-x-3 mb-6">
                            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span class="silver-text text-sm ml-4">Arduino Example</span>
                        </div>
                        <pre class="text-sky-400 text-sm overflow-x-auto leading-relaxed"><code>// FLYQ Air - Custom Flight Pattern
#include "FLYQAir.h"

FLYQAir drone;

void setup() {
  drone.init();
  drone.calibrate();
  Serial.println("FLYQ Air Ready!");
}

void loop() {
  // Takeoff
  drone.takeoff(1.5);
  delay(3000);
  
  // Square pattern
  drone.forward(0.8);
  drone.right(0.8);
  drone.backward(0.8);
  drone.left(0.8);
  
  // Land
  drone.land();
  delay(5000);
}</code></pre>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-3 gap-10">
                    <div class="text-center bg-midnight p-10 rounded-3xl border-2 border-sky-500">
                        <div class="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i class="fas fa-graduation-cap text-white text-4xl"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4 text-sky-400">STEM Education</h4>
                        <p class="silver-text">Perfect for schools & robotics courses</p>
                    </div>
                    
                    <div class="text-center bg-midnight p-10 rounded-3xl border-2 border-sky-500">
                        <div class="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i class="fas fa-robot text-white text-4xl"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4 text-sky-400">AI & Vision</h4>
                        <p class="silver-text">Add cameras for ML projects</p>
                    </div>
                    
                    <div class="text-center bg-midnight p-10 rounded-3xl border-2 border-sky-500">
                        <div class="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i class="fas fa-network-wired text-white text-4xl"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4 text-sky-400">IoT Integration</h4>
                        <p class="silver-text">Cloud services & swarms</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Specifications -->
        <section id="specs" class="py-24 px-6 bg-gradient-to-b from-gray-100 to-white text-black">
            <div class="container mx-auto">
                <div class="text-center mb-20">
                    <h2 class="text-6xl font-black mb-6">
                        Technical <span class="gradient-text">Specs</span>
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-6"></div>
                    <p class="text-2xl text-gray-600">Premium engineering in every detail</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    <div class="card-hover text-white p-10 rounded-3xl">
                        <h3 class="text-3xl font-black mb-8 text-sky-400 flex items-center">
                            <i class="fas fa-microchip mr-4"></i>Core Hardware
                        </h3>
                        <div class="space-y-4">
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="silver-text font-semibold">Microcontroller</span>
                                <span class="font-bold">ESP32-S3</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="silver-text font-semibold">Processor</span>
                                <span class="font-bold">Dual @ 240MHz</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="silver-text font-semibold">Memory</span>
                                <span class="font-bold">512 KB SRAM</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="silver-text font-semibold">IMU</span>
                                <span class="font-bold">MPU6050 6-Axis</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="silver-text font-semibold">Connectivity</span>
                                <span class="font-bold">Wi-Fi + BLE</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="silver-text font-semibold">Interface</span>
                                <span class="font-bold">USB Type-C</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-hover text-white p-10 rounded-3xl">
                        <h3 class="text-3xl font-black mb-8 text-sky-400 flex items-center">
                            <i class="fas fa-cog mr-4"></i>Physical
                        </h3>
                        <div class="space-y-4">
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="silver-text font-semibold">Motors</span>
                                <span class="font-bold">720 Coreless (×4)</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="silver-text font-semibold">Propellers</span>
                                <span class="font-bold">55mm / 65mm</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="silver-text font-semibold">Battery</span>
                                <span class="font-bold">1S LiPo 3.7V</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="silver-text font-semibold">Weight</span>
                                <span class="font-bold">~45g</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="silver-text font-semibold">Size</span>
                                <span class="font-bold">100mm × 100mm</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="silver-text font-semibold">Payload</span>
                                <span class="font-bold">~25g</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-hover text-white p-10 rounded-3xl">
                        <h3 class="text-3xl font-black mb-8 text-sky-400 flex items-center">
                            <i class="fas fa-puzzle-piece mr-4"></i>Expansion
                        </h3>
                        <div class="space-y-4">
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-sky-400 text-xl mt-1"></i>
                                <span class="text-lg">VL53L1X ToF Sensor</span>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-sky-400 text-xl mt-1"></i>
                                <span class="text-lg">MS5611 Barometer</span>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-sky-400 text-xl mt-1"></i>
                                <span class="text-lg">PMW3901 Optical Flow</span>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-sky-400 text-xl mt-1"></i>
                                <span class="text-lg">24-Pin GPIO</span>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-sky-400 text-xl mt-1"></i>
                                <span class="text-lg">I2C, SPI, UART</span>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-sky-400 text-xl mt-1"></i>
                                <span class="text-lg">Buzzer Support</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-hover text-white p-10 rounded-3xl">
                        <h3 class="text-3xl font-black mb-8 text-sky-400 flex items-center">
                            <i class="fas fa-lightbulb mr-4"></i>Indicators
                        </h3>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                                <span class="text-lg"><b>PWR</b> - Power</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                                <span class="text-lg"><b>CHRG</b> - Charging</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <span class="text-lg"><b>FULL</b> - Full</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                <span class="text-lg"><b>SYS</b> - Ready</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-sky-500 rounded-full"></div>
                                <span class="text-lg"><b>LINK</b> - Wi-Fi</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-orange-500 rounded-full"></div>
                                <span class="text-lg"><b>ERR</b> - Error</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Gallery -->
        <section class="py-24 px-6 bg-midnight">
            <div class="container mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6">
                        <span class="text-sky-400">Gallery</span>
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-6"></div>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="overflow-hidden rounded-3xl border-4 border-sky-500 shadow-2xl" style="box-shadow: 0 0 30px rgba(14, 165, 233, 0.3);">
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-PCB-Closeup-and-Starp-Hole.png" 
                             alt="PCB Design" 
                             class="w-full h-80 object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="overflow-hidden rounded-3xl border-4 border-sky-500 shadow-2xl" style="box-shadow: 0 0 30px rgba(14, 165, 233, 0.3);">
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/ESP32-S3-Module.png" 
                             alt="ESP32-S3" 
                             class="w-full h-80 object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="overflow-hidden rounded-3xl border-4 border-sky-500 shadow-2xl" style="box-shadow: 0 0 30px rgba(14, 165, 233, 0.3);">
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-MPU6050-Close-Up.png" 
                             alt="MPU6050" 
                             class="w-full h-80 object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA / Buy Section -->
        <section id="buy" class="py-24 px-6 bg-black relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 left-0 w-96 h-96 bg-sky-500 rounded-full blur-3xl"></div>
                <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
            </div>
            
            <div class="container mx-auto text-center relative z-10">
                <h2 class="text-6xl md:text-7xl font-black mb-8 premium-glow">
                    Start Your Journey Today
                </h2>
                <p class="text-2xl silver-text mb-16 max-w-4xl mx-auto leading-relaxed">
                    Join thousands of makers, developers, and educators building the future with 
                    <span class="text-sky-400 font-bold">FLYQ Air</span>. 
                    Premium engineering meets limitless possibilities.
                </p>
                
                <!-- Main Store CTA -->
                <div class="max-w-2xl mx-auto mb-16">
                    <a href="https://passion3dworld.com" target="_blank" 
                       class="block bg-gradient-to-br from-sky-500 to-blue-600 text-white p-12 rounded-3xl hover:shadow-2xl transition-all transform hover:scale-105 border-4 border-sky-500" style="box-shadow: 0 0 60px rgba(14, 165, 233, 0.4);">
                        <i class="fas fa-store text-6xl mb-6"></i>
                        <h3 class="text-4xl font-black mb-4">Passion 3D World</h3>
                        <p class="text-xl font-semibold mb-4">Official Authorized Dealer</p>
                        <div class="inline-flex items-center bg-white text-sky-600 px-8 py-4 rounded-full font-black text-xl shadow-lg">
                            <span>Order Now</span>
                            <i class="fas fa-arrow-right ml-3"></i>
                        </div>
                    </a>
                </div>
                
                <!-- Community Section -->
                <div class="border-t border-gray-800 pt-16">
                    <h3 class="text-3xl font-black mb-10 text-sky-400">Learn & Connect</h3>
                    <div class="flex flex-wrap justify-center gap-6">
                        <a href="/docs" 
                           class="bg-gradient-to-br from-sky-500 to-blue-600 px-8 py-4 rounded-2xl hover:shadow-2xl transition-all inline-flex items-center text-lg font-semibold border-2 border-sky-400 text-white">
                            <i class="fas fa-book-open mr-3"></i>
                            Complete Documentation
                        </a>
                        <a href="https://github.com/passion3d/flyq-air" target="_blank" 
                           class="bg-midnight px-8 py-4 rounded-2xl hover:bg-sky-500 hover:text-white transition-all inline-flex items-center text-lg font-semibold border-2 border-sky-500 silver-text">
                            <i class="fab fa-github mr-3"></i>
                            GitHub
                        </a>
                        <a href="https://circuitdigest.com/forum" target="_blank" 
                           class="bg-midnight px-8 py-4 rounded-2xl hover:bg-sky-500 hover:text-white transition-all inline-flex items-center text-lg font-semibold border-2 border-sky-500 silver-text">
                            <i class="fas fa-comments mr-3"></i>
                            Forum
                        </a>
                        <a href="#" 
                           class="bg-midnight px-8 py-4 rounded-2xl hover:bg-sky-500 hover:text-white transition-all inline-flex items-center text-lg font-semibold border-2 border-sky-500 silver-text">
                            <i class="fab fa-whatsapp mr-3"></i>
                            Community
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-midnight border-t-4 border-sky-500 py-16 px-6">
            <div class="container mx-auto">
                <div class="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div class="flex items-center space-x-3 mb-6">
                            <i class="fas fa-drone text-sky-400 text-3xl"></i>
                            <span class="text-2xl font-black gradient-text">FLYQ Air</span>
                        </div>
                        <p class="silver-text leading-relaxed">Premium programmable drone platform for makers, developers, and innovators.</p>
                    </div>
                    
                    <div>
                        <h4 class="font-black mb-6 text-sky-400 text-lg">Product</h4>
                        <ul class="space-y-3 silver-text">
                            <li><a href="#features" class="hover:text-sky-400 transition">Features</a></li>
                            <li><a href="#specs" class="hover:text-sky-400 transition">Specs</a></li>
                            <li><a href="#programmable" class="hover:text-sky-400 transition">Programming</a></li>
                            <li><a href="/docs" class="hover:text-sky-400 transition font-semibold"><i class="fas fa-book mr-2"></i>Documentation</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-black mb-6 text-sky-400 text-lg">Resources</h4>
                        <ul class="space-y-3 silver-text">
                            <li><a href="https://github.com/Circuit-Digest/LiteWing" class="hover:text-sky-400 transition">GitHub</a></li>
                            <li><a href="#" class="hover:text-sky-400 transition">Tutorials</a></li>
                            <li><a href="#" class="hover:text-sky-400 transition">Community</a></li>
                            <li><a href="https://circuitdigest.com" class="hover:text-sky-400 transition">Circuit Digest</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-black mb-6 text-sky-400 text-lg">Support</h4>
                        <ul class="space-y-3 silver-text">
                            <li><a href="#" class="hover:text-sky-400 transition">Contact</a></li>
                            <li><a href="#" class="hover:text-sky-400 transition">FAQ</a></li>
                            <li><a href="https://passion3dworld.com" class="hover:text-sky-400 transition">Buy Now</a></li>
                            <li><a href="#" class="hover:text-sky-400 transition">Returns</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-8 text-center">
                    <p class="silver-text">
                        &copy; 2025 Circuit Digest. All rights reserved. | 
                        <span class="text-sky-400 font-semibold">100% Open Source Hardware</span> | 
                        CC Licensed
                    </p>
                </div>
            </div>
        </footer>

        <script>
            // Mobile menu toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        mobileMenu.classList.add('hidden');
                    }
                });
            });
        </script>
    </body>
    </html>
  `)
})

// Documentation Page
app.get('/docs', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FLYQ Air - Complete Technical Documentation</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Inter:wght@300;400;600;700;800&family=Fira+Code&display=swap');
            
            body {
                font-family: 'Inter', sans-serif;
            }
            
            h1, h2, h3, h4, h5 {
                font-family: 'Rajdhani', sans-serif;
                font-weight: 700;
            }
            
            code, pre {
                font-family: 'Fira Code', monospace;
            }
            
            .doc-nav {
                position: sticky;
                top: 80px;
                max-height: calc(100vh - 100px);
                overflow-y: auto;
            }
            
            .doc-nav::-webkit-scrollbar {
                width: 6px;
            }
            
            .doc-nav::-webkit-scrollbar-thumb {
                background: #0EA5E9;
                border-radius: 3px;
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="fixed w-full z-50 bg-midnight bg-opacity-95 backdrop-blur-md border-b border-sky-500 shadow-2xl" style="background: #0F172A;">
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <a href="/" class="flex items-center space-x-3">
                        <i class="fas fa-drone text-sky-500 text-3xl"></i>
                        <span class="text-3xl font-black text-white" style="font-family: 'Rajdhani', sans-serif;">
                            <span style="background: linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">FLYQ Air</span>
                        </span>
                    </a>
                    <div class="flex space-x-6">
                        <a href="/" class="text-gray-300 hover:text-sky-400 transition">Home</a>
                        <a href="/#buy" class="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all font-black text-sm">Buy Now</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Documentation Content -->
        <div class="container mx-auto px-6 py-32">
            <div class="grid lg:grid-cols-4 gap-8">
                <!-- Sidebar Navigation -->
                <aside class="lg:col-span-1">
                    <div class="doc-nav bg-white p-6 rounded-2xl shadow-lg">
                        <h3 class="text-xl font-black mb-4 text-gray-800">Contents</h3>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#overview" class="text-gray-600 hover:text-sky-500 transition block">Overview</a></li>
                            <li><a href="#features" class="text-gray-600 hover:text-sky-500 transition block">Key Features</a></li>
                            <li><a href="#specs" class="text-gray-600 hover:text-sky-500 transition block">Specifications</a></li>
                            <li><a href="#hardware" class="text-gray-600 hover:text-sky-500 transition block">Hardware Overview</a></li>
                            <li><a href="#schematics" class="text-gray-600 hover:text-sky-500 transition block">Circuit Schematics</a></li>
                            <li class="ml-3"><a href="#schematics" class="text-gray-500 hover:text-sky-500 transition block">• USB & Power Path</a></li>
                            <li class="ml-3"><a href="#schematics" class="text-gray-500 hover:text-sky-500 transition block">• Battery Charging</a></li>
                            <li class="ml-3"><a href="#schematics" class="text-gray-500 hover:text-sky-500 transition block">• Motor Drivers</a></li>
                            <li class="ml-3"><a href="#schematics" class="text-gray-500 hover:text-sky-500 transition block">• Status LEDs</a></li>
                            <li><a href="#pinout" class="text-gray-600 hover:text-sky-500 transition block">GPIO Pinout</a></li>
                            <li><a href="#programming" class="text-gray-600 hover:text-sky-500 transition block">Programming</a></li>
                            <li><a href="#firmware" class="text-gray-600 hover:text-sky-500 transition block">Firmware Details</a></li>
                            <li><a href="#sensors" class="text-gray-600 hover:text-sky-500 transition block">Optional Sensors</a></li>
                            <li><a href="#assembly" class="text-gray-600 hover:text-sky-500 transition block">Assembly Guide</a></li>
                            <li><a href="#battery" class="text-gray-600 hover:text-sky-500 transition block">Battery Guide</a></li>
                            <li><a href="#getting-started" class="text-gray-600 hover:text-sky-500 transition block">Getting Started</a></li>
                            <li><a href="#troubleshooting" class="text-gray-600 hover:text-sky-500 transition block">Troubleshooting</a></li>
                            <li><a href="#limitations" class="text-gray-600 hover:text-sky-500 transition block">Known Issues</a></li>
                            <li><a href="#resources" class="text-gray-600 hover:text-sky-500 transition block">Resources</a></li>
                        </ul>
                    </div>
                </aside>

                <!-- Main Content -->
                <main class="lg:col-span-3">
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <!-- Hero Image -->
                        <div class="mb-12 text-center">
                            <img src="https://circuitdigest.com/sites/default/files/Litewing%20Wiki%20Banner-01.png" 
                                 alt="FLYQ Air Drone" 
                                 class="w-full max-w-2xl mx-auto rounded-2xl shadow-xl">
                            <h1 class="text-5xl font-black mt-8 mb-4" style="background: linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                FLYQ Air
                            </h1>
                            <p class="text-2xl text-gray-600">ESP32-S3 Based Programmable Drone for Makers, Developers and Educators</p>
                        </div>

                        <!-- Overview -->
                        <section id="overview" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Overview</h2>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                FLYQ Air is a compact, Wi-Fi controlled, open-hardware DIY drone built around the ESP32-S3 microcontroller. 
                                Designed for hobbyists, makers, educators and engineers as an affordable, modifiable platform for experimentation and development.
                            </p>
                            <p class="text-lg text-gray-700 leading-relaxed">
                                It connects to smartphones (Android/iOS) via Wi-Fi AP and supports PC control via Crazyflie cfclient and cflib Python stack. 
                                No proprietary transmitter required!
                            </p>
                        </section>

                        <!-- Key Features -->
                        <section id="features" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Key Features</h2>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-sky-500">
                                    <h3 class="text-xl font-bold mb-2 text-sky-600"><i class="fas fa-code mr-2"></i>Open Source</h3>
                                    <p class="text-gray-700">100% open hardware and firmware. Easy to modify and extend.</p>
                                </div>
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-sky-500">
                                    <h3 class="text-xl font-bold mb-2 text-sky-600"><i class="fas fa-microchip mr-2"></i>ESP32-S3 Powered</h3>
                                    <p class="text-gray-700">Dual-core 240MHz with built-in Wi-Fi & Bluetooth LE.</p>
                                </div>
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-sky-500">
                                    <h3 class="text-xl font-bold mb-2 text-sky-600"><i class="fas fa-wifi mr-2"></i>Wi-Fi Control</h3>
                                    <p class="text-gray-700">Control via smartphone app or PC using Crazyflie cfclient.</p>
                                </div>
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-sky-500">
                                    <h3 class="text-xl font-bold mb-2 text-sky-600"><i class="fas fa-puzzle-piece mr-2"></i>Expandable</h3>
                                    <p class="text-gray-700">24-pin GPIO breakout for sensors and expansion modules.</p>
                                </div>
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-sky-500">
                                    <h3 class="text-xl font-bold mb-2 text-sky-600"><i class="fas fa-tools mr-2"></i>Easy Assembly</h3>
                                    <p class="text-gray-700">All-in-one PCB frame. No 3D printing. Minimal soldering.</p>
                                </div>
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-sky-500">
                                    <h3 class="text-xl font-bold mb-2 text-sky-600"><i class="fas fa-dollar-sign mr-2"></i>Affordable</h3>
                                    <p class="text-gray-700">Minimal components design keeps costs low.</p>
                                </div>
                            </div>
                        </section>

                        <!-- Technical Specifications -->
                        <section id="specs" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Technical Specifications</h2>
                            <div class="overflow-x-auto">
                                <table class="w-full border-collapse">
                                    <tbody>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">Microcontroller</td>
                                            <td class="py-3 px-4">ESP32-S3 (Dual-core Xtensa LX7 @ 240MHz, 512KB SRAM)</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">IMU</td>
                                            <td class="py-3 px-4">MPU6050 (3-axis gyro + 3-axis accelerometer)</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">Motors</td>
                                            <td class="py-3 px-4">720 coreless DC motors (4x)</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">Propellers</td>
                                            <td class="py-3 px-4">55mm or 65mm (recommended: 55mm)</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">Battery</td>
                                            <td class="py-3 px-4">1S LiPo 3.7V (20C or higher recommended)</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">Charging</td>
                                            <td class="py-3 px-4">TP4056 Li-ion charger (1A max)</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">Voltage Regulator</td>
                                            <td class="py-3 px-4">SPX3819 LDO (3.3V, 500mA)</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">Communication</td>
                                            <td class="py-3 px-4">Wi-Fi 2.4GHz, Bluetooth LE, CRTP over UDP</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">Programming Interface</td>
                                            <td class="py-3 px-4">USB Type-C (CH340K USB-UART bridge)</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">Weight</td>
                                            <td class="py-3 px-4">~45g (without battery)</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold bg-gray-100">Dimensions</td>
                                            <td class="py-3 px-4">100mm × 100mm</td>
                                        </tr>
                                        <tr>
                                            <td class="py-3 px-4 font-bold bg-gray-100">Payload Capacity</td>
                                            <td class="py-3 px-4">~25g with 55mm props</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <!-- Hardware Design -->
                        <section id="hardware" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Hardware Design Overview</h2>
                            
                            <div class="mb-8">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-PCB-Closeup-and-Starp-Hole.png" 
                                     alt="FLYQ Air PCB Frame" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">All-in-One PCB Frame</h3>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                FLYQ Air features an innovative all-in-one PCB frame design that eliminates the need for 3D printed parts. 
                                The PCB itself serves as the structural frame, reducing cost, weight, and assembly complexity. 
                                The frame includes hook & loop battery strap slots for easy battery mounting and removal.
                            </p>
                            
                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">ESP32-S3 Microcontroller</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/ESP32-S3-Module.png" 
                                     alt="ESP32-S3 Module" 
                                     class="w-full max-w-2xl rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                Powered by the <strong>ESP32-S3</strong>, a highly efficient microcontroller with low power consumption and extensive GPIO expansion. 
                                Features dual-core Xtensa LX7 processors running at 240MHz, 512KB internal SRAM, and integrated 2.4GHz Wi-Fi 802.11 b/g/n and Bluetooth 5 LE connectivity.
                            </p>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                The built-in USB interface simplifies programming, debugging, and firmware updates. Though ESP32-S3 has integrated USB peripheral, 
                                an external USB-UART bridge (CH340K) is used to make debugging easier with auto-reset circuitry for hassle-free firmware flashing.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">MPU6050 IMU Sensor</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-MPU6050-Close-Up.png" 
                                     alt="MPU6050 IMU" 
                                     class="w-full max-w-2xl rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                The <strong>MPU6050</strong> provides 6-axis motion tracking with integrated 3-axis gyroscope and 3-axis accelerometer, 
                                essential for precise flight stability and orientation detection. It communicates with ESP32 via I2C interface, 
                                allowing the flight controller to process sensor data and apply sensor fusion algorithms for accurate attitude estimation.
                            </p>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                Proper IMU calibration is critical to minimize drift and improve flight accuracy. The sensor works alongside the PID controller 
                                to adjust motor speeds based on pitch, roll, and yaw readings for smooth and stable flight.
                            </p>
                            
                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8" id="power">Power Management System</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/tp4056-ldo-and-USB-Connector.png" 
                                     alt="Power Management Circuit" 
                                     class="w-full max-w-2xl rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                FLYQ Air features a simple but efficient power management system:
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-6">
                                <li><strong>USB-C Port:</strong> Type-C USB for both charging and programming with pull-down resistors on CCx lines for universal compatibility</li>
                                <li><strong>TP4056 Charger:</strong> Li-ion charging IC capable of up to 1A charging current with charge status indicators (CHRG and FULL LEDs)</li>
                                <li><strong>Battery Monitoring:</strong> Voltage divider for ADC-based battery voltage sensing with continuous monitoring</li>
                                <li><strong>SPX3819 LDO:</strong> Ultra-low-noise 3.3V regulator providing 500mA with 550mV dropout at full load</li>
                                <li><strong>Power Path Control:</strong> P-channel MOSFET and Schottky diode circuit for automatic switching between USB and battery power</li>
                                <li><strong>On/Off Switch:</strong> Slide switch connected to LDO enable pin for complete system shutdown (except charging circuit)</li>
                            </ul>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                When USB power is available, the device runs from USB while simultaneously charging the battery. 
                                When unplugged, it automatically switches to battery power. The charging current can be adjusted by changing 
                                the programming resistor value if needed.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8" id="motors">Motor Driver Circuit</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-Motor-Driver.png" 
                                     alt="Motor Driver Circuit" 
                                     class="w-full max-w-2xl rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                FLYQ Air uses <strong>PWM-based motor control</strong> for smooth acceleration and precise maneuverability. 
                                Each of the four motors is controlled by a dedicated driver circuit featuring:
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-6">
                                <li><strong>IRLML6344 N-Channel MOSFET:</strong> High-efficiency switching transistor</li>
                                <li><strong>Flyback Diode:</strong> Protection from motor back-EMF during switching</li>
                                <li><strong>Pull-down Resistor:</strong> Ensures MOSFETs stay off when GPIO is floating</li>
                                <li><strong>Filter Capacitors:</strong> Suppress voltage spikes for stable operation</li>
                            </ul>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                The minimal component count and circuit simplicity make this design cost-effective and easy to control. 
                                When a high signal is applied to the MOSFET gate, it turns on and allows current flow to power the motor. 
                                PWM signals vary the duty cycle to control motor speed precisely.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8" id="usb">Programming Interface</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Close-up-ch340-2n7002DW-area-LiteWing.png" 
                                     alt="USB Programming Interface" 
                                     class="w-full max-w-2xl rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                The programming circuit uses <strong>CH340K USB-UART bridge</strong> from WCH for reliable firmware flashing:
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-6">
                                <li><strong>Hardware Full Duplex:</strong> UART interface with integrated buffers</li>
                                <li><strong>Wide Baud Range:</strong> Supports 50bps to 2Mbps communication speeds</li>
                                <li><strong>Integrated Crystal:</strong> No external oscillator needed, saves PCB space</li>
                                <li><strong>Auto-Reset Circuit:</strong> 2N7002DW dual N-channel MOSFET enables automatic reset during programming</li>
                            </ul>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                The auto-reset circuitry eliminates manual button presses during firmware flashing, making the development process seamless. 
                                Manual reset and boot buttons are still included for debugging purposes.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8" id="leds">Status LED Indicators</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LEDs-close-Up-shots.png" 
                                     alt="LED Indicators" 
                                     class="w-full max-w-2xl rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                FLYQ Air features an <strong>intuitive LED status system</strong> for real-time visual feedback:
                            </p>
                            <div class="overflow-x-auto mb-6">
                                <table class="w-full border-collapse">
                                    <thead class="bg-sky-500 text-white">
                                        <tr>
                                            <th class="py-3 px-4 text-left">LED</th>
                                            <th class="py-3 px-4 text-left">Function</th>
                                            <th class="py-3 px-4 text-left">Behavior</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold">PWR (Green)</td>
                                            <td class="py-3 px-4">Power Indicator</td>
                                            <td class="py-3 px-4">ON when powered</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold">CHRG (Red)</td>
                                            <td class="py-3 px-4">Charging Indicator</td>
                                            <td class="py-3 px-4">ON during battery charging</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold">FULL (Blue)</td>
                                            <td class="py-3 px-4">Full Charge Indicator</td>
                                            <td class="py-3 px-4">ON when battery fully charged</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold">SYS (Yellow)</td>
                                            <td class="py-3 px-4">System Status</td>
                                            <td class="py-3 px-4">Slow blink = calibrating<br>Fast blink = ready to fly</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold">LINK (Blue)</td>
                                            <td class="py-3 px-4">Connection Status</td>
                                            <td class="py-3 px-4">Blinks when connected to app/cfclient</td>
                                        </tr>
                                        <tr>
                                            <td class="py-3 px-4 font-bold">ERR (Red)</td>
                                            <td class="py-3 px-4">Error Indicator</td>
                                            <td class="py-3 px-4">ON for low battery or system errors</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Audio Output (Optional)</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Audio-Connector.png" 
                                     alt="Audio Connector" 
                                     class="w-full max-w-xl rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                A 1.25mm pitch JST connector near the ESP32-S3 SoC allows connection of a passive piezo buzzer for audible status indications. 
                                The buzzer provides additional feedback for events like low battery warnings, connection status, and system errors.
                            </p>
                        </section>

                        <!-- Circuit Schematics -->
                        <section id="schematics" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Circuit Schematics & Design Files</h2>
                            
                            <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl mb-6">
                                <p class="text-gray-700"><i class="fas fa-download mr-2 text-green-600"></i>
                                <strong>Open Source Hardware:</strong> Complete schematics, PCB files, and Gerber files are available on GitHub under CC license. 
                                You're free to build, modify, and share!</p>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">USB Input & Power Control Circuit</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-USB-Input-Power-Path-Control-3-3V-LDO.png" 
                                     alt="USB Power Circuit" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                Type-C USB port with pull-down resistors on CCx lines for universal compatibility. Power path controller built around 
                                P-Channel MOSFET (U1) and Schottky diode (D1) automatically switches between USB and battery power. 
                                SPX3819 LDO provides stable 3.3V with 500mA capability and 550mV dropout.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Battery Charger Circuit</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-Battery-Charger.png" 
                                     alt="Battery Charger" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                TP4056 charge controller handles battery charging with up to 1A current capability. Charge current is set by programming resistor R5 
                                and can be adjusted as needed. Two status outputs (CHRG and STDBY) drive LED indicators for charging and charge completion feedback.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Battery Monitoring & Power Switch</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-of-Battery-Monitoring-On-Off-Switch.png" 
                                     alt="Battery Monitoring" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                Voltage divider reduces battery voltage to safe levels for ADC measurement. ESP32 continuously monitors battery voltage to detect low charge conditions. 
                                Slide switch with pull-up resistor controls LDO enable pin for system power on/off (battery charging circuit remains active even when switched off).
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">USB-UART Bridge & Auto-Reset</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-USB-UART-Bridge-Programming-Circuit_1.png" 
                                     alt="USB UART Bridge" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                CH340K USB-UART bridge with integrated crystal oscillator for firmware flashing. 2N7002DW dual N-channel MOSFET package provides 
                                auto-reset functionality, eliminating manual button presses during programming while saving precious PCB space.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">ESP32-S3 SoC Connections</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-ESP32-S3-SoC.png" 
                                     alt="ESP32-S3 Schematic" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                ESP32-S3 module with manual reset and boot buttons for debugging. Two-pin connector for optional piezo buzzer audio output. 
                                All connections clearly labeled with most GPIOs either used for functionality or brought out to expansion ports. 
                                Standard bypass capacitors and pull-up resistors included as required by ESP32-S3.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">MPU6050 IMU Circuit</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/MPU6050-IMU-Schematics.png" 
                                     alt="MPU6050 Schematic" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                MPU6050 provides 6-axis motion tracking via I2C interface. Proper calibration essential for accurate flight control. 
                                Works with PID controller in firmware to adjust motor speeds based on pitch, roll, and yaw readings for stable flight performance.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Motor Driver Circuits</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Moyor-Drivers-Schematics.png" 
                                     alt="Motor Drivers" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                Four identical motor driver circuits, one per motor. Each uses IRLML6344 N-channel MOSFET, flyback diode, and pull-down resistor. 
                                PWM signals control motor speed by varying duty cycle. Flyback diodes prevent damage from back-EMF, capacitors suppress voltage spikes.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Status LED Circuit</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-Status-LED.png" 
                                     alt="Status LEDs" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                Six LED indicators provide comprehensive visual feedback: power (green), charging (red), full charge (blue), 
                                system status (yellow - slow blink during calibration, fast blink when ready), connection status (blue - blinks when connected), 
                                and error indicator (red - for low battery and system errors).
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Expansion Connector Pinout</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-of-Expansion-Connector.png" 
                                     alt="Expansion Connector" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                Four expansion connectors totaling 24 pins bring out power (VBUS, +3.3V, GND), communication interfaces (UART, I2C, Aux I2C, SPI), 
                                and eleven additional GPIOs for custom sensors, expansion modules, and DIY projects.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Expansion Module Pads</h3>
                            <div class="mb-4">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Schematics-Expansion-Modules.png" 
                                     alt="Expansion Modules" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                SMD solder pads on PCB bottom for optional sensors: SPI connections for PMW3901 optical flow sensor, 
                                I2C for MS5611 altitude sensor, and Auxiliary I2C for VL53L1X ToF sensor. Enables height hold, position hold, and altitude hold features.
                            </p>

                            <div class="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                                <h3 class="text-xl font-bold mb-3 text-blue-800">
                                    <i class="fab fa-github mr-2"></i>Download Design Files
                                </h3>
                                <p class="text-gray-700 mb-3">Complete circuit diagrams, PCB files, Gerber files, and interactive BOM available on GitHub:</p>
                                <a href="https://github.com/passion3d/flyq-air/tree/main/hardware" target="_blank" 
                                   class="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                                    <i class="fab fa-github mr-2"></i>
                                    View Hardware Files
                                    <i class="fas fa-external-link-alt ml-2 text-sm"></i>
                                </a>
                            </div>
                        </section>

                        <!-- GPIO Pinout -->
                        <section id="pinout" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">GPIO Pinout Reference</h2>
                            
                            <div class="mb-6">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Pinout-Diagram-LiteWing.png" 
                                     alt="FLYQ Air Pinout Diagram" 
                                     class="w-full rounded-xl shadow-lg">
                            </div>

                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl mb-6">
                                <h3 class="text-lg font-bold mb-2 text-yellow-800"><i class="fas fa-exclamation-triangle mr-2"></i>Silkscreen Labeling Correction (Rev 1)</h3>
                                <p class="text-gray-700 mb-2">First revision has incorrect silkscreen labeling for some IO pins:</p>
                                <ul class="list-disc list-inside text-gray-700 ml-4">
                                    <li><strong>IO48 is incorrectly marked as IO42</strong></li>
                                    <li><strong>CS/IO42 is incorrectly marked as IO47</strong></li>
                                </ul>
                                <p class="text-gray-700 mt-2">Refer to the pinout diagram above for correct pin identification. This has been corrected in latest revision.</p>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Complete Pin Mapping</h3>
                            <div class="overflow-x-auto">
                                <table class="w-full border-collapse">
                                    <thead class="bg-sky-500 text-white">
                                        <tr>
                                            <th class="py-3 px-4 text-left">Pin Label</th>
                                            <th class="py-3 px-4 text-left">ESP32-S3 GPIO</th>
                                            <th class="py-3 px-4 text-left">Function</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b bg-gray-50">
                                            <td colspan="3" class="py-2 px-4 font-bold text-sky-700">Connector Group 1</td>
                                        </tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO15</td><td class="py-3 px-4">GPIO15</td><td class="py-3 px-4">General Purpose I/O</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO16</td><td class="py-3 px-4">GPIO16</td><td class="py-3 px-4">General Purpose I/O</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO17</td><td class="py-3 px-4">GPIO17</td><td class="py-3 px-4">General Purpose I/O</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO18</td><td class="py-3 px-4">GPIO18</td><td class="py-3 px-4">General Purpose I/O</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO19</td><td class="py-3 px-4">GPIO19</td><td class="py-3 px-4">General Purpose I/O</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO20</td><td class="py-3 px-4">GPIO20</td><td class="py-3 px-4">General Purpose I/O</td></tr>
                                        
                                        <tr class="border-b bg-gray-50">
                                            <td colspan="3" class="py-2 px-4 font-bold text-sky-700">Connector Group 2</td>
                                        </tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO1</td><td class="py-3 px-4">GPIO1</td><td class="py-3 px-4">General Purpose I/O</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">TX</td><td class="py-3 px-4">TXD0</td><td class="py-3 px-4">UART0 TX Pin</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">RX</td><td class="py-3 px-4">RXD0</td><td class="py-3 px-4">UART0 RX Pin</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO48</td><td class="py-3 px-4">GPIO48</td><td class="py-3 px-4">General Purpose I/O (mislabeled as IO42 in Rev1)</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">SCL1</td><td class="py-3 px-4">GPIO41</td><td class="py-3 px-4">Auxiliary I2C Clock (for VL53L1X ToF)</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">SDA1</td><td class="py-3 px-4">GPIO40</td><td class="py-3 px-4">Auxiliary I2C Data (for VL53L1X ToF)</td></tr>
                                        
                                        <tr class="border-b bg-gray-50">
                                            <td colspan="3" class="py-2 px-4 font-bold text-sky-700">Connector Group 3</td>
                                        </tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">SCL</td><td class="py-3 px-4">GPIO10</td><td class="py-3 px-4">I2C0 Clock (for MPU6050)</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">SDA</td><td class="py-3 px-4">GPIO11</td><td class="py-3 px-4">I2C0 Data (for MPU6050)</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO13</td><td class="py-3 px-4">GPIO13</td><td class="py-3 px-4">General Purpose I/O</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">3V3</td><td class="py-3 px-4">-</td><td class="py-3 px-4">3.3V Output (500mA max from LDO)</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">GND</td><td class="py-3 px-4">-</td><td class="py-3 px-4">Ground Connection</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">VBUS</td><td class="py-3 px-4">-</td><td class="py-3 px-4">USB VBUS Connection (5V when USB connected)</td></tr>
                                        
                                        <tr class="border-b bg-gray-50">
                                            <td colspan="3" class="py-2 px-4 font-bold text-sky-700">Connector Group 4 (SPI & Audio)</td>
                                        </tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO39</td><td class="py-3 px-4">GPIO39</td><td class="py-3 px-4">Buzzer Positive</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">IO38</td><td class="py-3 px-4">GPIO38</td><td class="py-3 px-4">Buzzer Negative</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">MISO</td><td class="py-3 px-4">GPIO37</td><td class="py-3 px-4">SPI MISO (for PMW3901 Optical Flow)</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">CLK</td><td class="py-3 px-4">GPIO36</td><td class="py-3 px-4">SPI Clock (for PMW3901 Optical Flow)</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">MOSI</td><td class="py-3 px-4">GPIO35</td><td class="py-3 px-4">SPI MOSI (for PMW3901 Optical Flow)</td></tr>
                                        <tr class="border-b"><td class="py-3 px-4 font-bold">CS</td><td class="py-3 px-4">GPIO42</td><td class="py-3 px-4">SPI CS (for PMW3901, mislabeled as IO47 in Rev1)</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <!-- Programming -->
                        <section id="programming" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Programming Options</h2>
                            
                            <div class="bg-sky-50 border-l-4 border-sky-500 p-6 rounded-xl mb-6">
                                <h3 class="text-2xl font-bold mb-4 text-sky-700"><i class="fas fa-code mr-2"></i>ESP-IDF (Native Development)</h3>
                                <p class="text-gray-700 mb-2">Full access to Espressif's IoT Development Framework with advanced features.</p>
                                <code class="block bg-gray-800 text-green-400 p-4 rounded mt-3 overflow-x-auto">
idf.py build<br>
idf.py flash monitor
                                </code>
                            </div>

                            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl mb-6">
                                <h3 class="text-2xl font-bold mb-4 text-blue-700"><i class="fab fa-arduino mr-2"></i>Arduino IDE</h3>
                                <p class="text-gray-700 mb-2">Beginner-friendly development with thousands of libraries available.</p>
                                <code class="block bg-gray-800 text-green-400 p-4 rounded mt-3 overflow-x-auto text-sm">
#include "FLYQAir.h"<br><br>
FLYQAir drone;<br><br>
void setup() {<br>
&nbsp;&nbsp;drone.init();<br>
&nbsp;&nbsp;drone.calibrate();<br>
}<br><br>
void loop() {<br>
&nbsp;&nbsp;drone.takeoff(1.0);<br>
&nbsp;&nbsp;delay(2000);<br>
&nbsp;&nbsp;drone.land();<br>
}
                                </code>
                            </div>

                            <div class="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-xl mb-6">
                                <h3 class="text-2xl font-bold mb-4 text-purple-700"><i class="fab fa-python mr-2"></i>Python SDK (cflib)</h3>
                                <p class="text-gray-700 mb-2">Script autonomous behaviors and AI experiments with Python.</p>
                                <code class="block bg-gray-800 text-green-400 p-4 rounded mt-3 overflow-x-auto text-sm">
import cflib<br><br>
with SyncCrazyflie(uri) as scf:<br>
&nbsp;&nbsp;cf = scf.cf<br>
&nbsp;&nbsp;cf.param.set_value('flightmode.posSet', '1')<br>
&nbsp;&nbsp;for y in range(10):<br>
&nbsp;&nbsp;&nbsp;&nbsp;cf.commander.send_hover_setpoint(0, 0, 0, y / 25)<br>
&nbsp;&nbsp;&nbsp;&nbsp;time.sleep(0.1)
                                </code>
                            </div>

                            <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl">
                                <h3 class="text-2xl font-bold mb-4 text-green-700"><i class="fas fa-desktop mr-2"></i>Crazyflie CFClient</h3>
                                <p class="text-gray-700">Compatible with Crazyflie ecosystem for advanced control and telemetry.</p>
                            </div>
                        </section>

                        <!-- Firmware Details -->
                        <section id="firmware" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Firmware Architecture</h2>
                            
                            <p class="text-lg text-gray-700 leading-relaxed mb-6">
                                FLYQ Air firmware is built using <strong>ESP-IDF</strong>, Espressif's official IoT Development Framework for ESP32-series microcontrollers. 
                                The firmware is based on <strong>ESP-Drone</strong>, an open-source flight control firmware that integrates flight control algorithms 
                                from the Crazyflie project.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Core Components</h3>
                            <div class="grid md:grid-cols-2 gap-6 mb-6">
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-sky-500">
                                    <h4 class="text-lg font-bold mb-2 text-sky-600">Flight Control Core</h4>
                                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-2">
                                        <li>Sensor data processing & fusion</li>
                                        <li>Flight stabilization algorithms</li>
                                        <li>Motor control & PWM generation</li>
                                        <li>PID-based adjustments</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-sky-500">
                                    <h4 class="text-lg font-bold mb-2 text-sky-600">Hardware Drivers</h4>
                                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-2">
                                        <li>IMU (gyro/accelerometer)</li>
                                        <li>Barometer & magnetometer</li>
                                        <li>Motor controllers</li>
                                        <li>I2C, SPI, UART interfaces</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-sky-500">
                                    <h4 class="text-lg font-bold mb-2 text-sky-600">Communication Modules</h4>
                                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-2">
                                        <li>Wi-Fi control interface</li>
                                        <li>Telemetry transmission</li>
                                        <li>Remote control protocol</li>
                                        <li>Data logging</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-sky-500">
                                    <h4 class="text-lg font-bold mb-2 text-sky-600">Software Libraries</h4>
                                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-2">
                                        <li>ESP-IDF components</li>
                                        <li>DSP signal filtering</li>
                                        <li>Sensor fusion algorithms</li>
                                        <li>Real-time data processing</li>
                                    </ul>
                                </div>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Crazyflie Compatibility</h3>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                FLYQ Air firmware supports <strong>Crazyflie cfclient and cflib</strong>, enabling control via Python scripts and PC. 
                                This compatibility opens doors for advanced experiments with AI, computer vision, gesture control, and autonomous flight missions.
                            </p>

                            <div class="grid md:grid-cols-2 gap-6 mb-6">
                                <div class="border-2 border-purple-200 bg-purple-50 rounded-xl p-6">
                                    <h4 class="text-lg font-bold mb-3 text-purple-700"><i class="fas fa-desktop mr-2"></i>CFClient Control</h4>
                                    <p class="text-gray-700">
                                        Use Crazyflie PC client with Xbox/PS4/PS5 controller for manual flight control. Monitor real-time telemetry, 
                                        flight parameters, and sensor data through comprehensive GUI.
                                    </p>
                                </div>
                                
                                <div class="border-2 border-purple-200 bg-purple-50 rounded-xl p-6">
                                    <h4 class="text-lg font-bold mb-3 text-purple-700"><i class="fab fa-python mr-2"></i>Python cflib</h4>
                                    <p class="text-gray-700">
                                        Write Python scripts for autonomous behaviors. Integrate camera inputs, AI models, or sensor data 
                                        to create intelligent flight patterns and mission automation.
                                    </p>
                                </div>
                            </div>

                            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl mb-6">
                                <h3 class="text-lg font-bold mb-2 text-blue-800"><i class="fas fa-download mr-2"></i>Download Firmware</h3>
                                <p class="text-gray-700 mb-3">Pre-compiled firmware binaries and source code available on GitHub:</p>
                                <a href="https://github.com/passion3d/flyq-air/tree/main/firmware" target="_blank" 
                                   class="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                                    <i class="fab fa-github mr-2"></i>
                                    Firmware Repository
                                    <i class="fas fa-external-link-alt ml-2 text-sm"></i>
                                </a>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Flashing Firmware</h3>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                Upload firmware via USB-C connection using ESP-IDF tools, Arduino IDE, or pre-built flash tools. 
                                Auto-reset circuitry eliminates need for manual button presses during flashing process.
                            </p>
                        </section>

                        <!-- Optional Sensors -->
                        <section id="sensors" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Optional Sensors & Assisted Flight</h2>
                            
                            <div class="mb-6">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Optional-Modules-and-Assisted-Flight-Control.png" 
                                     alt="Optional Modules" 
                                     class="w-full rounded-xl shadow-lg">
                            </div>

                            <p class="text-lg text-gray-700 leading-relaxed mb-6">
                                FLYQ Air supports optional sensors for advanced flight modes including <strong>height hold, position hold, and altitude hold</strong>. 
                                SMD solder pads on the PCB bottom allow easy mounting of sensor modules. Note: Battery may need to be mounted on top when using bottom sensors.
                            </p>

                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl mb-6">
                                <p class="text-gray-700"><i class="fas fa-info-circle mr-2 text-yellow-600"></i>
                                <strong>Note:</strong> Assisted flight control features currently supported with CFClient and custom Python SDK only. 
                                Height hold functionality has been tested and is working. Additional module support being added to firmware.</p>
                            </div>
                            
                            <div class="grid md:grid-cols-3 gap-6 mb-8">
                                <div class="border-2 border-sky-200 rounded-xl p-6 hover:shadow-lg transition">
                                    <div class="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <i class="fas fa-ruler-vertical text-sky-600 text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-bold mb-3 text-sky-600 text-center">VL53L1X ToF</h3>
                                    <p class="text-gray-700 mb-3 text-center">Time-of-Flight distance sensor for precise height hold functionality up to 4 meters.</p>
                                    <p class="text-sm text-gray-500 text-center font-semibold">Interface: Aux I2C</p>
                                    <p class="text-xs text-gray-500 text-center">GPIO40 (SDA1) / GPIO41 (SCL1)</p>
                                </div>
                                
                                <div class="border-2 border-sky-200 rounded-xl p-6 hover:shadow-lg transition">
                                    <div class="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <i class="fas fa-mountain text-sky-600 text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-bold mb-3 text-sky-600 text-center">MS5611 Barometer</h3>
                                    <p class="text-gray-700 mb-3 text-center">Barometric pressure sensor for accurate altitude hold and vertical positioning.</p>
                                    <p class="text-sm text-gray-500 text-center font-semibold">Interface: I2C</p>
                                    <p class="text-xs text-gray-500 text-center">GPIO10 (SCL) / GPIO11 (SDA)</p>
                                </div>
                                
                                <div class="border-2 border-sky-200 rounded-xl p-6 hover:shadow-lg transition">
                                    <div class="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <i class="fas fa-crosshairs text-sky-600 text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-bold mb-3 text-sky-600 text-center">PMW3901 Optical Flow</h3>
                                    <p class="text-gray-700 mb-3 text-center">Optical flow sensor for position hold and stable hovering in place.</p>
                                    <p class="text-sm text-gray-500 text-center font-semibold">Interface: SPI</p>
                                    <p class="text-xs text-gray-500 text-center">GPIO35-37, GPIO42</p>
                                </div>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Custom Expansion Options</h3>
                            <p class="text-gray-700 mb-4">
                                The 24-pin expansion connector provides full access to communication interfaces and GPIOs for adding custom sensors:
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li><strong>I2C0:</strong> SCL (GPIO10), SDA (GPIO11) - Primary I2C for MPU6050 and additional I2C devices</li>
                                <li><strong>Aux I2C:</strong> SCL1 (GPIO41), SDA1 (GPIO40) - Dedicated for VL53L1X ToF sensor</li>
                                <li><strong>SPI:</strong> MISO (GPIO37), CLK (GPIO36), MOSI (GPIO35), CS (GPIO42) - For PMW3901 and other SPI devices</li>
                                <li><strong>UART0:</strong> TX/RX exposed for serial communication with external modules</li>
                                <li><strong>Power:</strong> VBUS (5V), 3V3 (500mA), GND available</li>
                                <li><strong>Additional GPIOs:</strong> IO15-IO20, IO1, IO13, IO48 for custom sensors and peripherals</li>
                            </ul>
                        </section>

                        <!-- Assembly -->
                        <section id="assembly" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Assembly Guide</h2>
                            
                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl mb-6">
                                <p class="text-gray-700"><i class="fas fa-info-circle mr-2 text-yellow-600"></i>
                                <strong>Note:</strong> FLYQ Air is available as a DIY kit or fully assembled. DIY kit requires minimal soldering for motors. 
                                No 3D printing needed - PCB serves as the complete frame!</p>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">What's Included</h3>
                            <div class="mb-6">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Lite-Wing-Mechanical-Parts.png" 
                                     alt="FLYQ Air Assembly Parts" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                            </div>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-6">
                                <li>All-in-one PCB frame with pre-mounted electronic components</li>
                                <li>4× 720 coreless DC motors</li>
                                <li>2 sets of propellers (2 CW marked 'A' + 2 CCW marked 'B')</li>
                                <li>Hook & loop battery strap</li>
                                <li>USB Type-C cable for charging and programming</li>
                            </ul>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Propeller Installation</h3>
                            
                            <div class="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-Propellers.png" 
                                         alt="FLYQ Air Propellers" 
                                         class="w-full rounded-xl shadow-lg mb-4">
                                    <p class="text-sm text-gray-600 text-center">Two sets of propellers included (CW and CCW)</p>
                                </div>
                                <div>
                                    <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Properller-Blades-Litewing.png" 
                                         alt="Propeller Blade Marking" 
                                         class="w-full rounded-xl shadow-lg mb-4">
                                    <p class="text-sm text-gray-600 text-center">Propeller markings: A (CW) and B (CCW)</p>
                                </div>
                            </div>

                            <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mb-6">
                                <h4 class="text-lg font-bold mb-2 text-red-800"><i class="fas fa-exclamation-triangle mr-2"></i>Critical: Correct Propeller Placement</h4>
                                <p class="text-gray-700">Installing propellers incorrectly will prevent flight and may cause drone instability or crashes!</p>
                            </div>

                            <div class="mb-6">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Propeller-Installation-Markings-LiteWing.png" 
                                     alt="PCB Propeller Markings" 
                                     class="w-full rounded-xl shadow-lg mb-4">
                                <p class="text-sm text-gray-600 text-center">PCB markings show correct propeller type and rotation direction for each motor</p>
                            </div>

                            <div class="mb-6">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Direction-and-Propeller-Marking.png" 
                                     alt="Motor Direction Diagram" 
                                     class="w-full max-w-2xl mx-auto rounded-xl shadow-lg mb-4">
                                <p class="text-sm text-gray-600 text-center">Complete motor direction and propeller placement reference</p>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Assembly Steps</h3>
                            <ol class="list-decimal list-inside space-y-4 text-gray-700 ml-4">
                                <li class="mb-3">
                                    <strong class="text-lg">Motor Installation (DIY Kit Only):</strong>
                                    <p class="mt-2">Solder the 4 coreless motors to designated pads on each PCB arm. Ensure correct polarity for proper rotation direction.</p>
                                </li>
                                
                                <li class="mb-3">
                                    <strong class="text-lg">Propeller Installation:</strong>
                                    <p class="mt-2">Match propeller markings to PCB markings:</p>
                                    <ul class="list-disc list-inside ml-8 mt-2 space-y-1">
                                        <li><strong>Type A propellers (marked 'A'):</strong> Install on motors marked for clockwise (CW) rotation</li>
                                        <li><strong>Type B propellers (marked 'B'):</strong> Install on motors marked for counter-clockwise (CCW) rotation</li>
                                        <li>Press fit propellers firmly onto motor shafts until secure</li>
                                        <li>Verify propellers spin freely without wobbling</li>
                                    </ul>
                                </li>
                                
                                <li class="mb-3">
                                    <strong class="text-lg">Battery Attachment:</strong>
                                    <p class="mt-2">Secure 1S LiPo battery on bottom using provided hook & loop strap through PCB frame slots. 
                                    Ensure battery is centered for balanced flight. Connect battery connector to PCB.</p>
                                </li>
                                
                                <li class="mb-3">
                                    <strong class="text-lg">Initial Charging:</strong>
                                    <p class="mt-2">Connect USB-C cable to charge battery before first flight. CHRG LED will illuminate during charging, 
                                    FULL LED indicates charge complete. Initial charge may take 1-2 hours depending on battery capacity.</p>
                                </li>
                                
                                <li class="mb-3">
                                    <strong class="text-lg">Firmware Upload (if needed):</strong>
                                    <p class="mt-2">Flash firmware via USB-C connection using ESP-IDF tools or Arduino IDE. Latest firmware available on GitHub. 
                                    Most units ship with firmware pre-installed.</p>
                                </li>
                            </ol>

                            <div class="mt-8 grid md:grid-cols-2 gap-6">
                                <div class="border-2 border-green-300 bg-green-50 rounded-xl p-6">
                                    <h4 class="text-lg font-bold mb-3 text-green-700"><i class="fas fa-check-circle mr-2"></i>Correct Assembly</h4>
                                    <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/Correct-Incorrect-Propeller-Placement.png" 
                                         alt="Correct Propeller Placement" 
                                         class="w-full rounded-lg mb-3">
                                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-2">
                                        <li>Propellers match PCB markings</li>
                                        <li>All blades spin freely</li>
                                        <li>Battery centered and secure</li>
                                        <li>No loose connections</li>
                                    </ul>
                                </div>
                                
                                <div class="border-2 border-red-300 bg-red-50 rounded-xl p-6">
                                    <h4 class="text-lg font-bold mb-3 text-red-700"><i class="fas fa-times-circle mr-2"></i>Common Mistakes</h4>
                                    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-2">
                                        <li>Wrong propeller type on motor (A on CCW position or vice versa)</li>
                                        <li>Propellers not fully seated on motor shafts</li>
                                        <li>Battery off-center causing imbalance</li>
                                        <li>Loose battery strap during flight</li>
                                        <li>Forgetting to calibrate on flat surface</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <!-- Battery Selection -->
                        <section id="battery" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Battery Selection & Power</h2>
                            
                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Recommended Battery Specifications</h3>
                            
                            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl mb-6">
                                <h4 class="text-lg font-bold mb-2 text-blue-800">Optimal Battery: 650mAh 1S LiPo 30C</h4>
                                <p class="text-gray-700">For best performance and reliability, use a high-discharge battery with at least 20C rating, preferably 30C or higher.</p>
                            </div>

                            <div class="overflow-x-auto mb-6">
                                <table class="w-full border-collapse">
                                    <thead class="bg-sky-500 text-white">
                                        <tr>
                                            <th class="py-3 px-4 text-left">Specification</th>
                                            <th class="py-3 px-4 text-left">Minimum</th>
                                            <th class="py-3 px-4 text-left">Recommended</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold">Voltage</td>
                                            <td class="py-3 px-4">1S LiPo (3.7V nominal)</td>
                                            <td class="py-3 px-4">1S LiPo (3.7V nominal)</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold">Capacity</td>
                                            <td class="py-3 px-4">500mAh</td>
                                            <td class="py-3 px-4">650mAh - 800mAh</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold">Discharge Rating</td>
                                            <td class="py-3 px-4">20C</td>
                                            <td class="py-3 px-4">30C or higher</td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="py-3 px-4 font-bold">Connector</td>
                                            <td class="py-3 px-4" colspan="2">Micro JST or compatible with drone connector</td>
                                        </tr>
                                        <tr>
                                            <td class="py-3 px-4 font-bold">Weight</td>
                                            <td class="py-3 px-4" colspan="2">15-20g (within payload capacity)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mb-6">
                                <h4 class="text-lg font-bold mb-2 text-red-800"><i class="fas fa-exclamation-triangle mr-2"></i>Low Discharge Rate Warning</h4>
                                <p class="text-gray-700 mb-2">
                                    Using batteries with insufficient discharge rating (below 20C) will cause:
                                </p>
                                <ul class="list-disc list-inside text-gray-700 ml-4 space-y-1">
                                    <li>Drone rebooting during takeoff or high throttle</li>
                                    <li>Voltage drops under load causing system resets</li>
                                    <li>Reduced flight performance and instability</li>
                                    <li>Potential battery damage from over-discharge</li>
                                </ul>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Flight Time & Performance</h3>
                            <div class="grid md:grid-cols-3 gap-6 mb-6">
                                <div class="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl border-2 border-sky-200">
                                    <div class="text-4xl font-black text-sky-600 mb-2">5-7 min</div>
                                    <div class="text-sm text-gray-600 font-semibold">Flight Time</div>
                                    <p class="text-xs text-gray-500 mt-2">With 650mAh 30C battery</p>
                                </div>
                                
                                <div class="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl border-2 border-sky-200">
                                    <div class="text-4xl font-black text-sky-600 mb-2">~25g</div>
                                    <div class="text-sm text-gray-600 font-semibold">Payload Capacity</div>
                                    <p class="text-xs text-gray-500 mt-2">With 55mm propellers</p>
                                </div>
                                
                                <div class="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl border-2 border-sky-200">
                                    <div class="text-4xl font-black text-sky-600 mb-2">1-2 hrs</div>
                                    <div class="text-sm text-gray-600 font-semibold">Charge Time</div>
                                    <p class="text-xs text-gray-500 mt-2">Up to 1A charging current</p>
                                </div>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Battery Safety Guidelines</h3>
                            <div class="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-xl">
                                <ul class="list-disc list-inside text-gray-700 space-y-2 ml-2">
                                    <li><strong>Never over-discharge:</strong> Land immediately when ERR LED illuminates (low battery warning)</li>
                                    <li><strong>Storage voltage:</strong> Store LiPo batteries at 3.8V (storage charge) for longevity</li>
                                    <li><strong>Temperature:</strong> Don't charge or fly batteries in extreme temperatures</li>
                                    <li><strong>Physical damage:</strong> Never use swollen, punctured, or damaged batteries</li>
                                    <li><strong>Charging supervision:</strong> Always supervise battery charging, never leave unattended</li>
                                    <li><strong>Fire safety:</strong> Charge in fireproof LiPo bag or on non-flammable surface</li>
                                    <li><strong>Disposal:</strong> Properly dispose of old batteries at recycling centers</li>
                                </ul>
                            </div>
                        </section>

                        <!-- Getting Started -->
                        <section id="getting-started" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Getting Started Guide</h2>
                            
                            <div class="mb-6">
                                <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-Wireless-Communication-Illustration-app-cfclient-python-code.png" 
                                     alt="FLYQ Air Control Options" 
                                     class="w-full rounded-xl shadow-lg">
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Pre-Flight Setup</h3>
                            
                            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl mb-6">
                                <h4 class="text-lg font-bold mb-2 text-blue-800"><i class="fas fa-info-circle mr-2"></i>Important: Initial Calibration</h4>
                                <p class="text-gray-700">
                                    <strong>Always place FLYQ Air on a flat, level surface before powering on.</strong> The IMU calibrates during startup. 
                                    If powered on while moving or tilted, calibration will be incorrect and drone will not fly properly. 
                                    If you miss this, simply place on flat surface and reset the drone.
                                </p>
                            </div>

                            <ol class="list-decimal list-inside space-y-4 text-gray-700 ml-4 mb-8">
                                <li class="mb-2">
                                    <strong class="text-lg">Battery Preparation:</strong>
                                    <ul class="list-disc list-inside ml-8 mt-2 space-y-1">
                                        <li>Fully charge LiPo battery using USB-C connection</li>
                                        <li>Wait for FULL LED to illuminate (charge complete)</li>
                                        <li>Ensure battery is 650mAh 30C or equivalent high-discharge type</li>
                                        <li>Check battery for any physical damage before use</li>
                                    </ul>
                                </li>
                                
                                <li class="mb-2">
                                    <strong class="text-lg">Propeller Verification:</strong>
                                    <ul class="list-disc list-inside ml-8 mt-2 space-y-1">
                                        <li>Verify Type A propellers on CW motors, Type B on CCW motors</li>
                                        <li>Check all propellers are firmly seated on motor shafts</li>
                                        <li>Spin each propeller by hand to ensure free rotation</li>
                                        <li>Look for any cracks or damage on propeller blades</li>
                                    </ul>
                                </li>
                                
                                <li class="mb-2">
                                    <strong class="text-lg">IMU Calibration:</strong>
                                    <ul class="list-disc list-inside ml-8 mt-2 space-y-1">
                                        <li>Place drone on flat, stable surface (table or floor)</li>
                                        <li>Power on drone using slide switch</li>
                                        <li>SYS LED will blink slowly during calibration (5-10 seconds)</li>
                                        <li>Do not move or touch drone during calibration</li>
                                        <li>SYS LED changes to fast blinking when ready to fly</li>
                                    </ul>
                                </li>
                                
                                <li class="mb-2">
                                    <strong class="text-lg">Connection Setup:</strong>
                                    <ul class="list-disc list-inside ml-8 mt-2 space-y-1">
                                        <li>Drone creates Wi-Fi access point "FLYQ_Air_XXXX"</li>
                                        <li>On smartphone: disable mobile data and VPN</li>
                                        <li>Connect to FLYQ Air's Wi-Fi network</li>
                                        <li>Open ESP-Drone app (Android/iOS)</li>
                                        <li>LINK LED will blink when connection established</li>
                                    </ul>
                                </li>
                            </ol>

                            <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mb-8">
                                <h4 class="text-lg font-bold mb-2 text-red-800"><i class="fas fa-exclamation-triangle mr-2"></i>Critical Safety Warnings</h4>
                                <ul class="list-disc list-inside text-gray-700 space-y-2 ml-2">
                                    <li><strong>Propeller Safety:</strong> Keep fingers, hair, and loose clothing away from spinning propellers at all times</li>
                                    <li><strong>Flight Area:</strong> Always fly in open outdoor areas away from people, animals, and obstacles</li>
                                    <li><strong>Indoor Testing:</strong> Remove all propellers when testing controls or motors indoors</li>
                                    <li><strong>Line of Sight:</strong> Maintain visual contact with drone during flight</li>
                                    <li><strong>Weather:</strong> Do not fly in rain, strong wind, or poor visibility</li>
                                    <li><strong>Emergency Landing:</strong> Land immediately if ERR LED illuminates (low battery)</li>
                                </ul>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">First Flight Procedure</h3>
                            <ol class="list-decimal list-inside space-y-3 text-gray-700 ml-4 mb-6">
                                <li><strong>Environment Check:</strong> Choose open area with at least 5m clearance in all directions. Check for wind conditions.</li>
                                <li><strong>Pre-Flight Inspection:</strong> Verify all LEDs showing correct status, battery secure, propellers intact.</li>
                                <li><strong>Test Motors:</strong> With propellers off, test motor response using app controls at low throttle.</li>
                                <li><strong>Install Propellers:</strong> Attach all four propellers in correct orientation.</li>
                                <li><strong>Initial Liftoff:</strong> Place drone on ground, slowly increase throttle until drone lifts ~30cm.</li>
                                <li><strong>Hover Practice:</strong> Maintain stable hover for 10-20 seconds, practice small adjustments.</li>
                                <li><strong>Basic Maneuvers:</strong> Try gentle forward/backward, left/right movements at low altitude.</li>
                                <li><strong>Safe Landing:</strong> Reduce throttle gradually for controlled descent and landing.</li>
                            </ol>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Mobile App Control</h3>
                            <div class="grid md:grid-cols-2 gap-6 mb-6">
                                <div class="border-2 border-sky-200 bg-sky-50 rounded-xl p-6">
                                    <h4 class="text-lg font-bold mb-3 text-sky-700"><i class="fab fa-android mr-2"></i>Android Setup</h4>
                                    <ol class="list-decimal list-inside text-gray-700 space-y-2 ml-2">
                                        <li>Download ESP-Drone app from Play Store</li>
                                        <li>Disable mobile data in phone settings</li>
                                        <li>Turn off any active VPN connections</li>
                                        <li>Disable "Switch to Wi-Fi with internet" option</li>
                                        <li>Connect to FLYQ_Air_XXXX network</li>
                                        <li>Open app - auto-connects to drone</li>
                                    </ol>
                                </div>
                                
                                <div class="border-2 border-sky-200 bg-sky-50 rounded-xl p-6">
                                    <h4 class="text-lg font-bold mb-3 text-sky-700"><i class="fab fa-apple mr-2"></i>iOS Setup</h4>
                                    <ol class="list-decimal list-inside text-gray-700 space-y-2 ml-2">
                                        <li>Download ESP-Drone app from App Store</li>
                                        <li>Disable cellular data in Settings</li>
                                        <li>Turn off any active VPN connections</li>
                                        <li>In Wi-Fi settings, disable auto-join for other networks</li>
                                        <li>Connect to FLYQ_Air_XXXX network</li>
                                        <li>Open app - auto-connects to drone</li>
                                    </ol>
                                </div>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">PC Control via CFClient</h3>
                            <div class="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-xl mb-6">
                                <h4 class="text-lg font-bold mb-3 text-purple-800"><i class="fas fa-desktop mr-2"></i>Advanced Control Option</h4>
                                <p class="text-gray-700 mb-4">
                                    FLYQ Air supports Crazyflie's cfclient for PC-based control with game controllers (Xbox, PS4/PS5). 
                                    This enables advanced features like telemetry monitoring, parameter tuning, and assisted flight modes.
                                </p>
                                <ol class="list-decimal list-inside text-gray-700 space-y-2 ml-2">
                                    <li>Install Crazyflie client from <a href="https://github.com/bitcraze/crazyflie-clients-python" class="text-purple-600 hover:underline" target="_blank">GitHub</a></li>
                                    <li>Connect PC to FLYQ Air's Wi-Fi network</li>
                                    <li>Launch cfclient and scan for drones</li>
                                    <li>Connect game controller via USB or Bluetooth</li>
                                    <li>Configure controller mapping in cfclient settings</li>
                                    <li>Connect to FLYQ Air and start flying</li>
                                </ol>
                            </div>
                        </section>

                        <!-- Troubleshooting -->
                        <section id="troubleshooting" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Troubleshooting Guide</h2>
                            
                            <p class="text-lg text-gray-700 mb-6">Common issues and solutions for FLYQ Air. If problems persist after trying these solutions, contact support.</p>
                            
                            <div class="space-y-6">
                                <div class="border-l-4 border-red-400 bg-red-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-3 text-gray-800"><i class="fas fa-wifi text-red-500 mr-2"></i>App Won't Connect to Drone</h3>
                                    <p class="text-gray-700 mb-2 font-semibold">Symptoms: App can't find drone or connection fails immediately</p>
                                    <p class="text-gray-700 mb-3"><strong>Solutions:</strong></p>
                                    <ul class="list-disc list-inside text-gray-700 ml-4 space-y-2">
                                        <li><strong>Disable Mobile Data:</strong> Turn off cellular data completely in phone settings</li>
                                        <li><strong>Disable VPN:</strong> Any VPN connection will prevent local network access</li>
                                        <li><strong>Auto-Switch Setting:</strong> Disable "Switch to Wi-Fi with internet" or "Smart Network Switch" in Wi-Fi advanced settings</li>
                                        <li><strong>Forget Other Networks:</strong> Temporarily forget other saved Wi-Fi networks to prevent auto-switching</li>
                                        <li><strong>Restart Sequence:</strong> Power cycle drone, restart phone Wi-Fi, reconnect to FLYQ_Air network, then restart app</li>
                                        <li><strong>Check LINK LED:</strong> Should blink when connection established</li>
                                    </ul>
                                </div>

                                <div class="border-l-4 border-orange-400 bg-orange-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-3 text-gray-800"><i class="fas fa-power-off text-orange-500 mr-2"></i>Drone Reboots/Shuts Down During Takeoff</h3>
                                    <p class="text-gray-700 mb-2 font-semibold">Symptoms: Drone powers off or reboots when throttle increased, motors stop suddenly</p>
                                    <p class="text-gray-700 mb-3"><strong>Root Cause:</strong> Insufficient battery discharge capability causing voltage drops</p>
                                    <ul class="list-disc list-inside text-gray-700 ml-4 space-y-2">
                                        <li><strong>Battery Rating Too Low:</strong> Must use minimum 20C discharge rating, 30C+ strongly recommended</li>
                                        <li><strong>Recommended Battery:</strong> 650mAh 1S LiPo 30C or higher</li>
                                        <li><strong>Check Battery Charge:</strong> Ensure battery is fully charged (FULL LED was lit during charging)</li>
                                        <li><strong>Battery Age:</strong> Old batteries lose discharge capability over time - replace if issues persist</li>
                                        <li><strong>Voltage Verification:</strong> Measure battery voltage - should be 4.2V when fully charged, 3.7V nominal</li>
                                    </ul>
                                </div>

                                <div class="border-l-4 border-yellow-400 bg-yellow-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-3 text-gray-800"><i class="fas fa-ban text-yellow-600 mr-2"></i>Connected But No Response to Controls</h3>
                                    <p class="text-gray-700 mb-2 font-semibold">Symptoms: App shows connected but drone doesn't respond to stick inputs</p>
                                    <p class="text-gray-700 mb-3"><strong>Solutions:</strong></p>
                                    <ul class="list-disc list-inside text-gray-700 ml-4 space-y-2">
                                        <li><strong>Check SYS LED:</strong> Slow blinking = still calibrating, fast blinking = ready to fly</li>
                                        <li><strong>Calibration Issue:</strong> Drone must be on flat surface during power-on for proper IMU calibration</li>
                                        <li><strong>Reset Procedure:</strong> Place on flat surface, power off, wait 3 seconds, power on again</li>
                                        <li><strong>Wait for Ready:</strong> Allow 10-15 seconds after power-on for calibration completion</li>
                                        <li><strong>Verify Connection:</strong> LINK LED should be blinking to indicate active connection</li>
                                    </ul>
                                </div>

                                <div class="border-l-4 border-blue-400 bg-blue-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-3 text-gray-800"><i class="fas fa-spinner text-blue-500 mr-2"></i>Wrong Propeller Rotation / Won't Take Off</h3>
                                    <p class="text-gray-700 mb-2 font-semibold">Symptoms: Drone flips immediately on takeoff, motors spin but no lift, unstable flight</p>
                                    <p class="text-gray-700 mb-3"><strong>Solutions:</strong></p>
                                    <ul class="list-disc list-inside text-gray-700 ml-4 space-y-2">
                                        <li><strong>Verify PCB Markings:</strong> Each motor position has letter (A or B) and rotation direction marked on PCB</li>
                                        <li><strong>Type A Propellers:</strong> Install on motors marked with "A" and clockwise arrow</li>
                                        <li><strong>Type B Propellers:</strong> Install on motors marked with "B" and counter-clockwise arrow</li>
                                        <li><strong>Visual Check:</strong> Use the propeller placement diagram to verify correct configuration</li>
                                        <li><strong>Blade Damage:</strong> Inspect propellers for cracks or bent blades, replace if damaged</li>
                                    </ul>
                                </div>

                                <div class="border-l-4 border-purple-400 bg-purple-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-3 text-gray-800"><i class="fas fa-tilted-exclamation text-purple-500 mr-2"></i>Unstable Flight / Drifting</h3>
                                    <p class="text-gray-700 mb-2 font-semibold">Symptoms: Drone drifts in one direction, tilts during hover, requires constant correction</p>
                                    <ul class="list-disc list-inside text-gray-700 ml-4 space-y-2">
                                        <li><strong>Recalibrate IMU:</strong> Power on while on perfectly flat surface</li>
                                        <li><strong>Check Propellers:</strong> Ensure all propellers undamaged and properly installed</li>
                                        <li><strong>Motor Function:</strong> Test each motor individually - all should spin at same speed</li>
                                        <li><strong>Battery Position:</strong> Verify battery is centered - off-center battery causes imbalance</li>
                                        <li><strong>Propeller Balance:</strong> Check each propeller spins smoothly without wobble</li>
                                        <li><strong>Wind Conditions:</strong> Avoid flying in winds above 5 mph (8 km/h)</li>
                                    </ul>
                                </div>

                                <div class="border-l-4 border-green-400 bg-green-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-3 text-gray-800"><i class="fas fa-battery-quarter text-green-600 mr-2"></i>Short Flight Time</h3>
                                    <p class="text-gray-700 mb-2 font-semibold">Symptoms: ERR LED comes on quickly, flight time under 3 minutes</p>
                                    <ul class="list-disc list-inside text-gray-700 ml-4 space-y-2">
                                        <li><strong>Battery Capacity:</strong> Use minimum 650mAh battery for 5-7 minute flights</li>
                                        <li><strong>Full Charge:</strong> Ensure FULL LED was lit - charge until complete</li>
                                        <li><strong>Battery Age:</strong> Old batteries lose capacity - replace after 100-150 cycles</li>
                                        <li><strong>Flight Style:</strong> Aggressive flying drains battery faster - use smooth inputs</li>
                                        <li><strong>Propeller Condition:</strong> Damaged propellers reduce efficiency - replace worn propellers</li>
                                    </ul>
                                </div>

                                <div class="border-l-4 border-gray-400 bg-gray-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-3 text-gray-800"><i class="fas fa-usb text-gray-600 mr-2"></i>Firmware Upload Fails</h3>
                                    <p class="text-gray-700 mb-2 font-semibold">Symptoms: Cannot flash firmware, USB not recognized, upload errors</p>
                                    <ul class="list-disc list-inside text-gray-700 ml-4 space-y-2">
                                        <li><strong>USB Cable:</strong> Use data-capable USB cable (not charge-only cable)</li>
                                        <li><strong>Driver Installation:</strong> Install CH340 USB driver for your operating system</li>
                                        <li><strong>Port Selection:</strong> Select correct COM port in Arduino IDE or ESP-IDF</li>
                                        <li><strong>Manual Boot Mode:</strong> Hold BOOT button while connecting USB if auto-reset fails</li>
                                        <li><strong>USB Power:</strong> Try different USB port or powered USB hub</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mt-8 bg-sky-50 border-2 border-sky-200 rounded-xl p-6">
                                <h3 class="text-xl font-bold mb-3 text-sky-800">
                                    <i class="fas fa-life-ring mr-2"></i>Still Need Help?
                                </h3>
                                <p class="text-gray-700 mb-4">
                                    If your issue isn't resolved by the above solutions, reach out to our community or support team:
                                </p>
                                <div class="grid md:grid-cols-3 gap-4">
                                    <a href="#" class="flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition">
                                        <i class="fab fa-whatsapp mr-2"></i>
                                        WhatsApp Community
                                    </a>
                                    <a href="https://circuitdigest.com/forum" target="_blank" class="flex items-center justify-center bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition">
                                        <i class="fas fa-comments mr-2"></i>
                                        Community Forum
                                    </a>
                                    <a href="mailto:support@passion3dworld.com" class="flex items-center justify-center bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition">
                                        <i class="fas fa-envelope mr-2"></i>
                                        Email Support
                                    </a>
                                </div>
                            </div>
                        </section>

                        <!-- Tutorials -->
                        <section id="tutorials" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Tutorials & Projects</h2>
                            
                            <p class="text-lg text-gray-700 mb-6">
                                Explore advanced projects and tutorials to unleash FLYQ Air's full potential. More tutorials being added regularly!
                            </p>

                            <div class="grid md:grid-cols-2 gap-6">
                                <a href="https://circuitdigest.com/microcontroller-projects/diy-gesture-controlled-drone-using-esp32-and-python-with-litewing" target="_blank" 
                                   class="block border-2 border-sky-200 rounded-xl p-6 hover:shadow-xl hover:border-sky-400 transition">
                                    <div class="bg-gradient-to-br from-sky-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <i class="fas fa-hand-paper text-white text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-bold mb-3 text-sky-600">Gesture Control with Python</h3>
                                    <p class="text-gray-700 mb-3">
                                        Control FLYQ Air using hand gestures detected by camera and OpenCV. Learn computer vision integration 
                                        with cflib Python library for intuitive flight control.
                                    </p>
                                    <div class="flex items-center text-sky-600 font-semibold">
                                        <span>Read Tutorial</span>
                                        <i class="fas fa-arrow-right ml-2"></i>
                                    </div>
                                </a>

                                <div class="border-2 border-gray-300 rounded-xl p-6 bg-gray-50">
                                    <div class="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <i class="fab fa-arduino text-white text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-bold mb-3 text-gray-600">Arduino Flight Control</h3>
                                    <p class="text-gray-700 mb-3">
                                        Program FLYQ Air using Arduino IDE with custom flight patterns and behaviors. 
                                        Step-by-step Arduino tutorial coming soon!
                                    </p>
                                    <div class="flex items-center text-gray-500 font-semibold">
                                        <span>Coming Soon</span>
                                        <i class="fas fa-clock ml-2"></i>
                                    </div>
                                </div>

                                <div class="border-2 border-gray-300 rounded-xl p-6 bg-gray-50">
                                    <div class="bg-gradient-to-br from-green-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <i class="fas fa-robot text-white text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-bold mb-3 text-gray-600">AI Object Tracking</h3>
                                    <p class="text-gray-700 mb-3">
                                        Implement autonomous object tracking using machine learning models and camera integration. 
                                        Advanced AI tutorial in development.
                                    </p>
                                    <div class="flex items-center text-gray-500 font-semibold">
                                        <span>Coming Soon</span>
                                        <i class="fas fa-clock ml-2"></i>
                                    </div>
                                </div>

                                <div class="border-2 border-gray-300 rounded-xl p-6 bg-gray-50">
                                    <div class="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <i class="fas fa-route text-white text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-bold mb-3 text-gray-600">Autonomous Waypoint Navigation</h3>
                                    <p class="text-gray-700 mb-3">
                                        Program autonomous flight paths with GPS waypoints and obstacle avoidance. 
                                        Advanced navigation tutorial coming soon.
                                    </p>
                                    <div class="flex items-center text-gray-500 font-semibold">
                                        <span>Coming Soon</span>
                                        <i class="fas fa-clock ml-2"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-xl">
                                <h3 class="text-lg font-bold mb-2 text-purple-800"><i class="fas fa-users mr-2"></i>Share Your Projects!</h3>
                                <p class="text-gray-700">
                                    Built something amazing with FLYQ Air? Share your projects, tutorials, and code with the community! 
                                    Join our WhatsApp group or post on the forum to inspire other makers.
                                </p>
                            </div>
                        </section>

                        <!-- Known Issues -->
                        <section id="limitations" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Known Issues & Limitations</h2>
                            
                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl mb-6">
                                <h3 class="text-lg font-bold mb-2 text-yellow-800"><i class="fas fa-info-circle mr-2"></i>Silkscreen Labeling (First Revision)</h3>
                                <p class="text-gray-700">
                                    <strong>Affected Pins:</strong> IO48 incorrectly labeled as IO42, CS/IO42 incorrectly labeled as IO47. 
                                    Refer to pinout diagram for correct pin identification. This has been corrected in latest hardware revision.
                                </p>
                            </div>

                            <div class="space-y-6">
                                <div class="border-l-4 border-gray-400 bg-gray-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-2 text-gray-800">Assisted Flight Features</h3>
                                    <p class="text-gray-700">
                                        Height hold, position hold, and altitude hold currently supported <strong>only with CFClient and Python SDK</strong>. 
                                        Mobile app support for these features coming in future firmware updates. Height hold with VL53L1X ToF sensor tested and working.
                                    </p>
                                </div>

                                <div class="border-l-4 border-gray-400 bg-gray-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-2 text-gray-800">Wi-Fi Range Limitations</h3>
                                    <p class="text-gray-700">
                                        2.4GHz Wi-Fi control range approximately 30-50 meters in open areas. Range significantly reduced by walls, interference, 
                                        or obstacles. Always maintain line of sight and stay within comfortable range.
                                    </p>
                                </div>

                                <div class="border-l-4 border-gray-400 bg-gray-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-2 text-gray-800">Wind Sensitivity</h3>
                                    <p class="text-gray-700">
                                        Due to light weight (~45g without battery), FLYQ Air is sensitive to wind. Recommended for indoor flight or 
                                        outdoor use only in calm conditions (wind speed under 5 mph / 8 km/h).
                                    </p>
                                </div>

                                <div class="border-l-4 border-gray-400 bg-gray-50 p-6 rounded-r-xl">
                                    <h3 class="text-xl font-bold mb-2 text-gray-800">Battery Discharge Requirements</h3>
                                    <p class="text-gray-700">
                                        Requires high-discharge battery (minimum 20C, 30C+ recommended). Low-discharge batteries will cause voltage drops 
                                        during flight, resulting in unexpected reboots or power loss. Always use quality batteries from reputable manufacturers.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <!-- Detailed Circuit Schematics -->
                        <section id="schematics" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Detailed Circuit Schematics</h2>
                            
                            <p class="text-lg text-gray-700 leading-relaxed mb-6">
                                All hardware design files including schematics and gerber files are open-source under CC license. 
                                Download from our <a href="https://github.com/passion3d/flyq-air" class="text-sky-600 hover:underline font-semibold">GitHub repository</a>.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">USB Input & Power Path</h3>
                            <p class="text-gray-700 mb-4">
                                USB Type-C port handles both charging and programming. Pull-down resistors on CC lines ensure compatibility 
                                with both USB-A and USB-C ports. Power path controller (P-Channel MOSFET + Schottky diode) automatically 
                                switches between USB and battery power.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Battery Charging Circuit</h3>
                            <p class="text-gray-700 mb-4">
                                <strong>TP4056</strong> charge controller IC manages LiPo battery charging with maximum 1A current. 
                                Charge current adjustable via programming resistor R5. Status outputs drive CHRG and FULL LED indicators.
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                                <li>CHRG LED: Lights when battery is charging</li>
                                <li>FULL LED: Lights when battery fully charged</li>
                                <li>Temperature monitoring option (not used by default)</li>
                            </ul>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Voltage Regulation</h3>
                            <p class="text-gray-700 mb-4">
                                <strong>SPX3819 LDO</strong> provides stable 3.3V with ultra-low noise for ESP32, IMU and peripherals. 
                                Capable of 500mA output with only 550mV dropout at full load. Enable pin controlled by slide switch for power control.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Battery Monitoring</h3>
                            <p class="text-gray-700 mb-4">
                                Voltage divider reduces battery voltage to safe ADC input level. ESP32 continuously monitors battery voltage 
                                to provide low battery warnings via ERR LED.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Programming Circuit</h3>
                            <p class="text-gray-700 mb-4">
                                <strong>CH340K USB-UART Bridge</strong> from WCH provides programming interface. Integrated crystal oscillator 
                                eliminates external components. Auto-reset circuit using 2N7002DW dual N-channel MOSFET enables automatic 
                                firmware flashing without manual button presses.
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                                <li>Hardware full duplex UART</li>
                                <li>Baud rates: 50bps to 2Mbps</li>
                                <li>Integrated TX/RX buffers</li>
                                <li>Manual reset/boot buttons available for debugging</li>
                            </ul>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Motor Driver Circuits</h3>
                            <p class="text-gray-700 mb-4">
                                Each of 4 motors controlled by identical circuit:
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                                <li><strong>IRLML6344 N-Channel MOSFET</strong> - Main switching element</li>
                                <li><strong>Flyback diode</strong> - Protects against motor back-EMF</li>
                                <li><strong>Pull-down resistor</strong> - Ensures MOSFET stays off when floating</li>
                                <li><strong>Bypass capacitors</strong> - Suppress voltage spikes and noise</li>
                                <li>PWM signals control motor speed via duty cycle modulation</li>
                            </ul>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">MPU6050 IMU Integration</h3>
                            <p class="text-gray-700 mb-4">
                                <strong>MPU6050</strong> 6-axis motion sensor provides critical flight stabilization:
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                                <li>3-axis gyroscope for angular velocity</li>
                                <li>3-axis accelerometer for orientation</li>
                                <li>I2C communication with ESP32</li>
                                <li>Sensor fusion algorithms in firmware</li>
                                <li>PID controller uses IMU data for motor speed adjustments</li>
                                <li>Proper calibration essential for stable flight</li>
                            </ul>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Status LED Circuits</h3>
                            <div class="overflow-x-auto mb-4">
                                <table class="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr class="bg-gray-100">
                                            <th class="border border-gray-300 px-4 py-2 text-left">LED</th>
                                            <th class="border border-gray-300 px-4 py-2 text-left">Color</th>
                                            <th class="border border-gray-300 px-4 py-2 text-left">Function</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">PWR</td>
                                            <td class="border border-gray-300 px-4 py-2">Green</td>
                                            <td class="border border-gray-300 px-4 py-2">Power indicator - ON when drone powered</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">CHRG</td>
                                            <td class="border border-gray-300 px-4 py-2">Red</td>
                                            <td class="border border-gray-300 px-4 py-2">Charging indicator - ON when battery charging</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">FULL</td>
                                            <td class="border border-gray-300 px-4 py-2">Blue</td>
                                            <td class="border border-gray-300 px-4 py-2">Full charge indicator</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">SYS</td>
                                            <td class="border border-gray-300 px-4 py-2">Green</td>
                                            <td class="border border-gray-300 px-4 py-2">Slow blink: calibration | Fast blink: ready to fly</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">LINK</td>
                                            <td class="border border-gray-300 px-4 py-2">Blue</td>
                                            <td class="border border-gray-300 px-4 py-2">Blinks when UDP connection established</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">ERR</td>
                                            <td class="border border-gray-300 px-4 py-2">Red</td>
                                            <td class="border border-gray-300 px-4 py-2">Low battery warning and system errors</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Expansion Connectors</h3>
                            <p class="text-gray-700 mb-4">
                                Four expansion connectors provide 24 pins total:
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                                <li>Power: VBUS, +3.3V, GND</li>
                                <li>Communication: UART, I2C, Auxiliary I2C, SPI</li>
                                <li>GPIO: 11 additional general purpose I/O pins</li>
                                <li>Audio: 2-pin connector for optional piezo buzzer</li>
                            </ul>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">SMD Solder Pads</h3>
                            <p class="text-gray-700 mb-4">
                                Bottom side features SMD solder pads for optional sensors:
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>PMW3901 optical flow sensor (SPI interface)</li>
                                <li>MS5611 altitude sensor (I2C interface)</li>
                                <li>VL53L1X ToF sensor (Auxiliary I2C)</li>
                                <li>Note: Battery may need top mounting when using bottom sensors</li>
                            </ul>
                        </section>

                        <!-- GPIO Pinout Details -->
                        <section id="pinout" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Complete GPIO Pinout</h2>
                            
                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl mb-6">
                                <p class="text-gray-700"><i class="fas fa-exclamation-triangle mr-2 text-yellow-600"></i>
                                <strong>Silkscreen Labeling Correction (First Revision):</strong></p>
                                <ul class="list-disc list-inside ml-4 mt-2 text-gray-700">
                                    <li>IO48 incorrectly marked as IO42</li>
                                    <li>CS/IO42 incorrectly marked as IO47</li>
                                    <li>Refer to this documentation for correct pin functions</li>
                                </ul>
                            </div>

                            <div class="overflow-x-auto">
                                <table class="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr class="bg-sky-100">
                                            <th class="border border-gray-300 px-4 py-2 text-left">Pin Name</th>
                                            <th class="border border-gray-300 px-4 py-2 text-left">GPIO</th>
                                            <th class="border border-gray-300 px-4 py-2 text-left">Function</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-gray-50">
                                            <td colspan="3" class="border border-gray-300 px-4 py-2 font-bold">General Purpose GPIO</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO15</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO15</td>
                                            <td class="border border-gray-300 px-4 py-2">ESP32-S3 GPIO15</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO16</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO16</td>
                                            <td class="border border-gray-300 px-4 py-2">ESP32-S3 GPIO16</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO17</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO17</td>
                                            <td class="border border-gray-300 px-4 py-2">ESP32-S3 GPIO17</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO18</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO18</td>
                                            <td class="border border-gray-300 px-4 py-2">ESP32-S3 GPIO18</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO19</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO19</td>
                                            <td class="border border-gray-300 px-4 py-2">ESP32-S3 GPIO19</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO20</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO20</td>
                                            <td class="border border-gray-300 px-4 py-2">ESP32-S3 GPIO20</td>
                                        </tr>
                                        <tr class="bg-gray-50">
                                            <td colspan="3" class="border border-gray-300 px-4 py-2 font-bold">UART Interface</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO1</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO1</td>
                                            <td class="border border-gray-300 px-4 py-2">ESP32-S3 GPIO1</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">TX</td>
                                            <td class="border border-gray-300 px-4 py-2">TXD0</td>
                                            <td class="border border-gray-300 px-4 py-2">UART0 TX Pin</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">RX</td>
                                            <td class="border border-gray-300 px-4 py-2">RXD0</td>
                                            <td class="border border-gray-300 px-4 py-2">UART0 RX Pin</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO48</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO48</td>
                                            <td class="border border-gray-300 px-4 py-2">ESP32-S3 GPIO48 (marked as IO42 on first rev)</td>
                                        </tr>
                                        <tr class="bg-gray-50">
                                            <td colspan="3" class="border border-gray-300 px-4 py-2 font-bold">I2C Interface</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">SCL</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO10</td>
                                            <td class="border border-gray-300 px-4 py-2">I2C0 Clock (MPU6050)</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">SDA</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO11</td>
                                            <td class="border border-gray-300 px-4 py-2">I2C0 Data (MPU6050)</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">SCL1</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO41</td>
                                            <td class="border border-gray-300 px-4 py-2">Auxiliary I2C Clock (VL53L1X ToF)</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">SDA1</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO40</td>
                                            <td class="border border-gray-300 px-4 py-2">Auxiliary I2C Data (VL53L1X ToF)</td>
                                        </tr>
                                        <tr class="bg-gray-50">
                                            <td colspan="3" class="border border-gray-300 px-4 py-2 font-bold">SPI Interface</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">MISO</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO37</td>
                                            <td class="border border-gray-300 px-4 py-2">SPI MISO (PMW3901 Optical Flow)</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">CLK</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO36</td>
                                            <td class="border border-gray-300 px-4 py-2">SPI Clock (PMW3901 Optical Flow)</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">MOSI</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO35</td>
                                            <td class="border border-gray-300 px-4 py-2">SPI MOSI (PMW3901 Optical Flow)</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">CS</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO42</td>
                                            <td class="border border-gray-300 px-4 py-2">SPI Chip Select (marked as IO47 on first rev)</td>
                                        </tr>
                                        <tr class="bg-gray-50">
                                            <td colspan="3" class="border border-gray-300 px-4 py-2 font-bold">Audio & Miscellaneous</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO39</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO39</td>
                                            <td class="border border-gray-300 px-4 py-2">Buzzer + (Piezo buzzer positive)</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO38</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO38</td>
                                            <td class="border border-gray-300 px-4 py-2">Buzzer - (Piezo buzzer negative)</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">IO13</td>
                                            <td class="border border-gray-300 px-4 py-2">GPIO13</td>
                                            <td class="border border-gray-300 px-4 py-2">ESP32-S3 GPIO13</td>
                                        </tr>
                                        <tr class="bg-gray-50">
                                            <td colspan="3" class="border border-gray-300 px-4 py-2 font-bold">Power Pins</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">3V3</td>
                                            <td class="border border-gray-300 px-4 py-2">-</td>
                                            <td class="border border-gray-300 px-4 py-2">3.3V Output</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">GND</td>
                                            <td class="border border-gray-300 px-4 py-2">-</td>
                                            <td class="border border-gray-300 px-4 py-2">Ground Connection</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2">VBUS</td>
                                            <td class="border border-gray-300 px-4 py-2">-</td>
                                            <td class="border border-gray-300 px-4 py-2">USB 5V Connection</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <!-- Firmware Details -->
                        <section id="firmware" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Firmware Architecture</h2>
                            
                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Based on ESP-Drone & Crazyflie</h3>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                FLYQ Air firmware built on <strong>ESP-IDF</strong> (Espressif IoT Development Framework) and 
                                <strong>ESP-Drone</strong> open-source project, which integrates Crazyflie flight control algorithms.
                            </p>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Core Components</h3>
                            <div class="grid md:grid-cols-2 gap-6 mb-6">
                                <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl">
                                    <h4 class="text-xl font-bold mb-3 text-blue-700">Flight Control Core</h4>
                                    <ul class="list-disc list-inside space-y-2 text-gray-700">
                                        <li>Sensor data processing</li>
                                        <li>PID-based stabilization</li>
                                        <li>Motor control algorithms</li>
                                        <li>Attitude estimation</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl">
                                    <h4 class="text-xl font-bold mb-3 text-green-700">Hardware Drivers</h4>
                                    <ul class="list-disc list-inside space-y-2 text-gray-700">
                                        <li>I2C, SPI, UART interfaces</li>
                                        <li>IMU sensor drivers</li>
                                        <li>Motor PWM control</li>
                                        <li>Peripheral management</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-xl">
                                    <h4 class="text-xl font-bold mb-3 text-purple-700">Communication Modules</h4>
                                    <ul class="list-disc list-inside space-y-2 text-gray-700">
                                        <li>CRTP over UDP protocol</li>
                                        <li>Wi-Fi AP mode</li>
                                        <li>Telemetry data streaming</li>
                                        <li>Remote control interface</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl">
                                    <h4 class="text-xl font-bold mb-3 text-yellow-700">DSP Libraries</h4>
                                    <ul class="list-disc list-inside space-y-2 text-gray-700">
                                        <li>Signal filtering</li>
                                        <li>Sensor fusion algorithms</li>
                                        <li>Real-time data processing</li>
                                        <li>ESP-IDF components</li>
                                    </ul>
                                </div>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Firmware Features</h3>
                            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-6">
                                <li>FreeRTOS multitasking for real-time operation</li>
                                <li>Built-in Wi-Fi and Bluetooth support</li>
                                <li>PID tuning for stable flight control</li>
                                <li>Sensor calibration on startup</li>
                                <li>Low battery monitoring and warnings</li>
                                <li>Crazyflie cfclient and cflib compatibility</li>
                                <li>Future support for autonomous modes (height-hold, position-hold)</li>
                            </ul>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700 mt-8">Flashing Firmware</h3>
                            <div class="bg-gray-50 border-2 border-gray-300 p-6 rounded-xl mb-4">
                                <h4 class="font-bold text-lg mb-3">Using ESP-IDF:</h4>
                                <code class="block bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                    git clone https://github.com/passion3d/flyq-air-firmware<br>
                                    cd flyq-air-firmware<br>
                                    idf.py build<br>
                                    idf.py -p /dev/ttyUSB0 flash monitor
                                </code>
                            </div>

                            <div class="bg-gray-50 border-2 border-gray-300 p-6 rounded-xl">
                                <h4 class="font-bold text-lg mb-3">Using Pre-built Binaries:</h4>
                                <p class="text-gray-700 mb-3">Download firmware binaries from GitHub releases and flash using esptool:</p>
                                <code class="block bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
                                    esptool.py --chip esp32s3 --port /dev/ttyUSB0 write_flash 0x0 flyq-air-firmware.bin
                                </code>
                            </div>
                        </section>

                        <!-- Battery Guide -->
                        <section id="battery" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Battery Selection & Safety</h2>
                            
                            <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mb-6">
                                <h3 class="text-xl font-bold mb-3 text-red-700"><i class="fas fa-exclamation-triangle mr-2"></i>LiPo Battery Safety</h3>
                                <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Never leave charging batteries unattended</li>
                                    <li>Never charge damaged or swollen batteries</li>
                                    <li>Store in LiPo safe bag when not in use</li>
                                    <li>Dispose of damaged batteries properly at recycling centers</li>
                                    <li>Never over-discharge below 3.0V</li>
                                </ul>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Recommended Battery Specifications</h3>
                            <div class="overflow-x-auto mb-6">
                                <table class="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr class="bg-sky-100">
                                            <th class="border border-gray-300 px-4 py-2 text-left">Parameter</th>
                                            <th class="border border-gray-300 px-4 py-2 text-left">Specification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2 font-bold">Type</td>
                                            <td class="border border-gray-300 px-4 py-2">1S LiPo (Lithium Polymer)</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2 font-bold">Voltage</td>
                                            <td class="border border-gray-300 px-4 py-2">3.7V nominal (3.0V-4.2V range)</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2 font-bold">Capacity</td>
                                            <td class="border border-gray-300 px-4 py-2">500-750mAh recommended</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2 font-bold">Discharge Rate</td>
                                            <td class="border border-gray-300 px-4 py-2"><strong>20C minimum, 30C+ recommended</strong></td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2 font-bold">Connector</td>
                                            <td class="border border-gray-300 px-4 py-2">JST-PH 2.0mm or compatible</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-gray-300 px-4 py-2 font-bold">Flight Time</td>
                                            <td class="border border-gray-300 px-4 py-2">4-7 minutes (depending on capacity and flying style)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 class="text-2xl font-bold mb-4 text-gray-700">Why Discharge Rate Matters</h3>
                            <p class="text-lg text-gray-700 leading-relaxed mb-4">
                                Discharge rate (C rating) determines maximum current battery can safely deliver. 
                                <strong>Low discharge batteries cause voltage sag during motor spin-up, leading to reboots.</strong>
                            </p>
                            <div class="bg-green-50 border-2 border-green-500 p-6 rounded-xl">
                                <h4 class="font-bold text-lg mb-2 text-green-700">Recommended Battery Example:</h4>
                                <p class="text-gray-700">650mAh 30C LiPo = 19.5A maximum discharge (650mAh × 30C)</p>
                                <p class="text-gray-700 mt-2">This provides sufficient current for aggressive maneuvers without voltage drop.</p>
                            </div>
                        </section>

                        <!-- Known Issues -->
                        <section id="limitations" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Known Issues & Limitations</h2>
                            
                            <div class="space-y-6">
                                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl">
                                    <h3 class="text-xl font-bold mb-2 text-yellow-800">Silkscreen Pin Labeling (First Revision)</h3>
                                    <p class="text-gray-700 mb-2">
                                        First revision PCBs have incorrect silkscreen markings for some GPIO pins:
                                    </p>
                                    <ul class="list-disc list-inside text-gray-700 ml-4">
                                        <li>IO48 incorrectly marked as IO42</li>
                                        <li>CS/IO42 incorrectly marked as IO47</li>
                                        <li><strong>Solution:</strong> Refer to pinout diagram in this documentation</li>
                                    </ul>
                                </div>

                                <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl">
                                    <h3 class="text-xl font-bold mb-2 text-blue-800">Assisted Flight Modes (In Development)</h3>
                                    <p class="text-gray-700 mb-2">
                                        Height-hold, position-hold, and altitude-hold features require optional sensor modules:
                                    </p>
                                    <ul class="list-disc list-inside text-gray-700 ml-4">
                                        <li>Height-hold working with VL53L1X ToF sensor</li>
                                        <li>Position-hold and altitude-hold support coming in future firmware</li>
                                        <li>Currently supported only via CFClient and Python SDK (not mobile app)</li>
                                    </ul>
                                </div>

                                <div class="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-xl">
                                    <h3 class="text-xl font-bold mb-2 text-purple-800">Wi-Fi Connection Requirements</h3>
                                    <p class="text-gray-700 mb-2">
                                        Some smartphones automatically disconnect from Wi-Fi networks without internet:
                                    </p>
                                    <ul class="list-disc list-inside text-gray-700 ml-4">
                                        <li>Disable "Switch to mobile data" or "Auto network switch" feature</li>
                                        <li>Turn off VPN before connecting</li>
                                        <li>Keep mobile data off during flight</li>
                                    </ul>
                                </div>

                                <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
                                    <h3 class="text-xl font-bold mb-2 text-red-800">Flight Time & Payload</h3>
                                    <ul class="list-disc list-inside text-gray-700 ml-4">
                                        <li>Flight time: 4-7 minutes depending on battery and flying style</li>
                                        <li>Max payload: ~25g with 55mm propellers</li>
                                        <li>Aggressive flying reduces flight time significantly</li>
                                        <li>Additional sensors reduce available payload capacity</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <!-- Resources -->
                        <section id="resources" class="mb-12">
                            <h2 class="text-4xl font-black mb-6 text-gray-800 border-b-4 border-sky-500 pb-2">Resources & Support</h2>
                            
                            <div class="grid md:grid-cols-2 gap-6">
                                <a href="https://github.com/passion3d/flyq-air" target="_blank" class="block p-6 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition">
                                    <i class="fab fa-github text-4xl mb-3"></i>
                                    <h3 class="text-xl font-bold mb-2">GitHub Repository</h3>
                                    <p class="text-gray-300">Firmware, hardware files, and documentation</p>
                                </a>
                                
                                <a href="https://passion3dworld.com" target="_blank" class="block p-6 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-xl hover:shadow-xl transition">
                                    <i class="fas fa-store text-4xl mb-3"></i>
                                    <h3 class="text-xl font-bold mb-2">Official Store</h3>
                                    <p class="text-gray-100">Purchase FLYQ Air and accessories</p>
                                </a>
                                
                                <a href="#" class="block p-6 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
                                    <i class="fab fa-whatsapp text-4xl mb-3"></i>
                                    <h3 class="text-xl font-bold mb-2">WhatsApp Community</h3>
                                    <p class="text-gray-100">Join our maker community</p>
                                </a>
                                
                                <a href="/" class="block p-6 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition">
                                    <i class="fas fa-home text-4xl mb-3"></i>
                                    <h3 class="text-xl font-bold mb-2">Main Website</h3>
                                    <p class="text-gray-100">Back to FLYQ Air homepage</p>
                                </a>
                            </div>

                            <div class="mt-8 p-6 bg-sky-50 rounded-xl border-2 border-sky-200">
                                <h3 class="text-xl font-bold mb-3 text-sky-800">
                                    <i class="fas fa-envelope mr-2"></i>Need Help?
                                </h3>
                                <p class="text-gray-700 mb-2">For technical support and custom inquiries:</p>
                                <p class="text-gray-700">Contact: <a href="mailto:support@passion3dworld.com" class="text-sky-600 hover:underline">support@passion3dworld.com</a></p>
                            </div>
                        </section>

                        <!-- Footer -->
                        <div class="mt-12 pt-8 border-t-2 border-gray-200 text-center">
                            <p class="text-gray-600">
                                &copy; 2025 Passion 3D World. All rights reserved. | 
                                <span class="text-sky-600 font-semibold">100% Open Source Hardware</span> | 
                                CC Licensed
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>

        <script>
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        </script>
    </body>
    </html>
  `)
})

export default app
