// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animations
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
    
    // Observe all sections
    const sections = document.querySelectorAll('.benefits, .pricing, .testimonial');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add floating animation to benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add glow effect on hover for pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 30px 60px rgba(0, 255, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.3)';
            } else {
                this.style.boxShadow = 'none';
            }
        });
    });
});

// Checkout function
function checkout(plan) {
    // Add loading state to button
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'PROCESSANDO...';
    button.disabled = true;
    
    // Add pulsing effect
    button.style.animation = 'pulse 1s infinite';
    
    // Redirect to checkout
    setTimeout(() => {
        if (plan === 'essencial') {
            // Redirect to checkout for essential plan - R$ 10,00
            window.location.href = 'https://paypagamentostx3.shop/checkout-dark-7082/?add-to-cart=7082';
        } else if (plan === 'pro') {
            // Redirect to checkout for pro plan - R$ 19,90
            window.location.href = 'https://paypagamentostx3.shop/checkout-dark-7087/?add-to-cart=7087';
        }
    }, 1500);
}

// Add particle effect
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.backgroundColor = Math.random() > 0.5 ? '#00ffff' : '#00ff88';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.boxShadow = `0 0 10px ${particle.style.backgroundColor}`;
    
    // Random position
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    
    document.body.appendChild(particle);
    
    // Animate particle
    const duration = Math.random() * 3000 + 2000;
    const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 20}px)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Create particles periodically
setInterval(createParticle, 2000);

// Add typing effect to headline
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const headline = document.querySelector('.headline');
    if (headline) {
        const originalText = headline.textContent;
        typeWriter(headline, originalText, 50);
    }
});

// Add mobile touch effects
if ('ontouchstart' in window) {
    const cards = document.querySelectorAll('.benefit-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Scroll to offers function
function scrollToOffers() {
    const offersSection = document.getElementById('ofertas');
    if (offersSection) {
        offersSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #00ffff, #00ff88)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// FAQ Toggle Function
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = element.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-question').forEach(question => {
        question.classList.remove('active');
        question.parentElement.querySelector('.faq-answer').classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        element.classList.add('active');
        answer.classList.add('active');
    }
}

// Add click tracking for gallery images
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
});

