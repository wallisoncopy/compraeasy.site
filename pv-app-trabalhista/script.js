
// Função para scroll suave até as ofertas
function scrollToOffers() {
    const offersSection = document.getElementById('offers');
    if (offersSection) {
        offersSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    return false; // Previne comportamento padrão do link
}

// Função para toggle do FAQ
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    // Fechar todas as outras respostas
    const allAnswers = document.querySelectorAll('.faq-answer');
    const allIcons = document.querySelectorAll('.faq-question i');
    
    allAnswers.forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
        }
    });
    
    allIcons.forEach(item => {
        if (item !== icon) {
            item.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle da resposta atual
    answer.classList.toggle('active');
    
    if (answer.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Animação de entrada dos elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .content-card, .testimonial-card, .offer-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Contador regressivo (opcional)
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    let timeLeft = 24 * 60 * 60; // 24 horas em segundos
    
    function updateCountdown() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        countdownElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timeLeft = 24 * 60 * 60; // Reset para 24 horas
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações
    animateOnScroll();
    
    // Inicializar countdown se existir
    startCountdown();
    
    // Smooth scroll para todos os links com hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de hover nos botões
    const buttons = document.querySelectorAll('.btn-cta-large, .btn-offer, .btn-final-cta');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Tracking de cliques nos botões (para analytics)
function trackButtonClick(buttonName) {
    // Aqui você pode adicionar código de tracking
    console.log(`Botão clicado: ${buttonName}`);
    
    // Exemplo para Google Analytics (descomente se usar)
    // gtag('event', 'click', {
    //     'event_category': 'Button',
    //     'event_label': buttonName
    // });
}

// Event listeners para tracking
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('a[href*="yampi.com.br"]');
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            trackButtonClick(`CTA-${index + 1}`);
        });
    });
});

// Lazy loading para imagens (se adicionar imagens posteriormente)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);
