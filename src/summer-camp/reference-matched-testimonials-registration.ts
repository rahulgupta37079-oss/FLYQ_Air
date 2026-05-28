export const referenceMatchedTestimonials = `
<!-- WHAT PARENTS & STUDENTS SAY - Testimonials Section -->
<section class="relative py-20 bg-gradient-to-b from-[#12162e] to-[#0a0e27]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
                WHAT <span class="text-orange-400">PARENTS & STUDENTS</span> SAY
            </h2>
            <p class="text-gray-400 text-lg">Real reviews from real families</p>
        </div>

        <!-- Testimonial Grid -->
        <div class="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <!-- Testimonial 1 -->
            <div class="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:scale-105 transition-all duration-300">
                <!-- Star Rating -->
                <div class="flex gap-1 mb-4">
                    ${Array(5).fill(0).map(() => '<i class="fas fa-star text-orange-400"></i>').join('')}
                </div>
                <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                    "My son learned so much in just 3 days! The instructors were patient and knowledgeable. Highly recommend!"
                </p>
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                    </div>
                    <div>
                        <p class="text-white font-bold text-sm">Priya Sharma</p>
                        <p class="text-gray-400 text-xs">Parent, Mumbai</p>
                    </div>
                </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:scale-105 transition-all duration-300">
                <div class="flex gap-1 mb-4">
                    ${Array(5).fill(0).map(() => '<i class="fas fa-star text-orange-400"></i>').join('')}
                </div>
                <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                    "Best summer camp ever! I got to fly real drones and learned about future careers. Amazing experience!"
                </p>
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                    </div>
                    <div>
                        <p class="text-white font-bold text-sm">Arjun Patel</p>
                        <p class="text-gray-400 text-xs">Student, Age 12</p>
                    </div>
                </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:scale-105 transition-all duration-300">
                <div class="flex gap-1 mb-4">
                    ${Array(5).fill(0).map(() => '<i class="fas fa-star text-orange-400"></i>').join('')}
                </div>
                <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                    "Professional setup, safety first approach. My daughter can't stop talking about the camp!"
                </p>
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                    </div>
                    <div>
                        <p class="text-white font-bold text-sm">Rajesh Kumar</p>
                        <p class="text-gray-400 text-xs">Parent, Delhi</p>
                    </div>
                </div>
            </div>

            <!-- Testimonial 4 -->
            <div class="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:scale-105 transition-all duration-300">
                <div class="flex gap-1 mb-4">
                    ${Array(5).fill(0).map(() => '<i class="fas fa-star text-orange-400"></i>').join('')}
                </div>
                <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                    "The certificate and skills my child gained will definitely help in future. Great value for money!"
                </p>
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                    </div>
                    <div>
                        <p class="text-white font-bold text-sm">Sneha Desai</p>
                        <p class="text-gray-400 text-xs">Parent, Bangalore</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Watch More Button -->
        <div class="text-center mt-12">
            <a href="#videos" class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-orange-500/50">
                <i class="fas fa-play-circle text-2xl"></i>
                <span>WATCH MORE TESTIMONIALS</span>
            </a>
        </div>
    </div>
</section>
`;

export const referenceMatchedRegistration = `
<!-- JOIN THE DRONE REVOLUTION - Final Registration Section (Matches Reference) -->
<section id="register" class="relative py-20 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" style="animation-delay: 2s;"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                JOIN THE <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">DRONE REVOLUTION</span>
            </h2>
            <p class="text-xl text-gray-400">Registration Open for Summer 2026</p>
        </div>

        <!-- Registration Box - Matches Reference Layout -->
        <div class="max-w-6xl mx-auto">
            <div class="grid lg:grid-cols-[2fr,1fr] gap-8 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border-2 border-white/10 backdrop-blur-sm">
                <!-- Left Side - Registration Details -->
                <div class="space-y-8">
                    <!-- Price Display - Matches Reference -->
                    <div class="text-center lg:text-left">
                        <p class="text-orange-400 text-sm font-bold uppercase tracking-wider mb-2">REGISTRATION FEE</p>
                        <div class="flex items-baseline gap-2">
                            <span class="text-orange-400 text-3xl font-bold">₹</span>
                            <span class="text-white text-7xl md:text-8xl font-black">2500</span>
                            <span class="text-orange-400 text-2xl font-bold">/-</span>
                        </div>
                        <p class="text-orange-300 font-semibold text-lg mt-2">ONLY</p>
                    </div>

                    <!-- Features List -->
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="flex items-center gap-3">
                            <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-white text-xs"></i>
                            </div>
                            <span class="text-white font-semibold">3-Day Drone Workshop</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-white text-xs"></i>
                            </div>
                            <span class="text-white font-semibold">Real Drone Experience</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-white text-xs"></i>
                            </div>
                            <span class="text-white font-semibold">Expert Mentors</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-white text-xs"></i>
                            </div>
                            <span class="text-white font-semibold">Certificate Included</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-white text-xs"></i>
                            </div>
                            <span class="text-white font-semibold">No Equipment Needed</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-white text-xs"></i>
                            </div>
                            <span class="text-white font-semibold">Future Tech Skills</span>
                        </div>
                    </div>

                    <!-- Countdown Timer - Matches Reference -->
                    <div class="p-6 rounded-2xl bg-gradient-to-r from-orange-500/20 to-orange-500/10 border border-orange-500/30">
                        <p class="text-orange-400 font-bold text-sm uppercase mb-4 text-center">UPCOMING BATCH STARTS IN</p>
                        <div class="grid grid-cols-4 gap-4 text-center">
                            <div>
                                <div class="text-4xl font-black text-white" id="countdown-days">24</div>
                                <div class="text-xs text-gray-400 uppercase mt-1">Days</div>
                            </div>
                            <div>
                                <div class="text-4xl font-black text-white" id="countdown-hours">12</div>
                                <div class="text-xs text-gray-400 uppercase mt-1">Hours</div>
                            </div>
                            <div>
                                <div class="text-4xl font-black text-white" id="countdown-minutes">45</div>
                                <div class="text-xs text-gray-400 uppercase mt-1">Minutes</div>
                            </div>
                            <div>
                                <div class="text-4xl font-black text-white" id="countdown-seconds">30</div>
                                <div class="text-xs text-gray-400 uppercase mt-1">Seconds</div>
                            </div>
                        </div>
                    </div>

                    <!-- Register Button -->
                    <a href="#form" class="block w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white font-black text-2xl text-center hover:scale-105 transition-all shadow-2xl hover:shadow-orange-500/50">
                        REGISTER NOW
                    </a>

                    <!-- Contact Options -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:+919137361474" class="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/50 transition-all">
                            <i class="fas fa-phone text-orange-400"></i>
                            <span class="text-white font-semibold">+91 9137361474</span>
                        </a>
                        <a href="tel:+919521118291" class="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/50 transition-all">
                            <i class="fas fa-phone text-orange-400"></i>
                            <span class="text-white font-semibold">+91 9521118291</span>
                        </div>
                    </div>
                </div>

                <!-- Right Side - QR Code & Info (Matches Reference) -->
                <div class="flex flex-col items-center justify-center space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
                    <!-- QR Code -->
                    <div class="p-6 bg-white rounded-2xl shadow-2xl">
                        <div class="w-48 h-48 flex items-center justify-center bg-gray-100">
                            <svg viewBox="0 0 200 200" class="w-full h-full">
                                <!-- QR Code Pattern (Simplified) -->
                                <rect x="0" y="0" width="200" height="200" fill="white"/>
                                ${Array(10).fill(0).map((_, i) => 
                                    Array(10).fill(0).map((_, j) => 
                                        (i + j) % 2 === 0 ? `<rect x="${j * 20}" y="${i * 20}" width="20" height="20" fill="black"/>` : ''
                                    ).join('')
                                ).join('')}
                            </svg>
                        </div>
                    </div>
                    <p class="text-center text-gray-400 text-sm">
                        <i class="fas fa-qrcode text-orange-400 mr-2"></i>
                        Scan to Register
                    </p>

                    <!-- Add to WhatsApp -->
                    <a href="https://wa.me/919137361474?text=Hi! I want to register for Summer Drone Camp 2026" target="_blank" class="flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold transition-all w-full justify-center">
                        <i class="fab fa-whatsapp text-2xl"></i>
                        <span>Chat on WhatsApp</span>
                    </a>
                </div>
            </div>

            <!-- Form Section -->
            <div id="form" class="mt-12 p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm">
                <h3 class="text-2xl font-bold text-white mb-6 text-center">Complete Your Registration</h3>
                <form id="registration-form" class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-white font-semibold mb-2">Student Name *</label>
                            <input type="text" name="student_name" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-white font-semibold mb-2">Age (8+) *</label>
                            <input type="number" name="age" required min="8" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none">
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-white font-semibold mb-2">Email *</label>
                            <input type="email" name="email" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-white font-semibold mb-2">Phone *</label>
                            <input type="tel" name="phone" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none">
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-white font-semibold mb-2">Parent Name *</label>
                            <input type="text" name="parent_name" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-white font-semibold mb-2">Parent Phone *</label>
                            <input type="tel" name="parent_phone" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none">
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-white font-semibold mb-2">City *</label>
                            <select name="city" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-orange-400 focus:outline-none">
                                <option value="">Select City</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Navi Mumbai">Navi Mumbai</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Pune">Pune</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-white font-semibold mb-2">School Name</label>
                            <input type="text" name="school_name" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none">
                        </div>
                    </div>
                    
                    <button type="submit" class="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-orange-500/50">
                        SUBMIT REGISTRATION - ₹2,500
                    </button>
                </form>
            </div>
        </div>
    </div>

    <script>
    // Countdown Timer
    function updateCountdown() {
        const targetDate = new Date('2026-06-01T00:00:00').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('countdown-days').textContent = days;
        document.getElementById('countdown-hours').textContent = hours;
        document.getElementById('countdown-minutes').textContent = minutes;
        document.getElementById('countdown-seconds').textContent = seconds;
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Form Handler
    document.getElementById('registration-form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';
        button.disabled = true;
        
        try {
            const response = await fetch('/api/summer-camp/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert('✅ Registration Successful!\\n\\nThank you for registering!\\n\\nYou will receive a confirmation email within 24 hours.\\n\\nSee you at the camp!');
                this.reset();
            } else {
                alert('❌ Registration Failed\\n\\n' + (result.error || 'Please try again.'));
            }
        } catch (error) {
            alert('❌ Error\\n\\nPlease try again or contact us directly.');
        } finally {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    });
    </script>
</section>
`;
