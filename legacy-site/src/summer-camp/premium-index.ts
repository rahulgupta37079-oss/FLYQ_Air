// FLYQ Drones Summer Camp 2026 - REFERENCE-MATCHED PREMIUM REBUILD
// Design exactly matches the reference image: https://www.genspark.ai/api/files/s/syexSSYY

import { premiumStyles } from './premium-styles'
import { referenceMatchedHero } from './reference-matched-hero'
import { premiumWhyFlyq } from './premium-why-flyq'
import { referenceMatched3DayCards } from './reference-matched-3day-cards'
import { realDroneFlyingExperience } from './real-drone-flying-experience'
import { referenceMatchedGallery, referenceMatchedCitiesMap } from './reference-matched-gallery-cities'
import { referenceMatchedTestimonials, referenceMatchedRegistration } from './reference-matched-testimonials-registration'

export function getSummerCampPage() {
  return `
    ${premiumStyles}
    
    <div class="bg-[#0a0e27]">
        ${referenceMatchedHero}
        ${premiumWhyFlyq}
        ${referenceMatched3DayCards}
        ${realDroneFlyingExperience}
        ${referenceMatchedGallery}
        ${referenceMatchedCitiesMap}
        ${referenceMatchedTestimonials}
        ${referenceMatchedRegistration}
        
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
                            <a href="https://www.youtube.com/@FLYQDrones" target="_blank" class="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-all hover:scale-110">
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
