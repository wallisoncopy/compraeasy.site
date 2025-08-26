
document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        // Set initial time to 14:26 (14 minutes and 26 seconds)
        let totalSeconds = 14 * 60 + 26;
        
        function updateDisplay() {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        function tick() {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                // When countdown reaches 0, reset to original time
                totalSeconds = 14 * 60 + 26;
            }
        }
        
        // Update immediately
        updateDisplay();
        
        // Update every second
        setInterval(tick, 1000);
    }
    
    // Start countdown
    startCountdown();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add click tracking for CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            // Add a subtle animation when clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.benefit-item, .reason-card, .learn-item, .bonus-item, .testimonial, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Video placeholder click handler
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Here you would typically replace with actual video embed
            // For now, just add a visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // You can replace this with actual video embed code
                alert('Aqui seria carregado o vídeo explicativo!');
            }, 150);
        });
    }
    
    // Add floating effect to CTA buttons
    function addFloatingEffect() {
        const ctaButtons = document.querySelectorAll('.cta-button.primary');
        ctaButtons.forEach((button, index) => {
            setInterval(() => {
                if (!button.matches(':hover')) {
                    button.style.transform = 'translateY(-2px)';
                    setTimeout(() => {
                        button.style.transform = 'translateY(0)';
                    }, 1000);
                }
            }, 3000 + (index * 500));
        });
    }
    
    // Start floating effect after page load
    setTimeout(addFloatingEffect, 2000);
    
    // FAQ Interactive functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Add urgency pulse effect
    const urgentButtons = document.querySelectorAll('.cta-button.urgent');
    urgentButtons.forEach(button => {
        setInterval(() => {
            button.style.boxShadow = '0 0 20px rgba(231, 76, 60, 0.6)';
            setTimeout(() => {
                button.style.boxShadow = '0 12px 35px rgba(231, 76, 60, 0.4)';
            }, 500);
        }, 2000);
    });
    
    // Mobile touch feedback
    if ('ontouchstart' in window) {
        document.querySelectorAll('.cta-button, .gallery-item, .reason-card').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            el.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
});
