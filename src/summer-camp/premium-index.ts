// FLYQ Drones Summer Camp 2026 - PREMIUM REBUILD
// Ultra-modern, Meta Ads inspired design with complete sections

import { premiumStyles } from './premium-styles'
import { premiumHero } from './premium-hero'
import { premiumVideos } from './premium-videos'
import { premiumWhyFlyq } from './premium-why-flyq'
import { premium3DayWorkshop } from './premium-3day-workshop'

export function getSummerCampPage() {
  return `
    ${premiumStyles}
    
    <div class="bg-[#0a0e27]">
        ${premiumHero}
        ${premiumVideos}
        ${premiumWhyFlyq}
        ${premium3DayWorkshop}
        
        <!-- CITIES SECTION -->
        <section class="relative py-24 bg-gradient-to-b from-[#12162e] via-[#0a0e27] to-[#12162e] overflow-hidden">
            <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-500/30 mb-6">
                        <i class="fas fa-map-marker-alt text-orange-400"></i>
                        <span class="text-orange-400 font-semibold text-sm uppercase tracking-wider">Coming to Your City</span>
                    </div>
                    <h2 class="text-5xl md:text-6xl font-black mb-6">
                        <span class="text-white">Cities We Are</span>
                        <span class="block bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">Coming To!</span>
                    </h2>
                    <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                        Expanding across India - Find the nearest location for your summer drone experience
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    ${['Mumbai', 'Navi Mumbai', 'Bangalore', 'Gujarat', 'Delhi', 'Hyderabad', 'Chennai', 'Pune'].map((city, index) => `
                        <div class="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-${index % 2 === 0 ? 'orange' : 'blue'}-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 bg-gradient-to-br from-${index % 2 === 0 ? 'orange' : 'blue'}-500 to-${index % 2 === 0 ? 'orange' : 'blue'}-600 rounded-xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
                                    <i class="fas fa-city text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-white group-hover:text-${index % 2 === 0 ? 'orange' : 'blue'}-400 transition-colors">${city}</h3>
                                    <p class="text-sm text-gray-400">Multiple Batches</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="text-center">
                    <div class="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-2xl backdrop-blur-sm animate-glow-pulse">
                        <i class="fas fa-fire text-orange-400 text-2xl"></i>
                        <div class="text-left">
                            <div class="text-white font-black text-xl">LIMITED SEATS AVAILABLE</div>
                            <div class="text-gray-300 text-sm">Only 30 students per batch - Register now!</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- REGISTRATION SECTION -->
        <section id="register" class="relative py-24 bg-gradient-to-b from-[#12162e] via-[#0a0e27] to-[#12162e] overflow-hidden">
            <div class="absolute inset-0">
                <div class="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"></div>
                <div class="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-5xl mx-auto">
                    <div class="text-center mb-12">
                        <div class="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-500/30 mb-6">
                            <i class="fas fa-rocket text-orange-400"></i>
                            <span class="text-orange-400 font-semibold text-sm uppercase tracking-wider">Join the Revolution</span>
                        </div>
                        <h2 class="text-5xl md:text-6xl font-black mb-6">
                            <span class="text-white">Register for</span>
                            <span class="block bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">Summer Camp 2026</span>
                        </h2>
                        <p class="text-xl text-gray-400">Secure your spot in India's most exciting drone summer camp!</p>
                    </div>

                    <div class="grid lg:grid-cols-3 gap-8 mb-12">
                        <div class="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm">
                            <form id="registration-form" class="space-y-6">
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-white font-semibold mb-2">Student Name *</label>
                                        <input type="text" name="student_name" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all">
                                    </div>
                                    <div>
                                        <label class="block text-white font-semibold mb-2">Age (8+) *</label>
                                        <input type="number" name="age" required min="8" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all">
                                    </div>
                                </div>
                                
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-white font-semibold mb-2">Email *</label>
                                        <input type="email" name="email" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all">
                                    </div>
                                    <div>
                                        <label class="block text-white font-semibold mb-2">Phone *</label>
                                        <input type="tel" name="phone" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all">
                                    </div>
                                </div>
                                
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-white font-semibold mb-2">Parent Name *</label>
                                        <input type="text" name="parent_name" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all">
                                    </div>
                                    <div>
                                        <label class="block text-white font-semibold mb-2">Parent Phone *</label>
                                        <input type="tel" name="parent_phone" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all">
                                    </div>
                                </div>
                                
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-white font-semibold mb-2">City *</label>
                                        <select name="city" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-orange-400 focus:outline-none transition-all">
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
                                        <input type="text" name="school_name" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all">
                                    </div>
                                </div>
                                
                                <button type="submit" class="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-orange-500/50 btn-premium">
                                    <span class="flex items-center justify-center gap-3">
                                        <span>Register Now - ₹2,500</span>
                                        <i class="fas fa-arrow-right"></i>
                                    </span>
                                </button>
                                
                                <p class="text-center text-gray-400 text-sm">
                                    <i class="fas fa-lock text-orange-400 mr-2"></i>
                                    Your information is secure and will never be shared
                                </p>
                            </form>
                        </div>

                        <div class="space-y-6">
                            <div class="p-8 rounded-3xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border-2 border-orange-500/30 backdrop-blur-sm">
                                <div class="text-center mb-6">
                                    <div class="text-5xl font-black text-white mb-2">₹2,500</div>
                                    <div class="text-orange-400 font-bold text-lg">Registration Fee Only</div>
                                </div>
                                <div class="space-y-4">
                                    <div class="flex items-center gap-3 text-white">
                                        <i class="fas fa-check-circle text-orange-400"></i>
                                        <span>3-Day Workshop</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-white">
                                        <i class="fas fa-check-circle text-orange-400"></i>
                                        <span>Certificate Included</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-white">
                                        <i class="fas fa-check-circle text-orange-400"></i>
                                        <span>Real Drone Flying</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-white">
                                        <i class="fas fa-check-circle text-orange-400"></i>
                                        <span>Industry Mentorship</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-white">
                                        <i class="fas fa-check-circle text-orange-400"></i>
                                        <span>All Materials Provided</span>
                                    </div>
                                </div>
                            </div>

                            <div class="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 backdrop-blur-sm">
                                <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <i class="fas fa-info-circle text-blue-400"></i>
                                    What Happens Next?
                                </h3>
                                <div class="space-y-3 text-gray-300 text-sm">
                                    <div class="flex gap-3">
                                        <span class="text-blue-400 font-bold">1.</span>
                                        <span>Confirmation email within 24 hours</span>
                                    </div>
                                    <div class="flex gap-3">
                                        <span class="text-blue-400 font-bold">2.</span>
                                        <span>Schedule and location details</span>
                                    </div>
                                    <div class="flex gap-3">
                                        <span class="text-blue-400 font-bold">3.</span>
                                        <span>Preparation guidelines</span>
                                    </div>
                                    <div class="flex gap-3">
                                        <span class="text-blue-400 font-bold">4.</span>
                                        <span>See you at the camp!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CONTACT FOOTER -->
        <section class="relative py-16 bg-gradient-to-b from-[#12162e] to-[#0a0e27] border-t border-white/10">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-3 gap-8 mb-12">
                    <div>
                        <h3 class="text-2xl font-black text-white mb-4">FLYQ Drones</h3>
                        <p class="text-gray-400 leading-relaxed mb-4">India's leading drone education platform, empowering the next generation of innovators.</p>
                        <div class="flex gap-4">
                            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-all hover:scale-110">
                                <i class="fab fa-facebook"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-all hover:scale-110">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-all hover:scale-110">
                                <i class="fab fa-youtube"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-all hover:scale-110">
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-lg font-bold text-white mb-4">Contact Us</h4>
                        <div class="space-y-3 text-gray-400">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-phone text-orange-400"></i>
                                <span>+91 9137361474</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <i class="fas fa-phone text-orange-400"></i>
                                <span>+91 9521118291</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <i class="fas fa-envelope text-orange-400"></i>
                                <span>info@flyqdrone.in</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <i class="fas fa-globe text-orange-400"></i>
                                <span>flyqdrone.in</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-lg font-bold text-white mb-4">Quick Links</h4>
                        <div class="space-y-3">
                            <a href="/" class="block text-gray-400 hover:text-orange-400 transition-colors">Home</a>
                            <a href="/about" class="block text-gray-400 hover:text-orange-400 transition-colors">About Us</a>
                            <a href="/products" class="block text-gray-400 hover:text-orange-400 transition-colors">Products</a>
                            <a href="/curriculum" class="block text-gray-400 hover:text-orange-400 transition-colors">Curriculum</a>
                            <a href="/contact" class="block text-gray-400 hover:text-orange-400 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>

                <div class="pt-8 border-t border-white/10 text-center text-gray-400">
                    <p>© 2026 FLYQ Drones. All rights reserved. | Building the future, one drone at a time.</p>
                </div>
            </div>
        </section>
    </div>

    <script>
    // Registration Form Handler
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
                alert('✅ Registration Successful!\\n\\nThank you for registering! You will receive a confirmation email within 24 hours with all the details.\\n\\nSee you at the camp!');
                this.reset();
            } else {
                alert('❌ Registration Failed\\n\\n' + (result.error || 'Please try again later.'));
            }
        } catch (error) {
            alert('❌ Error\\n\\nSomething went wrong. Please try again or contact us directly.');
        } finally {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    </script>
  `;
}
