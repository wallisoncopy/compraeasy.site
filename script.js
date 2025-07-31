
// Scroll to offers section
function scrollToOffers() {
    document.getElementById('ofertas').scrollIntoView({
        behavior: 'smooth'
    });
}

// Checkout functions
function checkout(plan) {
    if (plan === 'essencial') {
        // Redirect to payment for essential plan
        alert('Redirecionando para pagamento do plano Essencial - $7 USD');
        // window.location.href = 'your-payment-link-essential';
    } else if (plan === 'pro') {
        // Redirect to payment for pro plan
        alert('Redirecionando para pagamento do plano PRO - $14 USD');
        // window.location.href = 'your-payment-link-pro';
    }
}

// FAQ Toggle functionality
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.faq-question i').forEach(item => {
        if (item !== icon) {
            item.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ item
    answer.classList.toggle('active');
    
    if (answer.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Smooth scrolling for all anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to benefit cards on scroll
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
    
    // Observe benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe showcase items
    document.querySelectorAll('.showcase-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Add floating animation to pricing cards
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-float');
    });
});

// Add click tracking for analytics
document.addEventListener('DOMContentLoaded', function() {
    // Track CTA button clicks
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            // Analytics tracking code here
            console.log('CTA clicked:', this.textContent.trim());
        });
    });
    
    // Track video play
    const video = document.querySelector('iframe');
    if (video) {
        video.addEventListener('load', function() {
            console.log('Video loaded');
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Mobile menu functionality (if needed)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Form validation (if you add contact forms later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Countdown timer functionality (if needed for urgency)
function startCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (display) {
            display.textContent = minutes + ":" + seconds;
        }

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// Page load animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
