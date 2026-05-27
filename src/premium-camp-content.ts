// Premium Interactive Summer Camp Landing Page Content
// This will replace the existing summer camp page content

const premiumSummerCampContent = `
    <style>
        /* Premium Animations */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.5); }
            50% { box-shadow: 0 0 40px rgba(56, 189, 248, 0.8); }
        }
        
        @keyframes rotate-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        
        .animate-slide-in-left {
            animation: slideInLeft 1s ease-out forwards;
        }
        
        .animate-slide-in-right {
            animation: slideInRight 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .parallax-bg {
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
        }
        
        .glass-effect {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .premium-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
            background-size: 300% 300%;
            animation: gradient-shift 15s ease infinite;
        }
        
        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .card-hover {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover:hover {
            transform: translateY(-10px) scale(1.02);
        }
        
        .text-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .drone-pattern {
            background-image: 
                radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
        }
        
        /* Interactive Elements */
        .interactive-card {
            position: relative;
            overflow: hidden;
        }
        
        .interactive-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s;
        }
        
        .interactive-card:hover::before {
            left: 100%;
        }
        
        /* Premium Scroll Indicator */
        .scroll-indicator {
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    </style>

    <div class="bg-black relative overflow-hidden">
        
        <!-- Hero Section - Full Screen with Parallax -->
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
            <!-- Animated Background -->
            <div class="absolute inset-0 drone-pattern">
                <!-- Large Drone Image Background -->
                <div class="absolute inset-0 opacity-20">
                    <img src="https://www.genspark.ai/api/files/s/ytW7gCVk" 
                         class="w-full h-full object-cover animate-float"
                         style="filter: blur(8px);" />
                </div>
                
                <!-- Gradient Overlays -->
                <div class="absolute inset-0 bg-gradient-to-br from-black via-blue-950/50 to-purple-950/50"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            
            <!-- Floating Particles -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
                <div class="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-40" style="animation-delay: 1s;"></div>
                <div class="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-50" style="animation-delay: 2s;"></div>
                <div class="absolute top-1/3 right-1/4 w-4 h-4 bg-blue-500 rounded-full animate-float opacity-30" style="animation-delay: 1.5s;"></div>
            </div>
            
            <!-- Hero Content -->
            <div class="container mx-auto px-4 md:px-6 py-20 relative z-10">
                <div class="text-center max-w-6xl mx-auto">
                    
                    <!-- Premium Badge -->
                    <div class="inline-flex items-center gap-3 glass-effect px-6 py-3 rounded-full mb-8 animate-fade-in-up animate-pulse-glow">
                        <span class="relative flex h-3 w-3">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span class="text-white font-bold uppercase tracking-wider text-sm">
                            <i class="fas fa-fire mr-2 text-orange-400"></i>
                            Summer 2026 - Offline In-Person Camp - Registration Open
                        </span>
                    </div>
                    
                    <!-- Main Headline with Premium Typography -->
                    <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-none">
                        <span class="block text-white animate-slide-in-left mb-4">India's Most</span>
                        <span class="block premium-gradient bg-clip-text text-transparent animate-slide-in-right mb-4">
                            EXCITING
                        </span>
                        <span class="block text-white animate-slide-in-left">Drone Summer Camp</span>
                    </h1>
                    
                    <!-- Subheading with Premium Styling -->
                    <p class="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style="animation-delay: 0.3s;">
                        Learn, Build & Fly <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">Professional Drones</span>
                    </p>
                    
                    <p class="text-lg md:text-xl text-gray-400 mb-12 animate-fade-in-up" style="animation-delay: 0.5s;">
                        <i class="fas fa-map-marker-alt text-red-400 mr-2"></i>
                        <span class="font-bold text-white">Offline / In-Person Workshop</span> at Your City
                    </p>
                    
                    <!-- Trust Badges -->
                    <div class="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 animate-fade-in-up" style="animation-delay: 0.7s;">
                        <div class="glass-effect px-6 py-3 rounded-full">
                            <i class="fas fa-medal text-yellow-400 mr-2"></i>
                            <span class="text-white font-semibold">Trusted by Army</span>
                        </div>
                        <div class="glass-effect px-6 py-3 rounded-full">
                            <i class="fas fa-satellite text-blue-400 mr-2"></i>
                            <span class="text-white font-semibold">NCR ISRO Showcases</span>
                        </div>
                        <div class="glass-effect px-6 py-3 rounded-full">
                            <i class="fas fa-users text-green-400 mr-2"></i>
                            <span class="text-white font-semibold">Age 8+ Welcome</span>
                        </div>
                    </div>
                    
                    <!-- CTA Buttons with Premium Effects -->
                    <div class="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-16 animate-fade-in-up" style="animation-delay: 0.9s;">
                        <a href="#register" class="group relative px-10 py-5 text-lg md:text-xl font-bold rounded-full overflow-hidden">
                            <div class="absolute inset-0 premium-gradient"></div>
                            <div class="relative z-10 text-white flex items-center justify-center gap-3">
                                <i class="fas fa-rocket group-hover:translate-x-1 transition-transform"></i>
                                Register Now
                                <i class="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                            </div>
                        </a>
                        
                        <a href="#details" class="px-10 py-5 text-lg md:text-xl font-bold rounded-full glass-effect text-white hover:bg-white/10 transition-all duration-300 border-2 border-white/30 hover:border-white/60">
                            <i class="fas fa-info-circle mr-2"></i>
                            Explore Details
                        </a>
                        
                        <a href="tel:+919137361474" class="px-10 py-5 text-lg md:text-xl font-bold rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-105 transition-transform duration-300 shadow-2xl">
                            <i class="fas fa-phone-alt mr-2"></i>
                            Call Now
                        </a>
                    </div>
                    
                    <!-- Key Features Cards -->
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
                        ${[
                            { icon: 'drone', color: 'blue', text: 'Live Flying' },
                            { icon: 'cogs', color: 'cyan', text: 'Technology' },
                            { icon: 'shield-alt', color: 'green', text: 'Safety Training' },
                            { icon: 'certificate', color: 'yellow', text: 'Certificate' },
                            { icon: 'industry', color: 'purple', text: 'Industry Exposure' },
                            { icon: 'tag', color: 'red', text: '₹2,500 Only' }
                        ].map((feature, index) => `
                            <div class="interactive-card glass-effect p-4 rounded-2xl text-center animate-fade-in-up" style="animation-delay: ${1.1 + index * 0.1}s;">
                                <i class="fas fa-${feature.icon} text-${feature.color}-400 text-3xl mb-2"></i>
                                <p class="text-white text-sm font-semibold">${feature.text}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Scroll Indicator -->
            <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator">
                <div class="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
                    <div class="w-1 h-3 bg-white rounded-full mt-2"></div>
                </div>
            </div>
        </section>
`;

export default premiumSummerCampContent;
