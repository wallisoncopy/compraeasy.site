
// Countdown Timer
function startCountdown() {
    const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown-timer").innerHTML = "OFERTA EXPIRADA";
        }
    }, 1000);
}

// Purchase function
function comprar(valor) {
    if (valor === 19.90) {
        window.open('https://paypagamentostx3.shop/checkout-dark-7054/?add-to-cart=7054', '_blank');
    } else if (valor === 10.00) {
        window.open('https://paypagamentostx3.shop/checkout-dark-7049/?add-to-cart=7049', '_blank');
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown
    startCountdown();
    
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
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add click tracking for analytics
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            // Track button clicks
            console.log('CTA Button clicked:', this.textContent);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add floating WhatsApp button (optional)
    createWhatsAppButton();
});

// Create floating WhatsApp button
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('div');
    whatsappBtn.innerHTML = `
        <a href="https://wa.me/5511999999999?text=Olá! Tenho interesse no Detox 3D" 
           target="_blank" 
           style="
               position: fixed;
               bottom: 20px;
               right: 20px;
               background: #25d366;
               color: white;
               width: 60px;
               height: 60px;
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               text-decoration: none;
               font-size: 24px;
               box-shadow: 0 4px 12px rgba(0,0,0,0.3);
               z-index: 1000;
               transition: transform 0.3s ease;
           "
           onmouseover="this.style.transform='scale(1.1)'"
           onmouseout="this.style.transform='scale(1)'">
            📱
        </a>
    `;
    document.body.appendChild(whatsappBtn);
}


