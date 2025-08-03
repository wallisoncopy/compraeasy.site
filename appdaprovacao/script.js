
// Login functionality
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation - any username/password combination works
    if (username.trim() && password.trim()) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appContainer').style.display = 'flex';
        
        // Save login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username.trim());
        
        // Update welcome message
        const welcomeMsg = document.querySelector('.welcome-section h2');
        if (welcomeMsg) {
            welcomeMsg.textContent = `Bem-vindo(a), ${username.trim()}!`;
        }
        
        // Update config name
        const configName = document.querySelector('.config-item:first-child p');
        if (configName) {
            configName.textContent = username.trim();
        }
        
        return true;
    } else {
        alert('Por favor, preencha usuário e senha.');
        return false;
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
    
    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Check login state
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUsername = localStorage.getItem('username');
    
    if (isLoggedIn === 'true' && savedUsername) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appContainer').style.display = 'flex';
        
        // Update welcome message
        const welcomeMsg = document.querySelector('.welcome-section h2');
        if (welcomeMsg) {
            welcomeMsg.textContent = `Bem-vindo(a), ${savedUsername}!`;
        }
        
        // Update config name
        const configName = document.querySelector('.config-item:first-child p');
        if (configName) {
            configName.textContent = savedUsername;
        }
    }
    
    // Login form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login();
        });
    }
    
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Handle tab switching
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Save current tab to localStorage
            localStorage.setItem('currentTab', targetTab);
        });
    });
    
    // Restore last active tab
    const savedTab = localStorage.getItem('currentTab');
    if (savedTab) {
        const savedButton = document.querySelector(`[data-tab="${savedTab}"]`);
        const savedContent = document.getElementById(savedTab);
        
        if (savedButton && savedContent) {
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            savedButton.classList.add('active');
            savedContent.classList.add('active');
        }
    }
    
    // Module card interactions
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        card.addEventListener('click', () => {
            // Switch to "Minhas Aulas" tab
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            document.querySelector('[data-tab="aulas"]').classList.add('active');
            document.getElementById('aulas').classList.add('active');
        });
    });
    
    // Continue button
    const continueBtn = document.querySelector('.continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            // Switch to "Minhas Aulas" tab
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            document.querySelector('[data-tab="aulas"]').classList.add('active');
            document.getElementById('aulas').classList.add('active');
            
            // Scroll to current lesson (simulate)
            setTimeout(() => {
                const firstModule = document.querySelector('.module-section');
                if (firstModule) {
                    firstModule.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        });
    }
    
    // Download buttons
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pdfItem = btn.closest('.pdf-item');
            const pdfTitle = pdfItem.querySelector('h4').textContent;
            
            // Simulate download
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-download"></i>';
                }, 2000);
            }, 1000);
            
            console.log(`Downloading: ${pdfTitle}`);
        });
    });
    
    // View buttons for maps
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const mapItem = btn.closest('.map-item');
            const mapTitle = mapItem.querySelector('h4').textContent;
            
            // Simulate view action
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-eye"></i>';
                alert(`Visualizando: ${mapTitle}`);
            }, 500);
        });
    });
    
    // Configuration buttons
    const configBtns = document.querySelectorAll('.config-btn');
    configBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const configItem = btn.closest('.config-item');
            const configTitle = configItem.querySelector('h4').textContent;
            
            if (configTitle.includes('Nome')) {
                const currentName = localStorage.getItem('username') || 'Concurseiro';
                const newName = prompt('Digite seu novo nome:', currentName);
                if (newName && newName.trim()) {
                    const nameDisplay = configItem.querySelector('p');
                    nameDisplay.textContent = newName.trim();
                    localStorage.setItem('username', newName.trim());
                    
                    // Update welcome message
                    const welcomeMsg = document.querySelector('.welcome-section h2');
                    if (welcomeMsg) {
                        welcomeMsg.textContent = `Bem-vindo(a), ${newName.trim()}!`;
                    }
                }
            } else if (configTitle.includes('Resetar')) {
                if (confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
                    // Reset progress
                    localStorage.removeItem('progress');
                    const progressFill = document.querySelector('.progress-fill');
                    if (progressFill) {
                        progressFill.style.width = '0%';
                    }
                    alert('Progresso resetado com sucesso!');
                }
            }
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkMode');
    if (darkModeToggle) {
        // Load saved dark mode preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        darkModeToggle.checked = isDarkMode;
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
    
    // Video loading and progress tracking
    const videos = document.querySelectorAll('iframe');
    videos.forEach((video, index) => {
        video.addEventListener('load', () => {
            console.log(`Video ${index + 1} loaded successfully`);
        });
        
        // Add error handling for videos
        video.addEventListener('error', () => {
            console.error(`Error loading video ${index + 1}`);
        });
    });
    
    // Progress simulation (enhanced with real video tracking)
    function updateProgress() {
        const completedLessons = document.querySelectorAll('.lesson-item:not(.locked)').length;
        const totalLessons = 15; // 5 lessons per module × 3 modules
        const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
        
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-section p');
        
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
        if (progressText) {
            progressText.textContent = `${progressPercentage}% concluído - Continue assim!`;
        }
        
        // Save progress
        localStorage.setItem('progress', progressPercentage);
    }
    
    // Load saved progress
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-section p');
        
        if (progressFill) {
            progressFill.style.width = `${savedProgress}%`;
        }
        if (progressText) {
            progressText.textContent = `${savedProgress}% concluído - Continue assim!`;
        }
    } else {
        updateProgress();
    }
    
    // Smooth scrolling for lesson navigation
    const lessonItems = document.querySelectorAll('.lesson-item:not(.locked)');
    lessonItems.forEach(lesson => {
        lesson.addEventListener('click', () => {
            const videoContainer = lesson.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        });
    });
    
    // Enhanced mobile responsiveness
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        const navButtons = document.querySelectorAll('.nav-btn');
        
        if (isMobile) {
            // Optimize for mobile
            navButtons.forEach(btn => {
                btn.style.padding = '6px 8px';
            });
        } else {
            // Desktop styles
            navButtons.forEach(btn => {
                btn.style.padding = '8px 12px';
            });
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call on load
    
    // Touch gesture support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleGesture() {
        const threshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > threshold) {
            const currentTab = document.querySelector('.tab-content.active');
            const tabs = ['inicio', 'aulas', 'conteudo', 'config'];
            const currentIndex = tabs.indexOf(currentTab.id);
            
            if (diff > 0 && currentIndex > 0) {
                // Swipe right - previous tab
                document.querySelector(`[data-tab="${tabs[currentIndex - 1]}"]`).click();
            } else if (diff < 0 && currentIndex < tabs.length - 1) {
                // Swipe left - next tab
                document.querySelector(`[data-tab="${tabs[currentIndex + 1]}"]`).click();
            }
        }
    }
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });
});

// Global logout function
window.logout = logout;

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Prevent zoom on double tap (mobile)
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Handle orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
        // Recalculate video container sizes
        const videoContainers = document.querySelectorAll('.video-container');
        videoContainers.forEach(container => {
            container.style.height = '0';
            container.style.paddingBottom = '56.25%';
        });
    }, 100);
});

// Enhanced video error handling
function handleVideoError(iframe, lessonTitle) {
    const container = iframe.parentElement;
    container.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 200px;
            background: rgba(16, 31, 56, 0.9);
            color: #4682ff;
            border-radius: 10px;
            text-align: center;
            padding: 20px;
        ">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
            <p>Erro ao carregar o vídeo</p>
            <p style="font-size: 0.9rem; opacity: 0.8;">${lessonTitle}</p>
            <button onclick="location.reload()" style="
                margin-top: 10px;
                padding: 8px 16px;
                background: linear-gradient(45deg, #4682ff, #00d4ff);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            ">Tentar novamente</button>
        </div>
    `;
}

// Add loading states for better UX
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Intersection Observer for lazy loading optimization
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (!iframe.src && iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all video iframes
    document.querySelectorAll('iframe[data-src]').forEach(iframe => {
        videoObserver.observe(iframe);
    });
}
