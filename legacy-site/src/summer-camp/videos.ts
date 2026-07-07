// Summer Camp - Video Gallery Module (with YouTube videos)
export const summerCampVideos = `
<section class="py-16 md:py-24 bg-gradient-to-br from-black via-blue-950/20 to-black relative overflow-hidden">
    <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%);"></div>
    </div>
    
    <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12 md:mb-16">
                <div class="inline-block mb-4">
                    <span class="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                        <i class="fas fa-video mr-2"></i>Video Gallery
                    </span>
                </div>
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                    Watch Our <span class="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Drones in Action</span>
                </h2>
                <p class="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                    Real footage from our drone camps - See what your child will experience!
                </p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                <!-- Local Video 1 -->
                <div class="group relative bg-gradient-to-br from-blue-500/10 to-cyan-400/10 backdrop-blur-lg rounded-2xl overflow-hidden border-2 border-blue-400/30 hover:border-blue-400 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/30">
                    <div class="aspect-video bg-gray-900 relative overflow-hidden">
                        <video class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" controls preload="metadata">
                            <source src="/videos/camp-demo-1.mp4" type="video/mp4">
                        </video>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <i class="fas fa-play-circle text-white text-6xl animate-pulse"></i>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                            <i class="fas fa-drone mr-2"></i>Drone Flight Demo
                        </h3>
                    </div>
                </div>

                <!-- Local Video 2 -->
                <div class="group relative bg-gradient-to-br from-cyan-500/10 to-blue-400/10 backdrop-blur-lg rounded-2xl overflow-hidden border-2 border-cyan-400/30 hover:border-cyan-400 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-cyan-500/30">
                    <div class="aspect-video bg-gray-900 relative overflow-hidden">
                        <video class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" controls preload="metadata">
                            <source src="/videos/camp-demo-2.mp4" type="video/mp4">
                        </video>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <i class="fas fa-play-circle text-white text-6xl animate-pulse"></i>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                            <i class="fas fa-graduation-cap mr-2"></i>Hands-On Training
                        </h3>
                    </div>
                </div>

                <!-- Local Video 3 -->
                <div class="group relative bg-gradient-to-br from-green-500/10 to-emerald-400/10 backdrop-blur-lg rounded-2xl overflow-hidden border-2 border-green-400/30 hover:border-green-400 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-500/30">
                    <div class="aspect-video bg-gray-900 relative overflow-hidden">
                        <video class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" controls preload="metadata">
                            <source src="/videos/camp-demo-3.mp4" type="video/mp4">
                        </video>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <i class="fas fa-play-circle text-white text-6xl animate-pulse"></i>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                            <i class="fas fa-users mr-2"></i>Student Experience
                        </h3>
                    </div>
                </div>

                <!-- Local Video 4 -->
                <div class="group relative bg-gradient-to-br from-purple-500/10 to-pink-400/10 backdrop-blur-lg rounded-2xl overflow-hidden border-2 border-purple-400/30 hover:border-purple-400 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/30">
                    <div class="aspect-video bg-gray-900 relative overflow-hidden">
                        <video class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" controls preload="metadata">
                            <source src="/videos/camp-demo-4.mp4" type="video/mp4">
                        </video>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <i class="fas fa-play-circle text-white text-6xl animate-pulse"></i>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                            <i class="fas fa-rocket mr-2"></i>Complete Workshop
                        </h3>
                    </div>
                </div>

                <!-- YouTube Video 1 -->
                <div class="group relative bg-gradient-to-br from-red-500/10 to-rose-400/10 backdrop-blur-lg rounded-2xl overflow-hidden border-2 border-red-400/30 hover:border-red-400 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-red-500/30">
                    <div class="aspect-video bg-gray-900 relative overflow-hidden">
                        <iframe 
                            class="w-full h-full"
                            src="https://www.youtube.com/embed/3Q8UWRen77I?rel=0&modestbranding=1"
                            title="FLYQ Drone Professional Demo"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="p-4 bg-gradient-to-r from-red-500/20 to-rose-500/20">
                        <h3 class="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                            <i class="fab fa-youtube mr-2"></i>Professional Showcase
                        </h3>
                        <p class="text-sm text-gray-400 mt-1">FLYQ official demonstration</p>
                    </div>
                </div>

                <!-- YouTube Video 2 -->
                <div class="group relative bg-gradient-to-br from-orange-500/10 to-yellow-400/10 backdrop-blur-lg rounded-2xl overflow-hidden border-2 border-orange-400/30 hover:border-orange-400 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/30">
                    <div class="aspect-video bg-gray-900 relative overflow-hidden">
                        <iframe 
                            class="w-full h-full"
                            src="https://www.youtube.com/embed/l4ecluV8FBE?rel=0&modestbranding=1"
                            title="FLYQ Drone Training Session"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="p-4 bg-gradient-to-r from-orange-500/20 to-yellow-500/20">
                        <h3 class="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                            <i class="fab fa-youtube mr-2"></i>Training Highlights
                        </h3>
                        <p class="text-sm text-gray-400 mt-1">Watch our expert training</p>
                    </div>
                </div>
            </div>
            
            <!-- YouTube Channel CTA -->
            <div class="mt-10 text-center">
                <a href="https://www.youtube.com/@FLYQDrones" target="_blank" class="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-rose-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/50">
                    <i class="fab fa-youtube text-2xl"></i>
                    <span>Watch More on YouTube</span>
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    </div>
</section>
`;
