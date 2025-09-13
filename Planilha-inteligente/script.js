// Smooth scrolling para seções
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toggle FAQ
function toggleFAQ(questionElement) {
    const answer = questionElement.nextElementSibling;
    const isActive = questionElement.classList.contains('active');
    
    // Fechar todas as outras perguntas
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
    });
    
    // Toggle da pergunta atual
    if (!isActive) {
        questionElement.classList.add('active');
        answer.classList.add('active');
    }
}

// Animações quando elementos entram na viewport
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar cards de problemas, features e depoimentos
    const elementsToObserve = document.querySelectorAll(
        '.problem-card, .feature-card, .testimonial-card, .comparison-card'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

// Mostrar data atual
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('pt-BR', options);
    
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        currentDateElement.textContent = dateString;
    }
}

// Contador regressivo real
function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeDiff = tomorrow.getTime() - now.getTime();
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    const countdownDisplay = document.getElementById('countdown-display');
    if (countdownDisplay) {
        countdownDisplay.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Efeito de digitação para o título principal
function typewriterEffect() {
    const titleElement = document.querySelector('.hero-title .highlight');
    if (!titleElement) return;
    
    const text = titleElement.innerText;
    titleElement.innerText = '';
    titleElement.style.borderRight = '2px solid #ffd700';
    
    let i = 0;
    const timer = setInterval(() => {
        titleElement.innerText += text.charAt(i);
        i++;
        
        if (i >= text.length) {
            clearInterval(timer);
            setTimeout(() => {
                titleElement.style.borderRight = 'none';
            }, 500);
        }
    }, 100);
}

// Efeito parallax sutil no hero (apenas desktop)
function parallaxEffect() {
    if (window.innerWidth <= 768) return; // Desabilitar em mobile
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Validação simples de email (para futuras implementações)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para simular loading em botões
function addButtonLoadingEffect() {
    const buttons = document.querySelectorAll('.btn-cta, .btn-final-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevenir múltiplos clicks
            if (this.classList.contains('loading')) return;
            
            const originalText = this.innerHTML;
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
            this.disabled = true;
            
            // Simular processamento (em implementação real, fazer requisição)
            setTimeout(() => {
                // Aqui você integraria com o sistema de pagamento real
                alert('🎉 Obrigado pelo interesse! Em breve você receberá as instruções de pagamento.');
                
                this.classList.remove('loading');
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
}

// Criar efeito de produtos de supermercado flutuando no header
function createParticles() {
    const header = document.querySelector('.hero');
    if (!header) return;
    
    const produtos = ['🍖', '🍞', '🍲', '🥩', '🍾', '🧀', '🍅', '🥕', '🍌', '🥛', '🍳', '🥜', '🌶️', '🥦', '🥬'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = produtos[Math.floor(Math.random() * produtos.length)];
        particle.style.cssText = `
            position: absolute;
            font-size: ${20 + Math.random() * 15}px;
            opacity: 0.7;
            animation: float ${4 + Math.random() * 3}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
            pointer-events: none;
        `;
        header.appendChild(particle);
    }
    
}

// Inicializar contador real
function initRealCountdown() {
    updateCurrentDate();
    updateCountdown();
    
    // Atualizar a cada segundo
    setInterval(updateCountdown, 1000);
    // Atualizar data a cada minuto
    setInterval(updateCurrentDate, 60000);
}

// Efeito de hover nos cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.problem-card, .feature-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

// Mostrar/ocultar timer no scroll
function timerScrollBehavior() {
    let lastScrollTop = 0;
    const timer = document.querySelector('.countdown-timer');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            timer.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            timer.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Função principal de inicialização
function initializeApp() {
    // Verificar se o DOM está carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
        return;
    }
    
    // Inicializar todas as funcionalidades
    observeElements();
    addButtonLoadingEffect();
    createParticles();
    initRealCountdown();
    addCardHoverEffects();
    timerScrollBehavior();
    
    // Adicionar efeitos após um pequeno delay
    setTimeout(() => {
        parallaxEffect();
    }, 500);
    
    // Efeito de digitação apenas na primeira visita
    if (!sessionStorage.getItem('typewriterShown')) {
        setTimeout(typewriterEffect, 1000);
        sessionStorage.setItem('typewriterShown', 'true');
    }
    
    console.log('SuperStock Pro - Página de vendas carregada com sucesso! 🚀');
}

// Funcionalidades extras para conversão
const ConversionOptimization = {
    // Rastrear cliques nos CTAs
    trackCTAClicks: function() {
        document.querySelectorAll('.btn-cta, .btn-final-cta, .btn-primary').forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.innerText.trim();
                console.log(`CTA clicado: ${buttonText}`);
                
                // Aqui você integraria com Google Analytics ou outro sistema
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'CTA',
                        'event_label': buttonText
                    });
                }
            });
        });
    },
    
    // Destacar benefícios ao passar mouse sobre problemas
    connectProblemsToSolutions: function() {
        const problemCards = document.querySelectorAll('.problem-card');
        const featureCards = document.querySelectorAll('.feature-card');
        
        // Mapeamento problema -> solução (baseado na ordem)
        const problemSolutionMap = {
            0: [0, 2], // Cliente frustrado -> Cadastro + Alertas
            1: [4, 6], // Dinheiro parado -> Lucro + Dashboard
            2: [1, 3], // Achismo -> Giro médio + Sugestões
            3: [5, 7]  // Tempo perdido -> Relatórios + Simplicidade
        };
        
        problemCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                const relatedSolutions = problemSolutionMap[index];
                if (relatedSolutions) {
                    relatedSolutions.forEach(solutionIndex => {
                        if (featureCards[solutionIndex]) {
                            featureCards[solutionIndex].style.background = 'linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%)';
                            featureCards[solutionIndex].style.transform = 'scale(1.05)';
                        }
                    });
                }
            });
            
            card.addEventListener('mouseleave', function() {
                featureCards.forEach(featureCard => {
                    featureCard.style.background = '#f8f9fa';
                    featureCard.style.transform = 'scale(1)';
                });
            });
        });
    }
};

// Inicializar aplicação quando o DOM estiver pronto
initializeApp();

// Inicializar otimizações de conversão
document.addEventListener('DOMContentLoaded', function() {
    ConversionOptimization.trackCTAClicks();
    ConversionOptimization.connectProblemsToSolutions();
});