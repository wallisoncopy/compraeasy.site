
// Variáveis globais
let activeTab = 'principal';
let userName = '';
const tabButtons = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEntryPage();
    setupTabNavigation();
    setupDownloadButton();
    setupSettingsInteractions();
    setupUpsellButtons();
});

// Inicializar aplicativo
function initializeApp() {
    // Adicionar classe para indicar que JS está carregado
    document.body.classList.add('js-loaded');
    
    // Configurar viewport height para mobile
    setVHProperty();
    window.addEventListener('resize', setVHProperty);
    
    // Prevenir zoom em inputs no iOS
    preventIOSZoom();
}

// Configurar altura da viewport para mobile
function setVHProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Prevenir zoom no iOS
function preventIOSZoom() {
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
}

// Configurar página de entrada
function setupEntryPage() {
    const entryForm = document.getElementById('entryForm');
    const userNameInput = document.getElementById('userName');
    const entryPage = document.getElementById('entryPage');
    const appContainer = document.getElementById('appContainer');
    
    // Verificar se já tem nome salvo
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        userName = savedName;
        showApp();
        return;
    }
    
    entryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputName = userNameInput.value.trim();
        if (inputName) {
            userName = inputName;
            localStorage.setItem('userName', userName);
            
            // Animação de saída
            entryPage.style.opacity = '0';
            entryPage.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                showApp();
            }, 300);
        }
    });
    
    function showApp() {
        const entryPage = document.getElementById('entryPage');
        const appContainer = document.getElementById('appContainer');
        const userNameDisplay = document.getElementById('userNameDisplay');
        
        entryPage.style.display = 'none';
        appContainer.style.display = 'block';
        
        if (userNameDisplay && userName) {
            userNameDisplay.textContent = userName.split(' ')[0]; // Usar apenas o primeiro nome
        }
        
        // Animação de entrada do app
        setTimeout(() => {
            appContainer.style.opacity = '1';
        }, 100);
    }
}

// Configurar navegação entre abas
function setupTabNavigation() {
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

// Mudar aba ativa
function switchTab(tabName) {
    if (tabName === activeTab) return;
    
    // Remover classe ativa dos botões
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Adicionar classe ativa ao botão clicado
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Esconder todas as abas
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Mostrar aba selecionada
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Atualizar aba ativa
    activeTab = tabName;
    
    // Scroll para o topo quando mudar de aba
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Adicionar haptic feedback no mobile
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

// Configurar botão de download único
function setupDownloadButton() {
    const downloadButton = document.getElementById('downloadPdf');
    if (!downloadButton) return;
    
    downloadButton.addEventListener('click', function() {
        // Animação do botão
        this.style.transform = 'scale(0.95)';
        
        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Redirecionar para o link de checkout
        window.open('https://drive.google.com/file/d/1BbV0PqIWWGWU-XR6U0lX9wTjQKF9VVyc/view?usp=sharing', '_blank');
        
        // Mostrar notificação
        showNotification(`Redirecionando para o checkout, ${userName.split(' ')[0]}!`);
    });
}

// Configurar botões de upsell
function setupUpsellButtons() {
    const upsellButtons = document.querySelectorAll('.upsell-btn');
    
    upsellButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }
            
            // Animação do botão
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Configurar interações das configurações
function setupSettingsInteractions() {
    const settingItems = document.querySelectorAll('.setting-item');
    
    settingItems.forEach(item => {
        item.addEventListener('click', function() {
            const settingName = this.querySelector('h4').textContent;
            
            // Haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
            
            // Mostrar notificação
            showNotification(`Configuração "${settingName}" em desenvolvimento`);
        });
    });
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 90%;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Função para limpar dados (para teste)
function resetApp() {
    localStorage.removeItem('userName');
    location.reload();
}

// Otimizações de performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading para imagens (caso sejam adicionadas no futuro)
function observeImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Prevenção de context menu em produção
document.addEventListener('contextmenu', function(e) {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        e.preventDefault();
    }
});

// Analytics simples (pageview tracking)
function trackPageView(tabName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: `Tab: ${tabName}`,
            page_location: window.location.href
        });
    }
}

// Exportar funções para uso global se necessário
window.BolosApp = {
    switchTab,
    showNotification,
    resetApp,
    activeTab: () => activeTab
};
