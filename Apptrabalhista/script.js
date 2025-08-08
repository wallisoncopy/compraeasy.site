
class AppTrabalhista {
    constructor() {
        this.currentTab = 'principal';
        this.currentModule = 0;
        this.savedVideos = this.loadSavedVideos();
        this.isLoggedIn = this.checkLoginStatus();
        this.init();
    }

    init() {
        if (!this.isLoggedIn) {
            this.setupLogin();
        } else {
            this.showApp();
        }
        this.setupNavigation();
        this.setupCarousel();
        this.setupVideoPlayer();
        this.setupSaveForLater();
        this.setupSettings();
        this.loadSavedVideosDisplay();
        this.setupAccessibility();
        this.optimizePerformance();
    }

    // Sistema de Login
    checkLoginStatus() {
        return localStorage.getItem('userLoggedIn') === 'true';
    }

    setupLogin() {
        const loginForm = document.getElementById('login-form');
        const passwordToggle = document.getElementById('password-toggle');
        const passwordInput = document.getElementById('password');

        // Toggle de senha
        if (passwordToggle && passwordInput) {
            passwordToggle.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                passwordToggle.textContent = type === 'password' ? '👁️' : '🙈';
            });
        }

        // Submit do formulário
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Botões sociais
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSocialLogin(btn);
            });
        });

        // Links
        document.querySelector('.forgot-password')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showNotification('Em breve: recuperação de senha por e-mail');
        });

        document.querySelector('.signup-link a')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showNotification('Em breve: página de cadastro');
        });
    }

    async handleLogin() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const loginButton = document.querySelector('.login-button');
        const buttonText = loginButton.querySelector('.button-text');
        const buttonLoading = loginButton.querySelector('.button-loading');

        // Validação básica
        if (!email || !password) {
            this.showNotification('Por favor, preencha todos os campos', 'error');
            return;
        }

        if (password.length < 3) {
            this.showNotification('A senha deve ter pelo menos 3 caracteres', 'error');
            return;
        }

        // Estado de loading
        loginButton.disabled = true;
        loginButton.classList.add('login-loading');
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'block';

        try {
            // Simular autenticação (substituir por API real)
            await this.simulateLogin(email, password);
            
            // Sucesso
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            this.showNotification('Login realizado com sucesso!', 'success');
            
            setTimeout(() => {
                this.showApp();
            }, 1000);

        } catch (error) {
            this.showNotification(error.message || 'Erro ao fazer login', 'error');
        } finally {
            // Restaurar botão
            loginButton.disabled = false;
            loginButton.classList.remove('login-loading');
            buttonText.style.display = 'block';
            buttonLoading.style.display = 'none';
        }
    }

    async simulateLogin(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Aceita qualquer e-mail e senha para demo
                if (email && password && password.length >= 3) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Por favor, preencha e-mail e senha (mín. 3 caracteres)'));
                }
            }, 1200); // Simular delay de rede
        });
    }

    handleSocialLogin(button) {
        const provider = button.textContent.includes('Google') ? 'Google' : 'Microsoft';
        
        button.disabled = true;
        button.style.opacity = '0.7';
        
        // Simular login social
        setTimeout(() => {
            this.showNotification(`Login com ${provider} será implementado em breve`);
            button.disabled = false;
            button.style.opacity = '1';
        }, 1000);
    }

    showApp() {
        const loginScreen = document.getElementById('login-screen');
        const appContainer = document.getElementById('app-container');
        
        if (loginScreen && appContainer) {
            loginScreen.style.animation = 'slideOut 0.5s ease-in';
            
            setTimeout(() => {
                loginScreen.style.display = 'none';
                appContainer.style.display = 'block';
                appContainer.style.animation = 'slideIn 0.5s ease-out';
            }, 500);
        }
    }

    logout() {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userEmail');
        window.location.reload();
    }

    // Utilitários de validação
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateCPF(cpf) {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfRegex.test(cpf);
    }

    // Navegação otimizada entre abas
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const tabContents = document.querySelectorAll('.tab-content');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = item.dataset.tab;
                this.switchTab(tabName, navItems, tabContents);
            });
        });
    }

    switchTab(tabName, navItems, tabContents) {
        if (this.currentTab === tabName) return;

        // Remove classes ativas
        navItems.forEach(nav => nav.classList.remove('active'));
        tabContents.forEach(tab => {
            tab.classList.remove('active');
            tab.style.opacity = '0';
        });

        // Adiciona classes ativas com delay para animação
        const currentNav = document.querySelector(`[data-tab="${tabName}"]`);
        const currentTab = document.getElementById(`tab-${tabName}`);
        
        currentNav.classList.add('active');
        
        requestAnimationFrame(() => {
            currentTab.classList.add('active');
            currentTab.style.opacity = '1';
        });

        this.currentTab = tabName;

        // Scroll suave para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Carrossel otimizado de módulos
    setupCarousel() {
        const carouselBtns = document.querySelectorAll('.carousel-btn');
        const modules = document.querySelectorAll('.module');

        carouselBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.currentModule !== index) {
                    this.switchModule(index, carouselBtns, modules);
                }
            });
        });
    }

    switchModule(moduleIndex, carouselBtns, modules) {
        // Remove classes ativas
        carouselBtns.forEach(btn => btn.classList.remove('active'));
        modules.forEach(module => {
            module.classList.remove('active');
            module.style.opacity = '0';
        });

        // Adiciona classes ativas com animação
        carouselBtns[moduleIndex].classList.add('active');
        
        requestAnimationFrame(() => {
            modules[moduleIndex].classList.add('active');
            modules[moduleIndex].style.opacity = '1';
        });

        this.currentModule = moduleIndex;
    }

    // Player de vídeo com lazy loading otimizado
    setupVideoPlayer() {
        const videoItems = document.querySelectorAll('.video-item');

        videoItems.forEach(item => {
            const poster = item.querySelector('.video-poster');
            if (poster) {
                poster.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.loadVideo(item);
                });
            }
        });
    }

    loadVideo(videoItem) {
        const videoId = videoItem.dataset.videoId;
        const title = videoItem.dataset.title;
        const poster = videoItem.querySelector('.video-poster');

        if (!videoId || !poster) return;

        // Criar iframe otimizado
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&controls=1&modestbranding=1&iv_load_policy=3&autoplay=1`;
        iframe.className = 'video-player';
        iframe.title = title;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';

        // Substituir poster por iframe
        poster.replaceWith(iframe);

        // Adicionar aos assistidos recentemente
        this.addToRecentlyWatched(videoId, title);
    }

    // Sistema de salvar para depois otimizado
    setupSaveForLater() {
        const saveButtons = document.querySelectorAll('.save-later-btn');

        saveButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const videoId = btn.dataset.videoId;
                const videoItem = btn.closest('.video-item');
                const title = videoItem?.dataset.title;
                
                if (videoId && title) {
                    this.saveVideoForLater(videoId, title);
                    this.showNotification('Vídeo salvo para depois!');
                    btn.textContent = 'Salvo!';
                    btn.disabled = true;
                    setTimeout(() => {
                        btn.textContent = 'Salvar para depois';
                        btn.disabled = false;
                    }, 2000);
                }
            });
        });
    }

    saveVideoForLater(videoId, title) {
        const video = { 
            id: videoId, 
            title: title, 
            timestamp: Date.now() 
        };
        
        // Verificar se o vídeo já existe
        const exists = this.savedVideos.find(v => v.id === videoId);
        if (!exists) {
            this.savedVideos.unshift(video);
            // Limitar a 20 vídeos salvos
            if (this.savedVideos.length > 20) {
                this.savedVideos = this.savedVideos.slice(0, 20);
            }
            this.saveSavedVideos();
            this.loadSavedVideosDisplay();
        }
    }

    addToRecentlyWatched(videoId, title) {
        this.saveVideoForLater(videoId, `${title} (Assistido)`);
    }

    // Gerenciamento de localStorage otimizado
    loadSavedVideos() {
        try {
            const saved = localStorage.getItem('savedVideos');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.warn('Erro ao carregar vídeos salvos:', error);
            return [];
        }
    }

    saveSavedVideos() {
        try {
            localStorage.setItem('savedVideos', JSON.stringify(this.savedVideos));
        } catch (error) {
            console.warn('Erro ao salvar vídeos:', error);
        }
    }

    // Display otimizado de vídeos salvos
    loadSavedVideosDisplay() {
        const container = document.getElementById('saved-videos');
        if (!container) return;
        
        if (this.savedVideos.length === 0) {
            container.innerHTML = '<p>Nenhum vídeo salvo ainda.</p>';
            return;
        }

        const videosHTML = this.savedVideos.map(video => `
            <div class="video-item saved-video" data-video-id="${video.id}" data-title="${video.title}">
                <div class="video-poster">
                    <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" alt="${video.title}" loading="lazy">
                    <div class="play-overlay">▶</div>
                </div>
                <h3>${video.title}</h3>
                <button class="remove-video-btn" data-video-id="${video.id}">Remover</button>
            </div>
        `).join('');

        container.innerHTML = videosHTML;

        // Setup event listeners
        this.setupSavedVideoEvents(container);
        this.setupClearHistory();
    }

    setupSavedVideoEvents(container) {
        // Setup para play nos vídeos salvos
        container.querySelectorAll('.video-poster').forEach(poster => {
            poster.addEventListener('click', (e) => {
                e.preventDefault();
                const videoItem = poster.closest('.video-item');
                this.loadVideo(videoItem);
            });
        });

        // Setup para remover vídeos
        container.querySelectorAll('.remove-video-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const videoId = btn.dataset.videoId;
                this.removeVideoFromSaved(videoId);
            });
        });
    }

    setupClearHistory() {
        const clearBtn = document.getElementById('clear-history');
        if (clearBtn) {
            clearBtn.replaceWith(clearBtn.cloneNode(true)); // Remove listeners antigos
            const newClearBtn = document.getElementById('clear-history');
            newClearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearHistory();
            });
        }
    }

    removeVideoFromSaved(videoId) {
        this.savedVideos = this.savedVideos.filter(v => v.id !== videoId);
        this.saveSavedVideos();
        this.loadSavedVideosDisplay();
        this.showNotification('Vídeo removido!');
    }

    clearHistory() {
        if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
            this.savedVideos = [];
            this.saveSavedVideos();
            this.loadSavedVideosDisplay();
            this.showNotification('Histórico limpo!');
        }
    }

    // Configurações otimizadas
    setupSettings() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const currentTheme = localStorage.getItem('theme') || 'dark';
            
            if (currentTheme === 'light') {
                themeToggle.checked = true;
                document.body.setAttribute('data-theme', 'light');
            }

            themeToggle.addEventListener('change', () => {
                if (themeToggle.checked) {
                    document.body.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.body.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'dark');
                }
            });
        }

        // Font size
        const fontSizeSelect = document.getElementById('font-size');
        if (fontSizeSelect) {
            const currentFontSize = localStorage.getItem('fontSize') || '16';
            fontSizeSelect.value = currentFontSize;
            document.documentElement.style.setProperty('--font-size', currentFontSize + 'px');

            fontSizeSelect.addEventListener('change', () => {
                const fontSize = fontSizeSelect.value;
                document.documentElement.style.setProperty('--font-size', fontSize + 'px');
                localStorage.setItem('fontSize', fontSize);
            });
        }

        // Config buttons
        document.querySelectorAll('.config-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (btn.textContent === 'Contato') {
                    this.showNotification('Em breve: formulário de contato');
                } else if (btn.textContent === 'Sobre os autores') {
                    this.showNotification('Em breve: informações dos autores');
                }
            });
        });
    }

    // Acessibilidade aprimorada
    setupAccessibility() {
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Adicionar main content id
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer && !mainContainer.id) {
            mainContainer.id = 'main-content';
        }
    }

    // Otimizações de performance
    optimizePerformance() {
        // Debounce para resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 150);
        });

        // Preload de imagens críticas
        this.preloadImages();

        // Lazy loading para imagens
        this.setupLazyLoading();
    }

    preloadImages() {
        const criticalImages = [
            'https://img.youtube.com/vi/FXBIHwb_mSo/maxresdefault.jpg',
            'https://img.youtube.com/vi/APFl6yC9Ya0/maxresdefault.jpg',
            'https://img.youtube.com/vi/oktqPKDFnEY/maxresdefault.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    handleResize() {
        // Ajustar grid de vídeos em dispositivos pequenos
        const videosGrids = document.querySelectorAll('.videos-grid');
        videosGrids.forEach(grid => {
            if (window.innerWidth <= 480) {
                grid.style.gridTemplateColumns = '1fr';
            } else if (window.innerWidth <= 768) {
                grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
            }
        });
    }

    // Sistema de notificações otimizado
    showNotification(message, type = 'info') {
        // Remover notificação existente
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remover após 3 segundos (ou mais para erros)
        const duration = type === 'error' ? 5000 : 3000;
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, duration);
    }

    // Utility function para debounce
    debounce(func, wait) {
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
}

// Adicionar estilos críticos dinamicamente
const criticalStyles = document.createElement('style');
criticalStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-gold) !important;
        outline-offset: 2px !important;
    }
    
    .lazy {
        opacity: 0.3;
        transition: opacity 0.3s;
    }
`;
document.head.appendChild(criticalStyles);

// Inicializar o app com otimização
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new AppTrabalhista();
    });
} else {
    app = new AppTrabalhista();
}

// Cleanup ao sair da página
window.addEventListener('beforeunload', () => {
    if (app && app.savedVideos) {
        app.saveSavedVideos();
    }
});
