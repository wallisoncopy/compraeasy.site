// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupEventListeners();
    }

    applyTheme() {
        document.body.className = this.currentTheme === 'light' ? 'light-theme' : '';
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        console.log(`Theme changed to: ${this.currentTheme}`);
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// FAQ Management
class FAQManager {
    constructor() {
        this.activeIndex = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // FAQ questions are handled by onclick in HTML
        // This provides the global function
        window.toggleFAQ = (index) => this.toggleFAQ(index);
    }

    toggleFAQ(index) {
        console.log(`FAQ ${index} toggled`);
        
        const faqItems = document.querySelectorAll('.faq-item');
        const currentItem = faqItems[index];
        
        if (!currentItem) return;

        // Close all other FAQ items
        faqItems.forEach((item, i) => {
            if (i !== index) {
                item.classList.remove('active');
            }
        });

        // Toggle current item
        const isActive = currentItem.classList.contains('active');
        if (isActive) {
            currentItem.classList.remove('active');
            this.activeIndex = null;
        } else {
            currentItem.classList.add('active');
            this.activeIndex = index;
        }
    }
}

// Smooth Scrolling and Navigation
class NavigationManager {
    constructor() {
        this.setupSmoothScrolling();
        this.setupMobileMenu();
    }

    setupSmoothScrolling() {
        // Smooth scroll to offers section
        window.scrollToOffers = () => {
            console.log('Scrolling to offers section');
            const offersSection = document.getElementById('offers');
            if (offersSection) {
                offersSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };

        // Handle navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    console.log(`Scrolling to section: ${targetId}`);
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                console.log('Mobile menu toggled');
                navLinks.classList.toggle('mobile-open');
                mobileMenuBtn.classList.toggle('active');
            });
        }
    }
}

// Animations and Effects
class AnimationManager {
    constructor() {
        this.setupScrollAnimations();
        this.setupFloatingParticles();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all cards and sections for animation
        document.querySelectorAll('.benefit-card, .testimonial-card, .faq-item, .offer-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupFloatingParticles() {
        // Create additional floating particles dynamically
        const particlesContainer = document.querySelector('.floating-particles');
        if (particlesContainer) {
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: var(--primary-green);
                    border-radius: 50%;
                    opacity: 0.6;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: float ${6 + Math.random() * 4}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 3}s;
                `;
                particlesContainer.appendChild(particle);
            }
        }
    }
}

// Analytics and Tracking
class AnalyticsManager {
    constructor() {
        this.setupEventTracking();
    }

    setupEventTracking() {
        // Track button clicks
        document.querySelectorAll('[data-testid^="button-"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const testId = e.target.getAttribute('data-testid');
                console.log(`Button clicked: ${testId}`);
                
                // Track specific actions
                if (testId.includes('plan-')) {
                    const planType = testId.includes('basic') ? 'Básico' : 'Gold';
                    console.log(`Plan selected: ${planType}`);
                }
            });
        });

        // Track video engagement
        const videoIframe = document.querySelector('[data-testid="video-demo"]');
        if (videoIframe) {
            videoIframe.addEventListener('load', () => {
                console.log('Video loaded successfully');
            });
        }

        // Track link clicks
        document.querySelectorAll('a[href^="https://"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = e.target.getAttribute('href');
                console.log(`External link clicked: ${href}`);
            });
        });
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.setupLazyLoading();
        this.optimizeAnimations();
    }

    setupLazyLoading() {
        // Lazy load iframe when it comes into view
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    if (!iframe.src && iframe.dataset.src) {
                        iframe.src = iframe.dataset.src;
                        videoObserver.unobserve(iframe);
                    }
                }
            });
        });

        document.querySelectorAll('iframe[data-src]').forEach(iframe => {
            videoObserver.observe(iframe);
        });
    }

    optimizeAnimations() {
        // Reduce animations for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
            console.log('Reduced motion detected, animations optimized');
        }
    }
}

// Main Application
class NutriPlannerApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        console.log('Nutri Planner Pro - Initializing application...');
        
        try {
            this.themeManager = new ThemeManager();
            this.faqManager = new FAQManager();
            this.navigationManager = new NavigationManager();
            this.animationManager = new AnimationManager();
            this.analyticsManager = new AnalyticsManager();
            this.performanceManager = new PerformanceManager();
            
            console.log('All modules initialized successfully');
            this.setupGlobalEvents();
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }

    setupGlobalEvents() {
        // Handle form submissions (if any forms are added later)
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted:', e.target);
        });

        // Handle window resize for responsive updates
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                console.log('Window resized, updating layout');
                this.updateResponsiveElements();
            }, 250);
        });

        // Handle scroll events for navbar
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 10);
        });
    }

    updateResponsiveElements() {
        // Update any responsive elements that need JavaScript
        const navbar = document.querySelector('.navbar');
        if (navbar && window.innerWidth <= 768) {
            navbar.classList.add('mobile-layout');
        } else if (navbar) {
            navbar.classList.remove('mobile-layout');
        }
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }
}

// Initialize the application
const app = new NutriPlannerApp();

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NutriPlannerApp, ThemeManager, FAQManager, NavigationManager };
}