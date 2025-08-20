// Global Variables
let isLoading = true;
let currentTheme = 'dark';
let typingTimeout;
let progressInterval;

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const themeToggle = document.getElementById('themeToggle');
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const mainConnectBtn = document.getElementById('mainConnectBtn');
const connectOverlay = document.getElementById('connectOverlay');
const overlayBackdrop = document.getElementById('overlayBackdrop');
const closeBtn = document.getElementById('closeBtn');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    showLoadingScreen();
    setTimeout(() => {
        hideLoadingScreen();
        initializeComponents();
    }, 3000);
}

// Enhanced Loading Screen with Progress
function showLoadingScreen() {
    let progress = 0;
    
    progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (progressFill && progressText) {
            progressFill.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                hideLoadingScreen();
            }, 500);
        }
    }, 100);
}

// Hide loading screen with animation
function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            isLoading = false;
            startInitialAnimations();
            initializeSectionAnimations();
        }, 500);
    }
}

// Initialize all components
function initializeComponents() {
    initializeParticles();
    initializeAOS();
    initializeThemeToggle();
    initializeNavigation();
    initializeTypingAnimation();
    initializeAboutNavigation();
    initializeSkillsAnimation();
    initializeCounterAnimation();
    initializeConnectModal();
    initializeScrollEffects();
    initializeMobileMenu();
}

// Enhanced Particles.js initialization
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.6
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// AOS (Animate On Scroll) initialization
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

// Enhanced Theme toggle functionality
function initializeThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    currentTheme = savedTheme;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Enhanced animation effect
    themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
}

// Enhanced Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });
}

// Enhanced Typing animation with smooth transitions
function initializeTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const titles = [
        'Database Enthusiast',
        'Full Stack Developer',
        'UI/UX Designer', 
        'Prompt Engineer',
        'Backend Developer',
        'AI/ML Enthusiast'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeText() {
        if (isWaiting) {
            isWaiting = false;
            typingTimeout = setTimeout(typeText, 500);
            return;
        }
        
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            charIndex--;
            typingText.textContent = currentTitle.substring(0, charIndex);
        } else {
            charIndex++;
            typingText.textContent = currentTitle.substring(0, charIndex);
        }
        
        let typeSpeed = isDeleting ? 75 : 150;
        
        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2500; // Longer pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            isWaiting = true;
            typeSpeed = 800;
        }
        
        typingTimeout = setTimeout(typeText, typeSpeed);
    }
    
    // Start typing animation after initial load
    setTimeout(() => {
        typeText();
    }, 1500);
}

// About section navigation
function initializeAboutNavigation() {
    const aboutNavBtns = document.querySelectorAll('.about-nav-btn');
    const contentPanels = document.querySelectorAll('.content-panel');
    
    aboutNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetContent = btn.getAttribute('data-content');
            
            // Remove active class from all buttons and panels
            aboutNavBtns.forEach(b => b.classList.remove('active'));
            contentPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and target panel
            btn.classList.add('active');
            const targetPanel = document.getElementById(targetContent);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // Enhanced click animation
            btn.style.transform = 'scale(0.95) translateX(10px)';
            setTimeout(() => {
                btn.style.transform = 'scale(1) translateX(5px)';
            }, 200);
        });
    });
}

// Enhanced Skills progress animation
function initializeSkillsAnimation() {
    const observeSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach((bar, index) => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                        bar.style.transition = 'width 2s ease-out';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        observeSkills.observe(skillsSection);
    }
}

// Enhanced Counter animation
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observeCounters = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const increment = target / 60;
                const duration = 2000;
                const startTime = Date.now();
                
                const updateCounter = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    count = target * easeOutQuart(progress);
                    counter.textContent = Math.floor(count);
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observeCounters.observe(counter);
    });
}

// Easing function for smooth counter animation
function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

// Enhanced Connect modal functionality
function initializeConnectModal() {
    if (mainConnectBtn) {
        mainConnectBtn.addEventListener('click', openConnectModal);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeConnectModal);
    }
    
    if (overlayBackdrop) {
        overlayBackdrop.addEventListener('click', closeConnectModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && connectOverlay && connectOverlay.classList.contains('active')) {
            closeConnectModal();
        }
    });
}

function openConnectModal() {
    if (connectOverlay) {
        connectOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate connect options
        const options = document.querySelectorAll('.connect-option');
        options.forEach((option, index) => {
            option.style.opacity = '0';
            option.style.transform = 'translateY(30px) scale(0.9)';
            
            setTimeout(() => {
                option.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                option.style.opacity = '1';
                option.style.transform = 'translateY(0) scale(1)';
            }, index * 100 + 200);
        });
    }
}

function closeConnectModal() {
    if (connectOverlay) {
        connectOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Enhanced Scroll effects
function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateScrollEffects() {
        const currentScrollY = window.scrollY;
        
        // Header scroll effect
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
        
        // Update active nav link
        updateActiveNavLink();
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = header ? header.offsetHeight : 0;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced Mobile menu functionality
function initializeMobileMenu() {
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Enhanced mobile menu animation
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            navMenu.style.visibility = 'visible';
        } else {
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                if (!navMenu.classList.contains('active')) {
                    navMenu.style.visibility = 'hidden';
                }
            }, 300);
        }
    }
}

function closeMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            navMenu.style.visibility = 'hidden';
        }, 300);
    }
}

// Section animations on scroll
function initializeSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Enhanced initial animations
function startInitialAnimations() {
    // Animate profile container (coin-container instead of profile-container)
    const profileContainer = document.querySelector('.coin-container');
    if (profileContainer) {
        profileContainer.style.opacity = '0';
        profileContainer.style.transform = 'scale(0.8) rotateY(-180deg)';
        
        setTimeout(() => {
            profileContainer.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            profileContainer.style.opacity = '1';
            profileContainer.style.transform = 'scale(1) rotateY(0deg)';
        }, 300);
    }
    
    // Animate hero text elements
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const elements = heroText.querySelectorAll('> *');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 150 + 500);
        });
    }
    
    // Animate social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px) scale(0.8)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0) scale(1)';
        }, index * 100 + 1200);
    });
    
    // Animate floating stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.animation = `float 3s ease-in-out infinite ${index * -1}s`;
    });
}

// Enhanced smooth scroll for better compatibility
function smoothScrollTo(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    requestAnimationFrame(animation);
}

// Enhanced utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Handle window resize with improved performance
window.addEventListener('resize', debounce(() => {
    // Recalculate positions and sizes
    if (typeof particlesJS !== 'undefined' && window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.canvasSize();
        window.pJSDom.pJS.fn.canvasDraw();
    }
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        if (progressInterval) {
            clearInterval(progressInterval);
        }
    } else {
        // Resume animations when tab becomes visible
        if (!isLoading) {
            initializeTypingAnimation();
        }
    }
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys
    if (e.ctrlKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        const sections = document.querySelectorAll('.section');
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        });
        
        if (currentSection) {
            const currentIndex = Array.from(sections).indexOf(currentSection);
            let targetIndex;
            
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                targetIndex = currentIndex - 1;
            } else if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                targetIndex = currentIndex + 1;
            }
            
            if (targetIndex !== undefined) {
                const targetSection = sections[targetIndex];
                const headerHeight = header ? header.offsetHeight : 0;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Performance monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('🚀 Portfolio Performance:', {
                    loadTime: `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`,
                    domContentLoaded: `${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms`,
                    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 'N/A'
                });
            }, 0);
        });
    }
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Enhanced CSS animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
    
    @keyframes glow {
        from { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
        to { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
    }
`;
document.head.appendChild(enhancedStyle);

// Export enhanced functions for external use
window.portfolioApp = {
    toggleTheme,
    openConnectModal,
    closeConnectModal,
    isLoading: () => isLoading,
    smoothScrollTo,
    debounce,
    throttle
};

// Enhanced success message
console.log('🎉 Enhanced Portfolio JavaScript loaded successfully!');
console.log('📱 Features: Enhanced animations, smooth typing, performance monitoring');
console.log('🚀 Performance: Optimized scroll, debounced resize, throttled animations');
console.log('⌨️ Keyboard: Ctrl+Arrow keys for section navigation');
