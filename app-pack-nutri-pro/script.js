
// Countdown Timer (15 minutes)
function initCountdown() {
    let timeLeft = 15 * 60; // 15 minutes in seconds
    
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            // Reset timer when it reaches 0
            timeLeft = 15 * 60;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ Functionality
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            const allAnswers = document.querySelectorAll('.faq-answer');
            const allQuestions = document.querySelectorAll('.faq-question');
            const allIcons = document.querySelectorAll('.faq-question i');
            
            // Close all other answers
            allAnswers.forEach(item => {
                if (item !== answer) {
                    item.style.display = 'none';
                }
            });
            
            // Remove active state from all questions
            allQuestions.forEach(item => {
                if (item !== this) {
                    item.classList.remove('active');
                }
            });
            
            // Reset all icons
            allIcons.forEach(item => {
                if (item !== icon) {
                    item.className = 'fas fa-plus';
                }
            });
            
            // Toggle current answer
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                this.classList.remove('active');
                icon.className = 'fas fa-plus';
            } else {
                answer.style.display = 'block';
                this.classList.add('active');
                icon.className = 'fas fa-minus';
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for countdown bar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-item, .testimonial-card, .plan, .guarantee-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Button click effects
function initButtonEffects() {
    document.querySelectorAll('.mega-cta-button, .plan-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            console.log('Button clicked:', this.textContent.trim());
        });
    });
}

// Video interaction
function initVideoInteraction() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const iframe = videoWrapper.querySelector('iframe');
    
    videoWrapper.addEventListener('click', function() {
        // Add clicked effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        console.log('Video clicked');
    });
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initButtonEffects();
    initVideoInteraction();
    initParallax();
    
    // Add loading effect
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize page with fade in
document.body.style.opacity = '0';

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animated {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Add floating elements for visual appeal
function createFloatingElements() {
    const colors = ['#667eea', '#764ba2', '#ffd700', '#28a745', '#ff6b35'];
    
    for (let i = 0; i < 5; i++) {
        const floating = document.createElement('div');
        floating.className = 'floating-element';
        floating.style.cssText = `
            position: fixed;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            opacity: 0.1;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
        `;
        document.body.appendChild(floating);
    }
}

// Add floating animation CSS
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        from {
            transform: translateY(100vh) rotate(0deg);
        }
        to {
            transform: translateY(-100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(floatingStyle);

// Initialize floating elements
setTimeout(createFloatingElements, 1000);
