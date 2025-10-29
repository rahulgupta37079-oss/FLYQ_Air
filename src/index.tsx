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
        <title>FLYQ - The Programmable Drone</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Inter:wght@300;400;600;700;800&display=swap');
            
            :root {
                --dark-blue: #0A1F44;
                --electric-blue: #3B82F6;
                --light-blue: #60A5FA;
                --black: #000000;
                --white: #FFFFFF;
                --dark-gray: #0f172a;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
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
                background: linear-gradient(135deg, #000000 0%, #0A1F44 50%, #000000 100%);
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
                    radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
                pointer-events: none;
            }
            
            .blue-glow {
                text-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4);
            }
            
            .card-hover {
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border: 2px solid rgba(59, 130, 246, 0.3);
            }
            
            .card-hover:hover {
                transform: translateY(-12px) scale(1.02);
                box-shadow: 0 25px 50px rgba(59, 130, 246, 0.4);
                border-color: rgba(59, 130, 246, 0.8);
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
                    transform: translateY(0px) rotate(0deg);
                }
                50% {
                    transform: translateY(-30px) rotate(3deg);
                }
            }
            
            .diagonal-split {
                clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
            }
            
            .btn-glow {
                box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
                transition: all 0.3s ease;
            }
            
            .btn-glow:hover {
                box-shadow: 0 0 40px rgba(59, 130, 246, 0.9), 0 0 60px rgba(59, 130, 246, 0.5);
                transform: scale(1.05);
            }
            
            .section-title {
                position: relative;
                display: inline-block;
            }
            
            .section-title::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 120px;
                height: 4px;
                background: linear-gradient(90deg, transparent, #3B82F6, transparent);
            }
            
            .scroll-reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            .scroll-reveal.active {
                opacity: 1;
                transform: translateY(0);
            }
            
            .gradient-text {
                background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        </style>
    </head>
    <body class="bg-black text-white">
        <!-- Navigation -->
        <nav class="fixed w-full z-50 bg-black bg-opacity-95 backdrop-blur-md border-b border-blue-500 shadow-lg" style="box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);">
            <div class="container mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-drone text-blue-500 text-3xl pulse-blue"></i>
                        <span class="text-3xl font-black gradient-text" style="font-family: 'Rajdhani', sans-serif;">FLYQ</span>
                    </div>
                    <div class="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wider">
                        <a href="#features" class="text-gray-300 hover:text-blue-500 transition-colors">Features</a>
                        <a href="#specs" class="text-gray-300 hover:text-blue-500 transition-colors">Specs</a>
                        <a href="#programmable" class="text-gray-300 hover:text-blue-500 transition-colors">Programming</a>
                        <a href="#buy" class="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all">Buy Now</a>
                    </div>
                    <button id="mobileMenuBtn" class="md:hidden text-blue-500 text-2xl">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <!-- Mobile Menu -->
                <div id="mobileMenu" class="hidden md:hidden mt-6 space-y-4 pb-4">
                    <a href="#features" class="block text-gray-300 hover:text-blue-500 transition-colors text-center py-2">Features</a>
                    <a href="#specs" class="block text-gray-300 hover:text-blue-500 transition-colors text-center py-2">Specs</a>
                    <a href="#programmable" class="block text-gray-300 hover:text-blue-500 transition-colors text-center py-2">Programming</a>
                    <a href="#buy" class="block bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all text-center">Buy Now</a>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero-gradient diagonal-split pt-32 pb-48 px-6 relative overflow-hidden">
            <div class="container mx-auto relative z-10">
                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <div class="text-center lg:text-left">
                        <div class="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-black mb-8 animate-bounce">
                            <i class="fas fa-code mr-2"></i>FULLY PROGRAMMABLE
                        </div>
                        <h1 class="text-8xl lg:text-9xl font-black mb-6 blue-glow leading-tight" style="font-family: 'Rajdhani', sans-serif;">
                            FLYQ
                        </h1>
                        <p class="text-3xl lg:text-4xl text-blue-400 mb-6 font-bold">
                            The Programmable Drone
                        </p>
                        <p class="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                            Unleash your creativity with the ESP32-S3 powered open-source drone. 
                            Perfect for makers, developers, and educators. <span class="text-blue-400 font-bold">Code it. Fly it. Master it.</span>
                        </p>
                        <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                            <a href="#buy" class="bg-blue-500 text-white px-10 py-5 rounded-xl font-black text-lg btn-glow inline-flex items-center justify-center">
                                <i class="fas fa-shopping-cart mr-3"></i>
                                Order Now
                            </a>
                            <a href="#features" class="border-3 border-blue-500 text-blue-400 px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-500 hover:text-white transition-all inline-flex items-center justify-center">
                                <i class="fas fa-play-circle mr-3"></i>
                                Explore
                            </a>
                        </div>
                        
                        <!-- Stats -->
                        <div class="mt-12 grid grid-cols-3 gap-6 max-w-xl">
                            <div class="text-center">
                                <div class="text-4xl font-black text-blue-400 mb-2">100%</div>
                                <div class="text-xs text-gray-400 uppercase tracking-wide">Open Source</div>
                            </div>
                            <div class="text-center border-l border-r border-blue-500">
                                <div class="text-4xl font-black text-blue-400 mb-2">Wi-Fi</div>
                                <div class="text-xs text-gray-400 uppercase tracking-wide">App Control</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-black text-blue-400 mb-2">45g</div>
                                <div class="text-xs text-gray-400 uppercase tracking-wide">Ultra Light</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Hero Image -->
                    <div class="relative">
                        <div class="absolute inset-0 bg-blue-500 opacity-30 blur-3xl rounded-full scale-75"></div>
                        <div class="relative z-10 float-animation">
                            <img src="https://circuitdigest.com/sites/default/files/Litewing%20Wiki%20Banner-01.png" 
                                 alt="FLYQ Drone" 
                                 class="w-full drop-shadow-2xl">
                        </div>
                        <!-- Floating Elements -->
                        <div class="absolute top-10 right-10 w-20 h-20 border-4 border-blue-500 rounded-full animate-ping opacity-20"></div>
                        <div class="absolute bottom-10 left-10 w-16 h-16 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-24 px-6 bg-white text-black relative">
            <div class="container mx-auto">
                <div class="text-center mb-20">
                    <h2 class="text-6xl font-black mb-6 section-title">
                        Why <span class="gradient-text">FLYQ?</span>
                    </h2>
                    <p class="text-2xl text-gray-600 max-w-3xl mx-auto">The ultimate platform for innovation, learning, and limitless creativity</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Feature Cards -->
                    <div class="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl card-hover scroll-reveal">
                        <div class="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 rotate-3">
                            <i class="fas fa-microchip text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4">ESP32-S3 Beast</h3>
                        <p class="text-gray-300 leading-relaxed">Dual-core 240MHz powerhouse with built-in Wi-Fi & Bluetooth. Program in ESP-IDF, Arduino, or Python.</p>
                    </div>
                    
                    <div class="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl card-hover scroll-reveal">
                        <div class="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 -rotate-3">
                            <i class="fas fa-code-branch text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4">100% Open Source</h3>
                        <p class="text-gray-300 leading-relaxed">Full hardware & firmware access. Modify, extend, customize. GitHub repo with schematics & code included.</p>
                    </div>
                    
                    <div class="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl card-hover scroll-reveal">
                        <div class="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 rotate-6">
                            <i class="fas fa-wifi text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4">Wi-Fi Control</h3>
                        <p class="text-gray-300 leading-relaxed">Control via smartphone (Android/iOS) or PC. No expensive proprietary transmitter required!</p>
                    </div>
                    
                    <div class="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl card-hover scroll-reveal">
                        <div class="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 -rotate-6">
                            <i class="fas fa-plug text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4">Infinitely Expandable</h3>
                        <p class="text-gray-300 leading-relaxed">24-pin GPIO breakout. Add ToF sensors, barometers, optical flow for autonomous flight modes.</p>
                    </div>
                    
                    <div class="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl card-hover scroll-reveal">
                        <div class="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 rotate-3">
                            <i class="fas fa-tools text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4">Beginner Friendly</h3>
                        <p class="text-gray-300 leading-relaxed">All-in-one PCB frame. No 3D printing. Minimal soldering. Perfect for first-time builders!</p>
                    </div>
                    
                    <div class="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl card-hover scroll-reveal">
                        <div class="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 -rotate-3">
                            <i class="fas fa-tags text-white text-3xl"></i>
                        </div>
                        <h3 class="text-3xl font-black mb-4">Unbeatable Value</h3>
                        <p class="text-gray-300 leading-relaxed">Premium features at an affordable price. No compromise on quality or functionality.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Video Section -->
        <section class="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
            <div class="container mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6 section-title">
                        See It In <span class="text-blue-400">Flight</span>
                    </h2>
                    <p class="text-xl text-gray-400">Watch FLYQ in action</p>
                </div>
                <div class="max-w-5xl mx-auto">
                    <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-500" style="padding-bottom: 56.25%; box-shadow: 0 0 40px rgba(59, 130, 246, 0.3);">
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
                    <h2 class="text-6xl font-black mb-6 section-title">
                        <span class="text-blue-400">Code</span> Your Way
                    </h2>
                    <p class="text-2xl text-gray-400">Multiple languages, infinite possibilities</p>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h3 class="text-4xl font-black mb-8 text-blue-400">
                            <i class="fas fa-laptop-code mr-4"></i>Programming Freedom
                        </h3>
                        <div class="space-y-6">
                            <div class="flex items-start space-x-5 bg-gray-900 p-6 rounded-2xl border-l-4 border-blue-500">
                                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-white font-bold"></i>
                                </div>
                                <div>
                                    <h4 class="text-2xl font-bold mb-2">ESP-IDF Native</h4>
                                    <p class="text-gray-400">Full power of Espressif's IoT Development Framework</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-5 bg-gray-900 p-6 rounded-2xl border-l-4 border-blue-500">
                                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-white font-bold"></i>
                                </div>
                                <div>
                                    <h4 class="text-2xl font-bold mb-2">Arduino IDE</h4>
                                    <p class="text-gray-400">Beginner-friendly with thousands of libraries</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-5 bg-gray-900 p-6 rounded-2xl border-l-4 border-blue-500">
                                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-white font-bold"></i>
                                </div>
                                <div>
                                    <h4 class="text-2xl font-bold mb-2">Python SDK</h4>
                                    <p class="text-gray-400">Script autonomous missions & AI experiments</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-5 bg-gray-900 p-6 rounded-2xl border-l-4 border-blue-500">
                                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-check text-white font-bold"></i>
                                </div>
                                <div>
                                    <h4 class="text-2xl font-bold mb-2">Crazyflie Compatible</h4>
                                    <p class="text-gray-400">Works with existing Crazyflie ecosystem</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-900 p-8 rounded-3xl border-4 border-blue-500 shadow-2xl" style="box-shadow: 0 0 40px rgba(59, 130, 246, 0.3);">
                        <div class="flex items-center space-x-3 mb-6">
                            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span class="text-gray-400 text-sm ml-4">Arduino Example</span>
                        </div>
                        <pre class="text-green-400 text-sm overflow-x-auto leading-relaxed"><code>// FLYQ - Custom Flight Pattern
#include "FLYQ.h"

FLYQ drone;

void setup() {
  drone.init();
  drone.calibrate();
  Serial.println("FLYQ Ready!");
}

void loop() {
  // Autonomous square pattern
  drone.takeoff(1.5); // 1.5m height
  delay(3000);
  
  // Execute square
  drone.forward(0.8);
  drone.right(0.8);
  drone.backward(0.8);
  drone.left(0.8);
  
  // Safe landing
  drone.land();
  delay(5000);
}</code></pre>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-3 gap-10">
                    <div class="text-center bg-gray-900 p-10 rounded-3xl border-2 border-blue-500">
                        <div class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-graduation-cap text-white text-4xl"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4">STEM Education</h4>
                        <p class="text-gray-400">Perfect for schools, universities & robotics courses</p>
                    </div>
                    
                    <div class="text-center bg-gray-900 p-10 rounded-3xl border-2 border-blue-500">
                        <div class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-robot text-white text-4xl"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4">AI & Vision</h4>
                        <p class="text-gray-400">Add cameras for computer vision & ML projects</p>
                    </div>
                    
                    <div class="text-center bg-gray-900 p-10 rounded-3xl border-2 border-blue-500">
                        <div class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-network-wired text-white text-4xl"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-4">IoT Integration</h4>
                        <p class="text-gray-400">Connect to cloud services & build swarms</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Specifications -->
        <section id="specs" class="py-24 px-6 bg-white text-black">
            <div class="container mx-auto">
                <div class="text-center mb-20">
                    <h2 class="text-6xl font-black mb-6 section-title">
                        Technical <span class="gradient-text">Specs</span>
                    </h2>
                    <p class="text-2xl text-gray-600">Engineering excellence in every detail</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    <div class="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl border-4 border-blue-500">
                        <h3 class="text-3xl font-black mb-8 text-blue-400 flex items-center">
                            <i class="fas fa-microchip mr-4"></i>Core Hardware
                        </h3>
                        <div class="space-y-4">
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="text-gray-400 font-semibold">Microcontroller</span>
                                <span class="font-bold">ESP32-S3</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="text-gray-400 font-semibold">Processor</span>
                                <span class="font-bold">Dual Xtensa LX7 @ 240MHz</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="text-gray-400 font-semibold">Memory</span>
                                <span class="font-bold">512 KB SRAM</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="text-gray-400 font-semibold">IMU Sensor</span>
                                <span class="font-bold">MPU6050 6-Axis</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="text-gray-400 font-semibold">Connectivity</span>
                                <span class="font-bold">Wi-Fi 2.4GHz + BLE</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-400 font-semibold">Interface</span>
                                <span class="font-bold">USB Type-C</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl border-4 border-blue-500">
                        <h3 class="text-3xl font-black mb-8 text-blue-400 flex items-center">
                            <i class="fas fa-cog mr-4"></i>Physical
                        </h3>
                        <div class="space-y-4">
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="text-gray-400 font-semibold">Motors</span>
                                <span class="font-bold">720 Coreless DC (×4)</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="text-gray-400 font-semibold">Propellers</span>
                                <span class="font-bold">55mm / 65mm</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="text-gray-400 font-semibold">Battery</span>
                                <span class="font-bold">1S LiPo 3.7V</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="text-gray-400 font-semibold">Weight</span>
                                <span class="font-bold">~45g (no battery)</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-700 pb-3">
                                <span class="text-gray-400 font-semibold">Dimensions</span>
                                <span class="font-bold">100mm × 100mm</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-400 font-semibold">Payload</span>
                                <span class="font-bold">~25g</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl border-4 border-blue-500">
                        <h3 class="text-3xl font-black mb-8 text-blue-400 flex items-center">
                            <i class="fas fa-puzzle-piece mr-4"></i>Expansion
                        </h3>
                        <div class="space-y-4">
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-blue-400 mt-1 text-xl"></i>
                                <span class="text-lg">VL53L1X ToF (Height Hold)</span>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-blue-400 mt-1 text-xl"></i>
                                <span class="text-lg">MS5611 Barometer (Altitude)</span>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-blue-400 mt-1 text-xl"></i>
                                <span class="text-lg">PMW3901 Optical Flow</span>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-blue-400 mt-1 text-xl"></i>
                                <span class="text-lg">24-Pin GPIO Breakout</span>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-blue-400 mt-1 text-xl"></i>
                                <span class="text-lg">I2C, SPI, UART Support</span>
                            </div>
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-check text-blue-400 mt-1 text-xl"></i>
                                <span class="text-lg">Buzzer Connector</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl border-4 border-blue-500">
                        <h3 class="text-3xl font-black mb-8 text-blue-400 flex items-center">
                            <i class="fas fa-lightbulb mr-4"></i>Indicators
                        </h3>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                                <span class="text-lg"><b>PWR</b> - Power Status</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                                <span class="text-lg"><b>CHRG</b> - Charging</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <span class="text-lg"><b>FULL</b> - Battery Full</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                <span class="text-lg"><b>SYS</b> - Ready Status</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-cyan-500 rounded-full"></div>
                                <span class="text-lg"><b>LINK</b> - Wi-Fi Connected</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-4 h-4 bg-orange-500 rounded-full"></div>
                                <span class="text-lg"><b>ERR</b> - Error/Low Battery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Gallery -->
        <section class="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
            <div class="container mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-6xl font-black mb-6 section-title">
                        <span class="text-blue-400">Gallery</span>
                    </h2>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="overflow-hidden rounded-3xl border-4 border-blue-500" style="box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);">
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-PCB-Closeup-and-Starp-Hole.png" 
                             alt="PCB Design" 
                             class="w-full h-80 object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="overflow-hidden rounded-3xl border-4 border-blue-500" style="box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);">
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/ESP32-S3-Module.png" 
                             alt="ESP32-S3 Module" 
                             class="w-full h-80 object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="overflow-hidden rounded-3xl border-4 border-blue-500" style="box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);">
                        <img src="https://circuitdigest.com/sites/default/files/inlineimages/u5/LiteWing-MPU6050-Close-Up.png" 
                             alt="MPU6050 Sensor" 
                             class="w-full h-80 object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA / Buy Section -->
        <section id="buy" class="py-24 px-6 bg-black relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            </div>
            
            <div class="container mx-auto text-center relative z-10">
                <h2 class="text-6xl md:text-7xl font-black mb-8 blue-glow">
                    Start Your Journey Today
                </h2>
                <p class="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
                    Join thousands of makers, developers, and educators building the future with 
                    <span class="text-blue-400 font-bold">FLYQ</span>. 
                    Your programmable drone adventure starts here.
                </p>
                
                <!-- Main Store CTA -->
                <div class="max-w-2xl mx-auto mb-16">
                    <a href="https://passion3dworld.com" target="_blank" 
                       class="block bg-blue-500 text-white p-12 rounded-3xl hover:bg-blue-600 transition-all transform hover:scale-105 border-4 border-blue-500 btn-glow">
                        <i class="fas fa-store text-6xl mb-6"></i>
                        <h3 class="text-4xl font-black mb-4">Passion 3D World</h3>
                        <p class="text-xl font-semibold mb-4">Official Authorized Dealer</p>
                        <div class="inline-flex items-center bg-white text-blue-500 px-8 py-4 rounded-full font-black text-xl">
                            <span>Order Now</span>
                            <i class="fas fa-arrow-right ml-3"></i>
                        </div>
                    </a>
                </div>
                
                <!-- Community Section -->
                <div class="border-t border-gray-800 pt-16">
                    <h3 class="text-3xl font-black mb-10 text-blue-400">Join Our Community</h3>
                    <div class="flex flex-wrap justify-center gap-6">
                        <a href="https://circuitdigest.com/litewing" target="_blank" 
                           class="bg-gray-900 px-8 py-4 rounded-2xl hover:bg-blue-500 hover:text-white transition-all inline-flex items-center text-lg font-semibold border-2 border-blue-500">
                            <i class="fas fa-book mr-3"></i>
                            Documentation
                        </a>
                        <a href="https://github.com/Circuit-Digest/LiteWing" target="_blank" 
                           class="bg-gray-900 px-8 py-4 rounded-2xl hover:bg-blue-500 hover:text-white transition-all inline-flex items-center text-lg font-semibold border-2 border-blue-500">
                            <i class="fab fa-github mr-3"></i>
                            GitHub
                        </a>
                        <a href="#" 
                           class="bg-gray-900 px-8 py-4 rounded-2xl hover:bg-blue-500 hover:text-white transition-all inline-flex items-center text-lg font-semibold border-2 border-blue-500">
                            <i class="fab fa-whatsapp mr-3"></i>
                            Community
                        </a>
                        <a href="https://circuitdigest.com" target="_blank" 
                           class="bg-gray-900 px-8 py-4 rounded-2xl hover:bg-blue-500 hover:text-white transition-all inline-flex items-center text-lg font-semibold border-2 border-blue-500">
                            <i class="fas fa-comments mr-3"></i>
                            Forum
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-black border-t-4 border-blue-500 py-16 px-6" style="box-shadow: 0 -4px 20px rgba(59, 130, 246, 0.2);">
            <div class="container mx-auto">
                <div class="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div class="flex items-center space-x-3 mb-6">
                            <i class="fas fa-drone text-blue-500 text-3xl"></i>
                            <span class="text-2xl font-black gradient-text">FLYQ</span>
                        </div>
                        <p class="text-gray-400 leading-relaxed">The ultimate programmable drone platform for makers, developers, and innovators.</p>
                    </div>
                    
                    <div>
                        <h4 class="font-black mb-6 text-blue-400 text-lg">Product</h4>
                        <ul class="space-y-3 text-gray-400">
                            <li><a href="#features" class="hover:text-blue-400 transition">Features</a></li>
                            <li><a href="#specs" class="hover:text-blue-400 transition">Specifications</a></li>
                            <li><a href="#programmable" class="hover:text-blue-400 transition">Programming</a></li>
                            <li><a href="https://circuitdigest.com/litewing" class="hover:text-blue-400 transition">Documentation</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-black mb-6 text-blue-400 text-lg">Resources</h4>
                        <ul class="space-y-3 text-gray-400">
                            <li><a href="https://github.com/Circuit-Digest/LiteWing" class="hover:text-blue-400 transition">GitHub</a></li>
                            <li><a href="#" class="hover:text-blue-400 transition">Tutorials</a></li>
                            <li><a href="#" class="hover:text-blue-400 transition">Community</a></li>
                            <li><a href="https://circuitdigest.com" class="hover:text-blue-400 transition">Circuit Digest</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-black mb-6 text-blue-400 text-lg">Support</h4>
                        <ul class="space-y-3 text-gray-400">
                            <li><a href="#" class="hover:text-blue-400 transition">Contact Us</a></li>
                            <li><a href="#" class="hover:text-blue-400 transition">FAQ</a></li>
                            <li><a href="https://passion3dworld.com" class="hover:text-blue-400 transition">Buy Now</a></li>
                            <li><a href="#" class="hover:text-blue-400 transition">Returns</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-8 text-center">
                    <p class="text-gray-400">
                        &copy; 2025 Circuit Digest. All rights reserved. | 
                        <span class="text-blue-400 font-semibold">100% Open Source Hardware</span> | 
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
            
            // Scroll reveal animation
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.scroll-reveal').forEach(el => {
                observer.observe(el);
            });
            
            // Parallax effect on hero
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero-gradient');
                if (hero && scrolled < 1000) {
                    hero.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
                }
            });
        </script>
    </body>
    </html>
  `)
})

export default app
