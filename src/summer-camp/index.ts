// Summer Camp - Main Module (Compact Version with All Content)
import { summerCampHero } from './hero'
import { summerCampVideos } from './videos'
import { summerCampBenefits } from './benefits'
import { summerCampStyles } from './styles'

export function getSummerCampPage() {
  return `
    ${summerCampStyles}
    
    <div class="pt-20 bg-black">
        ${summerCampHero}
        ${summerCampVideos}
        ${summerCampBenefits}
        
        <!-- Registration Form Section -->
        <section id="register" class="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div class="container mx-auto px-4 md:px-6">
                <div class="max-w-4xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
                            <span class="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Register Now</span>
                        </h2>
                        <p class="text-xl text-gray-400">Secure your spot in India's most exciting drone summer camp!</p>
                    </div>
                    
                    <div class="bg-gradient-to-br from-blue-500/10 to-cyan-400/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border-2 border-blue-400/30">
                        <form id="registration-form" class="space-y-6">
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-white font-semibold mb-2">Student Name *</label>
                                    <input type="text" name="student_name" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all">
                                </div>
                                <div>
                                    <label class="block text-white font-semibold mb-2">Age (8+) *</label>
                                    <input type="number" name="age" required min="8" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all">
                                </div>
                            </div>
                            
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-white font-semibold mb-2">Email *</label>
                                    <input type="email" name="email" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all">
                                </div>
                                <div>
                                    <label class="block text-white font-semibold mb-2">Phone *</label>
                                    <input type="tel" name="phone" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all">
                                </div>
                            </div>
                            
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-white font-semibold mb-2">Parent Name *</label>
                                    <input type="text" name="parent_name" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all">
                                </div>
                                <div>
                                    <label class="block text-white font-semibold mb-2">Parent Phone *</label>
                                    <input type="tel" name="parent_phone" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all">
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-white font-semibold mb-2">City *</label>
                                <input type="text" name="city" required class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all">
                            </div>
                            
                            <div>
                                <label class="block text-white font-semibold mb-2">School Name</label>
                                <input type="text" name="school_name" class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all">
                            </div>
                            
                            <button type="submit" class="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50">
                                <i class="fas fa-paper-plane mr-2"></i>Submit Registration
                            </button>
                        </form>
                        
                        <div id="form-message" class="mt-6 hidden"></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    
    <script>
        document.getElementById('registration-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/api/summer-camp/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                const messageDiv = document.getElementById('form-message');
                
                if (result.success) {
                    messageDiv.className = 'mt-6 p-6 bg-green-500/20 border-2 border-green-400 rounded-xl text-green-300 text-center';
                    messageDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Registration successful! We will contact you soon.';
                    e.target.reset();
                } else {
                    messageDiv.className = 'mt-6 p-6 bg-red-500/20 border-2 border-red-400 rounded-xl text-red-300 text-center';
                    messageDiv.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>' + result.error;
                }
                
                messageDiv.classList.remove('hidden');
                setTimeout(() => messageDiv.classList.add('hidden'), 5000);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    </script>
  `;
}
