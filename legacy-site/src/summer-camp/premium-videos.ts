export const premiumVideos = `
<!-- YOUTUBE-STYLE VIDEO SECTION -->
<section id="videos" class="relative py-24 bg-gradient-to-b from-[#0a0e27] via-[#12162e] to-[#0a0e27] overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <div class="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-500/30 mb-6">
                <i class="fas fa-video text-orange-400"></i>
                <span class="text-orange-400 font-semibold text-sm uppercase tracking-wider">Watch Our Journey</span>
            </div>
            <h2 class="text-5xl md:text-6xl font-black mb-6">
                <span class="text-white">Experience</span>
                <span class="block bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">FLYQ in Action</span>
            </h2>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                Watch real students flying drones, learning from experts, and building their future in drone technology
            </p>
        </div>

        <!-- Featured Video -->
        <div class="mb-12">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <div class="aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
                    <iframe 
                        src="https://www.youtube.com/embed/lXujDYkb-FA" 
                        title="FLYQ Drones Summer Camp - Main Highlight"
                        class="w-full h-full"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                    </iframe>
                </div>
                <!-- Featured Badge -->
                <div class="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg">
                    <span class="text-white font-bold text-sm flex items-center gap-2">
                        <i class="fas fa-star"></i>
                        Featured Video
                    </span>
                </div>
            </div>
            <div class="mt-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 class="text-2xl font-bold text-white mb-2">FLYQ Drones Summer Camp 2026 - Complete Experience</h3>
                <p class="text-gray-400 mb-4">Watch how students transform from beginners to confident drone pilots in just 3 days</p>
                <div class="flex items-center gap-6 text-sm text-gray-500">
                    <span class="flex items-center gap-2">
                        <i class="fas fa-eye text-orange-400"></i>
                        2.5K+ views
                    </span>
                    <span class="flex items-center gap-2">
                        <i class="fas fa-thumbs-up text-blue-400"></i>
                        98% liked
                    </span>
                    <span class="flex items-center gap-2">
                        <i class="fas fa-clock text-gray-400"></i>
                        5:42
                    </span>
                </div>
            </div>
        </div>

        <!-- Video Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Video 1 -->
            <div class="group">
                <div class="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 mb-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div class="aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
                        <iframe 
                            src="https://www.youtube.com/embed/3Q8UWRen77I" 
                            title="Professional Drone Showcase"
                            class="w-full h-full"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="space-y-2">
                    <h4 class="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">Professional Drone Showcase</h4>
                    <p class="text-sm text-gray-400 line-clamp-2">See our professional drones in action and learn about advanced features</p>
                    <div class="flex items-center gap-4 text-xs text-gray-500">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-play text-orange-400"></i>
                            1.8K views
                        </span>
                        <span>3:45</span>
                    </div>
                </div>
            </div>

            <!-- Video 2 -->
            <div class="group">
                <div class="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 mb-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div class="aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
                        <iframe 
                            src="https://www.youtube.com/embed/l4ecluV8FBE" 
                            title="Training Highlights"
                            class="w-full h-full"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="space-y-2">
                    <h4 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Training Highlights & Success Stories</h4>
                    <p class="text-sm text-gray-400 line-clamp-2">Real students sharing their incredible learning experience</p>
                    <div class="flex items-center gap-4 text-xs text-gray-500">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-play text-blue-400"></i>
                            2.1K views
                        </span>
                        <span>4:20</span>
                    </div>
                </div>
            </div>

            <!-- Video 3 - Local -->
            <div class="group">
                <div class="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 mb-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <video 
                        class="w-full h-full object-cover aspect-video"
                        controls
                        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%231a1f3a' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23fff'%3EDrone Flying Experience%3C/text%3E%3C/svg%3E">
                        <source src="/videos/camp-demo-1.mp4" type="video/mp4">
                    </video>
                    <div class="absolute top-3 right-3 px-3 py-1 bg-orange-500 rounded-full shadow-lg">
                        <span class="text-white font-bold text-xs">LIVE ACTION</span>
                    </div>
                </div>
                <div class="space-y-2">
                    <h4 class="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">Drone Flying Experience</h4>
                    <p class="text-sm text-gray-400 line-clamp-2">Students taking their first flight and mastering controls</p>
                    <div class="flex items-center gap-4 text-xs text-gray-500">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-play text-orange-400"></i>
                            Live Demo
                        </span>
                        <span>2:15</span>
                    </div>
                </div>
            </div>

            <!-- Video 4 - Local -->
            <div class="group">
                <div class="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 mb-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <video 
                        class="w-full h-full object-cover aspect-video"
                        controls
                        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%231a1f3a' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23fff'%3EInside FLYQ Workshop%3C/text%3E%3C/svg%3E">
                        <source src="/videos/camp-demo-2.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="space-y-2">
                    <h4 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Inside FLYQ Workshop</h4>
                    <p class="text-sm text-gray-400 line-clamp-2">Behind the scenes of our comprehensive training program</p>
                    <div class="flex items-center gap-4 text-xs text-gray-500">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-play text-blue-400"></i>
                            Workshop Tour
                        </span>
                        <span>1:45</span>
                    </div>
                </div>
            </div>

            <!-- Video 5 - Local -->
            <div class="group">
                <div class="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 mb-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <video 
                        class="w-full h-full object-cover aspect-video"
                        controls
                        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%231a1f3a' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23fff'%3EFuture Drone Careers%3C/text%3E%3C/svg%3E">
                        <source src="/videos/camp-demo-3.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="space-y-2">
                    <h4 class="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">Future Drone Careers</h4>
                    <p class="text-sm text-gray-400 line-clamp-2">Explore exciting career opportunities in drone technology</p>
                    <div class="flex items-center gap-4 text-xs text-gray-500">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-play text-orange-400"></i>
                            Career Guide
                        </span>
                        <span>3:10</span>
                    </div>
                </div>
            </div>

            <!-- Video 6 - Local -->
            <div class="group">
                <div class="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 mb-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <video 
                        class="w-full h-full object-cover aspect-video"
                        controls
                        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%231a1f3a' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23fff'%3EStudent Success Stories%3C/text%3E%3C/svg%3E">
                        <source src="/videos/camp-demo-4.mp4" type="video/mp4">
                    </video>
                    <div class="absolute top-3 right-3 px-3 py-1 bg-blue-500 rounded-full shadow-lg">
                        <span class="text-white font-bold text-xs">TESTIMONIALS</span>
                    </div>
                </div>
                <div class="space-y-2">
                    <h4 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Student Success Stories</h4>
                    <p class="text-sm text-gray-400 line-clamp-2">Hear directly from students who transformed their skills</p>
                    <div class="flex items-center gap-4 text-xs text-gray-500">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-play text-blue-400"></i>
                            Success Stories
                        </span>
                        <span>4:05</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- YouTube Channel CTA -->
        <div class="mt-16 text-center">
            <div class="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                <i class="fab fa-youtube text-white text-3xl"></i>
                <div class="text-left">
                    <div class="text-white font-bold text-lg">Subscribe to FLYQ Drones</div>
                    <div class="text-red-100 text-sm">Watch more amazing content on YouTube</div>
                </div>
                <i class="fas fa-external-link-alt text-white"></i>
            </div>
        </div>
    </div>
</section>
`;
