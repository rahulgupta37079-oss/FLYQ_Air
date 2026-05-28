export const premiumStyles = `
<style>
/* Premium Global Animations */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(5deg); }
}

@keyframes pulse-slow {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.1); }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
}

@keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.3); }
    50% { box-shadow: 0 0 40px rgba(255, 107, 53, 0.6), 0 0 60px rgba(255, 107, 53, 0.4); }
}

@keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes bounce-in {
    0% { transform: scale(0.8); opacity: 0; }
    60% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
}

/* Utility Classes */
.animate-float {
    animation: float 3s ease-in-out infinite;
}

.animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
}

.animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
}

.animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
}

.animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
}

.animate-gradient-shift {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
}

/* Glass Morphism Effects */
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-card-dark {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Premium Hover Effects */
.hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Gradient Text */
.gradient-text-orange {
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.gradient-text-blue {
    background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    background: #0a0e27;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ff6b35 0%, #4a90e2 100%);
    border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #f7931e 0%, #357abd 100%);
}

/* Premium Card Shadows */
.shadow-orange-glow {
    box-shadow: 0 10px 40px rgba(255, 107, 53, 0.3);
}

.shadow-blue-glow {
    box-shadow: 0 10px 40px rgba(74, 144, 226, 0.3);
}

/* Responsive Typography */
@media (max-width: 768px) {
    h1 { font-size: 2.5rem !important; }
    h2 { font-size: 2rem !important; }
    h3 { font-size: 1.5rem !important; }
}

/* Video Hover Effects */
video:hover, iframe:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
}

/* Button Premium Styles */
.btn-premium {
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.btn-premium::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
    z-index: -1;
}

.btn-premium:hover::before {
    left: 100%;
}

/* Particle Background Effect */
.particles-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.particles-bg::before,
.particles-bg::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: particle-float 15s infinite;
}

.particles-bg::before {
    top: 20%;
    left: 20%;
    animation-delay: 0s;
}

.particles-bg::after {
    top: 60%;
    left: 80%;
    animation-delay: 5s;
}

@keyframes particle-float {
    0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0;
    }
    10%, 90% {
        opacity: 0.7;
    }
    50% {
        transform: translate(100px, -100px) scale(1.5);
        opacity: 1;
    }
}

/* Premium Loading Animation */
.loading-gradient {
    background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 107, 53, 0.3) 50%, 
        transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
}

/* Focus States */
button:focus, a:focus, input:focus {
    outline: 2px solid #ff6b35;
    outline-offset: 2px;
}

/* Smooth Scroll */
html {
    scroll-behavior: smooth;
}

/* Section Spacing */
section {
    scroll-margin-top: 80px;
}

/* Premium Border Gradients */
.border-gradient-orange {
    border: 2px solid transparent;
    background: 
        linear-gradient(#0a0e27, #0a0e27) padding-box,
        linear-gradient(135deg, #ff6b35, #f7931e) border-box;
}

.border-gradient-blue {
    border: 2px solid transparent;
    background: 
        linear-gradient(#0a0e27, #0a0e27) padding-box,
        linear-gradient(135deg, #4a90e2, #357abd) border-box;
}

/* Intersection Observer Animation Classes */
.fade-in-section {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
`;
