
// Smooth scroll para links internos
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

// Animação ao rolar a página
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

// Aplicar animação aos elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-item, .gallery-item, .offer-card, .testimonial-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Tracking de cliques nos botões de oferta
document.querySelectorAll('.offer-button').forEach(button => {
    button.addEventListener('click', function() {
        const offerType = this.classList.contains('pro-btn') ? 'PRO' : 'Essencial';
        
        // Você pode adicionar aqui analytics ou tracking
        console.log(`Clique na oferta: ${offerType}`);
        
        // Opcional: mostrar confirmação antes de redirecionar
        const confirmMessage = `Você será redirecionado para completar a compra do IDE PACK ${offerType}. Deseja continuar?`;
        
        if (!confirm(confirmMessage)) {
            event.preventDefault();
        }
    });
});

// Animação de pulso nos botões CTA
function pulseEffect() {
    const ctaButtons = document.querySelectorAll('.cta-button.primary');
    ctaButtons.forEach(button => {
        button.style.animation = 'pulse 2s infinite';
    });
}

// CSS para animação de pulso
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4); }
        50% { box-shadow: 0 8px 35px rgba(34, 197, 94, 0.7); }
        100% { box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4); }
    }
`;
document.head.appendChild(style);

// Iniciar efeito de pulso após carregamento
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(pulseEffect, 2000);
});

// Contador regressivo (opcional - você pode ativar se quiser urgência)
function startCountdown(hours = 24) {
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown-timer';
    countdownElement.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(45deg, #ef4444, #dc2626);
        color: white;
        text-align: center;
        padding: 10px;
        font-weight: bold;
        z-index: 1000;
        display: none;
    `;
    
    document.body.appendChild(countdownElement);
    
    const endTime = new Date().getTime() + (hours * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `⏰ OFERTA ESPECIAL TERMINA EM: ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
            countdownElement.style.display = 'block';
        } else {
            countdownElement.style.display = 'none';
        }
    }
    
    // Descomente a linha abaixo se quiser ativar o countdown
    // setInterval(updateCountdown, 1000);
}
