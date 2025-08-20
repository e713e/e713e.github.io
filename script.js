// Website JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeTheme();
    initializeLoadingScreen();
    initializeCopyLink();
    initializeAnimations();
    initializeScrollEffects();
    initializeKeyboardNavigation();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme change
        body.classList.add('theme-transitioning');
        
        // Change theme
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add bounce animation to toggle button
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        // Remove transition class after animation
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 300);
        
        // Update meta theme-color for mobile browsers
        updateMetaThemeColor(newTheme);
    });
    
    // Set initial meta theme color
    updateMetaThemeColor(savedTheme);
}

function updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    const color = theme === 'dark' ? '#667eea' : '#f093fb';
    metaThemeColor.content = color;
}

// Loading Screen Management
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const minLoadingTime = 1500; // Minimum loading time for better UX
    const startTime = Date.now();
    
    // Hide loading screen after minimum time and page load
    function hideLoadingScreen() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // Remove loading screen from DOM after transition
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
            
            // Trigger entrance animations
            triggerEntranceAnimations();
        }, remainingTime);
    }
    
    // Wait for all critical resources to load
    if (document.readyState === 'complete') {
        hideLoadingScreen();
    } else {
        window.addEventListener('load', hideLoadingScreen);
    }
}

function triggerEntranceAnimations() {
    // Add staggered animation delays to elements
    const animatedElements = document.querySelectorAll('.profile-section, .skills-section, .contact-section');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('animate-in');
    });
}

// Copy Link Functionality
function initializeCopyLink() {
    const copyBtn = document.getElementById('copy-link');
    const currentUrl = window.location.href;
    
    copyBtn.addEventListener('click', async function() {
        try {
            // Use modern Clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(currentUrl);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = currentUrl;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
            
            // Show success feedback
            copyBtn.classList.add('copied');
            
            // Add haptic feedback on supported devices
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
            
            // Reset button after 2 seconds
            setTimeout(() => {
                copyBtn.classList.remove('copied');
            }, 2000);
            
        } catch (error) {
            console.error('Failed to copy link:', error);
            
            // Show error feedback
            const originalText = copyBtn.querySelector('.copy-text').textContent;
            copyBtn.querySelector('.copy-text').textContent = 'Failed to copy';
            
            setTimeout(() => {
                copyBtn.querySelector('.copy-text').textContent = originalText;
            }, 2000);
        }
    });
}

// Advanced Animation System
function initializeAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.skill-item, .profile-card');
    animatableElements.forEach(el => observer.observe(el));
    
    // Add hover effects to interactive elements
    addHoverEffects();
    
    // Initialize particle system for background
    initializeParticleSystem();
}

function addHoverEffects() {
    // Enhanced hover effects for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
    
    // Profile image interaction
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Particle System for Background Enhancement
function initializeParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Draw connections between nearby particles
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    resizeCanvas();
    initParticles();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Pause animation when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${rate * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Keyboard Navigation Support
function initializeKeyboardNavigation() {
    // Add keyboard support for theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Add keyboard support for copy button
    const copyBtn = document.getElementById('copy-link');
    copyBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Add focus indicators for better accessibility
    const focusableElements = document.querySelectorAll('button, a, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('keyboard-focus');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would typically use a library like web-vitals
        // For now, we'll just log basic performance metrics
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Performance Metrics:', {
                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByType('paint')[0]?.startTime
            });
        });
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTheme,
        initializeCopyLink,
        initializeAnimations
    };
}

