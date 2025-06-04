// Countdown Timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    // Set countdown for 24 hours
    let hours = 23;
    let minutes = 59;
    let seconds = 59;
    
    const timer = setInterval(() => {
        // Update display
        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');
        
        countdownElement.textContent = `${hoursStr}:${minutesStr}:${secondsStr}`;
        
        // Decrease time
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    clearInterval(timer);
                    countdownElement.textContent = "00:00:00";
                }
            }
        }
    }, 1000);
}

// FAQ Toggle
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item h3');
    
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const content = parent.querySelector('p');
            
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                item.style.background = '#ff6b35';
            } else {
                content.style.display = 'none';
                item.style.background = '#667eea';
            }
        });
    });
    
    // Initially hide all FAQ answers
    const faqAnswers = document.querySelectorAll('.faq-item p');
    faqAnswers.forEach(answer => {
        answer.style.display = 'none';
    });
}

// Smooth scrolling for CTA buttons
function setupSmoothScroll() {
    const ctaButtons = document.querySelectorAll('.btn-cta');
    const heroCta = document.querySelector('.hero-section .btn-cta');
    const offerSection = document.querySelector('.offer-section');
    const basicOfferBtn = document.querySelector('.offer-basic .btn-cta');
    const premiumOfferBtn = document.querySelector('.offer-premium .btn-cta');
    const finalCtaBtn = document.querySelector('.final-cta .btn-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // Se for o botão do hero, fazer scroll para ofertas
            if (button === heroCta && offerSection) {
                offerSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (button.hasAttribute('data-payment-link')) {
                // Para botões com link de pagamento, redirecionar para pagamento
                const paymentLink = button.getAttribute('data-payment-link');
                window.open(paymentLink, '_blank');
            } else {
                // Outros botões também vão para as ofertas
                if (offerSection) {
                    offerSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Video is now embedded from YouTube, no additional setup needed

// Animate elements on scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.module, .testimonial, .audience-item, .bonus-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialize all functions when page loads
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    setupFAQ();
    setupSmoothScroll();
    setupScrollAnimations();
    
    // Add floating WhatsApp button
    const whatsappBtn = document.createElement('div');
    whatsappBtn.innerHTML = '💬';
    whatsappBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: #25d366;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        transition: transform 0.3s ease;
    `;
    
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.1)';
    });
    
    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1)';
    });
    
    whatsappBtn.addEventListener('click', () => {
        alert('Aqui seria aberto o WhatsApp para suporte.\n\nEm uma implementação real, isso abriria uma conversa no WhatsApp.');
    });
    
    document.body.appendChild(whatsappBtn);
});

// Add some extra interactivity
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});
