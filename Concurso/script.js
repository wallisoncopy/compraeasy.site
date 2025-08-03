
// Variáveis globais para armazenar os links
let checkoutLinks = {
    basico: '',
    completo: ''
};

// Função para atualizar o vídeo do YouTube
function updateVideo() {
    const videoInput = document.getElementById('video-link');
    const videoFrame = document.getElementById('youtube-video');
    const url = videoInput.value;
    
    if (url) {
        // Extrair ID do vídeo do YouTube
        let videoId = extractYouTubeId(url);
        if (videoId) {
            videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
            alert('Vídeo atualizado com sucesso!');
        } else {
            alert('Por favor, insira um link válido do YouTube');
        }
    }
}

// Função para extrair ID do vídeo do YouTube
function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Função para atualizar links de checkout
function updateCheckoutLinks() {
    const basicoInput = document.getElementById('checkout-basico');
    const completoInput = document.getElementById('checkout-completo');
    
    if (basicoInput.value) {
        checkoutLinks.basico = basicoInput.value;
    }
    if (completoInput.value) {
        checkoutLinks.completo = completoInput.value;
    }
    
    alert('Links de checkout atualizados!');
}

// Função para abrir checkout
function openCheckout(plano) {
    // Links de checkout configurados
    if (plano === 'basico') {
        window.open('https://tx3cursos.pay.yampi.com.br/r/2SUHJEGWA7', '_blank');
    } else if (plano === 'completo') {
        window.open('https://tx3cursos.pay.yampi.com.br/r/D9SFK1WYV7', '_blank');
    }
}

// Função para scroll suave até as ofertas
function scrollToOffers() {
    document.getElementById('offers').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Função para toggle do FAQ
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    // Fechar todos os outros FAQs
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
    
    // Toggle do FAQ atual
    answer.classList.toggle('active');
    
    if (answer.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Animações ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .testimonial, .plan');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações
    const elements = document.querySelectorAll('.benefit-card, .testimonial, .plan');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // Scroll listener para animações
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger inicial das animações
    animateOnScroll();
    
    // Adicionar efeito de hover nos botões
    const buttons = document.querySelectorAll('.btn-cta, .btn-final-cta, .btn-plan');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Função para adicionar efeito de partículas no hero (opcional)
function createParticles() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(251, 191, 36, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        hero.appendChild(particle);
    }
}

// CSS para animação das partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .hero {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Inicializar partículas (descomente se quiser o efeito)
// createParticles();

// Função para smooth scroll personalizado
function smoothScroll(target) {
    const element = document.querySelector(target);
    const offsetTop = element.offsetTop - 80; // Ajuste para header fixo
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// Adicionar efeito de typewriter no headline (opcional)
function typewriterEffect() {
    const headline = document.querySelector('.headline');
    const text = headline.textContent;
    headline.textContent = '';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            headline.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 50);
}

// Descomente para ativar o efeito typewriter
// document.addEventListener('DOMContentLoaded', typewriterEffect);

console.log('🚀 App da Aprovação - Página de vendas carregada com sucesso!');
