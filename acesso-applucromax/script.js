// Global variables
let currentModule = 0;
const totalModules = 3;

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const mainApp = document.getElementById('main-app');
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('lucromax_logged_in') === 'true') {
        showMainApp();
    }
    
    // Login form event listeners
    loginBtn.addEventListener('click', handleLogin);
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    // Initialize carousel
    updateCarousel();
});

// Login functionality
function handleLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Simple login validation (you can modify this)
    if (username.length > 0 && password.length > 0) {
        // Store login status
        localStorage.setItem('lucromax_logged_in', 'true');
        localStorage.setItem('lucromax_username', username);
        
        // Show success animation
        loginBtn.textContent = 'Entrando...';
        loginBtn.style.background = 'linear-gradient(45deg, #00CC6A, #00FF88)';
        
        setTimeout(() => {
            showMainApp();
        }, 1000);
    } else {
        alert('Credenciais inválidas!');
    }
}

// Show main app
function showMainApp() {
    loginScreen.style.display = 'none';
    mainApp.style.display = 'flex';
    
    // Reset login form
    usernameInput.value = '';
    passwordInput.value = '';
    loginBtn.textContent = 'Entrar';
    loginBtn.style.background = 'linear-gradient(45deg, #00FF88, #00CC6A)';
}

// Tab navigation
function showTab(tabName, event) {
    // Hide all tabs
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all nav items
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById('tab-' + tabName).classList.add('active');
    
    // Add active class to clicked nav item and glow effect if event exists
    if (event && event.target) {
        const navItem = event.target.closest('.nav-item');
        if (navItem) {
            navItem.classList.add('active');
            navItem.style.textShadow = '0 0 15px #00FF88';
            setTimeout(() => {
                navItem.style.textShadow = '0 0 10px #00FF88';
            }, 200);
        }
    }
}

// Carousel navigation
function nextModule(event) {
    currentModule = (currentModule + 1) % totalModules;
    updateCarousel();
    if (event && event.target) {
        addNavGlow(event.target);
    }
}

function prevModule(event) {
    currentModule = (currentModule - 1 + totalModules) % totalModules;
    updateCarousel();
    if (event && event.target) {
        addNavGlow(event.target);
    }
}

function updateCarousel() {
    const carousel = document.querySelector('.module-carousel');
    if (carousel) {
        const moduleWidth = 320; // 300px width + 20px gap
        carousel.scrollTo({
            left: currentModule * moduleWidth,
            behavior: 'smooth'
        });
    }
}

// Add glow effect to navigation buttons
function addNavGlow(element) {
    if (element) {
        element.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.8)';
        setTimeout(() => {
            element.style.boxShadow = 'none';
        }, 300);
    }
}

// Settings functions
function showChangePassword(event) {
    const newUsername = prompt('Novo usuário:');
    const newPassword = prompt('Nova senha:');
    
    if (newUsername && newPassword) {
        localStorage.setItem('lucromax_username', newUsername);
        alert('Usuário e senha alterados com sucesso!');
        if (event && event.target) {
            addSettingGlow(event.target);
        }
    }
}

function showSupport(event) {
    if (confirm('Deseja abrir o WhatsApp para suporte?')) {
        window.open('https://wa.me/5511999999999', '_blank');
    }
    if (event && event.target) {
        addSettingGlow(event.target);
    }
}

function logout(event) {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('lucromax_logged_in');
        localStorage.removeItem('lucromax_username');
        
        // Smooth transition back to login
        mainApp.style.opacity = '0';
        setTimeout(() => {
            mainApp.style.display = 'none';
            loginScreen.style.display = 'flex';
            mainApp.style.opacity = '1';
            
            // Reset to first tab
            showTabByName('principal');
        }, 500);
    }
    if (event && event.target) {
        addSettingGlow(event.target);
    }
}

// Helper function to show tab by name without event
function showTabByName(tabName) {
    // Hide all tabs
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all nav items
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById('tab-' + tabName).classList.add('active');
    
    // Add active class to corresponding nav item
    const navButtons = document.querySelectorAll('.nav-item');
    navButtons.forEach(button => {
        if (button.onclick && button.onclick.toString().includes(tabName)) {
            button.classList.add('active');
        }
    });
}

// Add glow effect to settings items
function addSettingGlow(element) {
    if (element) {
        const settingItem = element.closest('.setting-item');
        if (settingItem) {
            settingItem.style.background = 'rgba(0, 255, 136, 0.3)';
            settingItem.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
            setTimeout(() => {
                settingItem.style.background = 'rgba(0, 255, 136, 0.1)';
                settingItem.style.boxShadow = 'none';
            }, 300);
        }
    }
}

// Download button functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Add pulse effect
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 0 50px rgba(0, 255, 136, 0.8)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 10px 40px rgba(0, 255, 136, 0.6)';
            }, 100);
            
            // Here you would add your Google Drive link
            alert('Link do Google Drive será adicionado aqui!');
        });
    }
    
    // Upsell buttons functionality
    const upsellBtns = document.querySelectorAll('.upsell-btn');
    upsellBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add pulse effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
            
            // Get the price from the card
            const card = this.closest('.upsell-card');
            const price = card.querySelector('.price').textContent;
            const title = card.querySelector('h3').textContent;
            
            alert(`Redirecionando para pagamento:\n${title} - ${price}`);
            // Here you would redirect to payment page
        });
    });
});

// Touch/swipe support for mobile carousel
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!startX || !startY) return;
    
    const carousel = document.querySelector('.module-carousel');
    if (!carousel) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // If horizontal swipe is more significant than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Swipe left - next module
            nextModule();
        } else {
            // Swipe right - previous module
            prevModule();
        }
    }
    
    startX = 0;
    startY = 0;
});

// Smooth scroll for carousel on desktop
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.module-carousel');
    if (carousel) {
        carousel.addEventListener('wheel', function(e) {
            e.preventDefault();
            const scrollAmount = e.deltaY > 0 ? 320 : -320;
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});

// Add loading animation for videos
document.addEventListener('DOMContentLoaded', function() {
    const videoFrames = document.querySelectorAll('.video-frame, .tutorial-video');
    videoFrames.forEach(frame => {
        frame.addEventListener('load', function() {
            this.style.border = '2px solid #00FF88';
            this.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.3)';
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Only work if main app is visible
    if (mainApp.style.display === 'none') return;
    
    switch(e.key) {
        case '1':
            showTabByName('principal');
            break;
        case '2':
            showTabByName('baixar');
            break;
        case '3':
            showTabByName('tutorial');
            break;
        case '4':
            showTabByName('produtos');
            break;
        case '5':
            showTabByName('config');
            break;
        case 'ArrowLeft':
            if (document.getElementById('tab-principal').classList.contains('active')) {
                prevModule();
            }
            break;
        case 'ArrowRight':
            if (document.getElementById('tab-principal').classList.contains('active')) {
                nextModule();
            }
            break;
        case 'Escape':
            if (confirm('Deseja sair do LucroMax?')) {
                logout();
            }
            break;
    }
});

// Auto-save scroll position for carousel
window.addEventListener('beforeunload', function() {
    localStorage.setItem('lucromax_current_module', currentModule.toString());
});

// Restore scroll position
document.addEventListener('DOMContentLoaded', function() {
    const savedModule = localStorage.getItem('lucromax_current_module');
    if (savedModule) {
        currentModule = parseInt(savedModule);
        setTimeout(() => {
            updateCarousel();
        }, 500);
    }
});